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

          <div className="max-w-4xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-36 h-36 shrink-0 rounded-full overflow-hidden border-4 border-[#4F8CFF] shadow-2xl">
              <img src={profileImg} alt="Jefferson Queiroz" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Perfil de Autor & Criador
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-[#F8FAFC] mb-2">
                Jefferson Viana Queiroz (Jeff Queiroz)
              </h1>
              <p className="text-lg text-[#98A2B3] font-medium leading-relaxed">
                Acadêmico de Medicina na UFMG e fundador do portal <strong>EuVouSerDoutor</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 pt-16">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-[#11141A] border border-white/[0.08] rounded-[32px] p-8 md:p-12 shadow-2xl space-y-6 text-[#98A2B3] leading-relaxed text-base">
            <h2 className="text-2xl font-black text-[#F8FAFC] tracking-tight uppercase italic flex items-center gap-3">
              <GraduationCap className="text-[#4F8CFF]" size={28} /> Trajetória e Compromisso Acadêmico
            </h2>
            <p>
              Jefferson Viana Queiroz é estudante de Medicina na Universidade Federal de Minas Gerais (UFMG) e criador do ecossistema educacional <strong>EuVouSerDoutor</strong>. Desenvolve pesquisas, artigos e guias práticos focados em transformar a rotina, a organização e o método de estudo de vestibulandos e acadêmicos.
            </p>
            <p>
              Através do portal, Jeff lidera a curadoria editorial rigorosa, unindo descobertas científicas em saúde e tecnologia a práticas validadas de estudo ativo, sempre com ênfase na verificação de fontes primárias e no rigor metodológico.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
              <div className="bg-[#171B23] p-5 rounded-2xl border border-white/[0.06]">
                <Award className="text-[#4F8CFF] mb-3" size={24} />
                <h3 className="font-black text-[#F8FAFC] text-sm mb-1">Formação</h3>
                <p className="text-xs">Medicina na UFMG</p>
              </div>
              <div className="bg-[#171B23] p-5 rounded-2xl border border-white/[0.06]">
                <BookOpen className="text-[#4F8CFF] mb-3" size={24} />
                <h3 className="font-black text-[#F8FAFC] text-sm mb-1">Especialidade</h3>
                <p className="text-xs">Educação Médica & Pesquisa</p>
              </div>
              <div className="bg-[#171B23] p-5 rounded-2xl border border-white/[0.06]">
                <ShieldCheck className="text-[#4F8CFF] mb-3" size={24} />
                <h3 className="font-black text-[#F8FAFC] text-sm mb-1">Plataforma</h3>
                <p className="text-xs">EuVouSerDoutor.com</p>
              </div>
            </div>
          </div>

          {/* Published Articles List */}
          <div className="bg-[#11141A] border border-white/[0.08] rounded-[32px] p-8 md:p-12 shadow-2xl space-y-6">
            <h2 className="text-2xl font-black text-[#F8FAFC] tracking-tight uppercase italic">
              Publicações Recentes em Destaque
            </h2>
            <div className="space-y-4">
              {publications.map((pub, idx) => (
                <div key={idx} className="bg-[#171B23] border border-white/[0.06] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/10 px-3 py-1 rounded-full mb-2 inline-block">
                      {pub.category}
                    </span>
                    <h3 className="text-lg font-black text-[#F8FAFC]">{pub.title}</h3>
                  </div>
                  <span className="text-xs text-[#98A2B3] shrink-0">{pub.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#11141A] border border-white/[0.08] rounded-3xl p-6 md:p-8 space-y-6">
            <h3 className="text-xl font-black text-[#F8FAFC] uppercase italic">Canais Oficiais</h3>
            <div className="space-y-3">
              <a href={institutional.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-2xl bg-[#171B23] border border-white/[0.06] text-white hover:border-[#4F8CFF]/40 transition-all text-sm font-bold">
                <Instagram size={18} className="text-[#4F8CFF]" /> @euvouserdoutor
              </a>
              <a href={institutional.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-2xl bg-[#171B23] border border-white/[0.06] text-white hover:border-[#4F8CFF]/40 transition-all text-sm font-bold">
                <Youtube size={18} className="text-[#4F8CFF]" /> YouTube Oficial
              </a>
              <a href={`mailto:${institutional.email}`} className="flex items-center gap-3 p-3 rounded-2xl bg-[#171B23] border border-white/[0.06] text-white hover:border-[#4F8CFF]/40 transition-all text-sm font-bold">
                <Mail size={18} className="text-[#4F8CFF]" /> {institutional.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
