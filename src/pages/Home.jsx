import React from 'react';
import { Download, CheckSquare, Percent, Zap, Target, Users, Quote, Youtube, Instagram, Send, Check, Stethoscope, CheckCircle2, ArrowRight } from 'lucide-react';

export const Home = ({ setView, profileImg }) => {
  const homeImg = "https://i.imgur.com/P8oXDVC.jpg";
  return (
    <div className="animate-in text-left bg-[#F0F4F8]">
      <section className="relative w-full overflow-hidden bg-[#0A192F] text-white pt-20 pb-40 md:pt-32 md:pb-56">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 to-[#2E70CE]/90"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="md:w-[55%] flex flex-col items-start z-20">
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              +135.000 VESTIBULANDOS INSPIRADOS
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-black mb-8 tracking-tighter leading-[0.95] text-white uppercase italic break-words">
              Democratizando <br/> o Acesso à <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">Medicina</span>
            </h1>
            <p className="text-xl text-blue-100 font-medium leading-relaxed max-w-xl">
              O ecossistema completo que integra a Mentoria Aprovado e os Flashcards Aprovado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
              <button onClick={() => setView('materials')} className="bg-[#A02070] text-white px-8 py-4 rounded-full font-black text-xs uppercase shadow-[0_0_20px_rgba(160,32,112,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2">
                <Download size={18} /> Materiais Gratuitos
              </button>
              <button onClick={() => setView('mentorship')} className="bg-blue-600/20 text-white border border-blue-400/30 px-8 py-4 rounded-full font-black text-xs uppercase hover:bg-blue-600/40 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                <Users size={18} /> Mentoria Aprovado
              </button>
            </div>

            {/* Estatísticas Integradas */}
            <div className="w-full pt-8 border-t border-white/10">
              <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                {[
                  { label: 'Seguidores no IG', val: '135K' },
                  { label: 'Taxa Aprovação', val: '85%' },
                  { label: 'Retenção Natureza', val: '92%' },
                  { label: 'Simulados Inéditos', val: '100+' }
                ].map((item, i) => (
                  <div key={i} className="text-left border-l-4 border-[#5CE1E6] pl-5 hover:translate-x-2 transition-transform cursor-default">
                    <p className="text-3xl lg:text-4xl font-black text-white italic drop-shadow-lg leading-none mb-2">{item.val}</p>
                    <p className="text-[10px] lg:text-xs text-blue-200/80 font-bold uppercase tracking-[0.2em]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:w-[45%] hidden md:block z-10 relative mt-10 md:mt-0">
            {/* Imagem Principal */}
            <div className="w-full h-[600px] rounded-[40px] overflow-hidden border-8 border-white/10 shadow-[0_0_50px_rgba(46,112,206,0.3)] relative z-10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent z-10 opacity-60"></div>
              <img src={homeImg} alt="Jeff Queiroz" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-[#2E70CE] font-black text-[10px] uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full inline-block mb-4">A Ciência do Aprendizado</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] mt-2 italic uppercase">Os 3 Pilares da Aprovação</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-lg">Nosso método foge do ensino tradicional passivo. Construímos um ecossistema focado no que realmente importa para a sua nota no ENEM e grandes vestibulares.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#0A192F] p-10 rounded-[32px] shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent z-0"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#2E70CE]/20 text-[#A02070] rounded-2xl flex items-center justify-center mb-8 shadow-lg border border-[#A02070]/20">
                <Zap size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight">1. Mentalidade Inabalável</h3>
              <p className="text-blue-100 leading-relaxed mb-6">A aprovação começa na mente. Fornecemos a inspiração e a blindagem emocional necessárias para enfrentar a maratona de estudos sem desistir.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm font-medium text-blue-50">
                  <CheckCircle2 size={18} className="text-[#A02070] shrink-0 mt-0.5" /> Rotina real de estudante de Medicina da UFMG.
                </li>
                <li className="flex items-start gap-3 text-sm font-medium text-blue-50">
                  <CheckCircle2 size={18} className="text-[#A02070] shrink-0 mt-0.5" /> Controle de ansiedade e foco direcionado.
                </li>
                <li className="flex items-start gap-3 text-sm font-medium text-blue-50">
                  <CheckCircle2 size={18} className="text-[#A02070] shrink-0 mt-0.5" /> Ferramentas práticas para evitar a procrastinação.
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0A192F] p-10 rounded-[32px] shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden text-white transform lg:-translate-y-6 border border-[#2E70CE]/20">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2E70CE]/20 to-transparent z-0"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#A02070]/10 rounded-full blur-3xl z-0"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#A02070]/20 backdrop-blur-md text-[#A02070] rounded-2xl flex items-center justify-center mb-8 shadow-lg border border-[#A02070]/30">
                <Target size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight">2. Estratégia Técnica</h3>
              <p className="text-blue-100 leading-relaxed mb-6">Chega de resumos passivos. Nosso núcleo é fundamentado na ciência do Active Recall e nas métricas do TRI.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm font-medium text-blue-50">
                  <CheckCircle2 size={18} className="text-[#A02070] shrink-0 mt-0.5" /> Flashcards com Revisão Espaçada automática.
                </li>
                <li className="flex items-start gap-3 text-sm font-medium text-blue-50">
                  <CheckCircle2 size={18} className="text-[#A02070] shrink-0 mt-0.5" /> Cronogramas pautados nos temas mais incidentes.
                </li>
                <li className="flex items-start gap-3 text-sm font-medium text-blue-50">
                  <CheckCircle2 size={18} className="text-[#A02070] shrink-0 mt-0.5" /> Análise de desempenho detalhada por simulados.
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0A192F] p-10 rounded-[32px] shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent z-0"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#2E70CE]/20 text-[#2E70CE] rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                <Users size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase italic tracking-tight">3. Ecossistema VIP</h3>
              <p className="text-blue-100 leading-relaxed mb-6">A jornada é solitária, mas não precisa ser. Você inevitavelmente se torna a média das pessoas com as quais convive.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm font-medium text-blue-50">
                  <CheckCircle2 size={18} className="text-[#A02070] shrink-0 mt-0.5" /> Rede de alunos de altíssima performance.
                </li>
                <li className="flex items-start gap-3 text-sm font-medium text-blue-50">
                  <CheckCircle2 size={18} className="text-[#A02070] shrink-0 mt-0.5" /> Mentorias ao vivo e plantões tira-dúvidas semanais.
                </li>
                <li className="flex items-start gap-3 text-sm font-medium text-blue-50">
                  <CheckCircle2 size={18} className="text-[#A02070] shrink-0 mt-0.5" /> Suporte direto e direcionado com os mentores aprovados.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-[#F4F7FB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#2E70CE] font-black text-[10px] uppercase tracking-[0.3em] bg-blue-100/50 px-4 py-2 rounded-full inline-block mb-4">Histórias Reais</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] mt-2 italic uppercase">O que dizem os aprovados</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Depoimento 1 */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-all">
              <Quote className="absolute top-6 right-6 text-blue-50 transition-transform group-hover:scale-110" size={60} />
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-gray-700 italic leading-relaxed mb-8 flex-grow">"A estratégia da Mentoria Aprovado aliada aos cronogramas fez-me alcançar 920 na redação e dominar a prova de Natureza."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-black">M</div>
                  <div>
                    <p className="font-black text-[#0A192F] uppercase text-sm">Mariana C.</p>
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Caloura de Medicina</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Depoimento 2 - Destaque */}
            <div className="bg-[#0A192F] text-white p-10 rounded-[32px] shadow-2xl relative group hover:-translate-y-2 transition-all transform md:-translate-y-4 border border-[#2E70CE]/30">
              <div className="absolute inset-0 bg-gradient-to-b from-[#2E70CE]/20 to-transparent z-0 rounded-[32px]"></div>
              <Quote className="absolute top-6 right-6 text-white/5 transition-transform group-hover:scale-110 z-0" size={60} />
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-blue-50 italic leading-relaxed mb-8 flex-grow">"Os flashcards foram a virada de chave no meu estudo ativo. Passei em Medicina na UFMG pelo SISU com uma média muito superior ao ano passado."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2E70CE] rounded-full flex items-center justify-center text-white font-black">L</div>
                  <div>
                    <p className="font-black text-white uppercase text-sm">Lucas T.</p>
                    <p className="text-[10px] text-[#A02070] font-bold uppercase tracking-wider">Aprovado na UFMG</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-all">
              <Quote className="absolute top-6 right-6 text-blue-50 transition-transform group-hover:scale-110" size={60} />
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-gray-700 italic leading-relaxed mb-8 flex-grow">"Estudar a teoria sem direção me deixava exausta. O direcionamento do portal focou minha energia onde importava e a aprovação na USP veio."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-black">F</div>
                  <div>
                    <p className="font-black text-[#0A192F] uppercase text-sm">Fernanda R.</p>
                    <p className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">Aprovada na FUVEST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-16 italic tracking-tight">
            Por onde conversamos com nossos Futuros Doutores 👇
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* YouTube */}
            <div className="bg-white rounded-[32px] p-8 flex flex-col items-center border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
                <Youtube size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#0A192F] mb-4">YouTube</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                Temos lives semanais, resoluções de provas e vídeos de direcionamento prático focados na sua aprovação em Medicina.
              </p>
              <a href="https://youtube.com/@Euvouserdoutor" target="_blank" rel="noreferrer" className="w-full bg-red-500 text-white py-3.5 px-6 mt-8 rounded-xl font-black uppercase text-[11px] tracking-wider hover:bg-red-600 hover:scale-[1.02] transition-all shadow-md">
                Ver YouTube
              </a>
            </div>

            {/* Instagram */}
            <div className="bg-white rounded-[32px] p-8 flex flex-col items-center border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full">
              <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center mb-6">
                <Instagram size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#0A192F] mb-4">Instagram</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                Mostramos a rotina real na faculdade de medicina, abrimos caixinhas de dúvidas diariamente e soltamos pílulas de estratégia para o ENEM.
              </p>
              <a href="https://instagram.com/euvouserdoutor" target="_blank" rel="noreferrer" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3.5 px-6 mt-8 rounded-xl font-black uppercase text-[11px] tracking-wider hover:opacity-90 hover:scale-[1.02] transition-all shadow-md">
                Ver Instagram
              </a>
            </div>

            {/* Comunidade / Telegram */}
            <div className="bg-white rounded-[32px] p-8 flex flex-col items-center border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full">
              <div className="w-16 h-16 bg-[#2E70CE]/10 text-[#2E70CE] rounded-full flex items-center justify-center mb-6">
                <Send size={32} />
              </div>
              <h3 className="text-2xl font-black text-[#0A192F] mb-4">Comunidade VIP</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                Nosso grupo exclusivo no Telegram, onde enviamos materiais inéditos, flashcards gratuitos e avisos importantes. Sem spam, apenas alto valor.
              </p>
              <a href="https://t.me/Euvouserdoutor" target="_blank" rel="noreferrer" className="w-full bg-[#0A192F] text-white py-3.5 px-6 mt-8 rounded-xl font-black uppercase text-[11px] tracking-wider hover:bg-[#1a2f4c] hover:scale-[1.02] transition-all shadow-md">
                Entrar no Grupo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Escuro */}
      <section className="relative w-full overflow-hidden bg-[#0A192F] text-white py-32 border-t border-[#2E70CE]/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/90 to-[#2E70CE]/80 z-0"></div>
        {/* Decorative background glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#A02070]/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 z-0"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          
          {/* Coluna da Esquerda */}
          <div className="md:w-5/12 text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase mb-8 shadow-lg">
              <Stethoscope size={14} /> Junte-se a nós
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase italic leading-[1.05] tracking-tight drop-shadow-lg">
              Eu vou ser<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#96A1DF] to-white">Doutor</span>
            </h2>
            
            <p className="text-blue-100 text-lg leading-relaxed mb-8 max-w-md font-medium">
              Tenha acesso ao exato ecossistema de estudos que já guiou milhares de alunos rumo à aprovação em Medicina.
            </p>
            
            <p className="text-white font-black text-xs tracking-[0.2em] underline underline-offset-8 decoration-[#A02070] mb-12 uppercase">
              ACESSO ATÉ A SUA APROVAÇÃO
            </p>
            
            <button onClick={() => setView('mentorship')} className="w-full sm:w-auto bg-white text-[#0A192F] px-8 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_20px_#A02070] transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] inline-flex items-center justify-center gap-3 border border-transparent hover:border-[#A02070]/50">
              Ver Página de Aplicação <ArrowRight size={20} className="text-[#A02070]" />
            </button>
          </div>

          {/* Coluna da Direita */}
          <div className="md:w-7/12 flex flex-col gap-5">
            {[
              "Método validado com cronogramas estratégicos para o ENEM e grandes vestibulares",
              "Plataforma completa de Flashcards com alta retenção e revisão espaçada",
              "Plantões tira-dúvidas e mentorias em grupo com aprovados em Medicina",
              "Simulados inéditos focados em Redação e Ciências da Natureza",
              "Estratégias avançadas de resolução e prova pro 2º dia do ENEM",
              "Ferramentas de análise de desempenho nos simulados"
            ].map((text, idx) => (
              <div key={idx} className="flex items-start gap-5 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg backdrop-blur-sm group">
                <div className="mt-1 bg-[#A02070]/20 p-1.5 rounded-full group-hover:bg-[#A02070]/30 transition-colors">
                  <Check size={18} strokeWidth={3} className="text-[#A02070]" />
                </div>
                <p className="text-blue-50 font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};


