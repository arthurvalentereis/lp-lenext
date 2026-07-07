# Análise de conversão — LP LETMESEE (lp-lenext-v2)

> Revisão feita em 06/07/2026, com base no guia interno `landing-page-conversao`
> (benchmark Clicksign, Pipefy, Gyra+, Datacrazy e Helena CRM).
>
> **Veredito geral:** a base está muito boa — a página segue quase todo o playbook
> de conversão. Os bloqueadores são operacionais (formulário e WhatsApp), não de copy.

---

## ✅ Pontos fortes (manter)

| Ponto | Onde | Por que funciona |
|---|---|---|
| Headline com promessa + dor específica | `Hero.jsx` — "Venda mais a prazo, sem medo de calote" | Diz o que faz e ataca o medo real do público em < 5s |
| Números acima da dobra | Hero — "até 57%", "+150 empresas", "R$ 7,5 bi+" | Métrica concreta persuade mais que adjetivo |
| CTA primário único e repetido | "Falar com um consultor" no Header, Hero, ProblemSolution, CreditEngine, Pricing e ContactCTA | Uma única próxima ação, sem CTAs concorrentes |
| Redução de risco declarada | "Resposta em até 1 dia útil • Sem compromisso" (Hero e Pricing) | Elimina o medo do primeiro passo |
| Um público, uma promessa | Toda a página fala com o decisor de PME que vende a prazo | Não dilui a mensagem |
| Prova social alinhada à objeção | `Security.jsx` — ISO 27001, LGPD, parcerias oficiais | Segurança de dados é a objeção certa para crédito |
| FAQ cobrindo medos reais | `FAQ.jsx` — time técnico, proteção de dados, integrações, setor | Quebra objeções antes do CTA final |
| Visual = produto real | Print do painel no hero (`BrowserFrame`) + carrossel de telas reais | Não é imagem genérica de banco de imagens |
| Sequência clássica de persuasão | Promessa → Prova → Motor → Benefícios → Objeções → CTA final | Estrutura correta do App.jsx |
| Acessibilidade de movimento | `index.css` trata `prefers-reduced-motion` | Detalhe raro de ver bem feito |
| Copy dor → ganho | `ProblemSolution.jsx` — "Hoje" vs "Com o LETMESEE" | Contraste tangível, com números |

---

## 🔴 Bloqueadores — a página não captura leads hoje

### 1. Formulário não envia para lugar nenhum
- **Onde:** `src/components/ContactCTA.jsx` (linha ~8) e `src/config.js`
- **Problema:** `handleSubmit` só faz `setSent(true)`. O lead vê "Recebemos seu
  contato!", mas nada é gravado. `config.formEndpoint` está vazio.
- **Ação:** integrar com CRM/automação (endpoint, webhook ou serviço de forms).
  Todo o funil da página termina num no-op sem isso.

### 2. WhatsApp com número placeholder
- **Onde:** `src/config.js` — `whatsappNumber: '5500000000000'`
- **Problema:** botão flutuante, atalho "chame no WhatsApp" e link da seção de
  contato levam a um número inexistente. `calendlyUrl` também está vazio
  (o botão "Prefere já agendar?" nem aparece).
- **Ação:** colocar o número real do comercial e, se houver, o link do Calendly.

---

## 🟠 Alto impacto na conversão

### 3. Depoimentos anônimos são prova social fraca
- **Onde:** `src/components/Testimonials.jsx` (a nota no código já reconhece que são rascunhos)
- **Problema:** "Diretor Financeiro, indústria óptica de médio porte" não
  tranquiliza; nenhum dos três traz número ("cortamos drasticamente" em vez de "cortamos 80%").
- **Ação:** conseguir 1–2 depoimentos reais com nome, empresa e métrica.
  Um depoimento real vale mais que três genéricos.

### 4. Logos mais fortes estão enterrados
- **Onde:** `IntegrationsBar.jsx` (logo após o hero, mostra *integrações*: Serasa, Quod…)
  vs `ClientLogos.jsx` (9ª seção, mostra *clientes*: Leroy Merlin, TOTVS, SAP, Zona Sul)
