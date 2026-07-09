import Section, { Eyebrow } from './ui/Section'
import { useLanguage } from '../i18n/LanguageContext'

function Check() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-gradient">
      <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  )
}

export default function Benefits() {
  const { t } = useLanguage()
  const b = t.benefits

  return (
    <Section id="beneficios" alt>
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>{b.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          {b.titlePre}
          <span className="text-brand-gradient">{b.titleHighlight}</span>
          {b.titleEnd}
        </h2>
      </div>

      <div className="reveal-group mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {b.items.map((item, idx) => (
          <div
            key={item.title}
            className={`elev card-hover rounded-2xl border bg-ink-card p-6 ${
              idx === 0
                ? 'border-brand-purple/40 ring-brand-glow sm:col-span-2 sm:p-8'
                : 'border-line'
            }`}
          >
            <Check />
            <h3 className={`mt-4 font-bold ${idx === 0 ? 'text-xl' : 'text-lg'}`}>{item.title}</h3>
            <p className={`mt-2 text-mist ${idx === 0 ? 'max-w-xl text-base' : 'text-sm'}`}>{item.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
