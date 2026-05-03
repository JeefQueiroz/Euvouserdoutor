import React from 'react';
import { ArrowRight, Sparkles, BookOpen, ArrowLeft } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const News = ({ setView, profileImg, telegram }) => {
  const posts = [
    {
      title: "O fenômeno @euvouserdoutor na UFMG",
      subtitle: "Como Jefferson Queiroz está transformando a forma como futuros médicos se preparam para o vestibular. Um olhar profundo sobre o impacto da nossa metodologia.",
      cat: "Inspiração e Rotina",
      img: "https://i.imgur.com/9QVE0X7.jpeg",
      target: 'article',
      featured: true
    },
    {
      title: "Técnica Pomodoro: Foco Total em Blocos de Tempo",
      subtitle: "A ansiedade e a falta de foco destroem o rendimento. Descubra como os Cronogramas da Mentoria Aprovado dividem o conteúdo na medida exata para você aplicar o Pomodoro sem sofrimento.",
      cat: "Gestão de Tempo",
      img: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&q=80&w=800",
      target: 'post_pomodoro'
    },
    {
      title: "Revisão Espaçada: O Segredo da Retenção",
      subtitle: "Sem revisar, você perde 70% do que estuda em 24h. Entenda a base dos nossos Flashcards Aprovado e como o algoritmo de repetição combate a Curva do Esquecimento.",
      cat: "Neurociência",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      target: 'post_spaced_repetition'
    },
    {
      title: "Método Feynman: Ensine para Aprender",
      subtitle: "Se você não consegue explicar simples, você não entendeu. Veja como aplicar essa técnica nos nossos plantões tira-dúvidas ao vivo com professores e mentores.",
      cat: "Aprendizado Ativo",
      img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
      target: 'post_feynman'
    },
    {
      title: "Mapas Mentais e Resumos Ativos",
      subtitle: "Chega de perder tempo com resumos gigantes e coloridos. O ecossistema Eu Vou Ser Doutor ensina a extrair apenas as palavras-chave que a FUVEST exige na 2ª fase.",
      cat: "Estratégia de Estudo",
      img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
      target: 'post_mind_maps'
    },
    {
      title: "A Arte da Autoavaliação e Simulados",
      subtitle: "Não fuja dos seus erros. Nossas ferramentas de análise de desempenho nos simulados inéditos mostram exatamente onde você precisa focar as revisões na reta final.",
      cat: "Métricas ENEM",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      target: 'post_self_evaluation'
    },
    {
      title: "Grupos de Estudo com Propósito",
      subtitle: "O ambiente molda o aprovado. A nossa Comunidade VIP não é só um grupo de Telegram; é um ecossistema focado na aprovação, blindando você contra a procrastinação.",
      cat: "Comunidade",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      target: 'post_study_groups'
    },
    {
      title: "Técnicas de Memorização e Relaxamento",
      subtitle: "Controle emocional é 50% da prova. Conheça as estratégias psicológicas que o Eu Vou Ser Doutor recomenda para evitar o branco e dominar a ansiedade no grande dia.",
      cat: "Inteligência Emocional",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      target: 'post_relaxation'
    }
  ];

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen">
      {/* Header Topic */}
      <div className="bg-[#0A192F] text-white pt-12 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2E70CE]/20 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5CE1E6]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-6">
           <button onClick={() => setView('home')} className="inline-flex items-center gap-2 text-[10px] font-black text-blue-200 uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 hover:border-white/20 transition-all mb-2"><ArrowLeft size={14}/> Voltar</button>
           <div className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-blue-200 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
             <Sparkles size={14} className="text-[#5CE1E6]" />
             Blog e Estratégias
           </div>
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none whitespace-nowrap">
             <span className="text-white">Estratégias de </span>
             <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#96A1DF] to-white">Aprovação</span>
           </h1>
           <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl font-medium">
             Técnicas científicas, artigos e notícias do ecossistema <strong className="text-white">Eu vou ser Doutor</strong>. 
             O conhecimento exato que você precisa para vestir o jaleco branco.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-16 relative z-20">
        <div className="lg:col-span-8 space-y-10">
          
          {/* Post Destaque */}
          <div onClick={() => setView(featuredPost.target)} className="bg-white rounded-[40px] p-3 shadow-xl border border-gray-100 cursor-pointer group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(160,32,112,0.15)] hover:border-[#A02070]/20">
            <div className="w-full aspect-[2/1] overflow-hidden rounded-[32px] relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 via-transparent to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img src={featuredPost.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="post destaque" />
                <div className="absolute top-4 left-4 bg-[#A02070] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_4px_15px_rgba(160,32,112,0.4)] z-20">
                  Destaque
                </div>
            </div>
            <div className="px-6 pb-8 md:px-10 md:pb-10 text-left relative z-20">
              <span className="inline-block bg-[#2E70CE]/10 text-[#2E70CE] px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-4">{featuredPost.cat}</span>
              <h3 className="text-3xl md:text-4xl font-black text-[#0A192F] uppercase italic mb-4 group-hover:text-[#A02070] transition-colors leading-tight">{featuredPost.title}</h3>
              <p className="text-base text-gray-600 leading-relaxed mb-8">{featuredPost.subtitle}</p>
              <button className="inline-flex items-center justify-center gap-2 bg-[#A02070] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest group-hover:bg-[#801a5a] group-hover:scale-105 transition-all duration-300 shadow-[0_4px_15px_rgba(160,32,112,0.3)]">
                Ler Artigo Completo <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 py-4">
            <div className="w-10 h-10 bg-[#A02070]/10 rounded-xl flex items-center justify-center text-[#A02070]">
              <BookOpen size={20} />
            </div>
            <h3 className="text-2xl font-black text-[#0A192F] uppercase italic">Técnicas de Estudos</h3>
          </div>

          {/* Grid de Posts Secundários */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularPosts.map((post, i) => (
              <div key={i} onClick={() => setView(post.target)} className="bg-white rounded-[32px] p-3 shadow-lg border border-gray-100 flex flex-col group cursor-pointer hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(160,32,112,0.15)] hover:border-[#A02070]/20">
                <div className="w-full aspect-video overflow-hidden rounded-[24px] relative mb-6">
                   <div className="absolute inset-0 bg-[#0A192F]/0 group-hover:bg-[#0A192F]/10 transition-colors duration-500 z-10"></div>
                   <img src={post.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="post" />
                   <div className="absolute bottom-4 left-4 z-20">
                     <span className="bg-white/90 backdrop-blur-sm text-[#0A192F] shadow-sm px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest">{post.cat}</span>
                   </div>
                </div>
                <div className="px-5 pb-6 text-left flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-[#0A192F] uppercase italic mb-3 group-hover:text-[#A02070] transition-colors line-clamp-2 leading-snug">{post.title}</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6 flex-grow">{post.subtitle}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                    <span className="flex items-center gap-2 text-[#A02070] font-black text-[10px] uppercase tracking-widest group-hover:text-[#801a5a] transition-colors">Ler Mais</span>
                    <div className="w-8 h-8 rounded-full bg-[#A02070]/10 flex items-center justify-center group-hover:bg-[#A02070] group-hover:text-white text-[#A02070] transition-all duration-300 group-hover:scale-110 shadow-sm">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-4"><Sidebar setView={setView} profileImg={profileImg} /></div>
      </div>
    </div>
  );
};
