import Button from './ui/Button'
import Logo from './ui/Logo'
import LanguageSwitcher from './ui/LanguageSwitcher'
import { useLanguage } from '../i18n/LanguageContext'
import { NAV_ITEMS } from '../lib/navigation'

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <a href="#topo" className="flex items-center" aria-label="Lenext">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.key}
              href={item.hash}
              className="text-sm font-medium text-mist transition-colors hover:text-fg"
            >
              {t.header.nav[idx]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button href="#contato" variant="outline-orange" size="sm">
            {t.header.cta}
          </Button>
        </div>
      </div>
    </header>
  )
}
