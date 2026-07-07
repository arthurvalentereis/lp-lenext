// Extrai os logos de clientes/parceiros da página 5 do PDF (grade 3x4),
// recortando cada card e salvando em /public como cli-*.webp.
import { pdf } from 'pdf-to-img'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const src = path.join(root, 'assets', 'Proposta_comercial_Lenext-UNIPLAST.pdf')
const pubDir = path.join(root, 'public')
const dbgDir = path.join(root, '.pdf-extract')
const scale = 5
const PAGE = 5

// Coordenadas exatas de cada card (frações da página), medidas na página renderizada.
const colLeft = [0.229, 0.413, 0.596]
const rowTop = [0.124, 0.29, 0.456, 0.622]
const cardW = 0.159
const cardH = 0.116
const inset = 0.006

const names = [
  ['dancor', 'centro-oeste', 'satisloh'],
  ['pion-gplus', 'leroy-merlin', 'totvs'],
  ['nomus', 'zona-sul', 'asaas'],
  ['le-leader', 'sankhya', 'sap'],
]

const doc = await pdf(src, { scale })
let i = 0
for await (const page of doc) {
  i++
  if (i !== PAGE) continue
  const meta = await sharp(page).metadata()
  const W = meta.width
  const H = meta.height
  // salva a página inteira p/ conferência
  await sharp(page).toFile(path.join(dbgDir, 'page-05-hi.png'))

  for (let r = 0; r < rowTop.length; r++) {
    for (let c = 0; c < colLeft.length; c++) {
      const left = Math.round((colLeft[c] + inset) * W)
      const top = Math.round((rowTop[r] + inset) * H)
      const width = Math.round((cardW - 2 * inset) * W)
      const height = Math.round((cardH - 2 * inset) * H)
      const name = names[r][c]
      const out = path.join(pubDir, `cli-${name}.webp`)
      await sharp(page)
        .extract({ left, top, width, height })
        .resize({ width: 280, withoutEnlargement: true })
        .webp({ quality: 90 })
        .toFile(out)
      console.log(`cli-${name}.webp  ${width}x${height}`)
    }
  }
}
console.log('OK')
