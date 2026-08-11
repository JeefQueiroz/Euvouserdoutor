import React from 'react';
import { ArrowLeft, ArrowRight, Calendar, CheckSquare, ClipboardCheck, FileText, Layers, PenTool, Sparkles, Stethoscope, TimerReset, BookOpen, Target, Zap, ShieldCheck, Download } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const Materials = ({ setView }) => {
  const materials = [
    {
      title: 'Manual de Flashcards Doutor',
      description: 'O guia definitivo para dominar a Recuperação Ativa e a Repetição Espaçada na preparação para Medicina.',
      methodology: 'Active Recall & Spaced Repetition',
      category: 'Flashcards',
      badge: 'Gratuito',
      icon: Layers,
      target: 'flashcards',
      stats: '15 min de leitura'
    },
    {
      title: 'Cronograma Estratégico UFMG',
      description: 'A estrutura visual de rotina que utilizei para organizar meus estudos e revisões na Federal.',
      methodology: 'Time Blocking & Priorização',
      category: 'Cronogramas',
      badge: 'Em breve',
      icon: Calendar,
      disabled: true,
      stats: 'PDF Interativo'
    },
    {
      title: 'Checklist de Redação Nota 1000',
      description: 'Pontos de conferência técnica para garantir estrutura, repertório e clareza argumentativa máxima.',
      methodology: 'Análise de Competências',
      category: 'Redação',
      badge: 'Atualizado',
      icon: PenTool,
      target: 'mentorship',
      stats: 'Guia Prático'
    },
    {
      title: 'Guia de Ciências da Natureza',
      description: 'Como priorizar os temas de maior incidência e organizar revisões de Biologia, Química e Física.',
      methodology: 'Estudo por Incidência',
      category: 'Natureza',
      badge: 'Em breve',
      icon: Stethoscope,
      disabled: true,
      stats: 'Mapa de Calor'
    },
    {
      title: 'Checklist de Revisão Semanal',
      description: 'O roteiro de domingo para fechar a semana, mapear lacunas e planejar o próximo ciclo de foco.',
      methodology: 'Autoavaliação Crítica',
      category: 'Checklists',
      badge: 'Novo',
      icon: ClipboardCheck,
      disabled: true,
      stats: '5 min de uso'
    },
    {
      title: 'Planner de Estudos Ciclo Básico',
      description: 'Organização específica para acadêmicos de Medicina distribuírem teoria e prática hospitalar.',
      methodology: 'Gestão de Ciclo Acadêmico',
      category: 'Acadêmico',
      badge: 'Em breve',
      icon: TimerReset,
      disabled: true,
      stats: 'Template Notion'
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
                    <Sparkles size={10} className="animate-pulse" /> Biblioteca de Recursos
                  </span>
                  <span className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] text-[#98A2B3] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.25em]">
                    +12 Guias em Desenvolvimento
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] text-[#F8FAFC] whitespace-nowrap">
                  Materiais de <br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F8CFF] via-white to-white/40">Apoio & Métodos</span>
                </h1>
                
                <p className="text-lg md:text-xl text-[#98A2B3] leading-relaxed max-w-2xl font-medium">
                  Recursos educacionais de alta performance, flashcards e cronogramas estruturados com o rigor acadêmico da <strong>Medicina UFMG</strong> para transformar seu aprendizado.
                </p>
              </div>
            </div>

            {/* Authority/Trust Card - Mega Premium */}
            <div className="hidden xl:block min-w-[340px]">
              <div className="glass-premium rounded-[32px] p-8 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8CFF]/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#4F8CFF]/20 transition-all duration-700" />
                
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF] border border-[#4F8CFF]/20">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#4F8CFF]">Padrão de Qualidade</p>
                      <p className="text-white text-sm font-black tracking-tight">Curadoria Jeff Queiroz</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap size={14} className="text-[#4F8CFF]" />
                      <span className="text-[11px] font-bold text-[#98A2B3]">Baseado em Evidências Científicas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target size={14} className="text-[#4F8CFF]" />
                      <span className="text-[11px] font-bold text-[#98A2B3]">Focado em Alta Performance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen size={14} className="text-[#4F8CFF]" />
                      <span className="text-[11px] font-bold text-[#98A2B3]">Atualizado para o Ciclo 2026</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/[0.05]">
                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-[#98A2B3] mb-2">
                      <span>Integridade dos Dados</span>
                      <span className="text-[#4F8CFF]">100% Verificado</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-[#4F8CFF] to-[#2E70CE] animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section - Mega Premium Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 -mt-16 relative z-20">
        <div className="lg:col-span-8 xl:col-span-9 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materials.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => !item.disabled && setView(item.target)}
                  className={`group bg-[#11141A] border border-white/[0.05] rounded-[32px] p-8 shadow-2xl flex flex-col justify-between transition-all duration-500 premium-border relative overflow-hidden ${
                    item.disabled ? 'opacity-70 cursor-default' : 'cursor-pointer hover:border-[#4F8CFF]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]'
                  }`}
                >
                  {/* Card Background Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8CFF]/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 bg-white/[0.03] text-[#4F8CFF] rounded-2xl flex items-center justify-center border border-white/[0.05] group-hover:scale-110 group-hover:bg-[#4F8CFF]/10 transition-all duration-500">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md border ${
                          item.badge === 'Novo' || item.badge === 'Atualizado' 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                            : 'bg-[#4F8CFF]/10 border-[#4F8CFF]/20 text-[#4F8CFF]'
                        }`}>
                          {item.badge}
                        </span>
                        <span className="text-[9px] font-bold text-[#98A2B3]/60 uppercase tracking-widest">{item.stats}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-black text-[#4F8CFF] uppercase tracking-[0.2em] mb-1 block">{item.category}</span>
                        <h2 className="text-2xl font-black text-[#F8FAFC] tracking-tighter group-hover:text-white transition-colors">
                          {item.title}
                        </h2>
                      </div>
                      
                      <p className="text-[#98A2B3] text-sm leading-relaxed font-medium">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
                        <span className="text-[10px] font-bold text-[#F8FAFC]/80 uppercase tracking-widest">{item.methodology}</span>
                      </div>
                    </div>
                  </div>

                  {!item.disabled ? (
                    <div className="mt-10 pt-6 border-t border-white/[0.05] flex items-center justify-between group/btn relative z-10">
                      <span className="text-[10px] font-black text-[#4F8CFF] uppercase tracking-widest">Acessar Material</span>
                      <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-[#4F8CFF] group-hover:text-[#080A0F] transition-all duration-500">
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-10 pt-6 border-t border-white/[0.05] flex items-center justify-between relative z-10">
                      <span className="text-[10px] font-black text-[#98A2B3]/40 uppercase tracking-widest italic">Disponível em breve</span>
                      <Download size={16} className="text-[#98A2B3]/20" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Additional Info Section */}
          <div className="bg-[#11141A] rounded-[32px] p-10 border border-white/[0.05] premium-border space-y-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-black text-[#F8FAFC] tracking-tighter mb-4">Por que nossos materiais são diferentes?</h3>
              <p className="text-[#98A2B3] text-base leading-relaxed font-medium">
                Não entregamos apenas PDFs. Cada recurso da nossa biblioteca é construído sobre pilares de <strong>Neurociência da Aprendizagem</strong>. O objetivo é reduzir o tempo de estudo passivo e maximizar a retenção de longo prazo, essencial para a densa carga horária da Medicina.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/[0.05]">
              <div className="space-y-3">
                <div className="text-[#4F8CFF] font-black text-3xl tracking-tighter">01.</div>
                <h4 className="text-white font-black text-sm uppercase tracking-widest">Recuperação Ativa</h4>
                <p className="text-[#98A2B3] text-xs leading-relaxed font-medium">Forçamos o cérebro a buscar a informação, fortalecendo as sinapses e a memória.</p>
              </div>
              <div className="space-y-3">
                <div className="text-[#4F8CFF] font-black text-3xl tracking-tighter">02.</div>
                <h4 className="text-white font-black text-sm uppercase tracking-widest">Revisão Espaçada</h4>
                <p className="text-[#98A2B3] text-xs leading-relaxed font-medium">Intervalos matematicamente planejados para combater a Curva do Esquecimento.</p>
              </div>
              <div className="space-y-3">
                <div className="text-[#4F8CFF] font-black text-3xl tracking-tighter">03.</div>
                <h4 className="text-white font-black text-sm uppercase tracking-widest">Foco Seletivo</h4>
                <p className="text-[#98A2B3] text-xs leading-relaxed font-medium">Priorização baseada em dados de incidência das maiores provas do país.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="lg:col-span-4 xl:col-span-3">
          <Sidebar setView={setView} />
        </div>
      </div>
    </div>
  );
};
