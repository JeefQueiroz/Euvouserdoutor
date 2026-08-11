import {
  ArrowRight,
  BookOpen,
  Clock,
  Download,
  GraduationCap,
  Layers,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';

export const Home = ({ setView }) => {
  const profileImg = '/jeff-queiroz-perfil.jpg';

  const featuredNews = {
    category: 'Ciência & Tecnologia',
    title: 'Nova pesquisa em neurociência revela avanços na compreensão de circuitos de memória em estudantes',
    excerpt: 'Estudo publicado recentemente aponta como a revisão espaçada e o estudo ativo alteram a retenção sináptica a longo prazo.',
    time: 'Há 2 horas',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200'
  };

  const latestNews = [
    {
      category: 'Vestibular & ENEM',
      title: 'Cronograma Sisu e notas de corte: O que esperar do próximo ciclo',
      excerpt: 'Análise detalhada das tendências de pontuação nas principais universidades federais.',
      time: 'Há 4 horas',
      img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'Vida Acadêmica',
      title: 'A rotina no ciclo básico de Medicina: Como organizar plantões e teoria',
      excerpt: 'Dicas práticas de acadêmicos da UFMG para equilibrar o volume de conteúdo denso.',
      time: 'Há 6 horas',
      img: 'https://i.imgur.com/9QVE0X7.jpeg'
    },
    {
      category: 'Inovação Médica',
      title: 'Inteligência artificial no diagnóstico precoce: O impacto na prática clínica',
      excerpt: 'Como ferramentas de apoio computacional estão transformando a precisão diagnóstica.',
      time: 'Há 8 horas',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
    },
  ];

  return (
    <div className="animate-in text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      {/* Mega Premium Hero Section */}
      <section className="relative w-full overflow-hidden pt-16 pb-32 border-b border-white/[0.03]">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(79,140,255,0.1),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4F8CFF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-[#4F8CFF]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Main Editorial Intro */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2.5 bg-[#4F8CFF]/5 border border-[#4F8CFF]/20 text-[#4F8CFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] animate-blur-reveal">
                  <Zap size={12} className="fill-[#4F8CFF]" />
                  Portal Editorial & Pesquisa
                </div>
                
                <h1 className="text-4xl md:text-8xl font-black tracking-tight leading-[0.9] text-[#F8FAFC] text-balance">
                  Informação de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Elite</span> para Medicina.
                </h1>
                
                <p className="text-base md:text-xl text-[#98A2B3] leading-relaxed max-w-xl font-medium text-pretty">
                  Notícias de impacto, pesquisas científicas de ponta e estratégias acadêmicas com o mais alto rigor editorial e científico.
                </p>
              </div>

              <div className="flex flex-wrap gap-5">
                <button
                  type="button"
                  onClick={() => setView('news')}
                  className="bg-[#4F8CFF] text-[#080A0F] px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-[#7EA6FF] hover-lift transition-all flex items-center gap-3 shadow-[0_20px_40px_rgba(79,140,255,0.2)]"
                >
                  Explorar Notícias <ArrowRight size={16} strokeWidth={3} />
                </button>
                <button
                  type="button"
                  onClick={() => setView('mentorship')}
                  className="bg-white/[0.03] text-white border border-white/[0.08] px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-white/[0.06] hover-lift transition-all flex items-center gap-3"
                >
                  Mentoria Premium
                </button>
              </div>

              {/* Authority Block to fill space and add value */}
              <div className="hidden md:flex items-center gap-8 pt-6 opacity-60">
                <div className="flex flex-col gap-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#4F8CFF]">Verificação</p>
                  <p className="text-white text-xs font-bold">Rigor Científico</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex flex-col gap-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#4F8CFF]">Atualização</p>
                  <p className="text-white text-xs font-bold">Plantão 24h</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex flex-col gap-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#4F8CFF]">Origem</p>
                  <p className="text-white text-xs font-bold">Medicina UFMG</p>
                </div>
              </div>
            </div>

            {/* Right: Featured Story Card - High End */}
            <div className="lg:col-span-5">
              <div 
                onClick={() => setView('news')}
                className="glass-premium rounded-[40px] p-1 cursor-pointer group transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="bg-[#11141A] rounded-[39px] overflow-hidden p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/10 px-3 py-1 rounded-lg">
                      {featuredNews.category}
                    </span>
                    <span className="text-[10px] text-[#98A2B3] font-bold flex items-center gap-1.5">
                      <Clock size={12} className="text-[#4F8CFF]" /> {featuredNews.time}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors leading-tight tracking-tight">
                    {featuredNews.title}
                  </h3>
                  <p className="text-[#98A2B3] text-sm leading-relaxed font-medium line-clamp-3">
                    {featuredNews.excerpt}
                  </p>
                  <div className="pt-6 border-t border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={profileImg} alt="Jeff Queiroz" className="w-10 h-10 rounded-full object-cover border border-[#4F8CFF]/30" />
                      <div>
                        <p className="text-[11px] font-bold text-white">Jeff Queiroz</p>
                        <p className="text-[9px] text-[#98A2B3]">Editor-Chefe</p>
                      </div>
                    </div>
                    <span className="w-10 h-10 rounded-2xl bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF] group-hover:bg-[#4F8CFF] group-hover:text-[#080A0F] transition-all">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Grid - Sophisticated Composition */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#4F8CFF]" />
              <p className="text-[#4F8CFF] font-black uppercase text-[10px] tracking-[0.3em]">Editoria em Foco</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#F8FAFC] tracking-tighter">Últimas Atualizações</h2>
          </div>
          <button 
            onClick={() => setView('news')} 
            className="group text-[11px] font-black text-[#98A2B3] hover:text-white uppercase tracking-widest flex items-center gap-3 transition-all bg-white/[0.03] border border-white/[0.08] px-6 py-3 rounded-2xl"
          >
            Ver Redação Completa <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((item, idx) => (
            <article
              key={idx}
              onClick={() => setView('news')}
              className="group cursor-pointer space-y-6"
            >
              <div className="aspect-[16/10] rounded-[32px] overflow-hidden border border-white/[0.05] premium-border relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 z-20 bg-[#080A0F]/60 backdrop-blur-md border border-white/[0.1] text-[#4F8CFF] px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                  {item.category}
                </span>
              </div>
              <div className="space-y-3 px-2">
                <div className="flex items-center gap-2 text-[10px] text-[#98A2B3] font-bold">
                  <Clock size={12} className="text-[#4F8CFF]" /> {item.time}
                </div>
                <h3 className="text-xl font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#98A2B3] leading-relaxed font-medium line-clamp-2">
                  {item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Author Brand Section - High Authority */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="glass-premium rounded-[48px] p-1 overflow-hidden">
          <div className="bg-[#11141A] rounded-[47px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F8CFF]/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[40px] overflow-hidden border-2 border-[#4F8CFF]/20 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <img src={profileImg} alt="Jeff Queiroz" className="w-full h-full object-cover scale-110" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#4F8CFF] text-[#080A0F] p-3 rounded-2xl shadow-xl">
                <Sparkles size={20} />
              </div>
            </div>

            <div className="space-y-6 text-center md:text-left relative z-10">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4F8CFF]">The Visionary Behind</span>
                <h3 className="text-3xl md:text-5xl font-black text-[#F8FAFC] tracking-tighter">Jeff Queiroz <span className="text-[#98A2B3]/30">·</span> Medicina UFMG</h3>
              </div>
              <p className="text-[#98A2B3] text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                Pesquisador e estrategista acadêmico, Jeff Queiroz fundou o <strong>EuVouSerDoutor</strong> para elevar o padrão da comunicação científica e preparação médica no Brasil, unindo rigor editorial e inovação tecnológica.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
                <button
                  onClick={() => setView('author')}
                  className="group text-[11px] font-black text-[#F8FAFC] uppercase tracking-[0.2em] flex items-center gap-3 transition-all"
                >
                  Perfil Completo <ArrowRight size={16} className="text-[#4F8CFF] group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="h-4 w-px bg-white/10 hidden md:block" />
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#98A2B3]">
                  <Layers size={14} className="text-[#4F8CFF]" />
                  <span>Conteúdo Editorial Científico</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
