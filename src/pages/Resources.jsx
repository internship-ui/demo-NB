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
  Play
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import Modal from '../components/common/Modal';
import ResourcesBackgroundAnimation from '../components/resources/ResourcesBackgroundAnimation';
import { resourcesData, resourceCategories } from '../data/resourcesData';
import { useNotification } from '../context/NotificationContext';

// =========================================================================
// KINETIC LETTER ANIMATION COMPONENT FOR HERO TITLE
// =========================================================================
function AnimatedHeading({ text, className = '', letterColor = 'text-white', delayOffset = 0 }) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.028,
        delayChildren: delayOffset,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 35,
      rotateX: -60,
      filter: 'blur(5px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 130,
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
      style={{ perspective: 1000 }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={child}
              whileHover={{
                scale: 1.25,
                y: -6,
                color: '#FFC928',
                textShadow: '0 0 16px rgba(255, 201, 40, 0.9)',
                transition: { type: 'spring', stiffness: 450, damping: 10 },
              }}
              className={`inline-block cursor-default select-none transform-gpu transition-colors duration-150 ${letterColor}`}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

// =========================================================================
// MAXIMIZED ANIMATED FEATURED SPOTLIGHT CARD
// =========================================================================
function FeaturedSpotlightCard({ article, onSelect }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Smooth 3D tilt
    const rotX = -((y - centerY) / centerY) * 4.5;
    const rotY = ((x - centerX) / centerX) * 4.5;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div style={{ perspective: 1400 }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(article)}
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            : 'rotateX(0deg) rotateY(0deg)',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
            : 'transform 0.5s ease-out, box-shadow 0.4s ease, border-color 0.4s ease',
        }}
        className={`relative rounded-3xl bg-brand-navy-surface text-white overflow-hidden cursor-pointer group transition-all duration-300 border-2 ${
          isHovered
            ? 'border-brand-yellow shadow-[0_25px_65px_-12px_rgba(255,201,40,0.35)]'
            : 'border-white/10 shadow-2xl'
        }`}
      >
        {/* Animated light sheen sweep across the card on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-yellow/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[480px]">
          {/* Left Side: Maximized Infographic Visual */}
          <div className="lg:col-span-5 relative bg-gradient-to-br from-brand-navy-dark via-brand-navy-card to-brand-navy p-6 sm:p-10 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none" />

            {/* Infographic with gentle hover zoom and breathing movement */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full flex items-center justify-center p-2"
            >
              <img
                src="/resources/ai-in-boardrooms-infographic.png"
                alt={article.title}
                className="w-full max-w-[420px] max-h-[420px] h-auto object-contain rounded-2xl drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </motion.div>
          </div>

          {/* Right Side: Maximized Article Details & Typography */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between relative bg-brand-navy-surface">
            <div>
              {/* Meta Bar */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm mb-4">
                <span className="px-3.5 py-1 rounded-full bg-brand-yellow/15 text-brand-yellow font-bold border border-brand-yellow/40 uppercase text-[11px] tracking-wider shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                  <span>{article.category || 'STRATEGY'}</span>
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-semibold">{article.date}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-semibold">{article.readTime}</span>
              </div>

              {/* Main Title - Maximized */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-extrabold text-white font-heading tracking-tight mb-4 leading-[1.2] group-hover:text-brand-yellow transition-colors">
                AI in Boardrooms: <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-400">Transforming Strategic Decision-Making</span>
              </h2>

              {/* Summary / Excerpt - Maximized */}
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 font-normal">
                {article.summary}
              </p>

              {/* Strategic Highlights Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['Executive AI Strategy', 'Predictive Foresight Models', 'Risk Governance'].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-white/5 hover:bg-brand-yellow/10 border border-white/10 hover:border-brand-yellow/40 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Author & CTA Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
              {/* Author Block */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-brand-navy-card text-brand-yellow font-extrabold flex items-center justify-center text-sm shadow-md ring-2 ring-brand-yellow/40 group-hover:ring-brand-yellow transition-all border border-brand-yellow/30">
                  {article.authorInitials || 'TT'}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">{article.author}</h4>
                  <p className="text-xs text-slate-400 font-medium">{article.company}</p>
                </div>
              </div>

              {/* Action Button: Read Full Article */}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-glow-yellow hover:scale-[1.03] active:scale-98 group/btn cursor-pointer"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 text-brand-navy group-hover/btn:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Resources() {
  const { addToast } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Resources');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [downloadingGuide, setDownloadingGuide] = useState(false);

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
    <div className="pt-24 pb-20 relative min-h-screen overflow-hidden">
      {/* ===================== FUTURISTIC TECHNOLOGY BACKGROUND ANIMATION ===================== */}
      <ResourcesBackgroundAnimation />

      {/* ===================== HERO / HEADER ===================== */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Knowledge Base & Industry Insights</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight mb-6">
            <AnimatedHeading
              text="Engineering Insights &"
              letterColor="text-white"
              delayOffset={0.1}
            />
            <br />
            <AnimatedHeading
              text="Technology Architecture"
              letterColor="text-brand-yellow drop-shadow-[0_2px_12px_rgba(255,201,40,0.4)]"
              delayOffset={0.45}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Explore thought leadership articles, architectural tutorials, cybersecurity guidelines, developer tools, and tech videos published by Navabharath Technologies.
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, videos, developer tools, AI news..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-brand-navy-surface border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-brand-yellow shadow-xl text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CATEGORY TABS (EXACT FROM SCREENSHOT) ===================== */}
      <section className="px-4 sm:px-6 lg:px-8 mb-10 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="inline-flex items-center flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-brand-navy-surface/90 border border-white/10 backdrop-blur-md shadow-lg">
            {resourceCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-yellow text-brand-navy font-bold shadow-glow-yellow border border-brand-yellow scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
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

      {/* ===================== CARDS GRID (MATCHING SCREENSHOTS) ===================== */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {gridResources.length === 0 && !showFeaturedSection ? (
            <div className="text-center py-16 p-8 rounded-2xl bg-brand-navy-surface border border-white/10 max-w-md mx-auto">
              <p className="text-white font-bold text-lg mb-2">No matching resources found</p>
              <p className="text-xs text-slate-400 mb-4">Try adjusting your keywords or clearing the category filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Resources'); }}
                className="px-4 py-2 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridResources.map((item, idx) => {
                const tickerWords = (item.tags && item.tags.length >= 3)
                  ? [item.tags[0], item.tags[1], item.tags[2]]
                  : [item.badge || 'INSIGHTS', item.category || 'INNOVATION', item.type || 'NAVABHARATH'];

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx % 6) * 0.08 }}
                    className="card uiverse-clay-card text-white overflow-hidden flex flex-col justify-between group cursor-pointer bg-brand-navy-surface border border-white/10 hover:border-brand-yellow/60 rounded-3xl shadow-xl hover:shadow-[0_16px_36px_rgba(7,27,58,0.6),0_0_24px_rgba(255,201,40,0.2)] transition-all duration-300"
                  >
                    {/* Card Thumbnail Image */}
                    <div 
                      className="relative h-48 sm:h-52 overflow-hidden bg-brand-navy-card cursor-pointer"
                      onClick={() => {
                        if (item.toolUrl) {
                          window.open(item.toolUrl, '_blank', 'noopener,noreferrer');
                        } else {
                          setSelectedArticle(item);
                        }
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Brand Category Badge on Top-Left of Image */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-navy-dark/90 backdrop-blur-md text-brand-yellow border border-brand-yellow/40 text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
                        <span>{item.badge || item.category || 'INSIGHTS'}</span>
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-surface/90 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* From Uiverse.io by javierBarroso: Animated Sliding Words Ticker */}
                    <div className="uiverse-ticker-wrapper bg-brand-navy-card/90 border-y border-white/10">
                      <div className="content uiverse-ticker-content">
                        <div className="word uiverse-ticker-word text-brand-yellow font-extrabold">{tickerWords[0]}</div>
                        <div className="word uiverse-ticker-word text-brand-yellow font-extrabold">{tickerWords[1]}</div>
                        <div className="word uiverse-ticker-word text-brand-yellow font-extrabold">{tickerWords[2]}</div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between bg-brand-navy-surface">
                      <div>
                        {/* Meta Date / Read Time / Platform */}
                        {item.date && (
                          <div className="text-xs text-slate-400 font-medium mb-2.5 flex items-center gap-1.5">
                            <span>{item.date}</span>
                            {item.readTime && <span className="text-slate-500">•</span>}
                            {item.readTime && <span>{item.readTime}</span>}
                          </div>
                        )}

                        {/* Card Title */}
                        <h3 
                          onClick={() => {
                            if (item.toolUrl) {
                              window.open(item.toolUrl, '_blank', 'noopener,noreferrer');
                            } else {
                              setSelectedArticle(item);
                            }
                          }}
                          className="text-lg sm:text-xl font-bold text-white font-heading mb-2.5 leading-snug group-hover:text-brand-yellow transition-colors line-clamp-2 cursor-pointer"
                        >
                          {item.title}
                        </h3>

                        {/* Card Summary */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 line-clamp-3 font-normal">
                          {item.summary}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-brand-navy-card border border-brand-yellow/40 text-brand-yellow text-[11px] font-bold flex items-center justify-center shadow-sm">
                            {item.authorInitials || 'TT'}
                          </div>
                          <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                            {item.author || 'Tech Team'}
                          </span>
                        </div>

                        {/* Action trigger based on type */}
                        {item.type === 'Videos' ? (
                          <button
                            onClick={() => setSelectedArticle(item)}
                            className="text-xs font-bold uppercase tracking-wider text-brand-yellow hover:text-white flex items-center gap-1 transition-colors group/btn cursor-pointer"
                          >
                            <span>Watch</span>
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>
                        ) : item.type === 'Tools' ? (
                          <a
                            href={item.toolUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold uppercase tracking-wider text-brand-yellow hover:text-white flex items-center gap-1 transition-colors group/btn cursor-pointer"
                          >
                            <span>Visit Tool</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button
                            onClick={() => setSelectedArticle(item)}
                            className="text-xs font-bold uppercase tracking-wider text-brand-yellow hover:text-white flex items-center gap-1.5 transition-colors group/btn cursor-pointer"
                          >
                            <span>Read More</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===================== DOWNLOADABLE WHITEPAPERS SECTION ===================== */}
      <section className="mt-20 py-16 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark/90 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Executive Whitepapers"
            title="Download In-Depth"
            titleHighlight="Technical Briefs"
            description="Authoritative, vendor-neutral engineering whitepapers compiled by Navabharath Technologies practice leaders."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-brand-navy-surface border border-brand-yellow/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-wider block mb-1">
                  Architectural Blueprint • 2026 Edition
                </span>
                <h4 className="text-lg font-bold text-white font-heading mb-2">
                  Enterprise Cloud Migration & Microservices Modernization
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  A 32-page blueprint detailing legacy decomposition, multi-region failover configurations, and avoiding cloud provider lock-in.
                </p>
              </div>
              <button
                onClick={() => handleDownloadWhitepaper('Enterprise Cloud Migration Guide')}
                disabled={downloadingGuide}
                className="w-full py-2.5 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Download Technical PDF (4.2 MB)</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-brand-navy-surface border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-wider block mb-1">
                  Cybersecurity Standard
                </span>
                <h4 className="text-lg font-bold text-white font-heading mb-2">
                  Zero Trust Architecture: API Defense in Distributed Systems
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Comprehensive security manual outlining mTLS handshakes, short-lived OIDC tokens, and CI/CD automated vulnerability gates.
                </p>
              </div>
              <button
                onClick={() => handleDownloadWhitepaper('Zero Trust Security Playbook')}
                disabled={downloadingGuide}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-brand-yellow" />
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
          <div className="space-y-6 text-sm text-slate-300">
            <div className="relative max-h-80 overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 flex items-center justify-center p-2">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="max-h-72 w-auto object-contain rounded-lg"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-brand-navy-dark/90 backdrop-blur-md text-brand-yellow text-xs font-semibold">
                {selectedArticle.badge || selectedArticle.category}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 leading-relaxed italic">
              "{selectedArticle.summary}"
            </div>

            {selectedArticle.videoUrl && (
              <div className="p-4 rounded-xl bg-brand-navy-card/90 border border-brand-yellow/30 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Watch Video Presentation</h4>
                  <p className="text-xs text-slate-400">Stream this presentation directly on the official YouTube channel.</p>
                </div>
                <a
                  href={selectedArticle.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Open YouTube</span>
                </a>
              </div>
            )}

            {selectedArticle.toolUrl && (
              <div className="p-4 rounded-xl bg-brand-navy-card/90 border border-brand-yellow/30 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Official Tool & Documentation</h4>
                  <p className="text-xs text-slate-400">Explore documentation, download installation packages, and view guides.</p>
                </div>
                <a
                  href={selectedArticle.toolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Tool</span>
                </a>
              </div>
            )}

            <div className="space-y-4 text-slate-200 leading-relaxed whitespace-pre-line text-sm">
              {selectedArticle.content}
            </div>

            {selectedArticle.keyTakeaways && (
              <div className="p-5 rounded-xl bg-brand-navy-card/80 border border-brand-yellow/30 space-y-2">
                <h4 className="text-brand-yellow font-bold text-xs uppercase tracking-wider">
                  Key Strategic & Architectural Takeaways
                </h4>
                <ul className="space-y-2 text-xs">
                  {selectedArticle.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedArticle.tags?.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-slate-300"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleShareArticle(selectedArticle.title)}
                className="px-4 py-2 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover transition-colors"
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
