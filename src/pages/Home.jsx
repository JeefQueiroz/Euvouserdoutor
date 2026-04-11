import React from 'react';
import { CheckSquare } from 'lucide-react';

export const Home = ({ setView, profileImg }) => (
  <section className="relative w-full overflow-hidden bg-[#0A192F] text-white pt-24 pb-40">
    <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 to-[#2E70CE]/90"></div>
    <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2 text-center md:text-left">
        <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">Medicina UFMG</span>
        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9] italic uppercase">Sua vaga não é <br/><span className="text-blue-400">negociável.</span></h1>
        <p className="text-lg text-blue-100 font-light mb-10 opacity-80">Jefferson Queiroz utiliza a experiência na UFMG para democratizar o acesso à Medicina através da Mentoria Aprovado.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button onClick={() => setView(1)} className="bg-white text-[#0A192F] px-10 py-4 rounded-2xl font-black text-sm uppercase shadow-2xl hover:scale-105 transition-transform">Ler Artigo Principal</button>
          <button onClick={() => setView('materials')} className="bg-transparent text-white border-2 border-white/20 px-10 py-4 rounded-2xl font-black text-sm uppercase hover:bg-white/10 transition-colors">Ver Materiais</button>
        </div>
      </div>
      <div className="md:w-1/2 hidden md:block">
        <div className="w-full h-[540px] rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl relative">
          <img src={profileImg} alt="Jeff Queiroz" className="w-full h-full object-cover object-top" />
          <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl">
             <div className="flex items-center gap-4">
                <div className="bg-green-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white"><CheckSquare size={24}/></div>
                <div><p className="text-sm font-black text-white">Redação Nota 920+</p><p className="text-[10px] font-bold text-green-300 uppercase tracking-widest leading-none">Média da Mentoria</p></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
