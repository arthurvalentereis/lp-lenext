// Botão reutilizável. Variantes: 'primary' (gradiente da marca), 'ghost' (contorno neutro), 'outline-orange' (contorno laranja sutil).
export default function Button({ as = 'a', variant = 'primary', className = '', children, ...props }) {
  const Tag = as
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70'
  const variants = {
    primary:
      'btn-shine bg-brand-orange text-white shadow-[0_12px_40px_-12px_rgba(255,102,0,0.6)] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_rgba(255,102,0,0.75)]',
    ghost:
      'border border-line text-fg hover:border-brand-orange/60 hover:bg-black/5',
    'outline-orange':
      'border border-brand-orange/50 text-fg hover:border-brand-orange hover:bg-brand-orange/5',
  }
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
