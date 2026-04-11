import React from 'react';
import { Zap, Stethoscope, Send } from 'lucide-react';

export const Header = ({ setView, currentView, telegram }) => (
  <header className="w-full">
    <div className="bg-[#2E70CE] text-white py-1.5 px-4 md:px-10 flex justify-center items-center text-[10px] font-black uppercase tracking-widest gap-2">
      <Zap size={12} className="text-yellow-300 animate-pulse" />
      <span>CONECTADO COM +135.000 FUTUROS DOUTORES</span>
    </div>
    <div className="bg-white border-b border-gray-100 py-2.5 px-4 md:px-10 flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 overflow-x-auto no-scrollbar">
      <span onClick={() => setView('home')} className={`cursor-pointer hover:text-blue-600 ${currentView === 'home' ? 'text-blue-600 font-black' : ''}`}>Home</span>
      <span onClick={() => setView('news')} className={`cursor-pointer hover:text-blue-600 ${currentView === 'news' || typeof currentView === 'number' ? 'text-blue-600 font-black' : ''}`}>Notícias</span>
      <span onClick={() => setView('materials')} className={`cursor-pointer hover:text-blue-600 ${currentView === 'materials' ? 'text-blue-600 font-black' : ''}`}>Materiais</span>
      <span onClick={() => setView('mentorship')} className={`cursor-pointer hover:text-blue-600 ${currentView === 'mentorship' ? 'text-blue-600 font-black' : ''}`}>Mentoria</span>
    </div>
    <div className="bg-gradient-to-r from-[#0A192F] to-[#2E70CE] text-white py-5 px-4 md:px-10 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <h1 onClick={() => setView('home')} className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2 hover:scale-105 transition-transform italic uppercase">
        <Stethoscope size={28} className="text-blue-300" /> MEDSTATION
      </h1>
      <div className="flex items-center gap-4">
         <button onClick={() => setView('materials')} className="bg-white text-[#0A192F] text-[10px] font-black uppercase px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-shadow">BIBLIOTECA</button>
         <a href={telegram} target="_blank" rel="noreferrer" className="bg-white/10 text-white p-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors"><Send size={18}/></a>
      </div>
    </div>
  </header>
);
