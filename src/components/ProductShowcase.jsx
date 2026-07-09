import Section, { Eyebrow } from './ui/Section'
import ProductCarousel from './ProductCarousel'
import { useLanguage } from '../i18n/LanguageContext'

export default function ProductShowcase() {
  const { t } = useLanguage()
  const p = t.productShowcase

  return (
    <Section id="sistema">
      <div className="reveal mx-auto max-w-2xl text-center">
        <Eyebrow>{p.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold sm:text-4xl">
          {p.titlePre}
          <span className="text-brand-gradient">{p.titleHighlight}</span>
          {p.titleEnd}
        </h2>
        <p className="mt-3 text-mist">{p.desc}</p>
      </div>

      <div className="reveal mt-12">
        <ProductCarousel />
      </div>
    </Section>
  )
}
