import Section, { Eyebrow } from './ui/Section'
import Button from './ui/Button'

const features = [
  'Relatórios de bureaus',
  'Bacen SCR',
  'Integração com WhatsApp',
  'Integrações com assessorias de cobrança',
  'Integrações com ERPs',
  'Motor de crédito',
  'Automações de notificação',
  'API Lenext',
]

function Check() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-gradient text-white">
      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
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
  return (
    <Section id="planos">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>Planos</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Um plano completo para a sua <span className="text-brand-gradient">operação</span>.
        </h2>
        <p className="mt-3 text-mist">
          Tudo o que você precisa para vender mais a prazo com segurança. Valores sob medida — fale
          com um consultor e receba um diagnóstico gratuito.
        </p>
      </div>

      <div className="reveal mx-auto mt-12 max-w-3xl rounded-2xl border border-brand-purple/40 bg-ink-card p-8 ring-brand-glow sm:p-10">
        <div className="text-center">
          <h3 className="text-xl font-bold">Plano LETMESEE</h3>
          <div className="mt-3 text-3xl font-extrabold text-brand-gradient">Sob consulta</div>
          <p className="mt-2 text-mist">Plataforma completa, configurada para o seu cenário.</p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <Check />
              <span className="text-fg">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Button href="#contato" className="w-full sm:w-auto">
            Falar com um consultor
          </Button>
          <p className="mt-3 text-sm text-mist">Resposta em até 1 dia útil • Sem compromisso</p>
        </div>
      </div>
    </Section>
  )
}
