import React from 'react';
import { Zap, Send } from 'lucide-react';

export const Header = ({ setView, currentView, telegram }) => (
  <header className="w-full sticky top-0 z-50 shadow-[0_14px_40px_rgba(10,25,47,0.12)]">
    <div className="bg-[#2E70CE] text-white py-2 px-4 flex justify-center items-center text-[10px] font-black uppercase tracking-[0.22em] gap-2 text-center">
      <Zap size={12} className="text-yellow-200" aria-hidden="true" />
      <span>Comunidade de estudantes, vestibulandos e futuros médicos.</span>
    </div>
    <div className="bg-[#0A192F]/95 backdrop-blur border-b border-[#2E70CE]/30 py-3.5 px-4 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-7 w-full lg:w-auto">
          <button
            type="button"
            onClick={() => setView('home')}
            className="flex items-center group shrink-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A192F]"
            aria-label="Ir para a página inicial do Eu vou ser Doutor"
          >
            <img src="/logo-euvouserdoutor.png" alt="Eu vou ser Doutor" className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
          </button>
        
          <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-blue-100/70 overflow-x-auto no-scrollbar max-w-full" aria-label="Navegação principal">
            {[
              ['home', 'Início'],
              ['about', 'Sobre'],
              ['news', 'Notícias'],
              ['materials', 'Materiais'],
              ['mentorship', 'Mentoria'],
              ['contact', 'Contato'],
            ].map(([view, label]) => (
              <button
                key={view}
                type="button"
                onClick={() => setView(view)}
                className={`px-3 py-2 rounded-full transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A192F] ${
                  currentView === view
                    ? 'text-white bg-[#2E70CE]/35'
                    : 'hover:text-white hover:bg-white/10'
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
            className="bg-white text-[#0A192F] text-[10px] font-black uppercase px-5 py-3 rounded-full shadow-[0_10px_24px_rgba(0,0,0,0.20)] hover:-translate-y-0.5 hover:bg-blue-50 active:scale-[0.98] transition-all border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A192F]"
          >
            Biblioteca
          </button>
          <a
            href={telegram}
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir comunidade do EuVouSerDoutor no Telegram"
            className="bg-white/10 text-[#5CE1E6] p-3 rounded-full border border-white/15 hover:bg-[#A02070]/20 hover:text-white hover:border-[#A02070]/40 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A192F]"
          >
            <Send size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </header>
);
