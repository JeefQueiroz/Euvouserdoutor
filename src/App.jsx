import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { News } from './pages/News';
import { Materials } from './pages/Materials';
import { Mentorship } from './pages/Mentorship';
import { Article } from './pages/Article';
import { FlashcardsPage } from './pages/FlashcardsPage';

const App = () => {
  const [view, setView] = useState('home');
  const telegram = "https://t.me/Euvouserdoutor";
  const profileImg = "https://i.imgur.com/9QVE0X7.jpeg";

  const renderContent = () => {
    switch(view) {
      case 'home': return <Home setView={setView} profileImg={profileImg} />;
      case 'news': return <News setView={setView} profileImg={profileImg} telegram={telegram} />;
      case 'materials': return <Materials setView={setView} telegram={telegram} />;
      case 'mentorship': return <Mentorship telegram={telegram} />;
      case 'flashcards_info': return <FlashcardsPage setView={setView} profileImg={profileImg} telegram={telegram} />;
      case 1: return <Article setView={setView} profileImg={profileImg} telegram={telegram} />;
      default: return <Home setView={setView} profileImg={profileImg} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans text-gray-900">
      <Header setView={setView} currentView={view} telegram={telegram} />
      <main className="min-h-[70vh]">
        {renderContent()}
      </main>
      <Footer telegram={telegram} />
    </div>
  );
};

export default App;
