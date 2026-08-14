/**
 * Índice do blog.
 *
 * Os posts vivem em `src/content/posts/<lang>/<slug>.md` e são carregados pelo
 * glob do Vite — publicar um artigo é criar um arquivo, sem tocar em rota,
 * componente ou dicionário de tradução.
 */

import { normalizePost, postBody, DEFAULT_LANG, LANGS, postPath, blogIndexPath } from './normalize'
import { CATEGORIES, categoryLabel, getCategory } from './categories'

export { postBody, DEFAULT_LANG, LANGS, postPath, blogIndexPath, CATEGORIES, categoryLabel, getCategory }

const files = import.meta.glob('./posts/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function buildIndex() {
  const posts = []

  for (const [path, source] of Object.entries(files)) {
    const match = /\.\/posts\/([^/]+)\/([^/]+)\.md$/.exec(path)
    // `_TEMPLATE.md` fica na raiz de posts/, fora do padrão <lang>/<slug> — o
    // glob não o alcança, mas a guarda protege de qualquer outro arquivo solto.
    if (!match) continue

    const [, lang, slug] = match
    if (!LANGS.includes(lang)) continue

    posts.push(normalizePost(source, { lang, slug, file: path }))
  }

  // Mais recentes primeiro; empate resolvido pelo título para a ordem ser estável
  // entre builds (senão o sitemap e o prerender mudariam sem motivo).
  posts.sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : a.title.localeCompare(b.title)))

  return posts
}

const ALL_POSTS = buildIndex()

/** Posts de um idioma, opcionalmente filtrados por categoria. */
export function getPosts(lang = DEFAULT_LANG, { category } = {}) {
  return ALL_POSTS.filter(
    (post) => post.lang === lang && (!category || post.category === category),
  )
}

export function getPost(lang, slug) {
  return ALL_POSTS.find((post) => post.lang === lang && post.slug === slug) ?? null
}

/** O par do post no outro idioma — base do `hreflang` e do seletor de idioma. */
export function getTranslation(post, lang) {
  if (!post) return null
  return (
    ALL_POSTS.find(
      (other) => other.lang === lang && other.translationOf === post.translationOf,
    ) ?? null
  )
}

/**
 * Relacionados: primeiro os declarados no frontmatter (na ordem escrita),
 * depois os da mesma categoria, até `limit`.
 */
export function getRelated(post, limit = 2) {
  if (!post) return []

  const pool = getPosts(post.lang).filter((other) => other.slug !== post.slug)
  const picked = []

  for (const slug of post.related) {
    const found = pool.find((other) => other.slug === slug)
    if (found && !picked.includes(found)) picked.push(found)
  }

  for (const other of pool) {
    if (picked.length >= limit) break
    if (other.category === post.category && !picked.includes(other)) picked.push(other)
  }

  return picked.slice(0, limit)
}

/** Categorias que de fato têm post publicado no idioma — evita filtro vazio. */
export function getUsedCategories(lang = DEFAULT_LANG) {
  const used = new Set(getPosts(lang).map((post) => post.category))
  return CATEGORIES.filter((category) => used.has(category.slug))
}

export function getFeatured(lang = DEFAULT_LANG) {
  const posts = getPosts(lang)
  return posts.find((post) => post.featured) ?? posts[0] ?? null
}
