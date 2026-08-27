/**
 * Medição da landing page: eventos próprios (Supabase) + GA4.
 *
 * Só roda depois de "aceitar" no banner — ver `consentimento.js`. Até lá,
 * `iniciarMedicao()` não instala listener nenhum e o GA4 não é baixado.
 *
 * ------------------------------------------------------------------
 * Como a instrumentação alcança a página inteira
 * ------------------------------------------------------------------
 * Em vez de espalhar `onClick` por vinte componentes, há **um listener
 * delegado** no `document`: todo clique que sobe até ele é inspecionado, e se
 * veio de um `<a>` ou `<button>` vira um `cta_click` com o rótulo e o destino.
 * Isso cobre header, hero, preço, footer e o que for criado depois, sem que
 * ninguém precise lembrar de instrumentar. Onde o texto do botão for ruim como
 * rótulo, um `data-rastreio="nome"` no elemento sobrescreve.
 *
 * O que NUNCA é coletado aqui: valor digitado em campo, e-mail, texto de
 * formulário. `form_start` e `form_submit` registram que houve interação e
 * qual formulário — nunca o conteúdo.
 */

import { consentiu } from './consentimento';

const ENDPOINT = '/api/eventos';
const CHAVE_SESSAO = 'lenext:sessao';
/** Agrupa eventos para não fazer uma requisição por clique. */
const INTERVALO_ENVIO_MS = 4000;

let ligado = false;
let fila = [];
let timer = null;
let limpezas = [];

/* ------------------------------------------------------------------ */
/* Sessão e contexto                                                   */
/* ------------------------------------------------------------------ */

/**
 * Id de sessão aleatório em `sessionStorage`: morre com a aba e não
 * reidentifica a pessoa numa próxima visita. É o que mantém os dados
 * anônimos — não trocar por `localStorage`.
 */
