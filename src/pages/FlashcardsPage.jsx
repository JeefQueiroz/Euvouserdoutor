import React from 'react';
import { Microscope, Zap, Send, ArrowLeft, Brain, LineChart, BookOpen, CheckCircle } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const FlashcardsPage = ({ setView, profileImg, telegram }) => (
  <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen">
    <div className="bg-[#0A192F] text-white pt-12 pb-20 px-6 text-left relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2E70CE]/20 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5CE1E6]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 z-0"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-6">
        <button onClick={() => setView('materials')} className="flex items-center gap-2 text-[10px] font-black text-blue-200 uppercase bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all mb-2"><ArrowLeft size={14}/> Voltar</button>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight">
          <span className="text-white">Flashcards </span>
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#96A1DF] to-white">Doutor</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 opacity-90 max-w-2xl font-light">
          A união perfeita entre <strong className="text-white">Active Recall</strong> e <strong className="text-white">Repetição Espaçada</strong>. 
          Use estudo ativo e revisão espaçada como apoio para melhorar retenção e constância ao longo da preparação.
        </p>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 -mt-16 relative z-20">
      <div className="lg:w-2/3 space-y-8">
        
        {/* Section 1: The Science */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-gray-100 text-left">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A192F] uppercase flex items-center gap-3 mb-6"><Brain className="text-[#2E70CE]" size={32} /> Estudo ativo e revisão</h2>
          
          <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed mb-8">
            <p className="mb-4">
              Estudos sobre memória mostram que conteúdos novos tendem a ser esquecidos quando não são revisitados. Revisões ativas programadas ajudam a transformar leitura em recuperação de informação.
            </p>
            <p>
              Ao inves de reler apostilas grifadas (um metodo passivo de baixa retencao), os flashcards estimulam o cerebro a <em>buscar</em> a resposta antes de virar a carta. Isso favorece revisoes mais ativas antes do ENEM ou da FUVEST.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-400 opacity-50"></div>
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"><BookOpen size={24}/></div>
              <h4 className="font-bold text-[#0A192F] mb-3 text-lg">Estudo Tradicional</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Gasto elevado de tempo criando resumos estáticos, com risco de sensação de domínio sem teste real de lembrança.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-[#5CE1E6]/30 hover:shadow-[0_15px_30px_-10px_rgba(92,225,230,0.2)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#5CE1E6]"></div>
              <div className="w-12 h-12 bg-[#2E70CE]/10 text-[#2E70CE] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"><LineChart size={24}/></div>
              <h4 className="font-bold text-[#0A192F] mb-3 text-lg">Flashcards Ativos</h4>
              <p className="text-sm text-gray-500 leading-relaxed">A revisão espaçada ajuda a distribuir novos contatos com o conteúdo e favorece constância ao longo da preparação.</p>
            </div>
          </div>
        </div>

        {/* Section 2: What's inside */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-gray-100 text-left">
          <h2 className="text-2xl font-black text-[#0A192F] uppercase flex items-center gap-3 mb-6"><Microscope className="text-[#5CE1E6]" size={28} /> O que tem nos Nossos Decks?</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Os decks foram organizados com base em temas recorrentes do <strong>ENEM</strong> e dos principais vestibulares paulistas. A ideia e reduzir dispersao e priorizar revisoes com criterio.
          </p>

          <ul className="space-y-4">
            {[
              "Biologia e Química: Imagens anatômicas e vias metabólicas esquematizadas (Image Occlusion).",
              "Física e Matemática: fórmulas, conceitos e padrões de resolução para treino recorrente.",
              "Natureza aplicada: conexões interdisciplinares e exemplos educacionais do ENEM.",
              "Atualizações constantes conforme o Inep ou a Vunesp alteram o padrão de cobrança."
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white hover:bg-[#F4F7FB] transition-all duration-300 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#2E70CE]/20 group">
                <div className="mt-1 bg-[#5CE1E6]/20 p-1 rounded-full group-hover:scale-110 transition-transform">
                  <CheckCircle className="text-[#2E70CE]" size={18} strokeWidth={3} />
                </div>
                <span className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: CTA */}
        <div className="bg-gradient-to-br from-[#0A192F] to-[#1a365d] p-8 md:p-12 rounded-[40px] text-white text-left relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5CE1E6]/10 rounded-full blur-[80px]"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 flex items-center gap-3"><Zap className="text-[#5CE1E6]" size={32} /> Acesso aos Decks</h3>
              <p className="text-blue-100 text-lg mb-8 max-w-lg leading-relaxed">
                Use os flashcards como apoio ao estudo ativo. Acesse a comunidade para acompanhar materiais disponíveis ou fale com o projeto para saber mais sobre a mentoria educacional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href={telegram} target="_blank" rel="noreferrer" className="bg-[#5CE1E6] text-[#0A192F] px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest inline-flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(92,225,230,0.4)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(92,225,230,0.6)] transition-all duration-300">
                  <Send size={18} /> Entrar no Telegram
                </a>
                <button onClick={() => setView('mentorship')} className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest inline-flex items-center justify-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                  Conhecer Mentoria
                </button>
              </div>
            </div>
        </div>

      </div>
      
      {/* Sidebar */}
      <div className="lg:w-1/3"><Sidebar setView={setView} /></div>
    </div>
  </div>
);
