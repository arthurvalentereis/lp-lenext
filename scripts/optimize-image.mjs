// Otimiza uma imagem para a web (WebP) em /public.
// Uso: node scripts/optimize-image.mjs <entrada> <nome-saida> [largura]
// Ex.: node scripts/optimize-image.mjs assets/painel-credito.png painel-credito 1600
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const [input, name = 'imagem', width = '1600'] = process.argv.slice(2)

if (!input) {
  console.error('Informe o caminho da imagem de entrada.')
  process.exit(1)
}

const src = path.isAbsolute(input) ? input : path.join(root, input)
const out = path.join(root, 'public', `${name}.webp`)

const info = await sharp(src)
  .resize({ width: Number(width), withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile(out)

console.log(`OK → public/${name}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`)
