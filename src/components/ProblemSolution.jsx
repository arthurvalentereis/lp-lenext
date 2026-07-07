import Section, { Eyebrow } from './ui/Section'
import Button from './ui/Button'

const rows = [
  { pain: 'Levo 2 horas para aprovar um crédito', gain: 'Análise em 5 minutos' },
  { pain: 'Decido no escuro, com pouca informação', gain: 'Todos os birôs cruzados em uma tela' },
  { pain: 'Perco dinheiro com inadimplência e fraude', gain: 'Até 57% menos inadimplência' },
  { pain: 'Relatórios manuais consomem o time', gain: 'Até 80% de economia com relatórios' },
]

export default function ProblemSolution() {
  return (
    <Section id="solucao">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>O problema</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Decidir crédito sem dado certo <span className="text-brand-gradient">custa caro</span>.
        </h2>
      </div>

      <div className="reveal-group mx-auto mt-12 grid max-w-3xl gap-4">
        {rows.map((row) => (
          <div
            key={row.pain}
            className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2"
          >
            <div className="rounded-2xl border border-line bg-ink-soft p-5">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-mist">
                Hoje
              </span>
              <p className="text-mist">{row.pain}</p>
            </div>
            <div className="rounded-2xl border border-brand-purple/40 bg-ink-card p-5 ring-brand-glow">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand-orange">
                Com o LETMESEE
              </span>
              <p className="font-semibold text-fg">{row.gain}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href="#contato">Falar com um consultor</Button>
      </div>
    </Section>
  )
}
