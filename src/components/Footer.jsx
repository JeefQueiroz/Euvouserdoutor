import React from 'react';
import { Facebook, Instagram, Mail, Send, Youtube } from 'lucide-react';
import { institutional } from '../institutional';
import { COOKIE_CONSENT_OPEN_EVENT } from './CookieConsent';

const openCookiePreferences = () => {
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
};

export const Footer = ({ setView, telegram }) => (
  <footer className="bg-[#080A0F] text-[#F8FAFC] pt-20 pb-10 border-t border-white/[0.08]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
        
        <div className="lg:col-span-5">
          <button
            type="button"
            onClick={() => setView && setView('home')}
            className="flex items-center mb-6 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080A0F]"
            aria-label="Ir para a página inicial do Eu vou ser Doutor"
          >
            <img src="/logo-euvouserdoutor.png" alt="Eu vou ser Doutor" loading="lazy" className="h-16 md:h-20 w-auto object-contain" />
          </button>
          <p className="text-[#98A2B3] text-sm leading-relaxed max-w-lg mb-5">
            {institutional.description}
          </p>
          <p className="text-[#98A2B3]/80 text-xs leading-relaxed max-w-lg mb-8 bg-[#11141A] p-4 rounded-2xl border border-white/[0.06]">
            {institutional.medicalNotice}
          </p>
          <div className="space-y-3 text-sm text-[#98A2B3]">
            <p className="flex items-start gap-3"><Mail size={16} className="text-[#4F8CFF] mt-0.5 shrink-0" aria-hidden="true" /> Contato: <a href={`mailto:${institutional.legalEmail}`} className="hover:text-white transition-colors">{institutional.legalEmail}</a></p>
            <p>Site oficial: <a href={institutional.site} target="_blank" rel="noreferrer" className="font-bold hover:text-white transition-colors">{institutional.siteLabel}</a></p>
            <p>Fundado por <span className="text-white font-bold">Jeff Queiroz</span> (Medicina UFMG)</p>
            <p className="text-xs text-[#98A2B3]/60">Marca registrada no INPI - Processo nº {institutional.trademarkProcess}</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6 text-[#4F8CFF]">Links Rápidos</h3>
          <ul className="space-y-4">
            {[
              ['home', 'Início'],
              ['about', 'Sobre'],
              ['author', 'Autor (Jeff Queiroz)'],
              ['contact', 'Contato'],
              ['materials', 'Biblioteca Gratuita'],
              ['mentorship', 'Mentoria'],
              ['news', 'Notícias'],
            ].map(([view, label]) => (
              <li key={view}>
                <button type="button" onClick={() => setView && setView(view)} className="text-[#98A2B3] hover:text-white transition-colors text-sm font-medium">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-white font-black uppercase tracking-widest text-xs mb-6 text-[#4F8CFF]">Canais oficiais</h3>
          <ul className="space-y-4">
            <li>
              <a href={institutional.facebook} target="_blank" rel="noreferrer" className="text-[#98A2B3] hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group">
                <span className="p-2 bg-[#11141A] rounded-xl border border-white/[0.06] group-hover:border-[#4F8CFF]/40 text-[#4F8CFF] transition-colors"><Facebook size={16} aria-hidden="true" /></span>
                Facebook Oficial
              </a>
            </li>
            <li>
              <a href={institutional.youtube} target="_blank" rel="noreferrer" className="text-[#98A2B3] hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group">
                <span className="p-2 bg-[#11141A] rounded-xl border border-white/[0.06] group-hover:border-[#4F8CFF]/40 text-[#4F8CFF] transition-colors"><Youtube size={16} aria-hidden="true" /></span>
                YouTube Oficial
              </a>
            </li>
            <li>
              <a href={institutional.instagram} target="_blank" rel="noreferrer" className="text-[#98A2B3] hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group">
                <span className="p-2 bg-[#11141A] rounded-xl border border-white/[0.06] group-hover:border-[#4F8CFF]/40 text-[#4F8CFF] transition-colors"><Instagram size={16} aria-hidden="true" /></span>
                Instagram @euvouserdoutor
              </a>
            </li>
            <li>
              <a href={telegram} target="_blank" rel="noreferrer" className="text-[#98A2B3] hover:text-white transition-colors text-sm flex items-center gap-3 font-medium group">
                <span className="p-2 bg-[#11141A] rounded-xl border border-white/[0.06] group-hover:border-[#4F8CFF]/40 text-[#4F8CFF] transition-colors"><Send size={16} aria-hidden="true" /></span>
                Comunidade Telegram
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="pt-8 border-t border-white/[0.08] flex flex-col gap-4">
        <nav className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-xs text-[#98A2B3]">
          <button type="button" onClick={() => setView && setView('terms')} className="hover:text-white transition-colors">Termos de Uso</button>
          <span>|</span>
          <button type="button" onClick={() => setView && setView('privacy')} className="hover:text-white transition-colors">Política de Privacidade</button>
          <span>|</span>
          <button type="button" onClick={() => setView && setView('medicalDisclaimer')} className="hover:text-white transition-colors">Aviso de Responsabilidade Médica</button>
          <span>|</span>
          <button type="button" onClick={() => setView && setView('intellectualProperty')} className="hover:text-white transition-colors">Propriedade Intelectual</button>
          <span>|</span>
          <button type="button" onClick={() => setView && setView('cookies')} className="hover:text-white transition-colors">Política de Cookies</button>
          <span>|</span>
          <button type="button" onClick={() => setView && setView('contact')} className="hover:text-white transition-colors">Contato</button>
          <span>|</span>
          <button type="button" onClick={openCookiePreferences} className="hover:text-white transition-colors">Preferências de Cookies</button>
        </nav>
        <p className="text-xs text-[#98A2B3]/60 font-medium">
          &copy; Eu Vou Ser Doutor 2026. Todos os direitos reservados. Criado por Jefferson Queiroz.
        </p>
      </div>
    </div>
  </footer>
);
