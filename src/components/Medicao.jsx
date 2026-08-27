import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BannerConsentimento from './BannerConsentimento'
import { aoMudarConsentimento, consentiu } from '../lib/consentimento'
import { iniciarMedicao, pararMedicao } from '../lib/analytics'
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

  // SPA: trocar de rota não recarrega a página, então o page_view do GA4
  // precisa ser disparado na mão a cada navegação.
  useEffect(() => {
    if (!consentiu() || typeof window.gtag !== 'function') return
    window.gtag('event', 'page_view', { page_path: pathname })
  }, [pathname])

  return <BannerConsentimento />
}
