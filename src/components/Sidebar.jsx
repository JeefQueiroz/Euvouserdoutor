import React from 'react';
import { BookOpen, CheckCircle, Layers, MessageCircle } from 'lucide-react';

export const Sidebar = ({ setView }) => {
  const brandImg = "https://i.imgur.com/w9OO6uT.jpeg";
  return (
    <aside className="lg:sticky lg:top-32 space-y-5 text-left">
      <div className="bg-white rounded-3xl p-6 border border-[#DDE6F2] shadow-[0_18px_50px_rgba(10,25,47,0.08)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2E70CE] to-[#0A192F] p-1">
               <img src={brandImg} alt="Jefferson Queiroz" loading="lazy" className="w-full h-full rounded-full border-2 border-white object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-black text-sm text-gray-900 leading-tight">Jefferson Queiroz <CheckCircle size={14} className="inline text-blue-600" fill="currentColor" /></h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Medicina | UFMG</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          Conteúdos sobre rotina acadêmica, organização de estudos e vida universitária para quem mira Medicina.
        </p>
      </div>

      <div className="bg-[#0A192F] text-white rounded-3xl p-6 shadow-[0_18px_50px_rgba(10,25,47,0.16)]">
        <p className="text-[#5CE1E6] text-[10px] font-black uppercase tracking-[0.22em] mb-3">Próximo passo</p>
        <h3 className="text-xl font-black tracking-tight mb-3">Organize seus estudos com materiais de apoio.</h3>
        <p className="text-blue-100 text-sm leading-relaxed mb-5">
          Acesse guias, checklists e conteúdos gratuitos para estudar com mais direção.
        </p>
        <button
          type="button"
          onClick={() => setView && setView('materials')}
          className="w-full bg-white text-[#0A192F] rounded-full px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-blue-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6]"
        >
          <Layers size={16} aria-hidden="true" /> Ver materiais
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#DDE6F2] shadow-sm">
        <h3 className="text-[#0A192F] font-black uppercase tracking-widest text-xs mb-5">Categorias</h3>
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
              className="flex items-center gap-3 text-left rounded-2xl bg-[#F4F7FB] px-4 py-3 text-sm font-bold text-[#0A192F] hover:text-[#A02070] hover:bg-[#A02070]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E70CE]"
            >
              <Icon size={16} className="text-[#2E70CE]" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
