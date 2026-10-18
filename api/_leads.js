/**
 * Grava quem preencheu um formulário da LP em `leads` + `eventos_lead`
 * (Supabase, projeto lenext-marketing; schema na migration
 * 20260821090000_marketing_leads_e_estrategia.sql do hub).
 *
 * Relação com `lp_eventos`: aquela tabela é anônima de propósito e continua
 * sendo a fonte do COMPORTAMENTO (inclusive das conversões lead_*). Aqui fica
 * a IDENTIDADE, com a base legal do próprio formulário. As duas não se ligam
 * por sessão — ligar desfaria o anonimato de lp_eventos. O elo com o e-mail
 * de origem é o utm_content, guardado nos dois lados.
 *
 * Primeira conversão manda: origem, página e UTMs do lead são da primeira
 * vez. As seguintes viram só uma linha nova em eventos_lead.
 */
import { supabase, texto } from './_supabase.js';

/** Formulário da LP → origem do lead e tipo do evento (checks da migration). */
const POR_FORMULARIO = {
  demo: { origem: 'demo', tipo: 'captura' },
  ebook: { origem: 'ebook', tipo: 'download-ebook' },
  prompt: { origem: 'prompt', tipo: 'download-prompt' },
  newsletter: { origem: 'newsletter', tipo: 'newsletter' },
  lead: { origem: 'outro', tipo: 'captura' },
};

/** Página sem query string: os UTMs já vão em colunas próprias. */
function paginaSemQuery(valor) {
  const bruto = texto(valor, 1000);
  if (!bruto) return null;
  try {
    const url = new URL(bruto);
    return `${url.origin}${url.pathname}`.slice(0, 300);
  } catch {
    return null;
  }
}

/**
 * @param {{
 *   form: string, name: string, email: string, company?: string, phone?: string,
 *   consent: boolean, page?: string, locale?: string, eventId?: string,
 *   utm?: { source?: string, medium?: string, campaign?: string, content?: string, term?: string },
 * }} lead
 * @returns {Promise<{ leadId: string, novo: boolean }>}
 */
export async function registrarLead(lead) {
  const mapa = POR_FORMULARIO[lead.form] || POR_FORMULARIO.lead;
  const utm = lead.utm && typeof lead.utm === 'object' ? lead.utm : {};
  const pagina = paginaSemQuery(lead.page);
  const utms = {
    utm_source: texto(utm.source, 100),
    utm_medium: texto(utm.medium, 100),
    utm_campaign: texto(utm.campaign, 100),
  };
  const agora = new Date().toISOString();
  const email = lead.email;

  // Insere só se o e-mail é novo; se já existe, a linha antiga fica intacta.
  const criados = await supabase('leads?on_conflict=email&select=id', {
    method: 'POST',
    prefer: 'resolution=ignore-duplicates,return=representation',
    body: [
      {
        email,
        nome: texto(lead.name, 200),
        empresa: texto(lead.company, 200),
        telefone: texto(lead.phone, 50),
        origem: mapa.origem,
        pagina,
        ...utms,
        utm_content: texto(utm.content, 100),
        utm_term: texto(utm.term, 100),
        consentimento: Boolean(lead.consent),
        consentimento_em: lead.consent ? agora : null,
      },
    ],
  });

  let leadId = criados?.[0]?.id;
  const novo = Boolean(leadId);

  if (!novo) {
    const existentes = await supabase(
      `leads?email=eq.${encodeURIComponent(email)}&select=id,consentimento`
    );
    const existente = existentes?.[0];
    if (!existente) throw new Error('Lead não encontrado após conflito de e-mail.');
    leadId = existente.id;

    // Completa o cadastro sem apagar o que já havia; consentimento só sobe.
    const atualizar = {};
    if (texto(lead.name, 200)) atualizar.nome = texto(lead.name, 200);
    if (texto(lead.company, 200)) atualizar.empresa = texto(lead.company, 200);
    if (texto(lead.phone, 50)) atualizar.telefone = texto(lead.phone, 50);
    if (lead.consent && !existente.consentimento) {
      atualizar.consentimento = true;
      atualizar.consentimento_em = agora;
    }
    if (Object.keys(atualizar).length > 0) {
      await supabase(`leads?id=eq.${leadId}`, {
        method: 'PATCH',
        body: atualizar,
        prefer: 'return=minimal',
      });
    }
  }

  await supabase('eventos_lead', {
    method: 'POST',
    prefer: 'return=minimal',
    body: {
      lead_id: leadId,
      tipo: mapa.tipo,
      origem: texto(lead.form, 40),
      pagina,
      ...utms,
      // Sem coluna própria em eventos_lead: o utm_content (código do e-mail)
      // é o que liga a conversão à campanha, então vai no detalhe.
      detalhe: {
        utm_content: texto(utm.content, 100),
        utm_term: texto(utm.term, 100),
        locale: texto(lead.locale, 10),
        event_id: texto(lead.eventId, 100),
      },
      ocorrido_em: agora,
    },
  });

  return { leadId, novo };
}
