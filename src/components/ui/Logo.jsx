// Recriação do wordmark Lenext para tema claro: "LENEXT" com o X em gradiente.
// INTERINO: para fidelidade total à marca, substituir pela versão oficial em cor
// (a única arte enviada é branca, invisível em fundo claro).
export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="text-xl font-extrabold tracking-tight text-fg">
        LENE<span className="text-brand-gradient">X</span>T
      </span>
      <span className="mt-0.5 text-[9px] font-semibold tracking-[0.32em] text-mist">
        TECHNOLOGY
      </span>
    </span>
  )
}
