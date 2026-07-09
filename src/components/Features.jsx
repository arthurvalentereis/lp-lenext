import { useState } from 'react'
import Section, { Eyebrow } from './ui/Section'
import Button from './ui/Button'
import BrowserFrame from './ui/BrowserFrame'
import { useLanguage } from '../i18n/LanguageContext'

/* Ícones inline */
const I = {
  sliders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <circle cx="4" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="2" fill="currentColor" stroke="none" />
      <circle cx="20" cy="14" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M17.5 19a4.5 4.5 0 100-9 6 6 0 00-11.6 1.6A4 4 0 006.5 19z" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  ),
  box: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M12 21a9 9 0 110-18 9 8 0 019 8 4.5 4.5 0 01-4.5 4.5H14a2 2 0 00-1.5 3.3c.3.4.5.8.5 1.2a1 1 0 01-1 1z" />
      <circle cx="7.5" cy="11.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M4 13a8 8 0 0116 0" />
      <rect x="2" y="13" width="4" height="7" rx="2" />
      <rect x="18" y="13" width="4" height="7" rx="2" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />
    </svg>
  ),
  calc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h4" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M21 12a8 8 0 01-8 8H4l2-3a8 8 0 1115-5z" />
      <path d="M9 12h.01M12.5 12h.01M16 12h.01" />
    </svg>
  ),
  escalate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.4 2.6 1.6.2.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.2.5.2.5.4.1.1.1.6-.1 1.1z" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M12 15l-3-3c.7-2.5 2-5 4-7 3-3 7-3 8-2 1 1 1 5-2 8-2 2-4.5 3.3-7 4z" />
      <circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
}

const engineIcons = [I.sliders, I.shield, I.cloud, I.bolt]
const portalIcons = [I.user, I.box, I.palette, I.headset]
const collectionIcons = [I.bell, I.calc, I.chat, I.escalate]
const salesIcons = [I.phone, I.whatsapp, I.rocket, I.bell]
const rulerIcons = [I.chat, I.calc, I.bell, I.escalate]
const rulerDays = ['D+1', 'D+5', 'D+10', 'D+20']
const rulerDone = [true, true, true, false]

/* ===== Visual do slide 1: motor de crédito rodando uma política ===== */
function EngineMockup({ m }) {
  return (
    <div className="elev overflow-hidden rounded-2xl border border-line bg-ink-card">
      <div className="flex items-center gap-2 border-b border-line bg-ink-soft px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-sm font-semibold text-fg">{m.header}</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#28c840]/10 px-2.5 py-1 text-xs font-semibold text-[#1a9c34]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#28c840]" />
          {m.active}
        </span>
      </div>

      <div className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-mist">
          {m.conditionsLabel}
        </p>
        <div className="space-y-2">
          {m.conditions.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-3 rounded-xl border border-line bg-ink-soft px-3 py-2.5"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#10b981] bg-[#ecfdf5] text-[#059669]">
                {I.check}
              </span>
              <span className="text-sm text-fg">{c.label}</span>
              <span className="ml-auto rounded-md border border-line bg-ink px-2 py-0.5 text-xs font-semibold text-fg">
                {c.value}
              </span>
            </div>
          ))}
        </div>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-purple/50" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">{m.then}</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-orange/50" />
        </div>

        <div className="rounded-xl border border-brand-purple/40 bg-brand-purple/5 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-mist">{m.decisionLabel}</div>
          <div className="mt-1 text-2xl font-extrabold text-brand-gradient">{m.decisionValue}</div>
          <div className="mt-0.5 text-sm text-mist">{m.decisionSub}</div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-xs text-mist">
          <span className="flex items-center gap-1.5"><span className="text-brand-orange">{I.shield}</span> {m.compliance}</span>
          <span className="flex items-center gap-1.5"><span className="text-brand-orange">{I.cloud}</span> {m.cloud}</span>
          <span className="ml-auto">{m.autoSaved}</span>
        </div>
      </div>
    </div>
  )
}

/* ===== Visual do slide 2: portais whitelabel ===== */
function PortalMockup({ badge, alt, url }) {
  return (
    <div className="relative">
      <span className="absolute -top-3 left-5 z-10 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white shadow-lg">
        {badge}
      </span>
      <BrowserFrame src="/portal-whitelabel-clients.png" alt={alt} url={url} />
    </div>
  )
}

