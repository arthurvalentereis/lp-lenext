/**
 * POST /api/contact — recebe leads dos formulários da LP e notifica contato@lenext.com.br.
 *
 * Env (Vercel):
 *   RESEND_API_KEY — obrigatória
 *   RESEND_FROM    — remetente verificado, ex.: "Lenext <contato@newsletter.lenext.com.br>"
 *   CONTACT_TO     — opcional; padrão contato@lenext.com.br
 */

const RESEND_API_URL = 'https://api.resend.com'
const DEFAULT_TO = 'contato@lenext.com.br'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FORM_LABELS = {
  demo: 'Agendar demo',
  ebook: 'Download e-book Política de Crédito',
  prompt: 'Acesso ao prompt de análise de crédito',
  newsletter: 'Assinatura da newsletter do blog',
  lead: 'Lead genérico',
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

    res.status(200).json({ ok: true, id: data?.id || null })
  } catch (erro) {
    console.error('[contact] erro inesperado:', erro)
    res.status(500).json({ error: 'Erro interno ao processar o formulário.' })
  }
}
