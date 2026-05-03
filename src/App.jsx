import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { News } from './pages/News';
import { Materials } from './pages/Materials';
import { Mentorship } from './pages/Mentorship';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { Article } from './pages/Article';
import { BlogPost } from './pages/BlogPost';

export default function App() {
  const [view, setView] = useState('home');
  const telegram = "https://t.me/Euvouserdoutor";
  const profileImg = "https://i.imgur.com/9QVE0X7.jpeg";

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans selection:bg-[#2E70CE] selection:text-white text-left">
      <Header setView={setView} currentView={view} telegram={telegram} />
      <main>
        {view === 'home' && <Home setView={setView} profileImg={profileImg} />}
        {view === 'news' && <News setView={setView} profileImg={profileImg} telegram={telegram} />}
        {view === 'article' && <Article setView={setView} profileImg={profileImg} />}
        {view === 'materials' && <Materials setView={setView} telegram={telegram} />}
        {view === 'mentorship' && <Mentorship setView={setView} telegram={telegram} />}
        {view === 'flashcards' && <FlashcardsPage setView={setView} />}
        {view.startsWith('post_') && <BlogPost setView={setView} postId={view.replace('post_', '')} profileImg={profileImg} telegram={telegram} />}
      </main>
      <Footer setView={setView} telegram={telegram} />
    </div>
  );
}
