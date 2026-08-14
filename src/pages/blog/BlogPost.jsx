import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getPost,
  getRelated,
  getTranslation,
  postBody,
  categoryLabel,
  blogIndexPath,
} from '../../content'
import { useLanguage } from '../../i18n/LanguageContext'
import { useSeo } from '../../lib/seo'
import { articleJsonLd, breadcrumbJsonLd, alternatesFor } from '../../lib/structuredData'
import useReveal from '../../hooks/useReveal'
import { BlogShell, useRouteLanguage, useScrollTop, formatDate } from './shared'
import TableOfContents from './components/TableOfContents'
import PostCta from './components/PostCta'
import RelatedPosts from './components/RelatedPosts'
import ShareRow from './components/ShareRow'

export default function BlogPost({ lang = 'pt' }) {
  const { slug } = useParams()
  useRouteLanguage(lang)
  useScrollTop(slug)

  const post = useMemo(() => getPost(lang, slug), [lang, slug])

  if (!post) return <PostNotFound lang={lang} />
  return <Article key={`${lang}:${slug}`} post={post} lang={lang} />
}

function Article({ post, lang }) {
  const { t } = useLanguage()
  const blog = t.blog

  const { html, toc } = useMemo(() => postBody(post), [post])
  const translation = useMemo(() => getTranslation(post, lang === 'en' ? 'pt' : 'en'), [post, lang])
  const related = useMemo(() => getRelated(post), [post])

  useReveal([post.slug])

  useSeo({
    title: post.seoTitle,
    description: post.description,
    path: post.url,
    image: post.cover ?? undefined,
    type: 'article',
    lang,
    publishedTime: post.date,
    modifiedTime: post.updated,
    alternates: alternatesFor(post, translation),
    jsonLd: [articleJsonLd(post), breadcrumbJsonLd(post, blog.eyebrow)],
  })

  const languageAlternates = [
    { code: post.lang, path: post.url },
    ...(translation ? [{ code: translation.lang, path: translation.url }] : []),
  ]

  return (
    <BlogShell lang={lang} alternates={languageAlternates}>
      <Link
        to={blogIndexPath(lang)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-mist transition-colors hover:text-fg"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        {blog.backToBlog}
      </Link>

      <article className="mt-8">
        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mist">
            <span className="font-semibold uppercase tracking-wider text-brand-orange">
              {categoryLabel(post.category, lang)}
            </span>
            <span aria-hidden>·</span>
            <span>
              {post.readingTime} {blog.readingTime}
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-mist">{post.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-line pt-5 text-sm text-mist">
            <span className="font-medium text-fg">
              {blog.by} {post.author}
            </span>
            {post.authorRole && (
              <>
                <span aria-hidden>·</span>
                <span>{post.authorRole}</span>
              </>
            )}
            <span aria-hidden>·</span>
            <time dateTime={post.date}>
              {blog.publishedOn} {formatDate(post.date, lang)}
            </time>
            {post.updated && post.updated !== post.date && (
              <>
                <span aria-hidden>·</span>
                <time dateTime={post.updated}>
                  {blog.updatedOn} {formatDate(post.updated, lang)}
                </time>
              </>
            )}
          </div>
        </header>

        {post.cover && (
          <img
            src={post.cover}
            alt={post.coverAlt}
            className="mt-10 w-full rounded-2xl border border-line object-cover"
          />
        )}

        <div className="mt-12 gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div
            className="prose-lenext max-w-3xl"
            // Conteúdo é de primeira parte (arquivos .md do próprio repositório,
            // versionados no git) — não há entrada de usuário para sanear aqui.
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <aside className="mt-12 lg:mt-0">
            <TableOfContents items={toc} />
          </aside>
        </div>

        <div className="max-w-3xl">
          <ShareRow post={post} />
          <PostCta cta={post.cta} />
        </div>
      </article>

      <RelatedPosts posts={related} />
    </BlogShell>
  )
}

function PostNotFound({ lang }) {
  const { t } = useLanguage()

  return (
    <BlogShell lang={lang}>
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="text-3xl font-extrabold">{t.blog.notFoundTitle}</h1>
        <p className="mt-4 text-mist">{t.blog.notFoundDesc}</p>
        <Link
          to={blogIndexPath(lang)}
          className="mt-8 inline-flex items-center gap-1.5 font-semibold text-brand-purple hover:text-brand-orange"
        >
          {t.blog.backToBlog}
        </Link>
      </div>
    </BlogShell>
  )
}
