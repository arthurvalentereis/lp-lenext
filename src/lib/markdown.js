/**
 * Pipeline de Markdown do blog.
 *
 * Módulo PURO de propósito: não usa nenhuma API do Vite (`import.meta.glob`,
 * `?raw`) nem do navegador. Isso permite que o mesmo código rode no app e no
 * `scripts/prerender.mjs`, que lê os arquivos do disco com `fs` — se o parser
 * divergisse entre os dois, o HTML pré-renderizado sairia diferente do que o
 * React monta.
 */

import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: false })

/* ------------------------------------------------------------------ *
 * Frontmatter
 * ------------------------------------------------------------------ */

// Parser enxuto de propósito: um YAML completo (js-yaml) custaria ~40 kB no
// bundle para ler ~15 chaves. Suporta o que o frontmatter do blog usa:
// escalares, arrays inline e em bloco, e objetos inline de um nível.
// Comentários só em linha própria (`# ...`) — não há suporte a comentário no
// fim da linha, senão um valor com `#` (cor, âncora) seria truncado.

function parseScalar(raw) {
  const value = raw.trim()
  if (value === '') return ''
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'null') return null
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value)
  return value
}

// Quebra "a, b, [c]" respeitando colchetes/chaves aninhados e aspas.
function splitTopLevel(input, separator = ',') {
  const parts = []
  let depth = 0
  let quote = null
  let current = ''

  for (const char of input) {
    if (quote) {
      current += char
      if (char === quote) quote = null
      continue
    }
    if (char === '"' || char === "'") {
      quote = char
      current += char
      continue
    }
    if (char === '[' || char === '{') depth += 1
    if (char === ']' || char === '}') depth -= 1
    if (char === separator && depth === 0) {
      parts.push(current)
      current = ''
      continue
    }
    current += char
  }
  parts.push(current)

  return parts.map((part) => part.trim()).filter((part) => part !== '')
}

function parseValue(raw) {
  const value = raw.trim()

  if (value.startsWith('[') && value.endsWith(']')) {
    return splitTopLevel(value.slice(1, -1)).map(parseValue)
  }

  if (value.startsWith('{') && value.endsWith('}')) {
    const obj = {}
    for (const entry of splitTopLevel(value.slice(1, -1))) {
      const colon = entry.indexOf(':')
      if (colon === -1) continue
      obj[entry.slice(0, colon).trim()] = parseValue(entry.slice(colon + 1))
    }
    return obj
  }

  return parseScalar(value)
}

/**
 * Separa frontmatter e corpo de um arquivo `.md`.
 *
 * @param {string} source conteúdo bruto do arquivo
 * @returns {{ data: Record<string, unknown>, content: string }}
 */
export function parseFrontmatter(source) {
  const normalized = String(source ?? '').replace(/^﻿/, '').replace(/\r\n/g, '\n')
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(normalized)
  if (!match) return { data: {}, content: normalized }

  const data = {}
  const lines = match[1].split('\n')
  let currentKey = null

  for (const line of lines) {
    if (line.trim() === '' || line.trimStart().startsWith('#')) continue

    // Item de array em bloco: "  - valor"
    const listItem = /^\s+-\s+(.*)$/.exec(line)
    if (listItem && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = []
      data[currentKey].push(parseValue(listItem[1]))
      continue
    }

    const colon = line.indexOf(':')
    if (colon === -1) continue

    const key = line.slice(0, colon).trim()
    const rest = line.slice(colon + 1).trim()
    currentKey = key
    // "key:" sozinho abre um array em bloco; os itens chegam nas linhas seguintes.
    data[key] = rest === '' ? [] : parseValue(rest)
  }

  return { data, content: normalized.slice(match[0].length) }
}

/* ------------------------------------------------------------------ *
 * Corpo do artigo
 * ------------------------------------------------------------------ */

/** Texto → slug de âncora (sem acento, sem pontuação). */
export function slugify(text) {
  return String(text)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

/**
 * Converte o corpo em HTML e extrai o sumário.
 *
 * As âncoras são adicionadas depois da conversão (e não via renderer do
 * `marked`) porque a assinatura do renderer muda entre versões maiores da
 * biblioteca; pós-processar o HTML mantém isto estável em upgrades.
 *
 * @returns {{ html: string, toc: {id: string, text: string, level: number}[] }}
 */
export function renderMarkdown(content) {
  const raw = marked.parse(String(content ?? ''))
  const toc = []
  const used = new Map()

  // Fonte externa abre em nova aba: o leitor está no meio de um artigo longo
  // e perder a posição para conferir um dado é atrito desnecessário.
  const withLinks = raw.replace(
    /<a href="(https?:\/\/[^"]+)"/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"',
  )

  // Tabelas rolam dentro do próprio container (ver `.table-scroll` em
  // index.css) — sem isto, uma matriz de alçadas empurra a página inteira na
  // horizontal no celular.
  const withTables = withLinks.replace(
    /<table>[\s\S]*?<\/table>/g,
    (table) => `<div class="table-scroll">${table}</div>`,
  )

  const html = withTables.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g, (full, level, attrs, inner) => {
    if (/\sid=/.test(attrs)) return full

    const text = stripTags(inner)
    const base = slugify(text) || `secao-${toc.length + 1}`
    // Dois títulos iguais no mesmo artigo gerariam âncoras duplicadas.
    const seen = used.get(base) ?? 0
    used.set(base, seen + 1)
    const id = seen === 0 ? base : `${base}-${seen + 1}`

    toc.push({ id, text, level: Number(level) })
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
  })

  return { html, toc }
}

/** Tempo de leitura em minutos (200 palavras/min, mínimo 1). */
export function readingTime(content) {
  const words = stripTags(String(content ?? ''))
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
