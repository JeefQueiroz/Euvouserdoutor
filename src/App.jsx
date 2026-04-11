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

const newsArticles = [
  { id: 1, tag: "Inspiração & Rotina", title: "O fenómeno '@euvouserdoutor': Como a rotina na Medicina UFMG inspira 135 mil vestibulandos", excerpt: "Jefferson Queiroz mostra a realidade do curso para motivar os alunos que lutam pela aprovação.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80", date: "Hoje", isFeatured: true },
  { id: 2, tag: "Estratégia ENEM", title: "Flashcards Aprovado: O segredo para reter Natureza", excerpt: "Como garantir os 92% em Biologia e não esquecer as fórmulas no dia do exame.", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80", isFeatured: false }
];

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
        <h1 onClick={() => setCurrentView('home')} className="text-3xl font-black tracking-tighter cursor-pointer flex items-center gap-2">
          <Target size={28} className="text-blue-300" /> MEDSTATION
        </h1>
        <button onClick={() => setCurrentView('materials')} className="bg-white text-[#0A192F] text-xs font-black uppercase px-4 py-2 rounded-full hidden sm:block">BIBLIOTECA</button>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="animate-in fade-in duration-700">
      <section className="relative w-full overflow-hidden bg-[#0A192F] text-white pt-24 pb-40">
        <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <span className="bg-green-500/20 text-green-300 border border-green-400/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">Medicina UFMG</span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight italic">Sua vaga não é <br/><span className="text-blue-400">negociável.</span></h1>
            <p className="text-xl text-blue-100 font-light mb-10 leading-relaxed">A estratégia de Jefferson Queiroz para transformar vestibulandos em calouros de Medicina através da Mentoria Aprovado.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setCurrentView('materials')} className="bg-white text-[#0A192F] px-8 py-3.5 rounded-full font-bold shadow-xl hover:scale-105 transition-transform">Baixar Materiais</button>
              <a href={telegram} target="_blank" className="bg-[#2E70CE] text-white px-8 py-3.5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors">Telegram <Send size={18}/></a>
            </div>
          </div>
          <div className="md:w-1/2 hidden md:block">
            <div className="w-full h-[500px] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl relative">
              <img src={profileImg} alt="Jefferson Queiroz | UFMG" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                 <p className="text-sm font-bold text-white flex items-center gap-2"><CheckSquare size={16} className="text-green-400"/> Redação: 920+ (Média)</p>
                 <p className="text-sm font-bold text-white flex items-center gap-2 mt-1"><Percent size={16} className="text-blue-300"/> Retenção Padrão Ouro</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans selection:bg-blue-200">
      <PortalHeader />
      <main className="min-h-[70vh]">
        {currentView === 'home' && <HomePage />}
        {currentView === 'materials' && (
          <div className="p-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center">
              <CalendarDays size={48} className="text-blue-600 mb-6"/>
              <h3 className="text-2xl font-black mb-4 uppercase">Cronograma 100D</h3>
              <p className="text-gray-500 mb-8">O plano exato para os pesos de Medicina.</p>
              <a href={telegram} className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold">ACESSAR</a>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center">
              <CheckSquare size={48} className="text-green-500 mb-6"/>
              <h3 className="text-2xl font-black mb-4 uppercase">100+ Simulados</h3>
              <p className="text-gray-500 mb-8">Provas inéditas e exames em PDF.</p>
              <a href={telegram} className="w-full bg-green-500 text-white py-3 rounded-xl font-bold">BAIXAR</a>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 flex flex-col items-center">
              <Brain size={48} className="text-pink-500 mb-6"/>
              <h3 className="text-2xl font-black mb-4 uppercase">Flashcards</h3>
              <p className="text-gray-500 mb-8">Revisão ativa para reter a matéria.</p>
              <a href={telegram} className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold">OBTER</a>
            </div>
          </div>
        )}
        {currentView === 'community' && (
          <div className="py-40 text-center flex flex-col items-center gap-6">
            <Award size={80} className="mx-auto text-blue-600 animate-bounce"/>
            <h2 className="text-5xl font-black text-[#0A192F] uppercase italic">Mentoria Aprovado</h2>
            <p className="text-gray-500 text-lg max-w-md">O sistema de elite para futuros médicos da UFMG. Novas turmas em breve.</p>
          </div>
        )}
      </main>
      <footer className="bg-[#0A192F] text-white py-16 border-t-8 border-blue-600 text-center">
        <h2 className="text-2xl font-black tracking-tighter italic uppercase mb-4">EUVOUSERDOUTOR</h2>
        <p className="font-bold text-gray-400">Jefferson Queiroz | Medicina UFMG</p>
        <div className="flex justify-center gap-6 mt-8">
           <a href="https://instagram.com/euvouserdoutor" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Instagram size={24}/></a>
           <a href={telegram} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Send size={24}/></a>
        </div>
      </footer>
    </div>
  );
};

export default App;
