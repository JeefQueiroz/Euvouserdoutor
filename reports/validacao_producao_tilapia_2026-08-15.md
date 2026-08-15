# Validação final em produção — 15/08/2026

URL validada: https://www.euvouserdoutor.com/noticias/fabrica-curativos-pele-tilapia-ceara-2026

Após o merge do PR #19, o deep link retornou HTTP 200 e carregou a matéria correta. O DOM exibiu categoria Inovação Médica, título, subtítulo, assinatura EuvouserDoutor - Jeff Queiroz, data 15/08/2026 às 11:07, imagem `/curativo_pele_tilapia_ceara_2026.jpg`, legenda e crédito. O corpo passou a renderizar integralmente, incluindo os subtítulos “Por que isso importa”, “Como o curativo é produzido”, “O que os estudos clínicos já mostraram”, “Por que a inovação começou no Ceará” e “O que vem agora”, a caixa de atenção e três fontes com links para IPEN, DOI 10.1097/PRS.0000000000007895 e ClinicalTrials.gov NCT04202289.

O JSON-LD foi confirmado no console como `NewsArticle`, com headline correto, autor e creator Jeff Queiroz apontando para `/autor/jeff-queiroz`, publisher EuvouserDoutor, imagem absoluta, `datePublished` e `dateModified` em `2026-08-15T11:07:00-03:00` e `mainEntityOfPage` correspondente ao deep link.

A inspeção visual confirmou o hero, a imagem editorial e o layout com barra lateral. O banner de cookies foi dispensado para permitir a leitura do corpo. O código utiliza classes responsivas Tailwind (`md`, `lg`, `xl`, grid de uma coluna no mobile e duas áreas no desktop) para reorganização em telas menores.

PRs envolvidos: #16 publicação inicial; #17 correção intermediária; #18 alinhamento de postId; #19 correção definitiva de renderização e metadados. O PR #19 passou CI, Vercel Preview e Vercel Production antes do merge.

Observação: a URL de teste incluiu query string de cache-busting (`?v=final3`); a rota canônica sem query é a indicada no início deste relatório.
