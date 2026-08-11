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
      <section className="relative w-full overflow-hidden pt-12 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(79,140,255,0.06),transparent_45%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Main Editorial Intro */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] text-[#98A2B3] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] animate-pulse"></span>
                Portal Editorial & Pesquisa
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-[#F8FAFC]">
                Informação para quem vai entrar — e permanecer — na Medicina.
              </h1>
              
              <p className="text-sm md:text-base text-[#98A2B3] leading-relaxed max-w-xl font-medium">
                Notícias, pesquisas científicas, vestibulares e vida acadêmica explicadas com rigor editorial.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setView('news')}
                  className="bg-[#4F8CFF] text-[#080A0F] px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#7EA6FF] transition-all flex items-center gap-2 shadow-[0_8px_20px_rgba(79,140,255,0.1)]"
                >
                  Explorar Notícias <ArrowRight size={14} strokeWidth={3} />
                </button>
                <button
                  type="button"
                  onClick={() => setView('mentorship')}
                  className="bg-white/[0.03] text-white border border-white/[0.08] px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/[0.06] transition-all flex items-center gap-2"
                >
                  Mentoria
                </button>
              </div>
            </div>

            {/* Right: Featured Headline Card */}
            <div className="lg:col-span-5">
              <div 
                onClick={() => setView('news')}
                className="bg-[#11141A] border border-white/[0.05] rounded-[28px] p-7 cursor-pointer group hover:border-[#4F8CFF]/30 transition-all shadow-2xl relative overflow-hidden premium-border"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/10 px-2.5 py-1 rounded-md">
                    {featuredNews.category}
                  </span>
                  <span className="text-[9px] text-[#98A2B3] font-bold flex items-center gap-1.5">
                    <Clock size={12} /> {featuredNews.time}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors mb-3 leading-tight">
                  {featuredNews.title}
                </h3>
                <p className="text-[#98A2B3] text-xs leading-relaxed mb-6 font-medium">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between text-[9px] font-black text-[#4F8CFF] uppercase tracking-[0.15em] pt-5 border-t border-white/[0.03]">
                  <span>Ler reportagem completa</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Grid - Compact & Refined */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/[0.03]">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-1.5">
            <p className="text-[#4F8CFF] font-black uppercase text-[9px] tracking-[0.25em]">Fluxo Contínuo</p>
            <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC]">Últimas Notícias & Artigos</h2>
          </div>
          <button onClick={() => setView('news')} className="text-[9px] font-black text-[#98A2B3] hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors">
            Ver redação completa <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {latestNews.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setView('news')}
              className="bg-[#11141A] border border-white/[0.05] rounded-[20px] p-5 cursor-pointer hover:border-[#4F8CFF]/20 transition-all group flex flex-col justify-between premium-border"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/5 px-2 py-0.5 rounded border border-[#4F8CFF]/10">
                    {item.category}
                  </span>
                  <span className="text-[9px] text-[#98A2B3] font-bold flex items-center gap-1">
                    <Clock size={10} /> {item.time}
                  </span>
                </div>
                <h3 className="text-base font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#98A2B3] leading-relaxed mb-5 font-medium line-clamp-2">
                  {item.excerpt}
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.03] flex items-center justify-between text-[8px] font-black text-[#98A2B3] group-hover:text-white uppercase tracking-widest transition-colors">
                <span>Continuar lendo</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Author Section - Sophisticated & Compact */}
      <section className="max-w-7xl mx-auto px-6 pt-8">
        <div className="bg-[#11141A] border border-white/[0.05] rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl premium-border">
          <div className="relative group">
            <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full overflow-hidden border border-white/[0.1] shadow-2xl relative z-10">
              <img src={profileImg} alt="Jeff Queiroz" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-3 text-center md:text-left">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#4F8CFF]">Fundador & Editor Científico</span>
            <h3 className="text-xl md:text-2xl font-black text-[#F8FAFC]">Jeff Queiroz · Medicina UFMG</h3>
            <p className="text-[#98A2B3] text-xs md:text-sm leading-relaxed max-w-xl font-medium">
              Pesquisador e criador do ecossistema <strong>EuVouSerDoutor</strong>. Produz conteúdos editoriais de alto rigor científico sobre inovação em saúde.
            </p>
            <button
              onClick={() => setView('about')}
              className="text-[9px] font-black text-[#4F8CFF] uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2 mx-auto md:mx-0"
            >
              Conhecer a página do autor <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
