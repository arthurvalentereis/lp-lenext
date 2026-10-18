/**
 * Acesso ao Supabase (projeto lenext-marketing) pelas functions da LP.
 *
 * Usa a API REST (PostgREST) com a service_role, que só existe no servidor:
 * as tabelas têm RLS ligado e nenhuma policy, então nada do navegador fala
 * com o banco direto. Prefixo `_` = a Vercel não expõe este arquivo como rota.
 *
 * Env (Vercel, projeto da LP):
 *   SUPABASE_URL                — obrigatória
 *   SUPABASE_SERVICE_ROLE_KEY   — obrigatória; só existe no servidor
 */

/**
 * Chama `/rest/v1/<caminho>` e devolve o JSON da resposta (ou `null` quando
 * a resposta vem vazia, como em `Prefer: return=minimal`).
 *
 * @param {string} caminho tabela + query string do PostgREST
 * @param {{ method?: string, body?: unknown, prefer?: string }} [opcoes]
 */
export async function supabase(caminho, { method = 'GET', body, prefer } = {}) {
  const url = process.env.SUPABASE_URL;
  const chave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !chave) {
    throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configuradas.');
  }

  const headers = {
    apikey: chave,
    Authorization: `Bearer ${chave}`,
  };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (prefer) headers.Prefer = prefer;

  const resposta = await fetch(`${url.replace(/\/+$/, '')}/rest/v1/${caminho}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const corpo = await resposta.text();
  if (!resposta.ok) {
    throw new Error(`Supabase ${resposta.status}: ${corpo.slice(0, 300)}`);
  }
  return corpo ? JSON.parse(corpo) : null;
}

/** Texto do payload: só string, espaços colapsados, cortado em `limite`. */
export function texto(valor, limite = 200) {
  if (typeof valor !== 'string') return null;
  const limpo = valor.trim().replace(/\s+/g, ' ');
  return limpo ? limpo.slice(0, limite) : null;
}
