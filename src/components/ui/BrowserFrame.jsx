// Moldura de navegador estilo macOS (3 pontinhos + barra de endereço) ao redor de uma imagem.
export default function BrowserFrame({ src, alt, url = 'app.lenext.com.br', className = '', imgClassName = '', ...imgProps }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-ink-card elev ${className}`}>
      {/* barra do navegador */}
      <div className="flex items-center gap-2 border-b border-line bg-ink-soft px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto flex max-w-[70%] items-center gap-1.5 truncate rounded-md border border-line bg-ink px-3 py-1 text-xs text-mist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 shrink-0">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 018 0v3" />
          </svg>
          {url}
        </span>
      </div>
      <img src={src} alt={alt} className={`block w-full ${imgClassName}`} {...imgProps} />
    </div>
  )
}
