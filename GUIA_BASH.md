# 📝 Guia: Como Enviar Scripts Bash Sem Erros de Quotes

## ❌ EVITE - Heredoc com aspas problemáticas

```bash
#!/bin/bash
cat <<'EOF' > arquivo.txt
cat <<'EOF' > index.html
<!-- Aqui entra em conflito de aspas -->
<script src="https://cdn.tailwindcss.com"></script>
EOF
EOF
```

## ✅ RECOMENDADO - Usar Write Tool

Quando você precisa criar um arquivo com conteúdo complexo, use o **Write tool** em vez de heredoc:

```bash
# Estrutura simples
mkdir -p src/components
cat > src/App.jsx << 'END'
import React from 'react'
export default App
END
```

## ✅ ALTERNATIVA - Arquivos Individuais

Em vez de um mega script, crie arquivos um por um:

1. Use o **Write tool** para arquivos JSON, JS, HTML
2. Use **Bash** apenas para comandos simples

## 📋 Exemplo Correto para seu Projeto

```bash
# 1. Criar pastas
mkdir -p src/components src/pages

# 2. Instalar dependências
pnpm install

# 3. Build
pnpm run build

# 4. Commit e push
git add .
git commit -m "Mensagem do commit"
git push -u origin main
```

---

**Resumo:** Evite heredocs com múltiplas aspas. Use **Write tool** para HTML/JSON/JS e **Bash** apenas para comandos!
