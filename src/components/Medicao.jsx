import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import BannerConsentimento from './BannerConsentimento'
import { aoMudarConsentimento, consentiu } from '../lib/consentimento'
import { iniciarMedicao, pararMedicao, registrarNavegacao } from '../lib/analytics'
import { config } from '../config'

/**
 * Liga a medição e mostra o banner de consentimento.
 *
 * Fica **acima das rotas** (em main.jsx), não dentro de `App`: `App` é só a
 * rota `/`, e o banner precisa aparecer também no blog e nas páginas de
 * material — onde a medição igualmente vale.
 *
 * Reage à escolha sem recarregar: aceitar liga na hora, recusar desliga os
 * listeners e descarta o que estava na fila.
 */
export default function Medicao() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (consentiu()) iniciarMedicao({ ga4Id: config.ga4Id })

    return aoMudarConsentimento((escolha) => {
      if (escolha === 'aceito') iniciarMedicao({ ga4Id: config.ga4Id })
      else pararMedicao()
    })
  }, [])

  // SPA: trocar de rota não recarrega a página, então o page_view precisa ser
  // disparado na mão a cada navegação — nos dois destinos.
  const primeiraRota = useRef(true)
  useEffect(() => {
    // A primeira rota já foi registrada por `iniciarMedicao()`; contar de novo
    // dobraria o page_view de quem entra direto na home.
    if (primeiraRota.current) {
      primeiraRota.current = false
      return
    }
    if (!consentiu()) return
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_path: pathname })
    }
    registrarNavegacao()
  }, [pathname])

  return <BannerConsentimento />
}
