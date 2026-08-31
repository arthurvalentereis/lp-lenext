import { config } from '../config'
import { consentiu } from './consentimento'

/**
 * Envia lead para /api/contact (Vercel Function → Resend → contato@lenext.com.br
 * → reforço server-side pro Meta Conversions API, sem PII, se houver consentimento).
 *
 * `eventId` é gerado aqui e devolvido no retorno: quem chama passa o mesmo id
 * pra `registrarConversao()` (analytics.js), que o repassa ao Pixel do
 * navegador. Servidor e navegador mandam o MESMO id pro Meta — é o que
 * evita contar o mesmo lead duas vezes (Meta deduplica por `event_id`).
 *
 * @param {{ form: string, name: string, email: string, company?: string, phone?: string, consent?: boolean, locale?: string }} payload
 */
export async function submitLead(payload) {
  const endpoint = config.formEndpoint || '/api/contact'
  const eventId =
    crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      page: typeof window !== 'undefined' ? window.location.href : '',
      eventId,
      // Só o servidor manda o reforço pro Meta se a pessoa consentiu a
      // medição — mesma regra que já vale pro Pixel do navegador.
      medicaoConsentida: consentiu(),
    }),
  })

  let data = null
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(data?.error || `Falha ao enviar formulário (${response.status}).`)
  }

  return { ...data, eventId }
}
