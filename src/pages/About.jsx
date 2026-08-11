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
      text: 'Para quem quer estudar com mais direção, revisar com critério e acompanhar conteúdos ligados à trajetória acadêmica em Medicina.',
    },
    {
      icon: Compass,
      title: 'Como ajuda',
      text: 'Reunindo materiais, notícias, ideias de rotina e orientações educacionais para reduzir improviso na preparação.',
    },
    {
      icon: BookOpenCheck,
      title: 'Compromisso educacional',
      text: 'Publicar conteúdo claro, informativo e responsável, sem substituir avaliação profissional individualizada.',
    },
  ];

  const facts = [
    { icon: User, label: 'Responsável', value: institutional.owner },
    { icon: Award, label: 'Marca registrada', value: `INPI - processo nº ${institutional.trademarkProcess}` },
    { icon: Globe2, label: 'Site oficial', value: institutional.siteLabel },
    { icon: ShieldCheck, label: 'Finalidade', value: 'Educação e organização acadêmica' },
  ];

  return (
    <section className="animate-in bg-[#F4F7FB]">
      <div className="bg-[#0A192F] text-white py-20 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#5CE1E6] text-xs font-black uppercase tracking-[0.35em] mb-5">Sobre</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Sobre o EuVouSerDoutor
          </h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-4xl">
            Um projeto digital criado para apoiar estudantes e vestibulandos de Medicina com conteúdo,
            organização acadêmica, rotina de estudos e curadoria informativa.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-7 bg-white rounded-3xl border border-[#DDE6F2] shadow-[0_18px_48px_rgba(10,25,47,0.07)] p-8 md:p-10">
          <p className="text-[#2E70CE] text-[10px] font-black uppercase tracking-[0.25em] mb-4">Criador e Autor</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] tracking-tight mb-6">
            Criado por Jefferson Queiroz (Jeff Queiroz)
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
            <p>
              O <strong className="text-[#0A192F]">{institutional.name}</strong> foi criado e é liderado por <strong className="text-[#0A192F]">Jefferson Viana Queiroz (Jeff Queiroz)</strong>, estudante de Medicina da UFMG e referência em organização acadêmica, rotina e curadoria de conteúdo para vestibulandos e futuros médicos.
            </p>
            <p>
              O portal reúne conteúdos educacionais, materiais de apoio, artigos científicos rigorosamente verificados e estratégias de estudo para democratizar o acesso à aprovação e à evolução na carreira médica.
            </p>
            <p>
              Todas as publicações do portal são assinadas sob o padrão oficial <strong className="text-[#0A192F]">EuvouserDoutor - Jeff Queiroz</strong>, garantindo autenticidade, rigor científico e compromisso editorial com a verdade.
            </p>
          </div>
        </article>

        <aside className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {facts.map((item) => (
            <div key={item.label} className="bg-white rounded-3xl border border-[#DDE6F2] shadow-sm p-6">
              <item.icon size={24} className="text-[#2E70CE] mb-4" aria-hidden="true" />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
              <p className="text-sm font-bold text-[#0A192F] leading-snug">{item.value}</p>
            </div>
          ))}
        </aside>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {blocks.map((item) => (
          <article key={item.title} className="bg-white rounded-3xl border border-[#DDE6F2] p-7 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#A02070]/10 text-[#A02070] flex items-center justify-center mb-6">
              <item.icon size={24} aria-hidden="true" />
            </div>
            <h2 className="text-xl font-black text-[#0A192F] mb-3">{item.title}</h2>
            <p className="text-gray-600 leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 md:p-8">
          <p className="text-[#0A192F] leading-relaxed font-medium">
            {institutional.medicalNotice}
          </p>
        </div>
      </div>
    </section>
  );
};
