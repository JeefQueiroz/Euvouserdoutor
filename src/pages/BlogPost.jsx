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
      time: "7 min de leitura",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#98A2B3] leading-relaxed font-medium mb-10 dropcap">
            A Universidade de Oxford, por meio do renomado <strong>Oxford Vaccine Group</strong> e do <i>Pandemic Sciences Institute</i> (PSI), deu início bem-sucedido ao primeiro ensaio clínico em humanos (Fase 1) da vacina <strong>ChAdOx1 BDBV</strong>, desenvolvida especificamente para combater o <i>Bundibugyo ebolavirus</i> (BDBV) [1] [2]. O marco histórico ocorre em resposta direta ao avanço da epidemia na República Democrática do Congo (RDC) e em países vizinhos.
          </p>

          <div className="flex items-start gap-6 bg-[#11141A] border border-white/[0.08] shadow-2xl rounded-[32px] p-8 mb-12 relative overflow-hidden group hover:border-[#4F8CFF]/30 transition-all premium-border">
            <Quote size={40} className="text-[#4F8CFF] flex-shrink-0 opacity-50" />
            <div className="relative z-10">
              <h2 className="text-xl font-black text-[#F8FAFC] uppercase tracking-wider mb-4">Por que isso importa</h2>
              <p className="text-[#98A2B3] leading-relaxed text-sm md:text-base">
                O surto atual causado pelo vírus Bundibugyo representa uma grave ameaça de saúde pública global devido à alta taxa de letalidade e à ausência anterior de uma vacina específica licenciada contra esta cepa específica do ebola.
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-[#4F8CFF]" />
            Tecnologia Confiável
          </h2>
          <p className="text-[#98A2B3] leading-relaxed mb-6 text-base md:text-lg">
            O imunizante <strong>ChAdOx1 BDBV</strong> utiliza a mesma plataforma de vetor viral baseada em adenovírus de chimpanzé que deu origem à vacina Oxford/AstraZeneca contra a COVID-19 — um avanço biotecnológico estimado em salvar mais de seis milhões de vidas no primeiro ano de uso global [2].
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#11141A] p-8 rounded-[24px] shadow-xl border border-white/[0.05] premium-border">
              <h3 className="text-lg font-black text-[#F8FAFC] mb-3">Desenho do Estudo</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed">
                O ensaio clínico de Fase 1 avalia a segurança e a imunogenicidade do candidato vacinal em 50 voluntários sadios no Reino Unido [2].
              </p>
            </div>
            <div className="bg-[#11141A] p-8 rounded-[24px] shadow-xl border border-white/[0.05] premium-border">
              <h3 className="text-lg font-black text-[#F8FAFC] mb-3">Próximos Passos</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed">
                Consórcios internacionais planejam expandir os estudos clínicos para Uganda e RDC em parceria com unidades de pesquisa locais [1].
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#11141A] to-[#0A192F] p-10 rounded-[32px] text-white shadow-2xl relative overflow-hidden my-12 border border-white/[0.08] premium-border">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest mb-6">
                <Sparkles size={12} className="text-[#4F8CFF]" />
                Compromisso Editorial
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4">Ciência, Rigor e Saúde Global</h3>
              <p className="text-[#98A2B3] leading-relaxed text-base mb-8">
                O portal <strong>EuvouserDoutor</strong> acompanha os principais avanços da medicina translacional e biotecnologia com rigor científico e compromisso com a verdade.
              </p>
              <button onClick={() => setView('news')} className="bg-[#4F8CFF] text-[#080A0F] px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#7EA6FF] transition-all shadow-lg">
                Ver todas as notícias
              </button>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] mb-6">Fontes e Referências Científicas</h2>
          <ol className="list-decimal pl-6 space-y-3 text-[#98A2B3] text-sm mb-8">
            <li>University of Oxford. <i>First volunteer vaccinated in the world's first Bundibugyo ebolavirus vaccine trial</i>. [1].</li>
            <li>Coalition for Epidemic Preparedness Innovations (CEPI). [2].</li>
            <li>British Medical Journal (BMJ). DOI: 10.1136/bmj-2026-100286 [3].</li>
          </ol>
        </>
      )
    }
  };

  const post = postsData[postId] || postsData.ebola_oxford_2026;

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
      <div className="bg-[#0A192F] border-b border-white/[0.05] pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.12),transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            type="button"
            onClick={() => setView('news')}
            className="inline-flex items-center gap-2 text-[9px] font-black text-[#4F8CFF] uppercase bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-all mb-10"
          >
            <ArrowLeft size={12} strokeWidth={3} /> Voltar
          </button>
          
          <div className="max-w-4xl space-y-6">
            <span className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.25em]">
              {post.cat}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-[#F8FAFC]">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[#98A2B3] text-[10px] font-black uppercase tracking-widest pt-4 border-t border-white/[0.03]">
              <span className="flex items-center gap-1.5"><User size={14} className="text-[#4F8CFF]" /> Jeff Queiroz</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#4F8CFF]" /> {post.time}</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#4F8CFF]" /> Agosto 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-12 relative z-20">
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="bg-[#11141A] rounded-[32px] overflow-hidden shadow-2xl border border-white/[0.05] premium-border">
            <div className="aspect-[21/9] w-full overflow-hidden">
              <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:p-12">
              {post.content}
              
              {/* Mentorship Banner (Funnel BoFu) */}
              <div className="mt-16 p-8 md:p-12 rounded-[32px] bg-[#4F8CFF] text-[#080A0F] relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
                <div className="relative z-10 space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-[#080A0F]/10 px-3 py-1 rounded-md">
                    Oportunidade Acadêmica
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
                    Domine o Método de Estudo Ativo para Medicina.
                  </h3>
                  <p className="text-sm md:text-lg font-bold opacity-80 max-w-2xl">
                    A Mentoria Aprovado oferece o suporte estratégico que você precisa para organizar sua rotina e evoluir com constância.
                  </p>
                  <button 
                    onClick={() => setView('mentorship')}
                    className="bg-[#080A0F] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#11141A] transition-all flex items-center gap-3 shadow-xl"
                  >
                    Conhecer Mentoria <ArrowRight size={16} strokeWidth={3} />
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
