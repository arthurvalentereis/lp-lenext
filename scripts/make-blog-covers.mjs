/**
 * Gera as capas dos posts do blog em WebP (1200×630, tamanho de Open Graph).
 *
 *   node scripts/make-blog-covers.mjs
 *
 * Roda sob demanda, como os demais scripts desta pasta — a saída é commitada
 * em `public/blog/`. Não entra no `npm run build` porque a capa muda muito
 * menos que o código, e rasterizar em todo deploy seria desperdício.
 *
 * Por que capas geradas em vez de banco de imagens: o guia de conteúdo da
 * marca prioriza diagramas e composições próprias e desaconselha foto
 * genérica de negócios, que enfraquece a percepção técnica. Aqui a capa é
 * tipográfica, com o gradiente roxo→laranja da marca.
 *
 * O WebP tem que existir: scrapers de link (WhatsApp, LinkedIn) não renderizam
 * SVG, e a capa também é a `og:image` do post.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'blog')

const PURPLE = '#5901b1'
const ORANGE = '#ff6600'
const INK = '#171226'

const COVERS = [
  {
    file: 'politica-de-credito',
    eyebrow: 'POLÍTICA DE CRÉDITO',
    lines: ['Escalar vendas', 'a prazo sem escalar', 'a inadimplência'],
    stat: '77%',
    statLabel: 'das transações B2B no\nBrasil são a prazo',
  },
  {
    file: 'regua-de-cobranca',
    eyebrow: 'COBRANÇA E RECUPERAÇÃO',
    lines: ['A régua que cobra', '100% da carteira', 'desde o 1º dia'],
    stat: '82%',
    statLabel: 'das dívidas B2B recuperadas\naté o 10º dia de atraso',
  },
  {
    file: 'setor-credito-cobranca',
    eyebrow: 'MERCADO E TENDÊNCIAS',
    lines: ['Crédito e cobrança', 'no Brasil: 7 desafios', 'que travam a operação'],
    stat: '9 mi',
    statLabel: 'de CNPJs inadimplentes\nno Brasil',
  },
]

const FONT = "'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif"

function svgFor({ eyebrow, lines, stat, statLabel }) {
  const title = lines
    .map((line, index) => `<tspan x="80" dy="${index === 0 ? 0 : 68}">${escapeXml(line)}</tspan>`)
    .join('')

  const label = statLabel
    .split('\n')
    .map((line, index) => `<tspan x="1120" dy="${index === 0 ? 0 : 26}">${escapeXml(line)}</tspan>`)
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PURPLE}"/>
      <stop offset="100%" stop-color="${ORANGE}"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PURPLE}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${ORANGE}" stop-opacity="0.05"/>
    </linearGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0v44" fill="none" stroke="${PURPLE}" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1140" cy="70" r="360" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#brand)"/>

  <text x="80" y="118" font-family="${FONT}" font-size="20" font-weight="700"
        letter-spacing="3" fill="${ORANGE}">${escapeXml(eyebrow)}</text>

  <text y="230" font-family="${FONT}" font-size="58" font-weight="800"
        fill="${INK}" letter-spacing="-1">${title}</text>

  <g>
    <text x="1120" y="470" text-anchor="end" font-family="${FONT}" font-size="96"
          font-weight="800" fill="url(#brand)">${escapeXml(stat)}</text>
    <text x="1120" y="510" text-anchor="end" font-family="${FONT}" font-size="20"
          fill="#5a5570">${label}</text>
  </g>

  <text x="80" y="552" font-family="${FONT}" font-size="26" font-weight="800"
        fill="${INK}" letter-spacing="1">LENE<tspan fill="${ORANGE}">X</tspan>T</text>
  <text x="80" y="575" font-family="${FONT}" font-size="12" font-weight="600"
        letter-spacing="4" fill="#5a5570">TECHNOLOGY</text>
</svg>`
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })

  for (const cover of COVERS) {
    const target = path.join(outDir, `${cover.file}.webp`)
    await sharp(Buffer.from(svgFor(cover))).webp({ quality: 88 }).toFile(target)
    console.log(`capa gerada: public/blog/${cover.file}.webp`)
  }
}

main()
