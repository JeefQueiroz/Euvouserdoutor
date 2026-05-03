# 🏥 EuVouSerDoutor | Portal Oficial

Portal de Medicina UFMG criado por Jefferson Queiroz. Democratizando o acesso à aprovação através da Mentoria Aprovado.

## 🚀 Quick Start

### Instalação
```bash
pnpm install
```

### Desenvolvimento
```bash
pnpm run dev
```
Acessa em: http://localhost:5173

### Build de Produção
```bash
pnpm run build
```

### Preview
```bash
pnpm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
│   ├── Header.jsx    # Navegação principal
│   ├── Footer.jsx    # Rodapé
│   └── Sidebar.jsx   # Barra lateral
├── pages/            # Páginas da aplicação
│   ├── Home.jsx      # Página inicial
│   ├── News.jsx      # Feed de notícias
│   ├── Materials.jsx # Materiais gratuitos
│   ├── Mentorship.jsx# Mentoria Aprovado
│   └── Article.jsx   # Artigos editoriais
├── App.jsx           # Componente raiz
└── styles.css        # Estilos globais
```

## 🎯 Recursos

- ✅ Layout responsivo (mobile + desktop)
- ✅ Componentes modulares React
- ✅ Build otimizado com Vite
- ✅ Tailwind CSS para estilos
- ✅ Lucide React para ícones
- ✅ Deploy pronto para Vercel

## 🔧 Configurações

### Vercel (vercel.json)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
Isso corrige erros 404 em SPA (Single Page Application).

### Vite (vite.config.js)
- Base: `/`
- Output: `dist/`
- Plugin: React

## 📱 Páginas Disponíveis

1. **Home** - Apresentação principal
2. **Notícias** - Feed editorial
3. **Materiais** - Cronograma, Simulados, Flashcards
4. **Mentoria** - Programa de elite
5. **Artigos** - Layout editorial profissional

## 🎨 Design System

- Cor primária: `#2E70CE` (Azul)
- Cor secundária: `#0A192F` (Azul escuro)
- Background: `#F4F7FB` (Cinza claro)
- Fonte: Inter (Google Fonts)

## 🌐 Links Importantes

- Instagram: https://instagram.com/euvouserdoutor
- Telegram: https://t.me/Euvouserdoutor
- GitHub: https://github.com/JeefQueiroz/Euvouserdoutor

## 📦 Dependências

- React 18.2.0
- Vite 5.2.0
- Tailwind CSS
- Lucide React

## ⚙️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento |
| `pnpm build` | Build para produção |
| `pnpm preview` | Preview da build |

## 🚀 Deploy na Vercel

1. Conecta o repositório GitHub na Vercel
2. Vercel detecta automaticamente `vite.config.js`
3. Build é feito automaticamente
4. Site fica online em ~30 segundos

## 📝 Notas

- Tudo está pronto para Vercel
- Sem necessidade de configurações adicionais
- SPA funciona perfeitamente com `vercel.json`

---

© 2026 EuVouSerDoutor | Jefferson Queiroz | Medicina UFMG
