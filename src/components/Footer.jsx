import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Send, Youtube, ShieldAlert } from 'lucide-react';
import { institutional } from '../institutional';
import { COOKIE_CONSENT_OPEN_EVENT } from './CookieConsent';

const openCookiePreferences = () => {
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
};

export const Footer = ({ setView, telegram }) => (
  <footer className="bg-[#080A0F] text-[#F8FAFC] pt-16 pb-8 border-t border-white/[0.05]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
        
        {/* Brand & Authority Section */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <button
              type="button"
              onClick={() => setView && setView('home')}
              className="flex items-center focus:outline-none group"
              aria-label="Início"
            >
              <img src="/logo-euvouserdoutor.png" alt="Logo" loading="lazy" className="h-10 w-auto object-contain transition-opacity group-hover:opacity-80" />
            </button>
            <p className="text-[#98A2B3] text-sm leading-relaxed max-w-md font-medium">
              {institutional.description}
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] premium-border max-w-sm">
            <img src="/jeff-queiroz-perfil.jpg" alt="Jeff Queiroz" className="w-12 h-12 rounded-full object-cover border border-[#4F8CFF]/30" />
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#4F8CFF] mb-0.5">Fundador & Editor</p>
              <p className="text-white text-sm font-black tracking-tight">Jeff Queiroz</p>
              <p className="text-[#98A2B3] text-[10px] font-bold">Medicina UFMG</p>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Editorial Column */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Conteúdo</h3>
            <ul className="space-y-3">
              {[
                ['home', 'Início'],
                ['news', 'Notícias'],
              ].map(([view, label]) => (
                <li key={view}>
                  <button type="button" onClick={() => setView && setView(view)} className="text-[#98A2B3] hover:text-[#4F8CFF] transition-all text-xs font-bold tracking-tight">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Estudo</h3>
            <ul className="space-y-3">
              {[
                ['materials', 'Materiais'],
                ['mentorship', 'Mentoria'],
              ].map(([view, label]) => (
                <li key={view}>
                  <button type="button" onClick={() => setView && setView(view)} className="text-[#98A2B3] hover:text-[#4F8CFF] transition-all text-xs font-bold tracking-tight">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional & Social Column */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Institucional</h3>
            <ul className="space-y-3">
              {[
                ['about', 'Sobre'],
                ['author', 'Autor'],
                ['contact', 'Contato'],
              ].map(([view, label]) => (
                <li key={view}>
                  <button type="button" onClick={() => setView && setView(view)} className="text-[#98A2B3] hover:text-[#4F8CFF] transition-all text-xs font-bold tracking-tight">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social & Contact Bar */}
      <div className="py-8 border-t border-white/[0.03] flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: Instagram, href: institutional.instagram, label: 'Instagram' },
            { icon: Youtube, href: institutional.youtube, label: 'YouTube' },
            { icon: Linkedin, href: institutional.linkedin, label: 'LinkedIn' },
            { icon: Facebook, href: institutional.facebook, label: 'Facebook' },
            { icon: Send, href: telegram, label: 'Telegram' },
          ].map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              target="_blank" 
              rel="noreferrer" 
              aria-label={social.label}
              className="w-10 h-10 flex items-center justify-center bg-white/[0.03] border border-white/[0.05] rounded-xl text-[#98A2B3] hover:text-[#4F8CFF] hover:border-[#4F8CFF]/30 hover:bg-white/[0.06] transition-all"
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        <a href={`mailto:${institutional.legalEmail}`} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[#98A2B3] hover:text-white hover:border-white/20 transition-all text-xs font-black tracking-tight">
          <Mail size={16} className="text-[#4F8CFF]" /> {institutional.legalEmail}
        </a>
      </div>

      {/* Medical Disclaimer - Professional Treatment */}
      <div className="mb-12 p-6 rounded-[24px] bg-[#4F8CFF]/5 border border-[#4F8CFF]/10 flex flex-col md:flex-row items-start gap-4">
        <ShieldAlert size={24} className="text-[#4F8CFF] shrink-0 opacity-80" />
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#4F8CFF]">Aviso de Responsabilidade Médica</p>
          <p className="text-[#98A2B3] text-xs leading-relaxed font-medium italic">
            {institutional.medicalNotice} Marca registrada no INPI - Processo nº {institutional.trademarkProcess}.
          </p>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] font-black uppercase tracking-widest text-[#98A2B3]/50">
          <button type="button" onClick={() => setView && setView('terms')} className="hover:text-[#F8FAFC] transition-colors">Termos</button>
          <button type="button" onClick={() => setView && setView('privacy')} className="hover:text-[#F8FAFC] transition-colors">Privacidade</button>
          <button type="button" onClick={() => setView && setView('medicalDisclaimer')} className="hover:text-[#F8FAFC] transition-colors">Disclaimer</button>
          <button type="button" onClick={() => setView && setView('intellectualProperty')} className="hover:text-[#F8FAFC] transition-colors">Direitos</button>
          <button type="button" onClick={openCookiePreferences} className="hover:text-[#F8FAFC] transition-colors">Cookies</button>
        </nav>
        <p className="text-[10px] text-[#98A2B3]/30 font-bold uppercase tracking-tighter">
          &copy; 2026 Eu Vou Ser Doutor. Todos os direitos reservados. Criado por Jefferson Queiroz.
        </p>
      </div>
    </div>
  </footer>
);
