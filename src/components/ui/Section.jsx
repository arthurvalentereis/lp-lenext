// Wrapper de seção com largura máxima e espaçamento padrão.
export default function Section({ id, alt = false, className = '', children }) {
  return (
    <section
      id={id}
      className={`${alt ? 'bg-ink-soft' : 'bg-ink'} px-5 py-20 sm:py-24 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

// Rótulo pequeno acima dos títulos de seção.
export function Eyebrow({ children }) {
  return (
    <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-brand-orange">
      {children}
    </span>
  )
}
