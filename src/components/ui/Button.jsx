// Botão reutilizável. Variantes: 'primary' (gradiente da marca), 'ghost' (contorno).
export default function Button({ as = 'a', variant = 'primary', className = '', children, ...props }) {
  const Tag = as
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70'
  const variants = {
    primary:
      'bg-brand-gradient text-white shadow-[0_12px_40px_-12px_rgba(255,102,0,0.6)] hover:brightness-110 hover:-translate-y-0.5',
    ghost:
      'border border-line text-fg hover:border-brand-orange/60 hover:bg-black/5',
  }
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
