import React from 'react';
import { Zap, Send } from 'lucide-react';

export const Header = ({ setView, currentView, telegram }) => (
  <header className="w-full sticky top-0 z-50 shadow-[0_14px_40px_rgba(10,25,47,0.12)]">
    <div className="bg-[#2E70CE] text-white py-2 px-4 flex justify-center items-center text-[10px] font-black uppercase tracking-[0.22em] gap-2 text-center">
      <Zap size={12} className="text-yellow-200" aria-hidden="true" />
      <span>Comunidade de estudantes, vestibulandos e futuros médicos.</span>
    </div>
    <div className="bg-white/95 backdrop-blur border-b border-[#D9E2EF] py-3.5 px-4 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-7 w-full lg:w-auto">
          <button
            type="button"
            onClick={() => setView('home')}
            className="flex items-center group shrink-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E70CE] focus-visible:ring-offset-4"
            aria-label="Ir para a página inicial do Eu vou ser Doutor"
          >
            <img src="/logo-euvouserdoutor.png" alt="Eu vou ser Doutor" className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
          </button>
        
          <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 overflow-x-auto no-scrollbar max-w-full" aria-label="Navegação principal">
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
                className={`px-3 py-2 rounded-full transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E70CE] focus-visible:ring-offset-2 ${
                  currentView === view
                    ? 'text-[#2E70CE] bg-[#2E70CE]/10'
                    : 'hover:text-[#A02070] hover:bg-[#A02070]/5'
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
            className="bg-[#0A192F] text-white text-[10px] font-black uppercase px-5 py-3 rounded-full shadow-[0_10px_24px_rgba(10,25,47,0.18)] hover:-translate-y-0.5 hover:bg-[#142B4A] active:scale-[0.98] transition-all border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A02070] focus-visible:ring-offset-2"
          >
            Biblioteca
          </button>
          <a
            href={telegram}
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir comunidade do EuVouSerDoutor no Telegram"
            className="bg-[#2E70CE]/10 text-[#2E70CE] p-3 rounded-full border border-[#2E70CE]/20 hover:bg-[#A02070]/10 hover:text-[#A02070] hover:border-[#A02070]/30 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E70CE] focus-visible:ring-offset-2"
          >
            <Send size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </header>
);
