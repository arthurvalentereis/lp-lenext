import { useLanguage } from '../i18n/LanguageContext'

// Faixa de prova social logo abaixo do hero (padrão AgRisk/Pipefy):
// marquee infinito de logos de clientes, pausa no hover.
const logos = [
  { src: '/cli-dancor.webp', alt: 'Dancor' },
  { src: '/cli-centro-oeste.webp', alt: 'Grupo Centro Oeste' },
  { src: '/cli-satisloh.webp', alt: 'Satisloh' },
  { src: '/cli-pion-gplus.webp', alt: 'Pion G Plus' },
  { src: '/cli-leroy-merlin.webp', alt: 'Leroy Merlin' },
  { src: '/cli-sicredi.png', alt: 'Sicredi' },
  { src: '/cli-zona-sul.webp', alt: 'Zona Sul' },
  { src: '/cli-asaas.webp', alt: 'ASAAS' },
  { src: '/cli-le-leader.webp', alt: 'LE Leader' },
]

export default function ClientLogos() {
  const { t } = useLanguage()
  return (
    <section id="clientes" className="border-y border-line/60 bg-ink-soft py-12">
      <p className="reveal mb-8 px-5 text-center text-sm font-medium uppercase tracking-wider text-mist">
        {t.clientLogos.caption}
      </p>

      <div className="marquee-mask overflow-hidden">
        {/* lista duplicada: o keyframe anda -50% e o loop fecha sem emenda */}
        <div className="marquee items-center gap-14 pr-14">
          {[...logos, ...logos].map((l, idx) => (
            <img
              key={`${l.alt}-${idx}`}
              src={l.src}
              alt={l.alt}
              aria-hidden={idx >= logos.length}
              className="h-12 w-auto max-w-[150px] shrink-0 rounded-lg object-contain opacity-80 transition hover:opacity-100 sm:h-14"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
