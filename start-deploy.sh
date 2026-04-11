#!/bin/bash
echo "📤 Preparando para deploy na Vercel..."
pnpm install
pnpm run build
echo "✅ Pronto para deploy!"
echo "📍 Acesse: https://vercel.com"
echo "1. Conecte o repositório GitHub"
echo "2. Vercel detectará automaticamente a configuração"
echo "3. Build será feito automaticamente"
