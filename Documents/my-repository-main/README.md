# X-RAY Protocol

XRAY is a Farcaster-native identity protocol deployed on Base Network.

It combines:
- 🧬 XRAY NFT (ERC-721 Identity Layer)
- 🪙 XRAY Token (ERC-20 Utility Layer)
- 🔒 Staking System
- 🏆 Competitive Leaderboard
- 🔥 Burn-Based Economic Model

---

## 🌐 Contracts (Base Mainnet)

### 🧬 XRAY NFT (ERC-721)
Contract:
0xaC5fd046C7ea0bA5C2081622EdF1B07e28040068

### 🪙 XRAY Token (ERC-20)
Contract:
0x1678FF3b9D29F2fE0340a9528262927e3D44354C

---

## 🏗 Ecosystem Structure

- 🔒 Staking Contract  
0x475BbB4008f14A950Be696d27EbB3D98fB93AAe6  

- 📅 Vesting Contract  
0x7b8041f9c49Cc40A800206D25bC90c712874Ab90  

- 🏛 Treasury  
0xF80DFaAB2CFac368f1986df922E70f847B6e4861  

- 💧 Liquidity Wallet  
0xeF1f2517d65e31E243F451463BbE0AeA90fcF8f2  

- 🏘 Community Wallet  
0xCb6d58B3129167e4D981b8173102d316822711aa  

---

## 🪙 Tokenomics Overview

Total Supply: 1,000,000,000 XRAY

Distribution:
- 35% Rewards / Staking
- 20% Liquidity
- 15% Treasury
- 15% Growth & Ecosystem
- 10% Founder (Long Vesting)
- 5% Strategic Reserve

Full economic design available in `/docs/tokenomics.md`.

---

## 🔁 Economic Model

XRAY follows a closed economic loop:

Emission → Utility → Burn → Scarcity → Demand

The token is required for:
- Ranking boosts
- NFT upgrades
- Premium features
- Advanced gameplay mechanics

---

## 🧬 NFT Utility

XRAY NFTs provide:
- Reward multipliers
- Ranking boosts
- Reduced burn costs
- Access to premium features

Ownership determines access. Not mint history.

---

## ⚙️ Architecture

See detailed technical documentation in:

- `/docs/architecture.md`
- `/docs/tokenomics.md`
- `/docs/roadmap.md`

---

## 🤖 OpenAI API Setup

The X-RAY worker route (`/api/xray/worker`) now uses the official OpenAI SDK.

Required environment variable:
- `OPENAI_API_KEY=your_openai_api_key`

Optional model overrides:
- `OPENAI_VISION_MODEL=gpt-4o-mini`
- `OPENAI_IMAGE_MODEL=gpt-image-1`

Install dependency:
- `npm install openai`

---

XRAY is designed as a competitive, burn-driven, Farcaster-native identity economy.
