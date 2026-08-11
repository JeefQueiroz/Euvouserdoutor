import React from 'react';
import { BookOpen, CheckCircle, Layers, MessageCircle } from 'lucide-react';

export const Sidebar = ({ setView }) => {
  const brandImg = "https://i.imgur.com/w9OO6uT.jpeg";
  return (
    <aside className="lg:sticky lg:top-32 space-y-6 text-left">
      <div className="bg-[#11141A] rounded-3xl p-6 md:p-8 border border-white/[0.08] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#4F8CFF] to-[#080A0F] p-1">
               <img src={brandImg} alt="Jefferson Queiroz" loading="lazy" className="w-full h-full rounded-full border-2 border-white object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#11141A]"></div>
          </div>
          <div>
            <h3 className="font-black text-sm text-[#F8FAFC] leading-tight">Jefferson Queiroz <CheckCircle size={14} className="inline text-[#4F8CFF]" fill="currentColor" /></h3>
            <p className="text-[10px] text-[#4F8CFF] font-bold uppercase mt-1">Medicina | UFMG</p>
          </div>
        </div>
        <p className="text-sm text-[#98A2B3] leading-relaxed">
          Conteúdos sobre rotina acadêmica, organização de estudos e inovação em saúde para quem mira Medicina.
        </p>
      </div>

      <div className="bg-[#11141A] border border-[#4F8CFF]/30 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#4F8CFF]/10 rounded-full blur-xl"></div>
        <p className="text-[#4F8CFF] text-[10px] font-black uppercase tracking-[0.22em] mb-3">Próximo passo</p>
        <h3 className="text-xl font-black tracking-tight mb-3">Organize seus estudos com materiais de apoio.</h3>
        <p className="text-[#98A2B3] text-sm leading-relaxed mb-6">
          Acesse guias, checklists e conteúdos gratuitos para estudar com mais direção.
        </p>
        <button
          type="button"
          onClick={() => setView && setView('materials')}
          className="w-full bg-[#4F8CFF] text-[#080A0F] rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-widest hover:bg-[#7EA6FF] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Layers size={16} aria-hidden="true" /> Ver materiais
        </button>
      </div>

      <div className="bg-[#11141A] rounded-3xl p-6 md:p-8 border border-white/[0.08] shadow-2xl">
        <h3 className="text-[#4F8CFF] font-black uppercase tracking-widest text-xs mb-5">Editorias & Acesso</h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            ['news', 'Estratégias de estudo', BookOpen],
            ['materials', 'Materiais gratuitos', Layers],
            ['contact', 'Contato institucional', MessageCircle],
          ].map(([view, label, Icon]) => (
            <button
              key={view}
              type="button"
              onClick={() => setView && setView(view)}
              className="flex items-center gap-3 text-left rounded-2xl bg-[#171B23] border border-white/[0.06] px-4 py-3.5 text-sm font-bold text-[#F8FAFC] hover:text-[#4F8CFF] hover:border-[#4F8CFF]/40 transition-all"
            >
              <Icon size={16} className="text-[#4F8CFF]" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
