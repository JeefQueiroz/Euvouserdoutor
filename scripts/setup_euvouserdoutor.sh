#!/bin/bash

echo "🚀 Iniciando reconstrução total do portal..."

# 1. Limpeza
rm -rf src node_modules pnpm-lock.yaml dist vite.config.js package.json index.html .git
mkdir -p src

# 2. Criar package.json
cat <<'EOP' > package.json
{
  "homepage": "[https://JeefQueiroz.github.io/Euvouserdoutor](https://JeefQueiroz.github.io/Euvouserdoutor)",
  "name": "euvouserdoutor",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "gh-pages": "^6.1.1",
    "vite": "^5.2.0"
  }
}
EOP

# 3. Criar vite.config.js
cat <<'EOP' > vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: '/Euvouserdoutor/',
})
EOP

# 4. Criar index.html
cat <<'EOP' > index.html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EuVouSerDoutor</title>
    <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOP

# 5. Criar src/styles.css
cat <<'EOP' > src/styles.css
@tailwind base;
@tailwind components;
@tailwind utilities;
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
EOP

# 6. Criar src/main.jsx
cat <<'EOP' > src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
EOP

# 7. Criar src/App.jsx (O Portal do @euvouserdoutor)
cat <<'EOP' > src/App.jsx
import React, { useState } from 'react';
import { 
  Zap, Target, Send, Brain, Instagram, 
  Award, CalendarDays, CheckSquare, Stethoscope
} from 'lucide-react';

const App = () => {
  const [view, setView] = useState('home');
  const telegram = "[https://t.me/Euvouserdoutor](https://t.me/Euvouserdoutor)";

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-gray-900">
      <nav className="sticky top-0 z-50 shadow-lg bg-white">
        <div className="bg-[#2E70CE] text-white py-1.5 text-[10px] font-bold uppercase flex justify-center items-center gap-2">
          <Zap size={12} className="text-yellow-300 animate-pulse" /> +135.000 VESTIBULANDOS CONECTADOS
        </div>
        <div className="py-5 px-10 flex justify-between items-center border-b">
          <h1 onClick={() => setView('home')} className="text-3xl font-black tracking-tighter cursor-pointer flex items-center gap-2">
            <Target size={28} className="text-[#2E70CE]" /> EUVOUSERDOUTOR
          </h1>
          <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase text-gray-500">
            <span onClick={() => setView('home')} className="cursor-pointer hover:text-[#2E70CE]">Home</span>
            <span onClick={() => setView('materials')} className="cursor-pointer hover:text-[#2E70CE]">Materiais</span>
            <span onClick={() => setView('mentoria')} className="cursor-pointer hover:text-[#2E70CE]">Mentoria</span>
          </div>
        </div>
      </nav>

      <main>
        {view === 'home' ? (
          <section className="bg-[#0A192F] text-white py-32 text-center px-4">
            <div className="max-w-4xl mx-auto">
              <span className="bg-green-500/20 text-green-300 px-4 py-1.5 rounded-full text-xs font-bold mb-6 inline-block border border-green-500/30 uppercase">135K SEGUIDORES</span>
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-tight italic">Sua vaga em <br/><span className="text-[#2E70CE]">Medicina</span></h1>
              <p className="text-xl text-blue-100 mb-12 font-light">Estratégia e inspiração de Jefferson Queiroz (Medicina UFMG) para sua aprovação.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button onClick={() => setView('materials')} className="bg-white text-[#0A192F] px-10 py-4 rounded-full font-black shadow-xl hover:scale-105 transition-all">VER MATERIAIS</button>
                <a href={telegram} target="_blank" className="bg-[#2E70CE] px-10 py-4 rounded-full font-black shadow-xl hover:bg-blue-600 flex items-center justify-center gap-2">TELEGRAM <Send size={18}/></a>
              </div>
            </div>
          </section>
        ) : view === 'materials' ? (
          <section className="py-20 px-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 text-center">
              <CalendarDays size={48} className="text-[#2E70CE] mx-auto mb-6"/>
              <h3 className="text-2xl font-black mb-4 uppercase">Cronograma</h3>
              <p className="text-gray-600 mb-8">Planejamento de 100 dias focados em medicina.</p>
              <a href={telegram} className="block bg-gray-900 text-white py-4 rounded-2xl font-bold">ACESSAR</a>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 text-center">
              <CheckSquare size={48} className="text-green-500 mx-auto mb-6"/>
              <h3 className="text-2xl font-black mb-4 uppercase">Simulados</h3>
              <p className="text-gray-600 mb-8">Mais de 100 provas inéditas e FUVEST.</p>
              <a href={telegram} className="block bg-green-500 text-white py-4 rounded-2xl font-bold">BAIXAR</a>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 text-center">
              <Brain size={48} className="text-pink-500 mx-auto mb-6"/>
              <h3 className="text-2xl font-black mb-4 uppercase">Flashcards</h3>
              <p className="text-gray-600 mb-8">Método Aprovado para retenção máxima.</p>
              <a href={telegram} className="block bg-pink-500 text-white py-4 rounded-2xl font-bold">OBTER</a>
            </div>
          </section>
        ) : (
          <section className="py-40 text-center">
            <Award size={80} className="mx-auto text-[#2E70CE] mb-8 animate-bounce"/>
            <h2 className="text-5xl font-black mb-4 uppercase">Mentoria Aprovado</h2>
            <p className="text-gray-500">O sistema de elite para futuros médicos da UFMG.</p>
          </section>
        )}
      </main>

      <footer className="bg-white py-20 border-t mt-20 text-center">
        <h2 className="text-2xl font-black tracking-tighter italic mb-4">EUVOUSERDOUTOR</h2>
        <p className="font-bold text-gray-400">Jefferson Queiroz | Medicina UFMG</p>
        <div className="flex justify-center gap-10 mt-10">
          <a href="[https://instagram.com/euvouserdoutor](https://instagram.com/euvouserdoutor)" className="text-gray-400 hover:text-[#2E70CE]"><Instagram /></a>
          <a href={telegram} className="text-gray-400 hover:text-[#2E70CE]"><Send /></a>
        </div>
      </footer>
    </div>
  );
};
export default App;
EOP

# 8. Instalação, Build e Git Push
pnpm install
pnpm run build
git init
git remote add origin [https://github.com/JeefQueiroz/Euvouserdoutor](https://github.com/JeefQueiroz/Euvouserdoutor)
git add .
git commit -m "Restauração Completa: Estrutura, Design e Deploy"
git branch -M main
git push -u origin main --force
pnpm exec gh-pages -d dist

echo "✅ PROCESSO CONCLUÍDO COM SUCESSO!"
echo "Site e Código enviados para: [https://github.com/JeefQueiroz/Euvouserdoutor](https://github.com/JeefQueiroz/Euvouserdoutor)"
