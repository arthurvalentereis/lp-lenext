/**
 * Pré-renderização do blog — roda depois do `vite build`.
 *
 * Por que existe: o site é uma SPA servida por um único `index.html`. Sem este
 * passo, todo post do blog compartilharia o título, a descrição e a imagem da
 * landing page — e o preview de WhatsApp/LinkedIn mostraria a LP em vez do
 * artigo. Crawlers modernos executam JS, mas os scrapers de link não.
 *
 * O que faz, para cada post e para os dois índices:
 *   1. grava `dist/<rota>/index.html` a partir do template do build;
 *   2. troca title, description, Open Graph, Twitter, canonical e hreflang;
 *   3. injeta JSON-LD (BlogPosting + BreadcrumbList, ou Blog no índice);
 *   4. coloca o conteúdo do artigo dentro de `#root`.
 *
 * O passo 4 é seguro porque o app usa `createRoot().render()` (e não
 * `hydrateRoot`): o React limpa o container ao montar, então não há risco de
 * mismatch de hidratação — o HTML estático serve a quem não executa JS.
 *
 * Também gera `sitemap.xml` e `robots.txt`.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { normalizePost, postBody, blogIndexPath, LANGS } from '../src/content/normalize.js'
import { absoluteUrl, ogLocale, SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from '../src/lib/site.js'
import {
  articleJsonLd,
  breadcrumbJsonLd,
  blogJsonLd,
  alternatesFor,
} from '../src/lib/structuredData.js'
import { translations } from '../src/i18n/translations.js'
import { categoryLabel } from '../src/content/categories.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const postsDir = path.join(root, 'src', 'content', 'posts')

/* ------------------------------------------------------------------ *
 * Utilidades de HTML
 * ------------------------------------------------------------------ */

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
}

/** Atualiza a meta se ela existir no template; senão, insere antes de `</head>`. */
function setMeta(html, attr, key, value) {
  if (!value) return html

  const pattern = new RegExp(`(<meta\\s+[^>]*${attr}="${key}"[^>]*content=")[^"]*(")`, 'i')
  if (pattern.test(html)) return html.replace(pattern, `$1${escapeHtml(value)}$2`)

  return html.replace(
    '</head>',
    `    <meta ${attr}="${key}" content="${escapeHtml(value)}" />\n  </head>`,
  )
}

function setCanonical(html, href) {
  const pattern = /(<link\s+rel="canonical"\s+href=")[^"]*(")/i
  if (pattern.test(html)) return html.replace(pattern, `$1${escapeHtml(href)}$2`)
  return html.replace('</head>', `    <link rel="canonical" href="${escapeHtml(href)}" />\n  </head>`)
}

function appendHead(html, snippet) {
  return html.replace('</head>', `${snippet}\n  </head>`)
}

function setLangAttribute(html, lang) {
  return html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${lang === 'en' ? 'en' : 'pt-BR'}"`)
}

function setRootContent(html, content) {
  return html.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
}

/* ------------------------------------------------------------------ *
 * Leitura dos posts
 * ------------------------------------------------------------------ */

function readPosts() {
  const posts = []

  for (const lang of LANGS) {
    const dir = path.join(postsDir, lang)
    if (!fs.existsSync(dir)) continue

    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md')) continue
      const source = fs.readFileSync(path.join(dir, file), 'utf8')
      posts.push(normalizePost(source, { lang, slug: file.replace(/\.md$/, ''), file }))
    }
  }

  posts.sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : a.title.localeCompare(b.title)))
  return posts
}

/* ------------------------------------------------------------------ *
 * Páginas
 * ------------------------------------------------------------------ */

function metaLine(post, blog) {
  const parts = [
    categoryLabel(post.category, post.lang),
    `${blog.by} ${post.author}`,
    `${blog.publishedOn} ${post.date}`,
    `${post.readingTime} ${blog.readingTime}`,
  ]
  return parts.filter(Boolean).map(escapeHtml).join(' · ')
}

function renderPostPage(template, post, translation) {
  const blog = translations[post.lang].blog
  const { html: body } = postBody(post)
  const canonical = absoluteUrl(post.url)
  const image = post.cover ?? DEFAULT_OG_IMAGE

  let html = setLangAttribute(template, post.lang)
  html = setTitle(html, post.seoTitle)
  html = setMeta(html, 'name', 'description', post.description)
  html = setMeta(html, 'property', 'og:title', post.seoTitle)
  html = setMeta(html, 'property', 'og:description', post.description)
  html = setMeta(html, 'property', 'og:type', 'article')
  html = setMeta(html, 'property', 'og:url', canonical)
  html = setMeta(html, 'property', 'og:image', absoluteUrl(image))
  html = setMeta(html, 'property', 'og:site_name', SITE_NAME)
  html = setMeta(html, 'property', 'og:locale', ogLocale(post.lang))
  html = setMeta(html, 'property', 'article:published_time', post.date)
  html = setMeta(html, 'property', 'article:modified_time', post.updated || post.date)
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image')
  html = setMeta(html, 'name', 'twitter:title', post.seoTitle)
  html = setMeta(html, 'name', 'twitter:description', post.description)
  html = setMeta(html, 'name', 'twitter:image', absoluteUrl(image))
  html = setCanonical(html, canonical)

  const hreflang = alternatesFor(post, translation)
    .map(
      (alternate) =>
        `    <link rel="alternate" hreflang="${alternate.lang}" href="${escapeHtml(
          absoluteUrl(alternate.path),
        )}" />`,
    )
    .join('\n')

  const jsonLd = JSON.stringify([articleJsonLd(post), breadcrumbJsonLd(post, blog.eyebrow)])
  html = appendHead(
    html,
    `${hreflang}\n    <script type="application/ld+json">${jsonLd}</script>`,
  )

  // Classes iguais às do componente para que o conteúdo estático já apareça
  // estilizado antes de o React montar.
  const content = `<div class="mx-auto w-full max-w-6xl px-5 py-14">
<article class="prose-lenext max-w-3xl">
<p>${metaLine(post, blog)}</p>
<h1>${escapeHtml(post.title)}</h1>
<p>${escapeHtml(post.description)}</p>
${body}
</article>
<p><a href="${escapeHtml(blogIndexPath(post.lang))}">${escapeHtml(blog.backToBlog)}</a></p>
</div>`

  return setRootContent(html, content)
}

