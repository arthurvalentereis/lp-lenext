// Renderiza páginas-alvo do PDF em alta resolução, recorta a região do mockup
// (dispositivo + screenshot do sistema) e gera versões web otimizadas em /public.
// Mantém também os recortes full-res em .pdf-extract/ para conferência.
import { pdf } from 'pdf-to-img'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const src = path.join(root, 'assets', 'Proposta_comercial_Lenext-UNIPLAST.pdf')
const outDir = path.join(root, '.pdf-extract')
const pubDir = path.join(root, 'public')
const scale = 5

// Recortes como frações (left, top, width, height) da página.
const crops = {
  10: { l: 0.03, t: 0.05, w: 0.58, h: 0.84, name: 'crop-10', web: 'product-hero', width: 1500 },
  11: { l: 0.075, t: 0.06, w: 0.545, h: 0.76, name: 'crop-11', web: 'product-cobranca', width: 1600 },
  12: { l: 0.385, t: 0.08, w: 0.605, h: 0.82, name: 'crop-12', web: 'product-recebiveis', width: 1600 },
}

const want = new Set(Object.keys(crops).map(Number))
const doc = await pdf(src, { scale })

let i = 0
for await (const page of doc) {
  i++
  if (!want.has(i)) continue
  const c = crops[i]
  const meta = await sharp(page).metadata()
  const left = Math.round(meta.width * c.l)
  const top = Math.round(meta.height * c.t)
  const width = Math.min(Math.round(meta.width * c.w), meta.width - left)
  const height = Math.min(Math.round(meta.height * c.h), meta.height - top)

  const cropped = sharp(page).extract({ left, top, width, height })

  const fullOut = path.join(outDir, `${c.name}.png`)
  await cropped.clone().toFile(fullOut)

  const webOut = path.join(pubDir, `${c.web}.webp`)
  const info = await cropped
    .clone()
    .resize({ width: c.width })
    .webp({ quality: 82 })
    .toFile(webOut)
  console.log(`page ${i} → ${c.web}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`)
}
console.log('OK')
