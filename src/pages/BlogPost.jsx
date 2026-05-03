import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Share2, Calendar, User, BookOpen, Clock, Tag, ChevronRight, CheckCircle2, Quote, Sparkles, Target } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const BlogPost = ({ setView, postId, profileImg }) => {
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
    pomodoro: {
      title: "Técnica Pomodoro: Foco Total em Blocos de Tempo",
      cat: "Gestão de Tempo",
      time: "5 min de leitura",
      img: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&q=80&w=800",
      content: (
        <>
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10 first-letter:text-7xl first-letter:font-black first-letter:text-[#0A192F] first-letter:mr-3 first-letter:float-left">
            A ansiedade e a falta de foco são os maiores inimigos do vestibulando. Estudar por 4 horas seguidas sem pausas não é sinônimo de produtividade; é a receita certa para o esgotamento mental e a perda de retenção a longo prazo.
          </p>

          <div className="flex items-start gap-6 bg-white border border-gray-100 shadow-xl rounded-3xl p-8 mb-12 relative overflow-hidden group hover:border-blue-200 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <Quote size={40} className="text-[#5CE1E6] flex-shrink-0" />
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-[#0A192F] uppercase mb-4">O que é a Técnica Pomodoro?</h2>
              <p className="text-gray-600 leading-relaxed">
                Criada por Francesco Cirillo no final dos anos 1980, a Técnica Pomodoro baseia-se na ideia de que blocos de tempo curtos e focados, seguidos por breves intervalos, melhoram a agilidade mental. O formato clássico divide o trabalho em períodos de <strong>25 minutos de foco total</strong>, separados por <strong>5 minutos de descanso</strong>. Após quatro "pomodoros", você faz uma pausa maior.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#0A192F] mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-blue-600" />
            Por que funciona para o ENEM?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Para matérias densas como Ciências da Natureza, seu cérebro precisa de tempo para consolidar a informação. Ao saber que o esforço durará apenas 25 minutos, a resistência inicial de "começar a estudar" desaparece. O foco se torna um sprint, não uma maratona interminável.
          </p>

          <div className="bg-gradient-to-br from-[#0A192F] to-[#2E70CE] p-10 rounded-[32px] text-white shadow-2xl relative overflow-hidden my-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
                <Sparkles size={14} className="text-[#5CE1E6]" />
                O Suporte Eu Vou Ser Doutor
              </div>
              <h3 className="text-3xl font-black uppercase mb-4">Cronogramas Estratégicos</h3>
              <p className="text-blue-100 leading-relaxed text-lg mb-6">
                Na <strong>Mentoria Aprovado</strong>, nós não apenas mandamos você aplicar o Pomodoro. Nossos <strong>Cronogramas de 30 Semanas</strong> já dividem os tópicos de Biologia, Química e Física na medida exata para encaixar em blocos de 30 a 50 minutos. 
              </p>
              <button onClick={() => setView('mentorship')} className="bg-[#5CE1E6] text-[#0A192F] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg">
                Conheça a Mentoria
              </button>
            </div>
          </div>
        </>
      )
    },
    spaced_repetition: {
      title: "Revisão Espaçada: O Segredo da Retenção",
      cat: "Neurociência",
      time: "6 min de leitura",
      img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
      content: (
        <>
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10 first-letter:text-7xl first-letter:font-black first-letter:text-[#0A192F] first-letter:mr-3 first-letter:float-left">
            O maior erro do estudante tradicional é acreditar que ler um resumo várias vezes equivale a aprender. Sem revisar de forma ativa e estratégica, você perde até 70% do que estudou em apenas 24 horas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <ArrowLeft size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0A192F] mb-3">Estudo Passivo</h3>
              <p className="text-gray-600">Reler, grifar e assistir videoaulas. Dá a falsa sensação de fluência, mas na hora da prova o "branco" acontece.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-blue-100 hover:-translate-y-2 transition-transform relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-[#5CE1E6] to-[#2E70CE]"></div>
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-black text-[#0A192F] mb-3">Active Recall</h3>
              <p className="text-gray-600">Forçar o cérebro a buscar a resposta antes de olhar o gabarito. Fortalece as sinapses e consolida a memória.</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#0A192F] mb-6 flex items-center gap-3">
            <BookOpen className="text-[#5CE1E6]" />
            A Curva do Esquecimento
          </h2>
          <p className="text-gray-700 leading-relaxed mb-12 text-lg">
            O psicólogo Hermann Ebbinghaus descobriu que a nossa memória declina exponencialmente com o tempo. A única forma de "quebrar" essa curva e transformar a memória de curto prazo em longo prazo é revisar a matéria <em>exatamente</em> no momento em que você está prestes a esquecê-la. Isso é a Revisão Espaçada (Spaced Repetition).
          </p>

          <div className="bg-gradient-to-br from-[#0A192F] to-[#2E70CE] p-10 rounded-[32px] text-white shadow-2xl relative overflow-hidden my-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
                <Sparkles size={14} className="text-[#5CE1E6]" />
                A Solução Definitiva
              </div>
              <h3 className="text-3xl font-black uppercase mb-4">Flashcards Aprovado</h3>
              <p className="text-blue-100 leading-relaxed text-lg mb-6">
                É exatamente por isso que criamos os <strong>Flashcards Aprovado</strong>. Você não precisa montar planilhas complexas de revisão. Nossos baralhos utilizam algoritmos que programam automaticamente quando você deve rever cada carta com base na sua taxa de acerto. É retenção máxima com zero perda de tempo no planejamento.
              </p>
              <button onClick={() => setView('flashcards')} className="bg-[#5CE1E6] text-[#0A192F] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg">
                Garantir Retenção
              </button>
            </div>
          </div>
        </>
      )
    },
    feynman: {
      title: "Método Feynman: Ensine para Aprender",
      cat: "Aprendizado Ativo",
      time: "7 min de leitura",
      img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
      content: (
        <>
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10 first-letter:text-7xl first-letter:font-black first-letter:text-[#0A192F] first-letter:mr-3 first-letter:float-left">
            "Se você não consegue explicar algo de forma simples, é porque você não entendeu de verdade." Esta é a premissa de um dos métodos de estudo mais poderosos do mundo, criado pelo físico ganhador do Nobel, Richard Feynman.
          </p>

          <h2 className="text-3xl font-black text-[#0A192F] mb-8">Os 4 Passos do Método</h2>
          <div className="space-y-6 mb-12">
            {[
              { title: "Escolha o conceito", desc: "Pegue um tema complexo e delimite exatamente o que você quer aprender (ex: Ciclo de Krebs)." },
              { title: "Ensine a uma criança", desc: "Escreva ou fale em voz alta explicando o tema usando palavras simples, sem jargões científicos difíceis." },
              { title: "Identifique falhas", desc: "Nos pontos em que você gaguejar ou não souber explicar, volte ao material e estude novamente." },
              { title: "Simplifique e crie analogias", desc: "Refine a explicação conectando o conteúdo a situações práticas do dia a dia." }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#2E70CE] text-white rounded-xl flex items-center justify-center font-black text-xl flex-shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0A192F] mb-2">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#0A192F] to-[#2E70CE] p-10 rounded-[32px] text-white shadow-2xl relative overflow-hidden my-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
                <Sparkles size={14} className="text-[#5CE1E6]" />
                Aplicação Prática
              </div>
              <h3 className="text-3xl font-black uppercase mb-4">Plantões Tira-Dúvidas</h3>
              <p className="text-blue-100 leading-relaxed text-lg mb-6">
                Nosso ecossistema estimula o Método Feynman através dos nossos <strong>Plantões Tira-Dúvidas ao Vivo</strong>. Na Mentoria Aprovado, incentivamos os alunos a explicarem suas linhas de raciocínio. Mentores e professores corrigem os pequenos erros conceituais na hora, garantindo precisão cirúrgica.
              </p>
              <button onClick={() => setView('mentorship')} className="bg-[#5CE1E6] text-[#0A192F] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg">
                Fazer Parte
              </button>
            </div>
          </div>
        </>
      )
    },
    mind_maps: {
      title: "Mapas Mentais e Resumos Ativos",
      cat: "Estratégia de Estudo",
      time: "4 min de leitura",
      img: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
      content: (
        <>
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10 first-letter:text-7xl first-letter:font-black first-letter:text-[#0A192F] first-letter:mr-3 first-letter:float-left">
            Muitos alunos confundem "fazer resumo" com "transcrever o livro didático". Resumos passivos gigantescos e cheios de marca-textos coloridos dão uma falsa sensação de produtividade, mas falham miseravelmente na hora de revisar.
          </p>

          <div className="flex items-start gap-6 bg-white border border-gray-100 shadow-xl rounded-3xl p-8 mb-12 relative overflow-hidden group hover:border-blue-200 transition-colors">
            <Quote size={40} className="text-[#5CE1E6] flex-shrink-0" />
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-[#0A192F] uppercase mb-4">O que é um Resumo Ativo?</h2>
              <p className="text-gray-600 leading-relaxed">
                Um resumo ativo, ou mapa mental estruturado, contém apenas <strong>palavras-chave</strong>, fluxogramas de relação de causa/efeito e os "gatilhos" necessários para que o seu cérebro preencha o resto. Ele não é feito durante a leitura, mas <em>depois</em>, tentando forçar a memória antes de consultar o material.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0A192F] to-[#2E70CE] p-10 rounded-[32px] text-white shadow-2xl relative overflow-hidden my-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
                <Sparkles size={14} className="text-[#5CE1E6]" />
                Materiais Otimizados
              </div>
              <h3 className="text-3xl font-black uppercase mb-4">Biblioteca de Ouro</h3>
              <p className="text-blue-100 leading-relaxed text-lg mb-6">
                Nossa equipe já dissecou o que cai na FUVEST e no ENEM. Na nossa <strong>Biblioteca de Materiais</strong>, você acessa apostilas focadas que já destacam as palavras-chave exigidas pelos corretores. Ensinamos você a extrair o suprassumo da teoria e aplicar imediatamente nas questões.
              </p>
              <button onClick={() => setView('materials')} className="bg-[#5CE1E6] text-[#0A192F] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg">
                Acessar Materiais
              </button>
            </div>
          </div>
        </>
      )
    },
    self_evaluation: {
      title: "A Arte da Autoavaliação e Simulados",
      cat: "Métricas ENEM",
      time: "6 min de leitura",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      content: (
        <>
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10 first-letter:text-7xl first-letter:font-black first-letter:text-[#0A192F] first-letter:mr-3 first-letter:float-left">
            Treino é treino, jogo é jogo. Fazer listas de exercícios soltas no sofá ouvindo música não prepara você para a maratona física e mental de 5 horas do ENEM.
          </p>

          <h2 className="text-3xl font-black text-[#0A192F] mb-6 flex items-center gap-3">
            <Target className="text-red-500" />
            O Poder da Simulação
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            O objetivo de um simulado não é testar apenas o seu conhecimento, mas sim a sua resistência, gestão de tempo, estratégia de prova e controle emocional sob pressão. Muitos alunos fogem dos simulados por medo de ver notas baixas (a armadilha do ego), o que impede a correção de rota a tempo.
          </p>

          <p className="text-gray-700 leading-relaxed mb-10 text-lg">
            Errar uma questão no simulado tem muito valor. Você precisa registrar a causa raiz: foi por falta de teoria? Por erro de cálculo bobo? Falta de atenção? Tempo esgotado? Mapear a origem do erro é a única forma de evitar que ele se repita.
          </p>

          <div className="bg-gradient-to-br from-[#0A192F] to-[#2E70CE] p-10 rounded-[32px] text-white shadow-2xl relative overflow-hidden my-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
                <Sparkles size={14} className="text-[#5CE1E6]" />
                Métricas e Evolução
              </div>
              <h3 className="text-3xl font-black uppercase mb-4">Simulados Inéditos</h3>
              <p className="text-blue-100 leading-relaxed text-lg mb-6">
                Na <strong>Mentoria Aprovado</strong>, disponibilizamos simulados padronizados. Mais importante do que as questões é o nosso método de <em>Análise de Desempenho e Mapeamento de Erros</em>. Entregamos as ferramentas exatas para catalogar suas fraquezas e alavancar seu TRI.
              </p>
              <button onClick={() => setView('mentorship')} className="bg-[#5CE1E6] text-[#0A192F] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg">
                Fazer Diagnóstico
              </button>
            </div>
          </div>
        </>
      )
    },
    study_groups: {
      title: "Grupos de Estudo com Propósito",
      cat: "Comunidade",
      time: "5 min de leitura",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      content: (
        <>
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10 first-letter:text-7xl first-letter:font-black first-letter:text-[#0A192F] first-letter:mr-3 first-letter:float-left">
            "Você é a média das 5 pessoas com quem mais convive". No ano de vestibular para Medicina, estar isolado no quarto pode gerar uma espiral perigosa de desmotivação e ansiedade severa.
          </p>

          <h2 className="text-2xl font-black text-[#0A192F] uppercase mb-4 mt-8">A Força do Ambiente</h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            Grupos de estudo desorganizados rapidamente se transformam em clubes sociais de procrastinação. Mas um grupo de alta performance, onde todos têm a mesma meta de aprovação, eleva a barra de excelência de forma natural. Ver seus pares batendo metas gera um senso de urgência altamente construtivo e positivo.
          </p>

          <div className="bg-gradient-to-br from-[#0A192F] to-[#2E70CE] p-10 rounded-[32px] text-white shadow-2xl relative overflow-hidden my-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
                <Sparkles size={14} className="text-[#5CE1E6]" />
                Ecossistema Imparável
              </div>
              <h3 className="text-3xl font-black uppercase mb-4">A Comunidade VIP</h3>
              <p className="text-blue-100 leading-relaxed text-lg mb-6">
                Nós entendemos a solidão dessa jornada. Ao se juntar ao <strong>Ecossistema Eu Vou Ser Doutor</strong>, você entra em nossa Comunidade VIP exclusiva. Um espaço 100% livre de toxicidade e competição agressiva; aqui o propósito é colaboração, networking e apoio moral direcionado.
              </p>
              <button onClick={() => window.open(telegram, '_blank')} className="bg-[#5CE1E6] text-[#0A192F] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg">
                Entrar no Ecossistema
              </button>
            </div>
          </div>
        </>
      )
    },
    relaxation: {
      title: "Técnicas de Memorização e Relaxamento",
      cat: "Inteligência Emocional",
      time: "8 min de leitura",
      img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      content: (
        <>
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10 first-letter:text-7xl first-letter:font-black first-letter:text-[#0A192F] first-letter:mr-3 first-letter:float-left">
            De nada adianta dominar todo o conteúdo se, no dia da prova, o pico de cortisol desencadear o temido "branco". O controle emocional é responsável por pelo menos 50% da sua nota final.
          </p>

          <h2 className="text-3xl font-black text-[#0A192F] mb-6">A Fisiologia do Nervosismo</h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            Sob extremo estresse, o seu córtex pré-frontal (responsável pela lógica e memória) literalmente "desliga" para que a amígdala (área de sobrevivência e medo) assuma o controle. Você não esqueceu a fórmula; seu cérebro só cortou o acesso a ela para te focar em "sobreviver".
          </p>

          <div className="flex gap-4 p-6 bg-orange-50 border border-orange-100 rounded-3xl my-8">
            <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black text-orange-900 mb-2">Hackeamento Biológico</h4>
              <p className="text-orange-800">
                Respirar corretamente e ancorar pensamentos positivos são técnicas para devolver o sangue oxigenado para a parte lógica do cérebro em menos de 2 minutos.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0A192F] to-[#2E70CE] p-10 rounded-[32px] text-white shadow-2xl relative overflow-hidden my-12">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
                <Sparkles size={14} className="text-[#5CE1E6]" />
                Psicologia Estratégica
              </div>
              <h3 className="text-3xl font-black uppercase mb-4">Blindagem Emocional</h3>
              <p className="text-blue-100 leading-relaxed text-lg mb-6">
                No <strong>Eu Vou Ser Doutor</strong>, não ensinamos apenas Biologia e Física. Nossas reuniões periódicas da Mentoria trazem estratégias reais e validadas para evitar o branco e formar candidatos emocionalmente inabaláveis para qualquer prova.
              </p>
              <button onClick={() => setView('mentorship')} className="bg-[#5CE1E6] text-[#0A192F] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg">
                Fazer a Mentoria
              </button>
            </div>
          </div>
        </>
      )
    }
  };

  const post = postsData[postId];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-black text-[#0A192F]">Artigo não encontrado.</h2>
          <button onClick={() => setView('news')} className="mt-4 text-blue-600 font-bold hover:underline">Voltar para notícias</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in bg-[#F4F7FB] min-h-screen pb-20 text-left relative">
      {/* Barra de Progresso de Leitura */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-[#5CE1E6] to-[#2E70CE] z-50 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Header Topic: Glassmorphism */}
      <div className="relative bg-[#0A192F] text-white pt-16 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2E70CE]/20 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5CE1E6]/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
           <button 
             onClick={() => setView('news')} 
             className="group flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-xs font-black tracking-[0.2em] uppercase mb-10 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-md w-fit border border-white/10"
           >
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Blog
           </button>
           
           <div className="flex items-center gap-4 flex-wrap mb-6">
             <div className="bg-[#2E70CE] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-900/50">
               {post.cat}
             </div>
             <div className="flex items-center gap-2 text-blue-200/80 text-xs font-medium bg-white/5 px-3 py-1 rounded-full border border-white/10">
               <Clock size={14} /> {post.time}
             </div>
           </div>
           
           <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-tight text-white italic uppercase drop-shadow-2xl">
             {post.title}
           </h1>
           
           <div className="flex items-center gap-4 text-blue-200/80 text-sm font-medium border-t border-white/10 pt-8 mt-4">
             <img src={profileImg} alt="Jeff Queiroz" className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover shadow-xl" />
             <div>
               <div className="text-white font-bold text-base">Jeff Queiroz</div>
               <div className="text-xs uppercase tracking-widest text-[#5CE1E6]">Especialista em Aprovação</div>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-16 relative z-20">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-2xl border border-gray-100">
            {/* Featured Image */}
            <div className="w-full aspect-[21/9] rounded-[32px] overflow-hidden mb-12 shadow-lg border border-gray-100 group relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>

            {/* Post Text */}
            <div className="prose max-w-none prose-lg prose-headings:text-[#0A192F] prose-a:text-blue-600">
              {post.content}
            </div>

            {/* Global CTA for Medicine (Simplified to just a button) */}
            <div className="flex justify-end mt-12 mb-8">
              <button onClick={() => setView('mentorship')} className="bg-[#2E70CE] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:-translate-y-1 transition-all shadow-[0_10px_30px_rgba(46,112,206,0.3)] hover:shadow-[0_15px_40px_rgba(46,112,206,0.5)] inline-flex items-center justify-center gap-3 w-full sm:w-auto">
                CONHECER A MENTORIA APROVADO <ArrowRight size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Tags e Share */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                  <Tag size={12} /> ENEM
                </span>
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                  <Tag size={12} /> Medicina
                </span>
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                  <Tag size={12} /> UFMG
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-gray-500 font-medium">
                <span className="text-sm font-bold uppercase tracking-widest">Compartilhar</span>
                <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all hover:scale-110 shadow-sm">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-12 bg-[#F4F7FB] p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-8 border border-blue-100">
              <div className="w-24 h-24 flex-shrink-0">
                 <img src={profileImg} alt="Jeff" className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-[#0A192F] uppercase italic mb-2">Sobre o Autor</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Jeff Queiroz é acadêmico de Medicina na UFMG e fundador do ecossistema <strong>Eu vou ser Doutor</strong>. Já ajudou milhares de vestibulandos a transformarem a maneira como estudam através da ciência do aprendizado ativo.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 mt-12 md:mt-0">
          <div className="sticky top-8">
            <Sidebar setView={setView} profileImg={profileImg} />
          </div>
        </div>
      </div>
    </div>
  );
};
