---
name: euvouserdoutor-automation
description: "Curadoria editorial inteligente, produção visual, legendas e preparação de publicações para o Instagram @euvouserdoutor. Use para buscar e comparar notícias de educação, ciência, tecnologia e inovação, aprender com o histórico de desempenho, evitar duplicidades e saturação, gerar arte 4:5 e legenda sem hashtags, validar o conteúdo e publicar uma pauta por execução autorizada."
---

# EuvouserDoutor Automation

Execute o fluxo abaixo em ordem. A qualidade e a novidade da pauta são mais importantes do que preencher um horário.

> **Buscar → comparar → verificar histórico → analisar potencial → escolher → produzir → validar → publicar → registrar → medir e aprender.**

## 1. Preparar o contexto

Leia os recursos existentes antes de operar:

- `scripts/publish_post.py`: curadoria, score, antirrepetição, geração, upload e preparação do comando de publicação;
- `scripts/gerar_imagem.py`: composição da foto original com `templates/base1.png`;
- `scripts/gerar_legenda.py`: geração da legenda editorial;
- `templates/base1.png` e a fonte em `templates/fonts/`.

Use o registro persistente em `/home/ubuntu/.euvouserdoutor/history.json`. Se ele não existir, inicialize-o com `{"posts": [], "performance": {}}`. O caminho pode ser alterado pela variável `EUVOUSERDOUTOR_HISTORY`.

Quando disponível, consulte o histórico do Instagram via conexão autorizada e associe os Insights aos registros correspondentes. Considere visualizações, alcance, curtidas, comentários, compartilhamentos, reposts, salvamentos, visitas ao perfil e seguidores gerados. Não ajuste toda a estratégia por causa de um único post; procure padrões recorrentes em várias publicações.

## 2. Buscar e comparar candidatas

Pesquise várias candidatas, nunca selecione automaticamente a primeira matéria. Comece por:

1. Só Notícia Boa — Educação: `https://www.sonoticiaboa.com.br/educacao`;
2. Só Notícia Boa — Saúde, somente quando o foco for inovação, tecnologia ou formação e não doença: `https://www.sonoticiaboa.com.br/saude`;
3. CNN Brasil — Saúde: `https://www.cnnbrasil.com.br/saude/`.

Amplie para outra fonte jornalística confiável somente quando houver pauta claramente superior. Compare fonte, URL, data, título, imagem original, personagem, local, acontecimento, estudo, descoberta, resumo semântico, categoria e gancho principal.

Priorize fatos surpreendentes, ciência curiosa, descobertas, acontecimentos incomuns, inteligência artificial, tecnologia, inovação, universidades, estudantes, formação médica, pesquisas surpreendentes, conquistas acadêmicas extraordinárias e histórias humanas realmente excepcionais. Procure o efeito “Como isso é possível?”, “Isso realmente aconteceu?” ou “Eu não sabia disso”, sempre com uma informação central compreensível rapidamente.

Não trate superação como sinônimo de viralização. Evite que o feed seja dominado por sequências de histórias sobre aluno que supera dificuldade, professor que cria projeto, trabalhador que consegue diploma, família que paga faculdade ou estudante que realiza um sonho. Use-as apenas quando houver elemento raro, improvável, surpreendente ou emocionalmente forte.

## 3. Excluir, deduplicar e diversificar

Exclua matérias cujo foco principal seja doença, sintoma, diagnóstico, tratamento, prognóstico, condição clínica, complicação ou conteúdo médico pesado. Exclua também comunicados burocráticos, campanhas institucionais, anúncios administrativos, pautas frias, textos genéricos e títulos que funcionem apenas como comunicado.

Consulte todo o histórico antes da escolha. Classifique a ocorrência como:

- **Duplicidade exata:** mesma URL ou mesma matéria;
- **Duplicidade semântica:** mesmo fato, personagem, estudo ou acontecimento com outra fonte ou outro título;
- **Saturação editorial:** matéria diferente, mas muito semelhante aos conteúdos recentes.

Rejeite as duas primeiras e aplique penalidade forte à terceira. Classifique a pauta em um pilar: ciência curiosa; tecnologia/IA; educação; formação médica; história humana extraordinária; descoberta científica; inovação em saúde; conquista acadêmica; ou curiosidade/fato raro. Evite repetir consecutivamente o mesmo pilar quando houver alternativa boa.

## 4. Pontuar e selecionar

