import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
        badgeColor: 'bg-brand-yellow/15 text-brand-yellow border-brand-yellow/30',
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
        badgeColor: 'bg-brand-navy-card text-brand-yellow border-brand-yellow/30',
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
        badgeColor: 'bg-brand-yellow/15 text-brand-yellow border-brand-yellow/30',
      });
    });

    // 4. Resources
    resourcesData.forEach((r) => {
      items.push({
        id: `resource-${r.id}`,
        title: r.title,
        category: 'Resources',
        subtitle: `${r.type} • ${r.readTime || 'Resource'}`,
        description: r.excerpt || r.summary || r.title,
        path: '/resources',
        icon: BookOpen,
        badgeColor: 'bg-white/10 text-white border-white/20',
      });
    });

    // 5. Careers
    jobOpenings.forEach((j) => {
      items.push({
        id: `career-${j.id}`,
        title: j.title,
        category: 'Careers',
        subtitle: `${j.department} • ${j.experience}`,
        description: j.overview,
        path: '/careers',
        icon: Users,
        badgeColor: 'bg-brand-yellow/20 text-brand-yellow border-brand-yellow/40',
      });
    });

    return items;
  }, []);

  // Filter items based on query & category
  const filteredResults = useMemo(() => {
    let list = allSearchItems;
    if (activeCategory !== 'All') {
      list = list.filter((i) => i.category === activeCategory);
    }

    if (!query.trim()) {
      // If no query, show featured top picks
      return list.slice(0, 8);
    }

    const q = query.toLowerCase().trim();
    return list.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [allSearchItems, query, activeCategory]);

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  const categories = ['All', 'Pages', 'Services', 'Portfolio', 'Resources', 'Careers'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-navy-dark/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-brand-navy-surface border border-brand-yellow/30 rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Top Search Input Bar */}
            <div className="relative flex items-center px-5 py-4 border-b border-white/10 bg-brand-navy-card/80">
              <Search className="w-5 h-5 text-brand-yellow flex-shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, portfolio, resources, career roles..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs font-mono"
              >
                ESC
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-white/5 bg-brand-navy-surface/90 overflow-x-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-brand-yellow text-brand-navy shadow-sm font-bold'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Results List */}
            <div className="max-h-[380px] overflow-y-auto p-3 space-y-1.5">
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.path)}
                      className="group flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-brand-yellow/30 cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-start gap-3 min-w-0 pr-3">
                        <div className="p-2 rounded-xl bg-brand-navy-card border border-white/10 text-brand-yellow group-hover:border-brand-yellow/50 group-hover:scale-105 transition-all mt-0.5 flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white font-heading group-hover:text-brand-yellow transition-colors truncate">
                              {item.title}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${item.badgeColor} flex-shrink-0`}
                            >
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                            {item.subtitle} — {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 pl-2">
                        <div className="w-7 h-7 rounded-lg bg-brand-yellow text-brand-navy flex items-center justify-center">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <Search className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold text-slate-300">No results found for "{query}"</p>
                  <p className="text-xs text-slate-500 mt-1">Try searching for Web Development, AI, Case Studies, or Careers.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-white/10 bg-brand-navy-dark/90 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">↵</kbd> select
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">esc</kbd> close
                </span>
              </div>
              <span className="text-[11px] text-brand-yellow/80">NAVABHARATH Search Engine</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
