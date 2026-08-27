import { Link } from 'react-router-dom'
import { config } from '../config'
import Logo from './ui/Logo'
import { useLanguage } from '../i18n/LanguageContext'
import { reabrirEscolha } from '../lib/consentimento'

const institucionalHrefs = [
  { href: '/privacidade.html' },
  { href: '/termos.html' },
  { href: 'https://letmesee.readme.io/reference/getting-started-letmesee', external: true },
  { href: 'https://status.letmesee.com.br/', external: true },
]

function ColTitle({ children }) {
  return (
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fg">{children}</h3>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const f = t.footer

  return (
    <footer className="border-t border-line bg-ink px-5 py-14">
      <div className="mx-auto grid w-full max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-5">
        {/* 1. Marca */}
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-mist">{f.tagline}</p>
          <div className="mt-4 flex gap-3">
            {f.badges.map((b) => (
              <span key={b} className="rounded border border-line px-2 py-0.5 text-xs text-mist">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* 2. Apoio */}
        <div>
          <ColTitle>{f.apoioTitle}</ColTitle>
          <img
            src="/partner-unitea.png"
            alt="Unitea"
            className="h-12 w-auto max-w-[160px] object-contain"
            loading="lazy"
          />
        </div>

        {/* 3. Institucional */}
        <div>
          <ColTitle>{f.institucionalTitle}</ColTitle>
          <ul className="space-y-2.5 text-sm">
            {f.institucional.map((label, idx) => (
              <li key={label}>
                <a
                  href={institucionalHrefs[idx].href}
                  {...(institucionalHrefs[idx].external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-1.5 text-mist transition hover:text-fg"
                >
                  {label}
                  {institucionalHrefs[idx].external && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Conteúdos */}
        <div>
          <ColTitle>{f.conteudosTitle}</ColTitle>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                to="/resources/ebook-politica-credito"
                className="text-mist transition hover:text-fg"
              >
                {f.conteudos.ebook}
              </Link>
            </li>
            <li>
              <Link
                to="/resources/prompt-analise-credito"
                className="text-mist transition hover:text-fg"
              >
                {f.conteudos.prompt}
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-mist transition hover:text-fg">
                {f.conteudos.blog}
              </Link>
            </li>
          </ul>
        </div>

        {/* 5. Contato */}
        <div>
          <ColTitle>{f.contatoTitle}</ColTitle>
          <ul className="space-y-3 text-sm text-mist">
            <li className="flex gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange">
                <path d="M12 21s-7-5.3-7-11a7 7 0 0114 0c0 5.7-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>{config.address}</span>
            </li>
            <li className="flex gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <a href={`mailto:${config.email}`} className="transition hover:text-fg">
                {config.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange">
                <path d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.6a16 16 0 006.4 6.4l1.1-1.1a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z" />
              </svg>
              <a href={config.phoneHref} className="transition hover:text-fg">
                {config.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-line pt-6 text-center text-xs text-mist">
        © {new Date().getFullYear()} {f.copyright}
        {' · '}
        {/* Revogar tem de ser tão fácil quanto consentir (LGPD art. 8º §5º):
            reabre o banner para a pessoa trocar a escolha a qualquer momento. */}
        <button
          type="button"
          onClick={reabrirEscolha}
          className="underline underline-offset-2 transition hover:text-fg"
        >
          Preferências de medição
        </button>
      </div>
    </footer>
  )
}
