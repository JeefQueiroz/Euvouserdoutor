import React from 'react';
import { Trophy, Calendar, Zap, PenTool, ShieldCheck, AlertCircle, Clock, Target, Lock } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const Mentorship = ({ setView, profileImg, telegram }) => (
  <div className="pb-20 bg-[#F4F7FB] min-h-screen text-left animate-in">
    {/* Hero FOMO */}
    <div className="bg-[#0A192F] text-white pt-12 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2E70CE]/20 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5CE1E6]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 z-0"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-6">
        <div className="inline-flex items-center justify-center gap-2 bg-[#A02070]/20 border border-[#A02070]/50 text-[#F0F4F8] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(160,32,112,0.4)]">
          <span className="w-2 h-2 rounded-full bg-[#A02070] animate-pulse"></span>
          Acompanhamento em turma limitada
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none whitespace-nowrap">
          <span className="text-white">Mentoria </span>
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#96A1DF] to-white">Aprovado</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 font-medium leading-relaxed max-w-2xl">
          Um acompanhamento organizado para futuros estudantes de Medicina, com estudo ativo, rotina e troca de experiências com quem já trilhou esse caminho.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
          <a href={telegram} target="_blank" rel="noreferrer" className="bg-[#A02070] hover:bg-[#8A1B60] text-white px-8 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(160,32,112,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(160,32,112,0.8)] hover:-translate-y-1 flex items-center justify-center gap-2">
            Conhecer a Comunidade <Lock size={16}/>
          </a>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-16 relative z-20">
      <div className="lg:col-span-8 space-y-10">
        
        {/* FOMO Banner alert */}
        <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
           <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
             <Clock size={24} strokeWidth={2.5} className="animate-pulse" />
           </div>
           <div>
             <h3 className="text-red-800 font-black uppercase tracking-tight text-lg mb-1">Acompanhamento com vagas limitadas</h3>
             <p className="text-red-700/80 text-sm font-medium">Para manter organização e qualidade de acompanhamento, as turmas podem ter limite de participantes. As informações atualizadas ficam nos canais oficiais.</p>
           </div>
        </div>

        {/* Método */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-black text-[#0A192F] uppercase tracking-tight flex items-center gap-3 mb-8 italic"><ShieldCheck className="text-[#2E70CE]" size={32}/> Método de estudo</h2>
          <p className="text-gray-600 leading-relaxed mb-10 text-lg">A preparacao fica mais clara quando teoria, revisao e rotina trabalham juntas. O foco aqui e organizar prioridades, acompanhar desempenho e transformar estudo em processo consistente.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F4F7FB] p-8 rounded-[32px] border border-gray-100 hover:border-[#2E70CE]/30 transition-colors group">
              <Calendar className="text-[#2E70CE] mb-6 group-hover:scale-110 transition-transform duration-300" size={36} strokeWidth={1.5} />
              <h3 className="font-black uppercase text-[#0A192F] text-lg">Cronograma de 30 semanas</h3>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">Um plano de estudos ajuda a organizar prioridades, revisar conteúdos e acompanhar a própria evolução.</p>
            </div>
            <div className="bg-[#F4F7FB] p-8 rounded-[32px] border border-gray-100 hover:border-[#A02070]/30 transition-colors group">
              <Target className="text-[#A02070] mb-6 group-hover:scale-110 transition-transform duration-300" size={36} strokeWidth={1.5} />
              <h3 className="font-black uppercase text-[#0A192F] text-lg">Revisão com critério</h3>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">A proposta é mapear dificuldades, revisar com constância e reduzir decisões feitas no improviso.</p>
            </div>
          </div>
        </div>

        {/* Retenção */}
        <div className="bg-[#0A192F] rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2E70CE]/10 to-transparent z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase italic mb-10 flex items-center gap-3"><Trophy className="text-yellow-400" size={32}/> Revisão e consistência</h2>
            <p className="text-blue-100 mb-10 leading-relaxed">Mais importante do que acumular horas é estudar com método, revisar com frequência e acompanhar o próprio desempenho.</p>
            
            <div className="space-y-10">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs uppercase font-bold text-gray-400 tracking-widest">Estudo sem revisão estruturada</span>
                  <span className="text-xl font-black text-gray-400">Baixa retenção</span>
                </div>
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-500 w-[30%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs uppercase font-black text-[#5CE1E6] tracking-widest flex items-center gap-2">
                    <Zap size={14} className="text-[#5CE1E6]"/> Estudo ativo e revisão
                  </span>
                  <span className="text-3xl font-black text-white">Constância</span>
                </div>
                <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_15px_rgba(92,225,230,0.2)]">
                  <div className="absolute top-0 left-0 h-full w-full bg-white/5"></div>
                  <div className="h-full bg-gradient-to-r from-[#2E70CE] to-[#5CE1E6] w-[70%] rounded-full relative z-10">
                    <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA FOMO */}
        <div className="bg-gradient-to-br from-white to-[#F4F7FB] border-2 border-[#2E70CE]/10 rounded-[40px] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#2E70CE] to-transparent"></div>
           <AlertCircle size={48} className="text-[#2E70CE] mx-auto mb-6" strokeWidth={1.5} />
           <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] uppercase italic tracking-tight mb-4">Organize sua rotina de estudo</h2>
           <p className="text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">Se voce quer organizar melhor sua rotina para Medicina, entre no canal oficial e acompanhe as orientacoes disponiveis para a comunidade.</p>
           
           <a href={telegram} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#2E70CE] text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest shadow-[0_10px_30px_-10px_rgba(46,112,206,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(46,112,206,0.8)] hover:-translate-y-1 hover:bg-[#1f56a3] transition-all duration-300 w-full sm:w-auto">
             Acessar canal oficial <PenTool size={18}/>
           </a>
        </div>

      </div>
      <div className="lg:col-span-4"><Sidebar setView={setView} profileImg={profileImg} /></div>
    </div>
  </div>
);
