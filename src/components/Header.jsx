import React from 'react';
import { Zap, Send } from 'lucide-react';

export const Header = ({ setView, currentView, telegram }) => (
  <header className="w-full sticky top-0 z-50 shadow-[0_14px_40px_rgba(0,0,0,0.5)]">
    <div className="bg-[#4F8CFF] text-[#080A0F] py-2 px-4 flex justify-center items-center text-[10px] font-black uppercase tracking-[0.25em] gap-2 text-center">
      <Zap size={12} className="text-[#080A0F]" aria-hidden="true" />
      <span>Portal Editorial de Medicina, Ciência e Educação — EuVouSerDoutor</span>
    </div>
    <div className="bg-[#080A0F]/95 backdrop-blur border-b border-white/[0.08] py-3.5 px-4 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-7 w-full lg:w-auto">
          <button
            type="button"
            onClick={() => setView('home')}
            className="flex items-center group shrink-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080A0F]"
            aria-label="Ir para a página inicial do Eu vou ser Doutor"
          >
            <img src="/logo-euvouserdoutor.png" alt="Eu vou ser Doutor" className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
          </button>
        
          <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-[#98A2B3] overflow-x-auto no-scrollbar max-w-full" aria-label="Navegação principal">
            {[
              ['home', 'Início'],
              ['about', 'Sobre'],
              ['author', 'Autor'],
              ['news', 'Notícias'],
              ['materials', 'Materiais'],
              ['mentorship', 'Mentoria'],
              ['contact', 'Contato'],
            ].map(([view, label]) => (
              <button
                key={view}
                type="button"
                onClick={() => setView(view)}
                className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F] ${
                  currentView === view
                    ? 'text-white bg-[#4F8CFF]/20 border border-[#4F8CFF]/40'
                    : 'hover:text-white hover:bg-white/[0.06]'
                }`}
                aria-current={currentView === view ? 'page' : undefined}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setView('materials')}
            className="bg-[#11141A] text-white text-[10px] font-black uppercase px-5 py-3 rounded-xl shadow-lg hover:bg-[#171B23] active:scale-[0.98] transition-all border border-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F]"
          >
            Biblioteca
          </button>
          <a
            href={telegram}
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir comunidade do EuVouSerDoutor no Telegram"
            className="bg-[#4F8CFF]/10 text-[#4F8CFF] p-3 rounded-xl border border-[#4F8CFF]/20 hover:bg-[#4F8CFF] hover:text-[#080A0F] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F]"
          >
            <Send size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </header>
);
