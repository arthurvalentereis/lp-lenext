import PostCard from './PostCard'
import { useLanguage } from '../../../i18n/LanguageContext'

export default function RelatedPosts({ posts }) {
  const { t } = useLanguage()
  if (!posts.length) return null

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-xl font-bold">{t.blog.related}</h2>
      <div className="reveal-group grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
