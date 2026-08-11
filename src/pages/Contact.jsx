import React from 'react';
import { BookOpen, Facebook, FileText, Mail, MessageCircle, Phone, ShieldCheck, Users } from 'lucide-react';
import { institutional } from '../institutional';

const contacts = [
  { icon: Mail, label: 'E-mail oficial', value: institutional.legalEmail, href: `mailto:${institutional.legalEmail}` },
  { icon: Mail, label: 'E-mail alternativo', value: institutional.legalAlternateEmail, href: `mailto:${institutional.legalAlternateEmail}` },
  { icon: Phone, label: 'Telefone principal', value: institutional.phone, href: 'tel:+5531991569089' },
  { icon: Phone, label: 'Telefone alternativo', value: institutional.alternatePhone, href: 'tel:+5531982972421' },
  { icon: MessageCircle, label: 'WhatsApp institucional', value: institutional.phone, href: institutional.whatsapp },
  { icon: ShieldCheck, label: 'Site oficial', value: institutional.siteLabel, href: institutional.site },
  { icon: Facebook, label: 'Facebook oficial', value: 'facebook.com/Euvouserdoutor', href: institutional.facebook },
];

const intents = [
  { icon: Mail, title: 'Dúvidas gerais', text: 'Perguntas institucionais sobre o projeto e seus canais oficiais.' },
  { icon: Users, title: 'Mentoria', text: 'Informações comerciais sobre formato, disponibilidade e próximos ciclos.' },
  { icon: BookOpen, title: 'Materiais', text: 'Solicitações e dúvidas sobre guias, checklists e conteúdos gratuitos.' },
  { icon: MessageCircle, title: 'Parcerias', text: 'Propostas institucionais, educacionais, editoriais ou comerciais.' },
  { icon: ShieldCheck, title: 'Proteção de dados', text: 'Solicitações sobre privacidade, cookies e tratamento de dados.' },
  { icon: FileText, title: 'Direitos autorais', text: 'Pedidos sobre uso de marca, remoção de conteúdo e propriedade intelectual.' },
];

export const Contact = () => (
  <section className="animate-in bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
    <div className="bg-[#0A192F] border-b border-white/[0.08] py-20 md:py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.18),transparent_40%)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <span className="inline-flex items-center gap-2 bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          Canal Direto
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6 text-[#F8FAFC]">Contato</h1>
        <p className="text-lg md:text-xl text-[#98A2B3] leading-relaxed max-w-3xl">
          Escolha o melhor canal para falar com o EuVouSerDoutor.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 space-y-10">
      <div className="bg-[#11141A] rounded-[32px] border border-white/[0.08] shadow-2xl p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] tracking-tight mb-4">Canais oficiais</h2>
        <p className="text-[#98A2B3] leading-relaxed text-lg max-w-4xl">
          Para dúvidas institucionais, parcerias, solicitações relacionadas ao site, conteúdos, direitos autorais,
          proteção de dados ou assuntos comerciais, entre em contato pelos canais abaixo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {intents.map((item) => (
          <article key={item.title} className="bg-[#11141A] rounded-3xl border border-white/[0.08] shadow-2xl p-6 hover:border-[#4F8CFF]/40 transition-all">
            <item.icon size={24} className="text-[#4F8CFF] mb-4" aria-hidden="true" />
            <h2 className="text-lg font-black text-[#F8FAFC] mb-2">{item.title}</h2>
            <p className="text-[#98A2B3] text-sm leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {contacts.map((item) => (
          <div key={item.label} className="bg-[#11141A] rounded-3xl border border-white/[0.08] shadow-2xl p-6 hover:border-[#4F8CFF]/40 transition-all">
            <item.icon size={22} className="text-[#4F8CFF] mb-4" aria-hidden="true" />
            <p className="text-[10px] font-black uppercase tracking-widest text-[#98A2B3] mb-2">{item.label}</p>
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="text-[#F8FAFC] font-bold hover:text-[#4F8CFF] transition-colors break-words"
            >
              {item.value}
            </a>
          </div>
        ))}
      </div>

      <div className="bg-[#11141A] border border-[#4F8CFF]/30 rounded-3xl p-6 md:p-8">
        <p className="text-[#98A2B3] leading-relaxed font-medium">
          Este canal é institucional e comercial. Ele não oferece orientação clínica individualizada. Em caso de sintomas,
          urgência ou emergência, procure um serviço de saúde habilitado.
        </p>
      </div>
    </div>
  </section>
);
