// Botão reutilizável. Variantes: 'primary' (gradiente da marca), 'ghost' (contorno neutro),
// 'outline-orange' (contorno laranja sutil), 'outline-gradient' (contorno laranja + texto em degradê).
// Tamanhos: 'md' (padrão) e 'sm' (compacto, ex.: header). Mantido como prop dedicada
// (em vez de className) porque utilitários conflitantes de padding não se sobrescrevem
// de forma confiável via ordem de classes no Tailwind.
export default function Button({ as = 'a', variant = 'primary', size = 'md', className = '', children, ...props }) {
  const Tag = as
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70'
  const sizes = {
    md: 'px-7 py-3.5 text-base',
    sm: 'px-4 py-2 text-sm',
  }
  const variants = {
    primary:
      'btn-shine bg-brand-orange text-white shadow-[0_12px_40px_-12px_rgba(255,102,0,0.6)] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_rgba(255,102,0,0.75)]',
    ghost:
      'border border-line text-fg hover:border-brand-orange/60 hover:bg-black/5',
    'outline-orange':
      'border border-brand-orange/50 text-fg hover:border-brand-orange hover:bg-brand-orange/5',
    'outline-gradient':
      'text-brand-gradient border border-brand-orange/50 hover:border-brand-orange hover:bg-brand-orange/5',
  }
  return (
    <Tag className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
