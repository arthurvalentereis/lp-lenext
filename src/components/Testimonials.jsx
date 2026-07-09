import Section, { Eyebrow } from './ui/Section'
import { useLanguage } from '../i18n/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()
  const tt = t.testimonials

  return (
    <Section id="depoimentos">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>{tt.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          {tt.titlePre}
          <span className="text-brand-gradient">{tt.titleHighlight}</span>
          {tt.titleEnd}
        </h2>
      </div>

      <div className="reveal-group mt-12 grid gap-5 md:grid-cols-3">
        {tt.items.map((item, idx) => (
          <figure
            key={idx}
            className="elev card-hover flex flex-col rounded-2xl border border-line bg-ink-card p-7"
          >
            <span className="text-4xl font-extrabold leading-none text-brand-gradient">"</span>
            <blockquote className="mt-2 flex-1 text-mist">{item.quote}</blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <div className="font-semibold text-fg">{item.author}</div>
              <div className="text-sm text-mist">{item.company}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
