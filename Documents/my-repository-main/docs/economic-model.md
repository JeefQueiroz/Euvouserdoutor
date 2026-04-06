# XRAY Economic Model v1.1 — Launch Phase

> Documento vivo. Última atualização: Mar 2026  
> Princípio: **Conservador. Previsível. Estável.**

---

## A) Reward Engine

```
UserReward = (User_Stake / Total_Staked) * Daily_Reward_Pool
```

- Pool diária **conservadora**: máx 0.05%–0.1% do supply por dia
- Se supply = 20M → reservar 30% (6M) para rewards ao longo de 24–36 meses
- **Sem decay nos primeiros 3 meses** — reward estável construói confiança
- Avaliar redução suave (0.95^mês) após mês 3, quando base de holders estiver solid

---

## B) Vesting no Claim (Launch Phase)

```
30% imediato
70% linear em 7 dias
```

> Mais conservador que o modelo genérico (50/50).  
> Moeda nova = pressão de venda inicial é o maior risco.  
> Migrar para 50/50 quando TVL estiver saudável.

---

## C) Token Sinks

| Sink | Detalhe | Status |
|---|---|---|
| Unstake fee | 2% fixo: 1% burn + 1% treasury | ✅ Ativo desde dia 1 |
| Spin pago | 50 XRAY fixo, imutável | ⏸ Pausado — ativar quando TVL saudável + holders > 500 |
| Boost temporário | +5% por 7 dias, custo fixo | ⏸ Fase futura |

> **Regra de ouro:** Nunca alterar fees ou preços após lançamento sem votação pública.

---

## D) XP System

```
XP_daily = min(User_Stake, 50.000) * 0.02
+ 10 XP  → claim diário
+ 5 XP   → spin diário
× streak_multiplier
```

| Streak | Multiplier |
|---|---|
| 1–6 dias | 1.00x |
| 7 dias | 1.05x |
| 30 dias | 1.10x |
| 90 dias | 1.20x |

---

## E) Tiers

| Tier | Nome | XP | Reward Boost |
|---|---|---|---|
| 1 | Initiate | 0 – 999 | 0% |
| 2 | Scanner | 1.000 – 4.999 | +2% |
| 3 | Analyzer | 5.000 – 19.999 | +5% |
| 4 | Architect | 20.000+ | +8% |

> Cap total de boost: **10%**. Nunca empilhar acima disso.

---

## F) Spin (Launch Phase)

- **1 spin grátis por dia** — sem custo
- Spin pago desativado até:
  - TVL saudável
  - Base de holders > 500
  - Liquidez consolidada

---

## G) Prioridade de Crescimento (sem emissão extra)

1. **Leaderboard** — motor de competição
2. **Tier system** — progressao visível
3. **Share card competitivo** — crescimento orgânico no Farcaster

> Esses três crescem o app sem emitir mais token.

---

## H) Quando Ativar Features Futuras

| Feature | Gatilho |
|---|---|
| Spin pago (50 XRAY) | TVL saudável + holders > 500 |
| Vesting 50/50 | TVL consolidado, pressão de venda controlada |
| Decay de reward (0.95^mês) | Após mês 3 estável |
| Boost temporário de tier | Fase 4 |

---

## Regras Imútaveis (nunca mudar pós-launch)

- Preço do spin extra (50 XRAY)
- Fee de unstake (2%)
- Distribuição da fee (1% burn + 1% treasury)
- Tokenomics gerais sem votação pública

---

## Diagnóstico

> Protocolos novos morrem por excesso.  
> Os que sobrevivem são os disciplinados.

Com esse modelo, XRAY tem:
- ✅ Reward dinâmica justa
- ✅ Pressão de venda reduzida (vesting 70/30)
- ✅ Burn constante (unstake fee)
- ✅ XP anti-whale (cap 50k)
- ✅ Competição social (tiers + leaderboard)
- ✅ Sustentabilidade de longo prazo
