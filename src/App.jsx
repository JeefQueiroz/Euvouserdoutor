import React, { useState } from 'react';
import {
  Menu, Search, Target, Send, Download, BookOpen, Brain,
  Instagram, CheckCircle, Zap, Users, CheckSquare, Percent,
  CalendarDays, FileText, BarChart, Activity, ArrowLeft, Stethoscope, Award
} from 'lucide-react';

const theme = {
  topColor: '#0A192F',
  bottomColor: '#2E70CE',
  lightBg: '#F4F7FB',
  gradientHeader: 'bg-gradient-to-r from-[#0A192F] via-[#11294D] to-[#2E70CE]',
  textAccent: 'text-[#2E70CE]',
  borderAccent: 'border-[#2E70CE]',
  bgAccent: 'bg-[#2E70CE]',
  shadowSoft: 'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
  shadowHover: 'hover:shadow-[0_8px_30px_rgb(46,112,206,0.12)]'
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const telegram = "https://t.me/Euvouserdoutor";
  const profileImg = "https://i.imgur.com/w9OO6uT.jpeg";

  const PortalHeader = () => (
    <div className="w-full">
      <div className="bg-[#2E70CE] text-white py-1.5 px-4 md:px-10 flex justify-center items-center text-[10px] font-black uppercase tracking-widest gap-2">
        <Zap size={12} className="text-yellow-300 animate-pulse" />
        <span>+135.000 FUTUROS DOUTORES CONECTADOS</span>
      </div>
      <div className="bg-[#f8f8f8] border-b border-gray-200 py-2 px-4 md:px-10 flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 overflow-x-auto no-scrollbar">
        <span onClick={() => setCurrentView('home')} className="cursor-pointer hover:text-[#2E70CE]">Home</span>
        <span onClick={() => setCurrentView('materials')} className="cursor-pointer hover:text-[#2E70CE]">Materiais Gratuitos</span>
        <span onClick={() => setCurrentView('community')} className="cursor-pointer hover:text-[#2E70CE]">Mentoria Aprovado</span>
      </div>
      <div className={`${theme.gradientHeader} text-white py-5 px-4 md:px-10 flex justify-between items-center sticky top-0 z-50 shadow-lg`}>
        <h1 onClick={() => setCurrentView('home')} className="text-3xl font-black tracking-tighter cursor-pointer flex items-center gap-2 transition-transform hover:scale-105 origin-left uppercase italic">
          <Target size={28} className="text-blue-300" /> MEDSTATION
        </h1>
        <div className="flex items-center gap-4">
           <button onClick={() => setCurrentView('materials')} className="bg-white text-[#0A192F] text-[10px] font-black uppercase px-4 py-2 rounded-full hidden sm:block shadow-md">BIBLIOTECA</button>
           <a href={telegram} target="_blank" className="bg-[#0A192F]/20 text-white p-2 rounded-full border border-white/20"><Send size={18}/></a>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="animate-in fade-in duration-700">
      <section className="relative w-full overflow-hidden bg-[#0A192F] text-white pt-24 pb-40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 to-[#2E70CE]/90"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">Caloiro Medicina UFMG</span>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.9] italic uppercase">Sua vaga não é <br/><span className="text-blue-400">negociável.</span></h1>
            <p className="text-xl text-blue-100 font-light mb-10 leading-relaxed max-w-lg opacity-80">Jefferson Queiroz utiliza a experiência na UFMG para democratizar o acesso à Medicina através da Mentoria Aprovado.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => setCurrentView('materials')} className="bg-white text-[#0A192F] px-10 py-4 rounded-2xl font-black text-sm uppercase shadow-2xl hover:scale-105 transition-transform">Ver Materiais</button>
              <a href={telegram} target="_blank" className="bg-[#2E70CE] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-3 hover:bg-blue-600 transition-colors shadow-2xl">Telegram <Send size={20}/></a>
            </div>
          </div>
          <div className="md:w-1/2 hidden md:block">
            <div className="w-full h-[540px] rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl relative">
              <img src={profileImg} alt="Jefferson Queiroz | UFMG" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl">
                 <div className="flex items-center gap-4">
                    <div className="bg-green-500 w-12 h-12 rounded-2xl flex items-center justify-center text-white"><CheckSquare size={24}/></div>
                    <div>
                      <p className="text-sm font-black text-white">Redação Nota 920+</p>
                      <p className="text-[10px] font-bold text-green-300 uppercase tracking-widest">Média dos Alunos Mentorados</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans selection:bg-blue-200 text-gray-900">
      <PortalHeader />
      <main className="min-h-[70vh]">
        {currentView === 'home' && <HomePage />}
        {currentView === 'materials' && (
          <div className="p-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-100 flex flex-col items-center group hover:-translate-y-3 transition-transform">
              <div className="bg-blue-50 text-blue-600 p-6 rounded-3xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors"><CalendarDays size={48}/></div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Cronograma 100D</h3>
              <p className="text-gray-500 mb-10 font-medium">O plano estratégico exato para os pesos de Medicina no ENEM.</p>
              <a href={telegram} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Aceder Agora</a>
            </div>
            <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-100 flex flex-col items-center group hover:-translate-y-3 transition-transform">
              <div className="bg-green-50 text-green-600 p-6 rounded-3xl mb-8 group-hover:bg-green-600 group-hover:text-white transition-colors"><CheckSquare size={48}/></div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">100+ Simulados</h3>
              <p className="text-gray-500 mb-10 font-medium">Provas inéditas, FUVEST e ENEM comentados em PDF.</p>
              <a href={telegram} className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Baixar PDFs</a>
            </div>
            <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-gray-100 flex flex-col items-center group hover:-translate-y-3 transition-transform">
              <div className="bg-pink-50 text-pink-600 p-6 rounded-3xl mb-8 group-hover:bg-pink-600 group-hover:text-white transition-colors"><Brain size={48}/></div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Flashcards</h3>
              <p className="text-gray-500 mb-10 font-medium">Revisão ativa para retenção de 92% da matéria.</p>
              <a href={telegram} className="w-full bg-pink-500 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest">Obter Decks</a>
            </div>
          </div>
        )}
        {currentView === 'community' && (
          <div className="py-40 text-center flex flex-col items-center gap-8 animate-in zoom-in duration-500 px-6">
            <div className="bg-blue-50 p-8 rounded-full"><Award size={80} className="text-blue-600 animate-bounce"/></div>
            <h2 className="text-5xl md:text-7xl font-black text-[#0A192F] uppercase tracking-tighter italic">Mentoria Aprovado</h2>
            <p className="text-gray-500 text-xl max-w-2xl font-light leading-relaxed">O sistema de elite criado por Jefferson Queiroz para garantir caloiros na UFMG. Novas vagas em breve.</p>
            <div className="flex gap-4">
               <a href={telegram} className="bg-[#2E70CE] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Lista de Espera</a>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-[#0A192F] text-white py-24 mt-20 border-t-8 border-blue-600 text-center">
        <div className="flex justify-center gap-2 items-center mb-8 opacity-40 grayscale">
          <Target size={20} /> <span className="font-black tracking-[0.4em] uppercase text-xs text-white">Euvouserdoutor</span>
        </div>
        <p className="font-black text-xl mb-2 tracking-tighter">Jefferson Queiroz | Medicina UFMG</p>
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest opacity-60">Aprovação é método, não sorte.</p>
        <div className="flex justify-center gap-10 mt-12">
           <a href="https://instagram.com/euvouserdoutor" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-all scale-150"><Instagram size={24}/></a>
           <a href={telegram} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-all scale-150"><Send size={24}/></a>
        </div>
        <p className="mt-16 text-[9px] font-bold text-gray-600 uppercase tracking-[0.5em]">© 2026 Todos os direitos reservados</p>
      </footer>
    </div>
  );
};

export default App;
