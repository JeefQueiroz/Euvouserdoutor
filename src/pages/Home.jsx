import {
  ArrowRight,
  BookOpen,
  Clock3,
  Dna,
  FlaskConical,
  GraduationCap,
  Microscope,
  MoveUpRight,
  Newspaper,
  Sparkles,
  Stethoscope,
  Telescope,
} from 'lucide-react';

const stories = [
  {
    id: 'post_retina_chip_2026',
    category: 'Tecnologia médica',
    title: 'Chip de retina restaura visão em estudo publicado no NEJM',
    excerpt: 'Uma tecnologia implantável abre uma nova frente de pesquisa para pessoas com degeneração macular.',
    image: '/retina_chip_tech.jpg',
    time: 'Em destaque',
  },
  {
    id: 'post_heart_gene_architect_2026',
    category: 'Genética',
    title: 'Gene arquiteto do coração ajuda a explicar malformações congênitas',
    excerpt: 'A descoberta mostra como alterações no TBX5 podem afetar a organização do DNA durante o desenvolvimento.',
    image: '/tbx5_dna_heart_2026.jpg',
    time: 'Ciência',
  },
  {
    id: 'post_plcg2_alzheimer_2026',
    category: 'Neurociência',
    title: 'Pesquisa investiga como o gene PLCG2 influencia as sinapses no Alzheimer',
    excerpt: 'O estudo amplia a compreensão de mecanismos celulares ligados à memória e à neurodegeneração.',
    image: '/plcg2_sinapses_alzheimer_2026.jpg',
    time: 'Pesquisa',
  },
];

const quickLinks = [
  { label: 'Saúde e medicina', icon: Stethoscope, view: 'news' },
  { label: 'Ciência e pesquisa', icon: Microscope, view: 'news' },
  { label: 'Tecnologia e inovação', icon: Dna, view: 'news' },
  { label: 'Educação médica', icon: GraduationCap, view: 'materials' },
];

