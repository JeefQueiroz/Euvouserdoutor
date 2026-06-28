import React from 'react';
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

export const TermsOfUse = () => (
  <section className="animate-in">
    <div className="bg-[#0A192F] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#5CE1E6] text-xs font-black uppercase tracking-[0.35em] mb-5">Termos</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">Termos de Uso</h1>
        <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
          Regras de acesso, uso e responsabilidades relacionadas ao site Eu Vou Ser Doutor.
        </p>
        <p className="text-sm text-blue-200/80 mt-6">Última atualização: {updatedAt}</p>
      </div>
    </div>

    <article className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 md:p-10 space-y-9">
        <Section title="1. Identificação do site">
          <p>
            O Eu Vou Ser Doutor é uma plataforma digital de conteúdo educacional, informativo e científico
            relacionado à medicina, saúde, estudo médico, curiosidades médicas e temas correlatos.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Site oficial: <a className="font-bold text-[#2E70CE] hover:text-[#A02070]" href={institutional.site}>{institutional.site}</a></li>
            <li>Responsável: Eu Vou Ser Doutor</li>
            <li>País: Brasil</li>
            <li>Contato: <ContactLink /></li>
          </ul>
        </Section>

        <Section title="2. Aceitação dos termos">
          <p>
            Ao acessar ou usar o site, o usuário declara que leu, compreendeu e concorda com estes Termos de Uso.
            Caso não concorde com qualquer condição, deve interromper o uso do site.
          </p>
        </Section>

        <Section title="3. Finalidade do site">
          <p>
            O conteúdo possui finalidade exclusivamente educacional, informativa e científica. O site não é serviço
            médico, consulta, diagnóstico, prescrição, tratamento, laudo, segunda opinião individualizada ou atendimento clínico.
          </p>
        </Section>

        <Section title="4. Uso permitido">
          <p>
            O usuário pode acessar, ler e compartilhar links do site para fins pessoais, educacionais e informativos,
            desde que preserve autoria, integridade do conteúdo e indicação da fonte.
          </p>
        </Section>

        <Section title="5. Condutas proibidas">
          <p>É proibido usar o site para:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>prática ilegal, ofensiva, fraudulenta, difamatória ou discriminatória;</li>
            <li>violação de direitos de terceiros;</li>
            <li>tentativa de invasão, raspagem abusiva de dados ou exploração de falhas;</li>
            <li>cópia integral não autorizada, republicação ou exploração comercial indevida;</li>
            <li>uso automatizado que prejudique o funcionamento do site;</li>
            <li>envio de spam, malware ou conteúdo malicioso;</li>
            <li>induzir terceiros a erro sobre saúde, diagnóstico ou tratamento.</li>
          </ul>
        </Section>

        <Section title="6. Propriedade intelectual">
          <p>
            Textos, marcas, logotipos, imagens, vídeos, layout, identidade visual, organização do conteúdo e demais
            materiais pertencem ao Eu Vou Ser Doutor ou são usados com autorização ou licença. É proibida reprodução,
            venda, adaptação, distribuição ou exploração comercial sem autorização, salvo limites previstos em lei.
          </p>
        </Section>

        <Section title="7. Links externos">
          <p>
            O site pode conter links para sites, plataformas, redes sociais, ferramentas ou materiais de terceiros.
            O Eu Vou Ser Doutor não controla nem se responsabiliza por conteúdo, segurança, disponibilidade, políticas
            de privacidade ou práticas de terceiros.
          </p>
        </Section>

        <Section title="8. Comentários, mensagens e conteúdo enviado pelo usuário">
          <p>
            Se houver formulários, comentários ou mensagens, o usuário é responsável pelo que envia. Não devem ser
            enviados dados sensíveis desnecessários, conteúdo ofensivo, ilegal, falso, spam, violações de terceiros ou
            informações médicas pessoais que não sejam necessárias. O site pode remover conteúdo inadequado.
          </p>
        </Section>

        <Section title="9. Atualização das informações">
          <p>
            A medicina e as ciências da saúde mudam constantemente. O site busca cuidado editorial, mas não garante que
            todo conteúdo esteja sempre completo, atualizado ou aplicável a casos individuais. Confirme informações
            relevantes com fontes oficiais, literatura científica atualizada e profissionais habilitados.
          </p>
        </Section>

        <Section title="10. Limitação de responsabilidade">
          <p>
            Na máxima extensão permitida pela legislação brasileira, o Eu Vou Ser Doutor não se responsabiliza por
            decisões tomadas com base exclusiva no conteúdo do site, automedicação, atraso na busca por atendimento,
            interpretação equivocada, uso indevido das informações, falhas técnicas, indisponibilidade temporária,
            perda de dados, ações de terceiros ou danos decorrentes do uso inadequado da plataforma.
          </p>
          <p>Nada nestes Termos exclui responsabilidades que não possam ser afastadas pela legislação brasileira.</p>
        </Section>

        <Section title="11. Publicidade, parcerias e afiliados">
          <p>
            O site pode conter anúncios, links de afiliados, parcerias, conteúdos patrocinados ou recomendações de
            produtos, serviços, cursos, plataformas ou materiais educacionais. Quando houver esse tipo de conteúdo,
            ele deve ser identificado de forma clara sempre que aplicável. Isso não representa recomendação médica
            individualizada, prescrição ou garantia de resultado.
          </p>
        </Section>

        <Section title="12. Alterações dos termos">
          <p>
            Estes Termos podem ser atualizados a qualquer momento para refletir mudanças no site, na legislação ou nas
            práticas internas. A versão publicada no site é a vigente.
          </p>
        </Section>

        <Section title="13. Legislação aplicável">
          <p>Estes Termos são regidos pelas leis da República Federativa do Brasil.</p>
        </Section>

        <Section title="14. Contato">
          <p>Em caso de dúvidas sobre estes Termos, entre em contato pelo e-mail: <ContactLink />.</p>
        </Section>
      </div>
    </article>
  </section>
);
