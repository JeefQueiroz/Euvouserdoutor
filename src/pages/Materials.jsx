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
  ];

  return (
    <div className="animate-in text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      {/* Editorial Header */}
      <div className="bg-[#0A192F] border-b border-white/[0.08] pt-14 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.18),transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            type="button"
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-[10px] font-black text-[#4F8CFF] uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all mb-8"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Voltar ao Início
          </button>
          
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Biblioteca Gratuita
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-[#F8FAFC] mb-6">
              Materiais de Apoio & Guias
            </h1>
            <p className="text-lg md:text-xl text-[#98A2B3] leading-relaxed max-w-3xl font-normal">
              Recursos educacionais, flashcards e checklists para apoiar sua organização e estudo diário.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 -mt-12 relative z-20">
        <div className="lg:col-span-8 xl:col-span-9 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materials.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => !item.disabled && setView(item.target)}
                  className={`bg-[#11141A] border border-white/[0.08] rounded-[32px] p-8 shadow-2xl flex flex-col justify-between transition-all ${
                    item.disabled ? 'opacity-70 cursor-default' : 'cursor-pointer hover:border-[#4F8CFF]/40 group'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-[#4F8CFF]/10 text-[#4F8CFF] rounded-2xl flex items-center justify-center">
                        <Icon size={24} strokeWidth={2} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/10 px-3 py-1 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-xs text-[#98A2B3] font-bold uppercase tracking-widest">{item.category}</span>
                    <h2 className="text-xl font-black text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors mt-1 mb-3">
                      {item.title}
                    </h2>
                    <p className="text-[#98A2B3] text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>
                  {!item.disabled && (
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-[#4F8CFF] uppercase tracking-wider">
                      <span>Acessar material</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-4 xl:col-span-3">
          <Sidebar setView={setView} />
        </div>
      </div>
    </div>
  );
};
