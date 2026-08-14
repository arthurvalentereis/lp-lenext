/**
 * Normalização de um arquivo `.md` em objeto de post.
 *
 * Puro e sem dependência do Vite: `src/content/index.js` alimenta isto com o
 * glob do bundler e `scripts/prerender.mjs` alimenta com `fs.readFileSync`.
 * Um único lugar decide o formato do post, então o HTML pré-renderizado e o
 * que o React monta são necessariamente iguais.
 */

import { parseFrontmatter, renderMarkdown, readingTime } from '../lib/markdown.js'

export const LANGS = ['pt', 'en']
export const DEFAULT_LANG = 'pt'

/** URL canônica do post. Só o blog carrega o idioma na URL (ver docs/blog-editorial.md). */
export function postPath(slug, lang) {
  return lang === 'en' ? `/en/blog/${slug}` : `/blog/${slug}`
}

export function blogIndexPath(lang) {
  return lang === 'en' ? '/en/blog' : '/blog'
}

function asArray(value) {
  if (Array.isArray(value)) return value
  if (value === undefined || value === null || value === '') return []
  return [value]
}

/**
 * @param {string} source conteúdo bruto do arquivo .md
 * @param {{ lang: string, slug: string, file?: string }} context
 */
export function normalizePost(source, { lang, slug, file }) {
  const { data, content } = parseFrontmatter(source)

  // O nome do arquivo é a fonte da verdade do slug: garante que a URL sempre
  // exista, mesmo que alguém esqueça o campo no frontmatter.
  const resolvedSlug = String(data.slug ?? slug)
  const resolvedLang = LANGS.includes(data.lang) ? data.lang : lang

  if (!data.title) {
    throw new Error(`Post sem "title" no frontmatter: ${file ?? resolvedSlug}`)
  }

  return {
    slug: resolvedSlug,
    lang: resolvedLang,
    file,
    url: postPath(resolvedSlug, resolvedLang),

    title: String(data.title),
    seoTitle: data.seoTitle ? String(data.seoTitle) : String(data.title),
    description: String(data.description ?? ''),
    excerpt: String(data.excerpt ?? data.description ?? ''),

    category: data.category ? String(data.category) : null,
    funnel: data.funnel ? String(data.funnel) : null,
    editorial: data.editorial ? String(data.editorial) : null,
    tags: asArray(data.tags).map(String),

    author: String(data.author ?? 'Equipe Lenext'),
    authorRole: data.authorRole ? String(data.authorRole) : '',

    date: String(data.date ?? ''),
    updated: data.updated ? String(data.updated) : String(data.date ?? ''),

    cover: data.cover ? String(data.cover) : null,
    coverAlt: data.coverAlt ? String(data.coverAlt) : '',

    featured: data.featured === true,
    // Liga as duas versões de idioma; sem isso não há hreflang recíproco.
    translationOf: String(data.translationOf ?? resolvedSlug),

    cta: data.cta && typeof data.cta === 'object' ? data.cta : null,
    related: asArray(data.related).map(String),

    readingTime: readingTime(content),
    raw: content,
  }
}

const bodyCache = new Map()

/**
 * Renderiza o corpo sob demanda e memoiza — o índice do blog precisa só dos
 * metadados, e converter todos os artigos a cada carregamento seria desperdício.
 *
 * @returns {{ html: string, toc: {id: string, text: string, level: number}[] }}
 */
export function postBody(post) {
  const key = `${post.lang}:${post.slug}`
  if (!bodyCache.has(key)) bodyCache.set(key, renderMarkdown(post.raw))
  return bodyCache.get(key)
}
