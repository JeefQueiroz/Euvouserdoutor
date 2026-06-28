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

export const PrivacyPolicy = () => (
  <section className="animate-in">
    <div className="bg-[#0A192F] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#5CE1E6] text-xs font-black uppercase tracking-[0.35em] mb-5">Privacidade</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">Política de Privacidade</h1>
        <p className="text-lg text-blue-100 leading-relaxed max-w-3xl">
          Como o Eu Vou Ser Doutor coleta, usa, protege e trata dados pessoais.
        </p>
        <p className="text-sm text-blue-200/80 mt-6">Última atualização: {updatedAt}</p>
      </div>
    </div>

    <article className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 md:p-10 space-y-9">
        <Section title="1. Apresentação">
          <p>
            Esta Política de Privacidade descreve como o Eu Vou Ser Doutor coleta, usa, armazena, compartilha e protege
            dados pessoais dos usuários que acessam o site <a className="font-bold text-[#2E70CE] hover:text-[#A02070]" href={institutional.site}>{institutional.site}</a>.
          </p>
        </Section>

        <Section title="2. Dados que podem ser coletados">
          <p>
            A coleta pode variar conforme os recursos ativados no site. Como o projeto possui carregamento condicional
            de Google Analytics ou Google Tag Manager por variáveis de ambiente, podem ser coletados dados técnicos e
            de navegação quando essas ferramentas estiverem configuradas em produção.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>dados fornecidos voluntariamente: nome, e-mail, telefone ou WhatsApp e mensagem enviada em contato;</li>
            <li>dados de navegação: endereço IP, dispositivo, navegador, páginas acessadas, data e hora de acesso, cookies e identificadores similares;</li>
            <li>dados de interação: cliques, origem de acesso, preferências de navegação e interações com páginas.</li>
          </ul>
        </Section>

        <Section title="3. Finalidades do uso dos dados">
          <p>Os dados podem ser usados para:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>responder contatos e solicitações;</li>
            <li>enviar comunicações solicitadas pelo usuário;</li>
            <li>melhorar conteúdo, navegação e segurança;</li>
            <li>analisar desempenho do site;</li>
            <li>prevenir fraude, abuso e uso indevido;</li>
            <li>cumprir obrigações legais ou regulatórias;</li>
            <li>proteger direitos do site, dos usuários e de terceiros.</li>
          </ul>
        </Section>

        <Section title="4. Base legal">
          <p>
            O tratamento de dados pode ocorrer com base em consentimento, execução de solicitação feita pelo usuário,
            legítimo interesse, cumprimento de obrigação legal ou regulatória e exercício regular de direitos, conforme
            o caso e de acordo com a LGPD.
          </p>
        </Section>

        <Section title="5. Cookies e tecnologias semelhantes">
          <p>
            Cookies são pequenos arquivos ou identificadores usados para funcionamento do site, análise de navegação e,
            quando aplicável, publicidade. O site pode usar cookies necessários, cookies de análise/desempenho e cookies
            de marketing/publicidade quando ferramentas como Google Analytics ou Google Tag Manager estiverem ativadas.
          </p>
          <p>
            Caso sejam usados cookies não essenciais, recomenda-se manter banner de cookies com opção de aceitar, recusar
            ou gerenciar preferências.
          </p>
        </Section>

        <Section title="6. Compartilhamento de dados">
          <p>
            Dados podem ser compartilhados com provedores técnicos necessários ao funcionamento do site, como hospedagem,
            ferramentas de análise, formulários, e-mail, segurança, comunicação e infraestrutura. O Eu Vou Ser Doutor não
            vende dados pessoais.
          </p>
          <p>
            Compartilhamentos também podem ocorrer quando necessários para cumprir obrigação legal, proteger direitos ou
            atender solicitação de autoridade competente.
          </p>
        </Section>

        <Section title="7. Armazenamento e retenção">
          <p>
            Dados são mantidos pelo tempo necessário para cumprir as finalidades informadas, obrigações legais, prevenção
            de fraude, segurança ou defesa de direitos. Após esse período, podem ser excluídos ou anonimizados.
          </p>
        </Section>

        <Section title="8. Direitos do titular">
          <p>Conforme a LGPD, o usuário pode solicitar:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>confirmação da existência de tratamento;</li>
            <li>acesso aos dados;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
            <li>portabilidade, quando aplicável;</li>
            <li>informação sobre compartilhamento;</li>
            <li>revogação do consentimento;</li>
            <li>eliminação de dados tratados com base no consentimento, quando aplicável;</li>
            <li>revisão de decisões automatizadas, se existirem.</li>
          </ul>
          <p>Canal para solicitações: <ContactLink />.</p>
        </Section>

        <Section title="9. Segurança">
          <p>
            O site adota medidas razoáveis de segurança para proteger dados pessoais, mas nenhum sistema é absolutamente
            seguro. O usuário também deve agir com cautela ao enviar informações pela internet.
          </p>
        </Section>

        <Section title="10. Dados de menores">
          <p>
            O Eu Vou Ser Doutor não é direcionado a crianças e não coleta intencionalmente dados de crianças. Caso dados
            de menor sejam enviados indevidamente, o responsável legal pode solicitar remoção pelo e-mail <ContactLink />.
          </p>
        </Section>

        <Section title="11. Transferência internacional">
          <p>
            Alguns dados podem ser processados fora do Brasil por provedores de tecnologia, hospedagem, análise ou
            comunicação. Esse tratamento deve observar mecanismos legais aplicáveis.
          </p>
        </Section>

        <Section title="12. Alterações desta política">
          <p>
            Esta Política de Privacidade pode ser atualizada a qualquer momento. A versão vigente será a publicada no site,
            com a data de última atualização.
          </p>
        </Section>

        <Section title="13. Contato">
          <p>
            Para dúvidas, solicitações ou exercício de direitos relacionados a dados pessoais, entre em contato pelo e-mail:
            {' '}<ContactLink />.
          </p>
        </Section>
      </div>
    </article>
  </section>
);
