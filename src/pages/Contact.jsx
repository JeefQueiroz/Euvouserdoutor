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
  <section className="animate-in bg-[#F4F7FB]">
    <div className="bg-[#0A192F] text-white py-20 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#5CE1E6] text-xs font-black uppercase tracking-[0.35em] mb-5">Contato</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">Contato</h1>
        <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl">
          Escolha o melhor canal para falar com o EuVouSerDoutor.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 space-y-10">
      <div className="bg-white rounded-3xl border border-[#DDE6F2] shadow-[0_18px_48px_rgba(10,25,47,0.07)] p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-black text-[#0A192F] tracking-tight mb-4">Canais oficiais</h2>
        <p className="text-gray-600 leading-relaxed text-lg max-w-4xl">
          Para dúvidas institucionais, parcerias, solicitações relacionadas ao site, conteúdos, direitos autorais,
          proteção de dados ou assuntos comerciais, entre em contato pelos canais abaixo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {intents.map((item) => (
          <article key={item.title} className="bg-white rounded-3xl border border-[#DDE6F2] shadow-sm p-6">
            <item.icon size={24} className="text-[#2E70CE] mb-4" aria-hidden="true" />
            <h2 className="text-lg font-black text-[#0A192F] mb-2">{item.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {contacts.map((item) => (
          <div key={item.label} className="bg-white rounded-3xl border border-[#DDE6F2] shadow-sm p-6">
            <item.icon size={22} className="text-[#A02070] mb-4" aria-hidden="true" />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{item.label}</p>
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="text-[#0A192F] font-bold hover:text-[#A02070] transition-colors break-words focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E70CE] rounded"
            >
              {item.value}
            </a>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 md:p-8">
        <p className="text-[#0A192F] leading-relaxed font-medium">
          Este canal é institucional e comercial. Ele não oferece orientação clínica individualizada. Em caso de sintomas,
          urgência ou emergência, procure um serviço de saúde habilitado.
        </p>
      </div>
    </div>
  </section>
);
