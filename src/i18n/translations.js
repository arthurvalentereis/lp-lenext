// Dicionário de traduções da landing page. pt = português (padrão), en = inglês.
// Estrutura organizada por componente/seção para facilitar manutenção.

export const translations = {
  pt: {
    header: {
      nav: ['Solução', 'Resultados', 'Funcionalidades', 'Segurança', 'Planos'],
      cta: 'Agende uma demo',
    },

    hero: {
      badge: 'INTELIGÊNCIA DE CRÉDITO E COBRANÇA B2B',
      titlePre: 'Mais vendas a prazo, ',
      titleHighlight: 'menos inadimplência',
      descPre: 'O LETMESEE é a solução ',
      descStrong1: 'ponta a ponta para crédito e cobrança',
      descMid: ': cruza todos os birôs em segundos, aprova com segurança e cobra sozinho — inadimplência já reduzida em ',
      descStrong2: 'até 57%',
      descEnd: ' nos nossos clientes.',
      ctaPrimary: 'Agende uma demo',
      ctaSecondary: 'Ver planos e preços',
      microcopy: 'Resposta em até 1 dia útil • Sem compromisso',
      trust: ['+150 empresas', 'R$ 7,5 bi+ analisados', 'Conformidade LGPD', 'ISO 27001'],
      panelPill: '66,7% de aprovação · 10h45 economizadas',
      cardApprovedTitle: 'Pedido aprovado',
      cardApprovedSub: 'Análise automática · 12 min',
      cardProcessedLabel: 'Processado no mês',
      cardScoreLabel: 'Score de crédito',
      cardScoreRisk: 'Baixo risco',
      cardScoreSuggested: 'Limite sugerido',
      cardScoreApprove: 'Aprovar',
      cardTimeLabel: 'Tempo médio de análise',
      cardTimeSub: 'De 51 dias para minutos',
    },

    clientLogos: {
      caption: '+150 empresas já decidem crédito com a Lenext',
    },

    problemSolution: {
      eyebrow: 'O problema',
      titlePre: 'Decidir crédito sem dado certo ',
      titleHighlight: 'custa caro',
      todayLabel: 'Hoje',
      withLabel: 'Com o LETMESEE',
      rows: [
        { pain: 'Levo 2 horas para aprovar um crédito', gain: 'Análise em 5 minutos' },
        { pain: 'Decido no escuro, com pouca informação', gain: 'Todos os birôs cruzados em uma tela' },
        { pain: 'Perco dinheiro com inadimplência e fraude', gain: 'Até 57% menos inadimplência' },
        { pain: 'Relatórios manuais consomem o time', gain: 'Até 80% de economia com relatórios' },
      ],
      cta: 'Agende uma demo',
    },

    howItWorks: {
      eyebrow: 'Como funciona',
      titlePre: 'Da consulta à decisão em ',
      titleHighlight: '3 passos',
      steps: [
        {
          title: 'Conecte suas fontes',
          desc: 'Nosso time liga o LETMESEE aos birôs, ao Bacen SCR e ao seu ERP. Você não escreve uma linha de código.',
        },
        {
          title: 'Configure sua política',
          desc: 'Defina scores, limites e condições no jeito do seu negócio — em minutos, direto na tela.',
        },
        {
          title: 'Aprove em 5 minutos',
          desc: 'Cada pedido chega com parecer completo e decisão sugerida. O que levava 2 horas agora leva minutos.',
        },
      ],
      cta: 'Agende uma demo',
    },

    results: {
      eyebrow: 'Resultados',
      titlePre: 'Números que mudam o ',
      titleHighlight: 'caixa',
      titleEnd: ' da sua empresa.',
      stats: [
        { label: 'redução média de inadimplência e fraude' },
        { label: 'tempo de análise de crédito' },
        { label: 'economia com relatórios de análise' },
        { label: 'em crédito já analisado' },
        { label: 'empresas usando a Lenext' },
        { label: 'das decisões rastreáveis e auditáveis' },
      ],
    },

    features: {
      eyebrow: 'Funcionalidades',
      titlePre: 'Uma plataforma. ',
      titleHighlight: 'Todo o ciclo do crédito',
      desc: 'Do parecer à recuperação: motor de decisão, portais com a sua marca e cobrança automatizada — no mesmo lugar.',
      tabs: ['Motor de crédito', 'Portais whitelabel', 'Gestão de inadimplência', 'App de vendas & WhatsApp'],
      ctaLabel: 'Agende uma demo',

      engine: {
        titlePre: 'O motor de crédito que roda a ',
        titleHighlight: 'sua política',
        desc: 'Enquanto o mercado entrega regras engessadas, na Lenext você monta a política de crédito da sua empresa — com compliance, nuvem e rastreabilidade de ponta a ponta.',
        capabilities: [
          { title: 'Sua política, suas regras', desc: 'Configure scores, limites e condições sem escrever uma linha de código.' },
          { title: 'Compliance e conformidade', desc: 'Cada política versionada e auditável — decisões dentro da norma, sempre.' },
          { title: 'Nuvem com rastreabilidade', desc: 'Toda decisão registrada, segura e disponível quando você precisar.' },
          { title: 'Sem depender de TI', desc: 'Coloque uma nova política de crédito no ar em minutos, não em meses.' },
        ],
        mockup: {
          header: 'Política de Crédito · PJ',
          active: 'Ativa',
          conditionsLabel: 'Se estas condições forem atendidas',
          conditions: [
            { label: 'Score de crédito', value: '≥ 700' },
            { label: 'Faturamento mensal', value: '≥ R$ 50 mil' },
            { label: 'Bacen SCR', value: 'sem restrição' },
            { label: 'Comprometimento de crédito', value: '< 30%' },
          ],
          then: 'Então',
          decisionLabel: 'Decisão automática',
          decisionValue: 'Aprovar até R$ 80.000',
          decisionSub: 'taxa 1,8% a.m. · em até 24x',
          compliance: 'Compliance',
          cloud: 'Na nuvem',
          autoSaved: 'salvo e rastreável automaticamente',
        },
      },

      portal: {
        titlePre: 'Portal do cliente e do fornecedor com a ',
        titleHighlight: 'sua marca',
        titleEnd: ' na frente.',
        desc: 'Whitelabel de verdade: seu logo, suas cores, seu domínio. Clientes e fornecedores se atendem sozinhos — a experiência é sua, a infraestrutura é nossa.',
        capabilities: [
          { title: 'Portal do cliente', desc: 'Limites, boletos e status de crédito em autosserviço, 24 horas por dia.' },
          { title: 'Portal do fornecedor', desc: 'Recebíveis, notas e documentos sem e-mail, planilha ou telefonema.' },
          { title: '100% whitelabel', desc: 'A plataforma desaparece; a sua marca aparece. Do login ao boleto.' },
          { title: 'Financeiro respirando', desc: 'Chega de "cadê meu boleto?" — seu time volta a analisar crédito.' },
        ],
        mockupBadge: 'Sua marca aqui',
        mockupAlt: 'Portal do cliente whitelabel: consultas, faturas e status de crédito com a marca da sua empresa',
        mockupUrl: 'portal.suaempresa.com.br',
      },

      collection: {
        titlePre: 'Cobrança no ',
        titleHighlight: 'piloto automático',
        titleEnd: ', do lembrete ao acordo.',
        desc: 'Você define a régua uma vez; a plataforma cobra todos os dias. Juros e multa calculados sozinhos, mensagem certa no canal certo, e o crítico escalado na hora.',
        capabilities: [
          { title: 'Régua automatizada', desc: 'D+1, D+5, D+15… cada etapa dispara no dia certo, sem ninguém precisar lembrar.' },
          { title: 'Módulo de cálculo', desc: 'Juros, multa e atualização do débito calculados automaticamente. Zero planilha.' },
          { title: 'Mensageria multicanal', desc: 'WhatsApp, e-mail e SMS na mesma régua, com histórico de cada contato.' },
          { title: 'Escalonamento inteligente', desc: 'Casos críticos vão direto para a assessoria de cobrança integrada.' },
        ],
        mockup: {
          header: 'Régua de cobrança · Título #8412',
          active: 'Rodando',
          triggersLabel: 'Disparos automáticos desta régua',
          ruler: [
            { channel: 'WhatsApp', text: 'Lembrete amistoso enviado' },
            { channel: 'E-mail', text: 'Boleto atualizado: juros + multa calculados' },
            { channel: 'SMS', text: 'Proposta de acordo em até 3x' },
            { channel: 'Assessoria', text: 'Escalonado para cobrança especializada' },
          ],
          recoveredLabel: 'Recuperado por esta régua no mês',
          recoveredValue: 'R$ 47.320,00',
          recoveredSub: 'sem uma ligação sequer do seu time',
        },
      },

      sales: {
        titlePre: 'Crédito aprovado na ',
        titleHighlight: 'velocidade da venda',
        titleEnd: '.',
        desc: 'Seu time de vendas consulta limite e libera pedido pelo aplicativo ou direto no WhatsApp — no balcão, na rua ou na frente do cliente. A venda não espera o financeiro.',
        capabilities: [
          { title: 'App na mão do vendedor', desc: 'Limite, status e histórico do cliente no bolso do time de campo.' },
          { title: 'Consulta por WhatsApp', desc: 'Manda o CNPJ, recebe o parecer. Crédito na velocidade da conversa.' },
          { title: 'Venda sem travar', desc: 'O pedido já chega ao financeiro com o crédito validado. Ninguém espera ninguém.' },
          { title: 'Alertas em tempo real', desc: 'Aprovações, bloqueios e mudanças de limite avisados na hora, onde o time está.' },
        ],
        mockup: {
          header: 'LETMESEE · Crédito',
          status: 'responde em segundos',
          chat: [
            { text: 'Consulta CNPJ 12.345.678/0001-90' },
            { text: '✅ Cliente aprovado! Limite disponível: R$ 35.000 · Score 812 · Sem restrições nos birôs' },
            { text: 'Liberar pedido de R$ 18.400' },
            { text: '🎉 Pedido liberado. Limite restante: R$ 16.600' },
          ],
          footer: 'Parecer completo dos birôs por trás de cada resposta',
        },
      },
    },

    integrationFlow: {
      eyebrow: 'Integrações & Automação',
      titlePre: 'Canais, birôs e IA em ',
      titleHighlight: 'um só fluxo',
      desc: 'Conectamos WhatsApp, birôs de crédito, Bacen SCR e seus sistemas. A IA do LETMESEE analisa até balanço, DRE e faturamento — e devolve parecer, comprometimento de crédito e cobrança, automaticamente.',
      groupSources: 'Canais & Fontes',
      groupDecisions: 'Decisões & Ações',
      nodes: {
        whatsapp: 'WhatsApp',
        bureau: 'Birôs: Serasa, Boa Vista, Quod',
        bacen: 'Bacen SCR',
        api: 'ERPs & APIs',
        parecer: 'Parecer de crédito automático',
        gauge: 'Comprometimento de crédito',
        finance: 'Balanço, DRE e faturamento por IA',
        cobranca: 'Cobrança & monitoramento',
      },
      hubBadge: 'IA proprietária',
      hubDesc: 'Cruza todos os birôs e fontes em segundos',
    },

    integrationsBar: {
      titlePre: 'Conectado a quem o mercado ',
      titleHighlight: 'já confia',
    },

    productShowcase: {
      eyebrow: 'Veja o sistema por dentro',
      titlePre: 'Todo o controle da sua carteira em ',
      titleHighlight: 'um só painel',
      titleEnd: '.',
      desc: 'Crédito, cobrança, recebíveis, Bacen SCR e leads — navegue pelas telas reais do LETMESEE.',
    },

    productCarousel: {
      loading: 'Carregando…',
      slides: [
        { label: 'Análise de crédito' },
        { label: 'Painel de cobrança' },
        { label: 'Parcelas a receber' },
        { label: 'Relatório Bacen SCR' },
        { label: 'Painel de leads' },
      ],
    },

    benefits: {
      eyebrow: 'Diferenciais',
      titlePre: 'Por que médias e grandes empresas escolhem a ',
      titleHighlight: 'Lenext',
      titleEnd: '.',
      items: [
        {
          title: 'Todas as fontes num lugar só',
          desc: 'Serasa, Boa Vista, Quod, Bacen SCR e Receita numa consulta única. Chega de abrir cinco sistemas para decidir um crédito.',
        },
        {
          title: 'Análise financeira com IA',
          desc: 'Balanço Patrimonial, DRE e faturamento lidos pela IA para um parecer de crédito mais preciso.',
        },
        {
          title: 'Governance integrada',
          desc: 'Integrações nativas com seus sistemas enterprise — Bacen SCR, birôs e ERPs. Conformidade automática em cada processo.',
        },
        {
          title: 'Mais barato',
          desc: 'Uma fração do que você gasta hoje em consultas avulsas e retrabalho.',
        },
        {
          title: 'Suporte humanizado',
          desc: 'Gente de verdade ajudando, não só chatbot.',
        },
      ],
    },

    testimonials: {
      eyebrow: 'Quem usa, confia',
      titlePre: 'Resultados reais de quem ',
      titleHighlight: 'decide com dado',
      titleEnd: '.',
      items: [
        {
          quote: 'Cortamos drasticamente o custo com relatórios de análise de crédito, aproximadamente 64% do custo. O que era um dia de trabalho virou minutos.',
          author: 'Gerente Financeiro',
          company: 'Indústria de bombas hidráulicas de grande porte',
        },
        {
          quote: 'A automação 100% personalizada se encaixou no nosso processo, não o contrário. Ganhamos agilidade sem trocar de sistema.',
          author: 'Head de Operações',
          company: 'Indústria fabricante de produtos médico-hospitalares descartáveis',
        },
        {
          quote: 'Hoje temos rastreabilidade e controle total da inadimplência. A gestão enxerga o risco antes de ele virar prejuízo.',
          author: 'Gerente Financeiro',
          company: 'Indústria de fabricação de máquinas e equipamentos para a indústria optica multinacional',
        },
      ],
    },

    security: {
      eyebrow: 'Segurança e conformidade',
      titlePre: 'Seus dados de crédito tratados com o ',
      titleHighlight: 'rigor que o assunto exige',
      titleEnd: '.',
      desc: 'Para operações de crédito em escala, segurança de dados é não-negociável. A Lenext opera com certificação enterprise-grade, conformidade legal rigorosa e parcerias oficiais.',
      items: [
        { title: 'ISO 27001', desc: 'Gestão de segurança da informação certificada.' },
        { title: 'Conformidade LGPD', desc: 'Tratamento de dados dentro da lei.' },
        { title: 'Parcerias oficiais', desc: 'Integração oficial com os birôs e ERPs.' },
        { title: 'Dados na nuvem', desc: 'Tudo centralizado em ambiente cloud seguro, auditável e sempre disponível.' },
      ],
    },

    pricing: {
      eyebrow: 'Planos',
      titlePre: 'Um plano completo para a sua ',
      titleHighlight: 'operação',
      titleEnd: '.',
      desc: 'Tudo o que você precisa para vender mais a prazo com segurança. Valores sob medida — fale com um consultor e receba um diagnóstico gratuito.',
      planName: 'Plano LETMESEE',
      price: 'Sob consulta',
      planDesc: 'Plataforma completa, configurada para o seu cenário.',
      features: [
        'Relatórios de bureaus',
        'Bacen SCR',
        'Integração com WhatsApp',
        'Integrações com assessorias de cobrança',
        'Integrações com ERPs',
        'Motor de crédito',
        'Automações de notificação',
        'API Lenext',
      ],
      cta: 'Agende uma demo',
      microcopy: 'Resposta em até 1 dia útil • Sem compromisso',
    },

    faq: {
      eyebrow: 'Dúvidas frequentes',
      title: 'Perguntas que todo gestor faz.',
      items: [
        {
          q: 'O que é o LETMESEE?',
          a: 'Plataforma que reúne todos os birôs de crédito e automatiza a análise de risco e a gestão de inadimplência.',
        },
        {
          q: 'Como é a implementação?',
          a: 'Implementação guiada do início ao fim com suporte da nossa equipe especializada. Você fica operando em dias, não meses — configurações parametrizadas para sua política de crédito.',
        },
        {
          q: 'Como meus dados são protegidos?',
          a: 'ISO 27001, conformidade LGPD e infraestrutura auditável.',
        },
        {
          q: 'Com quais fontes e sistemas integra?',
          a: 'Serasa, Boa Vista/Equifax, Quod, Bacen SCR, Receita Federal e ERPs parceiros. A IA ainda analisa Balanço Patrimonial, DRE e faturamento.',
        },
        {
          q: 'Quanto custa?',
          a: 'O valor é sob medida para o volume de consultas da sua operação — em geral, uma fração do que você gasta hoje com consultas avulsas e retrabalho. O diagnóstico com o consultor é gratuito e sem compromisso.',
        },
        {
          q: 'Quanto tempo leva para implementar?',
          a: 'A implementação é guiada pelo nosso time do início ao fim, sem depender do seu TI. Na maioria dos casos você está operando em dias, não meses — fale com um consultor para o prazo do seu cenário.',
        },
        {
          q: 'Atende meu setor?',
          a: 'Atendemos médias e grandes empresas de diversos setores com volume relevante de vendas a prazo — comércio, indústria, distribuidoras, fabricantes.',
        },
      ],
    },

    contactCTA: {
      titlePre: 'Pare de vender no escuro. ',
      titleHighlight: 'Comece a decidir com dado.',
      desc: 'Fale com um consultor e veja o LETMESEE aplicado ao seu cenário. Resposta em até 1 dia útil, sem compromisso.',
      whatsappCta: 'Prefere conversar agora? Chame no WhatsApp',
      sentTitle: 'Recebemos seu contato!',
      sentDesc: 'Um consultor falará com você em breve.',
      calendlyCta: 'Prefere já agendar? Escolha um horário',
      formTitle: 'Agende uma demo',
      fields: {
        nome: { label: 'Nome', placeholder: 'Seu nome' },
        empresa: { label: 'Empresa', placeholder: 'Nome da empresa' },
        email: { label: 'E-mail corporativo', placeholder: 'voce@empresa.com.br' },
        telefone: { label: 'WhatsApp', placeholder: '(00) 00000-0000' },
      },
      submitCta: 'Quero falar com um consultor',
      disclaimer: 'Ao enviar, você concorda em ser contatado pela Lenext. Seus dados são tratados conforme a LGPD.',
    },

    footer: {
      tagline: 'Plataforma LETMESEE — a melhor solução para o setor de crédito e cobrança.',
      badges: ['LGPD', 'ISO 27001'],
      apoioTitle: 'A Lenext apoia',
      institucionalTitle: 'Institucional',
      institucional: ['Política de Privacidade', 'Termos de Uso', 'Documentação API', 'Status dos serviços'],
      contatoTitle: 'Contato',
      copyright: 'Lenext Technology. Todos os direitos reservados.',
    },

    whatsappFloat: {
      ariaLabel: 'Falar no WhatsApp',
    },

    resources: {
      backToSite: 'Voltar ao site',
      hub: {
        eyebrow: 'Materiais gratuitos',
        title: 'Conteúdos para quem decide crédito com inteligência',
        subtitle: 'Guias, modelos e boas práticas para vender mais a prazo com segurança — feitos por quem entende de crédito B2B.',
      },
      ebook: {
        eyebrow: 'E-book gratuito',
        badge: 'Material exclusivo',
        title: 'Política de Crédito: como escalar vendas a prazo sem aumentar a inadimplência',
        subtitle: 'Um guia prático para estruturar e revisar a política de crédito da sua empresa e reduzir a inadimplência sem travar as vendas.',
        bullets: [
          'Como definir score, limite e prazo para cada perfil de cliente',
          'Modelos prontos de regras de aprovação e negação',
          'O passo a passo para reduzir inadimplência sem perder vendas',
          'Checklist para automatizar a sua análise de crédito',
        ],
        formTitle: 'Preencha para baixar gratuitamente',
        fields: {
          name: { label: 'Nome', placeholder: 'Seu nome' },
          email: { label: 'E-mail corporativo', placeholder: 'voce@empresa.com.br' },
        },
        consent: 'Autorizo a Lenext a entrar em contato comigo por e-mail, WhatsApp ou telefone.',
        download: 'Baixar e-book gratuito',
        disabledHint: 'Preencha nome, e-mail e marque a autorização para liberar o download.',
        privacy: 'Seus dados são tratados conforme a LGPD. Nada de spam.',
        pageMeta: 'E-book gratuito: Política de Crédito | Lenext LETMESEE',
        thanks: {
          eyebrow: 'Download liberado',
          title: 'Prontinho! Seu e-book já está baixando.',
          desc: 'Aproveite a leitura — em poucos minutos você terá um roteiro claro para estruturar sua política de crédito.',
          redownload: 'O download não começou? Clique para baixar novamente',
          nextTitle: 'Que tal ir além do e-book?',
          nextDesc: 'Veja na prática como o LETMESEE aplica tudo isso automaticamente na sua operação — dos birôs à cobrança.',
          ctaDemo: 'Agende uma demo',
          ctaExplore: 'Conhecer a plataforma',
          proof: '+150 empresas já decidem crédito com a Lenext',
        },
      },
      prompt: {
        eyebrow: 'Prompt de IA · Pronto para usar',
        badge: '100% gratuito',
        title: 'Prompt de IA para Análise de Crédito, pronto para usar',
        subtitle: 'Use IA para interpretar dados, avaliar riscos e tomar decisões de crédito com mais segurança.',
        chips: ['Aplicação prática', 'Análise de riscos', 'Mais agilidade', '100% gratuito', 'IA', 'Análise de crédito'],
        bullets: [
          'Aplicação prática e imediata no seu fluxo de análise',
          'Interpreta dados e avalia riscos de crédito com IA',
          'Mais agilidade e segurança na tomada de decisão',
          'Localiza documentos regulatórios na CVM (ITR, DFP, releases)',
        ],
        formTitle: 'Preencha para acessar o prompt',
        fields: {
          name: { label: 'Nome', placeholder: 'Seu nome' },
          email: { label: 'E-mail corporativo', placeholder: 'voce@empresa.com.br' },
        },
        consent: 'Autorizo a Lenext a entrar em contato comigo por e-mail, WhatsApp ou telefone.',
        unlock: 'Acessar o prompt gratuito',
        disabledHint: 'Preencha nome, e-mail e marque a autorização para liberar o prompt.',
        privacy: 'Seus dados são tratados conforme a LGPD. Nada de spam.',
        pageMeta: 'Prompt de IA para Análise de Crédito | Lenext LETMESEE',
        promptText: `Você é um especialista em documentos regulatórios da CVM (Comissão de Valores Mobiliários do Brasil). Sua tarefa é localizar o link direto do relatório de resultados ou ITR/DFP mais recente de uma empresa específica.

Empresa: [INSIRA O NOME DA EMPRESA OU TICKER — ex.: Natura Cosméticos S.A. / Natura &Co Holding S.A. / NATU3]

Busque no sistema oficial da CVM (https://www.rad.cvm.gov.br/ENET/ ou https://www.cvm.gov.br) os documentos mais recentes das seguintes categorias, na ordem de prioridade:
1. ITR (Informações Trimestrais).
2. DFP (Demonstrações Financeiras Padronizadas).
3. Relatório de Resultados / Release de Resultados.
4. Fato Relevante com demonstrações financeiras.

Instruções obrigatórias:
- Retorne apenas o documento mais recente disponível (priorize 2025 ou 2026).
- Forneça: tipo exato do documento (ex.: ITR 1T26, DFP 2025), data do documento e data de envio à CVM.
- Link DIRETO para download do PDF (preferencialmente frmDownloadDocumento.aspx ou frmExibirArquivoIPEExterno.aspx).
- Se não encontrar link direto, forneça o link da página de consulta da empresa na CVM + instruções exatas de 1 clique para baixar.
- Liste também o 2º e 3º documentos mais recentes para comparação.
- Se houver mais de uma empresa com nome parecido, confirme o CNPJ ou código CVM correto.
- Caso não encontre nada, explique exatamente o que pesquisou e sugira o próximo passo.

Responda de forma curta e direta, só com os fatos pedidos. Não adicione explicações desnecessárias.`,
        thanks: {
          eyebrow: 'Prompt liberado',
          title: 'Prontinho! Seu prompt está pronto para usar.',
          desc: 'Copie o prompt abaixo e cole na sua ferramenta de IA favorita (ChatGPT, Claude, Gemini) para começar agora.',
          copy: 'Copiar prompt',
          copied: 'Copiado!',
          nextTitle: 'Que tal ir além do prompt?',
          nextDesc: 'Veja como o LETMESEE já faz análise de crédito de ponta a ponta — dos birôs à decisão — automaticamente.',
          ctaDemo: 'Agende uma demo',
          ctaExplore: 'Conhecer a plataforma',
          proof: '+150 empresas já decidem crédito com a Lenext',
        },
      },
    },

    whatsappMessage: 'Olá! Vim pela página do LETMESEE e quero falar com um especialista.',
  },

  en: {
    header: {
      nav: ['Solution', 'Results', 'Features', 'Security', 'Pricing'],
      cta: 'Schedule a demo',
    },

    hero: {
      badge: 'B2B CREDIT & COLLECTIONS INTELLIGENCE',
      titlePre: 'More sales on terms, ',
      titleHighlight: 'less default risk',
      descPre: 'LETMESEE is the ',
      descStrong1: 'end-to-end credit and collections solution',
      descMid: ': it cross-checks every credit bureau in seconds, approves safely, and collects on its own — default rates already cut by ',
      descStrong2: 'up to 57%',
      descEnd: ' for our clients.',
      ctaPrimary: 'Schedule a demo',
      ctaSecondary: 'View plans and pricing',
      microcopy: 'Response within 1 business day • No commitment',
      trust: ['+150 companies', 'R$7.5B+ analyzed', 'LGPD compliant', 'ISO 27001'],
      panelPill: '66.7% approval rate · 10h45 saved',
      cardApprovedTitle: 'Order approved',
      cardApprovedSub: 'Automatic analysis · 12 min',
      cardProcessedLabel: 'Processed this month',
      cardScoreLabel: 'Credit score',
      cardScoreRisk: 'Low risk',
      cardScoreSuggested: 'Suggested limit',
      cardScoreApprove: 'Approve',
      cardTimeLabel: 'Average analysis time',
      cardTimeSub: 'From 51 days to minutes',
    },

    clientLogos: {
      caption: '+150 companies already decide credit with Lenext',
    },

    problemSolution: {
      eyebrow: 'The problem',
      titlePre: 'Deciding credit without the right data ',
      titleHighlight: 'costs you',
      todayLabel: 'Today',
      withLabel: 'With LETMESEE',
      rows: [
        { pain: 'It takes me 2 hours to approve a credit line', gain: 'Analysis in 5 minutes' },
        { pain: 'I decide in the dark, with little information', gain: 'Every bureau cross-checked on one screen' },
        { pain: 'I lose money to defaults and fraud', gain: 'Up to 57% less default risk' },
        { pain: 'Manual reports eat up my team’s time', gain: 'Up to 80% savings on reporting' },
      ],
      cta: 'Schedule a demo',
    },

    howItWorks: {
      eyebrow: 'How it works',
      titlePre: 'From inquiry to decision in ',
      titleHighlight: '3 steps',
      steps: [
        {
          title: 'Connect your sources',
          desc: 'Our team links LETMESEE to credit bureaus, Bacen SCR, and your ERP. You don’t write a single line of code.',
        },
        {
          title: 'Configure your policy',
          desc: 'Set scores, limits, and conditions your own way — in minutes, right on screen.',
        },
        {
          title: 'Approve in 5 minutes',
          desc: 'Every request arrives with a full assessment and a suggested decision. What took 2 hours now takes minutes.',
        },
      ],
      cta: 'Schedule a demo',
    },

    results: {
      eyebrow: 'Results',
      titlePre: 'Numbers that change your company’s ',
      titleHighlight: 'bottom line',
      titleEnd: '.',
      stats: [
        { label: 'average reduction in default and fraud' },
        { label: 'credit analysis time' },
        { label: 'savings on analysis reports' },
        { label: 'in credit already analyzed' },
        { label: 'companies using Lenext' },
        { label: 'of decisions traceable and auditable' },
      ],
    },

    features: {
      eyebrow: 'Features',
      titlePre: 'One platform. ',
      titleHighlight: 'The entire credit cycle',
      desc: 'From assessment to recovery: decision engine, branded portals, and automated collections — all in one place.',
      tabs: ['Credit engine', 'Whitelabel portals', 'Default management', 'Sales app & WhatsApp'],
      ctaLabel: 'Schedule a demo',

      engine: {
        titlePre: 'The credit engine that runs ',
        titleHighlight: 'your policy',
        desc: 'While the market ships rigid rules, at Lenext you build your company’s own credit policy — with compliance, cloud, and end-to-end traceability.',
        capabilities: [
          { title: 'Your policy, your rules', desc: 'Configure scores, limits, and conditions without writing a line of code.' },
          { title: 'Compliance built in', desc: 'Every policy versioned and auditable — decisions always within the rules.' },
          { title: 'Cloud with traceability', desc: 'Every decision logged, secure, and available whenever you need it.' },
          { title: 'No IT dependency', desc: 'Launch a new credit policy in minutes, not months.' },
        ],
        mockup: {
          header: 'Credit Policy · Business',
          active: 'Active',
          conditionsLabel: 'If these conditions are met',
          conditions: [
            { label: 'Credit score', value: '≥ 700' },
            { label: 'Monthly revenue', value: '≥ R$50k' },
            { label: 'Bacen SCR', value: 'no restriction' },
            { label: 'Credit exposure', value: '< 30%' },
          ],
          then: 'Then',
          decisionLabel: 'Automatic decision',
          decisionValue: 'Approve up to R$80,000',
          decisionSub: '1.8% monthly rate · up to 24 installments',
          compliance: 'Compliance',
          cloud: 'Cloud-based',
          autoSaved: 'saved and traceable automatically',
        },
      },

      portal: {
        titlePre: 'Client and supplier portals with ',
        titleHighlight: 'your brand',
        titleEnd: ' up front.',
        desc: 'True whitelabel: your logo, your colors, your domain. Clients and suppliers serve themselves — the experience is yours, the infrastructure is ours.',
        capabilities: [
          { title: 'Client portal', desc: 'Limits, invoices, and credit status in self-service, 24 hours a day.' },
          { title: 'Supplier portal', desc: 'Receivables, invoices, and documents without email, spreadsheets, or phone calls.' },
          { title: '100% whitelabel', desc: 'The platform disappears; your brand shows up. From login to invoice.' },
          { title: 'Finance team breathes easier', desc: 'No more "where’s my invoice?" — your team goes back to analyzing credit.' },
        ],
        mockupBadge: 'Your brand here',
        mockupAlt: 'Whitelabel client portal: inquiries, invoices, and credit status with your company’s brand',
        mockupUrl: 'portal.yourcompany.com',
      },

      collection: {
        titlePre: 'Collections on ',
        titleHighlight: 'autopilot',
        titleEnd: ', from reminder to settlement.',
        desc: 'You set the rule once; the platform collects every day. Interest and penalties calculated automatically, the right message on the right channel, and critical cases escalated instantly.',
        capabilities: [
          { title: 'Automated rules', desc: 'D+1, D+5, D+15… every step fires on the right day, with no one needing to remember.' },
          { title: 'Calculation engine', desc: 'Interest, penalties, and balance updates calculated automatically. Zero spreadsheets.' },
          { title: 'Multichannel messaging', desc: 'WhatsApp, email, and SMS on the same rule, with a history of every contact.' },
          { title: 'Smart escalation', desc: 'Critical cases go straight to the integrated collections agency.' },
        ],
        mockup: {
          header: 'Collection Rule · Invoice #8412',
          active: 'Running',
          triggersLabel: 'Automatic triggers for this rule',
          ruler: [
            { channel: 'WhatsApp', text: 'Friendly reminder sent' },
            { channel: 'Email', text: 'Invoice updated: interest + penalty calculated' },
            { channel: 'SMS', text: 'Settlement offer in up to 3 installments' },
            { channel: 'Agency', text: 'Escalated to specialized collections' },
          ],
          recoveredLabel: 'Recovered by this rule this month',
          recoveredValue: 'R$47,320.00',
          recoveredSub: 'without a single call from your team',
        },
      },

      sales: {
        titlePre: 'Credit approved at the ',
        titleHighlight: 'speed of the sale',
        titleEnd: '.',
        desc: 'Your sales team checks limits and releases orders from the app or straight from WhatsApp — at the counter, on the road, or in front of the client. The sale never waits on finance.',
        capabilities: [
          { title: 'App in the rep’s hand', desc: 'Limit, status, and client history in the field team’s pocket.' },
          { title: 'WhatsApp inquiries', desc: 'Send the tax ID, get the assessment. Credit at the speed of conversation.' },
          { title: 'Sales that don’t stall', desc: 'The order already reaches finance with credit validated. No one waits on anyone.' },
          { title: 'Real-time alerts', desc: 'Approvals, blocks, and limit changes notified instantly, wherever the team is.' },
        ],
        mockup: {
          header: 'LETMESEE · Credit',
          status: 'replies in seconds',
          chat: [
            { text: 'Check tax ID 12.345.678/0001-90' },
            { text: '✅ Client approved! Available limit: R$35,000 · Score 812 · No bureau restrictions' },
            { text: 'Release order for R$18,400' },
            { text: '🎉 Order released. Remaining limit: R$16,600' },
          ],
          footer: 'A full bureau assessment behind every reply',
        },
      },
    },

    integrationFlow: {
      eyebrow: 'Integrations & Automation',
      titlePre: 'Channels, bureaus, and AI in ',
      titleHighlight: 'a single flow',
      desc: 'We connect WhatsApp, credit bureaus, Bacen SCR, and your systems. LETMESEE’s AI even reads balance sheets, income statements, and revenue — returning an assessment, credit exposure, and collections, automatically.',
      groupSources: 'Channels & Sources',
      groupDecisions: 'Decisions & Actions',
      nodes: {
        whatsapp: 'WhatsApp',
        bureau: 'Bureaus: Serasa, Boa Vista, Quod',
        bacen: 'Bacen SCR',
        api: 'ERPs & APIs',
        parecer: 'Automatic credit assessment',
        gauge: 'Credit exposure',
        finance: 'Balance sheet, income statement & revenue by AI',
        cobranca: 'Collections & monitoring',
      },
      hubBadge: 'Proprietary AI',
      hubDesc: 'Cross-checks every bureau and source in seconds',
    },

    integrationsBar: {
      titlePre: 'Connected to who the market ',
      titleHighlight: 'already trusts',
    },

    productShowcase: {
      eyebrow: 'See the system up close',
      titlePre: 'Total control of your portfolio in ',
      titleHighlight: 'a single dashboard',
      titleEnd: '.',
      desc: 'Credit, collections, receivables, Bacen SCR, and leads — browse the real screens of LETMESEE.',
    },

    productCarousel: {
      loading: 'Loading…',
      slides: [
        { label: 'Credit analysis' },
        { label: 'Collections dashboard' },
        { label: 'Installments receivable' },
        { label: 'Bacen SCR report' },
        { label: 'Leads dashboard' },
      ],
    },

    benefits: {
      eyebrow: 'Differentiators',
      titlePre: 'Why mid-size and large companies choose ',
      titleHighlight: 'Lenext',
      titleEnd: '.',
      items: [
        {
          title: 'Every source in one place',
          desc: 'Serasa, Boa Vista, Quod, Bacen SCR, and Revenue Service in a single inquiry. No more opening five systems to decide on credit.',
        },
        {
          title: 'AI-powered financial analysis',
          desc: 'Balance sheet, income statement, and revenue read by AI for a more accurate credit assessment.',
        },
        {
          title: 'Integrated governance',
          desc: 'Native integrations with your enterprise systems — Bacen SCR, bureaus, and ERPs. Automatic compliance at every step.',
        },
        {
          title: 'Lower cost',
          desc: 'A fraction of what you spend today on one-off inquiries and rework.',
        },
        {
          title: 'Human support',
          desc: 'Real people helping you, not just a chatbot.',
        },
      ],
    },

    testimonials: {
      eyebrow: 'Trusted by those who use it',
      titlePre: 'Real results from those who ',
      titleHighlight: 'decide with data',
      titleEnd: '.',
      items: [
        {
          quote: 'We drastically cut the cost of credit analysis reports, by about 64%. What used to take a full day now takes minutes.',
          author: 'Finance Manager',
          company: 'Large hydraulic pump manufacturer',
        },
        {
          quote: 'The 100% customized automation fit our process, not the other way around. We gained agility without switching systems.',
          author: 'Head of Operations',
          company: 'Disposable medical-hospital products manufacturer',
        },
        {
          quote: 'Today we have full traceability and control over defaults. Management sees the risk before it becomes a loss.',
          author: 'Finance Manager',
          company: 'Multinational machinery and equipment manufacturer for the optical industry',
        },
      ],
    },

    security: {
      eyebrow: 'Security & compliance',
      titlePre: 'Your credit data handled with the ',
      titleHighlight: 'rigor the subject demands',
      titleEnd: '.',
      desc: 'For credit operations at scale, data security is non-negotiable. Lenext operates with enterprise-grade certification, rigorous legal compliance, and official partnerships.',
      items: [
        { title: 'ISO 27001', desc: 'Certified information security management.' },
        { title: 'LGPD compliance', desc: 'Data handling within the law.' },
        { title: 'Official partnerships', desc: 'Official integration with bureaus and ERPs.' },
        { title: 'Cloud data', desc: 'Everything centralized in a secure, auditable, always-available cloud environment.' },
      ],
    },

    pricing: {
      eyebrow: 'Pricing',
      titlePre: 'A complete plan for your ',
      titleHighlight: 'operation',
      titleEnd: '.',
      desc: 'Everything you need to sell more on terms, safely. Custom pricing — talk to a specialist and get a free diagnosis.',
      planName: 'LETMESEE Plan',
      price: 'Custom quote',
      planDesc: 'Complete platform, configured for your scenario.',
      features: [
        'Bureau reports',
        'Bacen SCR',
        'WhatsApp integration',
        'Collections agency integrations',
        'ERP integrations',
        'Credit engine',
        'Notification automations',
        'Lenext API',
      ],
      cta: 'Talk to a specialist',
      microcopy: 'Response within 1 business day • No commitment',
    },

    faq: {
      eyebrow: 'Frequently asked questions',
      title: 'Questions every manager asks.',
      items: [
        {
          q: 'What is LETMESEE?',
          a: 'A platform that brings together every credit bureau and automates risk analysis and default management.',
        },
        {
          q: 'What’s the implementation like?',
          a: 'Guided implementation from start to finish with support from our specialized team. You’re up and running in days, not months — configurations tailored to your credit policy.',
        },
        {
          q: 'How is my data protected?',
          a: 'ISO 27001, LGPD compliance, and auditable infrastructure.',
        },
        {
          q: 'What sources and systems does it integrate with?',
          a: 'Serasa, Boa Vista/Equifax, Quod, Bacen SCR, Revenue Service, and partner ERPs. The AI also analyzes balance sheets, income statements, and revenue.',
        },
        {
          q: 'How much does it cost?',
          a: 'Pricing is tailored to your operation’s inquiry volume — generally a fraction of what you spend today on one-off inquiries and rework. The consultant diagnosis is free and with no commitment.',
        },
        {
          q: 'How long does implementation take?',
          a: 'Implementation is guided by our team from start to finish, with no dependency on your IT. In most cases you’re operating in days, not months — talk to a consultant for your scenario’s timeline.',
        },
        {
          q: 'Does it serve my industry?',
          a: 'We serve mid-size and large companies across industries with relevant volumes of credit sales — retail, manufacturing, distributors, producers.',
        },
      ],
    },

    contactCTA: {
      titlePre: 'Stop selling in the dark. ',
      titleHighlight: 'Start deciding with data.',
      desc: 'Talk to a specialist and see LETMESEE applied to your scenario. Response within 1 business day, no commitment.',
      whatsappCta: 'Prefer to talk now? Message us on WhatsApp',
      sentTitle: 'We received your message!',
      sentDesc: 'A specialist will reach out to you shortly.',
      calendlyCta: 'Prefer to schedule now? Pick a time',
      formTitle: 'Talk to a specialist',
      fields: {
        nome: { label: 'Name', placeholder: 'Your name' },
        empresa: { label: 'Company', placeholder: 'Company name' },
        email: { label: 'Business email', placeholder: 'you@company.com' },
        telefone: { label: 'WhatsApp', placeholder: '(00) 00000-0000' },
      },
      submitCta: 'I want to talk to a specialist',
      disclaimer: 'By submitting, you agree to be contacted by Lenext. Your data is handled in accordance with LGPD.',
    },

    footer: {
      tagline: 'LETMESEE Platform — the best solution for credit and collections.',
      badges: ['LGPD', 'ISO 27001'],
      apoioTitle: 'Lenext supports',
      institucionalTitle: 'Company',
      institucional: ['Privacy Policy', 'Terms of Use', 'API Documentation', 'Service Status'],
      contatoTitle: 'Contact',
      copyright: 'Lenext Technology. All rights reserved.',
    },

    whatsappFloat: {
      ariaLabel: 'Chat on WhatsApp',
    },

    resources: {
      backToSite: 'Back to site',
      hub: {
        eyebrow: 'Free resources',
        title: 'Content for teams that decide credit intelligently',
        subtitle: 'Guides, templates, and best practices to sell more on terms, safely — made by people who understand B2B credit.',
      },
      ebook: {
        eyebrow: 'Free e-book',
        badge: 'Exclusive material',
        title: 'Credit Policy: how to scale credit sales without raising default rates',
        subtitle: 'A practical guide to build (or review) your company’s credit policy and cut default risk without slowing down sales.',
        bullets: [
          'How to set score, limit, and terms for each customer profile',
          'Ready-to-use approval and denial rule templates',
          'The step-by-step to reduce default without losing sales',
          'A checklist to automate your credit analysis',
        ],
        formTitle: 'Fill in to download for free',
        fields: {
          name: { label: 'Name', placeholder: 'Your name' },
          email: { label: 'Business email', placeholder: 'you@company.com' },
        },
        consent: 'I authorize Lenext to contact me by email, WhatsApp, or phone.',
        download: 'Download free e-book',
        disabledHint: 'Fill in your name, email, and check the authorization to unlock the download.',
        privacy: 'Your data is handled in accordance with LGPD. No spam.',
        pageMeta: 'Free e-book: Credit Policy | Lenext LETMESEE',
        thanks: {
          eyebrow: 'Download unlocked',
          title: 'All set! Your e-book is downloading.',
          desc: 'Enjoy the read — in a few minutes you’ll have a clear roadmap to structure your credit policy.',
          redownload: 'Download didn’t start? Click to download again',
          nextTitle: 'Ready to go beyond the e-book?',
          nextDesc: 'See how LETMESEE applies all of this automatically in your operation — from bureaus to collections.',
          ctaDemo: 'Schedule a demo',
          ctaExplore: 'Explore the platform',
          proof: '+150 companies already decide credit with Lenext',
        },
      },
      prompt: {
        eyebrow: 'AI prompt · Ready to use',
        badge: '100% free',
        title: 'A ready-to-use AI prompt for Credit Analysis',
        subtitle: 'Use AI to interpret data, assess risk, and make credit decisions with more confidence.',
        chips: ['Practical use', 'Risk analysis', 'More agility', '100% free', 'AI', 'Credit analysis'],
        bullets: [
          'Practical, immediate use in your analysis workflow',
          'Interprets data and assesses credit risk with AI',
          'More agility and confidence in decision-making',
          'Finds regulatory filings on CVM (ITR, DFP, releases)',
        ],
        formTitle: 'Fill in to access the prompt',
        fields: {
          name: { label: 'Name', placeholder: 'Your name' },
          email: { label: 'Business email', placeholder: 'you@company.com' },
        },
        consent: 'I authorize Lenext to contact me by email, WhatsApp, or phone.',
        unlock: 'Access the free prompt',
        disabledHint: 'Fill in your name, email, and check the authorization to unlock the prompt.',
        privacy: 'Your data is handled in accordance with LGPD. No spam.',
        pageMeta: 'AI Prompt for Credit Analysis | Lenext LETMESEE',
        promptText: `Você é um especialista em documentos regulatórios da CVM (Comissão de Valores Mobiliários do Brasil). Sua tarefa é localizar o link direto do relatório de resultados ou ITR/DFP mais recente de uma empresa específica.

Empresa: [INSIRA O NOME DA EMPRESA OU TICKER — ex.: Natura Cosméticos S.A. / Natura &Co Holding S.A. / NATU3]

Busque no sistema oficial da CVM (https://www.rad.cvm.gov.br/ENET/ ou https://www.cvm.gov.br) os documentos mais recentes das seguintes categorias, na ordem de prioridade:
1. ITR (Informações Trimestrais).
2. DFP (Demonstrações Financeiras Padronizadas).
3. Relatório de Resultados / Release de Resultados.
4. Fato Relevante com demonstrações financeiras.

Instruções obrigatórias:
- Retorne apenas o documento mais recente disponível (priorize 2025 ou 2026).
- Forneça: tipo exato do documento (ex.: ITR 1T26, DFP 2025), data do documento e data de envio à CVM.
- Link DIRETO para download do PDF (preferencialmente frmDownloadDocumento.aspx ou frmExibirArquivoIPEExterno.aspx).
- Se não encontrar link direto, forneça o link da página de consulta da empresa na CVM + instruções exatas de 1 clique para baixar.
- Liste também o 2º e 3º documentos mais recentes para comparação.
- Se houver mais de uma empresa com nome parecido, confirme o CNPJ ou código CVM correto.
- Caso não encontre nada, explique exatamente o que pesquisou e sugira o próximo passo.

Responda de forma curta e direta, só com os fatos pedidos. Não adicione explicações desnecessárias.`,
        thanks: {
          eyebrow: 'Prompt unlocked',
          title: 'All set! Your prompt is ready to use.',
          desc: 'Copy the prompt below and paste it into your favorite AI tool (ChatGPT, Claude, Gemini) to start now.',
          copy: 'Copy prompt',
          copied: 'Copied!',
          nextTitle: 'Ready to go beyond the prompt?',
          nextDesc: 'See how LETMESEE already runs end-to-end credit analysis — from bureaus to decision — automatically.',
          ctaDemo: 'Schedule a demo',
          ctaExplore: 'Explore the platform',
          proof: '+150 companies already decide credit with Lenext',
        },
      },
    },

    whatsappMessage: 'Hi! I found LETMESEE’s page and I’d like to talk to a consultant.',
  },
}

export const defaultLanguage = 'pt'
