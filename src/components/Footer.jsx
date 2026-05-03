import React from 'react';
import { Instagram, Send, Youtube, Heart, Zap } from 'lucide-react';

export const Footer = ({ setView, telegram }) => (
  <footer className="bg-[#0A192F] text-white pt-20 pb-10 border-t border-white/10">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand & Description */}
        <div className="md:col-span-2">
          <h2 onClick={() => setView && setView('home')} className="text-3xl font-black tracking-tighter cursor-pointer flex items-center mb-6">
            <span className="text-white mr-1.5">Eu vou ser</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#96A1DF] to-white">Doutor</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
            O maior ecossistema de preparação estratégica para vestibulares de Medicina. 
            Transformando o seu sonho em uma aprovação real através de métodos cientificamente validados.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-gray-300 shadow-sm">
            <Heart size={14} className="text-red-500 fill-red-500/20" /> Jefferson Queiroz | Medicina UFMG
          </div>
        </div>

        {/* Links Rápidos */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">Links Rápidos</h3>
          <ul className="space-y-4">
            <li><button onClick={() => setView && setView('home')} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Página Inicial</button></li>
            <li><button onClick={() => setView && setView('materials')} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Biblioteca Gratuita</button></li>
            <li><button onClick={() => setView && setView('mentorship')} className="text-[#5CE1E6] font-bold hover:text-white transition-colors text-sm flex items-center gap-2">Mentoria Aprovado <Zap size={14} className="fill-[#5CE1E6]/20"/></button></li>
            <li><button onClick={() => setView && setView('news')} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Notícias</button></li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">Nossas Redes</h3>
          <ul className="space-y-4">
            <li>
              <a href="https://youtube.com/@Euvouserdoutor" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group">
                <div className="p-1.5 bg-white/5 rounded-md group-hover:bg-red-500/20 group-hover:text-red-400 transition-colors"><Youtube size={16} /></div>
                YouTube
              </a>
            </li>
            <li>
              <a href="https://instagram.com/euvouserdoutor" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group">
                <div className="p-1.5 bg-white/5 rounded-md group-hover:bg-pink-500/20 group-hover:text-pink-400 transition-colors"><Instagram size={16} /></div>
                Instagram
              </a>
            </li>
            <li>
              <a href={telegram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group">
                <div className="p-1.5 bg-white/5 rounded-md group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors"><Send size={16} /></div>
                Comunidade VIP
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500 font-medium">
          &copy; {new Date().getFullYear()} Eu vou ser Doutor. Todos os direitos reservados.
        </p>
        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
          Democratizando o Acesso à Medicina
        </p>
      </div>
    </div>
  </footer>
);
