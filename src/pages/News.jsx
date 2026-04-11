import React from 'react';
import { Sidebar } from '../components/Sidebar';

export const News = ({ setView, profileImg }) => (
  <section className="py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
    <div className="md:w-2/3">
      <h2 className="text-4xl font-black tracking-tighter mb-10 italic uppercase border-l-8 border-blue-600 pl-6">Feed de <span className="text-blue-600">Notícias</span></h2>
      <div onClick={() => setView(1)} className="bg-white rounded-3xl p-4 mb-8 shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl transition-all group">
        <div className="flex flex-col md:flex-row gap-6">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80" className="w-full md:w-48 h-48 rounded-2xl object-cover group-hover:scale-105 transition-transform" />
          <div className="flex flex-col justify-center md:flex-1">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">INSPIRAÇÃO & ROTINA</span>
            <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">O fenômeno "@euvouserdoutor": como a rotina em Medicina na UFMG inspira 135 mil vestibulandos</h3>
            <p className="text-sm text-gray-500 line-clamp-2">Jefferson Queiroz mostra a realidade do curso para motivar os alunos que lutam pela aprovação...</p>
          </div>
        </div>
      </div>
    </div>
    <div className="md:w-1/3"><Sidebar setView={setView} profileImg={profileImg} /></div>
  </section>
);
