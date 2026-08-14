import { Link } from 'react-router-dom'
import { categoryLabel } from '../../../content'
import { useLanguage } from '../../../i18n/LanguageContext'
import { formatDate } from '../shared'

export default function PostCard({ post, variant = 'default' }) {
  const { t, lang } = useLanguage()
  const blog = t.blog
  const featured = variant === 'featured'

  return (
    <article
      className={`card-hover elev group relative flex overflow-hidden rounded-2xl border border-line bg-ink-card ${
        featured ? 'flex-col lg:flex-row' : 'flex-col'
      }`}
    >
      {post.cover && (
        <Link
          to={post.url}
          className={`block overflow-hidden bg-ink-soft ${featured ? 'lg:w-1/2' : ''}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={post.cover}
            alt=""
            loading={featured ? 'eager' : 'lazy'}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
              featured ? 'h-56 lg:h-full' : 'h-44'
            }`}
          />
        </Link>
      )}

      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? 'lg:justify-center' : ''}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mist">
          <span className="font-semibold uppercase tracking-wider text-brand-orange">
            {categoryLabel(post.category, lang)}
          </span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
          <span aria-hidden>·</span>
          <span>
            {post.readingTime} {blog.readingTime}
          </span>
        </div>

        <h3 className={`mt-3 font-bold leading-snug ${featured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
          {/* O link cobre o card inteiro (::after) para a área de clique não
              ser só o texto do título. */}
          <Link to={post.url} className="after:absolute after:inset-0 hover:text-brand-purple">
            {post.title}
          </Link>
        </h3>

        <p className={`mt-3 text-mist ${featured ? 'text-base' : 'text-sm'}`}>{post.excerpt}</p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple">
          {blog.readMore}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </article>
  )
}
