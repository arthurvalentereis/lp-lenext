import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import IntegrationsBar from './components/IntegrationsBar'
import ProblemSolution from './components/ProblemSolution'
import HowItWorks from './components/HowItWorks'
import Results from './components/Results'
import Features from './components/Features'
import IntegrationFlow from './components/IntegrationFlow'
import ProductShowcase from './components/ProductShowcase'
import Benefits from './components/Benefits'
import ClientLogos from './components/ClientLogos'
import Testimonials from './components/Testimonials'
import Security from './components/Security'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  // Revela elementos (.reveal / .reveal-group) ao entrarem na viewport.
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-group')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    // Anima apenas na primeira entrada; re-animar ao rolar de volta é ruído.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Header />
      {/* Ordem segue a sequência de persuasão: promessa → prova (logos de
          clientes no topo) → dor → como funciona → números → produto →
          diferenciais → depoimentos → segurança → preço → objeções → CTA. */}
      <main>
        <Hero />
        <ClientLogos />
        <ProblemSolution />
        <HowItWorks />
        <Results />
        <Features />
        <IntegrationFlow />
        <IntegrationsBar />
        <ProductShowcase />
        <Benefits />
        <Testimonials />
        <Security />
        <Pricing />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
