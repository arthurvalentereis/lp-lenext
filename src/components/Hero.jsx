import { useEffect, useState } from 'react'
import Button from './ui/Button'
import BrowserFrame from './ui/BrowserFrame'
import { useLanguage } from '../i18n/LanguageContext'

const CheckIcon = (
  <svg className="h-5 w-5 text-[#1a9c34]" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
      clipRule="evenodd"
    />
  </svg>
)

/* Card esquerdo (meio): variante score (gauge) ou carteira em cobrança (barras de aging). */
function CardC({ c }) {
  return (
    <div className="float-card-c absolute -left-3 top-1/2 z-10 hidden w-48 -translate-y-1/3 rounded-2xl bg-white p-4 shadow-[0_24px_60px_-15px_rgba(23,18,38,0.4)] sm:block lg:-left-8">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-mist">{c.label}</span>
        <span className="rounded-full bg-[#28c840]/15 px-2 py-0.5 text-[10px] font-semibold text-[#1a9c34]">
          {c.badge}
        </span>
      </div>

      {c.bars ? (
        <div className="mt-3 space-y-2">
          {c.bars.map((b) => (
            <div key={b.label} className="flex items-center gap-2">
              <span className="w-8 shrink-0 text-[10px] text-mist">{b.label}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#eeecf5]">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-orange"
                  style={{ width: `${b.pct}%` }}
                />
              </span>
            </div>
          ))}
        </div>
      ) : (
        <svg viewBox="0 0 120 66" className="mx-auto mt-2 w-28">
          <path d="M15 60 A45 45 0 0 1 105 60" fill="none" stroke="#eeecf5" strokeWidth="9" strokeLinecap="round" />
          <path
            d="M15 60 A45 45 0 0 1 105 60"
            fill="none"
            stroke="#1a9c34"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray="106 142"
          />
          <text x="60" y="52" textAnchor="middle" fontSize="24" fontWeight="800" fill="#171226">748</text>
          <text x="60" y="64" textAnchor="middle" fontSize="9" fill="#5a5570">de 1000</text>
        </svg>
      )}

      <div className="mt-3 flex items-end justify-between border-t border-line pt-2">
        <div>
          <div className="text-[10px] text-mist">{c.bottomLabel}</div>
          <div className="text-sm font-extrabold text-fg">{c.bottomValue}</div>
        </div>
        <span className="rounded-lg bg-brand-purple px-3 py-1.5 text-xs font-semibold text-white">
          {c.action}
        </span>
      </div>
    </div>
  )
}

/* Conjunto de cards flutuantes de um slide (a: aprovação, b: vidro, c: esquerdo, d: inferior). */
function FloatingCards({ cards }) {
  const up = cards.d.delta.startsWith('+')
  return (
    <>
      {/* card A: evento confirmado */}
      <div className="float-card-a absolute -left-2 -top-5 z-10 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_20px_50px_-15px_rgba(23,18,38,0.35)] sm:-left-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#28c840]/15">{CheckIcon}</span>
        <div className="leading-tight">
          <div className="text-sm font-bold text-fg">{cards.a.title}</div>
          <div className="text-xs text-mist">{cards.a.sub}</div>
        </div>
      </div>

      {/* card B: destaque em vidro */}
      <div className="float-card-b absolute -top-4 right-3 z-10 rounded-2xl border border-white/30 bg-white/15 px-5 py-3 text-white shadow-[0_20px_50px_-15px_rgba(23,18,38,0.4)] backdrop-blur-md sm:right-6">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-white/80">{cards.b.label}</div>
        <div className="text-lg font-extrabold sm:text-xl">{cards.b.value}</div>
      </div>

      {/* card C: score ou carteira */}
      <CardC c={cards.c} />

      {/* card D: tendência */}
      <div className="float-card-b absolute -bottom-6 right-4 z-10 hidden w-52 rounded-2xl bg-white p-4 shadow-[0_24px_60px_-15px_rgba(23,18,38,0.4)] sm:block lg:right-8">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-mist">{cards.d.label}</span>
          <span className="text-xs font-bold text-[#1a9c34]">{cards.d.delta}</span>
        </div>
        <svg viewBox="0 0 180 44" className="mt-2 w-full">
          <polyline
            points={up ? '4,36 40,30 76,26 112,18 148,14 172,8' : '4,8 40,14 76,18 112,26 148,30 172,36'}
            fill="none"
            stroke="#7b2fd6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="172" cy={up ? 8 : 36} r="4" fill="#7b2fd6" />
        </svg>
        <div className="mt-1.5 text-xs text-mist">{cards.d.sub}</div>
      </div>
    </>
  )
}

