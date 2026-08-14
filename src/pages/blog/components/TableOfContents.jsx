import { useEffect, useState } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext'

/**
 * Sumário do artigo, com a seção atual destacada.
 *
 * O observer usa uma faixa estreita no topo da viewport (`rootMargin`) para
 * que "seção atual" signifique a que está sendo lida, e não a última visível
 * em qualquer canto da tela.
 */
export default function TableOfContents({ items }) {
  const { t } = useLanguage()
  const [activeId, setActiveId] = useState(items[0]?.id ?? null)

  useEffect(() => {
    if (!items.length || !('IntersectionObserver' in window)) return

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-88px 0px -70% 0px', threshold: 0 },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  if (items.length < 3) return null

  return (
    <nav aria-label={t.blog.toc} className="lg:sticky lg:top-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-mist">{t.blog.toc}</p>
      <ul className="space-y-2 border-l border-line text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${item.id}`}
              aria-current={item.id === activeId ? 'true' : undefined}
              className={`-ml-px block border-l-2 py-0.5 pl-3 transition-colors ${
                item.id === activeId
                  ? 'border-brand-orange font-medium text-fg'
                  : 'border-transparent text-mist hover:text-fg'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
