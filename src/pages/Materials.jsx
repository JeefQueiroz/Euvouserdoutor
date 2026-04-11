import React from 'react';
import { CalendarDays, CheckSquare, Brain } from 'lucide-react';

export const Materials = ({ telegram }) => (
  <div className="p-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center animate-in fade-in slide-in-from-bottom-10 duration-700">
    {[
      { title: "Cronograma 100D", desc: "O plano estratégico exato para os pesos de Medicina no ENEM.", icon: CalendarDays, color: "blue", bgColor: "bg-blue-50", textColor: "text-blue-600", hoverBg: "hover:bg-blue-600" },
      { title: "100+ Simulados", desc: "Provas inéditas, FUVEST e ENEM comentados em PDF.", icon: CheckSquare, color: "green", bgColor: "bg-green-50", textColor: "text-green-600", hoverBg: "hover:bg-green-600" },
      { title: "Flashcards", desc: "Revisão ativa para retenção de 92% da matéria.", icon: Brain, color: "pink", bgColor: "bg-pink-50", textColor: "text-pink-600", hoverBg: "hover:bg-pink-600" }
    ].map((m, idx) => {
      const Icon = m.icon;
      return (
        <div key={idx} className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-100 flex flex-col items-center group hover:-translate-y-3 transition-transform">
          <div className={`${m.bgColor} ${m.textColor} p-6 rounded-3xl mb-8 group-hover:${m.color}-600 group-hover:text-white transition-colors`}><Icon size={48}/></div>
          <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{m.title}</h3>
          <p className="text-gray-500 mb-10 font-medium">{m.desc}</p>
          <a href={telegram} target="_blank" rel="noreferrer" className={`w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors shadow-lg`}>Aceder Agora</a>
        </div>
      );
    })}
  </div>
);
