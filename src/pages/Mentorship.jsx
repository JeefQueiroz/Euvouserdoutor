import React from 'react';
import { ArrowRight, Calendar, CheckCircle2, Clock, HelpCircle, Layers, MessageCircle, PenTool, ShieldCheck, Target, Users } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { institutional } from '../institutional';

export const Mentorship = ({ setView }) => {
  const sections = [
    {
      icon: Users,
      title: 'Público-alvo',
      items: [
        'Vestibulandos que precisam organizar rotina.',
        'Estudantes que buscam revisão constante.',
        'Pessoas que buscam método sem improviso.',
      ],
    },
    {
      icon: Target,
      title: 'Dores que resolve',
      items: [
        'Excesso de materiais sem ordem clara.',
        'Dificuldade para manter revisão semanal.',
        'Falta de critério para transformar erros.',
      ],
    },
    {
      icon: ShieldCheck,
      title: 'O que está incluso',
      items: [
        'Organização de rotina e revisão.',
        'Direcionamento para estudo ativo.',
        'Acompanhamento estratégico.',
      ],
    },
  ];

  const faq = [
    {
      question: 'A mentoria garante aprovação?',
      answer:
        'Não. A mentoria oferece organização e estratégia, mas o resultado depende de múltiplos fatores individuais.',
    },
    {
      question: 'É orientação médica?',
      answer:
        'Não. O conteúdo é educacional. Não substitui consulta médica ou orientação profissional.',
    },
  ];

  return (
    <div className="pb-24 bg-[#080A0F] min-h-screen text-left animate-in text-[#F8FAFC]">
      <div className="bg-[#0A192F] border-b border-white/[0.05] pt-12 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.12),transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center justify-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-[0.2em] mb-7">
              <Clock size={12} aria-hidden="true" />
              Vagas limitadas por agenda
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-[#F8FAFC]">
              Mentoria EuVouSerDoutor
            </h1>
            <p className="text-base md:text-lg text-[#98A2B3] leading-relaxed max-w-2xl mt-5 font-medium">
              Acompanhamento educacional para organizar rotina, revisão e evolução nos estudos para Medicina.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => setView('contact')}
                className="inline-flex items-center justify-center gap-3 bg-[#4F8CFF] hover:bg-[#7EA6FF] text-[#080A0F] px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg"
              >
                Falar sobre mentoria <MessageCircle size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setView('materials')}
                className="inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-white/10"
              >
                Materiais <Layers size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-10 relative z-20">
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          <div className="bg-[#11141A] border border-white/[0.05] rounded-[24px] p-6 shadow-2xl premium-border">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-10 h-10 bg-[#4F8CFF]/10 text-[#4F8CFF] rounded-xl flex items-center justify-center shrink-0">
                <Clock size={20} strokeWidth={2.5} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#F8FAFC] mb-2">Turmas com limite de participantes.</h2>
                <p className="text-[#98A2B3] text-sm leading-relaxed font-medium">
                  Para manter a qualidade no acompanhamento, as vagas são limitadas conforme a disponibilidade da agenda oficial.
                </p>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sections.map((section) => (
              <article key={section.title} className="bg-[#11141A] rounded-[24px] p-5 border border-white/[0.05] shadow-2xl premium-border">
                <section.icon className="text-[#4F8CFF] mb-4" size={20} aria-hidden="true" />
                <h2 className="text-base font-black text-[#F8FAFC] mb-4">{section.title}</h2>
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs text-[#98A2B3] leading-relaxed font-medium">
                      <CheckCircle2 size={14} className="text-[#4F8CFF] shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="bg-[#11141A] rounded-[32px] p-8 md:p-10 shadow-2xl border border-white/[0.05] premium-border">
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] tracking-tighter flex items-center gap-3 mb-6">
              <ShieldCheck className="text-[#4F8CFF]" size={24} aria-hidden="true" /> Método de estudo
            </h2>
            <p className="text-[#98A2B3] leading-relaxed mb-8 text-base md:text-lg font-medium">
              A preparação fica mais clara quando teoria, revisão, exercícios e descanso são organizados como processo. O foco é acompanhar prioridades e reduzir decisões no improviso.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05]">
                <Calendar className="text-[#4F8CFF] mb-4" size={24} aria-hidden="true" />
                <h3 className="font-black text-[#F8FAFC] text-base mb-2">Ciclos de Rotina</h3>
                <p className="text-xs text-[#98A2B3] leading-relaxed font-medium">Organização semanal de blocos de estudo, revisão e autoavaliação.</p>
              </div>
              <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05]">
                <PenTool className="text-[#4F8CFF] mb-4" size={24} aria-hidden="true" />
                <h3 className="font-black text-[#F8FAFC] text-base mb-2">Revisão Crítica</h3>
                <p className="text-xs text-[#98A2B3] leading-relaxed font-medium">Mapeamento de dificuldades e registro de erros para orientar o estudo.</p>
              </div>
            </div>
          </section>

          <section className="bg-[#0A192F] rounded-[32px] p-8 md:p-10 text-white border border-white/[0.05] shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-7">Estudo com Direção</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-[#98A2B3] text-[9px] font-black uppercase tracking-widest mb-3">Sem método</p>
                <p className="text-white/80 text-sm leading-relaxed font-medium">Materiais soltos, pouca revisão e dificuldade para avaliar progresso.</p>
              </div>
              <div className="bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 rounded-2xl p-5">
                <p className="text-[#4F8CFF] text-[9px] font-black uppercase tracking-widest mb-3">Com direção</p>
                <p className="text-white/80 text-sm leading-relaxed font-medium">Prioridades claras, revisão recorrente e ajustes baseados em dados.</p>
              </div>
            </div>
          </section>

          <section className="bg-[#11141A] rounded-[32px] p-8 md:p-10 border border-white/[0.05] shadow-2xl premium-border">
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] tracking-tighter flex items-center gap-3 mb-8">
              <HelpCircle className="text-[#4F8CFF]" size={24} aria-hidden="true" /> Perguntas frequentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faq.map((item) => (
                <article key={item.question} className="bg-white/[0.02] rounded-2xl p-5 border border-white/[0.05]">
                  <h3 className="font-black text-[#F8FAFC] text-base mb-2">{item.question}</h3>
                  <p className="text-[#98A2B3] text-xs leading-relaxed font-medium">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 xl:col-span-3">
          <Sidebar setView={setView} />
        </div>
      </div>
    </div>
  );
};
