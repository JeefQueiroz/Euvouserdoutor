from pathlib import Path

ROOT = Path('/home/ubuntu/Euvouserdoutor')
news = ROOT / 'src/pages/News.jsx'
blog = ROOT / 'src/pages/BlogPost.jsx'
institutional = ROOT / 'src/institutional.js'
sitemap = ROOT / 'public/sitemap.xml'

post_id = 'post_plcg2_alzheimer_synapses_2026'
slug = 'plcg2-sinapses-alzheimer-culturas-neuronais-2026'
img = '/plcg2_sinapses_alzheimer_2026.jpg'

card = f'''    {{
      id: "{post_id}",
      title: "Gene ligado ao Alzheimer afeta sinapses em neurônios humanos, mostra estudo",
      subtitle: "Pesquisa na Nature Genetics relaciona a redução de PLCG2 a alterações sinápticas e a marcadores celulares da doença, mas ainda não testa tratamento em pessoas.",
      cat: "Neurociência",
      date: "14 Ago 2026",
      readTime: "8 min",
      img: "{img}",
      target: "{post_id}",
      featured: true,
    }},
'''

n = news.read_text()
if post_id not in n:
    n = n.replace('  const posts = [\n', '  const posts = [\n' + card, 1)
    news.write_text(n)

article = f'''  {post_id}: {{
    title: "Gene ligado ao Alzheimer afeta sinapses em neurônios humanos, mostra estudo",
    subtitle: "Pesquisa publicada na Nature Genetics relaciona a redução de PLCG2 a falhas na comunicação entre neurônios e ao aumento de beta-amiloide e Tau em culturas celulares; resultado ainda não equivale a tratamento ou teste diagnóstico.",
    author: "EuvouserDoutor - Jeff Queiroz",
    location: "Belo Horizonte (MG)",
    date: "14/08/2026",
    time: "8 min",
    pubTime: "11:11",
    updateDate: "14/08/2026",
    updateTime: "11:11",
    category: "Neurociência",
    img: "{img}",
    imageAlt: "Ilustração de um neurônio com ramificações e estruturas moleculares associadas à comunicação sináptica",
    imageCaption: "Ilustração editorial mostra um neurônio e estruturas moleculares associadas à comunicação entre sinapses; o estudo investigou o papel do gene PLCG2 em modelos celulares.",
    imageCredit: "Ilustração original produzida para o EuvouserDoutor.",
    content: () => (
      <>
        <p>Uma pesquisa publicada nesta sexta-feira (14) na revista <strong>Nature Genetics</strong> identificou uma ligação entre a redução da atividade do gene <strong>PLCG2</strong> e alterações na comunicação entre neurônios. Em culturas de células humanas, a diminuição da proteína foi acompanhada por mudanças em sinapses e pelo aumento de marcadores associados à doença de Alzheimer, como beta-amiloide e Tau fosforilada [1].</p>
        <p>O achado ajuda a explicar como uma variante genética rara pode aumentar a vulnerabilidade ao Alzheimer, mas ainda está distante de uma aplicação clínica. Os experimentos foram realizados em culturas neuronais e em análises genéticas; não houve teste de medicamento, acompanhamento de pacientes para avaliar sintomas nem ensaio clínico.</p>

        <div className="glass-premium rounded-[32px] p-8 mb-12 border border-[#4F8CFF]/20 relative overflow-hidden">
          <div className="flex items-start gap-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#4F8CFF]/10 flex items-center justify-center text-[#4F8CFF]"><Sparkles size={24} /></div>
            <div>
              <h2 className="text-xs font-black text-[#4F8CFF] uppercase tracking-[0.3em] mb-3">Por que isso importa</h2>
              <p className="text-[#F8FAFC] text-sm md:text-base leading-relaxed font-bold italic">O estudo desloca parte da atenção dos depósitos de proteínas para a comunicação entre neurônios, uma das funções que podem ser afetadas cedo no Alzheimer. A descoberta é mecanística e experimental, não uma promessa de cura.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4"><span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> O que é o PLCG2</h2>
        <p>O PLCG2 codifica a proteína PLCγ2, uma enzima envolvida em vias de sinalização dentro das células. Variantes comuns do gene já haviam sido associadas ao risco de Alzheimer, enquanto algumas variantes raras de perda de função parecem estar ligadas a uma alteração mais expressiva do risco genético [1].</p>
        <p>Na nova pesquisa, os autores procuraram entender se essa associação poderia envolver diretamente os neurônios, e não apenas células do sistema imune do cérebro. Para isso, usaram uma triagem de alto conteúdo com <strong>198 genes</strong> localizados em 76 regiões genéticas relacionadas ao Alzheimer.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
          <div className="bg-[#11141A] p-6 rounded-[24px] border border-white/[0.05]"><div className="text-3xl font-black text-[#4F8CFF]">198</div><div className="text-sm text-[#98A2B3] mt-2">genes rastreados na triagem inicial</div></div>
          <div className="bg-[#11141A] p-6 rounded-[24px] border border-white/[0.05]"><div className="text-3xl font-black text-[#4F8CFF]">76</div><div className="text-sm text-[#98A2B3] mt-2">loci genéticos associados ao risco de Alzheimer</div></div>
          <div className="bg-[#11141A] p-6 rounded-[24px] border border-white/[0.05]"><div className="text-3xl font-black text-[#4F8CFF]">10x</div><div className="text-sm text-[#98A2B3] mt-2">risco associado a variantes muito raras de perda de função, segundo a análise</div></div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4"><span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> O que aconteceu nas células</h2>
        <p>O rastreamento inicial foi feito em culturas primárias de neurônios de hipocampo de ratos, com três culturas independentes. Entre os genes que produziram alterações mais fortes na densidade das sinapses estava o <em>Plcg2</em>. A equipe então repetiu parte da investigação em culturas neuronais humanas.</p>
        <p>Nessas culturas, a redução de <em>PLCG2</em> foi associada a menor função sináptica, aumento de beta-amiloide no meio de cultura e maior fosforilação da proteína Tau. Em alguns experimentos, a reintrodução da versão normal do gene reduziu os efeitos observados, uma evidência de que o mecanismo merece investigação adicional.</p>
        <p>Os pesquisadores também analisaram dados de sequenciamento de núcleo único e encontraram alterações em vias relacionadas à atividade neuronal e às sinapses. O artigo sugere que proteínas da família das neurexinas podem participar dessa conexão, mas essa hipótese ainda precisa de testes específicos.</p>

        <div className="bg-amber-500/10 border-l-4 border-amber-400 p-6 my-10 rounded-r-2xl">
          <h3 className="text-amber-300 font-black uppercase tracking-widest text-xs mb-3">Atenção: o que o estudo não mostra</h3>
          <p className="text-white leading-relaxed">A pesquisa não criou um tratamento, não permite diagnosticar Alzheimer pela medição de PLCG2 e não prova que corrigir o gene impediria a doença. Culturas celulares não reproduzem a interação entre neurônios, micróglia, vasos sanguíneos, metabolismo e comportamento ao longo de décadas.</p>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4"><span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> Genética não é destino individual</h2>
        <p>O artigo relata que variantes muito raras de perda de função no PLCG2 foram associadas a um risco de Alzheimer aproximadamente dez vezes maior. Esse número descreve uma associação em uma população estudada e não funciona como previsão automática para uma pessoa. Variantes raras também podem ter estimativas instáveis quando o número de portadores é pequeno.</p>
        <p>Além disso, o Alzheimer é uma condição heterogênea, influenciada por múltiplos genes, idade, saúde vascular, sono, ambiente e outros fatores. O novo trabalho acrescenta uma peça ao quebra-cabeça, mas não substitui avaliação médica nem aconselhamento genético.</p>

        <h2 className="text-2xl md:text-3xl font-black text-[#F8FAFC] mb-6 tracking-tighter flex items-center gap-4"><span className="w-2 h-8 bg-[#4F8CFF] rounded-full" /> O que vem agora</h2>
        <p>Para transformar o mecanismo em uma possível estratégia terapêutica, seriam necessários estudos que confirmassem o efeito em modelos animais completos, avaliassem segurança e mostrassem se a modulação de PLCG2 melhora memória ou outros desfechos. Só depois poderiam ser planejados ensaios clínicos em pessoas.</p>
        <p>Enquanto isso, a principal contribuição do trabalho é indicar que alterações sinápticas podem estar ligadas diretamente a um fator genético de risco em neurônios humanos. Essa direção pode ajudar a desenvolver hipóteses mais precisas sobre as fases iniciais da doença.</p>

        <div className="mt-16 pt-8 border-t border-white/[0.05]">
          <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2"><BookOpen size={16} className="text-[#4F8CFF]" /> Fontes científicas</h4>
          <ul className="space-y-4 text-sm text-[#98A2B3]">
            <li className="flex gap-3 italic"><span className="text-[#4F8CFF] font-black not-italic">[1]</span> Coulon, A. et al. (2026). “PLCG2 downregulation impairs synaptic function and increases Alzheimer’s disease hallmarks in neuronal cultures”. <em>Nature Genetics</em>. DOI: <a href="https://doi.org/10.1038/s41588-026-02709-5" target="_blank" rel="noreferrer" className="text-[#4F8CFF]">10.1038/s41588-026-02709-5</a>.</li>
            <li className="flex gap-3 italic"><span className="text-[#4F8CFF] font-black not-italic">[2]</span> Nature Genetics. Artigo em acesso aberto sob licença Creative Commons BY-NC-ND 4.0; a imagem principal desta matéria é uma ilustração original do EuvouserDoutor, não uma figura reproduzida do artigo.</li>
          </ul>
        </div>
      </>
    )
  }},
'''

b = blog.read_text()
if post_id not in b:
    marker = '  };\n\n  const post = postsData[postId]'
    if marker not in b:
        raise SystemExit('marcador de postsData não encontrado')
    b = b.replace(marker, article + marker, 1)
    blog.write_text(b)

meta = f'''  {post_id}: {{ title: 'Gene ligado ao Alzheimer afeta sinapses em neurônios humanos, mostra estudo | EuvouserDoutor', description: 'Pesquisa na Nature Genetics relaciona a redução de PLCG2 a alterações sinápticas e marcadores celulares do Alzheimer em culturas neuronais.', path: '/noticias/{slug}' }},\n'''
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
    if '</urlset>' in sm:
        sm = sm.replace('</urlset>', f'  <url><loc>{url}</loc><lastmod>2026-08-14</lastmod></url>\n</urlset>', 1)
    else:
        sm += f'\n{url}\n'
    sitemap.write_text(sm)

print('publicação preparada')
