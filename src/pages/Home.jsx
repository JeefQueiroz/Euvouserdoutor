import {
  ArrowRight,
  BookOpen,
  Clock3,
  FlaskConical,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { autoPosts } from '../autoPosts';
import { SafeImage } from '../components/SafeImage';

const categories = ['Saúde', 'Ciência', 'Tecnologia', 'Educação'];

function ArticleCard({ post, onOpen, featured = false }) {
  return (
    <article
      className={`group cursor-pointer ${featured ? 'lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-8' : ''}`}
      onClick={() => onOpen(post.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onOpen(post.id);
      }}
      role="link"
      tabIndex={0}
    >
      <div className={`relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#111820] ${featured ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[360px]' : 'aspect-[16/10]'}`}>
        <SafeImage
          src={post.img}
          alt={post.title}
          width={featured ? 1200 : 800}
          height={featured ? 750 : 500}
          priority={featured}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071018] via-[#071018]/10 to-transparent" />
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-[#071018]/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#8EB3FF] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6B9BFF]" />
          {post.cat}
        </div>
        {featured && (
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[11px] font-bold text-white/75">
            <span className="flex items-center gap-2"><Clock3 size={13} className="text-[#8EB3FF]" /> {post.date}</span>
            <span>{post.readTime} de leitura</span>
          </div>
        )}
      </div>
      <div className={`${featured ? 'mt-6 lg:mt-0 lg:flex lg:flex-col lg:justify-center' : 'mt-5'} space-y-3`}>
        {!featured && <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8290A5]"><Clock3 size={12} className="text-[#6B9BFF]" /> {post.date} · {post.readTime}</div>}
        <h3 className={`${featured ? 'text-2xl md:text-4xl' : 'text-xl'} font-black leading-[1.05] tracking-tight text-[#F7FAFC] transition-colors group-hover:text-[#9AB8FF]`}>
          {post.title}
        </h3>
        <p className={`${featured ? 'text-sm md:text-base' : 'text-sm'} line-clamp-3 leading-relaxed text-[#98A6B8]`}>
          {post.subtitle}
        </p>
        {featured && <span className="inline-flex items-center gap-2 pt-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#8EB3FF]">Ler análise completa <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>}
      </div>
    </article>
  );
}

export const Home = ({ setView, profileImg = '/jeff-queiroz-perfil.webp' }) => {
  const featuredPost = autoPosts[0];
  const latestPosts = autoPosts.slice(1, 4);

  return (
    <div className="min-h-screen bg-[#071018] pb-24 text-[#F7FAFC]">
      <section className="relative isolate min-h-[690px] overflow-hidden border-b border-white/[0.08] md:min-h-[760px]">
        <div className="absolute inset-0">
          <SafeImage src={featuredPost.img} alt="" width={1600} height={1000} priority className="h-full w-full object-cover opacity-35 grayscale-[20%]" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#071018_0%,#071018e8_38%,#0710188c_67%,#071018d9_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#071018_0%,transparent_42%,#07101880_100%)]" />
        </div>
        <div className="absolute -right-32 top-24 h-[480px] w-[480px] rounded-full border border-[#B8FF4A]/20 bg-[#B8FF4A]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8FF4A] to-transparent opacity-70" />
        <div className="container relative z-10 flex min-h-[690px] items-end py-14 md:min-h-[760px] md:py-20">
          <div className="grid w-full items-end gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-24">
            <div className="max-w-4xl">
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#B8FF4A] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#071018]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#071018]" /> Descoberta em foco</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Saúde & Ciência · 16 Ago 2026</span>
              </div>
              <p className="mb-5 text-sm font-black uppercase tracking-[0.3em] text-[#B8FF4A]">MethylScan · PNAS</p>
              <h1 className="max-w-5xl text-5xl font-black leading-[0.88] tracking-[-0.065em] text-white md:text-7xl lg:text-[7.25rem]">
                Um exame.<br /><span className="text-[#B8FF4A]">Quatro cânceres.</span><br />O que muda?
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl">
                A UCLA testou um método que procura sinais moleculares no sangue. A descoberta é promissora — mas a ciência ainda está medindo o que ela realmente pode fazer.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => setView(featuredPost.id)} className="group inline-flex items-center gap-3 rounded-2xl bg-[#B8FF4A] px-6 py-4 text-[11px] font-black uppercase tracking-[0.17em] text-[#071018] shadow-[0_15px_45px_rgba(184,255,74,.2)] transition hover:-translate-y-1 hover:bg-white">Ler a análise <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></button>
                <button type="button" onClick={() => setView('news')} className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/[0.06] px-6 py-4 text-[11px] font-black uppercase tracking-[0.17em] text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/10">Ver todas as notícias</button>
              </div>
            </div>
            <div className="hidden space-y-4 lg:block">
              <div className="border-l-2 border-[#B8FF4A] pl-5"><p className="text-4xl font-black tracking-tight text-white">1.061</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">amostras analisadas</p></div>
              <div className="border-l-2 border-white/25 pl-5"><p className="text-4xl font-black tracking-tight text-white">55,3%</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">sensibilidade em tumores iniciais</p></div>
              <div className="border-l-2 border-white/25 pl-5"><p className="text-sm font-bold leading-relaxed text-white/70">Um resultado promissor não é o mesmo que um exame pronto para uso clínico.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#8EB3FF]"><TrendingUp size={14} /> Curadoria da redação</div>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">O que está movimentando a ciência</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#8290A5]">Descobertas, tratamentos e tecnologias explicados sem exagero e com contexto.</p>
          </div>
          <button type="button" onClick={() => setView('news')} className="group inline-flex items-center gap-3 self-start rounded-xl border border-white/10 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#A8B4C4] transition hover:border-[#6B9BFF]/40 hover:text-white md:self-auto">Ver toda a redação <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></button>
        </div>
        <div className="grid gap-9 md:grid-cols-3">
          {latestPosts.map((post) => <ArticleCard key={post.id} post={post} onOpen={setView} />)}
        </div>
      </section>

      <section className="container">
        <div className="relative overflow-hidden rounded-[34px] border border-[#6B9BFF]/20 bg-[linear-gradient(115deg,rgba(24,40,65,.94),rgba(12,22,34,.96))] p-8 md:p-12">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#6B9BFF]/15 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
            <SafeImage src={profileImg} alt="Jeff Queiroz" width={112} height={112} className="h-24 w-24 rounded-3xl border border-[#8EB3FF]/30 object-cover md:h-28 md:w-28" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8EB3FF]">Criado por Jeff Queiroz</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">EuvouserDoutor para quem leva a formação a sério.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#A8B4C4]">Um espaço que conecta comunicação científica, preparação médica e tecnologia educacional em uma experiência editorial única.</p>
            </div>
            <button type="button" onClick={() => setView('author')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white transition hover:border-[#8EB3FF]/60 hover:bg-white/[0.06]">Conhecer Jeff <ArrowRight size={15} /></button>
          </div>
        </div>
      </section>

      <section className="container pt-16">
        <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
          <span className="mr-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#8290A5]">Explorar por tema</span>
          {categories.map((category) => <button key={category} type="button" onClick={() => setView('news')} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-[#B9C4D2] transition hover:border-[#6B9BFF]/45 hover:text-white">{category}</button>)}
        </div>
      </section>
    </div>
  );
};
