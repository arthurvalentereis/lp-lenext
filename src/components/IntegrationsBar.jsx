// Faixa de integrações / parceiros. Logos em /public (partner-*.png).
const partners = [
  { src: '/partner-serasa.png', alt: 'Serasa Experian' },
  { src: '/partner-boa-vista.png', alt: 'Boa Vista Equifax' },
  { src: '/partner-quod.png', alt: 'Quod' },
  { src: '/partner-assertiva.png', alt: 'Assertiva' },
  { src: '/partner-lemit.png', alt: 'Lemit' },
  { src: '/partner-intouch.png', alt: 'Intouch' },
  { src: '/partner-credencie.png', alt: 'Credencie' },
  { src: '/partner-nomus.png', alt: 'Nomus' },
  { src: '/partner-unitea.png', alt: 'Unitea' },
]

export default function IntegrationsBar() {
  return (
    <section className="border-y border-line/60 bg-ink-soft px-5 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <p className="reveal mb-8 text-center text-sm font-medium uppercase tracking-wider text-mist">
          Conectado a quem o mercado já confia
        </p>
        <div className="reveal-group flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {partners.map((p) => (
            <img
              key={p.alt}
              src={p.src}
              alt={p.alt}
              className="h-8 w-auto max-w-[130px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-9"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
