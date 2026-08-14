import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import { useLanguage } from '../../../i18n/LanguageContext'

/**
 * CTA de fim de artigo. Um só por post, por decisão editorial — dois CTAs
 * competindo é o padrão que a análise de conversão do projeto já identificou
 * como perda de clique.
 *
 * O tipo vem do frontmatter (`cta: { type, href }`) e escolhe a cópia; o
 * `href` permite apontar para outro destino sem criar um tipo novo.
 */
export default function PostCta({ cta }) {
  const { t } = useLanguage()
  const type = cta?.type === 'demo' ? 'demo' : 'ebook'
  const copy = t.blog.cta[type]
  const href = cta?.href ?? (type === 'demo' ? '/#contato' : '/resources/ebook-politica-credito')
  const isRoute = href.startsWith('/') && !href.startsWith('/#')

  return (
    <aside className="reveal mt-14 overflow-hidden rounded-2xl border border-brand-purple/40 bg-ink-card p-8 ring-brand-glow sm:p-10">
      <h2 className="text-2xl font-bold">{copy.title}</h2>
      <p className="mt-3 max-w-2xl text-mist">{copy.desc}</p>
      <div className="mt-6">
        {isRoute ? (
          <Button as={Link} to={href}>
            {copy.label}
          </Button>
        ) : (
          <Button href={href}>{copy.label}</Button>
        )}
      </div>
    </aside>
  )
}
