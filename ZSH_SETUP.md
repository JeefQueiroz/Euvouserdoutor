# 🔧 Como Usar no Zsh (macOS)

## ❌ O Erro

```
zsh: parse error near `}'
```

**Causa:** Sintaxe bash em shell zsh

## ✅ Solução

Seu terminal padrão é **zsh** (macOS), não bash. Não há problema! Apenas use os comandos corretos:

## 🚀 Comandos Simples (Zsh)

### Desenvolver
```zsh
cd "/Users/jeffqueiroz/Documents/site evd/Euvouserdoutor"
pnpm run dev
```

### Build
```zsh
cd "/Users/jeffqueiroz/Documents/site evd/Euvouserdoutor"
pnpm run build
```

### Instalar dependências
```zsh
cd "/Users/jeffqueiroz/Documents/site evd/Euvouserdoutor"
pnpm install
```

### Commit e Push
```zsh
cd "/Users/jeffqueiroz/Documents/site evd/Euvouserdoutor"
git add .
git commit -m "Sua mensagem aqui"
git push -u origin main
```

## 📋 Scripts Disponíveis

### setup-zsh.sh (Novo - Menu Interativo)
```zsh
cd "/Users/jeffqueiroz/Documents/site evd/Euvouserdoutor"
./setup-zsh.sh
```

Menu com opções:
- 1) Instalar dependências
- 2) Fazer build
- 3) Iniciar desenvolvimento
- 4) Build + commit + push

### Aliases Rápidos
```zsh
dev      # Inicia desenvolvimento
build    # Faz build
bash-setup  # Executa setup
```

## 💡 Regra de Ouro

```
ZSH (seu terminal) → Use comandos diretos
BASH (para scripts) → Use ./script.sh ou bash script.sh
```

## ✅ Tudo Pronto!

Agora você pode:

1. **Desenvolver:**
   ```zsh
   dev
   ```

2. **Build:**
   ```zsh
   build
   ```

3. **Setup completo:**
   ```zsh
   ./setup-zsh.sh
   ```

---

Sem mais erros de parse! 🎉
