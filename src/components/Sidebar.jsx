import React from 'react';
import { BookOpen, CheckCircle, Layers, MessageCircle } from 'lucide-react';

export const Sidebar = ({ setView }) => {
  const brandImg = "https://i.imgur.com/w9OO6uT.jpeg";
  return (
    <aside className="lg:sticky lg:top-24 space-y-4 text-left">
      <div className="bg-[#11141A] rounded-2xl p-5 md:p-6 border border-white/[0.05] shadow-2xl premium-border">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#4F8CFF] to-[#080A0F] p-0.5">
               <img src={brandImg} alt="Jefferson Queiroz" loading="lazy" className="w-full h-full rounded-full border border-white/20 object-cover" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-[#11141A]"></div>
          </div>
          <div>
            <h3 className="font-black text-xs text-[#F8FAFC] leading-tight">Jefferson Queiroz <CheckCircle size={12} className="inline text-[#4F8CFF]" fill="currentColor" /></h3>
            <p className="text-[9px] text-[#4F8CFF] font-black uppercase mt-0.5">Medicina | UFMG</p>
          </div>
        </div>
        <p className="text-xs text-[#98A2B3] leading-relaxed font-medium">
          Conteúdos sobre rotina acadêmica, organização e inovação para quem mira Medicina.
        </p>
      </div>

      <div className="bg-[#11141A] border border-[#4F8CFF]/20 text-white rounded-2xl p-5 md:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[#4F8CFF]/10 rounded-full blur-xl"></div>
        <p className="text-[#4F8CFF] text-[9px] font-black uppercase tracking-[0.22em] mb-2">Próximo passo</p>
        <h3 className="text-base font-black tracking-tight mb-2 leading-tight">Biblioteca de materiais.</h3>
        <p className="text-[#98A2B3] text-xs leading-relaxed mb-5 font-medium">
          Acesse guias e checklists gratuitos para estudar com direção.
        </p>
        <button
          type="button"
          onClick={() => setView && setView('materials')}
          className="w-full bg-[#4F8CFF] text-[#080A0F] rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-[#7EA6FF] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Layers size={14} aria-hidden="true" /> Ver materiais
        </button>
      </div>

      <div className="bg-[#11141A] rounded-2xl p-5 md:p-6 border border-white/[0.05] shadow-2xl premium-border">
        <h3 className="text-[#4F8CFF] font-black uppercase tracking-widest text-[9px] mb-4">Navegação Rápida</h3>
        <div className="grid grid-cols-1 gap-2">
          {[
            ['news', 'Estratégias', BookOpen],
            ['materials', 'Materiais', Layers],
            ['contact', 'Contato', MessageCircle],
          ].map(([view, label, Icon]) => (
            <button
              key={view}
              type="button"
              onClick={() => setView && setView(view)}
              className="flex items-center gap-3 text-left rounded-xl bg-white/[0.02] border border-white/[0.05] px-4 py-2.5 text-xs font-bold text-[#F8FAFC] hover:text-[#4F8CFF] hover:border-[#4F8CFF]/30 transition-all"
            >
              <Icon size={14} className="text-[#4F8CFF]" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
