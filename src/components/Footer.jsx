import { config } from '../config'
import Logo from './ui/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-5 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Logo />
          <p className="text-sm text-mist">Plataforma LETMESEE de análise de crédito.</p>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm text-mist sm:items-end">
          <a href={`mailto:${config.email}`} className="transition hover:text-fg">
            {config.email}
          </a>
          <div className="flex gap-3">
            <span className="rounded border border-line px-2 py-0.5 text-xs">LGPD</span>
            <span className="rounded border border-line px-2 py-0.5 text-xs">ISO 27001</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-line pt-6 text-center text-xs text-mist">
        © {new Date().getFullYear()} Lenext Technology. Todos os direitos reservados.
      </div>
    </footer>
  )
}
