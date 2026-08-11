import React from 'react';
import { ArrowLeft, Award, BookOpen, GraduationCap, Instagram, Linkedin, Mail, ShieldCheck, Sparkles, Youtube, Globe, MapPin, Briefcase, History, Heart, Brain, Rocket, Code } from 'lucide-react';
import { institutional } from '../institutional';

const PinterestIcon = ({ size = 18, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.165-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.621 0 11.988-5.367 11.988-11.987C24.012 5.367 18.645 0 12.017 0z"/>
  </svg>
);

export const Author = ({ setView }) => {
  const profileImg = '/jeff-queiroz-perfil.jpg';

  const publications = [
    {
      title: 'Saúde Mental e Ansiedade Acadêmica em Estudantes de Medicina',
      category: 'Pesquisa UFMG',
      date: 'Ciclo 2026',
    },
    {
      title: 'Como estudar para Medicina com método, rotina e constância',
      category: 'Estratégia de Estudo',
      date: 'Agosto de 2026',
    },
    {
      title: 'Ética e Publicidade Médica no Ambiente Digital',
      category: 'Produção Científica',
      date: 'Julho de 2026',
    },
  ];

  return (
    <div className="animate-in text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      {/* Header - Mega Premium */}
      <div className="bg-[#0A192F] border-b border-white/[0.05] pt-12 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.15),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4F8CFF 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            type="button"
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-[9px] font-black text-[#4F8CFF] uppercase bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-all mb-12"
          >
            <ArrowLeft size={12} strokeWidth={3} /> Voltar ao Início
          </button>

          <div className="max-w-5xl flex flex-col md:flex-row items-center md:items-end gap-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#4F8CFF] to-[#2E70CE] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="w-32 h-32 md:w-44 md:h-44 shrink-0 rounded-full overflow-hidden border-2 border-white/10 relative z-10">
                <img src={profileImg} alt="Jefferson Queiroz" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="text-center md:text-left space-y-4">
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.25em]">
                  Fundador & Criador
                </span>
                <span className="bg-white/5 border border-white/10 text-[#98A2B3] px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-[0.25em]">
                  Acadêmico de Medicina UFMG
                </span>
              </div>
              
              <h1 className="text-3xl md:text-6xl font-black tracking-tighter leading-[0.9] text-[#F8FAFC]">
                Jefferson Viana Queiroz
              </h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-5 text-xs text-[#98A2B3] font-bold">
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#4F8CFF]" /> Belo Horizonte, MG</span>
                <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-[#4F8CFF]" /> Empreendedor Digital</span>
                <span className="flex items-center gap-1.5"><Code size={14} className="text-[#4F8CFF]" /> Tech & Inovação</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-16">
        <div className="lg:col-span-8 space-y-12">
          
          {/* Biografia Section */}
          <section className="bg-[#11141A] border border-white/[0.05] rounded-[32px] p-8 md:p-12 shadow-2xl space-y-8 premium-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F8CFF]/5 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="space-y-6 relative z-10">
              <h2 className="text-2xl md:text-4xl font-black text-[#F8FAFC] tracking-tighter flex items-center gap-4">
                <History className="text-[#4F8CFF]" size={28} /> Trajetória de Superação
              </h2>
              
              <div className="space-y-6 text-[#98A2B3] leading-relaxed text-base md:text-lg font-medium">
                <p>
                  Mineiro com raízes na cidade de <strong>Pavão</strong>, Jeff Queiroz construiu sua história acadêmica a partir de uma longa e resiliente preparação. Durante anos, acumulou não apenas conhecimento, mas métodos e estratégias que hoje formam a base do ecossistema <strong>Eu Vou Ser Doutor</strong>.
                </p>
                <p>
                  Sua jornada até a Medicina foi marcada por conquistas expressivas, incluindo a aprovação em <strong>1º lugar geral</strong> na UFVJM (Teófilo Otoni), antes de ingressar na <strong>Universidade Federal de Minas Gerais (UFMG)</strong>, uma das instituições mais prestigiadas do país.
                </p>
                <p>
                  Na UFMG, Jeff expandiu sua atuação para além da clínica, desenvolvendo pesquisas científicas sobre <strong>saúde mental de estudantes</strong>, ansiedade acadêmica e ética médica. Essa vivência real permitiu que ele mantivesse uma comunicação autêntica e próxima dos desafios enfrentados por quem sonha com a carreira médica.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-white/[0.05]">
                <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05]">
                  <Award className="text-[#4F8CFF] mb-3" size={24} />
                  <h3 className="font-black text-[#F8FAFC] text-[11px] uppercase tracking-widest mb-1">Destaque</h3>
                  <p className="text-[10px] font-bold text-[#98A2B3]">1º Lugar Geral UFVJM</p>
                </div>
                <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05]">
                  <Brain className="text-[#4F8CFF] mb-3" size={24} />
                  <h3 className="font-black text-[#F8FAFC] text-[11px] uppercase tracking-widest mb-1">Pesquisa</h3>
                  <p className="text-[10px] font-bold text-[#98A2B3]">Saúde Mental Acadêmica</p>
                </div>
                <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/[0.05]">
                  <Rocket className="text-[#4F8CFF] mb-3" size={24} />
                  <h3 className="font-black text-[#F8FAFC] text-[11px] uppercase tracking-widest mb-1">Missão</h3>
                  <p className="text-[10px] font-bold text-[#98A2B3]">Democratizar a Aprovação</p>
                </div>
              </div>
            </div>
          </section>

          {/* Interseção Tech & Medicina Section */}
          <section className="bg-[#11141A] border border-white/[0.05] rounded-[32px] p-8 md:p-12 shadow-2xl space-y-8 premium-border">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-4xl font-black text-[#F8FAFC] tracking-tighter flex items-center gap-4">
                <Code className="text-[#4F8CFF]" size={28} /> Inovação & Tecnologia
              </h2>
              <p className="text-[#98A2B3] leading-relaxed text-base md:text-lg font-medium">
                Jeff representa uma nova geração de médicos: aqueles construídos na interseção entre <strong>educação e inovação</strong>. Com experiência prévia como desenvolvedor de produtos digitais e estrategista em Web3, ele aplica hoje essa visão tecnológica para criar ferramentas que tornam o aprendizado mais organizado e acessível.
              </p>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 italic text-sm md:text-base text-[#F8FAFC]/80 border-l-4 border-l-[#4F8CFF]">
                "O Eu Vou Ser Doutor não é apenas um portal de conteúdo; é a expressão de como a tecnologia e a inteligência artificial podem ser aliadas na construção de um projeto de vida concreto."
              </div>
            </div>
          </section>

          {/* Publicações em Destaque */}
          <section className="bg-[#11141A] border border-white/[0.05] rounded-[32px] p-8 md:p-12 shadow-2xl space-y-8 premium-border">
            <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] tracking-tighter">
              Produção Acadêmica & Editorial
            </h2>
            <div className="space-y-4">
              {publications.map((pub, idx) => (
                <div key={idx} className="group bg-white/[0.02] border border-white/[0.05] hover:border-[#4F8CFF]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/5 px-2.5 py-1 rounded-md border border-[#4F8CFF]/10">
                      {pub.category}
                    </span>
                    <h3 className="text-base md:text-lg font-black text-[#F8FAFC] group-hover:text-white transition-colors">{pub.title}</h3>
                  </div>
                  <span className="text-[11px] text-[#98A2B3] font-bold shrink-0">{pub.date}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Social Links Card */}
          <div className="bg-[#11141A] border border-white/[0.05] rounded-[32px] p-8 space-y-8 premium-border">
            <h3 className="text-xs font-black text-[#F8FAFC] uppercase tracking-[0.2em]">Conecte-se com Jeff</h3>
            <div className="space-y-3">
              <a href={institutional.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[#F8FAFC] hover:border-[#4F8CFF]/40 hover:bg-[#4F8CFF]/5 transition-all text-sm font-bold group">
                <Instagram size={18} className="text-[#4F8CFF] group-hover:scale-110 transition-transform" /> @euvouserdoutor
              </a>
              <a href={institutional.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[#F8FAFC] hover:border-[#4F8CFF]/40 hover:bg-[#4F8CFF]/5 transition-all text-sm font-bold group">
                <Linkedin size={18} className="text-[#4F8CFF] group-hover:scale-110 transition-transform" /> LinkedIn Pessoal
              </a>
              <a href={institutional.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[#F8FAFC] hover:border-[#4F8CFF]/40 hover:bg-[#4F8CFF]/5 transition-all text-sm font-bold group">
                <Youtube size={18} className="text-[#4F8CFF] group-hover:scale-110 transition-transform" /> YouTube Oficial
              </a>
              <a href={institutional.pinterest} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[#F8FAFC] hover:border-[#4F8CFF]/40 hover:bg-[#4F8CFF]/5 transition-all text-sm font-bold group">
                <PinterestIcon size={18} className="text-[#4F8CFF] group-hover:scale-110 transition-transform" /> Pinterest
              </a>
              <a href={`mailto:${institutional.email}`} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[#F8FAFC] hover:border-[#4F8CFF]/40 hover:bg-[#4F8CFF]/5 transition-all text-sm font-bold group">
                <Mail size={18} className="text-[#4F8CFF] group-hover:scale-110 transition-transform" /> {institutional.email}
              </a>
            </div>
          </div>
          
          {/* Call to Action Card */}
          <div className="bg-gradient-to-br from-[#4F8CFF] to-[#2E70CE] rounded-[32px] p-10 space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 transition-transform duration-1000 group-hover:scale-150" />
            <Sparkles size={32} className="text-[#080A0F] opacity-80" />
            <h3 className="text-2xl font-black text-[#080A0F] tracking-tighter leading-tight relative z-10">
              Transforme sua <br /> jornada hoje.
            </h3>
            <p className="text-[#080A0F]/80 text-sm font-bold leading-relaxed relative z-10">
              Acompanhe os métodos que levaram Jeff ao topo da Federal e aplique-os na sua rotina.
            </p>
            <button 
              onClick={() => setView('mentorship')}
              className="w-full bg-[#080A0F] text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#1A1F26] transition-all relative z-10 shadow-xl"
            >
              Conhecer Mentoria
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
