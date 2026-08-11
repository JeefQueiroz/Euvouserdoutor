import React from 'react';
import { Award, BookOpenCheck, Compass, Globe2, GraduationCap, ShieldCheck, Target, User } from 'lucide-react';
import { institutional } from '../institutional';

export const About = () => {
  const blocks = [
    {
      icon: Target,
      title: 'Missão',
      text: 'Apoiar estudantes e vestibulandos de Medicina com conteúdo educacional, organização acadêmica e curadoria informativa.',
    },
    {
      icon: GraduationCap,
      title: 'Para quem é',
      text: 'Para quem quer estudar com mais direção, revisar com critério e acompanhar conteúdos ligados à trajetória acadêmica.',
    },
    {
      icon: Compass,
      title: 'Como ajuda',
      text: 'Reunindo materiais, notícias, ideias de rotina e orientações educacionais para reduzir improviso na preparação.',
    },
    {
      icon: BookOpenCheck,
      title: 'Compromisso',
      text: 'Publicar conteúdo claro, informativo e responsável, sem substituir avaliação profissional individualizada.',
    },
  ];

  const facts = [
    { icon: User, label: 'Responsável', value: institutional.owner },
    { icon: Award, label: 'Marca registrada', value: `INPI - nº ${institutional.trademarkProcess}` },
    { icon: Globe2, label: 'Site oficial', value: institutional.siteLabel },
    { icon: ShieldCheck, label: 'Finalidade', value: 'Educação & Ciência' },
  ];

  return (
    <section className="animate-in bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      <div className="bg-[#0A192F] border-b border-white/[0.05] py-12 md:py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.12),transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.25em] mb-6">
            Institucional
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-4 text-[#F8FAFC]">
            Sobre o EuVouSerDoutor
          </h1>
          <p className="text-base md:text-lg text-[#98A2B3] leading-relaxed max-w-2xl font-medium">
            Um projeto digital criado para apoiar estudantes e vestibulandos de Medicina com conteúdo,
            organização acadêmica e curadoria informativa.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8 bg-[#11141A] rounded-[24px] border border-white/[0.05] shadow-2xl p-6 md:p-10 premium-border">
          <p className="text-[#4F8CFF] text-[9px] font-black uppercase tracking-[0.25em] mb-4">Criador e Autor</p>
          <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] tracking-tighter mb-6">
            Criado por Jefferson Queiroz (Jeff Queiroz)
          </h2>
          <div className="space-y-5 text-[#98A2B3] leading-relaxed text-sm md:text-base font-medium">
            <p>
              O <strong className="text-[#F8FAFC]">{institutional.name}</strong> foi criado e é liderado por <strong className="text-[#F8FAFC]">Jefferson Viana Queiroz (Jeff Queiroz)</strong>, estudante de Medicina da UFMG e referência em organização acadêmica, rotina e curadoria de conteúdo para vestibulandos e futuros médicos.
            </p>
            <p>
              O portal reúne conteúdos educacionais, materiais de apoio, artigos científicos rigorosamente verificados e estratégias de estudo para democratizar o acesso à aprovação e à evolução na carreira médica.
            </p>
            <p>
              Todas as publicações do portal são assinadas sob o padrão oficial <strong className="text-[#F8FAFC]">EuvouserDoutor - Jeff Queiroz</strong>, garantindo autenticidade, rigor científico e compromisso editorial com a verdade.
            </p>
          </div>
        </article>

        <aside className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {facts.map((item) => (
            <div key={item.label} className="bg-[#11141A] rounded-2xl border border-white/[0.05] p-5 premium-border">
              <item.icon size={18} className="text-[#4F8CFF] mb-3" aria-hidden="true" />
              <p className="text-[9px] font-black uppercase tracking-widest text-[#98A2B3] mb-1">{item.label}</p>
              <p className="text-xs font-bold text-[#F8FAFC] leading-snug">{item.value}</p>
            </div>
          ))}
        </aside>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {blocks.map((item) => (
          <article key={item.title} className="bg-[#11141A] rounded-2xl border border-white/[0.05] p-6 shadow-2xl premium-border">
            <div className="w-10 h-10 rounded-xl bg-[#4F8CFF]/10 text-[#4F8CFF] flex items-center justify-center mb-5">
              <item.icon size={20} aria-hidden="true" />
            </div>
            <h2 className="text-lg font-black text-[#F8FAFC] mb-2">{item.title}</h2>
            <p className="text-[#98A2B3] text-xs leading-relaxed font-medium">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#11141A] border border-[#4F8CFF]/20 rounded-2xl p-6">
          <p className="text-[#98A2B3] text-xs leading-relaxed font-medium italic">
            {institutional.medicalNotice}
          </p>
        </div>
      </div>
    </section>
  );
};
