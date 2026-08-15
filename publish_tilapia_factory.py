from pathlib import Path

ROOT = Path('/home/ubuntu/Euvouserdoutor')
news = ROOT / 'src/pages/News.jsx'
blog = ROOT / 'src/pages/BlogPost.jsx'
institutional = ROOT / 'src/institutional.js'
sitemap = ROOT / 'public/sitemap.xml'

post_id = 'post_tilapia_factory_ceara_2026'
slug = 'fabrica-curativos-pele-tilapia-ceara-2026'
img = '/curativo_pele_tilapia_ceara_2026.jpg'

card = f'''    {{
      id: "{post_id}",
      title: "Ceará terá fábrica de curativos feitos com pele de tilápia em escala industrial",
      subtitle: "Projeto em Jaguaribara pretende transformar uma tecnologia desenvolvida no Ceará em produto farmacêutico; estudos clínicos anteriores apontaram menos trocas de curativo e menor custo em queimaduras.",
      cat: "Inovação Médica",
      date: "15 Ago 2026",
      readTime: "8 min",
      img: "{img}",
      target: "{post_id}",
      featured: true,
    }},
'''

n = news.read_text()
if post_id not in n:
    marker = '  const posts = [\n'
    if marker not in n:
        raise SystemExit('marcador posts não encontrado')
    n = n.replace(marker, marker + card, 1)
    news.write_text(n)

