import React from 'react';
import { Target, Instagram, Send } from 'lucide-react';

export const Footer = ({ telegram }) => (
  <footer className="bg-[#0A192F] text-white py-24 mt-20 border-t-8 border-blue-600 text-center">
    <div className="flex justify-center gap-2 items-center mb-8 opacity-40 grayscale">
      <Target size={20} /> <span className="font-black tracking-[0.4em] uppercase text-xs">Euvouserdoutor</span>
    </div>
    <p className="font-black text-xl mb-2 tracking-tighter uppercase italic text-center">Jefferson Queiroz | Medicina UFMG</p>
    <div className="flex justify-center gap-10 mt-12">
       <a href="https://instagram.com/euvouserdoutor" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-all scale-110"><Instagram size={24}/></a>
       <a href={telegram} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-all scale-110"><Send size={24}/></a>
    </div>
    <p className="text-[10px] text-gray-500 mt-12 uppercase tracking-widest font-bold text-center">© 2026 MedStation - Democratizando o Acesso</p>
  </footer>
);
