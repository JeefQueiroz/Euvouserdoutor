import React from 'react';
import { CalendarDays, Brain, Send } from 'lucide-react';

export const Materials = ({ setView, telegram }) => (
  <div className="p-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center animate-in fade-in duration-700">
    <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-100 flex flex-col items-center group hover:-translate-y-3 transition-transform">
      <div className="bg-blue-50 text-blue-600 p-6 rounded-3xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors"><CalendarDays size={48} /></div>
      <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-gray-900">Cronograma 100D</h3>
      <p className="text-gray-500 mb-10 font-medium flex-grow">Plano estratégico para os pesos do ENEM</p>
      <a href={telegram} target="_blank" rel="noreferrer" className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors">Aceder</a>
    </div>
    <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-100 flex flex-col items-center group hover:-translate-y-3 transition-transform">
      <div className="bg-green-50 text-green-600 p-6 rounded-3xl mb-8 group-hover:bg-green-600 group-hover:text-white transition-colors"><CalendarDays size={48} /></div>
      <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-gray-900">100+ Simulados</h3>
      <p className="text-gray-500 mb-10 font-medium flex-grow">Provas inéditas e exames em PDF</p>
      <a href={telegram} target="_blank" rel="noreferrer" className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-700 transition-colors">Baixar</a>
    </div>
    <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-100 flex flex-col items-center group hover:-translate-y-3 transition-transform">
      <div className="bg-pink-50 text-pink-600 p-6 rounded-3xl mb-8 group-hover:bg-pink-600 group-hover:text-white transition-colors"><Brain size={48} /></div>
      <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-gray-900">Flashcards</h3>
      <p className="text-gray-500 mb-10 font-medium flex-grow">Revisão ativa para 92% retenção</p>
      <button onClick={() => setView('flashcards_info')} className="w-full bg-pink-500 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-pink-600 transition-colors">Ver Ciência</button>
    </div>
  </div>
);
