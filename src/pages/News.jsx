import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const News = ({ setView, profileImg, telegram }) => {
  const personalImg = "https://i.imgur.com/9QVE0X7.jpeg";
  const flashcardImg = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800";
  const writingImg = "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="animate-in pb-20 text-left bg-[#F4F7FB] min-h-screen">
      <div className="h-24 bg-gradient-to-r from-[#0A192F] to-[#2E70CE]"></div>
      <div className="max-w-7xl mx-auto px-6 py-16 text-left">
        <h2 className="text-3xl md:text-5xl font-black italic uppercase text-[#0A192F] mb-12 border-l-8 border-blue-600 pl-6 flex items-center gap-3">
          Feed de <span className="text-blue-600">Notícias</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            {[
              { title: "O fenômeno @euvouserdoutor na UFMG", cat: "Inspiração e Rotina", img: personalImg, target: 'article' },
              { title: "A ciência por trás dos Flashcards", cat: "Técnica de Estudo", img: flashcardImg, target: 'flashcards' },
              { title: "Redação 920+: O Guia Definitivo", cat: "Estratégia Nota 1000", img: writingImg, target: 'mentorship' }
            ].map((post, i) => (
              <div key={i} onClick={() => setView(post.target)} className="bg-white rounded-[40px] p-6 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-8 items-center group cursor-pointer hover:scale-[1.01] transition-all">
                <div className="w-full md:w-2/5 aspect-[4/3] overflow-hidden rounded-[30px] relative">
                   <img src={post.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="post" />
                </div>
                <div className="w-full md:w-3/5 text-left">
                  <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">{post.cat}</span>
                  <h3 className="text-2xl font-black text-[#0A192F] uppercase italic mt-2 mb-4 group-hover:text-blue-600">{post.title}</h3>
                  <button className="flex items-center gap-2 text-[#0A192F] font-black text-[10px] uppercase tracking-widest">Ler Agora <ArrowRight size={14} className="text-blue-600" /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4"><Sidebar setView={setView} /></div>
        </div>
      </div>
    </div>
  );
};
