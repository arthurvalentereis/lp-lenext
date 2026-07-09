import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/ui/Logo'
import LanguageSwitcher from '../../components/ui/LanguageSwitcher'
import Footer from '../../components/Footer'
import WhatsAppFloat from '../../components/WhatsAppFloat'
import Button from '../../components/ui/Button'
import useReveal from '../../hooks/useReveal'
import { useLanguage } from '../../i18n/LanguageContext'

export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Define título da aba + rola ao topo ao montar a página (SEO/analytics por rota).
export function usePageMeta(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    window.scrollTo(0, 0)
    return () => {
      document.title = prev
    }
  }, [title])
}

// Chrome comum das páginas de captação: header enxuto + fundo + footer + WhatsApp.
export function CaptureShell({ children }) {
  const { t } = useLanguage()
  useReveal()

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center" aria-label="Lenext">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm font-medium text-mist transition-colors hover:text-fg sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M15 6l-6 6 6 6" />
              </svg>
              {t.resources.backToSite}
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 h-[600px]" />
        <div
          aria-hidden
          className="float-slow pointer-events-none absolute right-0 top-0 h-[520px] w-[820px] translate-x-1/4 rounded-full opacity-[0.10] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #5901b1 0%, transparent 70%)' }}
        />
        <section className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
          {children}
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}

function Field({ label, name, type, placeholder, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-mist">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full rounded-lg border border-line bg-ink-soft px-4 py-3 text-fg placeholder:text-mist/60 focus:border-brand-orange/60 focus:bg-ink focus:outline-none focus:ring-1 focus:ring-brand-orange/40"
      />
    </label>
  )
}

// Formulário de captação (nome, e-mail, autorização de contato).
// O botão de entrega só é liberado quando os 3 campos são válidos.
// `block` traz: formTitle, badge, fields, consent, disabledHint, privacy.
export function LeadForm({ block, buttonLabel, buttonIcon, onUnlock }) {
  const [form, setForm] = useState({ name: '', email: '', consent: false })
  const canUnlock =
    form.name.trim().length > 1 && emailRe.test(form.email) && form.consent

  function submit(ev) {
    ev.preventDefault()
    if (!canUnlock) return
    onUnlock()
  }

  return (
    <div className="reveal lg:sticky lg:top-24">
      <div className="rounded-2xl border border-brand-purple/40 bg-ink-card p-7 ring-brand-glow sm:p-8">
        <div className="mb-5 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
            {block.badge}
          </span>
        </div>
        <h2 className="text-xl font-bold">{block.formTitle}</h2>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <Field
            label={block.fields.name.label}
            name="name"
            type="text"
            placeholder={block.fields.name.placeholder}
            value={form.name}
            onChange={(ev) => setForm((f) => ({ ...f, name: ev.target.value }))}
          />
          <Field
            label={block.fields.email.label}
            name="email"
            type="email"
            placeholder={block.fields.email.placeholder}
            value={form.email}
            onChange={(ev) => setForm((f) => ({ ...f, email: ev.target.value }))}
          />

          <label className="flex cursor-pointer items-start gap-3 text-sm text-mist">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(ev) => setForm((f) => ({ ...f, consent: ev.target.checked }))}
              className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange"
            />
            <span>{block.consent}</span>
          </label>

          {canUnlock ? (
            <Button as="button" type="submit" className="w-full">
              {buttonIcon}
              {buttonLabel}
            </Button>
          ) : (
            <div>
              <button
                type="submit"
                disabled
                className="w-full cursor-not-allowed rounded-full bg-line px-7 py-3.5 text-base font-semibold text-mist"
              >
                {buttonLabel}
              </button>
              <p className="mt-2 text-center text-xs text-mist">{block.disabledHint}</p>
            </div>
          )}

          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-mist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 text-brand-orange">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>
            {block.privacy}
          </p>
        </form>
      </div>
    </div>
  )
}

// Tela de agradecimento pós-conversão. Sem classes .reveal (é montada após o
// clique, então o observer criado no mount não a observaria — ficaria invisível).
// `children` é a entrega específica de cada material (re-download, copiar prompt…).
export function ThankYou({ block, children }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#10b981]/15">
        <svg className="h-8 w-8 text-[#059669]" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>

      <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
        {block.eyebrow}
      </span>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{block.title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-mist">{block.desc}</p>

      {children}

      <div className="mt-12 overflow-hidden rounded-2xl border border-brand-purple/40 bg-ink-card p-8 text-left ring-brand-glow sm:p-10">
        <h2 className="text-2xl font-bold">{block.nextTitle}</h2>
        <p className="mt-3 text-mist">{block.nextDesc}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/#contato" className="w-full sm:w-auto">
            {block.ctaDemo}
          </Button>
          <Button href="/" variant="ghost" className="w-full sm:w-auto">
            {block.ctaExplore}
          </Button>
        </div>
      </div>

      <p className="mt-8 text-sm font-medium uppercase tracking-wider text-mist">{block.proof}</p>
    </div>
  )
}

// Ícones reutilizados nas entregas.
export const DownloadIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
    <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
  </svg>
)
