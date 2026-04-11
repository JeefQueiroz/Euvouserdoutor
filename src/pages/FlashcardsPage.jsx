import React from 'react';
import { Microscope, Zap, Send } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const FlashcardsPage = ({ setView, profileImg, telegram }) => (
  <div className="animate-in pb-20">
    <div className="bg-gradient-to-r from-[#0A192F] to-[#2E70CE] text-white pt-12 pb-24 px-6 relative overflow-hidden text-left">
      <div className="max-w-4xl mx-auto relative z-10 text-left">
        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter italic uppercase">Flashcards Aprovado</h1>
        <p className="text-lg md:text-xl text-blue-100 font-light leading-relaxed max-w-3xl opacity-90">Flashcards usam recuperação ativa da memória — uma estratégia validada pela neurociência para retenção de longo prazo.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 -mt-16 relative z-20">
      <div className="lg:w-2/3 bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-gray-100 text-left">
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-sans space-y-12 text-left">
          <section className="text-left">
            <h2 className="text-3xl font-black text-[#0A192F] uppercase tracking-tight flex items-center gap-3"><Microscope className="text-blue-600" size={28} /> A ciência por trás</h2>
            <p className="mt-6">Hermann Ebbinghaus mapeou a Curva do Esquecimento: sem revisão, esquecemos até 70% em 24h. Os flashcards combatem isso com repetição espaçada e active recall.</p>
          </section>
          <section className="text-left">
            <h2 className="text-3xl font-black text-[#0A192F] uppercase tracking-tight mb-8">Eficácia Comparativa</h2>
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0A192F] text-white">
                <tr>
                  <th className="p-4 text-xs uppercase font-black">Método</th>
                  <th className="p-4 text-xs uppercase font-black">Processo</th>
                  <th className="p-4 text-xs uppercase font-black text-center">Retenção</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="p-4">Releitura de resumos</td>
                  <td className="p-4">Passivo</td>
                  <td className="p-4 text-center text-red-500 font-bold">~20%</td>
                </tr>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="p-4 font-bold">Flashcards + Repetição</td>
                  <td className="p-4 text-blue-600 font-bold">Ativo</td>
                  <td className="p-4 text-center text-blue-600 font-bold">~80%</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="p-4 font-bold">Flashcards + Simulados</td>
                  <td className="p-4 text-green-600 font-bold">Ativo + Contextual</td>
                  <td className="p-4 text-center text-green-600 font-bold text-lg">~90%</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="bg-gradient-to-br from-[#0A192F] to-[#11294D] p-10 rounded-[40px] text-white">
            <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3"><Zap className="text-yellow-400" size={24} /> Flashcards para Medicina</h2>
            <p className="opacity-90 leading-relaxed mb-6">Em Ciências da Natureza, a sequência flashcard → simulado → revisão explica os resultados de 92% em Biologia obtidos pela Mentoria.</p>
            <a href={telegram} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#2E70CE] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all">Obter Decks Premium <Send size={18} /></a>
          </section>
        </div>
      </div>
      <div className="lg:w-1/3"><Sidebar setView={setView} profileImg={profileImg} telegram={telegram} /></div>
    </div>
  </div>
);
