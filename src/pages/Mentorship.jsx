import React from 'react';
import { Award, Send } from 'lucide-react';

export const Mentorship = ({ telegram }) => (
  <div className="py-40 text-center flex flex-col items-center gap-8 animate-in zoom-in duration-500 px-6">
    <div className="bg-blue-50 p-8 rounded-full"><Award size={80} className="text-blue-600 animate-bounce" /></div>
    <h2 className="text-5xl md:text-7xl font-black text-[#0A192F] uppercase tracking-tighter italic">Mentoria Aprovado</h2>
    <p className="text-gray-500 text-xl max-w-2xl font-light leading-relaxed">O sistema de elite para futuros médicos da UFMG. Novas vagas em breve.</p>
    <a href={telegram} target="_blank" rel="noreferrer" className="bg-[#2E70CE] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2">Entrar na Lista de Espera <Send size={18} /></a>
  </div>
);