/* Showcase completo com slider: painel roxo + telas do produto + pill + cards
   flutuantes — tudo troca junto, em crossfade, conforme o slide ativo. */
function HeroShowcase({ slides }) {
  const [i, setI] = useState(1) // Começa no painel de cobrança
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (hovering) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [hovering, slides.length])

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* painel gradiente da marca */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#3d0180] via-brand-purple to-[#8b3ae8] p-7 pb-24 pt-14 shadow-[0_40px_80px_-30px_rgba(89,1,177,0.5)] sm:p-12 sm:pb-28 sm:pt-20 lg:-mr-6">
        {/* brilhos internos */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-brand-orange/25 blur-3xl"
        />

        {/* telas do produto em crossfade */}
        <div className="relative translate-x-4 sm:translate-x-8">
          <div className="relative">
            {slides.map((s, idx) => (
              <BrowserFrame
                key={s.src}
                src={s.src}
                alt={s.alt}
                url={s.url}
                width={1600}
                height={780}
                fetchpriority={idx === 0 ? 'high' : undefined}
                loading={idx === 0 ? undefined : 'lazy'}
                className={`transition-opacity duration-700 ease-out ${
                  idx === 0 ? 'relative' : 'absolute inset-0'
                } ${idx === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                aria-hidden={idx !== i}
              />
            ))}
          </div>

          {/* bolinhas */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.src}
                onClick={() => setI(idx)}
                aria-label={s.alt}
                aria-current={idx === i}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* pill de resultado no rodapé do painel (acompanha o slide) */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur sm:left-8 sm:text-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M15 7h6v6" />
          </svg>
          {slides[i].pill}
        </div>
      </div>

      {/* cards flutuantes por slide, em crossfade junto com a tela */}
      {slides.map((s, idx) => (
        <div
          key={s.src}
          aria-hidden={idx !== i}
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out ${
            idx === i ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <FloatingCards cards={s.cards} />
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section id="topo" className="relative overflow-hidden px-5 pb-20 pt-16 sm:pt-24">
      {/* fundo com profundidade: grid pattern + blobs da marca flutuando */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute right-0 top-0 h-[520px] w-[820px] translate-x-1/4 rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #5901b1 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="float-slower pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[560px] rounded-full opacity-[0.08] blur-[110px]"
        style={{ background: 'radial-gradient(circle, #ff6600 0%, transparent 70%)' }}
      />

      <div className="reveal-group relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_1.2fr] lg:gap-20">
        {/* ESQUERDA: texto */}
        <div className="text-center lg:text-left">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft px-4 py-1.5 text-sm text-mist">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-orange" />
            </span>
            {h.badge}
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] sm:text-5xl">
            {h.titlePre}
            <span className="text-mist">{h.titleHighlight}</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-mist lg:mx-0">
            {h.descPre}
            <strong className="text-fg">{h.descStrong1}</strong>
            {h.descMid}
            <strong className="text-fg">{h.descStrong2}</strong>
            {h.descEnd}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href="#contato" variant="outline-gradient" className="w-full sm:w-auto">
              {h.ctaPrimary}
            </Button>
            <Button href="#planos" variant="ghost" className="w-full sm:w-auto">
              {h.ctaSecondary}
            </Button>
          </div>
          <p className="mt-4 text-sm text-mist">{h.microcopy}</p>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-mist lg:justify-start">
            {h.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg className="h-4 w-4 text-brand-orange" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* DIREITA: showcase do produto com slider de contexto completo */}
        <HeroShowcase slides={h.slides} />
      </div>
    </section>
  )
}
