import React from 'react';
import { Zap, Send } from 'lucide-react';

export const Header = ({ setView, currentView, telegram }) => (
  <header className="w-full sticky top-0 z-50">
    {/* Top Bar - More subtle */}
    <div className="bg-[#4F8CFF] text-[#080A0F] py-1.5 px-4 flex justify-center items-center text-[9px] font-black uppercase tracking-[0.25em] gap-2 text-center">
      <Zap size={10} className="text-[#080A0F]" aria-hidden="true" />
      <span>Portal Editorial de Medicina, Ciência e Educação</span>
    </div>
    
    {/* Main Header - Glassmorphism */}
    <div className="bg-[#080A0F]/80 backdrop-blur-xl border-b border-white/[0.05] py-2.5 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setView('home')}
            className="flex items-center group shrink-0 focus:outline-none"
            aria-label="Ir para a página inicial"
          >
            <img src="/logo-euvouserdoutor.png" alt="Logo" className="h-10 md:h-12 w-auto object-contain transition-opacity group-hover:opacity-80" />
          </button>
        
          <nav className="hidden lg:flex gap-1 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]" aria-label="Navegação principal">
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
                className={`px-3.5 py-1.5 rounded-lg transition-all focus:outline-none ${
                  currentView === view
                    ? 'text-white bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                    : 'hover:text-white hover:bg-white/[0.03]'
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
            className="bg-white/[0.05] text-white text-[9px] font-black uppercase px-4 py-2 rounded-lg border border-white/[0.08] hover:bg-white/[0.1] transition-all focus:outline-none"
          >
            Biblioteca
          </button>
          <a
            href={telegram}
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="bg-[#4F8CFF] text-[#080A0F] p-2 rounded-lg hover:bg-[#7EA6FF] transition-all focus:outline-none shadow-[0_0_20px_rgba(79,140,255,0.2)]"
          >
            <Send size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </header>
);
