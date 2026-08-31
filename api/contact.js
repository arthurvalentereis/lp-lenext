/**
 * POST /api/contact — recebe leads dos formulários da LP e notifica contato@lenext.com.br.
 *
 * Env (Vercel):
 *   RESEND_API_KEY              — obrigatória
 *   RESEND_FROM                 — remetente verificado, ex.: "Lenext <contato@newsletter.lenext.com.br>"
 *   CONTACT_TO                  — opcional; padrão contato@lenext.com.br
 *   VITE_META_PIXEL_ID          — opcional; mesmo Pixel ID usado no navegador (src/config.js)
 *   META_CONVERSIONS_API_TOKEN  — opcional; token gerado no Events Manager > API de Conversões
 */

const RESEND_API_URL = 'https://api.resend.com'
const META_CAPI_URL = 'https://graph.facebook.com/v21.0'
const DEFAULT_TO = 'contato@lenext.com.br'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FORM_LABELS = {
  demo: 'Agendar demo',
  ebook: 'Download e-book Política de Crédito',
  prompt: 'Acesso ao prompt de análise de crédito',
  newsletter: 'Assinatura da newsletter do blog',
  lead: 'Lead genérico',
}

/**
 * Reforço server-side do evento de conversão (Meta Conversions API) —
 * sobrevive a bloqueador de anúncio e à perda de sinal do iOS, que o Pixel
 * sozinho não sobrevive. Deliberadamente SEM PII (nome/e-mail/telefone):
 * só IP e user-agent, os parâmetros aprovados na configuração do Events
 * Manager — mandar dado pessoal identificável contradiria a política de
 * privacidade ("não compartilha dados sob qualquer hipótese").
 *
 * `eventId` é o mesmo id que o Pixel do navegador manda (ver
 * src/lib/submitLead.js e analytics.js) — é o que faz o Meta deduplicar em
 * vez de contar o mesmo lead duas vezes. Falha aqui nunca derruba o envio
 * do lead: é sempre best-effort, best-effort mesmo.
 */
async function reforcarConversaoMeta({ eventName, eventId, ip, userAgent, url }) {
  const pixelId = process.env.VITE_META_PIXEL_ID
  const token = process.env.META_CONVERSIONS_API_TOKEN
  if (!pixelId || !token) return

  try {
    const resposta = await fetch(
      `${META_CAPI_URL}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              event_name: eventName,
              event_id: eventId,
              event_time: Math.floor(Date.now() / 1000),
              action_source: 'website',
              event_source_url: url || undefined,
              user_data: {
                client_ip_address: ip || undefined,
                client_user_agent: userAgent || undefined,
              },
            },
          ],
        }),
      }
    )
    if (!resposta.ok) {
      console.error('[contact] Meta CAPI falhou:', resposta.status, await resposta.text())
    }
  } catch (erro) {
    console.error('[contact] Meta CAPI erro inesperado:', erro)
  }
}

/** IP real de quem preencheu — a Vercel entrega em x-forwarded-for (client, proxy1, proxy2...). */
function ipDoCliente(req) {
  const cabecalho = req.headers['x-forwarded-for']
  if (!cabecalho) return null
  return String(cabecalho).split(',')[0].trim() || null
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function row(label, value) {
  if (!value) return ''
  return `<tr>
    <td style="padding:8px 12px;color:#64748b;font-size:13px;width:140px;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;color:#0f172a;font-size:14px">${escapeHtml(value)}</td>
  </tr>`
}

function buildHtml(payload) {
  const formLabel = FORM_LABELS[payload.form] || payload.form || 'Formulário'
  return `<!DOCTYPE html>
<html lang="pt-BR">
<body style="margin:0;padding:24px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px">
    <tr>
      <td style="padding:20px 24px;background:#5e04aa;color:#fff;border-radius:12px 12px 0 0">
        <div style="font-size:12px;opacity:.85;text-transform:uppercase;letter-spacing:.04em">Lenext · Landing page</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px">${escapeHtml(formLabel)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 12px">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${row('Nome', payload.name)}
          ${row('Empresa', payload.company)}
          ${row('E-mail', payload.email)}
          ${row('Telefone', payload.phone)}
          ${row('Idioma', payload.locale)}
          ${row('Página', payload.page)}
          ${row('Consentimento', payload.consent ? 'Sim' : 'Não informado')}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px 24px;color:#94a3b8;font-size:12px">
        Enviado automaticamente pela LP Lenext em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}.
      </td>
    </tr>
  </table>
</body>
</html>`
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  // DEBUG TEMPORÁRIO — remover depois de diagnosticar o CAPI.
  if (req.method === 'GET' && req.query?.debug === '1') {
    res.status(200).json({
      ip: ipDoCliente(req),
      xForwardedFor: req.headers['x-forwarded-for'] || null,
      userAgent: req.headers['user-agent'] || null,
    })
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' })
    return
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim().toLowerCase()
    const company = String(body.company || '').trim()
    const phone = String(body.phone || '').trim()
    const form = String(body.form || 'lead').trim()
    const locale = String(body.locale || '').trim()
    const page = String(body.page || '').trim()
    const consent = Boolean(body.consent)
    const eventId = String(body.eventId || '').trim()
    const medicaoConsentida = Boolean(body.medicaoConsentida)

    if (name.length < 2) {
      res.status(400).json({ error: 'Nome é obrigatório.' })
      return
    }
    if (!EMAIL_RE.test(email)) {
      res.status(400).json({ error: 'E-mail inválido.' })
      return
    }

    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM
    const to = process.env.CONTACT_TO || DEFAULT_TO

    if (!apiKey || !from) {
      console.error('[contact] RESEND_API_KEY ou RESEND_FROM ausente')
      res.status(500).json({ error: 'Envio de e-mail não configurado no servidor.' })
      return
    }

    const formLabel = FORM_LABELS[form] || form
    const subject = `[LP] ${formLabel} — ${name}${company ? ` (${company})` : ''}`

    const resposta = await fetch(`${RESEND_API_URL}/emails`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        html: buildHtml({ name, email, company, phone, form, locale, page, consent }),
      }),
    })

    const texto = await resposta.text()
    let data = null
    try {
      data = texto ? JSON.parse(texto) : null
    } catch {
      data = { message: texto }
    }

    if (!resposta.ok) {
      console.error('[contact] Resend falhou:', resposta.status, data)
      res.status(502).json({ error: data?.message || 'Falha ao enviar e-mail.' })
      return
    }

    // Todo formulário desta rota é uma conversão "Lead" — o mesmo mapeamento
    // que o Pixel do navegador usa (ver EVENTO_META em src/lib/analytics.js).
    if (medicaoConsentida && eventId) {
      await reforcarConversaoMeta({
        eventName: 'Lead',
        eventId,
        ip: ipDoCliente(req),
        userAgent: req.headers['user-agent'],
        url: page,
      })
    }

    res.status(200).json({ ok: true, id: data?.id || null })
  } catch (erro) {
    console.error('[contact] erro inesperado:', erro)
    res.status(500).json({ error: 'Erro interno ao processar o formulário.' })
  }
}
