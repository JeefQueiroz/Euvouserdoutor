#!/bin/bash
# Script de Setup Rápido - Sem problemas de quotes

echo "📦 Instalando dependências..."
cd "/Users/jeffqueiroz/Documents/site evd/Euvouserdoutor"
pnpm install

echo "🏗️ Fazendo build..."
pnpm run build

echo "📤 Sincronizando com GitHub..."
git add .
git commit -m "Build update: $(date '+%Y-%m-%d %H:%M:%S')"
git push -u origin main

echo "✅ Setup concluído!"
