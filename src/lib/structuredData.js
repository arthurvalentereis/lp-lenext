// Dados estruturados (schema.org) do blog.
// Módulo puro: o app injeta via `useSeo` e o `scripts/prerender.mjs` grava o
// mesmo JSON no HTML estático — é essencial que os dois produzam o idêntico,
// senão o Google vê uma coisa e o usuário outra.

// Extensões explícitas nos imports: este módulo também é carregado pelo Node
// em `scripts/prerender.mjs`, e o resolver de ESM do Node não completa `.js`.
import { SITE_URL, SITE_NAME, absoluteUrl } from './site.js'
import { blogIndexPath } from '../content/normalize.js'

const ORGANIZATION = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/logo-lenext-branco.png'),
}

export function articleJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    inLanguage: post.lang === 'en' ? 'en' : 'pt-BR',
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: ORGANIZATION,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(post.url) },
    ...(post.cover ? { image: [absoluteUrl(post.cover)] } : {}),
    ...(post.tags.length ? { keywords: post.tags.join(', ') } : {}),
  }
}

export function breadcrumbJsonLd(post, blogLabel) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: blogLabel,
        item: absoluteUrl(blogIndexPath(post.lang)),
      },
      { '@type': 'ListItem', position: 3, name: post.title, item: absoluteUrl(post.url) },
    ],
  }
}

/** Blog + lista de posts, para a página de índice. */
export function blogJsonLd(posts, { lang, name, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name,
    description,
    url: absoluteUrl(blogIndexPath(lang)),
    inLanguage: lang === 'en' ? 'en' : 'pt-BR',
    publisher: ORGANIZATION,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: absoluteUrl(post.url),
      datePublished: post.date,
    })),
  }
}

/** Um post e seu par de idioma viram os `hreflang` recíprocos da página. */
export function alternatesFor(post, translation) {
  const alternates = [{ lang: post.lang === 'en' ? 'en' : 'pt-BR', path: post.url }]
  if (translation) {
    alternates.push({ lang: translation.lang === 'en' ? 'en' : 'pt-BR', path: translation.url })
  }
  const canonicalDefault = post.lang === 'pt' ? post : translation
  if (canonicalDefault) alternates.push({ lang: 'x-default', path: canonicalDefault.url })
  return alternates
}
