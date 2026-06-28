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
  metaBusinessPortfolioId: '637476149251537',
  metaPage: 'Eu Vou Ser Doutor Curiosidades Médicas',
  trademarkProcess: '921406193',
  description:
    'Projeto digital de educação, organização acadêmica e conteúdo para estudantes e vestibulandos de Medicina.',
};

export const routeMeta = {
  home: {
    title: 'Eu Vou Ser Doutor | Organização, rotina e evolução em Medicina',
    description:
      'Projeto digital de educação, organização acadêmica e conteúdo para estudantes e vestibulandos de Medicina.',
    path: '/',
  },
  about: {
    title: 'Sobre | Eu vou ser Doutor',
    description:
      'Conheça o Eu vou ser Doutor, projeto digital de educação, organização acadêmica e conteúdo para estudantes de Medicina.',
    path: '/sobre',
  },
  contact: {
    title: 'Contato | Eu vou ser Doutor',
    description:
      'Canais oficiais de contato institucional do Eu vou ser Doutor.',
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
    title: 'Noticias | Eu vou ser Doutor',
    description:
      'Conteúdos sobre organização acadêmica, rotina de estudos e curiosidades médicas.',
    path: '/noticias',
  },
  materials: {
    title: 'Materiais | Eu vou ser Doutor',
    description:
      'Materiais educacionais e conteudos de apoio para estudantes e vestibulandos de Medicina.',
    path: '/materiais',
  },
  mentorship: {
    title: 'Mentoria | Eu vou ser Doutor',
    description:
      'Informações sobre acompanhamento, rotina de estudos e organização acadêmica.',
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
