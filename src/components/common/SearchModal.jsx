import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  X, 
  ArrowRight, 
  Cpu, 
  Briefcase, 
  BookOpen, 
  Users, 
  Compass, 
  ChevronRight,
  Sparkles,
  Command
} from 'lucide-react';

import { servicesData } from '../../data/servicesData';
import { clientPortfolioData } from '../../data/portfolioData';
import { resourcesData } from '../../data/resourcesData';
import { jobOpenings } from '../../data/careersData';
import { pageFlow } from '../../data/navigationFlow';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setActiveCategory('All');
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate searchable items
  const allSearchItems = useMemo(() => {
    const items = [];

    // 1. Pages
    pageFlow.forEach((p) => {
      items.push({
        id: `page-${p.id}`,
        title: p.name,
        category: 'Pages',
        subtitle: p.tagline,
        description: p.description,
        path: p.path,
        icon: Compass,
        badgeColor: 'bg-brand-royal/10 text-brand-royal border-brand-royal/20',
      });
    });

    // 2. Services
    servicesData.forEach((s) => {
      items.push({
        id: `service-${s.id}`,
        title: s.title,
        category: 'Services',
        subtitle: s.tagline,
        description: s.shortDesc,
        path: `/services/${s.id}`,
        icon: Cpu,
        badgeColor: 'bg-brand-royal/10 text-brand-royal border-brand-royal/20',
      });
    });

    // 3. Portfolio Projects
    clientPortfolioData.forEach((p) => {
      items.push({
        id: `portfolio-${p.id}`,
        title: p.title,
        category: 'Portfolio',
        subtitle: `${p.category} Client Project`,
        description: p.shortDesc,
        path: '/portfolio',
        icon: Briefcase,
        badgeColor: 'bg-brand-royal/10 text-brand-royal border-brand-royal/20',
      });
    });

    // 4. Resources
    resourcesData.forEach((r) => {
      items.push({
        id: `resource-${r.id}`,
        title: r.title,
        category: 'Resources',
        subtitle: `${r.category} • ${r.readTime || 'Research'}`,
        description: r.description,
        path: '/resources',
        icon: BookOpen,
        badgeColor: 'bg-brand-royal/10 text-brand-royal border-brand-royal/20',
      });
    });

    // 5. Careers
    jobOpenings.forEach((j) => {
      items.push({
        id: `career-${j.id}`,
        title: j.title,
        category: 'Careers',
        subtitle: `${j.department} • ${j.type} • ${j.location}`,
        description: j.description,
        path: '/careers',
        icon: Users,
        badgeColor: 'bg-brand-royal/10 text-brand-royal border-brand-royal/20',
      });
    });

    return items;
  }, []);

  // Filter based on search query and category
  const filteredResults = useMemo(() => {
    let results = allSearchItems;

    if (activeCategory !== 'All') {
      results = results.filter((item) => item.category === activeCategory);
    }

    if (!query.trim()) {
      return results.slice(0, 8); // Top default suggestions
    }

    const q = query.toLowerCase().trim();
    return results.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [allSearchItems, query, activeCategory]);

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  const categories = ['All', 'Pages', 'Services', 'Portfolio', 'Resources', 'Careers'];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div
            className="relative w-full max-w-2xl bg-white border border-brand-silver/60 rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Top Search Input Bar */}
            <div className="relative flex items-center px-5 py-4 border-b border-brand-silver/40 bg-brand-light">
              <Search className="w-5 h-5 text-brand-royal flex-shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, portfolio, resources, career roles..."
                className="w-full bg-transparent text-brand-navy placeholder-slate-400 text-sm sm:text-base focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-brand-navy hover:bg-brand-royal/10 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="px-2 py-1 rounded-lg bg-white border border-brand-silver/50 text-slate-500 hover:text-brand-navy text-xs font-mono"
              >
                ESC
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-brand-silver/30 bg-white overflow-x-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-brand-royal text-white shadow-sm font-bold'
                      : 'bg-brand-light text-slate-600 hover:text-brand-navy hover:bg-brand-royal/10 border border-brand-silver/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Results List */}
            <div className="max-h-[380px] overflow-y-auto p-3 space-y-1.5 bg-brand-light/50">
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.path)}
                      className="group flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-brand-royal/5 border border-brand-silver/40 hover:border-brand-royal/40 shadow-sm cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-start gap-3 min-w-0 pr-3">
                        <div className="p-2 rounded-xl bg-brand-light border border-brand-silver/50 text-brand-royal group-hover:border-brand-royal/40 group-hover:scale-105 transition-all mt-0.5 flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-brand-navy font-heading group-hover:text-brand-royal transition-colors truncate">
                              {item.title}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor} flex-shrink-0`}
                            >
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            {item.subtitle} — {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 pl-2">
                        <div className="w-7 h-7 rounded-lg bg-brand-royal text-white flex items-center justify-center shadow-sm">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <Search className="w-10 h-10 text-slate-400 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold text-brand-navy">No results found for "{query}"</p>
                  <p className="text-xs text-slate-500 mt-1">Try searching for Web Development, AI, Case Studies, or Careers.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-brand-silver/40 bg-brand-light flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-600 border border-brand-silver/50">↵</kbd> select
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <kbd className="px-1.5 py-0.5 rounded bg-white text-slate-600 border border-brand-silver/50">esc</kbd> close
                </span>
              </div>
              <span className="text-[11px] text-brand-royal font-semibold">NAVABHARATH Search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
