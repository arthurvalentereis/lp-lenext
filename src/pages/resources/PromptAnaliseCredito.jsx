import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { CaptureShell, LeadForm, ThankYou, usePageMeta } from './shared'

/* Visual: card estilo "IA" com prévia do prompt (gradiente da marca). */
function PromptCard({ label, previewLines }) {
  return (
    <div className="float-card-a relative mx-auto w-full max-w-[340px]">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3d0180] via-brand-purple to-[#8b3ae8] p-5 shadow-[0_30px_60px_-20px_rgba(89,1,177,0.55)]">
        <span aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 2l1.7 4.6L18 8.3l-4.3 1.7L12 14.6l-1.7-4.6L6 8.3l4.3-1.7L12 2zM19 14l.9 2.4 2.4.9-2.4.9L19 20.6l-.9-2.4-2.4-.9 2.4-.9L19 14z" />
              </svg>
            </span>
            <span className="text-sm font-bold">{label}</span>
          </div>

          <div className="mt-4 rounded-xl bg-black/25 p-4 font-mono text-[11px] leading-relaxed text-white/80 backdrop-blur">
            {previewLines.map((line, i) => (
              <p key={i} className={i === 0 ? 'text-white' : ''}>{line}</p>
            ))}
            <span className="mt-1 inline-block h-3.5 w-2 animate-pulse bg-brand-orange align-middle" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* Entrega: caixa com o prompt completo + botão de copiar. */
function PromptBox({ text, copyLabel, copiedLabel }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    const done = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done)
    } else {
      done()
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-2xl text-left">
      <div className="overflow-hidden rounded-2xl border border-line bg-ink-card elev">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-ink-soft px-4 py-2.5">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-mist">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-brand-orange">
              <path d="M12 2l1.7 4.6L18 8.3l-4.3 1.7L12 14.6l-1.7-4.6L6 8.3l4.3-1.7L12 2z" />
            </svg>
            Prompt
          </span>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3.5 py-1.5 text-xs font-semibold text-white transition hover:brightness-110"
          >
            {copied ? (
              <>
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {copiedLabel}
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                  <rect x="9" y="9" width="12" height="12" rx="2" />
                  <path d="M5 15V5a2 2 0 012-2h10" />
                </svg>
                {copyLabel}
              </>
            )}
          </button>
        </div>
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap px-4 py-4 text-left font-mono text-[13px] leading-relaxed text-fg">
          {text}
        </pre>
      </div>
    </div>
  )
}

export default function PromptAnaliseCredito() {
  const { t } = useLanguage()
  const p = t.resources.prompt
  const [done, setDone] = useState(false)

  usePageMeta(p.pageMeta)

  function unlock() {
    // TODO: integrar captura de lead com CRM/automação quando houver endpoint.
    setDone(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const previewLines = p.promptText.split('\n').slice(0, 4)

  const SparkIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2l1.7 4.6L18 8.3l-4.3 1.7L12 14.6l-1.7-4.6L6 8.3l4.3-1.7L12 2z" />
    </svg>
  )

  return (
    <CaptureShell>
      {done ? (
        <ThankYou block={p.thanks}>
          <PromptBox text={p.promptText} copyLabel={p.thanks.copy} copiedLabel={p.thanks.copied} />
        </ThankYou>
      ) : (
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal-group">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft px-4 py-1.5 text-sm font-semibold text-brand-orange">
              {SparkIcon}
              {p.eyebrow}
            </span>

            <h1 className="text-balance text-3xl font-extrabold leading-[1.15] sm:text-4xl">{p.title}</h1>
            <p className="mt-4 max-w-xl text-lg text-mist">{p.subtitle}</p>

            {/* chips de destaque */}
            <div className="mt-6 flex flex-wrap gap-2">
              {p.chips.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-full border border-brand-purple/30 bg-brand-purple/5 px-3 py-1 text-xs font-semibold text-brand-purple-soft"
                >
                  {c}
                </span>
              ))}
            </div>

            <ul className="mt-8 space-y-3">
              {p.bullets.map((b) => (
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
              <PromptCard label={p.chips[5] ?? 'IA'} previewLines={previewLines} />
            </div>
          </div>

          <LeadForm block={p} buttonLabel={p.unlock} buttonIcon={SparkIcon} onUnlock={unlock} />
        </div>
      )}
    </CaptureShell>
  )
}
