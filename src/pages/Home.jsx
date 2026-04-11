import React from 'react';
import { Download, CheckSquare, Percent, Zap, Target, Users, Quote } from 'lucide-react';

export const Home = ({ setView, profileImg }) => {
  const homeImg = "https://i.imgur.com/P8oXDVC.jpg";
  return (
    <div className="animate-in text-left">
      <section className="relative w-full overflow-hidden bg-[#0A192F] text-white pt-20 pb-40 md:pt-32 md:pb-56">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 to-[#2E70CE]/90"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 flex flex-col items-start">
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              +135.000 VESTIBULANDOS INSPIRADOS
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95] text-white uppercase italic">
              Democratizando <br/> o Acesso à <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">Medicina</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/70 font-light mb-10 max-w-lg leading-relaxed">
              O ecossistema completo que integra a <strong>Mentoria Aprovado</strong> e os <strong>Flashcards Aprovado</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setView('materials')} className="bg-white text-[#0A192F] px-8 py-4 rounded-full font-black text-xs uppercase shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <Download size={18} /> Materiais Gratuitos
              </button>
              <button onClick={() => setView('mentorship')} className="bg-blue-600/20 text-white border border-blue-400/30 px-8 py-4 rounded-full font-black text-xs uppercase hover:bg-blue-600/40 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                <Users size={18} /> Mentoria Aprovado
              </button>
            </div>
          </div>
          <div className="md:w-1/2 hidden md:block">
            <div className="w-full h-[540px] rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl relative">
              <img src={homeImg} alt="Jeff" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-8 left-6 right-6 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
                 <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-1.5 rounded-lg text-white"><CheckSquare size={16}/></div>
                      <div className="text-left">
                        <p className="text-[10px] text-green-300 font-bold uppercase leading-none">Redação</p>
                        <p className="text-sm font-black text-white">920 (Média da Mentoria)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500 p-1.5 rounded-lg text-white"><Percent size={16}/></div>
                      <div className="text-left">
                        <p className="text-[10px] text-blue-300 font-bold uppercase leading-none">Natureza</p>
                        <p className="text-sm font-black text-white">Biologia: 92% | Química: 88%</p>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-[#2E70CE] font-black text-[10px] uppercase tracking-[0.3em]">MÉTODO VESTIBULAR</span>
          <h2 className="text-4xl font-black text-[#0A192F] mt-4 italic uppercase">Os Pilares da Aprovação</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <Zap size={28} className="text-[#2E70CE] mb-6" />
            <h3 className="text-xl font-black text-[#0A192F] mb-4 uppercase italic">Inspiração Real</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Mostramos a rotina na UFMG para transformar o teu sonho em combustível diário.</p>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <Target size={28} className="text-[#2E70CE] mb-6" />
            <h3 className="text-xl font-black text-[#0A192F] mb-4 uppercase italic">Estratégia Técnica</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Flashcards e cronogramas focados na FUVEST e ENEM.</p>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <Users size={28} className="text-[#2E70CE] mb-6" />
            <h3 className="text-xl font-black text-[#0A192F] mb-4 uppercase italic">Comunidade VIP</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Suporte real de quem já trilhou esse caminho com sucesso.</p>
          </div>
        </div>
      </section>
      <section className="bg-white py-20 border-y border-gray-100 text-center">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Seguidores no IG', val: '135K', color: 'text-[#0A192F]' },
            { label: 'Retenção Natureza', val: '92%', color: 'text-[#2E70CE]' },
            { label: 'Simulados Inéditos', val: '100+', color: 'text-[#0A192F]' },
            { label: 'Taxa Aprovação', val: '85%', color: 'text-[#2E70CE]' }
          ].map((item, i) => (
            <div key={i}>
              <p className={`text-4xl md:text-5xl font-black ${item.color} italic`}>{item.val}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-24 bg-[#F4F7FB]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white p-12 md:p-20 rounded-[50px] shadow-2xl relative overflow-hidden border border-gray-100 text-left">
            <Quote className="absolute top-10 left-10 text-blue-50" size={120} />
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-bold text-gray-800 italic leading-relaxed mb-10">"A estratégia da Mentoria Aprovado aliada aos cronogramas fez-me alcançar 920 na redação e dominar a prova de Natureza."</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-black">M</div>
                <div><p className="font-black text-[#0A192F] uppercase text-sm">Mariana C.</p><p className="text-xs text-blue-600 font-bold uppercase">Caloira de Medicina</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
