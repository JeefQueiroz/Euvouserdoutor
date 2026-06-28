import React from 'react';
import { Facebook, Instagram, Mail, Send, Youtube } from 'lucide-react';
import { institutional } from '../institutional';
import { COOKIE_CONSENT_OPEN_EVENT } from './CookieConsent';

const openCookiePreferences = () => {
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
};

export const Footer = ({ setView, telegram }) => (
  <footer className="bg-[#071426] text-white pt-20 pb-10 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
        
        <div className="lg:col-span-5">
          <button
            type="button"
            onClick={() => setView && setView('home')}
            className="flex items-center mb-6 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#071426]"
            aria-label="Ir para a página inicial do Eu vou ser Doutor"
          >
            <img src="/logo-euvouserdoutor.png" alt="Eu vou ser Doutor" className="h-16 md:h-20 w-auto object-contain" />
          </button>
          <p className="text-gray-300 text-sm leading-relaxed max-w-lg mb-5">
            {institutional.description}
          </p>
          <p className="text-blue-100/80 text-sm leading-relaxed max-w-lg mb-8">
            {institutional.medicalNotice}
          </p>
          <div className="space-y-3 text-sm text-gray-300">
            <p className="flex items-start gap-3"><Mail size={16} className="text-[#5CE1E6] mt-0.5 shrink-0" aria-hidden="true" /> Contato: <a href={`mailto:${institutional.legalEmail}`} className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">{institutional.legalEmail}</a></p>
            <p className="flex items-start gap-3"><Mail size={16} className="text-[#5CE1E6] mt-0.5 shrink-0" aria-hidden="true" /> E-mail alternativo: <a href={`mailto:${institutional.legalAlternateEmail}`} className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">{institutional.legalAlternateEmail}</a></p>
            <p>Site oficial: <a href={institutional.site} target="_blank" rel="noreferrer" className="font-bold hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">{institutional.siteLabel}</a></p>
            <p>Marca registrada no INPI - Processo nº {institutional.trademarkProcess}</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">Links Rápidos</h3>
          <ul className="space-y-4">
            {[
              ['home', 'Início'],
              ['about', 'Sobre'],
              ['contact', 'Contato'],
              ['materials', 'Biblioteca Gratuita'],
              ['mentorship', 'Mentoria'],
              ['news', 'Notícias'],
            ].map(([view, label]) => (
              <li key={view}>
                <button type="button" onClick={() => setView && setView(view)} className="text-gray-300 hover:text-white transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6">Canais oficiais</h3>
          <ul className="space-y-4">
            <li>
              <a href={institutional.facebook} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">
                <span className="p-1.5 bg-white/5 rounded-md group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors"><Facebook size={16} aria-hidden="true" /></span>
                Facebook
              </a>
            </li>
            <li>
              <a href={institutional.youtube} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">
                <span className="p-1.5 bg-white/5 rounded-md group-hover:bg-red-500/20 group-hover:text-red-400 transition-colors"><Youtube size={16} aria-hidden="true" /></span>
                YouTube
              </a>
            </li>
            <li>
              <a href={institutional.instagram} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">
                <span className="p-1.5 bg-white/5 rounded-md group-hover:bg-pink-500/20 group-hover:text-pink-400 transition-colors"><Instagram size={16} aria-hidden="true" /></span>
                Instagram
              </a>
            </li>
            <li>
              <a href={telegram} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">
                <span className="p-1.5 bg-white/5 rounded-md group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors"><Send size={16} aria-hidden="true" /></span>
                Comunidade
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
        <nav className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-xs text-gray-400">
          <button type="button" onClick={() => setView && setView('terms')} className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">Termos de Uso</button>
          <span className="text-gray-700">|</span>
          <button type="button" onClick={() => setView && setView('privacy')} className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">Política de Privacidade</button>
          <span className="text-gray-700">|</span>
          <button type="button" onClick={() => setView && setView('medicalDisclaimer')} className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">Aviso de Responsabilidade Médica</button>
          <span className="text-gray-700">|</span>
          <button type="button" onClick={() => setView && setView('intellectualProperty')} className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">Propriedade Intelectual</button>
          <span className="text-gray-700">|</span>
          <button type="button" onClick={() => setView && setView('cookies')} className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">Política de Cookies</button>
          <span className="text-gray-700">|</span>
          <button type="button" onClick={() => setView && setView('contact')} className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">Contato</button>
          <span className="text-gray-700">|</span>
          <button type="button" onClick={openCookiePreferences} className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CE1E6] rounded">Preferências de Cookies</button>
        </nav>
        <p className="text-xs text-gray-500 font-medium">
          &copy; Eu Vou Ser Doutor 2026. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);
