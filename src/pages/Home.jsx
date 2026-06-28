import React from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Download,
  GraduationCap,
  Layers,
  MessageCircle,
  Newspaper,
  Users,
} from 'lucide-react';
import { institutional } from '../institutional';

const ButtonIcon = ({ children }) => (
  <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
    {children}
  </span>
);

export const Home = ({ setView }) => {
  const homeImg = '/jeff-queiroz-eu-vou-ser-doutor.png';

  const audience = [
    'Vestibulandos que querem Medicina e precisam organizar a rotina.',
    'Estudantes que buscam revisar com mais critério e constância.',
    'Pessoas que acompanham conteúdos educacionais sobre vida acadêmica e saúde.',
  ];

  const pillars = [
    {
      icon: CalendarCheck,
      title: 'Rotina e método',
      text: 'Ideias de organização, planejamento semanal e estudo ativo para reduzir improviso.',
    },
    {
      icon: Layers,
      title: 'Materiais de apoio',
      text: 'Guias, checklists e recursos educacionais para consulta prática durante a preparação.',
    },
    {
      icon: Newspaper,
      title: 'Notícias e estratégias',
      text: 'Conteúdo editorial sobre revisão, simulados, redação, tecnologia e vida acadêmica.',
    },
    {
      icon: Users,
      title: 'Mentoria educacional',
      text: 'Acompanhamento voltado a rotina, revisão e evolução nos estudos, sem promessa de resultado.',
    },
  ];

  return (
    <div className="animate-in text-left bg-[#F4F7FB]">
      <section className="relative w-full overflow-hidden bg-[#0A192F] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(46,112,206,0.38),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(160,32,112,0.22),transparent_30%)]" />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 lg:py-32 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.22em] mb-7">
              <GraduationCap size={14} aria-hidden="true" /> EuVouSerDoutor
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[0.98] text-white max-w-4xl">
              Organização, estratégia e direção para quem quer Medicina.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mt-7">
              Conteúdos, materiais, notícias e mentoria para estudantes e vestibulandos que querem sair do improviso e evoluir com método.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => setView('materials')}
                className="group bg-[#A02070] text-white px-6 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_16px_34px_rgba(160,32,112,0.28)] hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Acessar materiais gratuitos <ButtonIcon><Download size={16} /></ButtonIcon>
              </button>
              <button
                type="button"
                onClick={() => setView('mentorship')}
                className="group bg-white/10 text-white border border-white/20 px-6 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/15 active:scale-[0.98] transition-all flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Conhecer a mentoria <ButtonIcon><ArrowRight size={16} /></ButtonIcon>
              </button>
              <button
                type="button"
                onClick={() => setView('contact')}
                className="group bg-transparent text-blue-100 px-6 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:text-white hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Falar com o projeto
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[28px] bg-white/10 border border-white/15 p-2 shadow-[0_28px_80px_rgba(0,0,0,0.25)]">
              <div className="rounded-[22px] overflow-hidden bg-[#111E33] aspect-[4/5]">
                <img src={homeImg} alt="Ilustração institucional do EuVouSerDoutor" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="text-[#2E70CE] font-black text-[10px] uppercase tracking-[0.25em] mb-4">Para quem é</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#0A192F] tracking-tight leading-tight">
              Apoio para estudar com mais clareza.
            </h2>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {audience.map((item) => (
              <article key={item} className="bg-white rounded-3xl p-6 border border-[#DDE6F2] shadow-[0_18px_48px_rgba(10,25,47,0.06)]">
                <CheckCircle2 className="text-[#2E70CE] mb-5" size={24} aria-hidden="true" />
                <p className="text-[#0A192F] font-bold leading-relaxed">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24 border-y border-[#DDE6F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-[#A02070] font-black text-[10px] uppercase tracking-[0.25em] mb-4">O que você encontra aqui</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#0A192F] tracking-tight leading-tight">
              Conteúdo educacional, materiais e direção de estudo no mesmo lugar.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {pillars.map((item) => (
              <article key={item.title} className="bg-[#F4F7FB] rounded-3xl p-7 border border-[#DDE6F2] h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#2E70CE]/10 text-[#2E70CE] flex items-center justify-center mb-6">
                  <item.icon size={24} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-black text-[#0A192F] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            icon: BookOpen,
            title: 'Materiais gratuitos',
            text: 'Acesse guias, checklists e conteúdos para apoiar sua organização semanal.',
            cta: 'Ver materiais',
            view: 'materials',
          },
          {
            icon: Newspaper,
            title: 'Notícias e estratégias',
            text: 'Leia artigos sobre técnicas de estudo, rotina, revisão, redação e vida acadêmica.',
            cta: 'Ler notícias',
            view: 'news',
          },
          {
            icon: MessageCircle,
            title: 'Contato institucional',
            text: 'Fale sobre dúvidas gerais, parcerias, materiais, mentoria ou assuntos do site.',
            cta: 'Entrar em contato',
            view: 'contact',
          },
        ].map((item) => (
          <article key={item.title} className="bg-white rounded-3xl p-7 border border-[#DDE6F2] shadow-[0_18px_48px_rgba(10,25,47,0.06)] flex flex-col">
            <item.icon className="text-[#A02070] mb-6" size={28} aria-hidden="true" />
            <h2 className="text-2xl font-black text-[#0A192F] mb-3">{item.title}</h2>
            <p className="text-gray-600 leading-relaxed flex-grow">{item.text}</p>
            <button
              type="button"
              onClick={() => setView(item.view)}
              className="mt-8 inline-flex items-center justify-between gap-3 rounded-full bg-[#0A192F] text-white px-5 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#142B4A] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E70CE]"
            >
              {item.cta} <ArrowRight size={16} aria-hidden="true" />
            </button>
          </article>
        ))}
      </section>

      <section className="bg-[#0A192F] text-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <p className="text-[#5CE1E6] font-black text-[10px] uppercase tracking-[0.25em] mb-4">Comunidade e acompanhamento</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              Estudo para Medicina exige constância, não promessa fácil.
            </h2>
            <p className="text-blue-100 leading-relaxed max-w-3xl">
              O EuVouSerDoutor reúne conteúdos e caminhos de organização para apoiar sua preparação. A mentoria é educacional e depende da disponibilidade de agenda.
            </p>
            <p className="text-blue-100/80 text-sm leading-relaxed max-w-3xl mt-5">
              {institutional.medicalNotice}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setView('mentorship')}
              className="bg-white text-[#0A192F] px-6 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-50 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6]"
            >
              Conhecer a mentoria
            </button>
            <button
              type="button"
              onClick={() => setView('materials')}
              className="bg-white/10 text-white border border-white/15 px-6 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/15 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6]"
            >
              Acessar materiais
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
