#!/bin/bash
echo "🏗️ Construindo para produção..."
pnpm install
pnpm run build
echo "✅ Build completo! Arquivos em: ./dist"
