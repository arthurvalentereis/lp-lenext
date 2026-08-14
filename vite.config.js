import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * O `vite preview` aplica o fallback de SPA antes de procurar um `index.html`
 * dentro do diretório da rota, então `/blog/<slug>` devolvia o shell da landing
 * page e escondia o resultado do `scripts/prerender.mjs`.
 *
 * A Vercel resolve arquivos estáticos antes dos `rewrites` do vercel.json —
 * este middleware existe só para que o preview local se comporte igual e o
 * HTML pré-renderizado possa ser conferido antes do deploy.
 */
function servePrerendered() {
  return {
    name: 'serve-prerendered-html',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url.split('?')[0]
        if (path.extname(pathname)) return next()

        const file = path.join(server.config.build.outDir, pathname, 'index.html')
        if (!fs.existsSync(file)) return next()

        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(fs.readFileSync(file))
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), servePrerendered()],
})
