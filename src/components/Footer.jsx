import React from 'react';
import { Facebook, Instagram, Mail, Send, Youtube } from 'lucide-react';
import { institutional } from '../institutional';
import { COOKIE_CONSENT_OPEN_EVENT } from './CookieConsent';

const openCookiePreferences = () => {
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
};

export const Footer = ({ setView, telegram }) => (
  <footer className="bg-[#0A192F] text-white pt-20 pb-10 border-t border-white/10">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand & Description */}
        <div className="md:col-span-2">
          <h2 onClick={() => setView && setView('home')} className="cursor-pointer flex items-center mb-6" aria-label="Eu vou ser Doutor">
            <img src="/logo-euvouserdoutor.png" alt="Eu vou ser Doutor" className="h-16 w-auto object-contain" />
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
            {institutional.description}
          </p>
          <div className="space-y-3 text-sm text-gray-300">
            <p className="flex items-start gap-3"><Mail size={16} className="text-[#5CE1E6] mt-0.5 shrink-0" /> Contato: <a href={`mailto:${institutional.legalEmail}`} className="hover:text-white">{institutional.legalEmail}</a></p>
            <p className="flex items-start gap-3"><Mail size={16} className="text-[#5CE1E6] mt-0.5 shrink-0" /> E-mail alternativo: <a href={`mailto:${institutional.legalAlternateEmail}`} className="hover:text-white">{institutional.legalAlternateEmail}</a></p>
            <p>Site oficial: <a href={institutional.site} target="_blank" rel="noreferrer" className="font-bold hover:text-white">{institutional.siteLabel}</a></p>
            <p>Marca registrada no INPI - Processo nº {institutional.trademarkProcess}</p>
          </div>
        </div>

        {/* Links Rápidos */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">Links Rápidos</h3>
          <ul className="space-y-4">
            <li><button onClick={() => setView && setView('home')} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Início</button></li>
            <li><button onClick={() => setView && setView('about')} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Sobre</button></li>
            <li><button onClick={() => setView && setView('contact')} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contato</button></li>
            <li><button onClick={() => setView && setView('materials')} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Biblioteca Gratuita</button></li>
            <li><button onClick={() => setView && setView('mentorship')} className="text-[#5CE1E6] font-bold hover:text-white transition-colors text-sm">Mentoria</button></li>
            <li><button onClick={() => setView && setView('news')} className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Notícias</button></li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">Nossas Redes</h3>
          <ul className="space-y-4">
            <li>
              <a href={institutional.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group">
                <div className="p-1.5 bg-white/5 rounded-md group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors"><Facebook size={16} /></div>
                Facebook
              </a>
            </li>
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
      <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
        <nav className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 text-xs text-gray-400">
          <button onClick={() => setView && setView('terms')} className="hover:text-white transition-colors">Termos de Uso</button>
          <span className="text-gray-700">|</span>
          <button onClick={() => setView && setView('privacy')} className="hover:text-white transition-colors">Política de Privacidade</button>
          <span className="text-gray-700">|</span>
          <button onClick={() => setView && setView('medicalDisclaimer')} className="hover:text-white transition-colors">Aviso de Responsabilidade Médica</button>
          <span className="text-gray-700">|</span>
          <button onClick={() => setView && setView('intellectualProperty')} className="hover:text-white transition-colors">Propriedade Intelectual</button>
          <span className="text-gray-700">|</span>
          <button onClick={() => setView && setView('cookies')} className="hover:text-white transition-colors">Política de Cookies</button>
          <span className="text-gray-700">|</span>
          <button onClick={() => setView && setView('contact')} className="hover:text-white transition-colors">Contato</button>
          <span className="text-gray-700">|</span>
          <button onClick={openCookiePreferences} className="hover:text-white transition-colors">Preferências de Cookies</button>
        </nav>
        <p className="text-xs text-gray-500 font-medium">
          &copy; Eu Vou Ser Doutor 2026. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);
