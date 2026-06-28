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
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfUse } from './pages/TermsOfUse';
import { MedicalDisclaimer } from './pages/MedicalDisclaimer';
import { IntellectualProperty } from './pages/IntellectualProperty';
import { CookiePolicy } from './pages/CookiePolicy';
import { GoogleAnalytics } from './components/analytics/GoogleAnalytics';
import { CookieConsent } from './components/CookieConsent';
import { institutional, pathToView, routeMeta } from './institutional';

export default function App() {
  const initialView = pathToView[window.location.pathname] || 'home';
  const [view, setView] = useState(initialView);
  const telegram = institutional.telegram;
  const profileImg = "https://i.imgur.com/9QVE0X7.jpeg";

  const navigate = (nextView) => {
    setView(nextView);
    const path = routeMeta[nextView]?.path;
    if (path && window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  useEffect(() => {
    const onPopState = () => setView(pathToView[window.location.pathname] || 'home');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const meta = routeMeta[view] || routeMeta.home;
    const canonicalUrl = `${institutional.site}${meta.path === '/' ? '' : meta.path}`;
    document.title = meta.title;

    const setMeta = (selector, attr, value) => {
      const tag = document.head.querySelector(selector);
      if (tag) tag.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
  }, [view]);

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans selection:bg-[#2E70CE] selection:text-white text-left">
      <GoogleAnalytics />
      <Header setView={navigate} currentView={view} telegram={telegram} />
      <main>
        {view === 'home' && <Home setView={navigate} profileImg={profileImg} />}
        {view === 'news' && <News setView={navigate} profileImg={profileImg} telegram={telegram} />}
        {view === 'article' && <Article setView={navigate} profileImg={profileImg} />}
        {view === 'materials' && <Materials setView={navigate} telegram={telegram} />}
        {view === 'mentorship' && <Mentorship setView={navigate} telegram={telegram} />}
        {view === 'flashcards' && <FlashcardsPage setView={navigate} />}
        {view === 'about' && <About />}
        {view === 'contact' && <Contact />}
        {view === 'privacy' && <PrivacyPolicy />}
        {view === 'terms' && <TermsOfUse />}
        {view === 'medicalDisclaimer' && <MedicalDisclaimer />}
        {view === 'intellectualProperty' && <IntellectualProperty />}
        {view === 'cookies' && <CookiePolicy />}
        {view.startsWith('post_') && <BlogPost setView={navigate} postId={view.replace('post_', '')} profileImg={profileImg} telegram={telegram} />}
      </main>
      <Footer setView={navigate} telegram={telegram} />
      <CookieConsent setView={navigate} />
    </div>
  );
}
