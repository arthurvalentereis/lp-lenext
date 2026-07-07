import Section, { Eyebrow } from './ui/Section'

const stats = [
  { value: '57%', label: 'redução média de inadimplência e fraude' },
  { value: '2h → 5min', label: 'tempo de análise de crédito' },
  { value: '80%', label: 'economia com relatórios de análise' },
  { value: 'R$ 7,5 bi+', label: 'em crédito já analisado' },
  { value: '+150', label: 'empresas usando a Lenext' },
  { value: '2022', label: 'no mercado de risco e crédito desde' },
]

export default function Results() {
  return (
    <Section id="resultados" alt>
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>Resultados</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Números que mudam o <span className="text-brand-gradient">caixa</span> da sua empresa.
        </h2>
      </div>

      <div className="reveal-group mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="elev rounded-2xl border border-line bg-ink-card p-6 text-center sm:p-8"
          >
            <div className="text-3xl font-extrabold text-brand-gradient sm:text-4xl">{s.value}</div>
            <p className="mt-2 text-sm text-mist">{s.label}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
