import React from 'react';
import { Facebook, Mail, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { institutional } from '../institutional';

const whatsappUrl = 'https://wa.me/5531991569089';

const contacts = [
  { icon: Mail, label: 'E-mail oficial', value: institutional.legalEmail, href: `mailto:${institutional.legalEmail}` },
  { icon: Mail, label: 'E-mail alternativo', value: institutional.legalAlternateEmail, href: `mailto:${institutional.legalAlternateEmail}` },
  { icon: Phone, label: 'Telefone principal', value: institutional.phone, href: 'tel:+5531991569089' },
  { icon: Phone, label: 'Telefone alternativo', value: institutional.alternatePhone, href: 'tel:+5531982972421' },
  { icon: MessageCircle, label: 'WhatsApp institucional', value: institutional.phone, href: whatsappUrl },
  { icon: ShieldCheck, label: 'Site oficial', value: institutional.siteLabel, href: institutional.site },
  { icon: Facebook, label: 'Facebook oficial', value: 'facebook.com/Euvouserdoutor', href: institutional.facebook },
];

export const Contact = () => (
  <section className="animate-in">
    <div className="bg-[#0A192F] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#5CE1E6] text-xs font-black uppercase tracking-[0.35em] mb-5">Contato</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">Contato</h1>
        <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl">
          Fale com o Eu Vou Ser Doutor pelos canais oficiais.
        </p>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 md:p-10">
        <p className="text-gray-600 leading-relaxed text-lg">
          Para dúvidas institucionais, parcerias, solicitações relacionadas ao site, conteúdos, direitos autorais ou
          proteção de dados, entre em contato pelos canais abaixo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {contacts.map((item) => (
          <div key={item.label} className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
            <item.icon size={22} className="text-[#2E70CE] mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{item.label}</p>
            <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-[#0A192F] font-bold hover:text-[#A02070] transition-colors break-words">
              {item.value}
            </a>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-[28px] p-6">
        <p className="text-[#0A192F] leading-relaxed">
          Este canal é institucional e comercial. Ele não oferece orientação clínica individualizada. Em caso de sintomas,
          urgência ou emergência, procure um serviço de saúde habilitado.
        </p>
      </div>
    </div>
  </section>
);
