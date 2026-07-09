import Section, { Eyebrow } from './ui/Section'
import Button from './ui/Button'
import { useLanguage } from '../i18n/LanguageContext'

export default function ProblemSolution() {
  const { t } = useLanguage()
  const p = t.problemSolution

  return (
    <Section id="solucao">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>{p.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          {p.titlePre}
          <span className="text-brand-gradient">{p.titleHighlight}</span>.
        </h2>
      </div>

      <div className="reveal-group mx-auto mt-12 grid max-w-3xl gap-4">
        {p.rows.map((row) => (
          <div
            key={row.pain}
            className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2"
          >
            <div className="rounded-2xl border border-line bg-ink-soft p-5">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-mist">
                {p.todayLabel}
              </span>
              <p className="text-mist">{row.pain}</p>
            </div>
            <div className="rounded-2xl border border-brand-purple/40 bg-ink-card p-5 ring-brand-glow">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-orange">
                {p.withLabel}
              </span>
              <p className="font-semibold text-fg">{row.gain}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href="#contato">{p.cta}</Button>
      </div>
    </Section>
  )
}
