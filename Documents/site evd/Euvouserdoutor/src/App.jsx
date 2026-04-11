import React, { useState } from 'react';
import {
  Menu, Search, Target, Send, Download, BookOpen, Brain,
  Instagram, CheckCircle, Zap, Users, CheckSquare, Percent,
  CalendarDays, FileText, BarChart, Activity, ArrowLeft, Stethoscope
} from 'lucide-react';

const theme = {
  topColor: '#0A192F',
  bottomColor: '#2E70CE',
  lightBg: '#F4F7FB',
  gradientHeader: 'bg-gradient-to-r from-[#0A192F] via-[#11294D] to-[#2E70CE]',
  textAccent: 'text-[#2E70CE]',
  borderAccent: 'border-[#2E70CE]',
  bgAccent: 'bg-[#2E70CE]',
  shadowSoft: 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
  shadowHover: 'hover:shadow-[0_8px_30px_rgb(46,112,206,0.12)]'
};

const newsArticles = [
  {
    id: 1,
    tag: "Inspiração & Rotina",
    title: "O fenómeno '@euvouserdoutor': Como a rotina na Medicina UFMG inspira 135 mil vestibulandos",
    excerpt: "Jefferson Queiroz mostra a realidade do curso para motivar os alunos que lutam pela aprovação, democratizando o acesso a materiais focados no ENEM.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    date: "Hoje às 08h15",
    author: "Editoria de Educação",
    isFeatured: true
  },
  {
    id: 2,
    tag: "Estratégia ENEM",
    title: "Flashcards Aprovado: O segredo para reter matérias de Ciências da Natureza",
    excerpt: "Como configurar as suas revisões para garantir os 92% em Biologia e não esquecer as fórmulas no dia do exame.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    date: "Ontem às 14h30",
    isFeatured: false
  },
  {
    id: 3,
    tag: "Redação Nota 1000",
    title: "A estrutura de redação que elevou a média dos alunos para 920 pontos",
    excerpt: "A Mentoria Aprovado revela os esqueletos e o repertório sociocultural essenciais para as bancas da FUVEST e ENEM.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    date: "10/04/2026",
    isFeatured: false
  },
  {
    id: 4,
    tag: "Saúde Mental",
    title: "Ansiedade no ano de vestibular: Como blindar a mente até à aprovação",
    excerpt: "A importância de um cronograma flexível e de uma comunidade de apoio como o grupo VIP no Telegram.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    date: "09/04/2026",
    isFeatured: false
  }
];