Para cada candidata elegível, atribua notas de 0 a 10 para curiosidade, surpresa, força da manchete, clareza imediata, impacto emocional, potencial de compartilhamento, potencial de salvamento, impacto visual, relevância para o perfil, probabilidade de visita ao perfil, probabilidade de gerar seguidores e novidade.

Calcule também o **Historical Fit Score**, isto é, a proximidade da pauta com os padrões de posts que historicamente performaram bem no perfil. Dê maior peso a compartilhamentos, alcance/visualizações, seguidores gerados, salvamentos, novidade e força do título. Penalize repetição, saturação, título frio, conteúdo institucional, baixa força visual e genericidade.

Use `publish_post.py --dry-run` para coletar e comparar candidatas sem gerar arte, fazer upload ou preparar publicação. Escolha a combinação mais forte de potencial editorial, aderência histórica, novidade, visual, manchete e ausência de repetição. Se nenhuma candidata atingir qualidade suficiente, amplie a busca ou encerre sem publicar; não publique conteúdo fraco apenas para cumprir agenda.

## 5. Preservar a manchete e produzir a arte

Analise primeiro o título original. Compare-o com uma possível adaptação editorial. Mantenha o original completo quando ele for mais forte. Preserve consequência, surpresa, idade, números, feito extraordinário, emoção, objetivo e conclusão do gancho. Só adapte quando o ganho for evidente, sem criar informação ou clickbait.

Use **sempre e prioritariamente a fotografia real da própria reportagem** quando ela estiver disponível. A ordem obrigatória é: (1) fotografia editorial original da matéria; (2) fotografia real da mesma pauta em outra fonte confiável, se a original estiver indisponível, quebrada ou tecnicamente inadequada; (3) interromper a execução sem gerar arte, se não houver fotografia real adequada. **Nunca substituir uma fotografia real por renderização arquitetônica, mockup, ilustração, infográfico, imagem conceitual, banco genérico, arte de divulgação ou imagem gerada por IA.**

Antes de gerar, verificar visualmente se a imagem mostra o fato, pessoa, objeto, procedimento ou ambiente real relacionado à reportagem. Termos como “projeto”, “render”, “renderização”, “conceito”, “simulação”, “maquete”, “ilustração”, “mockup” ou “imagem ilustrativa” são sinais de rejeição, não de aprovação. Uma renderização só pode ser usada se a matéria não tiver qualquer fotografia real e a tarefa solicitar explicitamente esse tipo de imagem — nunca no fluxo padrão desta skill. **Nunca gere arte com manchete inventada, exemplo didático, título de teste ou imagem-template.** Toda imagem precisa estar vinculada a uma matéria real previamente selecionada, com URL, título original e imagem correspondente conferidos. Se não houver matéria real e fotografia real adequada, interrompa a execução sem criar arquivo. O processo visual é:

```bash
python3 /home/ubuntu/skills/euvouserdoutor-automation/scripts/gerar_imagem.py \
  "URL_OU_ARQUIVO_DA_IMAGEM" "TÍTULO_COMPLETO" "/home/ubuntu/post_imagem_auto.jpg"
```

O script usa `templates/base1.png`, produz 1080×1350 px (4:5), aplica Open Sauce Sans Bold e inicia o texto em Y=980 sempre que a área segura permite. Ele reduz progressivamente a fonte, recalcula as quebras e divide palavras excepcionalmente longas para manter 100% da manchete visível. Nunca encurte o título apenas para fazê-lo caber.

## 6. Produzir a legenda no padrão oficial

Siga obrigatoriamente a sequência **CHAMAR ATENÇÃO → EXPLICAR → MOSTRAR O IMPACTO → ENCERRAR COM FORÇA**. Cada legenda deve ter quatro momentos claramente perceptíveis:

1. **Manchete:** primeira linha com `🚨`, curta, forte, informativa e sem esconder o fato principal. Use capitalização visual forte, sem hashtags, Markdown ou asteriscos;
2. **Descoberta e explicação:** primeiro bloco começando diretamente pelo que aconteceu, quem fez, como funciona e qual resultado foi observado. Use linguagem acessível, sem transformar a legenda em aula acadêmica;
3. **O impacto:** bloco iniciado obrigatoriamente por `O IMPACTO:` e dedicado a explicar por que a notícia importa, sem repetir o primeiro bloco;
4. **Fechamento memorável:** frase curta e otimista sobre ciência, tecnologia, educação ou inovação, adaptada à pauta e finalizada com `✨`. Não repita sempre a mesma frase.

