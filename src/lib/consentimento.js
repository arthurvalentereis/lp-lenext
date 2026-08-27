/**
 * Estado de consentimento para medição (LGPD).
 *
 * Regra da casa: **nada de medição dispara antes de um "aceitar" explícito.**
 * Nem o GA4, nem os eventos próprios. Enquanto a escolha não existe, a página
 * funciona normalmente e não registra nada.
 *
 * Por que os eventos próprios também esperam, mesmo sendo anônimos: eles são
 * anônimos por construção, mas exigir o mesmo opt-in deixa a promessa simples
 * de explicar e de auditar — "recusei, logo nada foi coletado". Um regime com
 * duas regras diferentes é o tipo de coisa que se perde na próxima refatoração.
 *
 * A escolha vive em `localStorage` (precisa sobreviver entre visitas, senão o
 * banner reaparece toda vez). É a única coisa que este módulo persiste — e ela
 * não descreve a pessoa, descreve a preferência dela.
 */

const CHAVE = 'lenext:consentimento-medicao';

export const ACEITO = 'aceito';
export const RECUSADO = 'recusado';

/** Sinais do navegador que já expressam recusa — respeitados sem perguntar. */
function recusaDoNavegador() {
  if (typeof navigator === 'undefined') return false;
  // Global Privacy Control: sinal legalmente reconhecido de opt-out.
  if (navigator.globalPrivacyControl === true) return true;
  // Do Not Track: sem força de lei, mas é uma manifestação clara de escolha.
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return true;
  return false;
}

/** `'aceito'`, `'recusado'` ou `null` quando a pessoa ainda não decidiu. */
export function lerConsentimento() {
  if (recusaDoNavegador()) return RECUSADO;
  try {
    const valor = window.localStorage.getItem(CHAVE);
    return valor === ACEITO || valor === RECUSADO ? valor : null;
  } catch {
    // Sem localStorage (aba privada, cookies bloqueados): trata como não
    // decidido. Nunca como aceito.
    return null;
  }
}

export function consentiu() {
  return lerConsentimento() === ACEITO;
}

/** Grava a escolha e avisa quem estiver ouvindo (o app reage sem recarregar). */
export function definirConsentimento(valor) {
  const escolha = valor === ACEITO ? ACEITO : RECUSADO;
  try {
    window.localStorage.setItem(CHAVE, escolha);
  } catch {
    // Não conseguir persistir não impede valer nesta sessão.
  }
  window.dispatchEvent(new CustomEvent('lenext:consentimento', { detail: escolha }));
  return escolha;
}

/**
 * Permite revogar depois (exigência prática da LGPD: retirar o consentimento
 * tem de ser tão fácil quanto dar). O rodapé chama isto.
 */
export function reabrirEscolha() {
  try {
    window.localStorage.removeItem(CHAVE);
  } catch {
    /* ignora */
  }
  window.dispatchEvent(new CustomEvent('lenext:consentimento', { detail: null }));
}

/** Assina mudanças de consentimento; devolve a função de cancelar. */
export function aoMudarConsentimento(callback) {
  const handler = (e) => callback(e.detail ?? null);
  window.addEventListener('lenext:consentimento', handler);
  return () => window.removeEventListener('lenext:consentimento', handler);
}
