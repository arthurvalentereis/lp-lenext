import Section, { Eyebrow } from './ui/Section'

const logos = [
  { src: '/cli-dancor.webp', alt: 'Dancor' },
  { src: '/cli-centro-oeste.webp', alt: 'Grupo Centro Oeste' },
  { src: '/cli-satisloh.webp', alt: 'Satisloh' },
  { src: '/cli-pion-gplus.webp', alt: 'Pion G Plus' },
  { src: '/cli-leroy-merlin.webp', alt: 'Leroy Merlin' },
  { src: '/cli-totvs.webp', alt: 'TOTVS' },
  { src: '/cli-nomus.webp', alt: 'Nomus' },
  { src: '/cli-zona-sul.webp', alt: 'Zona Sul' },
  { src: '/cli-asaas.webp', alt: 'ASAAS' },
  { src: '/cli-le-leader.webp', alt: 'LE Leader' },
  { src: '/cli-sankhya.webp', alt: 'Sankhya' },
  { src: '/cli-sap.webp', alt: 'SAP' },
]

export default function ClientLogos() {
  return (
    <Section id="clientes">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>Quem confia na Lenext</Eyebrow>
        <h2 className="text-2xl font-bold sm:text-3xl">
          Marcas que já decidem crédito com a <span className="text-brand-gradient">Lenext</span>.
        </h2>
      </div>

      <div className="reveal-group mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {logos.map((l) => (
          <div
            key={l.alt}
            className="overflow-hidden rounded-xl border border-line transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <img src={l.src} alt={l.alt} className="w-full" loading="lazy" />
          </div>
        ))}
      </div>
    </Section>
  )
}
