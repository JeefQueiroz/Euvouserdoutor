import React from 'react';
import { Zap, Send } from 'lucide-react';

export const Header = ({ setView, currentView, telegram }) => (
  <header className="w-full sticky top-0 z-50 shadow-lg">
    <div className="bg-[#2E70CE] text-white py-1.5 px-4 flex justify-center items-center text-[10px] font-black uppercase tracking-widest gap-2">
      <Zap size={12} className="text-yellow-300 animate-pulse" />
      <span>CONECTADO COM +135.000 FUTUROS DOUTORES</span>
    </div>
    <div className="bg-white border-b border-gray-100 py-3.5 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Left side: Logo & Nav Links */}
      <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
        <h1 onClick={() => setView('home')} className="cursor-pointer flex items-center group shrink-0" aria-label="Eu vou ser Doutor">
          <img src="/logo-euvouserdoutor.png" alt="Eu vou ser Doutor" className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
        </h1>
        
        <nav className="flex gap-5 text-[10px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto no-scrollbar max-w-full">
          {[
            ['home', 'Início'],
            ['about', 'Sobre'],
            ['news', 'Notícias'],
            ['materials', 'Materiais'],
            ['mentorship', 'Mentoria'],
            ['contact', 'Contato'],
          ].map(([view, label]) => (
            <span key={view} onClick={() => setView(view)} className={`cursor-pointer transition-all whitespace-nowrap ${currentView === view ? 'text-[#2E70CE] border-b-2 border-[#2E70CE] pb-1' : 'hover:text-[#A02070]'}`}>
              {label}
            </span>
          ))}
        </nav>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-4 shrink-0">
        <button onClick={() => setView('materials')} className="bg-[#0A192F] text-white text-[10px] font-black uppercase px-5 py-2.5 rounded-full shadow-md hover:scale-105 hover:shadow-[0_0_15px_#A02070] transition-all border border-transparent hover:border-[#A02070]">BIBLIOTECA</button>
        <a href={telegram} target="_blank" rel="noreferrer" className="bg-[#2E70CE]/10 text-[#2E70CE] p-2 rounded-full border border-[#2E70CE]/20 hover:bg-[#A02070]/10 hover:text-[#A02070] hover:border-[#A02070]/30 transition-all"><Send size={18}/></a>
      </div>
    </div>
  </header>
);
