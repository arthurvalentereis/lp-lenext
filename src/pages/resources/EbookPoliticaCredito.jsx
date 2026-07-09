import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { CaptureShell, LeadForm, ThankYou, usePageMeta, DownloadIcon } from './shared'

const EBOOK_PDF = '/resources/ebook/Lenext-Ebook-Politica-de-Credito.pdf'
const EBOOK_FILENAME = 'Lenext-Ebook-Politica-de-Credito.pdf'

/* Capa estilizada do e-book (sem arte externa) — gradiente da marca. */
function EbookCover({ title }) {
  return (
    <div className="float-card-a relative mx-auto w-full max-w-[260px]">
      <div className="relative overflow-hidden rounded-l-sm rounded-r-lg bg-gradient-to-br from-[#3d0180] via-brand-purple to-[#8b3ae8] p-6 shadow-[0_30px_60px_-20px_rgba(89,1,177,0.55)]">
        <span aria-hidden className="absolute inset-y-0 left-0 w-2 bg-black/20" />
        <span aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
        <div className="relative flex h-[300px] flex-col">
          <span className="text-lg font-extrabold tracking-tight text-white">
            LENE<span className="text-brand-orange">X</span>T
          </span>
          <span className="mt-1 inline-flex w-fit items-center rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur">
            E-book
          </span>
          <h3 className="mt-auto text-2xl font-extrabold leading-tight text-white">{title}</h3>
          <svg viewBox="0 0 200 40" className="mt-4 w-full opacity-80" aria-hidden>
            <polyline
              points="4,30 40,22 76,26 112,12 148,16 196,4"
              fill="none"
              stroke="#ff8533"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function EbookPoliticaCredito() {
  const { t } = useLanguage()
  const e = t.resources.ebook
  const [done, setDone] = useState(false)

  usePageMeta(e.pageMeta)

  // Baixa via blob para NUNCA navegar o SPA. Fallback: nova aba.
  async function download() {
    try {
      const res = await fetch(EBOOK_PDF)
      if (!res.ok) throw new Error('fetch falhou')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = EBOOK_FILENAME
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 2000)
    } catch {
      window.open(EBOOK_PDF, '_blank', 'noopener')
    }
  }

  function unlock() {
    // TODO: integrar captura de lead com CRM/automação quando houver endpoint.
    setDone(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    download()
  }

  return (
    <CaptureShell>
      {done ? (
        <ThankYou block={e.thanks}>
          <button
            onClick={download}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange transition hover:brightness-110"
          >
            {DownloadIcon}
            {e.thanks.redownload}
          </button>
        </ThankYou>
      ) : (
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal-group">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft px-4 py-1.5 text-sm font-semibold text-brand-orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              {e.eyebrow}
            </span>

            <h1 className="text-balance text-3xl font-extrabold leading-[1.15] sm:text-4xl">{e.title}</h1>
            <p className="mt-4 max-w-xl text-lg text-mist">{e.subtitle}</p>

            <ul className="mt-8 space-y-3">
              {e.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#10b981] bg-[#ecfdf5]">
                    <svg className="h-3.5 w-3.5 text-[#059669]" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-fg">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 hidden lg:block">
              <EbookCover title={e.title} />
            </div>
          </div>

          <LeadForm block={e} buttonLabel={e.download} buttonIcon={DownloadIcon} onUnlock={unlock} />
        </div>
      )}
    </CaptureShell>
  )
}
