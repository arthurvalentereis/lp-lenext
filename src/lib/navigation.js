/**
 * Itens do menu principal — todos âncoras da home.
 *
 * Antes, `Header.jsx` mantinha um array local de hrefs acoplado por ÍNDICE ao
 * `t.header.nav`. Mexer em um dos lados quebrava o pareamento em silêncio.
 * Aqui a ordem é declarada uma vez e os rótulos vêm na mesma ordem do i18n.
 *
 * O blog fica fora do header por decisão editorial: o acesso é pelo rodapé.
 */
export const NAV_ITEMS = [
  { key: 'solucao', hash: '#solucao' },
  { key: 'resultados', hash: '#resultados' },
  { key: 'funcionalidades', hash: '#funcionalidades' },
  { key: 'seguranca', hash: '#seguranca' },
  { key: 'planos', hash: '#planos' },
]
