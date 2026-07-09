import Section, { Eyebrow } from './ui/Section'
import Button from './ui/Button'
import { useLanguage } from '../i18n/LanguageContext'

// Seção "Como funciona": 3 passos para implementação rápida em médias e grandes
// empresas. Foco em integração enterprise-grade, configuração parametrizada e
// redução de time-to-value.
export default function HowItWorks() {
  const { t } = useLanguage()
  const h = t.howItWorks

  return (
    <Section id="como-funciona" alt>
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>{h.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          {h.titlePre}
          <span className="text-brand-gradient">{h.titleHighlight}</span>.
        </h2>
      </div>

      <div className="reveal-group mt-12 grid gap-5 md:grid-cols-3">
        {h.steps.map((s, idx) => (
          <div key={s.title} className="relative">
            {/* conector entre passos (desktop) */}
            {idx < h.steps.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-5 top-9 hidden h-px w-10 bg-gradient-to-r from-brand-purple/50 to-brand-orange/50 md:block"
              />
            )}
            <div className="elev card-hover h-full rounded-2xl border border-line bg-ink-card p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7a7a9e] text-lg font-extrabold text-white">
                {idx + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-mist">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="reveal mt-12 text-center">
        <Button href="#contato">{h.cta}</Button>
      </div>
    </Section>
  )
}
