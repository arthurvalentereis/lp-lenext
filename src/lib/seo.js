import { useEffect } from 'react'
import { SITE_NAME, absoluteUrl, ogLocale, DEFAULT_OG_IMAGE } from './site'

/**
 * Gerencia as meta tags da rota atual.
 *
 * O `index.html` é único e serve todas as rotas da SPA, então sem isto todo
 * post compartilharia título, descrição e imagem da landing page.
 *
 * As tags do HTML base são reaproveitadas (não duplicadas) e o valor anterior
 * é restaurado ao desmontar — sair de um post e voltar para a home tem que
 * devolver o `<head>` ao estado original, senão o Google e os previews de
 * link continuam vendo o post.
 *
 * O `scripts/prerender.mjs` grava as mesmas tags no HTML estático; aqui elas
 * existem para a navegação client-side (o crawler já recebeu as corretas).
 */

/** Cria ou atualiza uma tag, devolvendo a função que desfaz a alteração. */
function upsertMeta(attr, key, content) {
  if (!content) return null

  const existing = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (existing) {
    const previous = existing.getAttribute('content')
    existing.setAttribute('content', content)
    return () => existing.setAttribute('content', previous ?? '')
  }

  const el = document.createElement('meta')
  el.setAttribute(attr, key)
  el.setAttribute('content', content)
  document.head.appendChild(el)
  return () => el.remove()
}

function upsertLink(rel, href, hreflang) {
  if (!href) return null

  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`

  const existing = document.head.querySelector(selector)
  if (existing) {
    const previous = existing.getAttribute('href')
    existing.setAttribute('href', href)
    return () => existing.setAttribute('href', previous ?? '')
  }

  const el = document.createElement('link')
  el.setAttribute('rel', rel)
  if (hreflang) el.setAttribute('hreflang', hreflang)
  el.setAttribute('href', href)
  document.head.appendChild(el)
  return () => el.remove()
}

function setJsonLd(data) {
  if (!data) return null

  // Em rota pré-renderizada o script já veio no HTML: reaproveitar evita que a
  // página fique com dois blocos de structured data descrevendo o mesmo post.
  const existing = document.head.querySelector('script[type="application/ld+json"]')
  if (existing) {
    const previous = existing.textContent
    existing.textContent = JSON.stringify(data)
    return () => {
      existing.textContent = previous
    }
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
  return () => script.remove()
}

/**
 * @param {{
 *   title: string,
 *   description?: string,
 *   path?: string,
 *   image?: string,
 *   type?: 'website' | 'article',
 *   lang?: string,
 *   publishedTime?: string,
 *   modifiedTime?: string,
 *   alternates?: {lang: string, path: string}[],
 *   jsonLd?: object,
 * }} meta
 */
export function useSeo(meta) {
  const {
    title,
    description = '',
    path = '/',
    image = DEFAULT_OG_IMAGE,
    type = 'website',
    lang = 'pt',
    publishedTime = '',
    modifiedTime = '',
    alternates = [],
    jsonLd = null,
  } = meta

  // `alternates` e `jsonLd` costumam ser literais recriados a cada render;
  // serializar evita reexecutar o efeito sem que nada tenha mudado de fato.
  const alternatesKey = JSON.stringify(alternates)
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const previousTitle = document.title
    const canonical = absoluteUrl(path)
    document.title = title

    const restorers = [
      upsertMeta('name', 'description', description),
      upsertMeta('property', 'og:title', title),
      upsertMeta('property', 'og:description', description),
      upsertMeta('property', 'og:type', type),
      upsertMeta('property', 'og:url', canonical),
      upsertMeta('property', 'og:image', absoluteUrl(image)),
      upsertMeta('property', 'og:site_name', SITE_NAME),
      upsertMeta('property', 'og:locale', ogLocale(lang)),
      upsertMeta('name', 'twitter:card', 'summary_large_image'),
      upsertMeta('name', 'twitter:title', title),
      upsertMeta('name', 'twitter:description', description),
      upsertMeta('name', 'twitter:image', absoluteUrl(image)),
      type === 'article' ? upsertMeta('property', 'article:published_time', publishedTime) : null,
      type === 'article' ? upsertMeta('property', 'article:modified_time', modifiedTime) : null,
      upsertLink('canonical', canonical),
      ...JSON.parse(alternatesKey).map((alternate) =>
        upsertLink('alternate', absoluteUrl(alternate.path), alternate.lang),
      ),
      setJsonLd(jsonLdKey ? JSON.parse(jsonLdKey) : null),
    ]

    return () => {
      document.title = previousTitle
      // Ordem inversa: se duas chamadas tocaram a mesma tag, a última a
      // alterar é a primeira a restaurar.
      for (const restore of restorers.reverse()) restore?.()
    }
  }, [
    title,
    description,
    path,
    image,
    type,
    lang,
    publishedTime,
    modifiedTime,
    alternatesKey,
    jsonLdKey,
  ])
}