Use poucos blocos, leitura rápida e bastante espaço visual, com três quebras de linha entre os blocos. A legenda deve parecer jornalística, acessível, surpreendente, otimista, científica e compartilhável, nunca um release institucional, artigo acadêmico, propaganda exagerada ou texto genérico produzido automaticamente. Não copie integralmente a reportagem e não invente fatos.

Gere-a pelo script:

```bash
python3 /home/ubuntu/skills/euvouserdoutor-automation/scripts/gerar_legenda.py \\
  "Título" "Resumo confirmado" "Achado central confirmado"
```

O script grava `legenda_final.txt` no diretório de execução. O resumo deve informar o que aconteceu e o achado central deve explicar o mecanismo, resultado ou detalhe confirmado na reportagem.

## 7. Validar antes de publicar

Abra visualmente `/home/ubuntu/post_imagem_auto.jpg` e confirme a correspondência com a matéria, título completo, legibilidade, contraste, ausência de cortes e posicionamento do texto na área escura inferior. Confirme também que a fonte da arte é uma **fotografia real da reportagem**, e não renderização, mockup, ilustração, imagem conceitual ou banco genérico. Se a imagem original estiver quebrada, partida, conceitual ou inadequada, procure uma fotografia real da mesma pauta em fonte confiável alternativa; nunca aceite a primeira imagem apenas porque ela está associada ao mesmo título.

Confirme que a legenda é específica, não contém `#`, `**` ou Markdown e mantém espaçamento triplo. Não faça publicação real durante testes.

## 8. Publicar uma pauta autorizada e registrar

Uma execução agendada ou explicitamente autorizada deve preparar **uma única publicação**. Os horários pertencem ao Agendado do Manus e não devem ser embutidos nesta skill.

O script mantém a integração atual: faz upload com `manus-upload-file`, mostra o payload e imprime o comando MCP de publicação. Execute a publicação somente quando a tarefa tiver autorização para isso; quando a tarefa tiver permissão para pular confirmações, não peça aprovação adicional. Não modifique a integração funcional sem necessidade.

Após a preparação, o script registra em `history.json` URL, fonte, título original, título usado, data, pilar, assunto, resumo semântico, gancho, score, Historical Fit Score, caminho da imagem e status. Após a confirmação de publicação, atualize o status e associe o identificador do Instagram. Depois, associe os Insights disponíveis ao registro.

Use o histórico para impedir URL repetida, título equivalente, mesma história em fonte diferente e saturação temática. Para aprendizagem, mantenha métricas por pilar e por tipo de gancho; dê preferência a padrões observados em múltiplos posts.

## 9. Testes mínimos após alterações

Execute, sem publicar:

```bash
python3 -m py_compile scripts/gerar_imagem.py scripts/gerar_legenda.py scripts/publish_post.py
python3 scripts/gerar_legenda.py "TÍTULO ORIGINAL DA MATÉRIA REAL" "RESUMO CONFIRMADO DA MATÉRIA REAL" "ACHADO CENTRAL CONFIRMADO"
python3 scripts/gerar_imagem.py "URL_OU_ARQUIVO_DA_IMAGEM_REAL" "TÍTULO ORIGINAL DA MATÉRIA REAL" "/tmp/euvouserdoutor-validacao.jpg"
python3 scripts/publish_post.py --dry-run
```

Substitua os valores entre aspas por dados de uma reportagem real selecionada e verificada. Não use placeholders, manchetes inventadas, `base1.png` como imagem de entrada ou textos contendo “teste”.

Confirme dimensões com `1080x1350`, valide títulos curtos e longos **somente usando uma matéria real e sua fotografia editorial original**, acentos, caracteres especiais, existência de `base1.png`, caminho da fonte, criação do registro e continuidade do contrato de `publish_post.py`. Faça também um teste de rejeição com uma renderização ou imagem conceitual: o fluxo deve interromper ou exigir uma fotografia real alternativa. Nunca use manchetes inventadas, textos como “teste” ou `base1.png` como se fossem fotos de reportagem. Não faça upload ou publicação real como parte desses testes.

## 10. Relatório da execução

Informe arquivos analisados e alterados, correções realizadas, funcionamento da antirrepetição, composição do score, influência do histórico, tratamento do título original, preservação de títulos longos, melhoria da legenda, localização do registro persistente, limitações técnicas e resultado de cada teste.