function renderIndexPage(template, lang, posts) {
  const blog = translations[lang].blog
  const canonical = absoluteUrl(blogIndexPath(lang))

  let html = setLangAttribute(template, lang)
  html = setTitle(html, blog.metaTitle)
  html = setMeta(html, 'name', 'description', blog.metaDescription)
  html = setMeta(html, 'property', 'og:title', blog.metaTitle)
  html = setMeta(html, 'property', 'og:description', blog.metaDescription)
  html = setMeta(html, 'property', 'og:type', 'website')
  html = setMeta(html, 'property', 'og:url', canonical)
  html = setMeta(html, 'property', 'og:site_name', SITE_NAME)
  html = setMeta(html, 'property', 'og:locale', ogLocale(lang))
  html = setMeta(html, 'name', 'twitter:card', 'summary_large_image')
  html = setMeta(html, 'name', 'twitter:title', blog.metaTitle)
  html = setMeta(html, 'name', 'twitter:description', blog.metaDescription)
  html = setCanonical(html, canonical)

  const hreflang = [
    { lang: 'pt-BR', path: blogIndexPath('pt') },
    { lang: 'en', path: blogIndexPath('en') },
    { lang: 'x-default', path: blogIndexPath('pt') },
  ]
    .map(
      (alternate) =>
        `    <link rel="alternate" hreflang="${alternate.lang}" href="${escapeHtml(
          absoluteUrl(alternate.path),
        )}" />`,
    )
    .join('\n')

  const jsonLd = JSON.stringify(
    blogJsonLd(posts, { lang, name: blog.metaTitle, description: blog.metaDescription }),
  )
  html = appendHead(
    html,
    `${hreflang}\n    <script type="application/ld+json">${jsonLd}</script>`,
  )

  const items = posts
    .map(
      (post) => `<li>
<a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a>
<p>${escapeHtml(post.excerpt)}</p>
</li>`,
    )
    .join('\n')

  const content = `<div class="mx-auto w-full max-w-6xl px-5 py-14">
<article class="prose-lenext max-w-3xl">
<h1>${escapeHtml(blog.title)}</h1>
<p>${escapeHtml(blog.subtitle)}</p>
<ul>
${items}
</ul>
</article>
</div>`

  return setRootContent(html, content)
}

/* ------------------------------------------------------------------ *
 * Escrita
 * ------------------------------------------------------------------ */

function writePage(route, html) {
  // `/blog/slug` → `dist/blog/slug/index.html`: a Vercel resolve arquivos
  // estáticos antes dos rewrites do vercel.json, então a rota cai neste HTML
  // em vez do fallback da SPA.
  const dir = path.join(distDir, route.replace(/^\//, ''))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8')
}

function writeSitemap(posts) {
  const staticRoutes = [
    { path: '/', priority: '1.0' },
    { path: '/resources/ebook-politica-credito', priority: '0.7' },
    { path: '/resources/prompt-analise-credito', priority: '0.7' },
    { path: blogIndexPath('pt'), priority: '0.9' },
    { path: blogIndexPath('en'), priority: '0.6' },
  ]

  const today = new Date().toISOString().slice(0, 10)

  const urls = [
    ...staticRoutes.map(
      (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${route.priority}</priority>
  </url>`,
    ),
    ...posts.map(
      (post) => `  <url>
    <loc>${absoluteUrl(post.url)}</loc>
    <lastmod>${post.updated || post.date || today}</lastmod>
    <priority>${post.lang === 'pt' ? '0.8' : '0.5'}</priority>
  </url>`,
    ),
  ].join('\n')

  fs.writeFileSync(
    path.join(distDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    'utf8',
  )
}

function writeRobots() {
  fs.writeFileSync(
    path.join(distDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    'utf8',
  )
}

/* ------------------------------------------------------------------ *
 * Execução
 * ------------------------------------------------------------------ */

function main() {
  const templatePath = path.join(distDir, 'index.html')
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html não encontrado. Rode "vite build" antes do prerender.')
  }

  const template = fs.readFileSync(templatePath, 'utf8')
  const posts = readPosts()

  for (const post of posts) {
    const translation = posts.find(
      (other) => other.lang !== post.lang && other.translationOf === post.translationOf,
    )
    writePage(post.url, renderPostPage(template, post, translation))
  }

  for (const lang of LANGS) {
    const langPosts = posts.filter((post) => post.lang === lang)
    writePage(blogIndexPath(lang), renderIndexPage(template, lang, langPosts))
  }

  writeSitemap(posts)
  writeRobots()

  console.log(
    `prerender: ${posts.length} posts + ${LANGS.length} índices, sitemap.xml e robots.txt gerados.`,
  )
}

main()
