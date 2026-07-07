import Button from './ui/Button'
import Logo from './ui/Logo'

const nav = [
  { label: 'Solução', href: '#solucao' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Motor de crédito', href: '#motor' },
  { label: 'Segurança', href: '#seguranca' },
  { label: 'Planos', href: '#planos' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <a href="#topo" className="flex items-center" aria-label="Lenext">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-mist transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button href="#contato" className="px-5 py-2.5 text-sm">
          Falar com um consultor
        </Button>
      </div>
    </header>
  )
}