const PortalHeader = ({ currentView, goHome, goNews, goMaterials, goCommunity }) => (
  <div className="w-full">
    <div className="bg-[#2E70CE] text-white py-1.5 px-4 md:px-10 flex justify-center items-center text-[10px] font-bold uppercase tracking-widest gap-2">
      <Zap size={12} className="text-yellow-300 animate-pulse" />
      <span>Atualização: Novos Flashcards Aprovado (Biologia & Química) já disponíveis!</span>
    </div>

    <div className="bg-[#f8f8f8] border-b border-gray-200 py-2 px-4 md:px-10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
      <div className="flex gap-6 overflow-x-auto no-scrollbar">
        <span onClick={goHome} className={`cursor-pointer hover:text-[#2E70CE] transition-colors whitespace-nowrap ${currentView === 'home' ? theme.textAccent + ' font-black border-b-2 ' + theme.borderAccent : ''}`}>Home</span>
        <span onClick={goNews} className={`cursor-pointer hover:text-[#2E70CE] transition-colors whitespace-nowrap ${currentView === 'news' ? theme.textAccent + ' font-black border-b-2 ' + theme.borderAccent : ''}`}>Notícias</span>
        <span onClick={goMaterials} className={`cursor-pointer hover:text-[#2E70CE] transition-colors whitespace-nowrap ${currentView === 'materials' ? theme.textAccent + ' font-black border-b-2 ' + theme.borderAccent : ''}`}>Materiais de Estudo</span>
        <span onClick={goCommunity} className={`cursor-pointer hover:text-[#2E70CE] transition-colors whitespace-nowrap ${currentView === 'community' ? theme.textAccent + ' font-black border-b-2 ' + theme.borderAccent : ''}`}>Mentoria Aprovado</span>
      </div>
    </div>

    <div className={`${theme.gradientHeader} text-white py-5 px-4 md:px-10 flex justify-between items-center sticky top-0 z-50 shadow-lg`}>
      <div className="flex items-center gap-4">
        <Menu className="cursor-pointer hover:text-blue-200 transition-colors" size={24} />
        <h1 onClick={goHome} className="text-3xl font-black tracking-tighter cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform origin-left">
          <Target size={28} className="text-blue-300" /> MED<span className="font-light opacity-80">STATION</span>
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-[#0A192F]/40 backdrop-blur-sm rounded-full px-4 py-2 gap-2 border border-white/10 focus-within:border-white/40 transition-colors">
          <Search size={16} className="text-blue-200" />
          <input type="text" placeholder="Procurar resumos, simulados..." className="bg-transparent border-none outline-none text-xs placeholder:text-blue-200/50 w-48 text-white" />
        </div>
        <button onClick={goMaterials} className="bg-white text-[#0A192F] text-xs font-black uppercase px-4 py-2 rounded-full hover:bg-blue-100 transition-colors hidden sm:block shadow-md">
          Aceder aos Materiais
        </button>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-[#0A192F] pt-16 pb-8 px-4 mt-10 text-white border-t-4 border-[#2E70CE]">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="flex flex-col items-center md:items-start gap-3">
        <h2 className="text-3xl font-black tracking-tighter flex items-center gap-2 text-white">
           <Target size={24} className="text-[#2E70CE]" /> MED<span className="font-light text-blue-200">STATION</span>
        </h2>
        <p className="text-xs text-blue-200/60 font-bold uppercase tracking-[0.3em] text-center md:text-left">O caminho mais curto para a Medicina.</p>
        <p className="text-sm font-medium mt-4">Junte-se aos <span className="text-green-400 font-black">135K futuros doutores</span> na nossa comunidade.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-4 text-xs font-bold text-blue-100/80 uppercase text-center md:text-left">
        <span className="hover:text-white cursor-pointer transition-colors">Flashcards ENEM</span>
        <span className="hover:text-white cursor-pointer transition-colors">Mentoria Aprovado</span>
        <span className="hover:text-white cursor-pointer transition-colors">Simulados FUVEST</span>
        <span className="hover:text-white cursor-pointer transition-colors">@euvouserdoutor</span>
      </div>
    </div>

    <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-blue-400 font-bold gap-4 uppercase tracking-widest">
      <div>© Copyright 2026 Portal MedStation & Eu Vou Ser Doutor.</div>
      <div className="flex flex-wrap justify-center gap-4 items-center">
        <span className="text-white">Jefferson Queiroz</span>
        <span className="hidden md:inline text-blue-800">•</span>
        <span>Aprovação Medicina UFMG</span>
      </div>
    </div>
  </footer>
);

const Sidebar = ({ openArticle }) => (
  <div className="sticky top-24 space-y-6">
    <div className={`bg-white rounded-2xl p-6 border border-gray-100 ${theme.shadowSoft}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2E70CE] to-[#0A192F] p-1">
             <img src="https://i.imgur.com/w9OO6uT.jpeg" alt="Jefferson Queiroz | MEDICINA UFMG" className="w-full h-full rounded-full border-2 border-white object-cover object-top" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h3 className="font-black text-sm md:text-base text-gray-900 flex items-center gap-1 leading-tight">
            Jefferson Queiroz <CheckCircle size={14} className={theme.textAccent} fill="currentColor" />
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-1">Aprovado em Medicina | UFMG</p>
        </div>
      </div>

      <p className="text-xs text-gray-700 mb-5 leading-relaxed text-center italic">
        "Ajudando você a conquistar a sua vaga.<br/>Criador da Mentoria Aprovado."
      </p>

      <div className="flex justify-center gap-6 mb-6 pb-6 border-b border-gray-100">
        <div className="text-center">
          <span className="block font-black text-lg text-gray-800">126</span>
          <span className="text-[10px] text-gray-500 uppercase font-bold">Posts</span>
        </div>
        <div className="text-center">
          <span className="block font-black text-lg text-gray-800">135K</span>
          <span className="text-[10px] text-gray-500 uppercase font-bold">Vestibulandos</span>
        </div>
        <div className="text-center">
          <span className="block font-black text-lg text-gray-800">85%</span>
          <span className="text-[10px] text-gray-500 uppercase font-bold">Aprovações</span>
        </div>
      </div>

      <a href="https://instagram.com/euvouserdoutor" target="_blank" rel="noopener noreferrer" className={`w-full flex items-center justify-center gap-2 ${theme.bgAccent} text-white font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm`}>
        <Instagram size={16} /> Seguir no Instagram
      </a>
    </div>

    <div className={`bg-white rounded-2xl p-6 border border-gray-100 ${theme.shadowSoft}`}>
      <h3 className="font-black text-xs text-gray-400 mb-4 uppercase tracking-widest flex items-center gap-2">
        <Target size={14} /> Mais Lidas pelos Alunos
      </h3>
      <div className="space-y-4">
        {newsArticles.slice(0,3).map((news, index) => (
          <div key={news.id} onClick={() => openArticle(news.id)} className="group cursor-pointer flex gap-3 items-start">
            <span className="text-2xl font-black text-gray-200 group-hover:text-[#2E70CE] transition-colors leading-none">{index + 1}</span>
            <div>
              <h4 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-[#2E70CE] transition-colors mb-1 line-clamp-2">
                {news.title}
              </h4>
              <span className="text-[10px] text-gray-400 font-medium">{news.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
      <h4 className="font-black text-[#0A192F] mb-2">Simulados Gratuitos</h4>
      <p className="text-xs text-gray-600 mb-4">Aceda a mais de 100 simulados (ENEM e FUVEST) focados na sua aprovação.</p>
      <a href="https://t.me/Euvouserdoutor" target="_blank" rel="noopener noreferrer" className="block w-full bg-[#2E70CE] text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-600 transition-colors">
        Baixar Simulados
      </a>
    </div>
  </div>
);

const HomePage = ({ goMaterials, goCommunity, goNews }) => {
  return (
    <div className="animate-in fade-in duration-700 bg-white">
      <section className="relative w-full overflow-hidden bg-[#0A192F] text-white pt-24 pb-40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 to-[#2E70CE]/90"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-flex items-center gap-2">
              <Users size={14}/> +135.000 VESTIBULANDOS INSPIRADOS
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
              Democratizando o <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Acesso à Medicina</span>
            </h1>
            <p className="text-xl text-blue-100 font-light leading-relaxed mb-10">
              O ecossistema completo que integra a <strong>Mentoria Aprovado</strong> e os <strong>Flashcards Aprovado</strong> para garantir a sua vaga nas melhores universidades.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button onClick={goMaterials} className="w-full sm:w-auto bg-white text-[#0A192F] px-8 py-3.5 rounded-full font-bold shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <Download size={18} /> Materiais Gratuitos
              </button>
              <button onClick={goNews} className="w-full sm:w-auto bg-[#2E70CE] text-white border border-blue-400/30 px-8 py-3.5 rounded-full font-bold shadow-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <BookOpen size={18}/> Dicas de Estudo
              </button>
            </div>
          </div>

          <div className="md:w-1/2 relative hidden md:block">
            <div className="w-full h-[500px] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl relative">
              <img src="https://i.imgur.com/w9OO6uT.jpeg" alt="Jefferson Queiroz | UFMG" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                 <p className="text-sm font-bold text-white flex items-center gap-2"><CheckSquare size={16} className="text-green-400"/> Redação: 920 (Média dos Alunos)</p>
                 <p className="text-sm font-bold text-white flex items-center gap-2 mt-1"><Percent size={16} className="text-blue-300"/> Biologia: 92% | Química: 88%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg className="relative block w-full h-[100px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 120 1200 120z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-4">Os Pilares da Aprovação</h2>
          <p className="text-gray-500 font-medium">O que sustenta a Mentoria Aprovado e o projeto Eu Vou Ser Doutor.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-8 rounded-2xl bg-slate-50 border border-gray-100 hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 mx-auto bg-blue-100 text-[#2E70CE] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2E70CE] group-hover:text-white transition-colors transform group-hover:-translate-y-2 duration-300">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-black text-[#0A192F] mb-3">Inspiração Real</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mostramos a realidade da UFMG para motivar a sua jornada. Ver o que o espera no internato é o maior combustível para os meses de estudo.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-slate-50 border border-gray-100 hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 mx-auto bg-blue-100 text-[#2E70CE] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2E70CE] group-hover:text-white transition-colors transform group-hover:-translate-y-2 duration-300">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-black text-[#0A192F] mb-3">Estratégia de Prova</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              O ecossistema dos <strong>Flashcards Aprovado</strong> e os cronogramas focados na FUVEST e no ENEM maximizam a sua retenção nas matérias de peso.
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-slate-50 border border-gray-100 hover:shadow-xl transition-shadow group">
            <div className="w-16 h-16 mx-auto bg-blue-100 text-[#2E70CE] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2E70CE] group-hover:text-white transition-colors transform group-hover:-translate-y-2 duration-300">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-black text-[#0A192F] mb-3">Comunidade de Vencedores</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Você não estuda sozinho. A nossa comunidade partilha resoluções, dúvidas e muito apoio emocional na <strong>Mentoria Aprovado</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 border-y border-gray-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
             <h2 className="text-4xl font-black text-[#0A192F] mb-6 leading-tight">O que os nossos aprovados dizem</h2>
             <p className="text-gray-600 mb-8 leading-relaxed">Os <strong>Flashcards Aprovado</strong> e os nossos simulados ajudaram a alcançar 85% de taxa de aprovação entre os mentorados ativos.</p>
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
                <QuoteIcon />
                <p className="text-gray-700 italic relative z-10 mb-4">"A estratégia da Mentoria Aprovado aliada aos cronogramas de revisão fez-me alcançar 920 na redação e dominar a prova de Natureza. A biblioteca do grupo é essencial."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2E70CE] rounded-full text-white flex items-center justify-center font-bold">M</div>
                  <div><p className="font-bold text-gray-900 text-sm">Mariana C.</p><p className="text-xs text-gray-500">Caloira de Medicina</p></div>
                </div>
             </div>
          </div>
          <div className="md:w-1/2">
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Comunidade de Alunos" className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

const QuoteIcon = () => (
  <svg className="absolute top-4 left-4 w-12 h-12 text-gray-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
);

const NewsPage = ({ openArticle }) => {
  const featured = newsArticles.find(n => n.isFeatured);
  const others = newsArticles.filter(n => !n.isFeatured);

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tighter">Artigos & <span className={theme.textAccent}>Dicas</span></h2>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            Acompanhe as estratégias de estudo, saúde mental e organização para o vestibular.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3">
          <div className={`cursor-pointer group relative bg-white rounded-3xl p-3 border border-gray-100 ${theme.shadowSoft} ${theme.shadowHover} transition-all mb-10`} onClick={() => openArticle(featured.id)}>
            <div className="relative overflow-hidden rounded-2xl mb-5">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
              <img src={featured.image} alt={featured.title} className="w-full h-[350px] md:h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="bg-white/90 backdrop-blur-md text-[#0A192F] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">{featured.tag}</span>
              </div>
            </div>
            <div className="px-2 pb-2">
              <h2 className="text-2xl md:text-3xl font-black text-[#0A192F] mb-3 leading-tight group-hover:text-[#2E70CE] transition-colors">{featured.title}</h2>
              <p className="text-gray-600 font-medium mb-4 leading-relaxed line-clamp-2">{featured.excerpt}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {others.map(news => (
              <div key={news.id} className="cursor-pointer group flex flex-col" onClick={() => openArticle(news.id)}>
                <div className="overflow-hidden rounded-lg mb-3 shadow-sm h-48 relative">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-[#0A192F] text-white text-[9px] font-bold px-2 py-1 rounded">{news.tag}</div>
                </div>
                <h3 className={`text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:${theme.textAccent} transition-colors`}>{news.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 flex-grow">{news.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3">
          <Sidebar openArticle={openArticle} />
        </div>
      </div>
    </div>
  );
};

const MaterialsPage = () => {
  return (
    <div className="animate-in fade-in duration-500 bg-[#F4F7FB] min-h-[70vh] pb-20">
      <div className="bg-[#0A192F] pt-20 pb-24 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-blue-900/20 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-overlay"></div>
         <div className="relative z-10 px-4">
           <Download size={48} className="mx-auto text-[#2E70CE] mb-6" />
           <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">Materiais Gratuitos</h1>
           <p className="text-blue-200 text-lg max-w-2xl mx-auto">100+ Simulados, Provas Antigas, Repertório para Redação e as ferramentas que você precisa para ser aprovado.</p>
         </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="mb-16">
          <h2 className="text-2xl font-black text-[#0A192F] mb-6 flex items-center gap-2"><Target className="text-[#2E70CE]"/> Mentoria Aprovado - ENEM / FUVEST</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
              <CalendarDays size={32} className="text-[#2E70CE] mb-4"/>
              <h3 className="text-xl font-black text-gray-900 mb-3">Cronograma de Aprovação</h3>
              <ul className="text-sm text-gray-600 mb-6 space-y-2 flex-grow">
                <li><strong className="text-gray-900">100 Dias:</strong> Planeamento ENEM</li>
                <li><strong className="text-gray-900">Revisão Reta Final:</strong> FUVEST/UNICAMP</li>
                <li>Metas semanais de estudo</li>
              </ul>
              <a href="https://t.me/Euvouserdoutor" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">Aceder ao Cronograma</a>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
              <CheckSquare size={32} className="text-green-600 mb-4"/>
              <h3 className="text-xl font-black text-gray-900 mb-3">100+ Simulados PDF</h3>
              <ul className="text-sm text-gray-600 mb-6 space-y-2 flex-grow">
                <li>Simulados Inéditos (SOMOS)</li>
                <li>Provas Antigas GAB D2</li>
                <li>Simulados FUVEST 1ª Fase</li>
                <li className="italic">Estratégia: 1 prova/semana</li>
              </ul>
              <a href="https://t.me/Euvouserdoutor" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">Descarregar Simulados</a>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
              <Percent size={32} className="text-pink-500 mb-4"/>
              <h3 className="text-xl font-black text-gray-900 mb-3">Flashcards Aprovado</h3>
              <ul className="text-sm text-gray-600 mb-6 space-y-2 flex-grow">
                <li><strong className="text-green-600">Biologia e Química</strong></li>
                <li><strong className="text-blue-600">Fórmulas de Física</strong></li>
                <li>Revisão ativa para reter 100% da matéria até ao dia da prova</li>
              </ul>
              <a href="https://t.me/Euvouserdoutor" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">Obter Flashcards Aprovado</a>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#0A192F] mb-6 flex items-center gap-2 border-t border-gray-200 pt-10"><BookOpen className="text-[#2E70CE]"/> Biblioteca do Vestibulando - Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#0A192F] rounded-3xl p-8 shadow-xl border border-blue-900 flex flex-col h-full text-white">
              <FileText size={32} className="text-blue-400 mb-4"/>
              <h3 className="text-xl font-black mb-3">Repertório Redação Nota 1000</h3>
              <ul className="text-sm text-blue-200 mb-6 space-y-2 flex-grow">
                <li>📄 Esqueletos de Redação</li>
                <li>📄 Citações Coringa (Filosofia/Sociologia)</li>
                <li>📄 Análise de temas quentes</li>
              </ul>
              <a href="https://t.me/Euvouserdoutor" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-[#2E70CE] text-white font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">Aceder ao Drive</a>
            </div>
            <div className="bg-gradient-to-br from-[#2E70CE] to-blue-800 rounded-3xl p-8 shadow-xl border border-blue-400 flex flex-col h-full text-white">
              <Brain size={32} className="text-white mb-4"/>
              <h3 className="text-xl font-black mb-3">Mapas Mentais - Natureza</h3>
              <ul className="text-sm text-blue-100 mb-6 space-y-2 flex-grow">
                <li>Biologia Celular e Genética</li>
                <li>Estequiometria Descomplicada</li>
                <li>Física: Mecânica Clássica</li>
              </ul>
              <a href="https://t.me/Euvouserdoutor" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-white text-[#2E70CE] font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">Baixar Mapas em PDF</a>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full">
              <BarChart size={32} className="text-purple-500 mb-4"/>
              <h3 className="text-xl font-black text-gray-900 mb-3">Grupo VIP Telegram</h3>
              <ul className="text-sm text-gray-600 mb-6 space-y-2 flex-grow">
                <li><strong className="text-gray-900">Resolução de Dúvidas</strong></li>
                <li><strong className="text-gray-900">Aviso de Novos Materiais</strong></li>
                <li>Acompanhamento da Comunidade</li>
              </ul>
              <a href="https://t.me/Euvouserdoutor" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">Entrar no Grupo</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunityPage = () => {
  return (
    <div className="animate-in fade-in duration-500 bg-white pb-20">
      <div className={`${theme.gradientHeader} pt-20 pb-24 px-4 text-center text-white relative overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Users size={48} className="mx-auto text-blue-300 mb-6" />
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">O Impacto da <br/><span className="text-blue-300">Mentoria Aprovado</span></h1>
          <p className="text-xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed">A comunidade que mais cresce no Brasil, guiando vestibulandos focados em alcançar a tão sonhada vaga em Medicina.</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-center font-bold text-gray-400 uppercase tracking-widest mb-8">Nossa Rede em Números</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center border-r border-gray-100 last:border-0">
              <Instagram size={32} className="mx-auto text-pink-500 mb-3" />
              <p className="text-4xl font-black text-[#0A192F]">135K</p>
              <p className="text-xs text-gray-500 uppercase font-bold mt-1">Vestibulandos no IG</p>
            </div>
            <div className="text-center border-r border-gray-100 last:border-0">
              <FileText size={32} className="mx-auto text-green-500 mb-3" />
              <p className="text-4xl font-black text-[#0A192F]">100+</p>
              <p className="text-xs text-gray-500 uppercase font-bold mt-1">Simulados Inéditos</p>
            </div>
            <div className="text-center border-r border-gray-100 last:border-0">
              <Brain size={32} className="mx-auto text-purple-500 mb-3" />
              <p className="text-4xl font-black text-[#0A192F]">1.2K+</p>
              <p className="text-xs text-gray-500 uppercase font-bold mt-1">Flashcards Aprovado</p>
            </div>
            <div className="text-center">
              <Activity size={32} className="mx-auto text-[#2E70CE] mb-3" />
              <p className="text-4xl font-black text-[#0A192F]">85%</p>
              <p className="text-xs text-gray-500 uppercase font-bold mt-1">Aprovações na Mentoria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticlePage = ({ articleId, goNews, openArticle }) => {
  const article = newsArticles.find(n => n.id === articleId) || newsArticles[0];
  return (
    <div className={`animate-in slide-in-from-bottom-8 duration-700 bg-[${theme.lightBg}] pb-20`}>
      <div className={`${theme.gradientHeader} text-white pt-12 pb-24 px-4 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4"><Target size={400} /></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <button onClick={goNews} className="flex items-center gap-2 text-xs font-bold text-blue-200 hover:text-white transition-colors mb-8 uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full w-fit backdrop-blur-md">
            <ArrowLeft size={14} /> Voltar para Notícias
          </button>
          <div className="inline-flex items-center gap-2 bg-[#2E70CE] text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest mb-6">{article.tag}</div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 tracking-tighter">{article.title}</h1>
          <p className="text-lg md:text-2xl text-blue-100 font-light leading-relaxed max-w-3xl mb-8">{article.excerpt}</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-10 -mt-16 relative z-20">
        <div className="lg:w-2/3">
          <div className={`bg-white p-2 rounded-3xl ${theme.shadowSoft} mb-10`}>
            <div className="relative overflow-hidden rounded-2xl group cursor-pointer">
              <img src={article.image} alt={article.title} className="w-full h-[400px] object-cover" />
            </div>
          </div>
          <div className={`bg-white rounded-3xl p-8 md:p-12 ${theme.shadowSoft} border border-gray-100`}>
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 font-serif leading-relaxed">
              <p className="dropcap"><strong>A rotina de um vestibulando</strong> é frequentemente marcada por incertezas, pressão e montanhas de livros. No entanto, Jefferson Queiroz, que superou esses desafios e hoje cursa Medicina na Universidade Federal de Minas Gerais (UFMG), decidiu encurtar o caminho de quem vem atrás através da <strong>Mentoria Aprovado</strong>.</p>
              <h3 className="font-sans font-black text-2xl text-[#0A192F] mt-12 mb-6">A Metodologia por trás da Aprovação</h3>
              <p>O sucesso nas provas do ENEM e FUVEST repousa sobre pilares sólidos de aprendizado estratégico, refletidos nos <em>Flashcards Aprovado</em>. Técnicas como revisão direcionada e simulação real do dia da prova provaram ser mais eficazes que o simples resumo em papel.</p>
              <blockquote className={`font-sans border-l-4 ${theme.borderAccent} pl-6 my-10 italic text-xl font-medium text-gray-600 bg-slate-50 py-4 pr-6 rounded-r-2xl`}>"O acesso à educação médica de qualidade não precisa de ser um privilégio de poucos. A Mentoria Aprovado foi criada para dar um mapa claro e materiais focados que realmente impactam a nota, como os nossos simulados e dicas de redação."</blockquote>
              <p>Acompanhando de perto a realidade dos hospitais, a rotina partilhada no Instagram @euvouserdoutor serve como o combustível perfeito. Com um histórico acadêmico forte, a credibilidade do material distribuído é garantida, e a comunidade continua a partilhar conhecimento de forma acessível e transformadora.</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3"><Sidebar openArticle={openArticle} /></div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  const goHome = () => { window.scrollTo(0,0); setCurrentView('home'); };
  const goNews = () => { window.scrollTo(0,0); setCurrentView('news'); };
  const goMaterials = () => { window.scrollTo(0,0); setCurrentView('materials'); };
  const goCommunity = () => { window.scrollTo(0,0); setCurrentView('community'); };
  const openArticle = (id) => { window.scrollTo(0,0); setCurrentView(id); };

  return (
    <div className="min-h-screen bg-[#F4F7FB] selection:bg-[#2E70CE] selection:text-white font-sans">
      <PortalHeader currentView={typeof currentView === 'number' ? 'news' : currentView} goHome={goHome} goNews={goNews} goMaterials={goMaterials} goCommunity={goCommunity} />
      <main className="min-h-[70vh]">
        {currentView === 'home' && <HomePage goMaterials={goMaterials} goCommunity={goCommunity} goNews={goNews} />}
        {currentView === 'news' && <NewsPage openArticle={openArticle} />}
        {currentView === 'materials' && <MaterialsPage />}
        {currentView === 'community' && <CommunityPage />}
        {typeof currentView === 'number' && <ArticlePage articleId={currentView} goNews={goNews} openArticle={openArticle} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
