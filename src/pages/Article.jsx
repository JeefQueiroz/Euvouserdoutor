import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const Article = ({ setView, profileImg, telegram }) => {
  return (
    <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen">
      <div className="bg-gradient-to-r from-[#0A192F] to-[#2E70CE] text-white pt-16 pb-32 px-6 text-left">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setView('news')} className="flex items-center gap-2 text-[10px] font-black text-blue-200 mb-8 uppercase bg-white/10 px-4 py-2 rounded-full hover:bg-white/20">
            <ArrowLeft size={14}/> Voltar
          </button>

          {/* Categoria */}
          <span className="text-blue-300 font-black text-[10px] uppercase tracking-[0.2em]">INSPIRAÇÃO E ROTINA</span>

          {/* MANCHETE */}
          <h1 className="text-4xl md:text-7xl font-black mb-4 italic uppercase mt-4">
            O Fenômeno @euvouserdoutor na UFMG
          </h1>

          {/* LINHA FINA */}
          <p className="text-xl md:text-2xl text-blue-200 font-medium italic leading-snug mb-6">
            Como Jefferson Queiroz está transformando a forma como futuros médicos se preparam para o vestibular
          </p>

          {/* CRÉDITO E DATA */}
          <div className="flex flex-wrap items-center gap-2 text-blue-300 text-[11px] font-bold uppercase tracking-widest border-t border-white/10 pt-4">
            <span>Por Jeff Queiroz</span>
            <span className="text-blue-400">—</span>
            <span>Eu Vou Ser Doutor</span>
            <span className="text-blue-400">|</span>
            <span>12/04/2026</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 -mt-12 relative z-20">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-gray-100">
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-8">

              {/* LIDE */}
              <section>
                <p className="text-lg text-gray-600 italic border-l-4 border-blue-500 pl-4">
                  Jeff Queiroz, estudante de Medicina na UFMG e criador do perfil @euvouserdoutor, construiu em menos de 5 anos uma comunidade de mais de 135 mil vestibulandos que sonham com o jaleco branco. Com conteúdo gratuito, método baseado em ciências do aprendizado e uma mentoria completa, ele está mudando o acesso à medicina no Brasil.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-black text-[#0A192F] uppercase mb-4">A Realidade do Curso</h2>
                <p>O que diferencia Jeff é sua abordagem transparente. Ele não vende falsas esperanças — mostra a realidade crua e inspiradora do curso de Medicina na UFMG. Desde os primeiros dias de aula até as complexidades do estudo científico, sua narrativa cativa porque é verdadeira.</p>
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

              {/* CALL TO ACTION */}
              <div className="bg-gradient-to-r from-[#0A192F] to-[#2E70CE] rounded-[30px] p-8 mt-8 text-white text-center">
                <p className="text-lg font-black uppercase mb-2">Quer entrar em Medicina?</p>
                <p className="text-blue-200 text-sm mb-6">Acesse o Guia de Cronograma para Medicina e monte sua estratégia de estudo para o ENEM agora mesmo.</p>
                <button
                  onClick={() => setView('mentorship')}
                  className="inline-flex items-center gap-2 bg-white text-[#0A192F] font-black text-[11px] uppercase tracking-widest px-6 py-3 rounded-full hover:bg-blue-100 transition-all"
                >
                  Conhecer a Mentoria Aprovado <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>
        </div>
        <div className="lg:w-1/3"><Sidebar setView={setView} profileImg={profileImg} /></div>
      </div>
    </div>
  );
};
