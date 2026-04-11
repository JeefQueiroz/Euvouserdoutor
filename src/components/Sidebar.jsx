import React from 'react';
import { CheckCircle, BarChart } from 'lucide-react';

export const Sidebar = ({ setView, profileImg }) => (
  <div className="sticky top-24 space-y-6 text-left">
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2E70CE] to-[#0A192F] p-1">
             <img src={profileImg} alt="Jeff Queiroz" className="w-full h-full rounded-full border-2 border-white object-cover object-top" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h3 className="font-black text-sm text-gray-900 flex items-center gap-1 leading-tight">
            Jefferson Queiroz <CheckCircle size={14} className="text-blue-600" fill="currentColor" />
          </h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Medicina | UFMG</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 italic leading-relaxed">"Ajudando você a conquistar a sua vaga. Criador da Mentoria Aprovado."</p>
    </div>
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="font-black text-[10px] text-gray-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2"><BarChart size={12} /> Mais Lidas</h3>
      <div className="space-y-4 text-xs font-bold text-gray-800">
        <p onClick={() => setView(1)} className="cursor-pointer hover:text-blue-600 line-clamp-2 italic uppercase">1. O fenômeno @euvouserdoutor na UFMG</p>
        <p onClick={() => setView('flashcards_info')} className="cursor-pointer hover:text-blue-600">2. A ciência por trás dos Flashcards</p>
      </div>
    </div>
  </div>
);
