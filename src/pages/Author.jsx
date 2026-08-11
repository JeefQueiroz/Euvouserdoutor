import React from 'react';
import { ArrowLeft, Award, BookOpen, GraduationCap, Instagram, Linkedin, Mail, ShieldCheck, Sparkles, Youtube } from 'lucide-react';
import { institutional } from '../institutional';

export const Author = ({ setView }) => {
  const profileImg = '/jeff-queiroz-eu-vou-ser-doutor.png';

  const publications = [
    {
      title: 'Como estudar para Medicina com método, rotina e constância',
      category: 'Estratégia de Estudo',
      date: 'Agosto de 2026',
    },
    {
      title: 'Avanços em Neurociência e Circuitos de Memória na Aprendizagem',
      category: 'Ciência & Tecnologia',
      date: 'Agosto de 2026',
    },
    {
      title: 'Organização do Ciclo Básico na Faculdade de Medicina',
      category: 'Vida Acadêmica',
      date: 'Julho de 2026',
    },
  ];

  return (
    <div className="animate-in text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#0A192F] border-b border-white/[0.05] pt-12 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.12),transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            type="button"
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-[9px] font-black text-[#4F8CFF] uppercase bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-all mb-10"
          >
            <ArrowLeft size={12} strokeWidth={3} /> Voltar ao Início
          </button>

          <div className="max-w-4xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-2 border-[#4F8CFF] shadow-2xl">
              <img src={profileImg} alt="Jefferson Queiroz" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.25em] mb-4">
                Perfil de Autor & Criador
              </span>
              <h1 className="text-2xl md:text-4xl font-black tracking-tighter leading-tight text-[#F8FAFC] mb-2">
                Jefferson Viana Queiroz (Jeff Queiroz)
              </h1>
              <p className="text-base text-[#98A2B3] font-medium leading-relaxed">
                Acadêmico de Medicina na UFMG e fundador do portal <strong>EuVouSerDoutor</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[#11141A] border border-white/[0.05] rounded-[28px] p-6 md:p-10 shadow-2xl space-y-6 text-[#98A2B3] leading-relaxed text-sm md:text-base font-medium premium-border">
            <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] tracking-tighter flex items-center gap-3">
              <GraduationCap className="text-[#4F8CFF]" size={24} /> Trajetória Acadêmica
            </h2>
            <p>
              Jefferson Viana Queiroz é estudante de Medicina na Universidade Federal de Minas Gerais (UFMG) e criador do ecossistema <strong>EuVouSerDoutor</strong>. Desenvolve pesquisas focadas em transformar a rotina de estudos de vestibulandos e acadêmicos.
            </p>
            <p>
              Através do portal, Jeff lidera a curadoria editorial rigorosa, unindo descobertas científicas em saúde a práticas validadas de estudo ativo, com ênfase no rigor metodológico.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/[0.05]">
              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                <Award className="text-[#4F8CFF] mb-2" size={20} />
                <h3 className="font-black text-[#F8FAFC] text-[11px] uppercase tracking-widest mb-1">Formação</h3>
                <p className="text-[10px] font-bold">Medicina na UFMG</p>
              </div>
              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                <BookOpen className="text-[#4F8CFF] mb-2" size={20} />
                <h3 className="font-black text-[#F8FAFC] text-[11px] uppercase tracking-widest mb-1">Especialidade</h3>
                <p className="text-[10px] font-bold">Educação & Pesquisa</p>
              </div>
              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                <ShieldCheck className="text-[#4F8CFF] mb-2" size={20} />
                <h3 className="font-black text-[#F8FAFC] text-[11px] uppercase tracking-widest mb-1">Plataforma</h3>
                <p className="text-[10px] font-bold">EuVouSerDoutor.com</p>
              </div>
            </div>
          </div>

          {/* Published Articles List */}
          <div className="bg-[#11141A] border border-white/[0.05] rounded-[28px] p-6 md:p-10 shadow-2xl space-y-6 premium-border">
            <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] tracking-tighter">
              Publicações em Destaque
            </h2>
            <div className="space-y-3">
              {publications.map((pub, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/5 px-2 py-0.5 rounded mb-1.5 inline-block border border-[#4F8CFF]/10">
                      {pub.category}
                    </span>
                    <h3 className="text-sm md:text-base font-black text-[#F8FAFC]">{pub.title}</h3>
                  </div>
                  <span className="text-[10px] text-[#98A2B3] font-bold shrink-0">{pub.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#11141A] border border-white/[0.05] rounded-[28px] p-6 md:p-8 space-y-6 premium-border">
            <h3 className="text-xs font-black text-[#F8FAFC] uppercase tracking-[0.2em]">Canais Oficiais</h3>
            <div className="space-y-2">
              <a href={institutional.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[#F8FAFC] hover:border-[#4F8CFF]/40 transition-all text-xs font-bold">
                <Instagram size={16} className="text-[#4F8CFF]" /> @euvouserdoutor
              </a>
              <a href={institutional.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[#F8FAFC] hover:border-[#4F8CFF]/40 transition-all text-xs font-bold">
                <Youtube size={16} className="text-[#4F8CFF]" /> YouTube Oficial
              </a>
              <a href={`mailto:${institutional.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[#F8FAFC] hover:border-[#4F8CFF]/40 transition-all text-xs font-bold">
                <Mail size={16} className="text-[#4F8CFF]" /> {institutional.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
