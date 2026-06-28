import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { institutional } from '../institutional';

const updatedAt = '28 de junho de 2026';

const Section = ({ title, children }) => (
  <section className="space-y-3">
    <h2 className="text-xl md:text-2xl font-black text-[#0A192F]">{title}</h2>
    <div className="space-y-3 text-gray-600 leading-relaxed">{children}</div>
  </section>
);

const ContactLink = () => (
  <a className="font-bold text-[#2E70CE] hover:text-[#A02070]" href={`mailto:${institutional.legalEmail}`}>
    {institutional.legalEmail}
  </a>
);

export const MedicalDisclaimer = () => (
  <section className="animate-in">
    <div className="bg-[#0A192F] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#5CE1E6] text-xs font-black uppercase tracking-[0.35em] mb-5">Responsabilidade médica</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">Aviso de Responsabilidade Médica</h1>
        <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
          Informações importantes sobre o caráter educacional dos conteúdos publicados no Eu Vou Ser Doutor.
        </p>
        <p className="text-sm text-blue-200/80 mt-6">Última atualização: {updatedAt}</p>
      </div>
    </div>

    <article className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 md:p-10 space-y-9">
        <div className="rounded-2xl border border-[#2E70CE]/20 bg-[#2E70CE]/5 p-5 flex gap-4">
          <AlertTriangle className="text-[#2E70CE] shrink-0 mt-1" size={24} />
          <p className="text-[#0A192F] font-bold leading-relaxed">
            O conteúdo do Eu Vou Ser Doutor possui finalidade exclusivamente educacional e informativa. As informações
            publicadas não substituem consulta médica, avaliação profissional, diagnóstico, tratamento, prescrição ou
            acompanhamento individualizado. Em caso de sintomas, dúvidas clínicas ou emergência, procure um médico ou
            serviço de saúde habilitado.
          </p>
        </div>

        <Section title="1. Finalidade educacional">
          <p>
            O conteúdo do Eu Vou Ser Doutor tem finalidade exclusivamente educacional, informativa e científica. O site
            busca divulgar conhecimento médico de forma acessível, sem substituir a atuação de profissionais habilitados.
          </p>
        </Section>

        <Section title="2. Não substitui consulta médica">
          <p>
            As informações publicadas não substituem consulta, avaliação, diagnóstico, prescrição, tratamento, laudo,
            segunda opinião médica individualizada ou acompanhamento por profissional de saúde habilitado.
          </p>
        </Section>

        <Section title="3. Ausência de relação médico-paciente">
          <p>
            O acesso ao site, leitura de conteúdo, envio de mensagens, comentários, formulários ou interação em redes
            sociais não cria relação médico-paciente, vínculo assistencial, contrato de prestação de serviço médico ou
            obrigação de atendimento individualizado.
          </p>
        </Section>

        <Section title="4. Não usar para automedicação">
          <p>
            O usuário não deve iniciar, interromper, substituir ou modificar medicamentos, tratamentos, exames, condutas
            ou acompanhamentos com base apenas no conteúdo do site.
          </p>
        </Section>

        <Section title="5. Emergências">
          <p>
            Em caso de sintomas graves, urgência ou emergência, procure imediatamente serviço de saúde, pronto atendimento,
            SAMU 192 ou serviço local equivalente. O usuário não deve depender do site para situações emergenciais.
          </p>
        </Section>

        <Section title="6. Conteúdo sobre doenças, exames e tratamentos">
          <p>
            Conteúdos sobre doenças, sinais, sintomas, exames, medicamentos, procedimentos ou tratamentos são gerais e
            podem não se aplicar ao caso individual. Cada pessoa precisa de avaliação específica.
          </p>
        </Section>

        <Section title="7. Atualização científica">
          <p>
            O conhecimento médico muda com o tempo. O site pode atualizar, corrigir ou remover conteúdos a qualquer
            momento. Não há garantia de que todo conteúdo esteja sempre atualizado no momento do acesso.
          </p>
        </Section>

        <Section title="8. Publicidade, parcerias e links externos">
          <p>
            Eventuais anúncios, parcerias, conteúdos patrocinados ou links externos não constituem recomendação médica
            individualizada, prescrição, validação científica automática ou garantia de eficácia.
          </p>
        </Section>

        <Section title="9. Responsabilidade do usuário">
          <p>
            O usuário é responsável por buscar orientação profissional adequada antes de tomar decisões relacionadas à saúde.
          </p>
        </Section>

        <Section title="10. Contato">
          <p>
            Em caso de dúvidas sobre este Aviso de Responsabilidade Médica, entre em contato pelo e-mail: <ContactLink />.
          </p>
        </Section>
      </div>
    </article>
  </section>
);