function sessaoId() {
  try {
    let id = window.sessionStorage.getItem(CHAVE_SESSAO);
    if (!id) {
      id = (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`)
        .replace(/-/g, '')
        .slice(0, 32);
      window.sessionStorage.setItem(CHAVE_SESSAO, id);
    }
    return id;
  } catch {
    return null;
  }
}

/**
 * UTMs da URL atual, guardados na sessão: a pessoa navega para outra rota e a
 * origem se perde da URL, mas continua sendo a mesma visita.
 */
function utmDaSessao() {
  const CHAVE_UTM = 'lenext:utm';
  try {
    const params = new URLSearchParams(window.location.search);
    const daUrl = {
      source: params.get('utm_source'),
      medium: params.get('utm_medium'),
      campaign: params.get('utm_campaign'),
      content: params.get('utm_content'),
      term: params.get('utm_term'),
    };
    if (Object.values(daUrl).some(Boolean)) {
      window.sessionStorage.setItem(CHAVE_UTM, JSON.stringify(daUrl));
      return daUrl;
    }
    const salvo = window.sessionStorage.getItem(CHAVE_UTM);
    return salvo ? JSON.parse(salvo) : {};
  } catch {
    return {};
  }
}

/* ------------------------------------------------------------------ */
/* Fila e envio                                                        */
/* ------------------------------------------------------------------ */

function enviar(usarBeacon = false) {
  if (fila.length === 0) return;
  const id = sessaoId();
  if (!id) {
    fila = [];
    return;
  }

  const corpo = JSON.stringify({ sessaoId: id, eventos: fila });
  fila = [];

  try {
    // Na saída da página, `fetch` normal é cancelado — `sendBeacon` sobrevive.
    if (usarBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([corpo], { type: 'application/json' }));
      return;
    }
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: corpo,
      keepalive: true,
    }).catch(() => {
      // Medição falhar não pode aparecer para quem está navegando.
    });
  } catch {
    /* idem */
  }
}

function registrar(tipo, dados = {}) {
  if (!ligado) return;
  fila.push({
    tipo,
    detalhe: dados.detalhe ?? null,
    destino: dados.destino ?? null,
    caminho: window.location.pathname,
    referrer: document.referrer || null,
    utm: utmDaSessao(),
  });
  if (!timer) {
    timer = window.setTimeout(() => {
      timer = null;
      enviar();
    }, INTERVALO_ENVIO_MS);
  }
  enviarParaGa4(tipo, dados);
}

/* ------------------------------------------------------------------ */
/* GA4                                                                 */
/* ------------------------------------------------------------------ */

/**
 * Carrega o gtag.js já com Consent Mode v2 negado por padrão e só então
 * concede — assim, mesmo na janela entre o script carregar e o consentimento
 * ser lido, nada é enviado.
 *
 * `anonymize_ip` é redundante no GA4 (o IP já não é registrado), mas explícito
 * documenta a intenção para quem auditar.
 */
function carregarGa4(measurementId) {
  if (!measurementId || window.__ga4Carregado) return;
  window.__ga4Carregado = true;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', measurementId, { anonymize_ip: true, send_page_view: true });

  // Só analytics. Publicidade/remarketing seguem negados — não é o uso aqui,
  // e conceder mudaria a base legal do consentimento que a pessoa deu.
  gtag('consent', 'update', { analytics_storage: 'granted' });
}

function enviarParaGa4(tipo, dados) {
  if (typeof window.gtag !== 'function') return;
  if (tipo === 'page_view') return; // já enviado pelo config
  window.gtag('event', tipo, {
    detalhe: dados.detalhe ?? undefined,
    destino: dados.destino ?? undefined,
  });
}

/* ------------------------------------------------------------------ */
/* Listeners                                                           */
/* ------------------------------------------------------------------ */

/** Rótulo do elemento: `data-rastreio` manda; senão, o texto visível. */
function rotuloDe(el) {
  const explicito = el.getAttribute('data-rastreio');
  if (explicito) return explicito.slice(0, 200);
  const texto = (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ');
  if (texto) return texto.slice(0, 200);
  return el.getAttribute('aria-label')?.slice(0, 200) || null;
}

/** Em que seção da página o elemento está — dá contexto ao clique. */
function secaoDe(el) {
  const secao = el.closest('section[id], header, footer');
  if (!secao) return null;
  if (secao.tagName === 'HEADER') return 'header';
  if (secao.tagName === 'FOOTER') return 'footer';
  return secao.id || null;
}

function instalarCliques() {
  const aoClicar = (evento) => {
    const el = evento.target?.closest?.('a, button');
    if (!el) return;
    const rotulo = rotuloDe(el);
    if (!rotulo) return;
    const secao = secaoDe(el);
    registrar('cta_click', {
      detalhe: secao ? `${secao} · ${rotulo}` : rotulo,
      destino: el.getAttribute('href') || null,
    });
  };
  // Fase de captura: um handler que chame stopPropagation não some com o dado.
  document.addEventListener('click', aoClicar, true);
  return () => document.removeEventListener('click', aoClicar, true);
}

/** Uma seção conta como "vista" ao ficar 50% visível — não ao passar batido. */
function instalarSecoes() {
  if (typeof IntersectionObserver === 'undefined') return () => {};
  const vistas = new Set();
  const obs = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        const id = entrada.target.id;
        if (!entrada.isIntersecting || !id || vistas.has(id)) continue;
        vistas.add(id);
        registrar('secao_vista', { detalhe: id });
      }
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll('section[id]').forEach((s) => obs.observe(s));
  return () => obs.disconnect();
}

/**
 * Interação com formulário — o QUE foi digitado nunca é lido, só o fato de
 * ter havido interação e qual formulário.
 */
function instalarFormularios() {
  const marcados = new WeakSet();

  const aoFocar = (evento) => {
    const campo = evento.target;
    if (!campo?.matches?.('input, textarea, select')) return;
    const form = campo.closest('form');
    if (!form || marcados.has(form)) return;
    marcados.add(form);
    registrar('form_start', { detalhe: form.getAttribute('data-rastreio') || form.id || 'form' });
  };

  const aoEnviar = (evento) => {
    const form = evento.target;
    if (!form?.matches?.('form')) return;
    registrar('form_submit', { detalhe: form.getAttribute('data-rastreio') || form.id || 'form' });
  };

  document.addEventListener('focusin', aoFocar, true);
  document.addEventListener('submit', aoEnviar, true);
  return () => {
    document.removeEventListener('focusin', aoFocar, true);
    document.removeEventListener('submit', aoEnviar, true);
  };
}

/** Fecha a visita com o tempo de permanência e despacha o que ficou na fila. */
function instalarSaida() {
  const inicio = Date.now();
  const aoSair = () => {
    if (document.visibilityState !== 'hidden') return;
    registrar('saida', { detalhe: `${Math.round((Date.now() - inicio) / 1000)}s` });
    enviar(true);
  };
  document.addEventListener('visibilitychange', aoSair);
  return () => document.removeEventListener('visibilitychange', aoSair);
}

/* ------------------------------------------------------------------ */
/* API do módulo                                                       */
/* ------------------------------------------------------------------ */

/** Liga a medição, se e somente se houver consentimento. Idempotente. */
export function iniciarMedicao({ ga4Id } = {}) {
  if (ligado || !consentiu()) return;
  ligado = true;

  carregarGa4(ga4Id);
  registrar('page_view');

  limpezas = [instalarCliques(), instalarSecoes(), instalarFormularios(), instalarSaida()];
}

/**
 * Desliga tudo e descarta o que estiver na fila — usado quando a pessoa
 * revoga o consentimento sem recarregar a página.
 */
export function pararMedicao() {
  ligado = false;
  fila = [];
  if (timer) {
    window.clearTimeout(timer);
    timer = null;
  }
  limpezas.forEach((fn) => fn?.());
  limpezas = [];
}
