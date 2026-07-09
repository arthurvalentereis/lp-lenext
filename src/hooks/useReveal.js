import { useEffect } from 'react'

// Revela elementos (.reveal / .reveal-group) ao entrarem na viewport.
// Anima apenas na primeira entrada; re-animar ao rolar de volta é ruído.
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-group')
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
  }, [])
}
