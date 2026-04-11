import React from 'react';
import { Download, BookOpen } from 'lucide-react';

export const Home = ({ setView, profileImg }) => (
  <section className="relative w-full overflow-hidden bg-[#0A192F] text-white pt-24 pb-48">
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 to-[#2E70CE]/90"></div>
    <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 text-left">
      <div className="md:w-1/2">
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          +135.000 VESTIBULANDOS INSPIRADOS
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
          Democratizando <br/>
          <span className="text-white">o Acesso à Medicina</span>
        </h1>
        <p className="text-lg text-blue-100/80 font-light mb-10 max-w-lg leading-relaxed">
          O ecossistema completo que integra a Mentoria Aprovado e os Flashcards Aprovado para garantir a sua vaga.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-start">
          <button onClick={() => setView('materials')} className="bg-white text-[#0A192F] px-8 py-4 rounded-full font-black text-sm uppercase shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
            <Download size={18} /> Materiais Gratuitos
          </button>
          <button onClick={() => setView(1)} className="bg-blue-600/30 text-white border border-blue-400/30 px-8 py-4 rounded-full font-black text-sm uppercase hover:bg-blue-600/50 transition-colors">Dicas de Estudo</button>
        </div>
      </div>
      <div className="md:w-1/2 hidden md:block">
        <div className="w-full h-[540px] rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl relative">
          <img src={profileImg} alt="Jeff Queiroz" className="w-full h-full object-cover object-top" />
        </div>
      </div>
    </div>
  </section>
);
