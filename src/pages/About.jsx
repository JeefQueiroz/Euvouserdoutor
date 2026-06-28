import React from 'react';
import { Award, Globe2, ShieldCheck, User } from 'lucide-react';
import { institutional } from '../institutional';

export const About = () => (
  <section className="animate-in">
    <div className="bg-[#0A192F] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#5CE1E6] text-xs font-black uppercase tracking-[0.35em] mb-5">Sobre</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
          Eu vou ser <span className="text-[#96A1DF]">Doutor</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl">
          Um projeto digital criado para apoiar estudantes e vestibulandos de Medicina com conteúdo,
          organização acadêmica, rotina de estudos e curiosidades médicas.
        </p>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
      <article className="lg:col-span-2 bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 md:p-10">
        <h2 className="text-3xl font-black text-[#0A192F] tracking-tight mb-6">O projeto</h2>
        <div className="space-y-5 text-gray-600 leading-relaxed">
          <p>
            O {institutional.name} reúne conteúdos educacionais, materiais de apoio, ideias de rotina,
            organização de estudos e temas ligados ao universo da Medicina. A proposta é ajudar quem está
            construindo uma caminhada acadêmica com mais clareza, constância e repertório.
          </p>
          <p>
            O site funciona como ponto oficial da presença digital do projeto, conectado aos canais sociais
            e aos materiais publicados para estudantes, vestibulandos e pessoas interessadas em curiosidades
            médicas.
          </p>
          <p>
            A marca {institutional.name} é registrada no INPI sob o processo nº {institutional.trademarkProcess}.
            O responsável e titular informado para fins institucionais é {institutional.owner}.
          </p>
        </div>
      </article>

      <aside className="space-y-4">
        {[
          { icon: User, label: 'Responsável', value: institutional.owner },
          { icon: Award, label: 'Marca registrada', value: `INPI - processo nº ${institutional.trademarkProcess}` },
          { icon: Globe2, label: 'Site oficial', value: institutional.siteLabel },
          { icon: ShieldCheck, label: 'Finalidade', value: 'Educação e organização acadêmica' },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-2xl border border-gray-100 shadow-md p-5">
            <item.icon size={22} className="text-[#2E70CE] mb-3" />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
            <p className="text-sm font-bold text-[#0A192F] leading-snug">{item.value}</p>
          </div>
        ))}
      </aside>
    </div>
  </section>
);
