import Section, { Eyebrow } from './ui/Section'

const items = [
  { title: 'ISO 27001', desc: 'Gestão de segurança da informação certificada.' },
  { title: 'Conformidade LGPD', desc: 'Tratamento de dados dentro da lei.' },
  { title: 'Parcerias oficiais', desc: 'Integração oficial com os birôs e ERPs.' },
  { title: 'Dados na nuvem', desc: 'Tudo centralizado em ambiente cloud seguro, auditável e sempre disponível.' },
]

export default function Security() {
  return (
    <Section id="seguranca" alt>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <Eyebrow>Segurança e conformidade</Eyebrow>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Seus dados de crédito tratados com o{' '}
            <span className="text-brand-gradient">rigor que o assunto exige</span>.
          </h2>
          <p className="mt-4 text-mist">
            Para quem decide na PME, segurança de dados não é detalhe. A Lenext opera com
            certificação, conformidade legal e parcerias oficiais.
          </p>
        </div>
        <div className="reveal-group grid gap-4 sm:grid-cols-2">
          {items.map((i) => (
            <div key={i.title} className="elev rounded-2xl border border-line bg-ink-card p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-brand-purple/40 bg-brand-purple/10">
                <svg className="h-5 w-5 text-brand-orange" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 1l7 3v5c0 4.4-3 8.5-7 10-4-1.5-7-5.6-7-10V4l7-3zm3.7 6.3a1 1 0 00-1.4-1.4L9 9.2 7.7 7.9a1 1 0 10-1.4 1.4l2 2a1 1 0 001.4 0l4-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-bold">{i.title}</h3>
              <p className="mt-1 text-sm text-mist">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
