import { useEffect, useRef, useState } from 'react'

const slides = [
  { src: '/painel-credito.webp', url: 'app.lenext.com.br/credito', label: 'Análise de crédito' },
  { src: '/painel-cobranca.webp', url: 'app.lenext.com.br/cobranca', label: 'Painel de cobrança' },
  { src: '/parcelas-receber.webp', url: 'app.lenext.com.br/recebiveis', label: 'Parcelas a receber' },
  { src: '/relatorio-bacen.webp', url: 'app.lenext.com.br/bacen-scr', label: 'Relatório Bacen SCR' },
  { src: '/painel-leads.webp', url: 'app.lenext.com.br/leads', label: 'Painel de leads' },
]

// clona o primeiro slide no fim para um loop contínuo (sem "rebobinar").
const all = [...slides, slides[0]]

export default function ProductCarousel() {
  const n = slides.length
  const [i, setI] = useState(0)
  const [anim, setAnim] = useState(true)
  const [hovering, setHovering] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [dragPx, setDragPx] = useState(0)
  const [loaded, setLoaded] = useState({})
  const viewportRef = useRef(null)
  const startXRef = useRef(0)

  const paused = hovering || dragging

  // avanço automático (esquerda → direita)
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setAnim(true)
      setI((p) => p + 1)
    }, 4000)
    return () => clearInterval(t)
  }, [paused])

  // ao chegar no clone, reseta para o início sem animação (loop perfeito)
  useEffect(() => {
    if (anim) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)))
    return () => cancelAnimationFrame(id)
  }, [anim])

  function handleEnd() {
    if (i === n) {
      setAnim(false)
      setI(0)
    }
  }

  function go(idx) {
    setAnim(true)
    setI(idx)
  }

  // ---- arrastar / swipe ----
  function onPointerDown(e) {
    const cur = i % n
    if (cur !== i) setI(cur) // sai do clone antes de arrastar
    startXRef.current = e.clientX
    setDragging(true)
    setAnim(false)
    setDragPx(0)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  function onPointerMove(e) {
    if (!dragging) return
    setDragPx(e.clientX - startXRef.current)
  }

  function endDrag() {
    if (!dragging) return
    const w = viewportRef.current?.offsetWidth || 1
    const threshold = Math.min(120, w * 0.15)
    let target = i % n
    if (dragPx <= -threshold) target = Math.min(target + 1, n) // arrastou p/ esquerda → próximo
    else if (dragPx >= threshold) target = Math.max(target - 1, 0) // arrastou p/ direita → anterior
    setAnim(true)
    setDragPx(0)
    setI(target)
    setDragging(false)
  }

  const active = i % n

  return (
    <div
      className="relative mx-auto w-full max-w-5xl"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-10 bottom-0 rounded-full opacity-15 blur-3xl"
        style={{ background: 'linear-gradient(100deg, #5901b1, #ff6600)' }}
      />

      <div className="relative overflow-hidden rounded-xl border border-line bg-ink-card elev">
        {/* barra do navegador (Safari) */}
        <div className="flex items-center gap-2 border-b border-line bg-ink-soft px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="mx-auto flex max-w-[70%] items-center gap-1.5 truncate rounded-md border border-line bg-ink px-3 py-1 text-xs text-mist">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 shrink-0">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>
            {all[active].url}
          </span>
        </div>

        {/* trilho de slides (arrastável) */}
        <div
          ref={viewportRef}
          className="cursor-grab select-none overflow-hidden active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(${-i * 100}% + ${dragPx}px))`,
              transition: anim ? 'transform 700ms ease' : 'none',
            }}
            onTransitionEnd={handleEnd}
          >
            {all.map((s, idx) => (
              <div key={idx} className="relative aspect-[22/10] w-full shrink-0 bg-ink-soft">
                {!loaded[idx] && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-mist">
                    <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-line border-t-brand-orange" />
                    <span className="text-xs">Carregando…</span>
                  </div>
                )}
                <img
                  ref={(el) => {
                    if (el && el.complete && el.naturalWidth > 0) {
                      setLoaded((p) => (p[idx] ? p : { ...p, [idx]: true }))
                    }
                  }}
                  src={s.src}
                  alt={s.label}
                  draggable={false}
                  onLoad={() => setLoaded((p) => (p[idx] ? p : { ...p, [idx]: true }))}
                  className={`pointer-events-none h-full w-full bg-white object-contain transition-opacity duration-500 ${
                    loaded[idx] ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading={idx <= 1 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bolinhas */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {slides.map((s, idx) => (
          <button
            key={idx}
            onClick={() => go(idx)}
            aria-label={s.label}
            aria-current={idx === active}
            className={`h-2 rounded-full transition-all ${
              idx === active ? 'w-6 bg-brand-gradient' : 'w-2 bg-line hover:bg-mist'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
