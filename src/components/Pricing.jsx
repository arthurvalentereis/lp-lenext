import Section, { Eyebrow } from './ui/Section'
import Button from './ui/Button'
import { useLanguage } from '../i18n/LanguageContext'

function Check() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#10b981] bg-[#ecfdf5]">
      <svg className="h-3.5 w-3.5 text-[#059669]" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  )
}

export default function Pricing() {
  const { t } = useLanguage()
  const p = t.pricing

  return (
    <Section id="planos">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>{p.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          {p.titlePre}
          <span className="text-brand-gradient">{p.titleHighlight}</span>
          {p.titleEnd}
        </h2>
        <p className="mt-3 text-mist">{p.desc}</p>
      </div>

      <div className="reveal mx-auto mt-12 max-w-3xl rounded-2xl border border-brand-purple/40 bg-ink-card p-8 ring-brand-glow sm:p-10">
        <div className="text-center">
          <h3 className="text-xl font-bold">{p.planName}</h3>
          <div className="mt-3 text-3xl font-extrabold text-brand-gradient">{p.price}</div>
          <p className="mt-2 text-mist">{p.planDesc}</p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
          {p.features.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <Check />
              <span className="text-fg">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Button href="#contato" className="w-full sm:w-auto">
            {p.cta}
          </Button>
          <p className="mt-3 text-sm text-mist">{p.microcopy}</p>
        </div>
      </div>
    </Section>
  )
}
