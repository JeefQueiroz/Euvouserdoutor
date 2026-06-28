import React from 'react';
import { ArrowRight, Calendar, CheckCircle2, Clock, HelpCircle, Layers, MessageCircle, PenTool, ShieldCheck, Target, Users } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { institutional } from '../institutional';

export const Mentorship = ({ setView }) => {
  const sections = [
    {
      icon: Users,
      title: 'Para quem é',
      items: [
        'Vestibulandos que precisam organizar rotina e prioridades.',
        'Estudantes que querem revisar com mais constância.',
        'Pessoas que buscam acompanhamento educacional sem depender de improviso.',
      ],
    },
    {
      icon: Target,
      title: 'Dores que resolve',
      items: [
        'Excesso de materiais sem ordem clara.',
        'Dificuldade para manter revisão semanal.',
        'Falta de critério para transformar erros em plano de estudo.',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'O que está incluso',
      items: [
        'Organização de rotina e revisão.',
        'Direcionamento educacional para estudo ativo.',
        'Acompanhamento conforme disponibilidade de agenda.',
      ],
    },
  ];

  const faq = [
    {
      question: 'A mentoria garante aprovação?',
      answer:
        'Não. A mentoria oferece organização, estratégia e acompanhamento educacional, mas o resultado depende de múltiplos fatores, incluindo constância, base prévia, tempo disponível e execução individual.',
    },
    {
      question: 'É orientação médica?',
      answer:
        'Não. O conteúdo é educacional e acadêmico. Não substitui consulta médica, diagnóstico, tratamento ou orientação profissional individualizada.',
    },
  ];

  return (
    <div className="pb-20 bg-[#F4F7FB] min-h-screen text-left animate-in">
      <div className="bg-[#0A192F] text-white pt-16 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(46,112,206,0.30),transparent_34%),radial-gradient(circle_at_10%_100%,rgba(160,32,112,0.20),transparent_30%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center justify-center gap-2 bg-[#A02070]/20 border border-[#A02070]/50 text-[#F0F4F8] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-7">
              <Clock size={14} aria-hidden="true" />
              Acompanhamento com vagas limitadas por agenda
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Mentoria EuVouSerDoutor
            </h1>
            <p className="text-lg md:text-xl text-blue-100 font-medium leading-relaxed max-w-3xl mt-5">
              Acompanhamento educacional para organizar rotina, revisão e evolução nos estudos para Medicina.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => setView('contact')}
                className="inline-flex items-center justify-center gap-3 bg-[#A02070] hover:bg-[#8A1B60] text-white px-7 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Falar sobre mentoria <MessageCircle size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setView('materials')}
                className="inline-flex items-center justify-center gap-3 bg-white/10 text-white border border-white/15 px-7 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:bg-white/15 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Acessar materiais <Layers size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 -mt-16 relative z-20">
        <div className="lg:col-span-8 xl:col-span-9 space-y-8">
          <div className="bg-white border border-[#DDE6F2] rounded-3xl p-6 md:p-8 shadow-[0_18px_48px_rgba(10,25,47,0.08)]">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-12 h-12 bg-[#A02070]/10 text-[#A02070] rounded-2xl flex items-center justify-center shrink-0">
                <Clock size={24} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0A192F] mb-2">Acompanhamento com vagas limitadas por agenda.</h2>
                <p className="text-gray-600 leading-relaxed">
                  Para manter organização e qualidade no acompanhamento, as turmas podem ter limite de participantes. Informações atualizadas ficam nos canais oficiais.
                </p>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sections.map((section) => (
              <article key={section.title} className="bg-white rounded-3xl p-6 border border-[#DDE6F2] shadow-sm">
                <section.icon className="text-[#2E70CE] mb-5" size={28} aria-hidden="true" />
                <h2 className="text-xl font-black text-[#0A192F] mb-5">{section.title}</h2>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <CheckCircle2 size={17} className="text-[#A02070] shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_18px_48px_rgba(10,25,47,0.07)] border border-[#DDE6F2]">
            <h2 className="text-3xl font-black text-[#0A192F] tracking-tight flex items-center gap-3 mb-6">
              <ShieldCheck className="text-[#2E70CE]" size={30} aria-hidden="true" /> Método de estudo
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              A preparação fica mais clara quando teoria, revisão, exercícios e descanso são organizados como processo. O foco é acompanhar prioridades e reduzir decisões feitas no improviso.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#F4F7FB] p-6 rounded-3xl border border-[#DDE6F2]">
                <Calendar className="text-[#2E70CE] mb-5" size={32} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="font-black text-[#0A192F] text-lg mb-2">Rotina com ciclos claros</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Organização de blocos de estudo, revisão e autoavaliação para cada semana.</p>
              </div>
              <div className="bg-[#F4F7FB] p-6 rounded-3xl border border-[#DDE6F2]">
                <PenTool className="text-[#A02070] mb-5" size={32} strokeWidth={1.8} aria-hidden="true" />
                <h3 className="font-black text-[#0A192F] text-lg mb-2">Revisão com critério</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Mapeamento de dificuldades e registro de erros para orientar a próxima etapa de estudo.</p>
              </div>
            </div>
          </section>

          <section className="bg-[#0A192F] rounded-3xl p-8 md:p-10 text-white shadow-[0_24px_60px_rgba(10,25,47,0.18)]">
            <h2 className="text-3xl font-black tracking-tight mb-7">Estudo sem método vs estudo com direção</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <p className="text-gray-300 text-[10px] font-black uppercase tracking-widest mb-3">Sem método</p>
                <p className="text-blue-100 leading-relaxed">Muitos materiais abertos, pouca revisão, dúvidas acumuladas e dificuldade para avaliar progresso.</p>
              </div>
              <div className="bg-white/10 border border-[#5CE1E6]/25 rounded-3xl p-6">
                <p className="text-[#5CE1E6] text-[10px] font-black uppercase tracking-widest mb-3">Com direção</p>
                <p className="text-blue-100 leading-relaxed">Prioridades claras, revisão recorrente, registro de erros e ajustes de rotina ao longo do ciclo.</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 md:p-10 border border-[#DDE6F2] shadow-sm">
            <h2 className="text-3xl font-black text-[#0A192F] tracking-tight flex items-center gap-3 mb-8">
              <HelpCircle className="text-[#A02070]" size={30} aria-hidden="true" /> Perguntas frequentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {faq.map((item) => (
                <article key={item.question} className="bg-[#F4F7FB] rounded-3xl p-6 border border-[#DDE6F2]">
                  <h3 className="font-black text-[#0A192F] text-lg mb-3">{item.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-white to-[#F4F7FB] border border-[#DDE6F2] rounded-3xl p-8 md:p-10 text-center shadow-[0_18px_48px_rgba(10,25,47,0.07)]">
            <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] tracking-tight mb-4">Organize sua rotina de estudo</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Para dúvidas sobre disponibilidade, formato e próximos ciclos da mentoria, fale pelos canais institucionais.
            </p>
            <p className="text-gray-500 text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
              {institutional.medicalNotice}
            </p>
            <button
              type="button"
              onClick={() => setView('contact')}
              className="inline-flex items-center justify-center gap-3 bg-[#2E70CE] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#1f56a3] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E70CE]"
            >
              Falar com o projeto <ArrowRight size={18} aria-hidden="true" />
            </button>
          </section>
        </div>

        <div className="lg:col-span-4 xl:col-span-3">
          <Sidebar setView={setView} />
        </div>
      </div>
    </div>
  );
};
