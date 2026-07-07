import Section, { Eyebrow } from './ui/Section'

const faqs = [
  {
    q: 'O que é o LETMESEE?',
    a: 'Plataforma que reúne todos os birôs de crédito e automatiza a análise de risco e a gestão de inadimplência.',
  },
  {
    q: 'Preciso de time técnico para usar?',
    a: 'Não. Foi feito para a PME usar no dia a dia; nosso time faz a implementação.',
  },
  {
    q: 'Como meus dados são protegidos?',
    a: 'ISO 27001, conformidade LGPD e infraestrutura auditável.',
  },
  {
    q: 'Com quais fontes e sistemas integra?',
    a: 'Serasa, Boa Vista/Equifax, Quod, Bacen SCR, Receita Federal e ERPs parceiros. A IA ainda analisa Balanço Patrimonial, DRE e faturamento.',
  },
  {
    q: 'Quanto tempo leva para implementar?',
    a: 'Implementação guiada pelo nosso time. Fale com um consultor para o prazo do seu caso.',
  },
  {
    q: 'Atende meu setor?',
    a: 'Atendemos PMEs de diversos setores com volume relevante de vendas a prazo.',
  },
]

export default function FAQ() {
  return (
    <Section id="faq" alt>
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>Dúvidas frequentes</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">Perguntas que todo gestor faz.</h2>
      </div>

      <div className="reveal elev mx-auto mt-10 max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-card">
        {faqs.map((item) => (
          <details key={item.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
              {item.q}
              <span className="text-brand-orange transition-transform group-open:rotate-45">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-mist">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
