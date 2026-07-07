import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import IntegrationsBar from './components/IntegrationsBar'
import ProblemSolution from './components/ProblemSolution'
import Results from './components/Results'
import CreditEngine from './components/CreditEngine'
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
    // Alterna a animação ao entrar/sair da viewport (anima indo e voltando).
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting)
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
      <main>
        <Hero />
        <IntegrationsBar />
        <ProblemSolution />
        <Results />
        <CreditEngine />
        <IntegrationFlow />
        <ProductShowcase />
        <Benefits />
        <ClientLogos />
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
