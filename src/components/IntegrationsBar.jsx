import { useLanguage } from '../i18n/LanguageContext'

const partners = [
  { src: '/partner-serasa.png', alt: 'Serasa Experian' },
  { src: '/partner-boa-vista.png', alt: 'Boa Vista Equifax' },
  { src: '/partner-quod.png', alt: 'Quod' },
  { src: '/partner-nomus.png', alt: 'Nomus' },
  { src: '/cli-le-leader.webp', alt: 'LE Leader' },
]

export default function IntegrationsBar() {
  const { t } = useLanguage()
  const b = t.integrationsBar

  return (
    <section className="border-y border-line/60 bg-ink-soft px-5 py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <p className="reveal mb-10 text-center text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {b.titlePre}
          <span className="text-brand-gradient">{b.titleHighlight}</span>
        </p>
        <div className="reveal-group flex flex-wrap items-center justify-center gap-8 sm:gap-10 lg:gap-12">
          {partners.map((p) => (
            <img
              key={p.alt}
              src={p.src}
              alt={p.alt}
              className="h-10 w-auto max-w-[140px] object-contain opacity-70 transition hover:opacity-100 sm:h-12"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
