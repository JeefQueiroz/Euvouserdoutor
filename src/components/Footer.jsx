import React from 'react';
import { Facebook, Instagram, Mail, Send, Youtube } from 'lucide-react';
import { institutional } from '../institutional';
import { COOKIE_CONSENT_OPEN_EVENT } from './CookieConsent';

const openCookiePreferences = () => {
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
};

export const Footer = ({ setView, telegram }) => (
  <footer className="bg-[#080A0F] text-[#F8FAFC] pt-12 pb-8 border-t border-white/[0.05]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Brand & Description */}
        <div className="lg:col-span-4 space-y-6">
          <button
            type="button"
            onClick={() => setView && setView('home')}
            className="flex items-center focus:outline-none"
            aria-label="Início"
          >
            <img src="/logo-euvouserdoutor.png" alt="Logo" loading="lazy" className="h-10 w-auto object-contain opacity-90" />
          </button>
          <p className="text-[#98A2B3] text-xs leading-relaxed max-w-sm font-medium">
            {institutional.description}
          </p>
          <div className="bg-white/[0.02] border border-white/[0.05] p-3 rounded-xl">
            <p className="text-[#98A2B3]/60 text-[10px] leading-tight italic">
              {institutional.medicalNotice}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 lg:ml-auto">
          <h3 className="text-[#4F8CFF] font-black uppercase tracking-[0.2em] text-[10px] mb-5">Navegação</h3>
          <ul className="space-y-2.5">
            {[
              ['home', 'Início'],
              ['about', 'Sobre'],
              ['author', 'Autor'],
              ['news', 'Notícias'],
              ['materials', 'Biblioteca'],
            ].map(([view, label]) => (
              <li key={view}>
                <button type="button" onClick={() => setView && setView(view)} className="text-[#98A2B3] hover:text-white transition-colors text-[11px] font-bold">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="lg:col-span-3">
          <h3 className="text-[#4F8CFF] font-black uppercase tracking-[0.2em] text-[10px] mb-5">Contato & Redes</h3>
          <div className="space-y-3">
            <a href={`mailto:${institutional.legalEmail}`} className="flex items-center gap-2 text-[#98A2B3] hover:text-white transition-colors text-[11px] font-bold">
              <Mail size={14} className="text-[#4F8CFF]" /> {institutional.legalEmail}
            </a>
            <div className="flex gap-2 pt-2">
              {[
                { icon: Instagram, href: institutional.instagram, label: 'Instagram' },
                { icon: Youtube, href: institutional.youtube, label: 'YouTube' },
                { icon: Facebook, href: institutional.facebook, label: 'Facebook' },
                { icon: Send, href: telegram, label: 'Telegram' },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label={social.label}
                  className="p-2 bg-white/[0.03] border border-white/[0.05] rounded-lg text-[#98A2B3] hover:text-[#4F8CFF] hover:border-[#4F8CFF]/30 transition-all"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Authority Tag */}
        <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-start">
          <div className="bg-[#4F8CFF]/5 border border-[#4F8CFF]/20 px-3 py-2 rounded-xl text-right">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#4F8CFF] mb-1">Fundador & Editor</p>
            <p className="text-white text-[11px] font-bold">Jeff Queiroz</p>
            <p className="text-[#98A2B3] text-[10px]">Medicina UFMG</p>
          </div>
          <p className="text-[9px] text-[#98A2B3]/40 mt-4 uppercase font-bold tracking-tighter">Marca INPI: {institutional.trademarkProcess}</p>
        </div>

      </div>

      {/* Bottom Legal Bar - Much more compact */}
      <div className="pt-6 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-bold text-[#98A2B3]/60">
          <button type="button" onClick={() => setView && setView('terms')} className="hover:text-white transition-colors">Termos</button>
          <button type="button" onClick={() => setView && setView('privacy')} className="hover:text-white transition-colors">Privacidade</button>
          <button type="button" onClick={() => setView && setView('medicalDisclaimer')} className="hover:text-white transition-colors">Aviso Médico</button>
          <button type="button" onClick={() => setView && setView('intellectualProperty')} className="hover:text-white transition-colors">Direitos</button>
          <button type="button" onClick={openCookiePreferences} className="hover:text-white transition-colors">Cookies</button>
        </nav>
        <p className="text-[10px] text-[#98A2B3]/40 font-medium">
          &copy; 2026 Eu Vou Ser Doutor. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);
