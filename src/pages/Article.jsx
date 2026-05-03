import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const Article = ({ setView, profileImg, telegram }) => {
  return (
    <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen">
      <div className="bg-[#0A192F] text-white pt-12 pb-24 px-6 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2E70CE]/20 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5CE1E6]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 z-0"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <button onClick={() => setView('news')} className="inline-flex items-center gap-2 text-[10px] font-black text-blue-200 uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 hover:border-white/20 transition-all mb-8">
            <ArrowLeft size={14}/> Voltar
          </button>

          {/* Categoria */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 block w-fit">
            Inspiração e Rotina
          </div>

          {/* MANCHETE */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-none mb-6">
            <span className="text-white/50">O Fenômeno </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5CE1E6] to-white">@euvouserdoutor</span>
          </h1>

          {/* LINHA FINA */}
          <p className="text-lg md:text-xl text-blue-100/80 font-medium leading-relaxed max-w-2xl mb-6">
            Como Jefferson Queiroz está transformando a forma como futuros médicos se preparam para o vestibular
          </p>

          {/* CRÉDITO E DATA */}
          <div className="flex flex-wrap items-center gap-2 text-blue-300/60 text-[11px] font-bold uppercase tracking-widest border-t border-white/10 pt-6">
            <span>Por Jeff Queiroz</span>
            <span>—</span>
            <span>Eu Vou Ser Doutor</span>
            <span>|</span>
            <span>12/04/2026</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 -mt-12 relative z-20">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-gray-100">
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-8">

              {/* LIDE COM IMAGEM */}
              <section className="flex flex-col md:flex-row gap-8 items-start mb-12">
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <img src={profileImg} alt="Jeff Queiroz" className="w-full h-auto rounded-3xl shadow-xl object-cover aspect-[4/5] border border-gray-100" />
                </div>
                <div className="w-full md:w-2/3 space-y-6">
                  <p className="text-xl md:text-2xl text-gray-800 italic font-medium leading-relaxed border-l-4 border-blue-500 pl-6">
                    Jeff Queiroz, estudante de Medicina na UFMG e criador do perfil @euvouserdoutor, construiu em menos de 5 anos uma comunidade de mais de 135 mil vestibulandos que sonham com o jaleco branco.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Com conteúdo gratuito, um método validado baseado em ciências do aprendizado e uma mentoria completa, ele está mudando o acesso à medicina no Brasil.
                  </p>
                  
                  <div className="pt-4">
                    <h2 className="text-2xl font-black text-[#0A192F] uppercase mb-4">A Realidade do Curso</h2>
                    <p className="text-gray-600 leading-relaxed">O que diferencia Jeff é sua abordagem transparente. Ele não vende falsas esperanças — mostra a realidade crua e inspiradora do curso de Medicina na UFMG. Desde os primeiros dias de aula até as complexidades do estudo científico, sua narrativa cativa porque é verdadeira.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-black text-[#0A192F] uppercase mb-4">Mentoria Aprovado: Um Ecossistema Completo</h2>
                <p>A Mentoria Aprovado vai além de simples orientações. Integra:</p>
                <ul className="space-y-3 mt-4 ml-4">
                  <li className="flex gap-3"><span className="text-blue-600 font-black">→</span> <span>Cronogramas de 30 semanas focados nos pesos do ENEM</span></li>
                  <li className="flex gap-3"><span className="text-blue-600 font-black">→</span> <span>Flashcards com repetição espaçada validada pela neurociência</span></li>
                  <li className="flex gap-3"><span className="text-blue-600 font-black">→</span> <span>Comunidade de estudantes com o mesmo objetivo</span></li>
                  <li className="flex gap-3"><span className="text-blue-600 font-black">→</span> <span>Suporte de alguém que PASSOU por isso</span></li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-black text-[#0A192F] uppercase mb-4">Os Números Não Mentem</h2>
                <p>Alunos da Mentoria Aprovado alcançam uma média de <strong>920 pontos em redação</strong> e <strong>92% de retenção em Ciências da Natureza</strong>. Esses não são números aleatórios — são resultado de estratégia e consistência.</p>
              </section>

              <section>
                <h2 className="text-3xl font-black text-[#0A192F] uppercase mb-4">Por Que Funciona?</h2>
                <p>A diferença está na abordagem. Enquanto a maioria dos cursos oferece conteúdo genérico, Jeff personifica a jornada. Ele entende as dificuldades porque as viveu. E isso muda tudo.</p>
                <p className="mt-4">O fenômeno @euvouserdoutor na UFMG não é sobre um criador — é sobre uma comunidade de futuros médicos que acreditam que é possível. E que estão dispostos a fazer o trabalho para chegar lá.</p>
              </section>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-lg mt-12">
                <p className="text-gray-700 italic font-bold">"Democratizar o acesso à Medicina não é um slogan. É a missão que move cada decisão na Mentoria Aprovado."</p>
              </div>

              <div className="bg-gradient-to-r from-[#0A192F] to-[#2E70CE] rounded-[30px] p-8 md:p-12 mt-12 text-white text-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10">
                  <p className="text-2xl font-black uppercase mb-4 tracking-tight">Quer entrar em Medicina?</p>
                  <p className="text-blue-100 text-base mb-8 max-w-lg mx-auto">Acesse o Guia de Cronograma para Medicina e monte sua estratégia de estudo para o ENEM agora mesmo.</p>
                  <button
                    onClick={() => setView('mentorship')}
                    className="inline-flex items-center gap-3 bg-[#5CE1E6] text-[#0A192F] font-black text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-[#4bcad0] hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(92,225,230,0.3)] hover:shadow-[0_15px_40px_rgba(92,225,230,0.5)]"
                  >
                    Conhecer a Mentoria Aprovado <ArrowRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="lg:w-1/3"><Sidebar setView={setView} profileImg={profileImg} /></div>
      </div>
    </div>
  );
};
