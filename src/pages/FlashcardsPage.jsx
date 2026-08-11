import { Microscope, Zap, Send, ArrowLeft, Brain, LineChart, BookOpen, CheckCircle } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const FlashcardsPage = ({ setView, profileImg, telegram }) => (
  <div className="animate-in pb-20 text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen">
    <div className="bg-[#0A192F] border-b border-white/[0.08] pt-12 pb-20 px-6 text-left relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.18),transparent_40%)]" />
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-6">
        <button onClick={() => setView('materials')} className="flex items-center gap-2 text-[10px] font-black text-[#4F8CFF] uppercase bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all mb-2"><ArrowLeft size={14}/> Voltar</button>
        <span className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
          Estudo Ativo & Revisão
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight text-[#F8FAFC]">
          Flashcards Doutor
        </h1>
        <p className="text-lg md:text-xl text-[#98A2B3] opacity-90 max-w-2xl font-normal leading-relaxed">
          A união perfeita entre <strong className="text-white">Active Recall</strong> e <strong className="text-white">Repetição Espaçada</strong> para acelerar sua preparação para Medicina.
        </p>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 -mt-12 relative z-20">
      <div className="lg:col-span-8 space-y-8">
        
        {/* Section 1: The Science */}
        <div className="bg-[#11141A] rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/[0.08] text-left space-y-6">
          <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] uppercase flex items-center gap-3"><Brain className="text-[#4F8CFF]" size={32} /> Estudo ativo e revisão</h2>
          
          <div className="space-y-4 text-[#98A2B3] leading-relaxed text-base">
            <p>
              Estudos sobre memória mostram que conteúdos novos tendem a ser esquecidos quando não são revisitados. Revisões ativas programadas ajudam a transformar leitura em recuperação de informação.
            </p>
            <p>
              Ao invés de reler apostilas grifadas, os flashcards estimulam o cérebro a <em>buscar</em> a resposta antes de virar a carta. Isso favorece revisões mais ativas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#171B23] p-6 rounded-3xl border border-white/[0.06] relative overflow-hidden">
              <h4 className="font-black text-[#F8FAFC] mb-3 text-lg">Estudo Tradicional</h4>
              <p className="text-sm text-[#98A2B3] leading-relaxed">Gasto elevado de tempo criando resumos estáticos, com risco de sensação de domínio sem teste real de lembrança.</p>
            </div>
            <div className="bg-[#171B23] p-6 rounded-3xl border border-[#4F8CFF]/30 relative overflow-hidden">
              <h4 className="font-black text-[#F8FAFC] mb-3 text-lg">Flashcards Ativos</h4>
              <p className="text-sm text-[#98A2B3] leading-relaxed">A revisão espaçada ajuda a distribuir novos contatos com o conteúdo e favorece constância ao longo da preparação.</p>
            </div>
          </div>
        </div>

      </div>

      <div className="lg:col-span-4">
        <Sidebar setView={setView} />
      </div>
    </div>
  </div>
);
