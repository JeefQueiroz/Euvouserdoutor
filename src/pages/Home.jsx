import {
  ArrowRight,
  BookOpen,
  Clock,
  Download,
  GraduationCap,
  Layers,
  Sparkles,
} from 'lucide-react';

export const Home = ({ setView }) => {
  const profileImg = '/jeff-queiroz-eu-vou-ser-doutor.png';

  const featuredNews = {
    category: 'Ciência & Tecnologia',
    title: 'Nova pesquisa em neurociência revela avanços na compreensão de circuitos de memória em estudantes',
    excerpt: 'Estudo publicado recentemente aponta como a revisão espaçada e o estudo ativo alteram a retenção sináptica a longo prazo.',
    time: 'Há 2 horas',
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

  return (
    <div className="animate-in text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      {/* Hero Section - Refined Editorial Style */}
      <section className="relative w-full overflow-hidden pt-16 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(79,140,255,0.08),transparent_45%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Main Editorial Intro */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] text-[#98A2B3] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse"></span>
                Portal Editorial & Pesquisa
              </div>
              
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter leading-[1.1] text-[#F8FAFC]">
                Informação para quem vai entrar — e permanecer — na Medicina.
              </h1>
              
              <p className="text-base md:text-lg text-[#98A2B3] leading-relaxed max-w-xl font-medium">
                Notícias, pesquisas científicas, vestibulares e vida acadêmica explicadas com rigor e profundidade editorial.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setView('news')}
                  className="bg-[#4F8CFF] text-[#080A0F] px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#7EA6FF] transition-all flex items-center gap-2 shadow-[0_8px_20px_rgba(79,140,255,0.15)]"
                >
                  Explorar Notícias <ArrowRight size={14} strokeWidth={3} />
                </button>
                <button
                  type="button"
                  onClick={() => setView('mentorship')}
                  className="bg-white/[0.03] text-white border border-white/[0.08] px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-white/[0.06] transition-all flex items-center gap-2"
                >
                  Conhecer Mentoria
                </button>
              </div>
            </div>

            {/* Right: Featured Headline Card */}
            <div className="lg:col-span-5">
              <div 
                onClick={() => setView('news')}
                className="bg-[#11141A] border border-white/[0.05] rounded-[32px] p-8 cursor-pointer group hover:border-[#4F8CFF]/30 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden premium-border"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/10 px-2.5 py-1 rounded-md">
                    {featuredNews.category}
                  </span>
                  <span className="text-[10px] text-[#98A2B3] font-medium flex items-center gap-1.5">
                    <Clock size={12} /> {featuredNews.time}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors mb-4 leading-tight">
                  {featuredNews.title}
                </h3>
                <p className="text-[#98A2B3] text-sm leading-relaxed mb-8 font-medium">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between text-[10px] font-black text-[#4F8CFF] uppercase tracking-[0.15em] pt-6 border-t border-white/[0.03]">
                  <span>Ler reportagem completa</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Grid - Compact & Refined */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.03]">
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <p className="text-[#4F8CFF] font-black uppercase text-[10px] tracking-[0.25em]">Fluxo Contínuo</p>
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC]">Últimas Notícias & Artigos</h2>
          </div>
          <button onClick={() => setView('news')} className="text-[10px] font-black text-[#98A2B3] hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors">
            Ver redação completa <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setView('news')}
              className="bg-[#11141A] border border-white/[0.05] rounded-[24px] p-6 cursor-pointer hover:border-[#4F8CFF]/20 transition-all group flex flex-col justify-between premium-border"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/5 px-2 py-0.5 rounded border border-[#4F8CFF]/10">
                    {item.category}
                  </span>
                  <span className="text-[9px] text-[#98A2B3] font-bold flex items-center gap-1">
                    <Clock size={10} /> {item.time}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#98A2B3] leading-relaxed mb-6 font-medium line-clamp-2">
                  {item.excerpt}
                </p>
              </div>
              <div className="pt-4 border-t border-white/[0.03] flex items-center justify-between text-[9px] font-black text-[#98A2B3] group-hover:text-white uppercase tracking-widest transition-colors">
                <span>Continuar lendo</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Author Section - Sophisticated */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="bg-[#11141A] border border-white/[0.05] rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-2xl premium-border">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#4F8CFF]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border border-white/[0.1] shadow-2xl relative z-10">
              <img src={profileImg} alt="Jeff Queiroz" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4F8CFF]">Fundador & Editor Científico</span>
            <h3 className="text-2xl md:text-3xl font-black text-[#F8FAFC]">Jeff Queiroz · Medicina UFMG</h3>
            <p className="text-[#98A2B3] text-sm md:text-base leading-relaxed max-w-2xl font-medium">
              Pesquisador e criador do ecossistema <strong>EuVouSerDoutor</strong>. Produz conteúdos editoriais de alto rigor científico sobre inovação em saúde e métodos avançados de estudo.
            </p>
            <button
              onClick={() => setView('about')}
              className="text-[10px] font-black text-[#4F8CFF] uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2 mx-auto md:mx-0"
            >
              Conhecer a página do autor <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
