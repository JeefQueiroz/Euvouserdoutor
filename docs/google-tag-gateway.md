# Google Analytics, GTM e Google tag gateway

## O que foi preparado no código

O projeto usa Vite + React. As tags Google ficam centralizadas em:

```text
src/components/analytics/GoogleAnalytics.jsx
```

O componente é carregado uma única vez em:

```text
src/App.jsx
```

O `index.html` não contém IDs fixos de GTM ou GA4.

## Variáveis de ambiente

```env
VITE_GTM_ID=GTM-KBWF8HDL
VITE_GA4_ID=G-EY5PML2YXQ
VITE_GOOGLE_TAG_GATEWAY_PATH=
VITE_ENABLE_ANALYTICS_DEV=false
```

## Fluxo atual

- Se `VITE_GTM_ID` existir, o site carrega GTM.
- Se `VITE_GTM_ID` existir, GA4 direto não é carregado por padrão para evitar duplicidade.
- Se `VITE_GTM_ID` estiver vazio e `VITE_GA4_ID` existir, o site carrega GA4 direto.
- Em desenvolvimento, analytics não carrega, salvo se `VITE_ENABLE_ANALYTICS_DEV=true`.

Recomendação: configurar GA4 dentro do container GTM para evitar pageviews duplicados.

## Google tag gateway

O gateway ainda não está ativo apenas com este código.

Pela documentação oficial, Google tag gateway for advertisers exige infraestrutura first-party no domínio do site, via CDN, load balancer ou web server capaz de encaminhar requests aos serviços do Google.

Em Vercel pura, não foi criado rewrite/proxy porque isso exigiria endpoint e configuração oficial validados. Não inventar destination.

Depois que o caminho first-party for configurado oficialmente, preencha:

```env
VITE_GOOGLE_TAG_GATEWAY_PATH=/scripts
```

Com isso, o componente passa a carregar os scripts por caminho same-origin:

```text
/scripts/gtm.js?id=...
/scripts/gtag/js?id=...
```

Sem essa variável, usa endpoint oficial padrão:

```text
https://www.googletagmanager.com
```

## Como testar

### Local

Por padrão, analytics não carrega em dev.

Para testar localmente:

```env
VITE_ENABLE_ANALYTICS_DEV=true
VITE_GTM_ID=GTM-KBWF8HDL
```

Rode:

```bash
pnpm dev
```

### Produção

1. Configure as variáveis na Vercel.
2. Faça deploy.
3. Abra DevTools → Network.
4. Procure:
   - `gtm.js`
   - `gtag/js`, apenas se GTM estiver vazio e GA4 direto estiver ativo
5. Use Google Tag Assistant para validar disparos.

### Gateway futuro

Quando `VITE_GOOGLE_TAG_GATEWAY_PATH` estiver configurado, Network deve mostrar requests saindo do próprio domínio:

```text
https://www.euvouserdoutor.com/<path>/gtm.js
```

Se os requests retornarem 404, o caminho first-party/CDN ainda não está configurado.
