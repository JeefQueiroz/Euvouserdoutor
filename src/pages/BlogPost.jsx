import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Share2, Calendar, User, BookOpen, Clock, Tag, ChevronRight, CheckCircle2, Quote, Sparkles, Target, Bookmark, MessageSquare, ExternalLink, GraduationCap, Layers } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const BlogPost = ({ setView, postId, profileImg, telegram }) => {

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const postsData = {
    retina_chip_2026: {
      title: "Chip de Retina Restaura Visão em Pacientes com Degeneração Macular Avançada",
      subtitle: "Tecnologia da Science Corporation, baseada em implantes fotovoltaicos e óculos inteligentes, atinge 81% de sucesso em ensaio clínico publicado no NEJM.",
      cat: "Tecnologia Médica",
      time: "7 min",
      date: "11 Ago 2026",
      pubTime: "20:00",
      updateTime: "23:15",
      img: "/retina_chip_tech.jpg",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed font-bold mb-8 text-pretty">
            Uma fronteira histórica na oftalmologia foi rompida. Resultados de um ensaio clínico multicêntrico, publicados no prestigiado <strong>New England Journal of Medicine (NEJM)</strong>, revelam que um implante fotovoltaico sub-retiniano, conhecido como sistema PRIMA, foi capaz de restaurar a visão central funcional em pacientes com cegueira causada por degeneração macular relacionada à idade (DMRI) avançada.
          </p>

          <p className="text-[#98A2B3] leading-relaxed mb-8 text-base md:text-lg font-medium">
            A tecnologia, desenvolvida pela Science Corporation, combina um chip microscópico de 378 pixels implantado sob a retina com óculos inteligentes equipados com uma câmera e um projetor infravermelho. O sistema atua substituindo os fotorreceptores danificados, convertendo luz em sinais elétricos que estimulam diretamente as células nervosas do olho, permitindo que o cérebro processe imagens novamente.
          </p>

          <div className="glass-premium rounded-[32px] p-8 mb-12 border border-[#4F8CFF]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8CFF]/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF] shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-xs font-black text-[#4F8CFF] uppercase tracking-[0.3em] mb-3">O Impacto em Números</h2>
                <p className="text-[#F8FAFC] text-sm md:text-base leading-relaxed font-bold italic">
                  "No estudo com 38 pacientes, 81% apresentaram uma melhora clinicamente significativa na acuidade visual após 12 meses. Muitos voltaram a ser capazes de ler letras grandes e reconhecer formas que antes eram apenas borrões escuros."
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4">
            <span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> Como Funciona o "Olho Biônico"
          </h2>
          
          <p className="text-[#98A2B3] leading-relaxed mb-6 text-base md:text-lg font-medium">
            Diferente de tecnologias anteriores que exigiam cabos externos, o chip PRIMA é totalmente sem fio e alimentado por luz. Os óculos capturam a cena visual e a projetam via infravermelho no chip. Os pixels fotovoltaicos transformam essa luz em pulsos elétricos, criando uma interface direta com o sistema visual do paciente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#11141A] p-8 rounded-[32px] border border-white/[0.05] premium-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-[#4F8CFF]">
                <Layers size={20} />
              </div>
              <h3 className="text-white font-black text-lg">Interface Fotovoltaica</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed">
                Chip sem fios que converte luz em eletricidade para estimular as células da retina.
              </p>
            </div>
            <div className="bg-[#11141A] p-8 rounded-[32px] border border-white/[0.05] premium-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-[#4F8CFF]">
                <Target size={20} />
              </div>
              <h3 className="text-white font-black text-lg">Foco na DMRI Seca</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed">
                Primeiro tratamento eficaz para a atrofia geográfica, forma avançada e incurável de cegueira central.
              </p>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] mb-6 tracking-tighter">Referências & Fontes</h2>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[24px] p-6 space-y-3">
            {[
              "Holz FG, et al. Subretinal Photovoltaic Implant to Restore Vision in Geographic Atrophy. New England Journal of Medicine. 2026.",
              "Science Corporation. PRIMAvera Multicenter Clinical Trial Final Results. 2026.",
              "Ophthalmology Times. PRIMA System: A major step in the battle against GA. 2026."
            ].map((ref, i) => (
              <div key={i} className="flex gap-3 text-xs text-[#98A2B3] font-medium leading-relaxed">
                <span className="text-[#4F8CFF] font-black">[{i+1}]</span>
                <span>{ref}</span>
              </div>
            ))}
          </div>
        </>
      )
    },
    estudar_medicina: {
      title: "Como Estudar para Medicina com Método, Rotina e Constância",
      subtitle: "Um guia editorial sobre organização acadêmica para transformar esforço em processo de aprovação.",
      cat: "Técnicas de estudo",
      time: "6 min",
      date: "10 Ago 2026",
      img: "https://i.imgur.com/9QVE0X7.jpeg",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed font-bold mb-8 text-pretty">
            Estudar para Medicina exige método, constância e capacidade de revisar o próprio processo sem depender de fórmulas prontas.
          </p>
          <p className="text-[#98A2B3] leading-relaxed mb-8 text-base md:text-lg font-medium">
            O EuVouSerDoutor reúne conteúdos educacionais, materiais de apoio e ideias de organização para estudantes e vestibulandos que querem mais clareza na rotina.
          </p>
        </>
      )
    },
    cart_brasil_2026: {
      title: "Terapia CAR-T 100% Nacional Atinge 72% de Remissão em Cânceres Avançados do Sangue",
      subtitle: "Desenvolvida por USP, Hemocentro de Ribeirão Preto e Instituto Butantan, inovação biotecnológica abre caminho para o acesso democrático a tratamentos genéticos avançados no SUS.",
      cat: "Saúde & Ciência",
      time: "8 min",
      date: "11 Ago 2026",
      img: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=1200",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed font-bold mb-8 text-pretty">
            A ciência brasileira alcançou um marco histórico na oncologia e na biotecnologia avançada. Os primeiros resultados dos ensaios clínicos da <strong>terapia CAR-T 100% nacional</strong> — desenvolvida por uma força-tarefa que une a Universidade de São Paulo (USP), o Hemocentro de Ribeirão Preto (CTC-USP) e o Instituto Butantan — revelaram uma taxa de resposta global de 81% e uma <strong>remissão completa de 72%</strong> em pacientes com leucemias e linfomas agressivos que já haviam esgotado todas as alternativas terapêuticas tradicionais.
          </p>

          <p className="text-[#98A2B3] leading-relaxed mb-8 text-base md:text-lg font-medium">
            O avanço representa uma mudança de patamar para o Sistema Único de Saúde (SUS). Até então restrita a centros de excelência no exterior com custos milionários que inviabilizavam a incorporação em larga escala, a produção soberana de células geneticamente modificadas no Brasil democratiza o acesso a uma das armas mais poderosas da medicina moderna contra o câncer.
          </p>

          <div className="glass-premium rounded-[32px] p-8 mb-12 border border-[#4F8CFF]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8CFF]/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF] shrink-0">
                <Target size={24} />
              </div>
              <div>
                <h2 className="text-xs font-black text-[#4F8CFF] uppercase tracking-[0.3em] mb-3">Por que isso importa</h2>
                <p className="text-[#F8FAFC] text-sm md:text-base leading-relaxed font-bold italic">
                  "A transição de terapias gênicas importadas de milhões de dólares para uma plataforma nacional viável no SUS não é apenas uma conquista científica; é uma questão de soberania sanitária e direito à vida para milhares de brasileiros."
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4">
            <span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> Como Funciona a Reprogramação Celular
          </h2>
          
          <p className="text-[#98A2B3] leading-relaxed mb-6 text-base md:text-lg font-medium">
            A terapia CAR-T (<i>Chimeric Antigen Receptor T-cell</i>) é uma forma avançada de imunoterapia viva. O processo começa com a coleta dos linfócitos T do próprio paciente através de aférese. Em laboratório, essas células de defesa são geneticamente reprogramadas com a inserção de um gene sintético que lhes confere um "radar" molecular — o receptor quimérico de antígeno.
          </p>

          <p className="text-[#98A2B3] leading-relaxed mb-8 text-base md:text-lg font-medium">
            Quando reinfundidas no organismo do paciente, as células CAR-T passam a reconhecer e destruir com precisão cirúrgica as células tumorais que expressam o antígeno CD19, característico de neoplasias hematológicas como a leucemia linfoblástica aguda e o linfoma não-Hodgkin. O tratamento age como um medicamento vivo que persiste no corpo, vigiando e eliminando recidivas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#11141A] p-8 rounded-[32px] border border-white/[0.05] premium-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-[#4F8CFF]">
                <Sparkles size={20} />
              </div>
              <h3 className="text-base font-black text-[#F8FAFC]">Independência Tecnológica</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed font-medium">
                A capacidade de fabricação nacional em centros certificados reduz a dependência de insumos internacionais e reduz custos operacionais em até 80%.
              </p>
            </div>
            <div className="bg-[#11141A] p-8 rounded-[32px] border border-white/[0.05] premium-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-[#4F8CFF]">
                <Clock size={20} />
              </div>
              <h3 className="text-base font-black text-[#F8FAFC]">Resposta Rápida</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed font-medium">
                Avaliações clínicas de acompanhamento demonstraram que a remissão completa pode ser detectada em exames de imagem logo no primeiro mês após a infusão.
              </p>
            </div>
          </div>

          <div className="my-16 relative">
             <div className="absolute inset-0 bg-[#4F8CFF]/5 blur-3xl rounded-full" />
             <blockquote className="relative p-10 border-l-4 border-[#4F8CFF] bg-white/[0.02] rounded-r-[32px] italic text-xl md:text-2xl font-medium text-[#F8FAFC] leading-relaxed">
               "Ver pacientes sem nenhuma outra expectativa de cura retornarem à vida normal após uma única infusão de células modificadas no Brasil é a coroação de anos de pesquisa pública e rigor científico."
               <footer className="mt-4 text-sm font-black uppercase tracking-widest text-[#4F8CFF] not-italic">— Comitê Científico do Centro de Terapia Celular (CTC-USP)</footer>
             </blockquote>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4">
            <span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> Desafios e Próximos Passos Clínicos
          </h2>

          <p className="text-[#98A2B3] leading-relaxed mb-8 text-base md:text-lg font-medium">
            Embora os índices de 72% de remissão completa coloquem o Brasil no seleto grupo de nações capazes de desenvolver terapias gênicas avançadas, os pesquisadores ressaltam que o monitoramento de longo prazo continua essencial. Efeitos colaterais imunológicos, como a síndrome de liberação de citocinas (SLC), exigem protocolos hospitalares altamente especializados.
          </p>

          <p className="text-[#98A2B3] leading-relaxed mb-12 text-base md:text-lg font-medium">
            Atualmente, os institutos parceiros expandem os ensaios clínicos para novos centros oncológicos no país e preparam a submissão regulatória definitiva à Agência Nacional de Vigilância Sanitária (Anvisa), pavimentando a incorporação gradual do tratamento nas redes pública e suplementar.
          </p>

          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[24px] p-6 space-y-4 mb-12">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4F8CFF]">Conteúdo Relacionado</h4>
            <button onClick={() => setView("news")} className="flex items-center justify-between w-full group text-left">
              <span className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors underline decoration-[#4F8CFF]/30 underline-offset-4">Oxford inicia ensaio clínico global de vacina inovadora contra o vírus Ebola</span>
              <ExternalLink size={14} className="text-[#98A2B3] group-hover:text-[#4F8CFF] shrink-0 ml-4" />
            </button>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] mb-6 tracking-tighter">Referências & Fontes Científicas</h2>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[24px] p-6 space-y-3">
            {[
              "Universidade de São Paulo (USP) / Centro de Terapia Celular (CTC-RP). Resultados preliminares do ensaio clínico de terapia CAR-T nacional. 2026.",
              "Instituto Butantan. Avanços no desenvolvimento soberano de imunoterapias celulares para o SUS. 2026.",
              "Frontiers in Hematology. The evolving landscape of CAR T-cell therapy access in Brazil. DOI: 10.3389/frhem.2026.1813861"
            ].map((ref, i) => (
              <div key={i} className="flex gap-3 text-xs text-[#98A2B3] font-medium leading-relaxed">
                <span className="text-[#4F8CFF] font-black">[{i+1}]</span>
                <span>{ref}</span>
              </div>
            ))}
          </div>
        </>
      )
    },

    ebola_oxford_2026: {
      title: "Oxford Inicia Primeiro Ensaio Clínico Global de Vacina Contra o Vírus Ebola Bundibugyo",
      subtitle: "Estudo de Fase 1 avalia segurança e resposta imune do imunizante ChAdOx1 BDBV, marcando resposta rápida a surto severo na África.",
      cat: "Saúde & Ciência",
      time: "7 min",
      date: "11 Ago 2026",
      img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed font-bold mb-8 text-pretty">
            A Universidade de Oxford, por meio do renomado <strong>Oxford Vaccine Group</strong> e do <i>Pandemic Sciences Institute</i> (PSI), anunciou o início do primeiro ensaio clínico em humanos (Fase 1) da vacina <strong>ChAdOx1 BDBV</strong>. O objetivo é conter o vírus Ebola Bundibugyo, uma variante altamente letal e para a qual ainda não existia imunizante específico.
          </p>

          <p className="text-[#98A2B3] leading-relaxed mb-8 text-base md:text-lg font-medium">
            O estudo, financiado pela CEPI (Coalition for Epidemic Preparedness Innovations), avalia a segurança e a capacidade de gerar resposta imune em 64 voluntários sadios no Reino Unido. Esta etapa é crucial para validar a eficácia da plataforma tecnológica antes da expansão para áreas afetadas na África Central.
          </p>

          <div className="glass-premium rounded-[32px] p-8 mb-12 border border-[#4F8CFF]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8CFF]/5 rounded-full blur-2xl -mr-16 -mt-16" />
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF] shrink-0">
                <Target size={24} />
              </div>
              <div>
                <h2 className="text-xs font-black text-[#4F8CFF] uppercase tracking-[0.3em] mb-3">Por que isso importa</h2>
                <p className="text-[#F8FAFC] text-sm md:text-base leading-relaxed font-bold italic">
                  "Diferente da variante Zaire, a variante Bundibugyo não possuía ferramentas preventivas aprovadas. O sucesso deste ensaio pode significar a diferença entre um surto controlado e uma crise humanitária global."
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4">
            <span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> Metodologia e Segurança
          </h2>
          
          <p className="text-[#98A2B3] leading-relaxed mb-6 text-base md:text-lg font-medium">
            O imunizante utiliza a plataforma <strong>ChAdOx1</strong>, a mesma tecnologia de vetor viral de adenovírus de chimpanzé que serviu de base para a vacina Oxford/AstraZeneca contra a Covid-19. Esta escolha estratégica permite uma produção em escala mais rápida e um perfil de segurança já amplamente documentado em bilhões de doses aplicadas mundialmente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#11141A] p-8 rounded-[32px] border border-white/[0.05] premium-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-[#4F8CFF]">
                <Layers size={20} />
              </div>
              <h3 className="text-base font-black text-[#F8FAFC]">Estrutura do Ensaio</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed font-medium">
                Os participantes receberão diferentes dosagens para determinar o esquema vacinal ideal, com acompanhamento clínico rigoroso por 12 meses.
              </p>
            </div>
            <div className="bg-[#11141A] p-8 rounded-[32px] border border-white/[0.05] premium-border space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-[#4F8CFF]">
                <Sparkles size={20} />
              </div>
              <h3 className="text-base font-black text-[#F8FAFC]">Alcance Global</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed font-medium">
                Após a Fase 1, o plano editorial e científico prevê a inclusão de centros de pesquisa em Uganda e na República Democrática do Congo.
              </p>
            </div>
          </div>

          <div className="my-16 relative">
             <div className="absolute inset-0 bg-[#4F8CFF]/5 blur-3xl rounded-full" />
             <blockquote className="relative p-10 border-l-4 border-[#4F8CFF] bg-white/[0.02] rounded-r-[32px] italic text-xl md:text-2xl font-medium text-[#F8FAFC] leading-relaxed">
               "Estamos utilizando lições aprendidas na pandemia para acelerar o desenvolvimento de vacinas contra patógenos que a Organização Mundial da Saúde (OMS) classifica como prioritários."
               <footer className="mt-4 text-sm font-black uppercase tracking-widest text-[#4F8CFF] not-italic">— Professor Sir Andrew Pollard, Diretor do Oxford Vaccine Group</footer>
             </blockquote>
          </div>

          <p className="text-[#98A2B3] leading-relaxed mb-8 text-base md:text-lg font-medium">
            Os resultados preliminares da Fase 1 são esperados para o final de 2026, com o início da Fase 2 previsto para o primeiro semestre de 2027 em regiões endêmicas.
          </p>

          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[24px] p-6 space-y-4 mb-12">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4F8CFF]">Leia Também</h4>
            <button onClick={() => setView('news')} className="flex items-center justify-between w-full group text-left">
              <span className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors underline decoration-[#4F8CFF]/30 underline-offset-4">Avanços na regeneração neural: O que esperar para 2027</span>
              <ExternalLink size={14} className="text-[#98A2B3] group-hover:text-[#4F8CFF] shrink-0 ml-4" />
            </button>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-[#F8FAFC] mb-6 tracking-tighter">Referências & Fontes</h2>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[24px] p-6 space-y-3">
            {[
              "University of Oxford. First volunteer vaccinated in Oxford Bundibugyo Ebola vaccine trial. 2026.",
              "CEPI. Accelerated development of vaccines against Ebola virus diseases. 2026.",
              "The Lancet Infectious Diseases. Safety and immunogenicity of ChAdOx1 BDBV. DOI: 10.1016/S1473-3099(26)00124-5"
            ].map((ref, i) => (
              <div key={i} className="flex gap-3 text-xs text-[#98A2B3] font-medium leading-relaxed">
                <span className="text-[#4F8CFF] font-black">[{i+1}]</span>
                <span>{ref}</span>
              </div>
            ))}
          </div>
        </>
      )
    },
    polilaminina: {
      title: "Polilaminina: A Nova Fronteira da Regeneração Neural em 2026",
      subtitle: "Pesquisas avançadas demonstram que a polilaminina pode atuar como um andaime molecular para a recuperação de lesões na medula espinhal.",
      cat: "Neurologia",
      time: "6 min",
      date: "09 Ago 2026",
      img: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed font-bold mb-8 text-pretty">
            A regeneração do sistema nervoso central, um dos maiores desafios da medicina moderna, acaba de ganhar um aliado promissor: a <strong>polilaminina</strong>. Novos estudos publicados em 2026 indicam que este polímero sintético, que mimetiza a matriz extracelular, é capaz de guiar o crescimento de axônios em áreas de lesão severa.
          </p>
          <p className="text-[#98A2B3] leading-relaxed mb-8 text-base md:text-lg font-medium">
            Diferente de abordagens anteriores, a polilaminina cria um ambiente bioativo que impede a formação da cicatriz glial, permitindo que as conexões neurais sejam restabelecidas de forma funcional.
          </p>
        </>
      )
    },
    pomodoro: {
      title: "Técnica Pomodoro: Ciência do Foco para Estudantes de Medicina",
      subtitle: "Como ciclos de 25 minutos de concentração total podem prevenir a fadiga cognitiva e aumentar a retenção de conteúdo denso.",
      cat: "Rotina",
      time: "4 min",
      date: "08 Ago 2026",
      img: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&q=80&w=1200",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed font-bold mb-8 text-pretty">
            Para o estudante de Medicina, o volume de informações é o maior inimigo. A <strong>Técnica Pomodoro</strong> não é apenas um timer; é uma estratégia de gerenciamento de carga cognitiva baseada na neurociência da atenção.
          </p>
          <p className="text-[#98A2B3] leading-relaxed mb-8 text-base md:text-lg font-medium">
            Ao fragmentar o estudo em blocos de foco intenso seguidos de pausas estratégicas, o cérebro consegue consolidar informações na memória de curto prazo antes de entrar em exaustão.
          </p>
        </>
      )
    },
    spaced_repetition: {
      title: "Revisão Espaçada: O Fim do Esquecimento na Preparação Médica",
      subtitle: "Entenda a curva do esquecimento e como algoritmos de repetição espaçada garantem que você nunca mais esqueça o que estudou.",
      cat: "Revisão",
      time: "5 min",
      date: "07 Ago 2026",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed font-bold mb-8 text-pretty">
            O segredo da aprovação não está no quanto você lê, mas no quanto você retém. A <strong>revisão espaçada</strong> (SRS) utiliza o efeito de espaçamento para desafiar o cérebro no momento exato em que ele começaria a esquecer um conceito.
          </p>
        </>
      )
    },
    feynman: {
      title: "Método Feynman: Se Você Não Sabe Explicar, Você Não Entendeu",
      subtitle: "A técnica do Nobel de Física que ajuda estudantes de medicina a dominar temas complexos através da simplificação radical.",
      cat: "Técnicas de estudo",
      time: "4 min",
      date: "06 Ago 2026",
      img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed font-bold mb-8 text-pretty">
            Richard Feynman acreditava que a verdadeira maestria vem da simplicidade. O <strong>Método Feynman</strong> consiste em quatro passos para transformar temas densos em conhecimento intuitivo.
          </p>
        </>
      )
    },
    mind_maps: {
      title: "Mapas Mentais: Conectando os Pontos da Anatomia e Fisiologia",
      subtitle: "Como o pensamento radiante e a organização visual podem substituir resumos lineares e ineficientes.",
      cat: "Técnicas de estudo",
      time: "5 min",
      date: "05 Ago 2026",
      img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed font-bold mb-8 text-pretty">
            Mapas mentais mimetizam a forma como os neurônios se conectam. Ao usar cores, imagens e ramificações, você ativa o hemisfério direito do cérebro, facilitando a memorização de sistemas complexos.
          </p>
        </>
      )
    },
    self_evaluation: {
      title: "Autoavaliação: Transformando Erros em Pontos de Aprovação",
      subtitle: "O guia definitivo para analisar simulados e criar um plano de estudo baseado em dados reais de desempenho.",
      cat: "Rotina",
      time: "5 min",
      date: "04 Ago 2026",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
      content: (
        <>
          <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed font-bold mb-8 text-pretty">
            Errar um simulado é uma oportunidade de ouro. A <strong>autoavaliação crítica</strong> permite identificar se o erro foi por falta de base, falta de atenção ou má gestão de tempo.
          </p>
        </>
      )
    }
  };

  const post = postsData[postId] || postsData.ebola_oxford_2026;

  useEffect(() => {
    const scriptId = 'news-article-schema';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": post.title,
      "image": [post.img],
      "datePublished": "2026-08-11T08:00:00-03:00",
      "dateModified": "2026-08-11T08:00:00-03:00",
      "author": {
        "@type": "Person",
        "name": "Jefferson Viana Queiroz",
        "url": "https://www.euvouserdoutor.com/autor/jeff-queiroz"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Eu Vou Ser Doutor",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.euvouserdoutor.com/logo-euvouserdoutor.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    });

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [post]);

  return (
    <div className="animate-in text-left bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24">
      {/* Mega Premium Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-white/5">
        <div 
          className="h-full bg-[#4F8CFF] transition-all duration-300 shadow-[0_0_20px_rgba(79,140,255,0.6)]" 
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      {/* Hero Editorial Header */}
      <div className="bg-[#0A192F] border-b border-white/[0.05] pt-16 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.15),transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-10">
            <button
              type="button"
              onClick={() => setView('news')}
              className="inline-flex items-center gap-3 text-[10px] font-black text-[#F8FAFC] uppercase bg-white/[0.05] border border-white/[0.1] px-5 py-2.5 rounded-2xl hover:bg-white/[0.1] hover-lift transition-all"
            >
              <ArrowLeft size={14} strokeWidth={3} className="text-[#4F8CFF]" /> Voltar ao Portal
            </button>
            <div className="flex gap-3">
              <button className="p-2.5 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-[#98A2B3] hover:text-white transition-all"><Share2 size={18} /></button>
              <button className="p-2.5 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-[#98A2B3] hover:text-white transition-all"><Bookmark size={18} /></button>
            </div>
          </div>
          
          <div className="max-w-5xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                {post.cat}
              </span>
              <span className="h-px w-8 bg-white/20"></span>
              <span className="text-[10px] text-[#98A2B3] font-black uppercase tracking-widest">{post.time} de leitura</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black tracking-tighter leading-[1.05] text-[#F8FAFC] text-balance">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-[#98A2B3] font-medium max-w-3xl leading-relaxed">
              {post.subtitle}
            </p>
            
            <div className="pt-6 border-t border-white/[0.05] text-xs md:text-sm text-[#98A2B3] font-medium flex flex-wrap items-center gap-2">
              <span className="text-white font-bold">EuvouserDoutor - Jeff Queiroz</span>, em Belo Horizonte (MG) / <span className="text-[#4F8CFF] font-bold">{post.date} às {post.pubTime || "08:00"}</span> | Atualizado <span className="text-white">{post.date} às {post.updateTime || post.pubTime || "08:00"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-16 relative z-20">
        <div className="lg:col-span-8 xl:col-span-9">
          <article className="glass-premium rounded-[48px] overflow-hidden p-1 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <div className="bg-[#11141A] rounded-[47px] overflow-hidden">
              <div className="aspect-[21/9] w-full overflow-hidden relative">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11141A] via-transparent to-transparent opacity-40" />
              </div>
              <div className="px-6 py-3 bg-[#11141A] border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#98A2B3] gap-2">
                <span className="italic">{post.title}</span>
                <span className="font-bold text-[#4F8CFF] shrink-0">Foto: Reprodução / Banco Editorial EuvouserDoutor</span>
              </div>
              <div className="p-8 md:p-16">
                <div className="prose prose-invert max-w-none">
                  {post.content}
                </div>
                
                {/* Mega Premium Conversion Funnel */}
                <div className="mt-20 glass-premium rounded-[40px] p-1 overflow-hidden group">
                  <div className="bg-[#4F8CFF] rounded-[39px] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-125" />
                    
                    <div className="relative z-10 space-y-6 md:w-3/5 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 bg-[#080A0F]/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#080A0F]">
                        <Sparkles size={12} /> Próximo Passo
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-[#080A0F] tracking-tighter leading-none">
                        Acelere sua aprovação com método.
                      </h3>
                      <p className="text-base md:text-lg font-bold text-[#080A0F]/70 leading-relaxed">
                        A Mentoria Aprovado é o ecossistema estratégico definitivo para quem busca o topo da carreira médica.
                      </p>
                      <button 
                        onClick={() => setView('mentorship')}
                        className="bg-[#080A0F] text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-[#1A1F26] hover-lift transition-all flex items-center gap-3 shadow-2xl mx-auto md:mx-0"
                      >
                        Quero ser Mentorado <ArrowRight size={18} strokeWidth={3} />
                      </button>
                    </div>

                    <div className="md:w-2/5 relative flex justify-center">
                      <div className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] bg-[#080A0F] rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-2xl flex items-center justify-center p-8">
                        <img src="/logo-euvouserdoutor.png" alt="Logo" className="w-full h-auto brightness-0 invert opacity-20" />
                        <GraduationCap size={80} className="absolute text-white/10" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article Footer Meta */}
                <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-6">
                  <div className="flex gap-2">
                    {["Medicina", "Pesquisa", "Oxford", "Futuro"].map(tag => (
                      <span key={tag} className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[10px] font-black uppercase tracking-widest text-[#98A2B3] hover:text-[#4F8CFF] cursor-pointer transition-colors">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#98A2B3] hover:text-white transition-colors">
                      <MessageSquare size={16} /> Comentar
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#98A2B3] hover:text-white transition-colors">
                      <Share2 size={16} /> Compartilhar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="lg:col-span-4 xl:col-span-3">
          <Sidebar setView={setView} />
        </div>
      </div>
    </div>
  );
};
