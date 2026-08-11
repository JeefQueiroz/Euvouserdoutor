import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Sparkles, TrendingUp, Filter } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const News = ({ setView }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Saúde & Ciência', 'Técnicas de estudo', 'Neurologia', 'Rotina', 'Revisão'];

  const posts = [
    {
      id: "cart_brasil_2026",
      title: "Terapia CAR-T 100% Nacional Atinge 72% de Remissão em Cânceres Avançados do Sangue",
      subtitle: "Desenvolvida por USP, Hemocentro de Ribeirão Preto e Instituto Butantan, inovação biotecnológica abre caminho para o acesso democrático a tratamentos genéticos avançados no SUS.",
      cat: "Saúde & Ciência",
      date: "11 Ago 2026",
      readTime: "8 min",
      img: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=1200",
      target: "post_cart_brasil_2026",
      featured: true,
    },
    {
      id: 'ebola_oxford_2026',
      title: 'Oxford Inicia Primeiro Ensaio Clínico Global de Vacina Inovadora Contra o Vírus Ebola Bundibugyo',
      subtitle: 'Estudo de Fase 1 avalia segurança e resposta imune do imunizante ChAdOx1 BDBV em voluntários sadios, marcando resposta rápida a surto severo na República Democrática do Congo.',
      cat: 'Saúde & Ciência',
      date: '11 Ago 2026',
      readTime: '7 min',
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200',
      target: 'post_ebola_oxford_2026',
      featured: true,
    },
    {
      id: 'article_med',
      title: 'Como estudar para Medicina com método e constância',
      subtitle: 'Um guia editorial sobre rotina, revisão e organização para transformar esforço em processo de estudo.',
      cat: 'Técnicas de estudo',
      date: '10 Ago 2026',
      readTime: '6 min',
      img: "https://i.imgur.com/9QVE0X7.jpeg",
      target: "post_estudar_medicina",
      featured: false,
    },
    {
      id: 'polilaminina',
      title: 'Polilaminina e os Avanços na Regeneração Neural',
      subtitle: 'Descobertas recentes em neurologia avaliam o potencial da polilaminina na regeneração axonal e no tratamento de lesões complexas.',
      cat: 'Neurologia',
      date: '09 Ago 2026',
      readTime: '6 min',
      img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800',
      target: 'post_polilaminina',
      featured: false,
    },
    {
      id: 'pomodoro',
      title: 'Técnica Pomodoro para blocos de foco',
      subtitle: 'Como usar ciclos curtos de estudo e pausa para manter atenção sem depender de maratonas improdutivas.',
      cat: 'Rotina',
      date: '08 Ago 2026',
      readTime: '4 min',
      img: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&q=80&w=800',
      target: 'post_pomodoro',
      featured: false,
    },
    {
      id: 'spaced',
      title: 'Revisão espaçada na prática',
      subtitle: 'Entenda como revisar em intervalos planejados pode apoiar a memória de longo prazo ao longo da preparação.',
      cat: 'Revisão',
      date: '07 Ago 2026',
      readTime: '5 min',
      img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
      target: 'post_spaced_repetition',
      featured: false,
    },
    {
      id: 'feynman',
      title: 'Método Feynman para aprender melhor',
      subtitle: 'Uma forma simples de testar entendimento: explicar com clareza, encontrar lacunas e revisar conceitos.',
      cat: 'Técnicas de estudo',
      date: '06 Ago 2026',
      readTime: '4 min',
      img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
      target: 'post_feynman',
      featured: false,
    },
    {
      id: 'mindmaps',
      title: 'Mapas mentais e resumos ativos',
      subtitle: 'Como transformar leitura em recuperação ativa, palavras-chave e conexões entre temas.',
      cat: 'Técnicas de estudo',
      date: '05 Ago 2026',
      readTime: '5 min',
      img: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800',
      target: 'post_mind_maps',
      featured: false,
    },
    {
      id: 'self_eval',
      title: 'Autoavaliação depois dos simulados',
      subtitle: 'Use erros, acertos e dúvidas para orientar a revisão seguinte com mais critério.',
      cat: 'Rotina',
      date: '04 Ago 2026',
      readTime: '5 min',
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      target: 'post_self_evaluation',
      featured: false,
    },
  ];

  const filteredPosts = selectedCategory === 'Todas' 
    ? posts 
    : posts.filter(p => p.cat === selectedCategory);

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="animate-in text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      {/* Professional News Header */}
      <div className="bg-[#0A192F] border-b border-white/[0.05] pt-12 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.15),transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.25em] mb-4">
                Redação Editorial & Pesquisa
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-[#F8FAFC]">
                Portal de Notícias Médicas e Científicas
              </h1>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.08] px-4 py-3 rounded-2xl flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#F8FAFC]">Plantão Editorial</p>
                <p className="text-[11px] text-[#98A2B3]">Atualizado em tempo real</p>
              </div>
            </div>
          </div>

          {/* Category Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-white/[0.05] pb-2 scrollbar-none">
            <Filter size={14} className="text-[#4F8CFF] mr-2 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#4F8CFF] text-[#080A0F] shadow-[0_0_20px_rgba(79,140,255,0.3)]'
                    : 'bg-white/[0.03] text-[#98A2B3] hover:text-white hover:bg-white/[0.06] border border-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10 relative z-20">
        <div className="lg:col-span-8 xl:col-span-9 space-y-8">
          
          {/* Featured Hero Story */}
          {featuredPost && (
            <article
              onClick={() => setView(featuredPost.target)}
              className="bg-[#11141A] border border-white/[0.08] rounded-[32px] overflow-hidden shadow-2xl cursor-pointer group hover:border-[#4F8CFF]/40 transition-all grid grid-cols-1 md:grid-cols-12 premium-border"
            >
              <div className="md:col-span-7 aspect-[16/10] md:aspect-auto overflow-hidden relative">
                <img 
                  src={featuredPost.img} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100" 
                />
                <div className="absolute top-4 left-4 z-20 bg-[#080A0F]/80 backdrop-blur-md border border-white/[0.1] text-[#4F8CFF] px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles size={12} /> Destaque Editorial
                </div>
              </div>
              <div className="md:col-span-5 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-[#98A2B3] font-bold">
                    <span className="text-[#4F8CFF] uppercase tracking-wider">{featuredPost.cat}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors leading-tight tracking-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-xs md:text-sm text-[#98A2B3] leading-relaxed font-medium line-clamp-3">
                    {featuredPost.subtitle}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/jeff-queiroz-perfil.jpg" alt="Jeff Queiroz" className="w-8 h-8 rounded-full object-cover border border-[#4F8CFF]/30" />
                    <div>
                      <p className="text-[11px] font-bold text-white">Jeff Queiroz</p>
                      <p className="text-[9px] text-[#98A2B3]">Medicina UFMG</p>
                    </div>
                  </div>
                  <span className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#4F8CFF] group-hover:bg-[#4F8CFF] group-hover:text-[#080A0F] transition-all">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Secondary News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setView(post.target)}
                className="bg-[#11141A] border border-white/[0.05] rounded-[24px] overflow-hidden shadow-xl cursor-pointer group hover:border-[#4F8CFF]/30 transition-all flex flex-col justify-between premium-border"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={post.img} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                    <span className="absolute top-3 left-3 z-20 bg-[#080A0F]/70 backdrop-blur-md border border-white/[0.08] text-[#4F8CFF] px-2.5 py-1 rounded-md text-[8px] font-black uppercase tracking-widest">
                      {post.cat}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-[#98A2B3] font-bold">
                      <Clock size={12} className="text-[#4F8CFF]" /> {post.readTime} de leitura • {post.date}
                    </div>
                    <h3 className="text-base md:text-lg font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors leading-snug tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#98A2B3] leading-relaxed line-clamp-2 font-medium">
                      {post.subtitle}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 border-t border-white/[0.03] flex items-center justify-between text-[10px] font-black text-[#4F8CFF] uppercase tracking-widest">
                  <span>Ler reportagem</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>

        </div>

        {/* Professional Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <Sidebar setView={setView} />
        </div>
      </div>
    </div>
  );
};
