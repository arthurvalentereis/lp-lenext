import { config } from '../config'

/**
 * Envia lead para /api/contact (Vercel Function → Resend → contato@lenext.com.br).
 * @param {{ form: string, name: string, email: string, company?: string, phone?: string, consent?: boolean, locale?: string }} payload
 */
export async function submitLead(payload) {
  const endpoint = config.formEndpoint || '/api/contact'

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      page: typeof window !== 'undefined' ? window.location.href : '',
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

  return data
}
