# Guia editorial do blog Lenext

> Como publicar um artigo novo, o que ele precisa ter e o que não pode ter.
> Fontes de posicionamento: `05-docs/lenext-marketing-docs/lenext-marketing-docs/01-marca/Marca e DNA da Empresa.md`,
> `.../02-conteudo-marketing/estrategia-de-conteudo/02-estrategia-padroes-visuais.md`
> e o briefing codificado em `05-docs/lenext-marketing-docs/api/_prompts-email-ia.js`.

---

## 1. Publicar um artigo em 5 passos

1. Copie `src/content/posts/_TEMPLATE.md` para `src/content/posts/pt/<slug>.md`.
   **O nome do arquivo é a URL** (`/blog/<slug>`).
2. Preencha o frontmatter (referência na seção 3).
3. Escreva o corpo em Markdown. Títulos `##` e `###` viram o sumário automaticamente.
4. Se houver versão em inglês, repita em `src/content/posts/en/<slug-em-ingles>.md`
   com o **mesmo `translationOf`** — é isso que liga os dois idiomas no `hreflang`
   e no seletor de idioma.
5. Gere a capa (seção 6) e rode `npm run build`. Nada mais precisa ser tocado:
   nem rota, nem componente, nem dicionário de tradução.

Não existe passo de cadastro em lista: `src/content/index.js` varre
`src/content/posts/<lang>/*.md` com `import.meta.glob` e o
`scripts/prerender.mjs` faz o mesmo pelo disco.

---

## 2. O que torna um artigo publicável

### O arco obrigatório

É o mesmo dos e-mails da casa, e não é opcional:

- **Começo** — um fato concreto, com fonte, na primeira frase. Sem aquecimento
  genérico, sem definição de dicionário.
- **Meio** — a consequência prática na operação do leitor: por que dói, onde o
  dinheiro vaza. Só então a ponte para o que a Lenext resolve. A ponte é
  consequência do que veio antes, não um anúncio colado no meio do texto.
- **Fim** — uma pergunta em negrito que devolve o tema à operação do leitor,
  seguida de **um único** CTA.

### Os seis mecanismos

1. Abrir pelo custo da inação, não por definição.
2. Um framework nomeado (os 7 Pilares, os 6 Cs, os 7 KPIs) — memorável e citável.
3. Prova externa com link em cada bloco.
4. Utilidade imediata: tabela, checklist ou matriz que o leitor copia e usa.
5. Pergunta-espelho que o leitor não consegue responder confortavelmente.
6. Curva de tensão: problema → método → escala → ferramenta.

### Tom

Direto, B2B brasileiro, de financeiro para financeiro. Frases curtas. Nenhum
parágrafo com mais de três linhas. Falar **com** o gestor (perguntas diretas),
não sobre ele. Termo técnico (SCR, PDD, alçada, DSO) é bem-vindo, mas explicado
na primeira ocorrência.

### Proibido

- Jargão de marketing: "alavancar", "disruptivo", "revolucionar", "solução completa".
- Emoji no corpo do artigo.
- Número sem fonte, ou número fora da lista autorizada (seção 4).
- Nome de cliente real. Os clientes citados na documentação interna
  **não podem** aparecer em material público.
- Promessa de ROI que o texto não sustenta.
- Título criativo que não diz do que o artigo trata.

---

## 3. Referência do frontmatter

| Campo | Obrigatório | O que é |
|---|---|---|
| `slug` | sim | Identificador na URL. Igual ao nome do arquivo. |
| `lang` | sim | `pt` ou `en`. Precisa bater com a pasta. |
| `title` | sim | Título exibido no artigo. Promessa específica, não slogan. |
| `seoTitle` | não | Título da aba e do Google. Sem ele, usa `title`. |
| `description` | sim | Vira a meta description e o subtítulo do artigo. |
| `excerpt` | não | Resumo no card do índice. Sem ele, usa `description`. |
| `category` | sim | Slug de `src/content/categories.js` (seção 5). |
| `funnel` | não | `topo` / `meio` / `fundo` / `pos-venda`. Só planejamento. |
| `editorial` | não | Categoria editorial interna (seção 5). Só planejamento. |
| `tags` | não | Lista. Entram como `keywords` no JSON-LD. |
| `author` / `authorRole` | não | Padrão: "Equipe Lenext". |
| `date` | sim | `AAAA-MM-DD`. Ordena o índice. |
| `updated` | não | Data da última revisão. Sem ela, usa `date`. |
| `cover` / `coverAlt` | sim | Caminho em `/blog/*.webp` e texto alternativo. A capa também é a `og:image`. |
| `featured` | não | `true` destaca o post no topo do índice. Um por idioma. |
| `translationOf` | sim quando houver par | Chave comum entre as versões PT e EN. |
| `cta` | não | `{ type: ebook \| demo, href: ... }`. Padrão: e-book. |
| `related` | não | Slugs sugeridos no rodapé. O resto completa pela categoria. |

Atenção ao parser: **comentário só em linha própria**. Um `#` no fim de uma
linha de valor faz parte do valor (o parser é enxuto de propósito, para não
carregar um YAML completo no bundle — ver `src/lib/markdown.js`).

---

## 4. Números que podem ser citados

Lista fechada, herdada do briefing oficial da marca. **Não invente outros.**

| Número | O que afirma |
|---|---|
| até **64%** | redução no custo por cliente aprovado ao reordenar a esteira em cascata |
| até **60%** | redução nos custos de análise com automação |
| até **85%** | do gasto com bureau consumido por CNPJs que nunca seriam aprovados (esteira com ~15% de aprovação) |
| **82% / 50%** | recuperação de dívida B2B até o 10º dia vs. depois do 20º |
| **~3 semanas** | fila típica de TI para ajustar política de crédito no ERP |

