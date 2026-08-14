import { useMemo, useState } from 'react'
import { getPosts, getUsedCategories, getFeatured, blogIndexPath } from '../../content'
import { useLanguage } from '../../i18n/LanguageContext'
import { useSeo } from '../../lib/seo'
import { blogJsonLd } from '../../lib/structuredData'
import useReveal from '../../hooks/useReveal'
import { BlogShell, useRouteLanguage } from './shared'
import PostCard from './components/PostCard'
import CategoryChips from './components/CategoryChips'
import NewsletterBlock from './components/NewsletterBlock'

export default function BlogIndex({ lang = 'pt' }) {
  useRouteLanguage(lang)
  const { t } = useLanguage()
  const blog = t.blog

  const [category, setCategory] = useState(null)

  const posts = useMemo(() => getPosts(lang), [lang])
  const categories = useMemo(() => getUsedCategories(lang), [lang])
  const featured = useMemo(() => getFeatured(lang), [lang])

  // O destaque só sai da grade quando ela mostra tudo; sob filtro, esconder um
  // post da categoria escolhida seria confuso.
  const listed = category ? posts.filter((post) => post.category === category) : posts
  const grid = category ? listed : listed.filter((post) => post.slug !== featured?.slug)

  // Reobserva ao filtrar: os cards novos montam depois do primeiro mount.
  useReveal([category, lang])

  useSeo({
    title: blog.metaTitle,
    description: blog.metaDescription,
    path: blogIndexPath(lang),
    lang,
    alternates: [
      { lang: 'pt-BR', path: blogIndexPath('pt') },
      { lang: 'en', path: blogIndexPath('en') },
      { lang: 'x-default', path: blogIndexPath('pt') },
    ],
    jsonLd: blogJsonLd(posts, {
      lang,
      name: blog.metaTitle,
      description: blog.metaDescription,
    }),
  })

  const alternates = [
    { code: 'pt', path: blogIndexPath('pt') },
    { code: 'en', path: blogIndexPath('en') },
  ]

  return (
    <BlogShell lang={lang} alternates={alternates}>
      <header className="reveal max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
          {blog.eyebrow}
        </span>
        <h1 className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">{blog.title}</h1>
        <p className="mt-5 text-lg text-mist">{blog.subtitle}</p>
      </header>

      {featured && !category && (
        <section className="reveal mt-12" aria-label={blog.featured}>
          <PostCard post={featured} variant="featured" />
        </section>
      )}

      <section className="mt-14">
        <div className="reveal flex flex-col gap-5 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold">{blog.latest}</h2>
          <CategoryChips categories={categories} active={category} onChange={setCategory} />
        </div>

        {grid.length === 0 ? (
          <p className="mt-10 text-mist">{blog.empty}</p>
        ) : (
          <div className="reveal-group mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grid.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      <NewsletterBlock />
    </BlogShell>
  )
}
