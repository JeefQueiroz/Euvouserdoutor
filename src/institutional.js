export const institutional = {
  name: 'Eu vou ser Doutor',
  legalName: 'Eu vou ser Doutor',
  owner: 'Jefferson Viana Queiroz',
  address: 'Rua Ana Dias Duarte, 191, apto 902, Belo Horizonte/MG, CEP 31742-273, Brasil',
  phone: '+55 (31) 99156-9089',
  alternatePhone: '+55 (31) 98297-2421',
  email: 'jeffqueiroz@icloud.com',
  alternateEmail: 'jeffqueiroz123@gmail.com',
  legalEmail: 'contato@euvouserdoutor.com',
  legalAlternateEmail: 'jeffqueiroz123@gmail.com',
  site: 'https://www.euvouserdoutor.com',
  siteLabel: 'www.euvouserdoutor.com',
  facebook: 'https://www.facebook.com/Euvouserdoutor/',
  youtube: 'https://youtube.com/@Euvouserdoutor',
  instagram: 'https://instagram.com/euvouserdoutor',
  telegram: 'https://t.me/Euvouserdoutor',
  whatsapp: 'https://wa.me/5531991569089',
  metaBusinessPortfolioId: '637476149251537',
  metaPage: 'Eu Vou Ser Doutor Curiosidades Médicas',
  trademarkProcess: '921406193',
  description:
    'Projeto digital de educação, organização acadêmica e conteúdo para estudantes e vestibulandos de Medicina.',
  medicalNotice:
    'O conteúdo do EuVouSerDoutor é educacional e informativo. Não substitui consulta médica, diagnóstico, tratamento ou orientação profissional individualizada.',
};

export const routeMeta = {
  home: {
    title: 'Eu Vou Ser Doutor | Organização, rotina e evolução em Medicina',
    description:
      'Conteúdos, materiais, notícias e mentoria para estudantes e vestibulandos de Medicina que querem estudar com mais direção.',
    path: '/',
  },
  about: {
    title: 'Sobre | EuVouSerDoutor',
    description:
      'Conheça o EuVouSerDoutor, projeto educacional criado para apoiar estudantes e vestibulandos de Medicina com organização, rotina e conteúdo informativo.',
    path: '/sobre',
  },
  contact: {
    title: 'Contato | EuVouSerDoutor',
    description:
      'Fale com o EuVouSerDoutor pelos canais oficiais para dúvidas, materiais, mentoria, parcerias e assuntos institucionais.',
    path: '/contato',
  },
  privacy: {
    title: 'Política de Privacidade | Eu Vou Ser Doutor',
    description:
      'Entenda como o Eu Vou Ser Doutor coleta, usa e protege dados pessoais de acordo com a legislação aplicável.',
    path: '/politica-de-privacidade',
  },
  terms: {
    title: 'Termos de Uso | Eu Vou Ser Doutor',
    description:
      'Regras de uso, propriedade intelectual, responsabilidades e condições de acesso ao site Eu Vou Ser Doutor.',
    path: '/termos-de-uso',
  },
  medicalDisclaimer: {
    title: 'Aviso de Responsabilidade Médica | Eu Vou Ser Doutor',
    description:
      'Informações importantes sobre o caráter educacional dos conteúdos médicos publicados no Eu Vou Ser Doutor.',
    path: '/aviso-de-responsabilidade-medica',
  },
  intellectualProperty: {
    title: 'Propriedade Intelectual | Eu Vou Ser Doutor',
    description:
      'Informações sobre direitos autorais, marca, uso permitido e proteção dos conteúdos do Eu Vou Ser Doutor.',
    path: '/propriedade-intelectual',
  },
  cookies: {
    title: 'Política de Cookies | Eu Vou Ser Doutor',
    description:
      'Entenda como o Eu Vou Ser Doutor utiliza cookies e tecnologias semelhantes no site.',
    path: '/politica-de-cookies',
  },
  news: {
    title: 'Notícias e Estratégias | EuVouSerDoutor',
    description:
      'Artigos, notícias e estratégias de estudo para futuros médicos, vestibulandos e estudantes de Medicina.',
    path: '/noticias',
  },
  materials: {
    title: 'Materiais Gratuitos | EuVouSerDoutor',
    description:
      'Acesse materiais de apoio, flashcards, checklists, cronogramas e guias para organizar seus estudos.',
    path: '/materiais',
  },
  mentorship: {
    title: 'Mentoria | EuVouSerDoutor',
    description:
      'Acompanhamento educacional para organizar rotina, revisão e evolução nos estudos para Medicina.',
    path: '/mentoria',
  },
  flashcards: {
    title: 'Flashcards | Eu vou ser Doutor',
    description:
      'Conteúdo sobre revisão ativa, flashcards e organização de estudos.',
    path: '/flashcards',
  },
};

export const pathToView = Object.fromEntries(
  Object.entries(routeMeta).map(([view, meta]) => [meta.path, view])
);
