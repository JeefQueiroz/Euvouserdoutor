import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { institutional } from '../institutional';

export const Article = ({ setView, profileImg }) => (
  <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen">
    <div className="bg-[#0A192F] text-white pt-14 pb-24 px-6 relative overflow-hidden text-left">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(46,112,206,0.28),transparent_34%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <button
          type="button"
          onClick={() => setView('news')}
          className="inline-flex items-center gap-2 text-[10px] font-black text-blue-200 uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Voltar
        </button>

        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Técnicas de estudo
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Como estudar para Medicina com método e constância
          </h1>
          <p className="text-lg md:text-xl text-blue-100/85 font-medium leading-relaxed max-w-3xl mb-6">
            Um guia editorial sobre rotina, revisão e organização para transformar esforço em processo de estudo.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-blue-300/70 text-[11px] font-bold uppercase tracking-widest border-t border-white/10 pt-6">
            <span>Por Jeff Queiroz</span>
            <span>|</span>
            <span>EuVouSerDoutor</span>
            <span>|</span>
            <span>Atualizado em 2026</span>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 -mt-12 relative z-20">
      <article className="lg:col-span-8 xl:col-span-9">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_24px_60px_rgba(10,25,47,0.10)] border border-[#DDE6F2]">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
            <div className="md:col-span-4">
              <img src={profileImg} alt="Jeff Queiroz" className="w-full h-auto rounded-3xl shadow-sm object-cover aspect-[4/5] border border-[#DDE6F2]" />
            </div>
            <div className="md:col-span-8 space-y-5 text-gray-600 leading-relaxed text-lg">
              <p className="text-xl md:text-2xl text-[#0A192F] font-bold leading-relaxed border-l-4 border-[#2E70CE] pl-6">
                Estudar para Medicina exige método, constância e capacidade de revisar o próprio processo sem depender de fórmulas prontas.
              </p>
              <p>
                O EuVouSerDoutor reúne conteúdos educacionais, materiais de apoio e ideias de organização para estudantes e vestibulandos que querem mais clareza na rotina.
              </p>
            </div>
          </section>

          <div className="space-y-10 text-gray-600 leading-relaxed text-lg">
            <section>
              <h2 className="text-3xl font-black text-[#0A192F] mb-4">Organização antes de volume</h2>
              <p>
                Uma rotina eficiente não depende apenas de horas acumuladas. O ponto central é saber o que estudar, quando revisar e como transformar erros em decisões para a próxima semana.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-[#0A192F] mb-4">Pilares de uma rotina mais clara</h2>
              <ul className="space-y-3 mt-4">
                {[
                  'Planejamento semanal com prioridades visíveis.',
                  'Revisão ativa para diminuir releitura passiva.',
                  'Registro de erros depois de exercícios e simulados.',
                  'Ajustes periódicos conforme desempenho e disponibilidade real.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="text-[#A02070] shrink-0 mt-1" size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-black text-[#0A192F] mb-4">Mentoria como acompanhamento educacional</h2>
              <p>
                A mentoria do projeto é apresentada como acompanhamento de organização, rotina e revisão. Ela não garante resultado e depende de fatores como base prévia, tempo disponível, constância e execução individual.
              </p>
            </section>

            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
              <p className="text-[#0A192F] font-medium">{institutional.medicalNotice}</p>
            </div>

            <div className="bg-[#0A192F] rounded-3xl p-8 md:p-10 text-white">
              <p className="text-2xl font-black mb-4 tracking-tight">Quer organizar melhor sua preparação?</p>
              <p className="text-blue-100 text-base mb-8 max-w-2xl">
                Conheça os materiais e a mentoria educacional do EuVouSerDoutor pelos canais oficiais.
              </p>
              <button
                type="button"
                onClick={() => setView('mentorship')}
                className="inline-flex items-center gap-3 bg-[#5CE1E6] text-[#0A192F] font-black text-sm uppercase tracking-widest px-6 py-4 rounded-full hover:bg-white active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Conhecer a mentoria <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </article>
      <div className="lg:col-span-4 xl:col-span-3">
        <Sidebar setView={setView} />
      </div>
    </div>
  </div>
);
