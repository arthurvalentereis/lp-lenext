/**
 * POST /api/eventos — grava eventos anônimos de comportamento na LP.
 *
 * O cliente manda um lote (o navegador enfileira e envia junto), e este
 * handler é o guarda do que entra no banco.
 *
 * ------------------------------------------------------------------
 * Por que o servidor filtra em vez de confiar no cliente
 * ------------------------------------------------------------------
 * O payload vem do navegador, ou seja, é editável por qualquer pessoa. Duas
 * consequências que este arquivo trata:
 *
 *  1. **Nada de dado pessoal entra por acidente.** Só os campos da allowlist
 *     abaixo são gravados; qualquer outra chave é descartada em silêncio.
 *     Isso impede que uma alteração futura no front comece a mandar e-mail no
 *     `detalhe` sem ninguém perceber.
 *  2. **Nem IP nem user-agent são gravados**, embora a Vercel os entregue de
 *     graça em `req.headers`. Guardá-los transformaria um registro anônimo em
 *     dado pessoal (IP é identificador sob a LGPD) e mudaria a base legal da
 *     tabela inteira.
 *
 * Env (Vercel, projeto da LP):
 *   SUPABASE_URL                — obrigatória
 *   SUPABASE_SERVICE_ROLE_KEY   — obrigatória; só existe no servidor
 */

import { supabase, texto } from './_supabase.js';

const TIPOS_ACEITOS = new Set([
  'page_view',
  'cta_click',
  'secao_vista',
  'form_start',
  'form_submit',
  'saida',
  // Conversões nomeadas (ver EVENTOS_CONVERSAO em src/lib/analytics.js).
  // lead_diagnostico está na lista mas nada dispara ainda — a ferramenta
  // de diagnóstico (F1-06 no plano) não existe no código.
  'lead_ebook',
  'lead_prompt',
  'lead_diagnostico',
  'lead_demo',
  'newsletter_signup',
  'whatsapp_click',
]);

/** Um lote maior que isto é ruído ou abuso — nunca uso legítimo. */
const MAX_EVENTOS_POR_LOTE = 30;
const MAX_TEXTO = 200;

/**
 * Só o host do referrer. A URL inteira pode carregar termo de busca ou dado
 * pessoal no query string de outro site — nada disso tem valor aqui.
 */
function hostDoReferrer(valor) {
  const bruto = texto(valor, 500);
  if (!bruto) return null;
  try {
    return new URL(bruto).host.slice(0, MAX_TEXTO) || null;
  } catch {
    return null;
  }
}

/** Converte um evento do cliente na linha que vai ao banco, ou `null`. */
function linhaDoEvento(bruto, sessaoId) {
  if (!bruto || typeof bruto !== 'object') return null;

  const tipo = texto(bruto.tipo, 40);
  if (!tipo || !TIPOS_ACEITOS.has(tipo)) return null;

  const utm = bruto.utm && typeof bruto.utm === 'object' ? bruto.utm : {};

  return {
    sessao_id: sessaoId,
    tipo,
    detalhe: texto(bruto.detalhe),
    destino: texto(bruto.destino, 500),
    caminho: texto(bruto.caminho, 300),
    utm_source: texto(utm.source, 100),
    utm_medium: texto(utm.medium, 100),
    utm_campaign: texto(utm.campaign, 100),
    utm_content: texto(utm.content, 100),
    utm_term: texto(utm.term, 100),
    referrer_host: hostDoReferrer(bruto.referrer),
  };
}

async function gravar(linhas) {
  await supabase('lp_eventos', { method: 'POST', body: linhas, prefer: 'return=minimal' });
}

export default async function handler(req, res) {
  // `sendBeacon` (usado na saída da página) só faz POST — é o único verbo.
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' });
    return;
  }

  try {
    const corpo = req.body || {};
    const sessaoId = texto(corpo.sessaoId, 64);
    if (!sessaoId) {
      res.status(400).json({ error: 'sessaoId é obrigatório.' });
      return;
    }

    const entrada = Array.isArray(corpo.eventos) ? corpo.eventos : [];
    const linhas = entrada
      .slice(0, MAX_EVENTOS_POR_LOTE)
      .map((e) => linhaDoEvento(e, sessaoId))
      .filter(Boolean);

    if (linhas.length === 0) {
      // Lote só com eventos inválidos: não é erro do cliente que valha 4xx,
      // e responder 204 evita retry inútil.
      res.status(204).end();
      return;
    }

    await gravar(linhas);
    res.status(204).end();
  } catch (erro) {
    // Medição nunca pode virar erro visível para quem está navegando: loga e
    // responde 204. O front também ignora a resposta.
    console.error('[eventos] falha ao gravar:', erro);
    res.status(204).end();
  }
}