article = f'''  post_tilapia_factory_ceara_2026: {{
    title: "Ceará terá fábrica de curativos feitos com pele de tilápia em escala industrial",
    subtitle: "Projeto em Jaguaribara pretende transformar uma tecnologia desenvolvida no Ceará em produto farmacêutico; estudos clínicos anteriores apontaram menos trocas de curativo e menor custo em queimaduras.",
    author: "EuvouserDoutor - Jeff Queiroz",
    location: "Jaguaribara (CE)",
    date: "15/08/2026",
    time: "8 min",
    pubTime: "11:07",
    updateDate: "15/08/2026",
    updateTime: "11:07",
    category: "Inovação Médica",
    img: "{img}",
    imageAlt: "Ilustração de pele de tilápia sendo transformada em curativo biológico sobre uma representação de pele humana, com equipamentos de processamento ao fundo",
    imageCaption: "Ilustração editorial mostra as etapas de processamento da pele de tilápia para produção de um curativo biológico; a fábrica prevista para Jaguaribara ainda está em implantação.",
    imageCredit: "Ilustração original produzida para o EuvouserDoutor.",
    content: () => (
      <>
        <p>O Ceará se prepara para transformar uma pesquisa desenvolvida no estado em uma cadeia industrial de produtos para feridas. Uma fábrica prevista para Jaguaribara, no Vale do Jaguaribe, deverá processar pele de tilápia para produzir curativos biológicos em escala farmacêutica, segundo informações divulgadas pelo Instituto de Pesquisas Energéticas e Nucleares (IPEN) [1].</p>
        <p>O projeto é uma parceria entre o Governo do Ceará, a empresa BIOTEC Medical Xenograft Engineering, a Universidade Federal do Ceará (UFC), o Instituto José Frota, o Instituto de Apoio ao Queimado, o IPEN, a SDE e a ADECE. A iniciativa representa uma etapa de industrialização; não significa que o produto já esteja disponível em todas as unidades de saúde ou incorporado automaticamente ao SUS.</p>

        <div className="glass-premium rounded-[32px] p-8 mb-12 border border-[#4F8CFF]/20 relative overflow-hidden">
          <div className="flex items-start gap-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF]"><Sparkles size={{24}} /></div>
            <div>
              <h2 className="text-xs font-black text-[#4F8CFF] uppercase tracking-[0.3em] mb-3">Por que isso importa</h2>
              <p className="text-[#F8FAFC] text-sm md:text-base leading-relaxed font-bold italic">A fábrica pode aproximar uma inovação brasileira do uso em maior escala, aproveitar um subproduto da piscicultura e criar uma cadeia de produção no Nordeste. O impacto real dependerá de fabricação regular, autorização sanitária, preço, distribuição e avaliação contínua dos resultados.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4"><span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> Como o curativo é produzido</h2>
        <p>A pele da tilápia passa por limpeza, processamento e <strong>liofilização</strong>, uma técnica que remove água do material congelado para aumentar sua estabilidade. De acordo com o IPEN, o projeto também prevê esterilização por radiação gama. A combinação permitiria manter o produto em temperatura ambiente, com reidratação em soro fisiológico antes do uso [1].</p>
        <p>O material funciona como uma cobertura biológica temporária. Em vez de deixar a ferida exposta, o curativo ajuda a proteger o leito da lesão e pode permanecer aderido por mais tempo do que algumas alternativas convencionais. A resposta, porém, depende do tipo e da profundidade da ferida, da avaliação clínica e do protocolo utilizado.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
          <div className="bg-[#11141A] p-6 rounded-[24px] border border-white/[0.05]"><div className="text-3xl font-black text-[#4F8CFF]">180 mil</div><div className="text-sm text-[#98A2B3] mt-2">peles por mês na capacidade inicial prevista</div></div>
          <div className="bg-[#11141A] p-6 rounded-[24px] border border-white/[0.05]"><div className="text-3xl font-black text-[#4F8CFF]">400 mil</div><div className="text-sm text-[#98A2B3] mt-2">unidades mensais previstas ao fim do terceiro ano</div></div>
          <div className="bg-[#11141A] p-6 rounded-[24px] border border-white/[0.05]"><div className="text-3xl font-black text-[#4F8CFF]">52 mi</div><div className="text-sm text-[#98A2B3] mt-2">reais de investimento anunciados para o projeto</div></div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4"><span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> O que os estudos clínicos já mostraram</h2>
        <p>A tecnologia não parte apenas de uma hipótese de laboratório. Em um ensaio clínico randomizado de fase III realizado em Fortaleza, pesquisadores acompanharam <strong>115 adultos</strong> com queimaduras superficiais de espessura parcial que atingiam até 15% da superfície corporal. O estudo comparou a pele de tilápia tratada com sulfadiazina de prata [2].</p>
        <p>Os participantes que receberam a pele de tilápia tiveram tempo médio de reepitelização de 9,7 dias, contra 10,2 dias no grupo comparador. Também precisaram de menos trocas de curativo — 1,6 contra 4,9, em média — e apresentaram redução em medidas de dor e no custo final relacionado ao tratamento. A diferença de custo relatada foi de 42,1% [2].</p>
        <p>Esses resultados são relevantes, mas têm alcance definido: referem-se principalmente a queimaduras superficiais de espessura parcial tratadas dentro de um protocolo específico. Eles não comprovam eficácia para qualquer ferida, úlcera, infecção ou doença dermatológica.</p>

        <div className="bg-amber-500/10 border-l-4 border-amber-400 p-6 my-10 rounded-r-2xl">
          <h3 className="text-amber-300 font-black uppercase tracking-widest text-xs mb-3">Atenção: fábrica não é sinônimo de tratamento disponível</h3>
          <p className="text-white leading-relaxed">A unidade anunciada ainda representa uma etapa industrial. Antes de chegar amplamente aos serviços de saúde, o produto precisa cumprir exigências de fabricação, controle de qualidade, autorização sanitária, logística e protocolos de uso. Nenhuma pessoa deve aplicar pele de peixe ou qualquer curativo biológico em uma ferida por conta própria.</p>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4"><span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> Por que a inovação começou no Ceará</h2>
        <p>A pesquisa foi construída a partir da colaboração entre o Centro de Tratamento de Queimados do Instituto José Frota e grupos da UFC. A pele de tilápia é abundante na piscicultura e possui uma estrutura rica em colágeno, uma proteína que ajuda a formar matrizes usadas em biomateriais. O processamento é necessário para reduzir contaminantes, padronizar o material e permitir o uso médico com segurança.</p>
        <p>Além de queimaduras, grupos brasileiros estudam aplicações em outras feridas e áreas de medicina regenerativa. Cada indicação, no entanto, exige avaliação própria. Resultados obtidos em queimaduras não podem ser transferidos automaticamente para feridas crônicas, cirurgias ou reconstruções complexas.</p>

        <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4"><span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> O que vem agora</h2>
        <p>Os próximos passos envolvem construir e qualificar a unidade, validar lotes, assegurar a esterilidade do produto e definir como os curativos serão distribuídos. Também será necessário acompanhar o desempenho em diferentes serviços e comparar custos reais, não apenas projeções industriais.</p>
        <p>Se os requisitos forem cumpridos, a fábrica poderá transformar uma solução desenvolvida em hospitais e universidades brasileiras em um produto produzido perto da escala necessária. Até lá, a notícia principal é a passagem da pesquisa para a implantação industrial — não a chegada de um novo tratamento universal.</p>

        <div className="mt-16 pt-8 border-t border-white/[0.05]">
          <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><BookOpen size={{16}} className="text-[#4F8CFF]" /> Fontes científicas e institucionais</h4>
          <ul className="space-y-4 text-sm text-[#98A2B3]">
            <li className="flex gap-3 italic"><span className="text-[#4F8CFF] font-black not-italic">[1]</span> Instituto de Pesquisas Energéticas e Nucleares (IPEN). “Ceará fortalece polo de biotecnologia com primeira fábrica do Brasil de curativos à base de pele de tilápia”. Publicado em 12/08/2026, atualizado em 14/08/2026. <a href="https://www.gov.br/ipen/pt-br/assuntos/clipping-de-noticias/ceara-fortalece-polo-de-biotecnologia-com-primeira-fabrica-do-brasil-de-curativos-a-base-de-pele-de-tilapia" target="_blank" rel="noreferrer" className="text-[#4F8CFF]">Fonte institucional</a>.</li>
            <li className="flex gap-3 italic"><span className="text-[#4F8CFF] font-black not-italic">[2]</span> Lima Júnior, E. M. et al. (2021). “Nile Tilapia Fish Skin-Based Wound Dressing Improves Pain and Treatment-Related Costs of Superficial Partial-Thickness Burns: A Phase III Randomized Controlled Trial”. <em>Plastic and Reconstructive Surgery</em>. DOI: <a href="https://doi.org/10.1097/PRS.0000000000007895" target="_blank" rel="noreferrer" className="text-[#4F8CFF]">10.1097/PRS.0000000000007895</a>.</li>
            <li className="flex gap-3 italic"><span className="text-[#4F8CFF] font-black not-italic">[3]</span> ClinicalTrials.gov. “Use of Nile Tilapia Fish Skin as a Xenograft for Burn Treatment”, estudo NCT04202289. <a href="https://clinicaltrials.gov/study/NCT04202289" target="_blank" rel="noreferrer" className="text-[#4F8CFF]">Registro do ensaio</a>.</li>
          </ul>
        </div>
      </>
    )
  }},
'''

