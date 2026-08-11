import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Download,
  GraduationCap,
  Layers,
  MessageCircle,
  Newspaper,
  Sparkles,
  Users,
} from 'lucide-react';
import { institutional } from '../institutional';

export const Home = ({ setView }) => {
  const profileImg = '/jeff-queiroz-eu-vou-ser-doutor.png';

  const featuredNews = {
    category: 'Ciência & Tecnologia',
    title: 'Nova pesquisa em neurociência revela avanços na compreensão de circuitos de memória em estudantes',
    excerpt: 'Estudo publicado recentemente aponta como a revisão espaçada e o estudo ativo alteram a retenção sináptica a longo prazo.',
    time: 'Há 2 horas',
    slug: 'artigo-neurociencia',
  };

  const latestNews = [
    {
      category: 'Vestibular & ENEM',
      title: 'Cronograma Sisu e notas de corte: O que esperar do próximo ciclo',
      excerpt: 'Análise detalhada das tendências de pontuação nas principais universidades federais.',
      time: 'Há 4 horas',
    },
    {
      category: 'Vida Acadêmica',
      title: 'A rotina no ciclo básico de Medicina: Como organizar plantões e teoria',
      excerpt: 'Dicas práticas de acadêmicos da UFMG para equilibrar o volume de conteúdo denso.',
      time: 'Há 6 horas',
    },
    {
      category: 'Inovação Médica',
      title: 'Inteligência artificial no diagnóstico precoce: O impacto na prática clínica',
      excerpt: 'Como ferramentas de apoio computacional estão transformando a precisão diagnóstica.',
      time: 'Há 8 horas',
    },
  ];

  const categoriesGrid = [
    {
      title: 'Medicina & Saúde',
      desc: 'Pesquisas, inovações e descobertas científicas explicadas com rigor.',
      icon: Sparkles,
      view: 'news',
    },
    {
      title: 'Vestibular & ENEM',
      desc: 'Estratégias de redação, vestibulares tradicionais e notas de corte.',
      icon: GraduationCap,
      view: 'news',
    },
    {
      title: 'Vida Acadêmica',
      desc: 'Rotina na faculdade de Medicina, estágio e métodos de estudo ativo.',
      icon: BookOpen,
      view: 'news',
    },
    {
      title: 'Materiais & Guias',
      desc: 'Flashcards, checklists e cronogramas gratuitos para download.',
      icon: Layers,
      view: 'materials',
    },
  ];

  return (
    <div className="animate-in text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      {/* Hero Section - Editorial Portal Style */}
      <section className="relative w-full overflow-hidden bg-[#080A0F] border-b border-white/[0.08] pt-12 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.12),transparent_40%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-12">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4F8CFF] animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#98A2B3]">Portal Editorial & Pesquisa</span>
            </div>
            <div className="text-xs text-[#98A2B3] font-medium hidden sm:block">
              Fundado por <span className="text-white font-bold">Jeff Queiroz</span> (Medicina UFMG)
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Main Editorial Intro & Featured Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                Medicina · ENEM · Ciência · Futuro
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] text-[#F8FAFC]">
                Informação para quem vai entrar — e permanecer — na Medicina.
              </h1>
              <p className="text-lg text-[#98A2B3] leading-relaxed max-w-2xl font-normal">
                Notícias, pesquisas científicas, vestibulares, vida acadêmica e tecnologias médicas explicadas com rigor, profundidade e valor editorial.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setView('news')}
                  className="bg-[#4F8CFF] text-[#080A0F] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#7EA6FF] transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(79,140,255,0.3)]"
                >
                  Explorar Notícias <ArrowRight size={16} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => setView('mentorship')}
                  className="bg-[#11141A] text-white border border-white/[0.08] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#171B23] transition-all flex items-center gap-3"
                >
                  Conhecer Mentoria
                </button>
              </div>
            </div>

            {/* Right: Featured Article Card (Editorial style) */}
            <div className="lg:col-span-5">
              <div 
                onClick={() => setView('news')}
                className="bg-[#11141A] border border-white/[0.08] rounded-[32px] p-6 md:p-8 cursor-pointer group hover:border-[#4F8CFF]/40 transition-all shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8CFF]/5 rounded-full blur-2xl group-hover:bg-[#4F8CFF]/15 transition-all"></div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#4F8CFF]/10 text-[#4F8CFF] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {featuredNews.category}
                  </span>
                  <span className="text-xs text-[#98A2B3] flex items-center gap-1">
                    <Clock size={12} /> {featuredNews.time}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors mb-3 leading-snug">
                  {featuredNews.title}
                </h3>
                <p className="text-[#98A2B3] text-sm leading-relaxed mb-6">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs font-bold text-[#4F8CFF] uppercase tracking-wider pt-4 border-t border-white/[0.06]">
                  <span>Ler reportagem completa</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-b border-white/[0.08]">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#4F8CFF] font-black uppercase text-xs tracking-[0.2em] mb-2">Editorias Principais</p>
            <h2 className="text-3xl font-black text-[#F8FAFC] tracking-tight">O que você procura hoje?</h2>
          </div>
          <button onClick={() => setView('news')} className="text-xs font-bold text-[#98A2B3] hover:text-white uppercase tracking-widest flex items-center gap-2">
            Ver todas <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesGrid.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                onClick={() => setView(cat.view)}
                className="bg-[#11141A] border border-white/[0.08] rounded-3xl p-6 cursor-pointer hover:bg-[#171B23] hover:border-[#4F8CFF]/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#4F8CFF]/10 text-[#4F8CFF] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-black text-[#F8FAFC] mb-2">{cat.title}</h3>
                  <p className="text-sm text-[#98A2B3] leading-relaxed mb-6">{cat.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#4F8CFF] uppercase tracking-wider">
                  <span>Acessar</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest News & Editorial Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#4F8CFF] font-black uppercase text-xs tracking-[0.2em] mb-2">Fluxo Contínuo</p>
            <h2 className="text-3xl font-black text-[#F8FAFC] tracking-tight">Últimas Notícias & Artigos</h2>
          </div>
          <button onClick={() => setView('news')} className="text-xs font-bold text-[#4F8CFF] hover:underline uppercase tracking-widest">
            Acessar Redação &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {latestNews.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setView('news')}
              className="bg-[#11141A] border border-white/[0.08] rounded-3xl p-6 cursor-pointer hover:border-[#4F8CFF]/30 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/10 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-[#98A2B3] flex items-center gap-1">
                    <Clock size={12} /> {item.time}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-[#98A2B3] leading-relaxed mb-6">
                  {item.excerpt}
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-[#98A2B3] group-hover:text-white uppercase tracking-wider">
                <span>Continuar lendo</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Author Authority Banner */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="bg-[#11141A] border border-white/[0.08] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="w-28 h-28 shrink-0 rounded-full overflow-hidden border-2 border-[#4F8CFF] shadow-xl">
            <img src={profileImg} alt="Jeff Queiroz" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#4F8CFF] mb-2 block">Fundador & Editor Científico</span>
            <h3 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-3">Jeff Queiroz · Medicina UFMG</h3>
            <p className="text-[#98A2B3] text-sm md:text-base leading-relaxed mb-6">
              Criador do portal <strong>EuVouSerDoutor</strong>. Pesquisa e produz conteúdos editoriais sobre medicina, inovação científica e métodos avançados de estudo para vestibulandos e acadêmicos.
            </p>
            <button
              onClick={() => setView('about')}
              className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
            >
              Conhecer a página do autor <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
