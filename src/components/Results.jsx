import { useEffect, useRef, useState } from 'react'
import Section, { Eyebrow } from './ui/Section'
import { useLanguage } from '../i18n/LanguageContext'

// `count` anima de 0 até o valor quando o card entra na viewport;
// stats sem `count` (ex.: "2h → 5min") ficam estáticos.
const statValues = [
  { count: 57, suffix: '%' },
  { value: '2h → 5min' },
  { count: 80, suffix: '%' },
  { count: 7.5, prefix: 'R$ ', suffix: ' bi+', decimals: 1 },
  { count: 150, prefix: '+' },
  { count: 100, suffix: '%' },
]

function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1600, locale }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      setValue(to)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return
        started.current = true
        io.disconnect()

        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3) // ease-out cúbico
          setValue(to * eased)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  const shown = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  )
}

export default function Results() {
  const { t, lang } = useLanguage()
  const r = t.results
  const locale = lang === 'en' ? 'en-US' : 'pt-BR'

  return (
    <Section id="resultados" alt>
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>{r.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          {r.titlePre}
          <span className="text-brand-gradient">{r.titleHighlight}</span>
          {r.titleEnd}
        </h2>
      </div>

      <div className="reveal-group mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {r.stats.map((s, idx) => {
          const v = statValues[idx]
          return (
            <div
              key={s.label}
              className="elev card-hover rounded-2xl border border-line bg-ink-card p-6 text-center sm:p-8"
            >
              <div className="text-3xl font-extrabold text-brand-gradient sm:text-4xl">
                {v.count != null ? (
                  <CountUp to={v.count} prefix={v.prefix} suffix={v.suffix} decimals={v.decimals} locale={locale} />
                ) : (
                  v.value
                )}
              </div>
              <p className="mt-2 text-sm text-mist">{s.label}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