b = blog.read_text()
if '  tilapia_factory_ceara_2026:' not in b:
    marker = '  };\n\n  const post = postsData[postId]'
    if marker not in b:
        raise SystemExit('marcador postsData não encontrado')
    b = b.replace(marker, article + marker, 1)
    blog.write_text(b)

meta = f'''  {post_id}: {{ title: 'Ceará terá fábrica de curativos feitos com pele de tilápia em escala industrial | EuvouserDoutor', description: 'Projeto em Jaguaribara pretende transformar uma tecnologia desenvolvida no Ceará em curativos biológicos de pele de tilápia; entenda o que os estudos clínicos já mostraram e o que ainda falta.', path: '/noticias/{slug}' }},\n'''
i = institutional.read_text()
if post_id not in i:
    marker = 'Object.assign(routeMeta, {\n'
    if marker not in i:
        raise SystemExit('marcador routeMeta não encontrado')
    i = i.replace(marker, marker + meta, 1)
    institutional.write_text(i)

sm = sitemap.read_text()
url = f'https://www.euvouserdoutor.com/noticias/{slug}'
if url not in sm:
    sm = sm.replace('</urlset>', f'  <url><loc>{url}</loc><lastmod>2026-08-15</lastmod></url>\n</urlset>', 1)
    sitemap.write_text(sm)

print('publicação preparada')
