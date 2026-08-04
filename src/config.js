// ===== Configuração de contato e links =====
// EDITE AQUI: troque pelos canais reais da Lenext antes de publicar.
export const config = {
  // WhatsApp do comercial (formato internacional, só dígitos).
  // Usando o telefone de contato informado — confirmar se é o WhatsApp comercial.
  whatsappNumber: '5521975487140',
  whatsappMessage: 'Olá! Vim pela página do LETMESEE e quero falar com um especialista.',

  // Contato (rodapé).
  email: 'contato@lenext.com.br',
  phoneDisplay: '(21) 97548-7140',
  phoneHref: 'tel:+5521975487140',
  address: 'Av. João Cabral de Mello Neto, nº 850, Barra da Tijuca, Rio de Janeiro – RJ',

  // Link do Calendly (opcional) — usado como atalho "prefere já agendar?".
  calendlyUrl: '', // ex: 'https://calendly.com/lenext/consultoria'

  // Endpoint da Vercel Function que envia o lead para contato@lenext.com.br via Resend.
  formEndpoint: '/api/contact',
}

export const whatsappLink = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
  config.whatsappMessage,
)}`

// Gera o link do WhatsApp com a mensagem no idioma ativo (i18n).
export function buildWhatsappLink(message) {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`
}
