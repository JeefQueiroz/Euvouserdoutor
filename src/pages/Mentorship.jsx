import React from 'react';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock, HelpCircle, Layers, MessageCircle, PenTool, ShieldCheck, Target, Users, Sparkles, Zap, BookOpen, User } from 'lucide-react';
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
    <div className="animate-in text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      {/* Editorial Header - Mega Premium */}
      <div className="bg-[#0A192F] border-b border-white/[0.08] pt-14 pb-28 px-6 relative overflow-hidden">
        {/* Advanced Visual Layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.15),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#4F8CFF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[#4F8CFF]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-4xl space-y-8">
              <button
                type="button"
                onClick={() => setView('home')}
                className="inline-flex items-center gap-2 text-[9px] font-black text-[#4F8CFF] uppercase bg-white/[0.03] border border-white/[0.08] px-4 py-2 rounded-xl hover:bg-white/[0.06] transition-all"
              >
                <ArrowLeft size={12} strokeWidth={3} /> Voltar ao Início
              </button>
              
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.25em]">
                    <Clock size={10} className="animate-pulse" /> Vagas Limitadas por Agenda
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] text-[#98A2B3] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.25em]">
                    Ciclo Estratégico 2026
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] text-[#F8FAFC] whitespace-nowrap">
                  Mentoria <br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F8CFF] via-white to-white/40">EuVouSerDoutor</span>
                </h1>
                
                <p className="text-lg md:text-xl text-[#98A2B3] leading-relaxed max-w-2xl font-medium">
                  Acompanhamento educacional exclusivo para organizar rotina, revisão e evolução constante nos estudos para Medicina com o método do Jeff Queiroz.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setView('contact')}
                    className="inline-flex items-center justify-center gap-3 bg-[#4F8CFF] hover:bg-[#7EA6FF] text-[#080A0F] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_20px_50px_rgba(79,140,255,0.3)] hover-lift"
                  >
                    Falar sobre mentoria <MessageCircle size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('materials')}
                    className="inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-white/10"
                  >
                    Ver Materiais <Layers size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Authority Card - Mega Premium */}
            <div className="hidden xl:block min-w-[340px]">
              <div className="glass-premium rounded-[32px] p-8 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8CFF]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#4F8CFF]/20 transition-all duration-700" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF] border border-[#4F8CFF]/20">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#4F8CFF]">Status da Agenda</p>
                      <p className="text-white text-sm font-black tracking-tight">Últimas Vagas Disponíveis</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap size={14} className="text-[#4F8CFF]" />
                      <span className="text-[11px] font-bold text-[#98A2B3]">Foco em Resultados Reais</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target size={14} className="text-[#4F8CFF]" />
                      <span className="text-[11px] font-bold text-[#98A2B3]">Planejamento Individualizado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen size={14} className="text-[#4F8CFF]" />
                      <span className="text-[11px] font-bold text-[#98A2B3]">Suporte Direto com o Autor</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/[0.05]">
                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-[#98A2B3] mb-2">
                      <span>Capacidade da Turma</span>
                      <span className="text-[#4F8CFF]">92% Preenchida</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-[92%] h-full bg-gradient-to-r from-[#4F8CFF] to-[#2E70CE]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 -mt-16 relative z-20">
        <div className="lg:col-span-8 xl:col-span-9 space-y-10">
          
          <div className="bg-[#11141A] border border-white/[0.05] rounded-[32px] p-8 shadow-2xl premium-border">
            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <div className="w-20 h-20 bg-[#4F8CFF]/10 text-[#4F8CFF] rounded-[24px] flex items-center justify-center shrink-0 border border-[#4F8CFF]/20">
                <Clock size={32} strokeWidth={2.5} />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-black text-[#F8FAFC] mb-2 tracking-tighter">Compromisso com a Qualidade.</h2>
                <p className="text-[#98A2B3] text-base leading-relaxed font-medium">
                  Para manter o alto padrão de entrega e o acompanhamento próximo de cada aluno, as turmas possuem limite rigoroso de participantes.
                </p>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <article key={section.title} className="bg-[#11141A] rounded-[32px] p-8 border border-white/[0.05] shadow-2xl premium-border group hover:border-[#4F8CFF]/30 transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center text-[#4F8CFF] mb-6 group-hover:scale-110 transition-transform">
                  <section.icon size={24} />
                </div>
                <h2 className="text-lg font-black text-[#F8FAFC] mb-6 tracking-tight uppercase tracking-[0.1em]">{section.title}</h2>
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#98A2B3] leading-relaxed font-medium">
                      <CheckCircle2 size={16} className="text-[#4F8CFF] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="bg-[#11141A] rounded-[40px] p-10 md:p-16 shadow-2xl border border-white/[0.05] premium-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F8CFF]/5 rounded-full blur-[100px] -mr-48 -mt-48" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-[#F8FAFC] tracking-tighter flex items-center gap-4 mb-8">
                <ShieldCheck className="text-[#4F8CFF]" size={40} /> O Método EVD
              </h2>
              <p className="text-[#98A2B3] leading-relaxed mb-12 text-lg md:text-xl font-medium max-w-3xl">
                A preparação para Medicina não deve ser baseada em maratonas exaustivas, mas em <strong>processos inteligentes</strong>. Teoria, revisão, exercícios e descanso são organizados para reduzir o improviso e maximizar a retenção.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/[0.02] p-8 rounded-[32px] border border-white/[0.05] space-y-4">
                  <Calendar className="text-[#4F8CFF] mb-2" size={28} />
                  <h3 className="font-black text-[#F8FAFC] text-xl tracking-tight">Ciclos de Rotina</h3>
                  <p className="text-sm text-[#98A2B3] leading-relaxed font-medium">Organização semanal de blocos de estudo e autoavaliação baseada em dados reais.</p>
                </div>
                <div className="bg-white/[0.02] p-8 rounded-[32px] border border-white/[0.05] space-y-4">
                  <PenTool className="text-[#4F8CFF] mb-2" size={28} />
                  <h3 className="font-black text-[#F8FAFC] text-xl tracking-tight">Revisão Crítica</h3>
                  <p className="text-sm text-[#98A2B3] leading-relaxed font-medium">Mapeamento constante de lacunas para garantir que nenhum erro seja repetido.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#0A192F] rounded-[40px] p-10 md:p-16 text-white border border-white/[0.08] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4F8CFF 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-10 relative z-10">Estudo com Direção</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="bg-white/5 border border-white/10 rounded-[24px] p-8">
                <p className="text-[#98A2B3] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Sem método</p>
                <p className="text-white/90 text-base leading-relaxed font-bold">Materiais desorganizados, pouca revisão e sensação constante de estar "andando em círculos".</p>
              </div>
              <div className="bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 rounded-[24px] p-8">
                <p className="text-[#4F8CFF] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Com o método EVD</p>
                <p className="text-white/90 text-base leading-relaxed font-bold">Prioridades claras, revisão recorrente e ajustes semanais baseados em desempenho real.</p>
              </div>
            </div>
          </section>

          <section className="bg-[#11141A] rounded-[40px] p-10 md:p-16 border border-white/[0.05] shadow-2xl premium-border">
            <h2 className="text-3xl font-black text-[#F8FAFC] tracking-tighter flex items-center gap-4 mb-12">
              <HelpCircle className="text-[#4F8CFF]" size={32} /> Perguntas Frequentes
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {faq.map((item) => (
                <article key={item.question} className="bg-white/[0.02] rounded-[24px] p-8 border border-white/[0.05] hover:bg-white/[0.04] transition-all">
                  <h3 className="font-black text-[#F8FAFC] text-lg mb-3 tracking-tight">{item.question}</h3>
                  <p className="text-[#98A2B3] text-sm leading-relaxed font-medium">{item.answer}</p>
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