- **Problema:** o empréstimo de credibilidade ("se a Leroy Merlin confia, eu posso
  confiar") deveria estar perto do topo; birôs são infraestrutura, não prova social.
- **Ação:** mover os logos de clientes para logo após o hero; descer a faixa de
  birôs para perto da seção de integrações.
- **Atenção:** se SAP/TOTVS/Sankhya forem *parceiros* e não clientes, não misturar
  nas duas listas — mina credibilidade se questionado.

### 5. FAQ não responde a objeção nº 1: preço
- **Onde:** `FAQ.jsx` + `Pricing.jsx` ("Sob consulta")
- **Problema:** não há pergunta "Quanto custa?". A resposta sobre implementação
  também é vaga ("fale com um consultor").
- **Ação:** ancorar preço no FAQ ("planos a partir de X" ou "uma fração do custo
  de consultas avulsas — diagnóstico gratuito") e dar um prazo médio de
  implementação, mesmo conservador ("em média N dias").

### 6. Falta a seção "Como funciona" em 3 passos
- **Problema:** o visitante pula do problema direto para motor de crédito /
  integrações, que são seções densas. Para PME sem time técnico, a percepção de
  complexidade é objeção.
- **Ação:** bloco enxuto — "1. Conecte seus dados → 2. Configure sua política →
  3. Aprove em minutos" — entre ProblemSolution/Results e CreditEngine.

---

## 🟡 Refinamentos

### 7. Página longa com sobreposição de seções
- **Onde:** `Benefits.jsx` (7 cards) repete conteúdo do `CreditEngine`
  ("Automação 100% personalizada", "Rastreabilidade") e do `IntegrationFlow`
  ("Todas as fontes num lugar só"). São 13 seções no total.
- **Ação:** enxugar Benefits para 4–5 cards que não dupliquem o que já foi mostrado.

### 8. Stat "2022 no mercado" pode jogar contra
- **Onde:** `Results.jsx` — "no mercado de risco e crédito desde 2022"
- **Problema:** evidencia juventude da empresa; para o C-level conservador é
  objeção, não prova.
- **Ação:** trocar por outro número (volume de consultas/mês, decisões
  automatizadas) ou remover.

### 9. Formulário com 4 campos obrigatórios
- **Onde:** `ContactCTA.jsx` — nome, empresa, e-mail e WhatsApp, todos `required`
- **Ação:** cada campo custa conversão; e-mail corporativo já qualifica.
  Tornar telefone ou e-mail opcional.

### 10. SEO / performance
- **Onde:** `index.html`
- Falta `og:image` e `og:url` — compartilhamento no WhatsApp/LinkedIn sai sem
  imagem (irônico para uma LP que vive de WhatsApp).
- Falta `<link rel="canonical">`.
- Google Fonts carrega 6 pesos da Inter (400–900) de forma render-blocking —
  reduzir para 3–4 pesos e/ou self-host melhora o LCP do hero.

### 11. Animação de reveal reversível
- **Onde:** `App.jsx` — `classList.toggle('is-visible', entry.isIntersecting)`
- **Problema:** elementos "desanimam" ao sair da viewport; quem rola para cima vê
  tudo re-animando. Ruído numa página que vende decisão sem fricção.
- **Ação:** animar apenas uma vez (`io.unobserve(entry.target)` após visível).

---

## Resumo de prioridades

| Prioridade | Ação |
|---|---|
| **Agora** | Integrar formulário a endpoint/CRM · número real de WhatsApp |
| **Antes de publicar** | Depoimentos reais com nome e métrica · logos de clientes perto do hero |
| **Alta** | FAQ de preço/prazo · seção "Como funciona" em 3 passos |
| **Média** | Enxugar Benefits · revisar stat 2022 · campos do form · og:image/canonical · pesos de fonte · reveal animar só 1x |

## Checklist de revisão rápida (estado atual)

- [x] Headline diz o que o produto faz em < 5 segundos
- [x] Pelo menos 1 número concreto acima da dobra
- [x] Um público, uma promessa
- [x] CTA primário único e repetido em cada seção
- [x] Primeiro passo de baixo risco (sem compromisso)
- [x] Prova social ataca a principal objeção (segurança)
- [ ] Logos reconhecíveis perto do topo (clientes estão na 9ª seção)
- [x] Features traduzidas em benefício
- [ ] FAQ responde os medos reais de compra (falta preço/prazo)
- [x] CTA final repete a promessa
- [ ] **Formulário captura leads de verdade** ← bloqueador
- [ ] **WhatsApp com número real** ← bloqueador
