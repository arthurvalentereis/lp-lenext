/* Também carregado pelo Node em `scripts/prerender.mjs` — manter sem imports
   do Vite e com extensões explícitas se algum dia passar a importar algo. */

/**
 * Categorias do blog — as que o LEITOR vê.
 *
 * Não confundir com a taxonomia editorial interna (`funnel` + `editorial` no
 * frontmatter), que espelha `05-docs/lenext-marketing-docs/api/_categorias.js`
 * e serve ao planejamento de pauta. Aquela responde "que trabalho este post faz
 * no funil"; esta responde "sobre o que este post é". São eixos diferentes:
 * um artigo de Cobrança pode ser topo ou fundo de funil.
 */

export const CATEGORIES = [
  {
    slug: 'politica-de-credito',
    label: { pt: 'Política de Crédito', en: 'Credit Policy' },
    description: {
      pt: 'Como definir, formalizar e executar as regras de concessão.',
      en: 'How to define, formalize and execute credit approval rules.',
    },
  },
  {
    slug: 'cobranca-e-recuperacao',
    label: { pt: 'Cobrança e Recuperação', en: 'Collections & Recovery' },
    description: {
      pt: 'Réguas, acordos, assessorias e a janela em que o dinheiro ainda volta.',
      en: 'Dunning journeys, settlements, agencies and the window when money still comes back.',
    },
  },
  {
    slug: 'mercado-e-tendencias',
    label: { pt: 'Mercado e Tendências', en: 'Market & Trends' },
    description: {
      pt: 'O retrato do setor de crédito e cobrança, com dados e regulação.',
      en: 'The state of the credit and collections industry, with data and regulation.',
    },
  },
  {
    slug: 'automacao-e-ia',
    label: { pt: 'Automação e IA', en: 'Automation & AI' },
    description: {
      pt: 'Motor de decisão, integração com ERP e o que a IA resolve (e o que não).',
      en: 'Decision engines, ERP integration, and what AI does solve (and what it does not).',
    },
  },
  {
    slug: 'gestao-e-indicadores',
    label: { pt: 'Gestão e Indicadores', en: 'Management & Metrics' },
    description: {
      pt: 'KPIs, carteira, DSO e governança da operação de crédito.',
      en: 'KPIs, portfolio, DSO and governance of the credit operation.',
    },
  },
]

const BY_SLUG = new Map(CATEGORIES.map((category) => [category.slug, category]))

export function getCategory(slug) {
  return BY_SLUG.get(String(slug ?? '').trim())
}

/** Rótulo traduzido, com o próprio slug como último recurso. */
export function categoryLabel(slug, lang = 'pt') {
  const category = getCategory(slug)
  if (!category) return slug
  return category.label[lang] ?? category.label.pt
}
