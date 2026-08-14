import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../components/ui/Logo'
import LanguageSwitcher from '../../components/ui/LanguageSwitcher'
import Button from '../../components/ui/Button'
import Footer from '../../components/Footer'
import WhatsAppFloat from '../../components/WhatsAppFloat'
import { useLanguage } from '../../i18n/LanguageContext'

/**
 * Casca comum das páginas de blog.
 *
 * Segue o padrão de `src/pages/resources/shared.jsx` (header enxuto + fundo
 * decorativo + Footer + WhatsApp), com uma diferença importante: no blog o
 * idioma vive na URL, então o seletor navega em vez de só trocar o contexto.
 */

/** Sincroniza o idioma da rota com o contexto global. */
export function useRouteLanguage(lang) {
  const { lang: current, setLang } = useLanguage()
  useEffect(() => {
    if (lang && lang !== current) setLang(lang)
  }, [lang, current, setLang])
}

/** Rola ao topo ao trocar de artigo — sem isto a rota nova abre no meio. */
export function useScrollTop(key) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [key])
}

export function BlogShell({ lang, alternates = [], children }) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const blog = t.blog

  // O switcher devolve o código escolhido; o destino vem do `hreflang` da
  // página, que já sabe a URL do par traduzido. Quando o par não existe,
  // cair no índice do outro idioma é melhor que um 404.
  function handleLanguage(code) {
    const target = alternates.find((alternate) => alternate.code === code)
    navigate(target ? target.path : code === 'en' ? '/en/blog' : '/blog')
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center" aria-label="Lenext">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to={lang === 'en' ? '/en/blog' : '/blog'}
              className="hidden text-sm font-medium text-mist transition-colors hover:text-fg sm:inline-flex"
            >
              {blog.eyebrow}
            </Link>
            <LanguageSwitcher onSelect={handleLanguage} />
            <Button href="/#contato" variant="outline-orange" size="sm">
              {t.header.cta}
            </Button>
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
        <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:py-20">{children}</div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  )
}

/** Data ISO → data por extenso no idioma do post. */
export function formatDate(value, lang) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
