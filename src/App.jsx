import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GoogleAnalytics } from './components/analytics/GoogleAnalytics';
import { CookieConsent } from './components/CookieConsent';
import { institutional, pathToView, routeMeta } from './institutional';

// Lazy loading for pages to improve initial load performance (Code Splitting)
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const News = lazy(() => import('./pages/News').then(m => ({ default: m.News })));
const Materials = lazy(() => import('./pages/Materials').then(m => ({ default: m.Materials })));
const Mentorship = lazy(() => import('./pages/Mentorship').then(m => ({ default: m.Mentorship })));
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage').then(m => ({ default: m.FlashcardsPage })));
const Article = lazy(() => import('./pages/Article').then(m => ({ default: m.Article })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse').then(m => ({ default: m.TermsOfUse })));
const MedicalDisclaimer = lazy(() => import('./pages/MedicalDisclaimer').then(m => ({ default: m.MedicalDisclaimer })));
const IntellectualProperty = lazy(() => import('./pages/IntellectualProperty').then(m => ({ default: m.IntellectualProperty })));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy').then(m => ({ default: m.CookiePolicy })));

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

  // Protected route check simulation
  const meta = routeMeta[view] || routeMeta.home;
  if (meta?.requiresAuth) {
    const isAuthenticated = localStorage.getItem('evd_auth_token');
    if (!isAuthenticated) {
      // If not authenticated, fallback or redirect to home / login
      // For demonstration, we can redirect or show a notice
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] font-sans selection:bg-[#2E70CE] selection:text-white text-left">
      <GoogleAnalytics />
      <Header setView={navigate} currentView={view} telegram={telegram} />
      <main>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E70CE]"></div>
          </div>
        }>
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
          {view === 'admin' && (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
              <h1 className="text-3xl font-bold text-[#0A192F] mb-4">Painel Administrativo Restrito</h1>
              <p className="text-gray-600 mb-6">Esta área é restrita para gestão editorial do portal EuvouserDoutor.</p>
              <button 
                onClick={() => navigate('home')}
                className="bg-[#2E70CE] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Voltar ao Início
              </button>
            </div>
          )}
          {view.startsWith('post_') && <BlogPost setView={navigate} postId={view.replace('post_', '')} profileImg={profileImg} telegram={telegram} />}
        </Suspense>
      </main>
      <Footer setView={navigate} telegram={telegram} />
      <CookieConsent setView={navigate} />
    </div>
  );
}
