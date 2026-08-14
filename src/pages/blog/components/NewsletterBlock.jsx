import { useState } from 'react'
import Button from '../../../components/ui/Button'
import { submitLead } from '../../../lib/submitLead'
import { useLanguage } from '../../../i18n/LanguageContext'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Captura de newsletter no blog.
 *
 * Reaproveita `submitLead` e a Function `api/contact.js` — o campo `form:
 * 'newsletter'` é o que separa este lead dos demais na caixa do comercial.
 */
export default function NewsletterBlock() {
  const { t, lang } = useLanguage()
  const copy = t.blog.newsletter

  const [form, setForm] = useState({ name: '', email: '', consent: false })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const canSubmit = form.name.trim().length > 1 && emailRe.test(form.email) && form.consent

  async function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit || sending) return

    setError('')
    setSending(true)
    try {
      await submitLead({
        form: 'newsletter',
        name: form.name,
        email: form.email,
        consent: form.consent,
        locale: lang,
      })
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  const fieldClass =
    'w-full rounded-lg border border-line bg-ink-soft px-4 py-3 text-fg placeholder:text-mist/60 focus:border-brand-orange/60 focus:bg-ink focus:outline-none focus:ring-1 focus:ring-brand-orange/40'

  return (
    <section className="mt-16 overflow-hidden rounded-2xl border border-line bg-ink-soft p-8 sm:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">{copy.title}</h2>
          <p className="mt-3 text-mist">{copy.desc}</p>
        </div>

        {sent ? (
          <p role="status" className="text-lg font-semibold text-brand-purple">
            {copy.success}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="sr-only">{copy.name}</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={copy.namePlaceholder}
                  value={form.name}
                  onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="sr-only">{copy.email}</span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={copy.emailPlaceholder}
                  value={form.email}
                  onChange={(event) => setForm((f) => ({ ...f, email: event.target.value }))}
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-mist">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => setForm((f) => ({ ...f, consent: event.target.checked }))}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange"
              />
              <span>{copy.consent}</span>
            </label>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button as="button" type="submit" size="sm" disabled={!canSubmit || sending}>
              {sending ? copy.sending : copy.button}
            </Button>

            <p className="text-xs text-mist">{canSubmit ? copy.privacy : copy.disabledHint}</p>
          </form>
        )}
      </div>
    </section>
  )
}
