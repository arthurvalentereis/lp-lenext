import Section, { Eyebrow } from './ui/Section'
import ProductCarousel from './ProductCarousel'

export default function ProductShowcase() {
  return (
    <Section id="sistema">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>Veja o sistema por dentro</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Todo o controle da sua carteira em{' '}
          <span className="text-brand-gradient">um só painel</span>.
        </h2>
        <p className="mt-3 text-mist">
          Crédito, cobrança, recebíveis, Bacen SCR e leads — navegue pelas telas reais do LETMESEE.
        </p>
      </div>

      <div className="reveal mt-12">
        <ProductCarousel />
      </div>
    </Section>
  )
}
