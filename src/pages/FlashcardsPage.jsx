import React from 'react';
import { Microscope, Zap, Send, ArrowLeft } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const FlashcardsPage = ({ setView, profileImg, telegram }) => (
  <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen">
    <div className="bg-gradient-to-r from-[#0A192F] to-[#2E70CE] text-white pt-12 pb-24 px-6 text-left">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setView('news')} className="flex items-center gap-2 text-[10px] font-black text-blue-200 mb-8 uppercase bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"><ArrowLeft size={14}/> Voltar</button>
        <h1 className="text-4xl md:text-7xl font-black mb-6 italic uppercase">Flashcards Aprovado</h1>
        <p className="text-lg text-blue-100 opacity-90 max-w-3xl">Active Recall e Repetição Espaçada: o segredo da memória de longo prazo.</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 -mt-16 relative z-20">
      <div className="lg:w-2/3 bg-white rounded-[40px] p-8 md:p-16 shadow-2xl border border-gray-100 text-left">
        <h2 className="text-3xl font-black text-[#0A192F] uppercase flex items-center gap-3"><Microscope className="text-blue-600" /> A Ciência Aplicada</h2>
        <p className="mt-6 text-gray-600 leading-relaxed text-left">A Curva de Ebbinghaus prova que sem revisão ativa perdemos 70% em 24h. Os nossos decks resolvem este problema.</p>
        <div className="overflow-x-auto rounded-3xl border border-gray-100 mt-10">
            <table className="w-full text-left">
                <thead className="bg-[#0A192F] text-white text-xs uppercase"><tr><th className="p-4">Método</th><th className="p-4 text-center">Retenção</th></tr></thead>
                <tbody className="text-sm">
                    <tr className="border-b"> <td className="p-4">Releitura de Resumos</td><td className="p-4 text-center text-red-500 font-bold">~20%</td></tr>
                    <tr className="bg-blue-50"> <td className="p-4 font-bold">Flashcards Ativos</td><td className="p-4 text-center text-blue-600 font-bold">~80%</td></tr>
                </tbody>
            </table>
        </div>
        <div className="mt-12 bg-[#0A192F] p-10 rounded-[40px] text-white text-left">
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2"><Zap className="text-yellow-400" /> Estudo Estratégico</h3>
            <p className="opacity-80 mb-6">Decks premium focados na recorrência real da UFMG e Natureza ENEM.</p>
            <a href={telegram} target="_blank" rel="noreferrer" className="bg-[#2E70CE] text-white px-8 py-4 rounded-xl font-black uppercase text-xs inline-block shadow-lg hover:bg-blue-600">Obter Decks Premium</a>
        </div>
      </div>
      <div className="lg:w-1/3"><Sidebar setView={setView} /></div>
    </div>
  </div>
);