export const Home = ({ setView }) => {
  const profileImg = '/jeff-queiroz-perfil.webp';
  const featured = stories[0];

  return (
    <div className="animate-in min-h-screen overflow-hidden bg-[#080A0F] text-[#F8FAFC]">
      <section className="relative isolate min-h-[620px] overflow-hidden border-b border-white/[0.08]">
        <img
          src={featured.image}
          alt="Ilustração editorial de tecnologia médica"
          width="1600"
          height="900"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#080A0F_0%,rgba(8,10,15,.94)_34%,rgba(8,10,15,.45)_72%,#080A0F_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#080A0F_0%,transparent_38%,rgba(8,10,15,.2)_100%)]" />
        <div className="pointer-events-none absolute -right-32 top-20 -z-10 h-80 w-80 rounded-full bg-[#4F8CFF]/20 blur-3xl" />

        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-6 pb-12 pt-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16 lg:pb-14">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#4F8CFF]/30 bg-[#080A0F]/50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#9BB9FF] backdrop-blur-md">
              <Sparkles size={13} aria-hidden="true" />
              Portal editorial de ciência e futuro
            </div>
            <h1 className="max-w-2xl text-4xl font-black leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.25rem] xl:text-[5.8rem]">
              Ciência que ajuda você a entender o que vem depois.
            </h1>
            <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-white/70 sm:text-lg">
              Reportagens, pesquisas e ideias que conectam saúde, medicina, tecnologia, educação e inovação — com contexto e responsabilidade.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setView('news')}
                className="group flex items-center gap-3 rounded-full bg-[#4F8CFF] px-6 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-[#080A0F] shadow-[0_18px_45px_rgba(79,140,255,.25)] transition-all hover:-translate-y-1 hover:bg-[#9BB9FF] focus:outline-none focus:ring-2 focus:ring-[#9BB9FF] focus:ring-offset-2 focus:ring-offset-[#080A0F]"
              >
                Explorar notícias
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => setView('author')}
                className="flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] px-6 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                Conheça o projeto
                <MoveUpRight size={15} />
              </button>
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-3 border-t border-white/20 pt-5">
              <div>
                <p className="text-2xl font-black tracking-tight text-white">01</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/45">Olhar científico</p>
              </div>
              <div className="border-l border-white/15 pl-5">
                <p className="text-2xl font-black tracking-tight text-white">24h</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/45">Atualização</p>
              </div>
              <div className="border-l border-white/15 pl-5">
                <p className="text-2xl font-black tracking-tight text-white">BR</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/45">Contexto local</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setView(featured.id)}
            className="group relative overflow-hidden rounded-[28px] border border-white/20 bg-[#0D111A]/80 p-2 text-left shadow-2xl backdrop-blur-xl transition-transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-[#9BB9FF]"
          >
            <div className="relative aspect-[4/4.7] overflow-hidden rounded-[22px]">
              <img src={featured.image} alt={featured.title} width="700" height="875" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-transparent to-transparent" />
              <div className="absolute left-5 top-5 rounded-full bg-[#080A0F]/70 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#9BB9FF] backdrop-blur-md">{featured.category}</div>
              <div className="absolute inset-x-5 bottom-5">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/60"><Clock3 size={12} /> {featured.time}</p>
                <h2 className="text-2xl font-black leading-tight tracking-tight text-white">{featured.title}</h2>
                <span className="mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#4F8CFF] text-[#080A0F] transition-transform group-hover:translate-x-1"><ArrowRight size={17} /></span>
              </div>
            </div>
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#4F8CFF]"><Telescope size={14} /> Um mapa para o futuro</p>
            <h2 className="max-w-lg text-4xl font-black leading-none tracking-[-0.05em] text-white sm:text-6xl">Ideias importantes, explicadas com clareza.</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#98A2B3] lg:justify-self-end">O EuvouserDoutor acompanha o que está mudando na ciência e na medicina para transformar informação complexa em conhecimento útil, verificável e próximo da realidade brasileira.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map(({ label, icon: Icon, view }) => (
            <button key={label} type="button" onClick={() => setView(view)} className="group flex min-h-28 flex-col justify-between rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 text-left transition-all hover:-translate-y-1 hover:border-[#4F8CFF]/50 hover:bg-[#4F8CFF]/[0.08] focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]">
              <Icon size={20} className="text-[#4F8CFF] transition-transform group-hover:scale-110" aria-hidden="true" />
              <span className="text-sm font-black leading-tight text-white">{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-[#0B0F17]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#4F8CFF]"><Newspaper size={14} /> Curadoria editorial</p>
              <h2 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">O que está em movimento</h2>
            </div>
            <button type="button" onClick={() => setView('news')} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/60 transition-colors hover:text-white">Ver todas as notícias <ArrowRight size={15} /></button>
          </div>
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] md:items-start">
            <article className="group">
              <button type="button" onClick={() => setView(stories[0].id)} className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-[#4F8CFF] focus:ring-offset-4 focus:ring-offset-[#0B0F17]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-white/[0.1]">
                  <img src={stories[0].image} alt={stories[0].title} width="1000" height="625" loading="eager" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F]/85 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-lg bg-[#080A0F]/75 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#9BB9FF] backdrop-blur-md">{stories[0].category}</span>
                </div>
                <div className="mt-5">
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#98A2B3]"><Clock3 size={12} className="text-[#4F8CFF]" /> {stories[0].time}</p>
                  <h3 className="text-2xl font-black leading-tight tracking-[-0.03em] text-white transition-colors group-hover:text-[#9BB9FF] sm:text-3xl">{stories[0].title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#98A2B3]">{stories[0].excerpt}</p>
                </div>
              </button>
            </article>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-1">
              {stories.slice(1).map((story) => (
                <article key={story.id} className="group">
                  <button type="button" onClick={() => setView(story.id)} className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-[#4F8CFF] focus:ring-offset-4 focus:ring-offset-[#0B0F17]">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] border border-white/[0.1]">
                      <img src={story.image} alt={story.title} width="1000" height="563" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F]/80 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-lg bg-[#080A0F]/75 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-[#9BB9FF] backdrop-blur-md">{story.category}</span>
                    </div>
                    <div className="mt-4">
                      <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#98A2B3]"><Clock3 size={12} className="text-[#4F8CFF]" /> {story.time}</p>
                      <h3 className="text-xl font-black leading-tight tracking-[-0.03em] text-white transition-colors group-hover:text-[#9BB9FF]">{story.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#98A2B3]">{story.excerpt}</p>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-[32px] border border-[#4F8CFF]/20 bg-[radial-gradient(circle_at_100%_0%,rgba(79,140,255,.2),transparent_45%),#101722] p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-center gap-5">
              <img src={profileImg} alt="Jeff Queiroz" width="96" height="96" loading="lazy" decoding="async" className="h-20 w-20 rounded-2xl border border-white/20 object-cover sm:h-24 sm:w-24" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#9BB9FF]">Criador e autor relacionado</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white">Jeff Queiroz</h2>
                <p className="mt-1 text-sm text-white/60">EuvouserDoutor</p>
              </div>
            </div>
            <div className="max-w-xl lg:text-right">
              <p className="text-base leading-relaxed text-white/70">Um projeto editorial para aproximar o público das descobertas que podem mudar a forma como entendemos o corpo, a sociedade e o futuro.</p>
              <button type="button" onClick={() => setView('author')} className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:text-[#9BB9FF]">Conhecer o autor <ArrowRight size={15} /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-[#080A0F]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-white"><BookOpen size={18} className="text-[#4F8CFF]" /><span className="text-sm font-bold">Leia, compreenda e compartilhe conhecimento.</span></div>
          <button type="button" onClick={() => setView('news')} className="flex items-center gap-2 self-start rounded-full border border-white/15 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:border-[#4F8CFF] hover:text-[#9BB9FF] sm:self-auto">Ir para a redação <ArrowRight size={14} /></button>
        </div>
      </section>
    </div>
  );
};
