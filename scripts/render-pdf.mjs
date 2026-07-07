// Renderiza cada página do PDF da proposta em PNG para inspeção.
// Uso: node scripts/render-pdf.mjs [scale]
import { pdf } from 'pdf-to-img'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const src = path.join(root, 'assets', 'Proposta_comercial_Lenext-UNIPLAST.pdf')
const outDir = path.join(root, '.pdf-extract')
const scale = Number(process.argv[2] || 2)

await mkdir(outDir, { recursive: true })

const doc = await pdf(src, { scale })
console.log('Total de páginas:', doc.length)

let i = 0
for await (const page of doc) {
  i++
  const out = path.join(outDir, `page-${String(i).padStart(2, '0')}.png`)
  await writeFile(out, page)
  console.log('Gerada', out, `(${(page.length / 1024).toFixed(0)} KB)`)
}
console.log('OK')
