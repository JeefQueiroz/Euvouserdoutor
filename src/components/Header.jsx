import React, { useState } from 'react';
import { Zap, Send, Search, X, ArrowRight } from 'lucide-react';

export const Header = ({ setView, currentView, telegram }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchItems = [
    { title: 'Oxford Inicia Ensaio Clínico de Vacina Contra o Vírus Ebola', view: 'post_ebola_oxford_2026', cat: 'Saúde & Ciência' },
    { title: 'Como estudar para Medicina com método e constância', view: 'article', cat: 'Técnicas de Estudo' },
    { title: 'Flashcards Doutor: Estudo Ativo e Repetição Espaçada', view: 'flashcards', cat: 'Materiais' },
    { title: 'Mentoria Aprovado: Organização e Rotina para Medicina', view: 'mentorship', cat: 'Mentoria' },
    { title: 'Cronograma Sisu e Notas de Corte', view: 'news', cat: 'Vestibular' },
  ];

  const filteredItems = searchItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.cat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="w-full sticky top-0 z-50">
        <div className="bg-[#4F8CFF] text-[#080A0F] py-1.5 px-4 flex justify-center items-center text-[9px] font-black uppercase tracking-[0.25em] gap-2 text-center">
          <Zap size={10} className="text-[#080A0F]" aria-hidden="true" />
          <span>Portal Editorial de Medicina, Ciência e Educação</span>
        </div>
        
        <div className="bg-[#080A0F]/90 backdrop-blur-xl border-b border-white/[0.05] py-2.5 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setView('home')}
                className="flex items-center group shrink-0 focus:outline-none"
                aria-label="Ir para a página inicial"
              >
                <img src="/logo-euvouserdoutor.png" alt="Logo" className="h-10 md:h-12 w-auto object-contain transition-opacity group-hover:opacity-80" />
              </button>
            
              <nav className="hidden lg:flex gap-1 text-[10px] font-bold uppercase tracking-wider text-[#98A2B3]" aria-label="Navegação principal">
                {[
                  ['home', 'Início'],
                  ['about', 'Sobre'],
                  ['author', 'Autor'],
                  ['news', 'Notícias'],
                  ['materials', 'Materiais'],
                  ['mentorship', 'Mentoria'],
                  ['contact', 'Contato'],
                ].map(([view, label]) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setView(view)}
                    className={`px-3.5 py-1.5 rounded-lg transition-all focus:outline-none ${
                      currentView === view
                        ? 'text-white bg-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                        : 'hover:text-white hover:bg-white/[0.03]'
                    }`}
                    aria-current={currentView === view ? 'page' : undefined}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="bg-white/[0.03] text-[#98A2B3] hover:text-white p-2 rounded-lg border border-white/[0.08] hover:bg-white/[0.06] transition-all flex items-center gap-2 text-[10px] font-bold"
                aria-label="Pesquisar no site"
              >
                <Search size={14} className="text-[#4F8CFF]" />
                <span className="hidden sm:inline">Pesquisar...</span>
              </button>

              <button
                type="button"
                onClick={() => setView('materials')}
                className="bg-white/[0.05] text-white text-[9px] font-black uppercase px-3.5 py-2 rounded-lg border border-white/[0.08] hover:bg-white/[0.1] transition-all focus:outline-none"
              >
                Biblioteca
              </button>
              <a
                href={telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className="bg-[#4F8CFF] text-[#080A0F] p-2 rounded-lg hover:bg-[#7EA6FF] transition-all focus:outline-none shadow-[0_0_20px_rgba(79,140,255,0.2)]"
              >
                <Send size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-[#080A0F]/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in">
          <div className="bg-[#11141A] border border-white/[0.08] rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3 w-full mr-4">
                <Search size={20} className="text-[#4F8CFF]" />
                <input
                  type="text"
                  placeholder="Pesquisar notícias, artigos, materiais..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-[#F8FAFC] placeholder-[#98A2B3] text-base font-medium focus:outline-none"
                />
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-[#98A2B3] hover:text-white p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setView(item.view);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#4F8CFF]/30 hover:bg-white/[0.04] transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#4F8CFF] bg-[#4F8CFF]/10 px-2 py-0.5 rounded mb-1 inline-block">
                        {item.cat}
                      </span>
                      <h4 className="text-sm font-bold text-[#F8FAFC] group-hover:text-[#4F8CFF] transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <ArrowRight size={16} className="text-[#98A2B3] group-hover:text-[#4F8CFF] group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-[#98A2B3] text-sm font-medium">
                  Nenhum resultado encontrado para "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
