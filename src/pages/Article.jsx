import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { institutional } from '../institutional';

export const Article = ({ setView, profileImg }) => (
  <div className="animate-in pb-20 text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen">
    <div className="bg-[#0A192F] border-b border-white/[0.08] pt-14 pb-24 px-6 relative overflow-hidden text-left">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.18),transparent_40%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <button
          type="button"
          onClick={() => setView('news')}
          className="inline-flex items-center gap-2 text-[10px] font-black text-[#4F8CFF] uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ArrowLeft size={14} aria-hidden="true" /> Voltar
        </button>

        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Técnicas de estudo
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6 text-[#F8FAFC]">
            Como estudar para Medicina com método e constância
          </h1>
          <p className="text-lg md:text-xl text-[#98A2B3] font-normal leading-relaxed max-w-3xl mb-6">
            Um guia editorial sobre rotina, revisão e organização para transformar esforço em processo de estudo.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-[#98A2B3] text-[11px] font-bold uppercase tracking-widest border-t border-white/[0.08] pt-6">
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
        <div className="bg-[#11141A] rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/[0.08]">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
            <div className="md:col-span-4">
              <img src={profileImg} alt="Jeff Queiroz" className="w-full h-auto rounded-3xl shadow-sm object-cover aspect-[4/5] border border-white/[0.08]" />
            </div>
            <div className="md:col-span-8 space-y-5 text-[#98A2B3] leading-relaxed text-lg">
              <p className="text-xl md:text-2xl text-[#F8FAFC] font-bold leading-relaxed border-l-4 border-[#4F8CFF] pl-6">
                Estudar para Medicina exige método, constância e capacidade de revisar o próprio processo sem depender de fórmulas prontas.
              </p>
              <p>
                O EuVouSerDoutor reúne conteúdos educacionais, materiais de apoio e ideias de organização para estudantes e vestibulandos que querem mais clareza na rotina.
              </p>
            </div>
          </section>

          <div className="space-y-10 text-[#98A2B3] leading-relaxed text-lg">
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-4">Organização antes de volume</h2>
              <p>
                Uma rotina eficiente não depende apenas de horas acumuladas. O ponto central é saber o que estudar, quando revisar e como transformar erros em decisões para a próxima semana.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-4">Pilares de uma rotina mais clara</h2>
              <ul className="space-y-3 mt-4">
                {[
                  'Planejamento semanal com prioridades visíveis.',
                  'Revisão ativa para diminuir releitura passiva.',
                  'Registro de erros depois de exercícios e simulados.',
                  'Ajustes periódicos conforme desempenho e disponibilidade real.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[#F8FAFC]">
                    <CheckCircle2 className="text-[#4F8CFF] shrink-0 mt-1" size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>

      <div className="lg:col-span-4 xl:col-span-3">
        <Sidebar setView={setView} />
      </div>
    </div>
  </div>
);
