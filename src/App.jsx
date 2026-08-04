import { useEffect } from 'react'
import useReveal from './hooks/useReveal'
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

/** Rola até a âncora da URL (ex.: /?utm_...#contato) depois do React montar. */
function useScrollParaHash() {
  useEffect(() => {
    const hash = window.location.hash?.replace(/^#/, '')
    if (!hash) return

    const rolar = () => {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return true
      }
      return false
    }

    if (rolar()) return

    // Conteúdo ainda não pintou — tenta de novo nos próximos frames.
    let tentativas = 0
    const id = window.setInterval(() => {
      tentativas += 1
      if (rolar() || tentativas > 20) window.clearInterval(id)
    }, 50)
    return () => window.clearInterval(id)
  }, [])
}

export default function App() {
  // Revela elementos (.reveal / .reveal-group) ao entrarem na viewport.
  useReveal()
  useScrollParaHash()

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
