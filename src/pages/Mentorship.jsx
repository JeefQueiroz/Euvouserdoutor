import React from 'react';
import { Trophy, Calendar, Zap, PenTool, Send, ShieldCheck } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const Mentorship = ({ setView, profileImg, telegram }) => (
  <div className="pb-20">
    <div className="bg-gradient-to-r from-[#0A192F] to-[#2E70CE] text-white pt-12 pb-24 px-6 relative overflow-hidden text-left">
      <div className="max-w-4xl mx-auto relative z-10 text-left">
        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter italic uppercase">Mentoria Aprovado</h1>
        <p className="text-lg md:text-xl text-blue-100 font-light leading-relaxed max-w-3xl opacity-90">O sistema de elite para futuros médicos da UFMG. Estratégia comprovada com 92% em Ciências da Natureza.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 -mt-16 relative z-20">
      <div className="lg:w-2/3 space-y-10">
        <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-black text-[#0A192F] uppercase tracking-tight flex items-center gap-3 mb-8"><ShieldCheck className="text-blue-600" size={28}/> Método de Aprovação</h2>
          <p className="text-gray-600 leading-relaxed mb-10">Focamos em estudo ativo e estratégia técnica validada pelo Jeff Queiroz na UFMG.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-[32px]">
              <Calendar className="text-blue-600 mb-4" size={32} />
              <h3 className="font-black uppercase text-[#0A192F] mt-4">Cronograma 30 Semanas</h3>
              <p className="text-sm text-gray-600 mt-2">Planejamento estratégico focado nos pesos do ENEM</p>
            </div>
            <div className="bg-green-50 p-8 rounded-[32px]">
              <Zap className="text-green-600 mb-4" size={32} />
              <h3 className="font-black uppercase text-[#0A192F] mt-4">Foco em Natureza</h3>
              <p className="text-sm text-gray-600 mt-2">Biologia, Química e Física com alta retenção</p>
            </div>
          </div>
        </div>
        <div className="bg-[#0A192F] rounded-[40px] p-8 md:p-16 text-white">
          <h2 className="text-3xl font-black uppercase italic mb-10 flex items-center gap-3"><Trophy className="text-yellow-400" size={28}/> Diferencial de Retenção</h2>
          <div className="space-y-8">
            <div>
              <span className="text-[10px] uppercase font-black">Estudo Tradicional: 30%</span>
              <div className="h-3 w-full bg-white/10 rounded-full mt-3">
                <div className="h-full bg-red-500 w-[30%] rounded-full"></div>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-black text-blue-400">Mentoria Aprovado: 92%</span>
              <div className="h-3 w-full bg-white/10 rounded-full mt-3">
                <div className="h-full bg-blue-400 w-[92%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <a href={telegram} target="_blank" rel="noreferrer" className="block w-full bg-[#2E70CE] text-white py-6 rounded-2xl font-black uppercase text-xs text-center shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex justify-center items-center gap-3">Quero Ser Mentorado <PenTool size={18}/></a>
      </div>
      <div className="lg:w-1/3"><Sidebar setView={setView} profileImg={profileImg} /></div>
    </div>
  </div>
);
