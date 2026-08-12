import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Sparkles, TrendingUp, Filter } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { SafeImage } from '../components/SafeImage';

export const News = ({ setView }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Saúde Pública', 'Saúde & Ciência', 'Tecnologia Médica', 'Técnicas de estudo', 'Neurologia', 'Rotina', 'Revisão'];

  const posts = [
    {
      id: "post_prep_mensal_mk8527_2026",
      title: "PrEP Mensal: Comprimido Único Contra HIV Avança para Fase Final com Testes no Brasil",
      subtitle: "Estudo global avalia o MK-8527, novo antirretroviral de longa duração que promete simplificar a prevenção do HIV e aumentar a adesão ao tratamento preventivo.",
      cat: "Saúde Pública",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200",
      target: "post_prep_mensal_mk8527_2026",
      featured: true,
    },
    {
      id: "sensor_levitante_cerebral_2026",
      title: "Sensor Quântico Levitante Consegue Detectar Atividade Cerebral Ultra-Fraca",
      subtitle: "Estudo publicado na Nature revela magnetômetro de ímã levitado à temperatura ambiente que atinge sensibilidade sem precedentes, rivalizando com criogenia avançada.",
      cat: "Tecnologia Médica",
      date: "12 Ago 2026",
      readTime: "6 min",
      img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1200",
      target: "post_sensor_levitante_cerebral_2026",
      featured: false,
    },
    {
      id: "cintura_imc_2026",
      title: "Tamanho da Cintura é Melhor que o IMC para Prever Risco Cardíaco, Revela Estudo com 260 Mil Pessoas",
      subtitle: "Pesquisa publicada no JACC mostra que gordura abdominal identifica perigos ao coração mesmo em quem tem peso considerado normal; entenda os novos limites.",
      cat: "Saúde Pública",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "https://images.unsplash.com/photo-1506467681486-112bcc119db4?auto=format&fit=crop&q=80&w=1200",
      target: "post_cintura_imc_2026",
      featured: false,
    },
    {
      id: "post_hearing_gene_therapy_2026",
      title: "Terapia Gênica Restaura Audição Natural em Crianças e Adultos Surdos, Revela Estudo Histórico na Nature",
      subtitle: "Pesquisa multicêntrica publicada na Nature e Nature Medicine demonstra recuperação auditiva duradoura de até 2,5 anos em pacientes com surdez congênita relacionada ao gene OTOF.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
      target: "post_hearing_gene_therapy_2026",
      featured: false,
    },
        {
          id: "ebola_outbreak_drc_2026",
          title: "Ebola: OMS Emite Alerta Urgente Sobre Segunda Maior Epidemia da História; Mortes Superam 2 Mil",
          subtitle: "Diretor-Geral da OMS afirma que surto na República Democrática do Congo avança em ritmo sem precedentes e pode se tornar o mais letal já registrado se o financiamento não chegar.",
          cat: "Saúde Pública",
          date: "12 Ago 2026",
          readTime: "8 min",
          img: "/assets/ebola_outbreak_2026/ebola_hero.jpg",
          target: "post_ebola_outbreak_drc_2026",
          featured: false,
        },
        {
          id: "ai_oncology_lymphoma_2026",
          title: "IA na Oncologia: Novo Modelo de Machine Learning Personaliza Tratamento de Linfoma e Evita Superdosagem",
          subtitle: "Estudo publicado na Science Partner Journals revela que algoritmo consegue identificar quais pacientes realmente se beneficiam da terapia de manutenção com rituximabe, reduzindo riscos e custos.",
          cat: "Saúde & Ciência",
          date: "12 Ago 2026",
          readTime: "8 min",
          img: "/assets/ai_oncology_2026/ai_oncology_hero.png",
          target: "post_ai_oncology_lymphoma_2026",
          featured: false,
        },
        {
          id: "silicosis_engineered_stone_2026",
          title: "Alerta de Saúde: Bancadas de Quartzo Causam Surto de Doença Pulmonar Fatal em Trabalhadores",
          subtitle: "Estudo publicado no NEJM revela centenas de casos de silicose grave e dezenas de mortes ligadas ao corte de pedras artificiais; especialistas pedem proibição do material.",
          cat: "Saúde Pública",
          date: "12 Ago 2026",
          readTime: "7 min",
          img: "/knee_mri_ai_2026.jpg",
          target: "post_silicosis_engineered_stone_2026",
          featured: false,
        },
        {
          id: "ai_knee_mri_2026",
          title: "IA reduz em 55% o tempo da ressonância do joelho sem perder qualidade em estudo",
          subtitle: "Pesquisa prospectiva na Scientific Reports combinou compressão assistida por inteligência artificial e reconstrução por deep learning; resultado ainda é de viabilidade e não substitui a avaliação de radiologistas.",
          cat: "Tecnologia Médica",
          date: "12 Ago 2026",
          readTime: "7 min",
          img: "/knee_mri_ai_2026.jpg",
          target: "post_ai_knee_mri_2026",
          featured: false,
        },
        {
          id: "promote_polipilula_avc_2026",
          title: "Brasil testa polipílula para prevenir AVC e declínio cognitivo em mais de 8 mil pessoas",
          subtitle: "Ensaio clínico de fase 3 compara cápsula com três medicamentos e cuidado habitual; pesquisa ainda não tem resultados finais nem transforma a combinação em tratamento disponível.",
          cat: "Saúde Pública",
          date: "12 Ago 2026",
          readTime: "7 min",
          img: "/promote_avc_wikimedia_ccby.png",
          target: "post_promote_polipilula_avc_2026",
          featured: false,
        },
        {
          id: "anvisa_plataformas_medicamentos_regulacao_2026",
          title: "Anvisa revoga bloqueios a apps de remédios, mas venda ainda depende de novas regras",
          subtitle: "Nota da agência esclarece que iFood, Rappi, Mercado Livre e outras plataformas continuam sujeitas à regulamentação sanitária; a mudança não libera automaticamente a comercialização.",
          cat: "Saúde Pública",
          date: "12 Ago 2026",
          readTime: "6 min",
          img: "/medicamentos_plataformas_regulacao_2026.png",
          target: "post_anvisa_plataformas_medicamentos_regulacao_2026",
          featured: false,
        },
    {
      id: "hiv_vaccine_breakthrough_2026",
      title: "Vacina contra HIV: Estudo na Nature revela avanço histórico na produção de anticorpos potentes",
      subtitle: "Pesquisa em primatas demonstra que nova estratégia consegue 'treinar' o sistema imune para combater variantes globais do vírus; descoberta aproxima ciência da vacina definitiva.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/assets/hiv_vaccine_2026/hiv_hero.jpg",
      target: "post_hiv_vaccine_breakthrough_2026",
      featured: false,
    },
    {
      id: "huntington_msh3_study_2026",
      title: "Bloqueio Genético: Cientistas Conseguem Interromper Avanço da Doença de Huntington em Estudo Histórico",
      subtitle: "Pesquisa publicada na revista Science revela que o silenciamento do gene MSH3 impede a expansão de mutações tóxicas no cérebro, abrindo caminho para tratamentos que podem adiar a doença por décadas.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/assets/huntington_study_2026/huntington_hero.jpg",
      target: "post_huntington_msh3_study_2026",
      featured: false,
    },
    {
      id: "broccoli_ataxia_study_2026",
      title: "Brócolis contra Ataxia: Composto Natural Pode Tratar Doença Neurológica Rara, Revela Estudo",
      subtitle: "Pesquisadores da Universidade Swinburne descobrem que o sulforafano, presente no vegetal, aumenta níveis de proteína essencial e protege neurônios em pacientes com Ataxia de Friedreich.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/assets/broccoli_study_2026/broccoli_hero.jpg",
      target: "post_broccoli_ataxia_study_2026",
      featured: false,
    },
    {
      id: "brain_stimulation_genes_2026",
      title: "Marca-passo Cerebral Ativa 'Programas Genéticos' Ocultos para Curar o Cérebro",
      subtitle: "Estudo histórico na Nature revela que a estimulação elétrica profunda (DBS) modula 611 genes em células específicas, abrindo caminho para tratamentos personalizados de Parkinson e depressão.",
      cat: "Neurociência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/assets/dbs_study_2026/dbs_hero.jpg",
      target: "post_brain_stimulation_genes_2026",
      featured: false,
    },
    {
      id: "anemia_eye_ai_2026",
      title: "IA analisa vasos do olho e estima anemia sem coleta de sangue em estudo",
      subtitle: "Tecnologia Video-to-Vessels avaliou vídeos de 224 pessoas e teve AUC de 82,8%; resultado é experimental e ainda não substitui hemograma.",
      cat: "Tecnologia Médica",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/anemia_eye_ai_2026.png",
      target: "post_anemia_eye_ai_2026",
      featured: false,
    },
    {
      id: "ringconn_nature_study_2026",
      title: "Anéis Inteligentes: Estudo na Nature Revela que Monitoramento em Duas Mãos Aumenta Precisão Cardíaca",
      subtitle: "Pesquisa histórica com quase 100 mil amostras valida eficácia de dispositivos vestíveis para acompanhamento contínuo da saúde cardiovascular e detecção de riscos.",
      cat: "Tecnologia Médica",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/assets/ringconn_study_2026/ringconn_gen3_main.webp",
      target: "post_ringconn_nature_study_2026",
      featured: false,
    },
    {
      id: "neo_brain_implant_2026",
      title: "Implante Cerebral 'NEO' Recebe Primeira Aprovação Comercial para Tratar Tetraplegia",
      subtitle: "Dispositivo chinês de interface cérebro-computador (BCI) permite que pacientes com lesões medulares recuperem movimentos das mãos e autonomia; tecnologia marca o início da era comercial da neurotecnologia.",
      cat: "Tecnologia Médica",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/neo_device_schematic_2026.png",
      target: "post_neo_brain_implant_2026",
      featured: false,
    },
    {
      id: "pfas_microplastics_removal_2026",
      title: "'Limpeza' de Sangue: Procedimento Médico Consegue Remover Microplásticos e PFAS do Corpo Humano",
      subtitle: "Estudo publicado no Journal of Clinical Apheresis revela que técnica usada para colesterol reduz em 60% a presença de contaminantes ambientais no sangue.",
      cat: "Inovação Médica",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/pfas_microplastics_blood_2026.jpg",
      target: "post_pfas_microplastics_removal_2026",
      featured: false,
    },
    {
      id: "microbiota_psicopatia_2026",
      title: "As Bactérias da 'Maldade'? Estudo Liga Microbiota a Traços de Psicopatia",
      subtitle: "Pesquisa na Translational Psychiatry revela que micróbios no intestino e na boca podem influenciar comportamentos como impulsividade e falta de empatia.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/microbiota_psicopatia_2026.webp",
      target: "post_microbiota_psicopatia_2026",
      featured: false,
    },
    {
      id: "chip_eny_unb_2026",
      title: "Tecnologia Brasileira de 'Órgão em Chip' Promete Fim dos Testes em Animais",
      subtitle: "Desenvolvida na UnB, a plataforma Chip-Eny cultiva células em 3D para simular o organismo humano com precisão inédita, acelerando a descoberta de novos medicamentos.",
      cat: "Tecnologia Médica",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/chip_eny_unb_2026.png",
      target: "post_chip_eny_unb_2026",
      featured: false,
    },
    {
      id: "ozempic_brain_addiction_2026",
      title: "Além do Peso: Ozempic 'Desliga' o Centro de Vício no Cérebro, Revela Estudo",
      subtitle: "Pesquisadores identificam o septo lateral como o ponto de controle onde medicamentos para emagrecer atuam para reduzir o desejo por álcool e drogas; descoberta pode revolucionar o tratamento de vícios.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/ozempic_brain_lateral_septum.jpg",
      target: "post_ozempic_brain_addiction_2026",
      featured: false,
    },
    {
      id: "ucla_blood_test_2026",
      title: "Exame de sangue experimental identifica sinais de vários cânceres em um único teste",
      subtitle: "Método da UCLA analisou padrões de metilação do DNA em 1.061 amostras; resultado é promissor, mas ainda não substitui exames de rastreamento.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/methylscan_blood_test_2026.png",
      target: "post_ucla_blood_test_2026",
      featured: false,
    },
    {
      id: "parkinson_brain_rhythm_dbs_2026",
      title: "Ritmo Cerebral 'Oculto' é a Chave para o Sucesso do Marca-passo Cerebral no Parkinson",
      subtitle: "Descoberta inédita identifica a frequência exata (20-35 Hz) que coordena a melhora dos sintomas; estudo abre caminho para tratamentos personalizados.",
      cat: "Neurologia",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/parkinson_brain_rhythm_dbs.jpg",
      target: "post_parkinson_brain_rhythm_dbs_2026",
      featured: false,
    },
    {
      id: "omega3_cancer_nk_2026",
      title: "Omega-3 Pode 'Sabotar' Tratamento de Câncer, Revela Estudo na Science",
      subtitle: "Pesquisa inédita mostra que certos ácidos graxos inibem a ação de células de defesa e reduzem a eficácia da imunoterapia em tumores de cólon; entenda o mecanismo.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/omega3_cancer_nk_cells.jpg",
      target: "post_omega3_cancer_nk_2026",
      featured: false,
    },
    {
      id: "alzheimer_surgery_dcLVA_2026",
      title: "Cirurgia Controversa de Alzheimer: Ciência Investiga Procedimento que Promete Reverter Sintomas",
      subtitle: "Técnica de 'limpeza cerebral' através de microcirurgia no pescoço gera debate na comunidade médica após vídeos de recuperações surpreendentes; Nature detalha o que se sabe até agora.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "9 min",
      img: "/assets/dbs_study_2026/dbs_hero.jpg",
      target: "post_alzheimer_surgery_dcLVA_2026",
      featured: false,
    },
        {
          id: "fit_cancer_colorretal_sus_2026",
          title: "SUS passa a usar teste de fezes para rastrear câncer colorretal antes dos sintomas",
          subtitle: "O exame imunoquímico fecal será referência para pessoas assintomáticas de 50 a 75 anos; resultado positivo exige investigação, geralmente com colonoscopia.",
          cat: "Saúde Pública",
          date: "12 Ago 2026",
          readTime: "7 min",
          img: "/fit_rastreamento_cancer_colorretal_2026.png",
          target: "post_fit_cancer_colorretal_sus_2026",
          featured: false,
        },

    {
      id: "fnip1_gene_metabolism_2026",
      title: "Descoberto o 'Gene da Magreza': Mutação Rara no FNIP1 Reduz em 60% o Risco de Doenças Metabólicas",
      subtitle: "Estudo histórico com 1 milhão de pessoas publicado na Nature identifica variante genética que protege contra obesidade e diabetes ao acelerar a queima de energia.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/fnip1_gene_metabolism.jpg",
      target: "post_fnip1_gene_metabolism_2026",
      featured: false,
    },
    {
      id: "in_vivo_car_t_mrna_2026",
      title: "Nanopartícula de mRNA cria células CAR-T dentro do corpo em estudo pré-clínico",
      subtitle: "Pesquisa publicada na Nature Materials desenvolveu um veículo que entrega mRNA a células T e gerou CAR-T em modelos de câncer e fibrose; testes em pessoas ainda não começaram.",
      cat: "Tecnologia Médica",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/in_vivo_car_t_mrna_2026.jpg",
      target: "post_in_vivo_car_t_mrna_2026",
      featured: false,
    },
    {
      id: "wool_bone_regeneration_2026",
      title: "Lã de Ovelha: O Novo 'Ouro' da Medicina Regenerativa para Ossos",
      subtitle: "Estudo do King's College London revela que a queratina extraída da lã supera o colágeno na regeneração de tecidos ósseos, criando estruturas mais fortes e organizadas.",
      cat: "Tecnologia Médica",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/wool_bone_regeneration.jpg",
      target: "post_wool_bone_regeneration_2026",
      featured: false,
    },
    {
      id: "fibromyalgia_genetics_2026",
      title: "Fibromialgia é um Transtorno do Sistema Nervoso Central, Comprova Estudo com 2,5 Milhões de Pessoas",
      subtitle: "Pesquisa histórica publicada na Nature Medicine identifica 2 risk loci e revela que a arquitetura genética da doença é idêntica entre homens e mulheres, apesar da diferença na prevalência.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "9 min",
      img: "/fibromyalgia_genetics_brain.jpg",
      target: "post_fibromyalgia_genetics_2026",
      featured: false,
    },
    {
      id: "origins_life_double_2026",
      title: "A Vida Começou Duas Vezes? Nova Descoberta Desafia a Origem da Biologia na Terra",
      subtitle: "Estudo publicado na Science Advances revela que bactérias e arqueias evoluíram para a vida independente de forma separada; descoberta sugere que LUCA não era uma célula livre.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/origin_of_life_double.jpg",
      target: "post_origins_life_double_2026",
      featured: false,
    },
    {
      id: "measles_americas_2026",
      title: "Sarampo dispara nas Américas e Brasil reforça vacinação; veja quem precisa se proteger",
      subtitle: "Região chegou a 47.459 casos confirmados e 44 mortes em 2026; no Brasil, o Ministério da Saúde ampliou a vacinação em três municípios paulistas.",
      cat: "Saúde Pública",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/sarampo_vacinacao_americas_2026.jpg",
      target: "post_measles_americas_2026",
      featured: false,
    },
    {
      id: "amiloride_wfdc2_2026",
      title: "Medicamento Comum para Pressão Pode Tratar Doença Respiratória Fatal, Revela Nature",
      subtitle: "Estudo publicado na Nature Communications identifica mutação no gene WFDC2 como causa de insuficiência respiratória grave e aponta a Amilorida como solução terapêutica promissora.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/amiloride_lung_breakthrough.jpg",
      target: "post_amiloride_wfdc2_2026",
      featured: false,
    },
    {
      id: "paternal_diet_usp_2026",
      title: "Você é o que seu pai comeu: Dieta paterna de ultraprocessados altera genes do bebê, revela USP",
      subtitle: "Estudo inédito da FMRP-USP em Ribeirão Preto mostra que o consumo de alimentos industrializados pelos pais antes da concepção afeta o peso e o acúmulo de gordura dos recém-nascidos via epigenética.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "8 min",
      img: "/paternal_diet_epigenetics.jpg",
      target: "post_paternal_diet_usp_2026",
      featured: false,
    },
    {
      id: "oral_glp1_pill_2026",
      title: "Nova Pílula Oral GLP-1 Promove Até 12% de Perda de Peso em Ensaio Clínico de Fase 2",
      subtitle: "Estudo publicado na Nature Medicine demonstra que o aleniglipron, agonista oral de pequenas moléculas, oferece eficácia comparável a injetáveis com a vantagem de fabricação escalável e uso diário simplificado.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/oral_glp1_pill_tech.jpg",
      target: "post_oral_glp1_pill_2026",
      featured: false,
    },
        {
          id: "daraxonrasib_2026",
          title: "Pílula Inovadora Duplica Sobrevida em Câncer de Pâncreas Metastático",
          subtitle: "Resultados do estudo RASolute 302, publicados no NEJM, revelam avanço histórico com inibidor oral que reduz risco de morte em 60%.",
          cat: "Saúde & Ciência",
          date: "11 Ago 2026",
          readTime: "8 min",
          img: "/daraxonrasib_pill_tech.jpg",
          target: "post_daraxonrasib_2026",
          featured: false,
        },
        {
          id: "angiotomografia_coronariana_sus_2026",
          title: "SUS Avalia Inclusão de Exame que Identifica Risco de Infarto de Forma Não Invasiva",
          subtitle: "Conitec abre consulta pública para angiotomografia coronariana; tecnologia pode transformar o diagnóstico de doenças cardíacas, que causam 300 mil mortes por ano no Brasil.",
          cat: "Saúde & Ciência",
          date: "12 Ago 2026",
          readTime: "8 min",
          img: "/angiotomografia_coronariana_sus.jpg",
          target: "post_angiotomografia_coronariana_sus_2026",
          featured: false,
        },
    {
      id: "gel_unicamp_chica_2026",
      title: "Gel de Planta Brasileira Cicatriza Feridas 2x Mais Rápido, Revela Estudo da Unicamp",
      subtitle: "Desenvolvido a partir da 'chica', fitoterápico inovador acelera a cura de feridas graves e mucosite oral em pacientes com câncer, superando a eficácia do laser.",
      cat: "Saúde & Ciência",
      date: "12 Ago 2026",
      readTime: "7 min",
      img: "/gel_unicamp_chica.jpg",
      target: "post_gel_unicamp_chica_2026",
      featured: false,
    },
    {
      id: "leukemia_gene_therapy_2026",
      title: "Terapia Genética 'Pronta para Uso' Elimina Leucemia Incurável em 64% dos Pacientes",
      subtitle: "Estudo clínico do Great Ormond Street Hospital, publicado no NEJM, utiliza edição de base para criar células imunes universais que superam o câncer resistente.",
      cat: "Saúde & Ciência",
      date: "11 Ago 2026",
      readTime: "7 min",
      img: "/gene_therapy_leukemia_2026.jpg",
      target: "post_leukemia_gene_therapy_2026",
      featured: false,
    },
    {
      id: "lens_3d_waterloo_2026",
      title: "Lentes de Contato Impressas em 3D em 20 Minutos: A Revolução da Universidade de Waterloo",
      subtitle: "Nova plataforma de manufatura digital combina silicone hidrofílico e impressão DLP para criar lentes personalizadas em uma única consulta, transformando o tratamento de córneas irregulares.",
      cat: "Tecnologia Médica",
      date: "12 Ago 2026",
      readTime: "6 min",
      img: "/3d_printed_lens_tech.jpg",
      target: "post_lens_3d_waterloo_2026",
      featured: false,
    },
    {
      id: "coffee_brain_2026",
      title: "Café sem Açúcar: Estudo Revela Como a Bebida Fortalece Conexões Neurais e Protege o Cérebro",
      subtitle: "Pesquisa de longo prazo com 130 mil pessoas e análises de neuroimagem da Johns Hopkins confirmam que o café puro atua como um 'escudo' para o cérebro, reorganizando redes neurais para maior eficiência.",
      cat: "Saúde & Ciência",
      date: "11 Ago 2026",
      readTime: "7 min",
      img: "/parkinson_brain_rhythm_dbs.jpg",
      target: "post_coffee_brain_2026",
      featured: false,
    },
    {
      id: "transplante_fecal_amendoim_2026",
      title: "Transplante Fecal Eleva Tolerância ao Amendoim em Estudo Clínico Inovador",
      subtitle: "Procedimento experimental demonstra que a transferência de microbiota de doadores saudáveis pode mitigar reações alérgicas severas em adultos.",
      cat: "Saúde & Ciência",
      date: "11 Ago 2026",
      readTime: "7 min",
      img: "/microbiota_psicopatia_2026.webp",
      target: "post_transplante_fecal_amendoim_2026",
      featured: false,
    },
    {
      id: "estudar_medicina",
      title: "Como Estudar para Medicina com Método e Constância",
      subtitle: "Um guia editorial sobre rotina, revisão e organização para transformar esforço em processo de estudo.",
      cat: "Rotina",
      date: "10 Ago 2026",
      readTime: "12 min",
      img: "/jeff-queiroz-eu-vou-ser-doutor.png",
      target: "post_estudar_medicina",
      featured: false,
    },
    {
      id: "cart_brasil_2026",
      title: "Terapia CAR-T 100% Nacional Atinge 72% de Remissão em Cânceres Avançados do Sangue",
      subtitle: "Inovação biotecnológica brasileira abre caminho para o acesso a tratamentos genéticos de ponta no SUS com custo reduzido.",
      cat: "Tecnologia Médica",
      date: "10 Ago 2026",
      readTime: "8 min",
      img: "/in_vivo_car_t_mrna_2026.jpg",
      target: "post_cart_brasil_2026",
      featured: false,
    },
    {
      id: "ebola_oxford_2026",
      title: "Oxford Inicia Ensaio Clínico de Vacina Contra o Vírus Ebola",
      subtitle: "Estudo de Fase 1 avaliará a segurança e a resposta imune do novo imunizante ChAdOx1 BDBV em voluntários saudáveis.",
      cat: "Saúde Pública",
      date: "09 Ago 2026",
      readTime: "6 min",
      img: "/sarampo_vacinacao_americas_2026.jpg",
      target: "post_ebola_oxford_2026",
      featured: false,
    },
    {
      id: "polilaminina",
      title: "Polilaminina: A Proteína Brasileira que Pode Revolucionar a Regeneração Neural",
      subtitle: "Descoberta na UFRJ, a substância demonstra capacidade inédita de guiar o crescimento de neurônios em lesões medulares e cerebrais.",
      cat: "Neurologia",
      date: "08 Ago 2026",
      readTime: "9 min",
      img: "/fibromyalgia_genetics_brain.jpg",
      target: "post_polilaminina",
      featured: false,
    },
    {
      id: "pomodoro",
      title: "Técnica Pomodoro: Como Blocos de Foco Podem Salvar sua Rotina de Estudos",
      subtitle: "Entenda a ciência por trás dos ciclos de 25 minutos e como aplicá-los para manter o alto rendimento sem esgotamento mental.",
      cat: "Técnicas de estudo",
      date: "07 Ago 2026",
      readTime: "5 min",
      img: "/jeff-queiroz-eu-vou-ser-doutor.png",
      target: "post_pomodoro",
      featured: false,
    },
    {
      id: "spaced_repetition",
      title: "Revisão Espaçada: O Segredo para Nunca Mais Esquecer o que Estudou",
      subtitle: "Como o uso de algoritmos de repetição e flashcards pode otimizar a curva do esquecimento e garantir a memorização de longo prazo.",
      cat: "Revisão",
      date: "07 Ago 2026",
      readTime: "7 min",
      img: "/jeff-queiroz-eu-vou-ser-doutor.png",
      target: "post_spaced_repetition",
      featured: false,
    },
    {
      id: "feynman",
      title: "Método Feynman: Se Você Não Sabe Explicar, Você Não Entendeu",
      subtitle: "A técnica do Nobel de Física que ajuda estudantes de medicina a dominar temas complexos através da simplificação radical.",
      cat: "Técnicas de estudo",
      date: "06 Ago 2026",
      readTime: "4 min",
      img: "/chip_eny_unb_2026.png",
      target: "post_feynman",
      featured: false,
    },
    {
      id: "mind_maps",
      title: "Mapas Mentais: Conectando os Pontos da Anatomia e Fisiologia",
      subtitle: "Como o pensamento radiante e a organização visual podem substituir resumos lineares e ineficientes.",
      cat: "Técnicas de estudo",
      date: "05 Ago 2026",
      readTime: "5 min",
      img: "/jeff-queiroz-eu-vou-ser-doutor.png",
      target: "post_mind_maps",
      featured: false,
    },
    {
      id: "self_evaluation",
      title: "Autoavaliação: Transformando Erros em Pontos de Aprovação",
      subtitle: "O guia definitivo para analisar simulados e criar um plano de estudo baseado em dados reais de desempenho.",
      cat: "Rotina",
      date: "04 Ago 2026",
      readTime: "5 min",
      img: "/jeff-queiroz-eu-vou-ser-doutor.png",
      target: "post_self_evaluation",
      featured: false,
    }
  ];

  const filteredPosts = selectedCategory === 'Todas' 
    ? posts 
    : posts.filter(post => post.cat === selectedCategory);

  const featuredPost = posts.find(p => p.featured);
  const recentPosts = filteredPosts.filter(p => !p.featured).slice(0, 3);
  const otherPosts = filteredPosts.filter(p => !p.featured).slice(3);

  return (
    <div className="bg-[#080A0F] text-[#F8FAFC] min-h-screen pb-24 text-left">
      {/* Editorial Header */}
      <div className="bg-[#0A192F] border-b border-white/[0.05] pt-16 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(79,140,255,0.15),transparent_40%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-px bg-[#4F8CFF]"></span>
            <span className="text-[10px] font-black text-[#4F8CFF] uppercase tracking-[0.4em]">Editorial Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-[#F8FAFC] mb-8">
            Notícias <span className="text-white/20">&</span> Insights
          </h1>
          <p className="text-lg md:text-xl text-[#98A2B3] font-medium max-w-2xl leading-relaxed">
            Explorando as fronteiras da medicina, ciência e tecnologia para acelerar sua jornada acadêmica.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-12 bg-[#11141A] p-2 rounded-[28px] border border-white/[0.05] w-fit shadow-2xl">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedCategory === cat 
                ? 'bg-[#4F8CFF] text-white shadow-[0_0_20px_rgba(79,140,255,0.4)]' 
                : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 xl:col-span-9 space-y-12">
            {/* Featured Post */}
            {featuredPost && selectedCategory === 'Todas' && (
              <div 
                onClick={() => setView(featuredPost.target)}
                className="group cursor-pointer relative rounded-[48px] overflow-hidden border border-white/[0.05] bg-[#11141A] hover-lift transition-all duration-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-[4/3] md:aspect-auto overflow-hidden relative">
                    <SafeImage 
                      src={featuredPost.img} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#11141A] via-transparent to-transparent opacity-60 hidden md:block" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 text-[#4F8CFF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                        {featuredPost.cat}
                      </span>
                      <span className="text-[10px] text-[#98A2B3] font-black uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} /> {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-white group-hover:text-[#4F8CFF] transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-[#98A2B3] text-lg leading-relaxed line-clamp-3 font-medium">
                      {featuredPost.subtitle}
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <TrendingUp size={18} className="text-[#4F8CFF]" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Matéria em Destaque</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {(selectedCategory === 'Todas' ? [...recentPosts, ...otherPosts] : filteredPosts).map((post, idx) => (
                <div 
                  key={post.id}
                  onClick={() => setView(post.target)}
                  className="group cursor-pointer bg-[#11141A] rounded-[40px] border border-white/[0.05] overflow-hidden hover-lift transition-all duration-500 flex flex-col h-full"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <SafeImage 
                      src={post.img} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                        {post.cat}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow space-y-4">
                    <div className="flex items-center justify-between text-[9px] font-black text-[#98A2B3] uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Clock size={10} /> {post.readTime}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-xl font-black text-white leading-tight group-hover:text-[#4F8CFF] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#98A2B3] text-sm leading-relaxed line-clamp-3 font-medium flex-grow">
                      {post.subtitle}
                    </p>
                    <div className="pt-6 flex items-center gap-2 text-[9px] font-black text-[#4F8CFF] uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                      Ler Matéria Completa <ArrowRight size={14} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 xl:col-span-3">
            <Sidebar setView={setView} />
          </div>
        </div>
      </div>
    </div>
  );
};
