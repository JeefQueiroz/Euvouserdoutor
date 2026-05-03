import React from 'react';
import { Calendar, CheckSquare, Stethoscope, ArrowLeft, ArrowRight, Layers, AlertCircle } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const Materials = ({ setView, telegram }) => (
  <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen">
    {/* Header Topic */}
    <div className="bg-[#0A192F] text-white pt-12 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2E70CE]/20 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5CE1E6]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 z-0"></div>
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-6">
         <button onClick={() => setView('home')} className="inline-flex items-center gap-2 text-[10px] font-black text-blue-200 uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 hover:border-white/20 transition-all mb-2">
           <ArrowLeft size={14} /> Voltar
         </button>
         <div className="inline-flex items-center justify-center gap-2 bg-[#A02070]/20 border border-[#A02070]/50 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
           <span className="w-1.5 h-1.5 rounded-full bg-[#A02070] animate-ping"></span> 
           Baixado por +15.000 alunos
         </div>
         <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none whitespace-nowrap">
           <span className="text-white">Biblioteca </span><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#96A1DF] to-white">Exclusiva</span>
         </h1>
         <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl font-medium">
           Material restrito de alto impacto. <strong className="text-white">Arquivos que garantiram a aprovação</strong> na UFMG, liberados por tempo limitado.
         </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-16 relative z-20">
      <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border-l-4 border-[#A02070] rounded-2xl p-5 shadow-md flex items-center gap-4">
             <div className="w-10 h-10 bg-[#A02070]/10 text-[#A02070] rounded-full flex items-center justify-center shrink-0">
               <AlertCircle size={20} strokeWidth={2.5} className="animate-pulse" />
             </div>
             <div>
               <p className="text-[#A02070] font-black uppercase text-xs tracking-widest">Baixe Agora Mesmo</p>
               <p className="text-gray-500 text-xs font-medium mt-1">Os links de download para os manuais gratuitos expiram a qualquer momento.</p>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
                { title: "Manual de Flashcards", subtitle: "O Segredo da Retenção", icon: <Layers size={24} strokeWidth={1.5} />, color: "text-[#2E70CE] bg-[#2E70CE]/10", target: 'flashcards', tag: "Alta Demanda" },
                { title: "Cronograma UFMG", subtitle: "Mapa de 30 Semanas", icon: <Calendar size={24} strokeWidth={1.5} />, color: "text-[#A02070] bg-[#A02070]/10", tag: "Esgotando" },
                { title: "Checklist Redação", subtitle: "Estrutura 900+", icon: <CheckSquare size={24} strokeWidth={1.5} />, color: "text-[#0A192F] bg-[#0A192F]/10", target: 'mentorship' },
                { title: "Guia de Natureza", subtitle: "Tática de Prova", icon: <Stethoscope size={24} strokeWidth={1.5} />, color: "text-[#5CE1E6] bg-[#5CE1E6]/10" }
            ].map((item, i) => (
                <div key={i} onClick={() => item.target && setView(item.target)} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl cursor-pointer group hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(160,32,112,0.15)] hover:border-[#A02070]/20 text-left relative overflow-hidden flex flex-col">
                    {item.tag && (
                      <div className="absolute top-5 right-5 bg-[#A02070]/10 text-[#A02070] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-[#A02070]/20">
                        {item.tag}
                      </div>
                    )}
                    <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>{item.icon}</div>
                    <h3 className="text-xl font-black text-[#0A192F] uppercase italic mb-2 group-hover:text-[#A02070] transition-colors leading-snug">{item.title}</h3>
                    <p className="text-sm text-gray-500 font-medium mb-8 flex-grow">{item.subtitle}</p>
                    <div className="mt-auto flex justify-between items-center border-t border-gray-50 pt-5">
                      <span className="text-[#A02070] font-black text-[10px] uppercase tracking-widest group-hover:text-[#801a5a] transition-colors">Acessar Material</span>
                      <div className="w-10 h-10 rounded-full bg-[#A02070]/10 flex items-center justify-center group-hover:bg-[#A02070] group-hover:text-white text-[#A02070] transition-all duration-300 group-hover:scale-110 shadow-sm">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                </div>
            ))}
          </div>
      </div>
      <div className="lg:col-span-4"><Sidebar setView={setView} /></div>
    </div>
  </div>
);
