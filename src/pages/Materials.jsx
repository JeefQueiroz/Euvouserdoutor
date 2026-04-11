import React from 'react';
import { Calendar, CheckSquare, Stethoscope, ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const Materials = ({ setView, telegram }) => (
  <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen">
    <div className="bg-gradient-to-r from-[#0A192F] to-[#2E70CE] text-white pt-16 pb-36 px-6 relative text-left">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setView('home')} className="flex items-center gap-2 text-[10px] font-black text-blue-200 mb-8 uppercase bg-white/10 px-4 py-2 rounded-full hover:bg-white/20">
          <ArrowLeft size={14} /> Voltar
        </button>
        <h1 className="text-4xl md:text-7xl font-black mb-6 italic uppercase">Biblioteca MedStation</h1>
        <p className="text-lg md:text-xl text-blue-100 font-light max-w-3xl opacity-90">Conteúdo validado por quem conquistou a UFMG.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-24 relative z-20">
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
              { title: "Manual de Flashcards", icon: <Layers />, color: "bg-blue-600", target: 'flashcards' },
              { title: "Cronograma UFMG", icon: <Calendar />, color: "bg-purple-600" },
              { title: "Checklist Redação", icon: <CheckSquare />, color: "bg-green-600", target: 'mentorship' },
              { title: "Guia de Natureza", icon: <Stethoscope />, color: "bg-red-600" }
          ].map((item, i) => (
              <div key={i} onClick={() => item.target && setView(item.target)} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl cursor-pointer hover:shadow-2xl transition-all text-left">
                  <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6`}>{item.icon}</div>
                  <h3 className="text-xl font-black text-[#0A192F] uppercase italic mb-2">{item.title}</h3>
                  <button className="text-blue-600 font-black text-[10px] uppercase flex items-center gap-2">Aceder <ArrowRight size={14} /></button>
              </div>
          ))}
      </div>
      <div className="lg:col-span-4"><Sidebar setView={setView} /></div>
    </div>
  </div>
);
