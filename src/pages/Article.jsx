import React from 'react';
import { ArrowLeft, Quote } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const Article = ({ setView, profileImg, telegram }) => (
  <div className="animate-in pb-20">
    <div className="bg-gradient-to-r from-[#0A192F] to-[#2E70CE] text-white pt-12 pb-24 px-6 relative overflow-hidden text-left">
      <div className="max-w-4xl mx-auto relative z-10 text-left">
        <button onClick={() => setView('news')} className="flex items-center gap-2 text-[10px] font-black text-blue-200 hover:text-white transition-colors mb-8 uppercase tracking-[0.2em] bg-white/10 px-4 py-2 rounded-full w-fit backdrop-blur-md">
          <ArrowLeft size={14} /> Voltar para Notícias
        </button>
        <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest mb-6">INSPIRAÇÃO E ROTINA</div>
        <h1 className="text-3xl md:text-6xl font-black leading-tight mb-6 tracking-tighter italic">O fenômeno @euvouserdoutor: Inspirando 135 mil vestibulandos</h1>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 -mt-16 relative z-20">
      <div className="lg:w-2/3 bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-gray-100 text-left">
        <div className="flex flex-col md:flex-row gap-10 mb-12">
          <div className="md:w-1/2 shrink-0">
            <img src={profileImg} alt="Jeff Queiroz UFMG" className="w-full h-auto rounded-3xl shadow-xl border-4 border-gray-50 object-cover object-top" />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center text-left">
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-4 text-blue-600">Por Jefferson Queiroz</p>
            <p className="text-lg text-gray-700 italic font-medium leading-relaxed">Jefferson Queiroz compartilha como transformou a pressão do vestibular em um método validado que ajuda milhares de estudantes a conquistarem vaga na UFMG.</p>
          </div>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans space-y-8 text-left">
          <p className="dropcap">A rotina de um vestibulando de Medicina é marcada por incertezas, pressão e pilhas de livros. Jefferson Queiroz, que superou essa fase e hoje cursa Medicina na UFMG, decidiu encurtar o caminho de quem vem atrás com o projeto Eu vou ser Doutor.</p>
          <h3 className="text-2xl font-black text-[#0A192F] uppercase tracking-tight">A metodologia por trás da aprovação</h3>
          <p>O desempenho nas provas do ENEM nasce de aprendizado estratégico. Nos simulados e Flashcards, Jeff Queiroz aplica técnicas de revisão inteligente e simulações realistas — comprovadamente mais eficazes que resumos tradicionais.</p>
          <div className="bg-blue-50 border-l-8 border-blue-600 p-10 rounded-r-3xl my-10 relative">
            <Quote className="absolute top-4 right-4 text-blue-100" size={48} />
            <p className="text-xl font-bold text-blue-900 italic relative z-10 leading-relaxed">O acesso à Faculdade de Medicina não deve ser privilégio. O Eu vou ser Doutor oferece um caminho claro com materiais que impactam.</p>
          </div>
          <p>A rotina compartilhada no Instagram @euvouserdoutor funciona como combustível para os estudantes. Com histórico acadêmico sólido, a credibilidade dos materiais é garantida, e a comunidade cresce ao redor da aprovação em Medicina.</p>
        </div>
      </div>
      <div className="lg:w-1/3"><Sidebar setView={setView} profileImg={profileImg} telegram={telegram} /></div>
    </div>
  </div>
);