/* ===== Visual do slide 3: régua de cobrança automatizada ===== */
function CollectionMockup({ m }) {
  return (
    <div className="elev overflow-hidden rounded-2xl border border-line bg-ink-card">
      <div className="flex items-center gap-2 border-b border-line bg-ink-soft px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-sm font-semibold text-fg">{m.header}</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#28c840]/10 px-2.5 py-1 text-xs font-semibold text-[#1a9c34]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#28c840]" />
          {m.active}
        </span>
      </div>

      <div className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-mist">
          {m.triggersLabel}
        </p>
        <div className="space-y-2">
          {m.ruler.map((r, idx) => (
            <div
              key={r.channel}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                rulerDone[idx] ? 'border-line bg-ink-soft' : 'border-dashed border-line bg-ink'
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white ${
                  rulerDone[idx] ? 'bg-brand-gradient' : 'bg-mist/40'
                }`}
              >
                {rulerIcons[idx]}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-mist">
                  <span className="text-brand-orange">{rulerDays[idx]}</span> · {r.channel}
                </div>
                <p className="truncate text-sm text-fg">{r.text}</p>
              </div>
              {rulerDone[idx] && (
                <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#28c840]/15 text-[#1a9c34]">
                  {I.check}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-brand-purple/40 bg-brand-purple/5 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-mist">{m.recoveredLabel}</div>
          <div className="mt-1 text-2xl font-extrabold text-brand-gradient">{m.recoveredValue}</div>
          <div className="mt-0.5 text-sm text-mist">{m.recoveredSub}</div>
        </div>
      </div>
    </div>
  )
}

/* ===== Visual do slide 4: consulta de crédito pelo WhatsApp (chat) ===== */
function SalesChatMockup({ m }) {
  return (
    <div className="elev mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-ink-card">
      {/* topo estilo WhatsApp */}
      <div className="flex items-center gap-3 bg-[#25D366] px-4 py-3 text-white">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          {I.whatsapp}
        </span>
        <div className="leading-tight">
          <div className="text-sm font-bold">{m.header}</div>
          <div className="flex items-center gap-1.5 text-xs opacity-90">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {m.status}
          </div>
        </div>
      </div>

      {/* conversa */}
      <div className="space-y-2.5 bg-ink-soft p-4">
        {m.chat.map((c, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
              idx % 2 === 0
                ? 'ml-auto rounded-br-md bg-[#d9fdd3] text-[#14351c]'
                : 'rounded-bl-md border border-line bg-ink-card text-fg'
            }`}
          >
            <p>{c.text}</p>
            <span className="mt-1 block text-right text-[10px] text-mist">14:0{idx < 2 ? 2 : 3} ✓✓</span>
          </div>
        ))}

        {/* rodapé de contexto */}
        <div className="flex items-center gap-2 pt-2 text-xs text-mist">
          <span className="text-brand-orange">{I.bolt}</span>
          {m.footer}
        </div>
      </div>
    </div>
  )
}

export default function Features() {
  const { t } = useLanguage()
  const f = t.features
  const [i, setI] = useState(0)

  const slides = [
    {
      tab: f.tabs[0],
      titlePre: f.engine.titlePre,
      titleHighlight: f.engine.titleHighlight,
      titleEnd: '.',
      desc: f.engine.desc,
      capabilities: f.engine.capabilities.map((c, idx) => ({ ...c, icon: engineIcons[idx] })),
      visual: <EngineMockup m={f.engine.mockup} />,
    },
    {
      tab: f.tabs[1],
      titlePre: f.portal.titlePre,
      titleHighlight: f.portal.titleHighlight,
      titleEnd: f.portal.titleEnd,
      desc: f.portal.desc,
      capabilities: f.portal.capabilities.map((c, idx) => ({ ...c, icon: portalIcons[idx] })),
      visual: <PortalMockup badge={f.portal.mockupBadge} alt={f.portal.mockupAlt} url={f.portal.mockupUrl} />,
    },
    {
      tab: f.tabs[2],
      titlePre: f.collection.titlePre,
      titleHighlight: f.collection.titleHighlight,
      titleEnd: f.collection.titleEnd,
      desc: f.collection.desc,
      capabilities: f.collection.capabilities.map((c, idx) => ({ ...c, icon: collectionIcons[idx] })),
      visual: <CollectionMockup m={f.collection.mockup} />,
    },
    {
      tab: f.tabs[3],
      titlePre: f.sales.titlePre,
      titleHighlight: f.sales.titleHighlight,
      titleEnd: f.sales.titleEnd,
      desc: f.sales.desc,
      capabilities: f.sales.capabilities.map((c, idx) => ({ ...c, icon: salesIcons[idx] })),
      visual: <SalesChatMockup m={f.sales.mockup} />,
    },
  ]

  return (
    <Section id="funcionalidades">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>{f.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          {f.titlePre}
          <span className="text-brand-gradient">{f.titleHighlight}</span>.
        </h2>
        <p className="mt-3 text-mist">{f.desc}</p>
      </div>

      {/* abas do slider */}
      <div className="reveal mt-10 flex flex-wrap justify-center gap-2" role="tablist">
        {slides.map((s, idx) => (
          <button
            key={s.tab}
            role="tab"
            aria-selected={idx === i}
            onClick={() => setI(idx)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              idx === i
                ? 'bg-brand-gradient text-white shadow-[0_8px_24px_-8px_rgba(89,1,177,0.5)]'
                : 'border border-line text-mist hover:border-brand-orange/50 hover:text-fg'
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>

      {/* trilho com efeito de slide */}
      <div className="reveal relative mt-10 overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {slides.map((s, idx) => (
            <div
              key={s.tab}
              aria-hidden={idx !== i}
              className={`grid w-full shrink-0 items-center gap-12 px-1 transition-opacity duration-500 lg:grid-cols-2 ${
                idx === i ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div>
                <h3 className="text-2xl font-bold sm:text-3xl">
                  {s.titlePre}
                  <span className="text-brand-gradient">{s.titleHighlight}</span>
                  {s.titleEnd}
                </h3>
                <p className="mt-4 text-mist">{s.desc}</p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {s.capabilities.map((c) => (
                    <div key={c.title} className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-purple/40 bg-ink-soft text-brand-purple">
                        {c.icon}
                      </span>
                      <div>
                        <h4 className="font-bold leading-tight">{c.title}</h4>
                        <p className="mt-1 text-sm text-mist">{c.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button href="#contato" className="mt-8">
                  {f.ctaLabel}
                </Button>
              </div>

              {s.visual}
            </div>
          ))}
        </div>

        {/* setas */}
        <div className="mt-8 flex items-center justify-center gap-3 lg:absolute lg:right-1 lg:top-0 lg:mt-0">
          <button
            aria-label="Previous"
            onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition hover:border-brand-orange/60 hover:text-fg"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            aria-label="Next"
            onClick={() => setI((p) => (p + 1) % slides.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition hover:border-brand-orange/60 hover:text-fg"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </Section>
  )
}
