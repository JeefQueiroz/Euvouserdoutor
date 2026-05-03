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
        <h1 onClick={() => setView('home')} className="text-2xl md:text-3xl font-black tracking-tighter cursor-pointer flex items-center group">
          <span className="text-[#0A192F] mr-1.5">Eu vou ser</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E70CE] to-[#0A192F] group-hover:from-[#A02070] group-hover:to-[#A02070] transition-all duration-300">Doutor</span>
        </h1>
        
        <nav className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto no-scrollbar">
          <span onClick={() => setView('home')} className={`cursor-pointer transition-all ${currentView === 'home' ? 'text-[#2E70CE] border-b-2 border-[#2E70CE] pb-1' : 'hover:text-[#A02070]'}`}>Home</span>
          <span onClick={() => setView('news')} className={`cursor-pointer transition-all ${currentView === 'news' ? 'text-[#2E70CE] border-b-2 border-[#2E70CE] pb-1' : 'hover:text-[#A02070]'}`}>Notícias</span>
          <span onClick={() => setView('materials')} className={`cursor-pointer transition-all ${currentView === 'materials' ? 'text-[#2E70CE] border-b-2 border-[#2E70CE] pb-1' : 'hover:text-[#A02070]'}`}>Materiais</span>
          <span onClick={() => setView('mentorship')} className={`cursor-pointer transition-all ${currentView === 'mentorship' ? 'text-[#2E70CE] border-b-2 border-[#2E70CE] pb-1' : 'hover:text-[#A02070]'}`}>Mentoria</span>
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

