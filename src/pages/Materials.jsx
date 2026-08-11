import React from 'react';
import { ArrowLeft, ArrowRight, Calendar, CheckSquare, ClipboardCheck, FileText, Layers, PenTool, Stethoscope, TimerReset } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const Materials = ({ setView }) => {
  const materials = [
    {
      title: 'Manual de Flashcards',
      description: 'Guia para usar estudo ativo e revisão espaçada como apoio à preparação.',
      category: 'Flashcards',
      badge: 'Gratuito',
      icon: Layers,
      target: 'flashcards',
    },
    {
      title: 'Cronograma UFMG',
      description: 'Estrutura visual de rotina para organizar semanas de estudo com mais clareza.',
      category: 'Cronogramas',
      badge: 'Em breve',
      icon: Calendar,
      disabled: true,
    },
    {
      title: 'Checklist Redação',
      description: 'Pontos de conferência para revisar estrutura, repertório e clareza argumentativa.',
      category: 'Redação',
      badge: 'Atualizado',
      icon: PenTool,
      target: 'mentorship',
    },
    {
      title: 'Guia de Natureza',
      description: 'Orientações gerais para revisar conteúdos de Ciências da Natureza com critério.',
      category: 'Natureza',
      badge: 'Em breve',
      icon: Stethoscope,
      disabled: true,
    },
    {
      title: 'Checklist de Revisão Semanal',
      description: 'Roteiro para fechar a semana, mapear dúvidas e planejar a próxima revisão.',
      category: 'Checklists',
      badge: 'Novo',
      icon: ClipboardCheck,
      disabled: true,
    },
    {
      title: 'Planner de Estudos',
      description: 'Modelo para distribuir blocos de teoria, exercícios, revisão e descanso.',
      category: 'Cronogramas',
      badge: 'Em breve',
      icon: TimerReset,
      disabled: true,
    },
    {
      title: 'Simulado Diagnóstico',
      description: 'Estrutura para registrar desempenho e transformar erros em plano de revisão.',
      category: 'Simulados',
      badge: 'Em breve',
      icon: CheckSquare,
      disabled: true,
    },
    {
      title: 'Modelo de Autoavaliação',
      description: 'Ficha simples para acompanhar rotina, constância e pontos de atenção.',
      category: 'Revisão',
      badge: 'Em breve',
      icon: FileText,
      disabled: true,
    },
  ];

  const filters = ['Todos', 'Flashcards', 'Cronogramas', 'Checklists', 'Simulados', 'Redação', 'Natureza', 'Medicina'];

  return (
    <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen">
      <div className="bg-[#0A192F] text-white pt-14 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(160,32,112,0.24),transparent_32%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            type="button"
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-[10px] font-black text-blue-200 uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Voltar
          </button>
          <div className="max-w-4xl">
            <p className="inline-flex items-center justify-center gap-2 bg-[#A02070]/20 border border-[#A02070]/50 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              Biblioteca de apoio
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Biblioteca exclusiva
            </h1>
            <p className="text-lg md:text-xl text-blue-100/85 leading-relaxed max-w-3xl font-medium mt-5">
              Materiais de apoio para organizar sua rotina, revisar com critério e estudar com mais direção.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 -mt-16 relative z-20">
        <div className="lg:col-span-8 xl:col-span-9 space-y-7">
          <div className="bg-white border border-[#DDE6F2] rounded-3xl p-5 shadow-[0_18px_48px_rgba(10,25,47,0.07)]">
            <p className="text-[#A02070] font-black uppercase text-xs tracking-widest mb-2">Atualizações por ciclo</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Alguns materiais gratuitos podem ser atualizados, substituídos ou liberados por ciclo. Cards marcados como “Em breve” estão visíveis apenas como previsão editorial.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <span
                key={filter}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                  index === 0
                    ? 'bg-[#0A192F] text-white border-[#0A192F]'
                    : 'bg-white text-gray-500 border-[#DDE6F2]'
                }`}
              >
                {filter}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {materials.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="text-[#2E70CE] bg-[#2E70CE]/10 w-14 h-14 rounded-2xl flex items-center justify-center">
                      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      item.disabled
                        ? 'bg-gray-100 text-gray-500 border-gray-200'
                        : 'bg-[#A02070]/10 text-[#A02070] border-[#A02070]/20'
                    }`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#2E70CE] font-black uppercase tracking-[0.22em] mb-3">{item.category}</p>
                  <h2 className="text-xl font-black text-[#0A192F] mb-3 leading-snug">{item.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-grow">{item.description}</p>
                  <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-5">
                    <span className={`font-black text-[10px] uppercase tracking-widest ${item.disabled ? 'text-gray-400' : 'text-[#A02070]'}`}>
                      {item.disabled ? 'Indisponível no momento' : 'Acessar material'}
                    </span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      item.disabled ? 'bg-gray-100 text-gray-400' : 'bg-[#A02070]/10 text-[#A02070] group-hover:bg-[#A02070] group-hover:text-white'
                    }`}>
                      <ArrowRight size={16} aria-hidden="true" />
                    </div>
                  </div>
                </>
              );

              if (item.disabled) {
                return (
                  <article key={item.title} className="bg-white/80 p-6 rounded-3xl border border-[#DDE6F2] shadow-sm text-left relative overflow-hidden flex flex-col opacity-85">
                    {content}
                  </article>
                );
              }

              return (
                <article
                  key={item.title}
                  onClick={() => setView(item.target)}
                  className="bg-white p-6 rounded-3xl border border-[#DDE6F2] shadow-[0_18px_48px_rgba(10,25,47,0.06)] cursor-pointer group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(10,25,47,0.10)] hover:border-[#A02070]/30 text-left relative overflow-hidden flex flex-col"
                >
                  {content}
                </article>
              );
            })}
          </div>

          {/* MoFu Lead Capture / Community Banner */}
          <div className="mt-12 bg-gradient-to-r from-[#0A192F] to-[#2E70CE] rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[#5CE1E6] text-xs font-black uppercase tracking-[0.25em] mb-2">Comunidade exclusiva</p>
              <h3 className="text-2xl md:text-3xl font-black mb-3">Receba novos materiais e avisos no Telegram</h3>
              <p className="text-blue-100 text-sm md:text-base max-w-xl leading-relaxed">
                Junte-se à comunidade oficial de vestibulandos e estudantes de Medicina para não perder nenhum guia ou atualização de rotina.
              </p>
            </div>
            <a
              href="https://t.me/Euvouserdoutor"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 bg-white text-[#0A192F] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg inline-flex items-center gap-2"
            >
              Entrar no Telegram <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 xl:col-span-3">
          <Sidebar setView={setView} />
        </div>
      </div>
    </div>
  );
};
