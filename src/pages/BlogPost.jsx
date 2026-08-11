import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Share2, Calendar, User, BookOpen, Clock, Tag, ChevronRight, CheckCircle2, Quote, Sparkles, Target } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const BlogPost = ({ setView, postId, profileImg, telegram }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const postsData = {
    ebola_oxford_2026: {
      title: "Oxford Inicia Primeiro Ensaio Clínico Global de Vacina Contra o Vírus Ebola Bundibugyo",
      cat: "Saúde & Ciência",
      time: "7 min",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
      content: (
        <>
          <p className="text-base md:text-lg text-[#98A2B3] leading-relaxed font-medium mb-8">
            A Universidade de Oxford, por meio do renomado <strong>Oxford Vaccine Group</strong> e do <i>Pandemic Sciences Institute</i> (PSI), deu início bem-sucedido ao primeiro ensaio clínico em humanos (Fase 1) da vacina <strong>ChAdOx1 BDBV</strong>, desenvolvida especificamente para combatê-la.
          </p>

          <div className="flex items-start gap-5 bg-[#11141A] border border-white/[0.05] shadow-2xl rounded-2xl p-6 mb-10 relative overflow-hidden premium-border">
            <Quote size={32} className="text-[#4F8CFF] flex-shrink-0 opacity-40" />
            <div className="relative z-10">
              <h2 className="text-base font-black text-[#F8FAFC] uppercase tracking-wider mb-3">Por que isso importa</h2>
              <p className="text-[#98A2B3] text-xs md:text-sm leading-relaxed font-medium">
                O surto atual causado pelo vírus Bundibugyo representa uma grave ameaça de saúde pública global devido à alta taxa de letalidade e à ausência anterior de uma vacina específica.
              </p>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] mb-5 tracking-tighter flex items-center gap-3">
            <CheckCircle2 className="text-[#4F8CFF]" size={22} /> Tecnologia Confiável
          </h2>
          <p className="text-[#98A2B3] leading-relaxed mb-6 text-sm md:text-base font-medium">
            O imunizante <strong>ChAdOx1 BDBV</strong> utiliza a mesma plataforma de vetor viral baseada em adenovírus de chimpanzé que deu origem à vacina Oxford/AstraZeneca contra a COVID-19.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05]">
              <h3 className="text-sm font-black text-[#F8FAFC] mb-2">Desenho do Estudo</h3>
              <p className="text-[#98A2B3] text-xs leading-relaxed font-medium">
                O ensaio clínico de Fase 1 avalia a segurança e a imunogenicidade do candidato vacinal em voluntários sadios [2].
              </p>
            </div>
            <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05]">
              <h3 className="text-sm font-black text-[#F8FAFC] mb-2">Próximos Passos</h3>
              <p className="text-[#98A2B3] text-xs leading-relaxed font-medium">
                Consórcios internacionais planejam expandir os estudos clínicos para Uganda e RDC em parceria local [1].
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#11141A] to-[#0A192F] p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden my-10 border border-white/[0.05] premium-border">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest mb-4">
                <Sparkles size={10} className="text-[#4F8CFF]" /> Compromisso Editorial
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tighter">Ciência e Saúde Global</h3>
              <p className="text-[#98A2B3] text-xs md:text-sm leading-relaxed mb-6 font-medium">
                O portal <strong>EuvouserDoutor</strong> acompanha os principais avanços da medicina translacional com rigor científico.
              </p>
              <button onClick={() => setView('news')} className="bg-[#4F8CFF] text-[#080A0F] px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#7EA6FF] transition-all">
                Ver todas as notícias
              </button>
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-black text-[#F8FAFC] mb-4 tracking-tighter">Referências Científicas</h2>
          <ol className="list-decimal pl-5 space-y-2 text-[#98A2B3] text-xs font-medium mb-8">
            <li>University of Oxford. <i>First volunteer vaccinated...</i> [1].</li>
            <li>CEPI. [2].</li>
            <li>BMJ. DOI: 10.1136/bmj-2026-100286 [3].</li>
          </ol>
        </>
      )
    }
  };

  const post = postsData[postId] || postsData.ebola_oxford_2026;

  useEffect(() => {
    const scriptId = 'news-article-schema';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": post.title,
      "image": [post.img],
      "datePublished": "2026-08-11T08:00:00-03:00",
      "dateModified": "2026-08-11T08:00:00-03:00",
      "author": {
        "@type": "Person",
        "name": "Jefferson Viana Queiroz",
        "url": "https://www.euvouserdoutor.com/autor/jeff-queiroz"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Eu Vou Ser Doutor",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.euvouserdoutor.com/logo-euvouserdoutor.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    });

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [post]);

  return (
    <div className="animate-in text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-white/5">
        <div 
          className="h-full bg-[#4F8CFF] transition-all duration-150 shadow-[0_0_10px_rgba(79,140,255,0.5)]" 
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      {/* Header Section */}
      <div className="bg-[#0A192F] border-b border-white/[0.05] pt-12 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.12),transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            type="button"
            onClick={() => setView('news')}
            className="inline-flex items-center gap-2 text-[9px] font-black text-[#4F8CFF] uppercase bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-all mb-8"
          >
            <ArrowLeft size={12} strokeWidth={3} /> Voltar
          </button>
          
          <div className="max-w-4xl space-y-4">
            <span className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.25em]">
              {post.cat}
            </span>
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter leading-tight text-[#F8FAFC]">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[#98A2B3] text-[9px] font-black uppercase tracking-widest pt-4 border-t border-white/[0.03]">
              <span className="flex items-center gap-1.5"><User size={12} className="text-[#4F8CFF]" /> Jeff Queiroz</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#4F8CFF]" /> {post.time}</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#4F8CFF]" /> Agosto 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 -mt-12 relative z-20">
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="bg-[#11141A] rounded-[28px] overflow-hidden shadow-2xl border border-white/[0.05] premium-border">
            <div className="aspect-[21/9] w-full overflow-hidden">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:p-10">
              {post.content}
              
              {/* Mentorship Banner (Funnel BoFu) */}
              <div className="mt-12 p-8 md:p-10 rounded-[32px] bg-[#4F8CFF] text-[#080A0F] relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10 space-y-5">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] bg-[#080A0F]/10 px-2.5 py-1 rounded-md">
                    Mentoria Acadêmica
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight">
                    Domine o Método de Estudo Ativo.
                  </h3>
                  <p className="text-xs md:text-base font-bold opacity-80 max-w-xl">
                    A Mentoria Aprovado oferece o suporte estratégico que você precisa para organizar sua rotina.
                  </p>
                  <button 
                    onClick={() => setView('mentorship')}
                    className="bg-[#080A0F] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#11141A] transition-all flex items-center gap-2 shadow-xl"
                  >
                    Conhecer Mentoria <ArrowRight size={14} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 xl:col-span-3">
          <Sidebar setView={setView} />
        </div>
      </div>
    </div>
  );
};
