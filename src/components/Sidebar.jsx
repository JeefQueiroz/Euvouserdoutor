import React from 'react';
import { CheckCircle, BarChart } from 'lucide-react';

export const Sidebar = ({ setView }) => {
  const brandImg = "https://i.imgur.com/w9OO6uT.jpeg";
  return (
    <div className="sticky top-24 space-y-6 text-left">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2E70CE] to-[#0A192F] p-1">
               <img src={brandImg} alt="Avatar" className="w-full h-full rounded-full border-2 border-white object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-black text-sm text-gray-900 leading-tight">Jefferson Queiroz <CheckCircle size={14} className="inline text-blue-600" fill="currentColor" /></h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Medicina | UFMG</p>
          </div>
        </div>
        <p className="text-xs text-gray-600 italic leading-relaxed">"Ajudando você a conquistar a sua vaga. Criador da Mentoria Aprovado."</p>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-black text-[10px] text-gray-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2"><BarChart size={12} /> Mais Lidas</h3>
        <div className="space-y-4 text-xs font-bold text-gray-800 uppercase">
          <p onClick={() => setView('news')} className="cursor-pointer hover:text-blue-600 italic">1. O fenômeno @euvouserdoutor</p>
          <p onClick={() => setView('flashcards')} className="cursor-pointer hover:text-blue-600 italic">2. A ciência dos Flashcards</p>
          <p onClick={() => setView('mentorship')} className="cursor-pointer hover:text-blue-600 italic">3. O Caminho da UFMG</p>
        </div>
      </div>
    </div>
  );
};
