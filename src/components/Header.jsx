import Button from './ui/Button'
import Logo from './ui/Logo'
import LanguageSwitcher from './ui/LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'

const hrefs = ['#solucao', '#resultados', '#funcionalidades', '#seguranca', '#planos']

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <a href="#topo" className="flex items-center" aria-label="Lenext">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {t.header.nav.map((label, idx) => (
            <a
              key={hrefs[idx]}
              href={hrefs[idx]}
              className="text-sm font-medium text-mist transition-colors hover:text-fg"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button href="#contato" variant="outline-orange" className="px-4 py-2 text-sm">
            {t.header.cta}
          </Button>
        </div>
      </div>
    </header>
  )
}
