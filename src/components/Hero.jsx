import Button from './ui/Button'
import BrowserFrame from './ui/BrowserFrame'

const trustItems = [
  '+150 empresas',
  'R$ 7,5 bi+ analisados',
  'Conformidade LGPD',
  'ISO 27001',
]

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden px-5 pb-20 pt-16 sm:pt-24">
      {/* brilho de fundo da marca */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[520px] w-[820px] translate-x-1/4 rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #5901b1 0%, transparent 70%)' }}
      />

      <div className="reveal-group relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
        {/* ESQUERDA: texto */}
        <div className="text-center lg:text-left">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft px-4 py-1.5 text-sm text-mist">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
            Plataforma LETMESEE de análise de crédito
          </span>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] sm:text-5xl">
            Venda mais a prazo, <span className="text-brand-gradient">sem medo de calote</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-mist lg:mx-0">
            O LETMESEE cruza <strong className="text-fg">todos os birôs em segundos</strong> para
            você aprovar mais vendas com segurança — e já reduziu a inadimplência dos clientes em{' '}
            <strong className="text-fg">até 57%</strong>.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href="#contato" className="w-full sm:w-auto">
              Falar com um consultor
            </Button>
            <Button href="#planos" variant="ghost" className="w-full sm:w-auto">
              Ver planos e preços
            </Button>
          </div>
          <p className="mt-4 text-sm text-mist">Resposta em até 1 dia útil • Sem compromisso</p>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-mist lg:justify-start">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg className="h-4 w-4 text-brand-orange" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* DIREITA: print real da plataforma LETMESEE, em moldura de navegador inclinada */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-6 bottom-0 rounded-full opacity-25 blur-3xl"
            style={{ background: 'linear-gradient(100deg, #5901b1, #ff6600)' }}
          />
          <BrowserFrame
            src="/painel-credito.webp"
            alt="Painel de análise de crédito do LETMESEE: aprovação, SLA, risco e pedidos"
            url="app.lenext.com.br/credito"
            className="relative origin-center transition-transform duration-500 lg:[transform:perspective(1700px)_rotateY(-7deg)_rotateX(2deg)_scale(1.06)] lg:hover:[transform:none]"
            width={1600}
            height={780}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}
