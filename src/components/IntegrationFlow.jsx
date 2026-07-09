import Section, { Eyebrow } from './ui/Section'
import { useLanguage } from '../i18n/LanguageContext'

/* Ícones inline */
const Icon = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.4 2.6 1.6.2.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.2.5.2.5.4.1.1.1.6-.1 1.1z" />
    </svg>
  ),
  bureau: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M14 7l3-3a3 3 0 014 4l-3 3M10 17l-3 3a3 3 0 01-4-4l3-3" />
      <path d="M8 12l8-8M16 12l-8 8" opacity="0" />
      <line x1="9" y1="15" x2="15" y2="9" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12 2l1.7 4.6L18 8.3l-4.3 1.7L12 14.6l-1.7-4.6L6 8.3l4.3-1.7L12 2zM19 14l.9 2.4 2.4.9-2.4.9L19 20.6l-.9-2.4-2.4-.9 2.4-.9L19 14zM5 14l.9 2.4 2.4.9-2.4.9L5 20.6l-.9-2.4L1.7 17l2.4-.9L5 14z" />
    </svg>
  ),
  parecer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5M9 14l2 2 4-4" />
    </svg>
  ),
  cobranca: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
  alerta: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />
    </svg>
  ),
  bacen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M3 10l9-5 9 5M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
    </svg>
  ),
  gauge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M4 19a8 8 0 1116 0" />
      <path d="M12 19l4-5" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 16v-4M12 16V8M17 16v-6" />
    </svg>
  ),
}

/* Ilustração de IA conectando nós (estilo "agentes"), nas cores da Lenext. */
function AiFlowGraphic() {
  return (
    <svg viewBox="0 0 240 190" className="mt-3 w-full max-w-[200px]" role="img" aria-label="IA conectando dados e agentes">
      <defs>
        <linearGradient id="lfA" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5901b1" />
          <stop offset="1" stopColor="#ff6600" />
        </linearGradient>
        <linearGradient id="lfB" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff6600" />
          <stop offset="1" stopColor="#5901b1" />
        </linearGradient>
        <linearGradient id="lfC" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7b2fd6" />
          <stop offset="1" stopColor="#ff6600" />
        </linearGradient>
      </defs>

      {/* moldura */}
      <rect x="2" y="2" width="236" height="186" rx="18" fill="#ffffff" stroke="#e7e4f1" />

      {/* barramento central tracejado */}
      <rect x="64" y="66" width="112" height="58" rx="14" fill="none" stroke="#cdc6dc" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* conectores tracejados nó→barramento */}
      <path d="M82 56 V66" stroke="#cdc6dc" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <path d="M158 62 V66" stroke="#cdc6dc" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <path d="M88 118 V124" stroke="#cdc6dc" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      <path d="M154 112 V124" stroke="#cdc6dc" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />

      {/* nós (mini janelas) */}
      {[
        { x: 20, y: 20, grad: 'url(#lfA)' },
        { x: 150, y: 26, grad: 'url(#lfC)' },
        { x: 26, y: 118, grad: 'url(#lfB)' },
        { x: 146, y: 112, grad: 'url(#lfA)' },
      ].map((n, i) => (
        <g key={i} transform={`translate(${n.x} ${n.y})`}>
          <rect width="70" height="36" rx="6" fill="#ffffff" stroke="#e7e4f1" />
          <path d="M0 6 a6 6 0 0 1 6-6 H64 a6 6 0 0 1 6 6 V13 H0 Z" fill={n.grad} />
          <rect x="8" y="20" width="42" height="3.5" rx="1.75" fill="#e9e7f0" />
          <rect x="8" y="27" width="28" height="3.5" rx="1.75" fill="#eeecf5" />
        </g>
      ))}

      {/* faísca de IA (estrela 4 pontas) */}
      <path d="M120 82 L124 92 L134 95 L124 98 L120 108 L116 98 L106 95 L116 92 Z" fill="url(#lfA)" />
      <path d="M137 84 L139 89 L144 91 L139 93 L137 98 L135 93 L130 91 L135 89 Z" fill="url(#lfC)" />
    </svg>
  )
}

function NodeChip({ icon, label, iconClassName }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-ink-soft px-3 py-2.5">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          iconClassName ?? 'bg-brand-gradient text-white'
        }`}
      >
        {icon}
      </span>
      <span className="text-sm font-medium text-fg">{label}</span>
    </div>
  )
}

function Group({ title, children }) {
  return (
    <div className="elev rounded-2xl border border-line bg-ink-card p-5">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-mist">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Connector() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex rotate-90 items-center gap-1 lg:rotate-0">
        <span className="hidden h-px w-10 bg-gradient-to-r from-brand-purple to-brand-orange lg:block" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5 text-brand-orange">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  )
}

function Hub({ badge, desc }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-brand-purple/40 bg-ink-card p-6 ring-brand-glow lg:w-60">
      <span className="text-2xl font-extrabold tracking-tight">
        <span className="text-fg">LENE</span>
        <span className="text-brand-gradient">X</span>
        <span className="text-fg">T</span>
      </span>
      <span className="flex items-center gap-1.5 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
        {Icon.sparkles} {badge}
      </span>
      <p className="mt-1 text-center text-xs text-mist">{desc}</p>
      <AiFlowGraphic />
    </div>
  )
}

export default function IntegrationFlow() {
  const { t } = useLanguage()
  const f = t.integrationFlow

  return (
    <Section id="integracoes" alt>
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>{f.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          {f.titlePre}
          <span className="text-brand-gradient">{f.titleHighlight}</span>.
        </h2>
        <p className="mt-3 text-mist">{f.desc}</p>
      </div>

      <div className="reveal-group mt-12 grid gap-6 lg:grid-cols-[1fr_auto_auto_auto_1fr] lg:items-center">
        <Group title={f.groupSources}>
          <NodeChip icon={Icon.whatsapp} label={f.nodes.whatsapp} iconClassName="bg-[#25D366] text-white" />
          <NodeChip icon={Icon.bureau} label={f.nodes.bureau} iconClassName="border border-[#4b4b63]/60 bg-white text-[#4b4b63]" />
          <NodeChip icon={Icon.bacen} label={f.nodes.bacen} iconClassName="border border-[#4b4b63]/60 bg-white text-[#4b4b63]" />
          <NodeChip icon={Icon.api} label={f.nodes.api} iconClassName="border border-[#4b4b63]/60 bg-white text-[#4b4b63]" />
        </Group>

        <Connector />
        <Hub badge={f.hubBadge} desc={f.hubDesc} />
        <Connector />

        <Group title={f.groupDecisions}>
          <NodeChip icon={Icon.parecer} label={f.nodes.parecer} iconClassName="bg-[#5b7a9e] text-white" />
          <NodeChip icon={Icon.gauge} label={f.nodes.gauge} iconClassName="bg-[#5b7a9e] text-white" />
          <NodeChip icon={Icon.finance} label={f.nodes.finance} iconClassName="bg-[#5b7a9e] text-white" />
          <NodeChip icon={Icon.cobranca} label={f.nodes.cobranca} iconClassName="bg-[#5b7a9e] text-white" />
        </Group>
      </div>
    </Section>
  )
}
