// Identidade do site usada por SEO, sitemap e prerender.
// Importado tanto pelo app quanto por scripts/prerender.mjs (Node), então não
// pode depender de nada do Vite ou do navegador.

// www, não apex: a Vercel tem www.lenext.com.br como domínio primário e
// redireciona lenext.com.br (308) pra ele — declarar canônico diferente do
// que o servidor realmente serve confunde a indexação do Google.
export const SITE_URL = 'https://www.lenext.com.br'
export const SITE_NAME = 'Lenext'
export const DEFAULT_OG_IMAGE = '/painel-credito.webp'

/** Caminho relativo → URL absoluta (o que OG, canonical e sitemap exigem). */
export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Código de idioma no formato que o Open Graph espera. */
export function ogLocale(lang) {
  return lang === 'en' ? 'en_US' : 'pt_BR'
}
