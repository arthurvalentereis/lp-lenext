import { useEffect } from 'react'

// Revela elementos (.reveal / .reveal-group) ao entrarem na viewport.
// Anima apenas na primeira entrada; re-animar ao rolar de volta é ruído.
//
// `deps` reobserva o DOM quando a página monta conteúdo novo depois do mount
// (o filtro de categoria do blog, por exemplo). Sem isso os elementos novos
// nunca recebem `.is-visible` e ficam com opacidade zero.
export default function useReveal(deps = []) {
  useEffect(() => {
    // `:not(.is-visible)` evita reobservar o que já foi revelado numa passada
    // anterior — reanimar conteúdo estável seria exatamente o ruído que a
    // regra acima quer evitar.
    const els = document.querySelectorAll(
      '.reveal:not(.is-visible), .reveal-group:not(.is-visible)',
    )
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
