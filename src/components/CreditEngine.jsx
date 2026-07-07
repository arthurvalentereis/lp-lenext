import Section, { Eyebrow } from './ui/Section'
import Button from './ui/Button'

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
}

const capabilities = [
  {
    icon: I.sliders,
    title: 'Sua política, suas regras',
    desc: 'Configure scores, limites e condições sem escrever uma linha de código.',
  },
  {
    icon: I.shield,
    title: 'Compliance e conformidade',
    desc: 'Cada política versionada e auditável — decisões dentro da norma, sempre.',
  },
  {
    icon: I.cloud,
    title: 'Nuvem com rastreabilidade',
    desc: 'Toda decisão registrada, segura e disponível quando você precisar.',
  },
  {
    icon: I.bolt,
    title: 'Sem depender de TI',
    desc: 'Coloque uma nova política de crédito no ar em minutos, não em meses.',
  },
]

const conditions = [
  { label: 'Score de crédito', value: '≥ 700' },
  { label: 'Faturamento mensal', value: '≥ R$ 50 mil' },
  { label: 'Bacen SCR', value: 'sem restrição' },
  { label: 'Comprometimento de crédito', value: '< 30%' },
]

function EngineMockup() {
  return (
    <div className="elev overflow-hidden rounded-2xl border border-line bg-ink-card">
      {/* barra de janela */}
      <div className="flex items-center gap-2 border-b border-line bg-ink-soft px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-sm font-semibold text-fg">Política de Crédito · PJ</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#28c840]/10 px-2.5 py-1 text-xs font-semibold text-[#1a9c34]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#28c840]" />
          Ativa
        </span>
      </div>

      <div className="p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-mist">
          Se estas condições forem atendidas
        </p>
        <div className="space-y-2">
          {conditions.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-3 rounded-xl border border-line bg-ink-soft px-3 py-2.5"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-gradient text-white">
                {I.check}
              </span>
              <span className="text-sm text-fg">{c.label}</span>
              <span className="ml-auto rounded-md border border-line bg-ink px-2 py-0.5 text-xs font-semibold text-fg">
                {c.value}
              </span>
            </div>
          ))}
        </div>

        {/* conector ENTÃO */}
        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-purple/50" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Então</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-orange/50" />
        </div>

        {/* decisão */}
        <div className="rounded-xl border border-brand-purple/40 bg-brand-purple/5 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-mist">Decisão automática</div>
          <div className="mt-1 text-2xl font-extrabold text-brand-gradient">Aprovar até R$ 80.000</div>
          <div className="mt-0.5 text-sm text-mist">taxa 1,8% a.m. · em até 24x</div>
        </div>

        {/* rodapé de garantias */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 text-xs text-mist">
          <span className="flex items-center gap-1.5"><span className="text-brand-orange">{I.shield}</span> Compliance</span>
          <span className="flex items-center gap-1.5"><span className="text-brand-orange">{I.cloud}</span> Na nuvem</span>
          <span className="ml-auto">salvo e rastreável automaticamente</span>
        </div>
      </div>
    </div>
  )
}

export default function CreditEngine() {
  return (
    <Section id="motor">
      <div className="reveal-group grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Motor de crédito</Eyebrow>
          <h2 className="text-3xl font-bold sm:text-4xl">
            O motor de crédito que roda a <span className="text-brand-gradient">sua política</span>.
          </h2>
          <p className="mt-4 text-mist">
            Enquanto o mercado entrega regras engessadas, na Lenext você monta a política de crédito
            da sua empresa — com compliance, nuvem e rastreabilidade de ponta a ponta.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white">
                  {c.icon}
                </span>
                <div>
                  <h3 className="font-bold leading-tight">{c.title}</h3>
                  <p className="mt-1 text-sm text-mist">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button href="#contato" className="mt-8">
            Falar com um consultor
          </Button>
        </div>

        <EngineMockup />
      </div>
    </Section>
  )
}
