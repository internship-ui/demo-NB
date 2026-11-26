import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  Share2, 
  Filter,
  ExternalLink,
  Play,
  ArrowUpRight
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import Modal from '../components/common/Modal';
import MarqueeBanner from '../components/common/MarqueeBanner';
import ResourcesBackgroundAnimation from '../components/resources/ResourcesBackgroundAnimation';
import { resourcesData, resourceCategories } from '../data/resourcesData';
import { useNotification } from '../context/NotificationContext';
import { getAssetUrl } from '../utils/assetPath';


// =========================================================================
// KINETIC LETTER ANIMATION COMPONENT FOR HERO TITLE
// =========================================================================
function AnimatedHeading({ text, className = '', letterColor = 'text-brand-navy', delayOffset = 0 }) {
  return (
    <span className={`inline-block ${className}`}>
      {text}
    </span>
  );
}

// =========================================================================
// MAXIMIZED ANIMATED FEATURED SPOTLIGHT CARD
// =========================================================================
function FeaturedSpotlightCard({ article, onSelect }) {
  return (
    <div className="w-full">
      <div
        onClick={() => onSelect(article)}
        className="relative rounded-3xl bg-white text-slate-700 overflow-hidden cursor-pointer group transition-all duration-300 border-2 border-brand-silver/60 hover:border-brand-royal/50 shadow-lg hover:shadow-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[480px]">
          {/* Left Side: Maximized Infographic Visual */}
          <div className="lg:col-span-5 relative bg-gradient-to-br from-[#101F3C] via-[#1B3E73] to-[#101F3C] p-6 sm:p-10 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-brand-steel/30 overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-royal/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full flex items-center justify-center p-2">
              <img
                src={getAssetUrl('/resources/ai-in-boardrooms-infographic.png')}
                alt={article.title}
                className="w-full max-w-[420px] max-h-[420px] h-auto object-contain rounded-2xl drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Right Side: Maximized Article Details & Typography */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between relative bg-white">
            <div>
              {/* Meta Bar */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm mb-4">
                <span className="px-3.5 py-1 rounded-full bg-brand-royal/10 text-brand-royal font-bold border border-brand-royal/25 uppercase text-[11px] tracking-wider shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-royal" />
                  <span>{article.category || 'STRATEGY'}</span>
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-semibold">{article.date}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-semibold">{article.readTime}</span>
              </div>

              {/* Main Title - Maximized */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-extrabold text-brand-navy font-heading tracking-tight mb-4 leading-[1.2] group-hover:text-brand-royal transition-colors">
                AI in Boardrooms: <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-royal via-brand-royal to-brand-steel">Transforming Strategic Decision-Making</span>
              </h2>

              {/* Summary / Excerpt - Maximized */}
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 font-normal">
                {article.summary}
              </p>

              {/* Strategic Highlights Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['Executive AI Strategy', 'Predictive Foresight Models', 'Risk Governance'].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-brand-light border border-brand-silver/60 hover:border-brand-royal/40 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-royal" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Author & CTA Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-brand-silver/40">
              {/* Author Block */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-brand-light text-brand-royal font-extrabold flex items-center justify-center text-sm shadow-sm ring-2 ring-brand-royal/20 border border-brand-silver/50">
                  {article.authorInitials || 'TT'}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-brand-navy leading-snug">{article.author}</h4>
                  <p className="text-xs text-slate-500 font-medium">{article.company}</p>
                </div>
              </div>

              {/* Action Button: Read Full Article */}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-brand-royal hover:bg-brand-navy text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md group/btn cursor-pointer"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Resources() {
  const { addToast } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Resources');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [downloadingGuide, setDownloadingGuide] = useState(false);
  const [tappedCardId, setTappedCardId] = useState(null);

  // Filter resources by search input and category
  const filteredResources = useMemo(() => {
    return resourcesData.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Resources' ||
        selectedCategory === 'All' ||
        item.type === selectedCategory ||
        item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Featured Spotlight Resource (AI in Boardrooms)
  const featuredArticle = useMemo(() => {
    return (
      resourcesData.find((r) => r.id === 'ai-in-boardrooms-transforming-strategic-decision-making') ||
      resourcesData[0]
    );
  }, []);

  const showFeaturedSection = useMemo(() => {
    return (
      !searchQuery &&
      (selectedCategory === 'All Resources' ||
        selectedCategory === 'All')
    );
  }, [searchQuery, selectedCategory]);

  // Grid items excluding featured article when on All Resources to avoid duplicate top card
  const gridResources = useMemo(() => {
    if (showFeaturedSection && featuredArticle) {
      return filteredResources.filter((item) => item.id !== featuredArticle.id);
    }
    return filteredResources;
  }, [filteredResources, showFeaturedSection, featuredArticle]);

  const handleDownloadWhitepaper = (title) => {
    setDownloadingGuide(true);
    setTimeout(() => {
      setDownloadingGuide(false);
      addToast(`Downloaded: "${title}" - PDF Technical Guide`, 'success');
    }, 800);
  };

  const handleShareArticle = (title) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast(`Link to "${title}" copied to clipboard!`, 'info');
    } else {
      addToast('Article link copied!', 'info');
    }
  };

  return (
    <div className="pt-24 pb-20 relative min-h-screen overflow-hidden bg-brand-light">
      {/* Soft-white/light-silver background with subtle blue accents */}
      <ResourcesBackgroundAnimation />

      {/* ===================== HERO / HEADER ===================== */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="font-mono text-xs text-brand-royal font-bold tracking-widest uppercase mb-4">
            [04 // INTELLIGENCE &amp; RESEARCH] · MYSURU 12.2958° N, 76.6394° E
          </div>

          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-brand-silver/70 text-brand-navy text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#E5A831] shadow-[0_0_8px_rgba(229,168,49,0.7)]" />
            <span className="font-heading">Knowledge Hub</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-4">
            <span className="text-brand-navy">Resource</span>
            <span className="text-brand-royal">s</span>
          </h1>

          <p
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
          >
            Expert-curated guides, technology trends, business solutions and practical strategies to accelerate your digital growth.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-10">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, videos, developer tools, AI news..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-brand-silver/60 text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-royal shadow-sm text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs text-slate-400 hover:text-brand-navy cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Horizontal Marquee */}
      <MarqueeBanner className="mb-12 relative z-10" />

      {/* ===================== CATEGORY TABS ===================== */}
      <section className="px-4 sm:px-6 lg:px-8 mb-10 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="inline-flex items-center flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-white border border-brand-silver/50 backdrop-blur-md shadow-sm">
            {resourceCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-royal text-white font-bold shadow-md border border-brand-royal'
                      : 'text-slate-600 hover:text-brand-navy hover:bg-brand-light'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== FIRST ON PAGE: MAXIMIZED FEATURED SPOTLIGHT ARTICLE ===================== */}
      {showFeaturedSection && featuredArticle && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            <FeaturedSpotlightCard
              article={featuredArticle}
              onSelect={setSelectedArticle}
            />
          </div>
        </section>
      )}

      {/* ===================== CARDS GRID ===================== */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {gridResources.length === 0 && !showFeaturedSection ? (
            <div className="text-center py-16 p-8 rounded-2xl bg-white border border-brand-silver/60 max-w-md mx-auto shadow-sm">
              <p className="text-brand-navy font-bold text-lg mb-2">No matching resources found</p>
              <p className="text-xs text-slate-500 mb-4">Try adjusting your keywords or clearing the category filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Resources'); }}
                className="px-4 py-2 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridResources.map((item) => {
                const tickerWords = (item.tags && item.tags.length >= 3)
                  ? [item.tags[0], item.tags[1], item.tags[2]]
                  : [item.badge || 'INSIGHTS', item.category || 'INNOVATION', item.type || 'NAVABHARATH'];
                const isTapped = tappedCardId === item.id;

                return (
                  <article
                    key={item.id}
                    onClick={() => {
                      setTappedCardId(item.id);
                      if (item.toolUrl) {
                        window.open(item.toolUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        setSelectedArticle(item);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setTappedCardId(item.id);
                        if (item.toolUrl) {
                          window.open(item.toolUrl, '_blank', 'noopener,noreferrer');
                        } else {
                          setSelectedArticle(item);
                        }
                      }
                    }}
                    className={`resource-alpha-card group flex flex-col justify-between cursor-pointer select-none bg-white ${
                      isTapped ? 'is-tapped' : ''
                    }`}
                  >
                    {/* Card Thumbnail Image with Round Moving Motion & Organic Blob */}
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-brand-light cursor-pointer">
                      {/* Organic Morphing Circular Blob Accent (Alpha Groups reference) */}
                      <div className="tcard__blob" />

                      {/* Original Picture with Round Motion Animation on Tap / Hover */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="resource-card-image"
                        loading="lazy"
                      />

                      {/* Brand Category Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-brand-royal border border-brand-silver/60 text-[11px] font-bold tracking-wider uppercase shadow-xs flex items-center gap-1.5 z-20">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                        <span>{item.badge || item.category || 'INSIGHTS'}</span>
                      </div>

                      {/* Read Time Pill */}
                      {item.readTime && (
                        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold text-slate-600 bg-white/95 border border-brand-silver/60 z-20 shadow-xs">
                          {item.readTime}
                        </div>
                      )}
                    </div>

                    {/* Sliding Words Ticker */}
                    <div className="uiverse-ticker-wrapper bg-brand-light border-y border-brand-silver/50">
                      <div className="content uiverse-ticker-content">
                        <div className="word uiverse-ticker-word text-brand-royal font-extrabold">{tickerWords[0]}</div>
                        <div className="word uiverse-ticker-word text-brand-royal font-extrabold">{tickerWords[1]}</div>
                        <div className="word uiverse-ticker-word text-brand-royal font-extrabold">{tickerWords[2]}</div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        {/* Meta Date */}
                        {item.date && (
                          <div className="text-xs text-slate-500 font-medium mb-2.5 flex items-center gap-1.5 font-mono">
                            <span>{item.date}</span>
                          </div>
                        )}

                        {/* Card Title */}
                        <h3 className="text-base sm:text-lg font-bold text-brand-navy font-heading mb-2.5 leading-snug group-hover:text-brand-royal transition-colors line-clamp-2 uppercase tracking-tight">
                          {item.title}
                        </h3>

                        {/* Card Summary */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3 font-normal">
                          {item.summary}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-brand-silver/40 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-brand-light border border-brand-silver/50 text-brand-royal text-[11px] font-bold flex items-center justify-center shadow-xs">
                            {item.authorInitials || 'TT'}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-700 group-hover:text-brand-navy transition-colors block leading-tight">
                              {item.author || 'Tech Team'}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              {item.company || 'Navabharath'}
                            </span>
                          </div>
                        </div>

                        {/* Action trigger based on type */}
                        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-royal group-hover:text-brand-navy transition-colors">
                          <span>{item.type === 'Videos' ? 'Watch Video' : item.type === 'Tools' ? 'Open Tool' : 'Read Article'}</span>
                          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===================== DOWNLOADABLE WHITEPAPERS SECTION ===================== */}
      <section className="mt-20 py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-silver/40 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Executive Whitepapers"
            title="Download In-Depth"
            titleHighlight="Technical Briefs"
            description="Authoritative, vendor-neutral engineering whitepapers compiled by Navabharath Technologies practice leaders."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-brand-light border border-brand-silver/60 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-brand-royal uppercase tracking-wider block mb-1">
                  Architectural Blueprint • 2026 Edition
                </span>
                <h4 className="text-lg font-bold text-brand-navy font-heading mb-2">
                  Enterprise Cloud Migration &amp; Microservices Modernization
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  A 32-page blueprint detailing legacy decomposition, multi-region failover configurations, and avoiding cloud provider lock-in.
                </p>
              </div>
              <button
                onClick={() => handleDownloadWhitepaper('Enterprise Cloud Migration Guide')}
                disabled={downloadingGuide}
                className="w-full py-2.5 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Technical PDF (4.2 MB)</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-brand-light border border-brand-silver/60 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-brand-royal uppercase tracking-wider block mb-1">
                  Cybersecurity Standard
                </span>
                <h4 className="text-lg font-bold text-brand-navy font-heading mb-2">
                  Zero Trust Architecture: API Defense in Distributed Systems
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Comprehensive security manual outlining mTLS handshakes, short-lived OIDC tokens, and CI/CD automated vulnerability gates.
                </p>
              </div>
              <button
                onClick={() => handleDownloadWhitepaper('Zero Trust Security Playbook')}
                disabled={downloadingGuide}
                className="w-full py-2.5 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Security Playbook (3.8 MB)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FULL ARTICLE / RESOURCE MODAL ===================== */}
      {selectedArticle && (
        <Modal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle.title}
          subtitle={`${selectedArticle.type} • ${selectedArticle.author || 'Tech Team'} • ${selectedArticle.date || selectedArticle.badge}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6 text-sm text-slate-700">
            <div className="relative max-h-80 overflow-hidden rounded-xl border border-brand-silver/50 bg-brand-light flex items-center justify-center p-2">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="max-h-72 w-auto object-contain rounded-lg"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-white/95 text-brand-royal border border-brand-silver/50 text-xs font-semibold shadow-sm">
                {selectedArticle.badge || selectedArticle.category}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-light border border-brand-silver/50 text-xs text-slate-600 leading-relaxed italic">
              "{selectedArticle.summary}"
            </div>

            {selectedArticle.videoUrl && (
              <div className="p-4 rounded-xl bg-brand-light border border-brand-silver/50 flex items-center justify-between">
                <div>
                  <h4 className="text-brand-navy font-bold text-sm mb-1">Watch Video Presentation</h4>
                  <p className="text-xs text-slate-500">Stream this presentation directly on the official YouTube channel.</p>
                </div>
                <a
                  href={selectedArticle.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-brand-royal hover:bg-brand-navy text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Open YouTube</span>
                </a>
              </div>
            )}

            {selectedArticle.toolUrl && (
              <div className="p-4 rounded-xl bg-brand-light border border-brand-silver/50 flex items-center justify-between">
                <div>
                  <h4 className="text-brand-navy font-bold text-sm mb-1">Official Tool &amp; Documentation</h4>
                  <p className="text-xs text-slate-500">Explore documentation, download installation packages, and view guides.</p>
                </div>
                <a
                  href={selectedArticle.toolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-brand-royal hover:bg-brand-navy text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Tool</span>
                </a>
              </div>
            )}

            <div className="space-y-4 text-slate-700 leading-relaxed whitespace-pre-line text-sm">
              {selectedArticle.content}
            </div>

            {selectedArticle.keyTakeaways && (
              <div className="p-5 rounded-xl bg-brand-light border border-brand-silver/50 space-y-2">
                <h4 className="text-brand-royal font-bold text-xs uppercase tracking-wider">
                  Key Strategic &amp; Architectural Takeaways
                </h4>
                <ul className="space-y-2 text-xs">
                  {selectedArticle.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-brand-silver/40 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedArticle.tags?.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-brand-light text-slate-700 border border-brand-silver/40"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleShareArticle(selectedArticle.title)}
                className="px-4 py-2 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy transition-colors shadow-sm"
              >
                Copy Link
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