Dados externos (Serasa Experian, Banco Central, Qive, McKinsey, Gartner,
Poder360) podem ser usados **sempre com link para a fonte**. Ver o banco de
dados em `05-docs/.../estrategia-de-conteudo/04-referencias.md`.

Números que **não** estão autorizados e por isso não aparecem nos artigos:
os 57% de redução de inadimplência, R$ 7,5 bi analisados, +150 empresas e o
selo ISO 27001 usados na landing page. Eles não constam da lista oficial —
antes de usá-los em conteúdo, é preciso validar origem e data.

Não citar percentual de uptime em material externo.

---

## 5. Taxonomias

São duas, de propósito. `category` responde "sobre o que é"; `funnel` +
`editorial` respondem "que trabalho isto faz".

### Categorias visíveis ao leitor (`src/content/categories.js`)

`politica-de-credito` · `cobranca-e-recuperacao` · `mercado-e-tendencias` ·
`automacao-e-ia` · `gestao-e-indicadores`

Só aparecem no filtro do índice as categorias que já têm post publicado.

### Taxonomia editorial interna

Espelha `05-docs/lenext-marketing-docs/api/_categorias.js`, que é a fonte
única usada também pelo e-mail marketing. Slugs: `viral`, `educativo`,
`autoridade`, `dor`, `solucao`, `transformacao`, `prova-social`,
`relacionamento`, `objecoes`, `oferta`, `tendencias`, `comunidade`.

Regra de mix: **só topo não vende, só fundo cansa a base.** Ao planejar o mês,
alterne as etapas.

---

## 6. Capas

`node scripts/make-blog-covers.mjs` gera as capas em `public/blog/*.webp`
(1200×630, tamanho de Open Graph) a partir das definições no próprio script.
Para uma capa nova, adicione uma entrada em `COVERS` e rode de novo.

Por que capas geradas e não banco de imagens: o guia visual da marca prioriza
composições próprias e desaconselha foto genérica de negócios, que enfraquece a
percepção técnica. Mockup de produto entra só quando o artigo é sobre o produto.

O WebP precisa existir: scrapers de link (WhatsApp, LinkedIn) não renderizam SVG.

---

## 7. SEO — o que acontece automaticamente

`npm run build` roda o `vite build` e, em seguida, o `scripts/prerender.mjs`,
que grava um HTML estático por rota do blog com título, descrição, Open Graph,
Twitter Card, canonical, `hreflang` recíproco e JSON-LD (`BlogPosting` +
`BreadcrumbList`), além do texto do artigo dentro de `#root`. Também gera
`sitemap.xml` e `robots.txt`.

Isso existe porque o site é uma SPA de um único `index.html`: sem o prerender,
todo post compartilharia o título e a imagem da landing page.

O que **você** precisa fazer para o SEO funcionar: `description` boa (uma frase
que diz o que o leitor leva), `cover` presente e `date` correta.

---

## 8. Backlog de pautas

Derivado do e-book *Política de Crédito na Prática* e do mapa de conteúdo em
`05-docs/.../estrategia-de-conteudo/03-mapa-de-conteudo.md`.

**Política de Crédito**
- Apetite de risco: como transformar "queremos crescer com segurança" em número
- Esteira em cascata: a ordem das consultas e o custo por cliente aprovado
- Matriz de alçadas: quem aprova o quê, e como impedir o fracionamento
- Exceção em crédito: como aprovar fora da regra sem corromper a política
- Grupo econômico: por que cinco limites seguros viram uma exposição perigosa
- Backtesting de política: rodar a régua nova sobre 24 meses antes de publicar

**Cobrança e Recuperação**
- Política de acordo: desconto, juros e parcelamento com alçada
- Quebra de acordo: o que fazer no segundo (e no terceiro)
- Assessorias: como medir qual recupera mais sobre carteiras equivalentes
- Higienização cadastral: a base legal que o compliance vai perguntar
- Cobrança preventiva: o bloco D-7 a D+3 e por que é o que mais paga

**Automação e IA**
- Motor de decisão: o que é straight-through processing na prática
- Leitura de balanço e DRE por IA: onde acelera e onde ainda precisa de gente
- Explicabilidade: por que decisão que ninguém justifica não passa em auditoria
- Integração com ERP: por que a fila de TI mata projeto de crédito

**Gestão e Indicadores**
- Custo por cliente aprovado: como calcular o KPI que quase ninguém mede
- Inadimplência por safra: ler a qualidade de cada mês de concessão
- DSO: comparar com a própria política de prazo, não com o mercado
- Os 7 KPIs na pauta mensal do comitê de crédito

**Mercado e Tendências**
- Open Finance PJ: o que já dá para usar em decisão de crédito
- Fraude documental e identidade sintética na concessão B2B
- O que muda na cobrança com Pix Automático

---

## 9. Antes de publicar — checklist

- [ ] A primeira frase entrega um fato concreto com fonte?
- [ ] Todo número tem fonte linkada ou está na lista autorizada?
- [ ] Nenhum número da LP ainda não validado (57%, R$ 7,5 bi, +150, ISO) no corpo?
- [ ] O artigo tem pelo menos uma tabela, checklist ou matriz copiável?
- [ ] Fecha com pergunta em negrito + **um** CTA?
- [ ] Nenhum nome de cliente real?
- [ ] Zero jargão de marketing e zero emoji?
- [ ] `description` diz o que o leitor leva daqui?
- [ ] Capa gerada e `coverAlt` descritivo preenchido?
- [ ] Se houver versão EN, os dois arquivos têm o mesmo `translationOf`?
- [ ] `npm run build` roda sem erro e o post aparece no `dist/sitemap.xml`?
