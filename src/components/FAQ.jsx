import Section, { Eyebrow } from './ui/Section'
import { useLanguage } from '../i18n/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const f = t.faq

  return (
    <Section id="faq" alt>
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>{f.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">{f.title}</h2>
      </div>

      <div className="reveal elev mx-auto mt-10 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-card">
        {f.items.map((item) => (
          <details key={item.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
              {item.q}
              <span className="text-brand-orange transition-transform group-open:rotate-45">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-mist">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
