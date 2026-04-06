# X-RAY Core Engine

## 1) Prompt definitivo "X-RAY Core Engine"
O mini app já usa o prompt base em `src/xray/prompt.ts` (`XRAY_CORE_ENGINE_PROMPT`) com regras completas de:
- consistência de natureza do sujeito (biológico, mecânico, híbrido, abstrato)
- preservação de morfologia externa
- tratamento radiográfico de cabelo/fios
- estética radiográfica cinematográfica 1:1

## 2) Sistema de raridade inteligente e determinístico
Implementado em `src/xray/rarity.ts`:
- hash FNV-1a determinístico
- seed estável por `fid + referência da imagem`
- tier automático por score:
- `Legendary`: top 0.50%
- `Epic`: top 3.50%
- `Rare`: top 11.00%
- `Common`: restante

## 3) Arquitetura técnica
Fluxo completo:
1. Front (`app/page.tsx`) captura sujeito (PFP Farcaster ou upload manual)
2. Front envia payload para `POST /api/xray/[fid]`
3. API resolve natureza do sujeito (`manual` ou `auto` por heurística)
4. API aplica prompt final + seed determinístico + raridade
5. API gera imagem no provider gratuito
6. API retorna `image + metadata + analysis + rarity + capabilities`
7. Front prepara mint (`IPFS + signature + unicidade`) e chama `mintXRay`

## 4) API pronta para produção
Implementada em `app/api/xray/[fid]/route.ts` com:
- validação de entrada
- timeout com `AbortController`
- mensagens de erro seguras
- JSON de retorno padronizado
- `dynamic = 'force-dynamic'`
- endpoint de health: `GET /api/xray/health`

Além disso, existe `POST /api/mint/prepare/[fid]` para:
- verificar unicidade real por `tokenURI(fid)` on-chain
- persistir imagem e metadata no IPFS (Pinata)
- assinar payload para `mintXRay(fid, url, signature)`

## 5) Modelo de metadata NFT
Retornado pela API no formato:
- `name`
- `description`
- `image` (data URL)
- `external_url`
- `attributes` (FID, Class, Rarity, Score, Collection, Network, Generator)

## 6) Estrutura de coleção
Definida em `src/xray/collection.ts`:
- name: `X-RAY Core Engine`
- symbol: `XRAY`
- network: `Base`
- maxSupply: `1000`
- distribuição de raridade explícita

## 7) Roadmap estratégico
Fase 1 (agora):
- geração gratuita ativa
- raridade determinística ativa
- metadata padrão NFT ativa

Fase 2:
- storage persistente de metadata (IPFS + pinning)
- endpoint dedicado de metadata por token
- painel de analytics de geração/mint

Fase 3:
- integração com provider vision img2img pago (maior fidelidade morfológica)
- contratos com `safeMint(to, tokenURI)` ou equivalente
- coleção totalmente dinâmica on-chain/off-chain híbrida

## Viabilidade gratuita
Viável no modo atual com geração gratuita via provider sem chave e custo de geração `USD 0`.
Limite técnico: sem provider vision/img2img pago, a fidelidade de preservação pixel-perfect da morfologia do sujeito é parcial (prompt-guided + source hints).
