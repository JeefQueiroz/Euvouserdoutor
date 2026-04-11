import React from 'react';
import { ArrowLeft, Quote, CheckCircle, Share2, Calendar, Clock, Award } from 'lucide-react';

const Sidebar = ({ setView, brandImg }) => (
  <div className="sticky top-24 space-y-6 text-left">
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2E70CE] to-[#0A192F] p-1">
             <img src={brandImg} className="w-full h-full rounded-full border-2 border-white object-cover" alt="Logo EuVouSerDoutor" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h3 className="font-black text-sm text-gray-900 leading-tight">EuVouSerDoutor <CheckCircle size={14} className="inline text-blue-600" fill="currentColor" /></h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase">Medicina | UFMG</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 italic">"Democratizando o acesso à Medicina através do método estratégico."</p>
    </div>
    
    <div className="bg-gradient-to-br from-[#0A192F] to-[#11294D] p-6 rounded-2xl text-white shadow-lg">
      <h3 className="font-black text-[10px] text-blue-300 mb-4 uppercase tracking-widest flex items-center gap-2">
        <Award size={12} /> Destaque Acadêmico
      </h3>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
          <p className="text-[11px] font-bold">920+ Média em Redação</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
          <p className="text-[11px] font-bold">Método Validado UFMG</p>
        </div>
      </div>
    </div>
  </div>
);

export const Article = ({ setView, personalImg, brandImg, telegram }) => {
  const pImg = personalImg || "https://i.imgur.com/9QVE0X7.jpeg";
  const bImg = brandImg || "https://i.imgur.com/w9OO6uT.jpeg";
  const tg = telegram || "https://t.me/Euvouserdoutor";

  return (
    <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen font-sans">
      <div className="bg-gradient-to-r from-[#0A192F] to-[#2E70CE] text-white pt-16 pb-36 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-left">
          <button 
            onClick={() => setView('home')} 
            className="flex items-center gap-2 text-[10px] font-black text-blue-200 hover:text-white transition-all mb-8 uppercase tracking-[0.2em] bg-white/10 px-4 py-2 rounded-full w-fit backdrop-blur-md border border-white/10"
          >
            <ArrowLeft size={14} /> Voltar para o Início
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest">
              INSPIRAÇÃO & ROTINA
            </span>
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-200 uppercase tracking-widest">
              <Calendar size={12} /> Abril 2026
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-200 uppercase tracking-widest">
              <Clock size={12} /> 5 min de leitura
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 tracking-tighter italic text-left uppercase text-white drop-shadow-sm">
            O fenômeno @euvouserdoutor: como a rotina em Medicina na UFMG inspira 135 mil vestibulandos
          </h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 -mt-24 relative z-20">
        <div className="lg:w-2/3 bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-gray-100 text-left relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-10 mb-16 items-start text-left">
            <div className="md:w-1/2 shrink-0 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-transparent rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src={pImg} 
                  alt="Jefferson Queiroz UFMG" 
                  className="w-full h-auto rounded-3xl shadow-xl border-4 border-white object-cover relative z-10 transition-transform duration-500 group-hover:scale-[1.02]" 
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center text-left pt-4">
              <p className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-600"></span> Escrito por Jeff Queiroz
              </p>
              <p className="text-xl md:text-2xl text-gray-800 italic font-medium leading-relaxed mb-6">
                "Jefferson Queiroz compartilha como transformou a pressão do vestibular em um método validado que hoje ajuda milhares de estudantes a conquistarem o jaleco na UFMG."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight flex items-center gap-2">
                  <CheckCircle size={14} /> Perfil Verificado
                </div>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans space-y-10 text-left">
            <p className="dropcap text-left text-lg text-gray-600">
              A rotina de um vestibulando de Medicina é frequentemente marcada por incertezas, pressão constante e pilhas intermináveis de livros. Mas <strong>Jeff Queiroz</strong>, que superou essa fase desafiadora e hoje cursa Medicina na renomada Universidade Federal de Minas Gerais (UFMG), decidiu encurtar o caminho de quem vem atrás com o projeto <strong>Eu vou ser Doutor</strong> e a <strong>Mentoria Aprovado</strong>.
            </p>

            <div className="relative py-4">
              <h3 className="text-2xl md:text-3xl font-black text-[#0A192F] uppercase tracking-tight text-left mb-6">
                A metodologia por trás da aprovação
              </h3>
              <p className="text-left leading-loose">
                O desempenho de destaque nas provas do ENEM e demais vestibulares não nasce do acaso, mas de uma base sólida de aprendizado estratégico. Nos simulados e Flashcards, Jeff Queiroz aplica técnicas de revisão inteligente, foco cirúrgico em pontos-chave e simulações realistas.
              </p>
            </div>

            <div className="bg-slate-50 border-l-8 border-[#2E70CE] p-10 md:p-14 rounded-r-3xl my-12 relative text-left shadow-inner">
              <Quote className="absolute top-6 right-8 text-blue-100/50" size={64} />
              <p className="text-2xl md:text-3xl font-bold text-gray-900 italic relative z-10 leading-snug tracking-tight">
                “O acesso à Faculdade de Medicina de qualidade não deve ser um privilégio de poucos. O Eu vou ser Doutor nasceu para oferecer um caminho claro, técnico e humano.”
              </p>
              <p className="mt-6 text-blue-600 font-black uppercase text-xs tracking-widest">
                — Jefferson Queiroz, Fundador
              </p>
            </div>

            <p className="text-left leading-loose">
              Acompanhando de perto a realidade dos hospitais-escola e das salas de aula da UFMG, a rotina compartilhada diariamente funciona como combustível emocional para milhares de estudantes. Com um histórico acadêmico sólido e resultados comprovados, a credibilidade dos materiais é o que sustenta uma comunidade vibrante de mais de 135 mil seguidores.
            </p>
            
            <div className="pt-16 mt-16 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-8">
               <button 
                 onClick={() => setView('writing')} 
                 className="w-full sm:w-auto bg-[#0A192F] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl"
               >
                 Ver Método de Redação
               </button>
               <a 
                 href={tg} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group"
               >
                 Compartilhar Conteúdo 
                 <Share2 size={16} className="group-hover:rotate-12 transition-transform" />
               </a>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <Sidebar setView={setView} brandImg={bImg} />
        </div>
      </div>
    </div>
  );
};

export default Article;
