import Section, { Eyebrow } from './ui/Section'

const benefits = [
  {
    title: 'Todas as fontes num lugar só',
    desc: 'Serasa, Boa Vista, Quod, Bacen SCR e Receita numa consulta única. Chega de abrir cinco sistemas.',
  },
  {
    title: 'Análise financeira com IA',
    desc: 'Balanço Patrimonial, DRE e faturamento lidos pela IA para um parecer de crédito mais preciso.',
  },
  {
    title: 'Mais simples',
    desc: 'Feito para o dia a dia da PME, sem necessidade de time técnico.',
  },
  {
    title: 'Mais barato',
    desc: 'Uma fração do que você gasta hoje em consultas avulsas e retrabalho.',
  },
  {
    title: 'Automação 100% personalizada',
    desc: 'Regras de crédito e cobrança no jeito do seu negócio.',
  },
  {
    title: 'Rastreabilidade e controle',
    desc: 'Histórico completo para a gestão de inadimplência.',
  },
  {
    title: 'Suporte humanizado',
    desc: 'Gente de verdade ajudando, não só chatbot.',
  },
]

function Check() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-gradient">
      <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  )
}

export default function Benefits() {
  return (
    <Section id="beneficios" alt>
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>Diferenciais</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Por que PMEs trocam a consulta avulsa pela{' '}
          <span className="text-brand-gradient">Lenext</span>.
        </h2>
      </div>

      <div className="reveal-group mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <div key={b.title} className="elev rounded-2xl border border-line bg-ink-card p-6">
            <Check />
            <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
            <p className="mt-2 text-sm text-mist">{b.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
