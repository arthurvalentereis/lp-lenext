// ===== Configuração de contato e links =====
// EDITE AQUI: troque pelos canais reais da Lenext antes de publicar.
export const config = {
  // WhatsApp do comercial (formato internacional, só dígitos).
  whatsappNumber: '5500000000000',
  whatsappMessage: 'Olá! Vim pela página do LETMESEE e quero falar com um consultor.',

  // E-mail comercial (aparece no rodapé).
  email: 'comercial@lenext.com.br',

  // Link do Calendly (opcional) — usado como atalho "prefere já agendar?".
  calendlyUrl: '', // ex: 'https://calendly.com/lenext/consultoria'

  // Para onde o formulário envia (endpoint). Por enquanto faz scroll/no-op.
  // Integre depois com seu CRM/automação.
  formEndpoint: '',
}

export const whatsappLink = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
  config.whatsappMessage,
)}`
