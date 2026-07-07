import Section, { Eyebrow } from './ui/Section'

// NOTA: depoimentos anonimizados (rascunhos a validar com clientes reais antes de publicar).
const testimonials = [
  {
    quote:
      'Cortamos drasticamente o custo com relatórios de análise de crédito. O que era um dia de trabalho virou minutos.',
    author: 'Diretor Financeiro',
    company: 'Indústria óptica de médio porte',
  },
  {
    quote:
      'A automação 100% personalizada se encaixou no nosso processo, não o contrário. Ganhamos agilidade sem trocar de sistema.',
    author: 'Head de Operações',
    company: 'Distribuidora regional',
  },
  {
    quote:
      'Hoje temos rastreabilidade e controle total da inadimplência. A gestão enxerga o risco antes de ele virar prejuízo.',
    author: 'Gerente de Crédito',
    company: 'Grupo varejista',
  },
]

export default function Testimonials() {
  return (
    <Section id="depoimentos">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>Quem usa, confia</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Resultados reais de quem <span className="text-brand-gradient">decide com dado</span>.
        </h2>
      </div>

      <div className="reveal-group mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.author}
            className="elev flex flex-col rounded-2xl border border-line bg-ink-card p-7"
          >
            <span className="text-4xl font-extrabold leading-none text-brand-gradient">“</span>
            <blockquote className="mt-2 flex-1 text-mist">{t.quote}</blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <div className="font-semibold text-fg">{t.author}</div>
              <div className="text-sm text-mist">{t.company}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
