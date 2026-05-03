# 🖥️ Configuração de Terminal - Bash Setup

## ✅ Configuração Realizada

### Arquivos Criados

1. **~/.bashrc** - Configuração interativa do bash
   - Aliases úteis
   - Variáveis de ambiente
   - Histórico configurado
   - Prompt customizado

2. **~/.bash_profile** - Carregamento no login
   - Sourça .bashrc automaticamente
   - PATH configurado
   - NVM support (se instalado)

3. **~/.local/bin/bash-config.sh** - Script de teste
   - Verifica versão bash
   - Testa heredoc
   - Valida variáveis

## 🚀 Como Usar

### Carregar configuração (sessão atual)
```bash
source ~/.bashrc
```

### Usar bash explicitamente
```bash
bash script.sh
```

### Executar comando em bash
```bash
bash -c "seu comando aqui"
```

### Aliases Disponíveis
```bash
ll                      # ls -la
la                      # ls -A
l                       # ls -CF
pnpm-dev               # Inicia dev do Euvouserdoutor
pnpm-build             # Build do Euvouserdoutor
euvouserdoutor-setup   # Setup rápido
```

## 🔧 Testar Configuração

```bash
bash ~/.local/bin/bash-config.sh
```

## 📝 Shell Atual vs Bash

```
📍 Shell Padrão: zsh (/bin/zsh)
📍 Bash Disponível: GNU bash 3.2.57
```

Para trocar permanentemente para bash (não recomendado em macOS):
```bash
chsh -s /bin/bash
```

## 💡 Dicas

1. **Para scripts bash complexos**: Use `#!/bin/bash` no topo
2. **Para evitar erros de quotes**: Use aspas simples para strings literais
3. **Para variáveis**: Use `$VARIAVEL` ou `${VARIAVEL}`
4. **Para números**: Use `$((1 + 1))`

## ✅ Status

- ✓ Bash 3.2.57 funcional
- ✓ Heredoc funcionando
- ✓ Variáveis de ambiente OK
- ✓ Aliases configurados
- ✓ Terminal pronto para scripts
