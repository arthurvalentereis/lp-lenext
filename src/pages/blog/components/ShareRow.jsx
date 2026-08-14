import { useEffect, useState } from 'react'
import { absoluteUrl } from '../../../lib/site'
import { useLanguage } from '../../../i18n/LanguageContext'

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  className: 'h-4 w-4',
}

export default function ShareRow({ post }) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  // Some sozinho: um "Link copiado" permanente vira ruído na página.
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const url = absoluteUrl(post.url)
  const text = `${post.title} — Lenext`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // Clipboard bloqueado (contexto inseguro ou permissão negada): o link
      // continua visível na barra de endereços, então não há o que recuperar.
    }
  }

  const linkClass =
    'inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-sm text-mist transition-colors hover:border-brand-orange/50 hover:text-fg'

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
      <span className="text-sm font-medium text-mist">{t.blog.share}</span>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.blog.shareLinkedin}
        className={linkClass}
      >
        <svg {...iconProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4" />
        </svg>
        LinkedIn
      </a>

      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.blog.shareWhatsapp}
        className={linkClass}
      >
        <svg {...iconProps}>
          <path d="M21 12a9 9 0 01-13.4 7.8L3 21l1.3-4.4A9 9 0 1121 12z" />
        </svg>
        WhatsApp
      </a>

      <button type="button" onClick={copyLink} className={linkClass}>
        <svg {...iconProps}>
          <path d="M10 13a5 5 0 007.5.5l2-2a5 5 0 00-7-7l-1 1" />
          <path d="M14 11a5 5 0 00-7.5-.5l-2 2a5 5 0 007 7l1-1" />
        </svg>
        {copied ? t.blog.copied : t.blog.copyLink}
      </button>

      {/* Confirmação anunciada por leitor de tela sem mover o foco. */}
      <span aria-live="polite" className="sr-only">
        {copied ? t.blog.copied : ''}
      </span>
    </div>
  )
}
