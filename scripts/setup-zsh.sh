#!/bin/zsh

echo "🚀 Setup para Zsh - EuVouSerDoutor"
echo ""
echo "Opções:"
echo "1) Instalar dependências"
echo "2) Fazer build"
echo "3) Iniciar desenvolvimento"
echo "4) Fazer build + commit + push"
echo ""
read "choice?Escolha uma opção (1-4): "

case $choice in
  1)
    echo "📦 Instalando..."
    pnpm install
    ;;
  2)
    echo "🏗️ Buildando..."
    pnpm run build
    ;;
  3)
    echo "🔄 Iniciando dev..."
    pnpm run dev
    ;;
  4)
    echo "🔄 Build, commit e push..."
    pnpm install
    pnpm run build
    git add .
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M')"
    git push -u origin main
    echo "✅ Concluído!"
    ;;
  *)
    echo "❌ Opção inválida"
    exit 1
    ;;
esac
