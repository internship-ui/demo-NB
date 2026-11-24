import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight,
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Code2,
  X,
  ZoomIn,
  Layers,
  ChevronRight
} from 'lucide-react';
import { 
  clientPortfolioData, 
  clientPortfolioCategories, 
  ourProjectsData 
} from '../data/portfolioData';
import PortfolioDataBackground from '../components/portfolio/PortfolioDataBackground';
import PortfolioLoadingScreen from '../components/portfolio/PortfolioLoadingScreen';
import { getAssetUrl } from '../utils/assetPath';

// =========================================================================
// REUSABLE 3D TILT PROJECT CARD COMPONENT
// =========================================================================
function InteractiveProjectCard({
  project,
  idx = 0,
  onSelect,
  onImageClick,
  prefersReducedMotion = false,
  isTouchDevice = false,
  badgeColor = "border-white/10 hover:border-brand-yellow/50"
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 6; // max 6 deg
    const rotY = ((x - centerX) / centerX) * 6;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ 
        duration: prefersReducedMotion ? 0.2 : 0.5, 
        delay: prefersReducedMotion ? 0 : idx * 0.08, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="h-full"
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(project);
          }
        }}
        aria-label={`View ${project.title} case study`}
        className={`relative h-full rounded-3xl bg-brand-navy-surface border ${badgeColor} overflow-hidden cursor-pointer flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-brand-yellow/60 transition-all duration-300 ${
          isHovered ? 'shadow-card-hover -translate-y-2 border-brand-yellow/60' : 'shadow-xl'
        }`}
        style={{
          transform: !prefersReducedMotion && !isTouchDevice && isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            : 'rotateX(0deg) rotateY(0deg)',
          transition: isHovered 
            ? 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease' 
            : 'transform 0.4s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
        }}
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/[0.08] via-transparent to-brand-navy-card/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Header Banner + Overlapping Logo */}
        <div className="relative h-44 overflow-hidden bg-brand-navy-card">
          <img
            src={project.bannerImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-surface via-transparent to-transparent opacity-60" />

          {/* Image Lightbox Trigger Prompt Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onImageClick(project);
            }}
            title="Click to view full image in lightbox"
            aria-label="Enlarge image in lightbox"
            className="absolute top-3 right-3 p-2 rounded-xl bg-brand-navy-dark/80 hover:bg-brand-yellow text-slate-300 hover:text-brand-navy backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 shadow-md"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Floating Client Logo Badge */}
          <div className="absolute -bottom-5 left-6 w-14 h-14 rounded-2xl bg-white p-1.5 shadow-2xl border-2 border-brand-navy-surface flex items-center justify-center overflow-hidden z-10 group-hover:scale-110 transition-transform duration-300">
            <img
              src={project.logoImage}
              alt={`${project.title} logo`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* Card Content Body */}
        <div className="pt-8 pb-6 px-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Project Title */}
            <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-brand-yellow transition-colors leading-snug">
              {project.title}
            </h3>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-3 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/10 group-hover:border-brand-yellow/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-2">
              {project.shortDesc}
            </p>
          </div>

          {/* Animated Action Button: View Case Study */}
          <div>
            <div className="w-full py-3 rounded-xl bg-white/5 group-hover:bg-brand-yellow text-slate-200 group-hover:text-brand-navy font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-white/10 group-hover:border-brand-yellow shadow-md group-hover:shadow-glow-yellow">
              <span>View Case Study</span>
              <ArrowUpRight className="w-4 h-4 text-brand-yellow group-hover:text-brand-navy transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// =========================================================================
// MAIN PORTFOLIO PAGE
// =========================================================================
export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect accessibility and device touch capabilities
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionHandler = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionHandler);

    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    return () => motionQuery.removeEventListener('change', motionHandler);
  }, []);

  // Keyboard navigation: Escape key closes modal & lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (lightboxImage) setLightboxImage(null);
        else if (selectedProject) setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, lightboxImage]);

  // Lock body scroll when modal or lightbox is active
  useEffect(() => {
    if (selectedProject || lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, lightboxImage]);

  // Filter Client Portfolio
  const filteredClientProjects = activeCategory === 'All'
    ? clientPortfolioData
    : clientPortfolioData.filter((p) => p.category === activeCategory);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <PortfolioLoadingScreen onFinish={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="pt-24 pb-20 relative min-h-screen overflow-hidden bg-brand-navy">
      {/* Premium Floating Digital Data Background Animation */}
      <PortfolioDataBackground />

      <div className="relative z-10">
        {/* ===================== HERO / HEADER: CLIENT PORTFOLIO ===================== */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

        {/* Radial Gradient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Subtle Ambient Particles */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { top: '20%', left: '15%', size: 6, delay: 0 },
              { top: '35%', left: '80%', size: 8, delay: 1.2 },
              { top: '65%', left: '10%', size: 5, delay: 2.1 },
              { top: '75%', left: '85%', size: 7, delay: 0.6 },
              { top: '80%', left: '50%', size: 6, delay: 1.8 }
            ].map((p, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-12, 12, -12],
                  x: [-6, 6, -6],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: p.delay
                }}
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.size,
                  height: p.size
                }}
                className="absolute rounded-full bg-brand-yellow"
              />
            ))}
          </div>
        )}

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge: On page load entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6 shadow-glow-yellow"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow animate-spin-slow" />
            <span>Proven Client Work &amp; Digital Engineering</span>
          </motion.div>

          {/* Heading: 'Client' smoothly slides up; yellow 'Portfolio' animates separately */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight mb-6 flex flex-wrap items-center justify-center gap-x-3.5">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Client
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-400 drop-shadow-sm"
            >
              Portfolio
            </motion.span>
          </h1>

          {/* Description Fade In */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Explore our trusted client partnerships across healthcare, sustainable organisations, and local businesses—delivering reliable website maintenance, digital presence, and specialized software.
          </motion.p>
        </div>
      </section>

      {/* ===================== CATEGORY FILTER TABS (ANIMATED ACTIVE PILL) ===================== */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {clientPortfolioCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className="relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
              >
                {/* Smooth Animated Yellow Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-brand-yellow rounded-xl shadow-glow-yellow"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}

                {/* Animated underline indicator when active */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    className="absolute -bottom-1 left-3 right-3 h-0.5 bg-brand-yellow rounded-full shadow-glow-yellow"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}

                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive 
                      ? 'text-brand-navy font-bold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {cat}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ===================== CLIENT PORTFOLIO GALLERY GRID ===================== */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredClientProjects.map((project, idx) => (
                <InteractiveProjectCard
                  key={project.id}
                  project={project}
                  idx={idx}
                  onSelect={setSelectedProject}
                  onImageClick={(p) => setLightboxImage({ src: p.bannerImage, title: p.title })}
                  prefersReducedMotion={prefersReducedMotion}
                  isTouchDevice={isTouchDevice}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ======================================================================= */}
      {/* ============ DEDICATED SECTION UNDER CLIENT PORTFOLIO: OUR PROJECTS === */}
      {/* ======================================================================= */}
      <section className="mt-28 py-16 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark/90 border-t border-brand-yellow/20 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header: Our Projects + Tagline "Real solutions delivered for real businesses" */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/40 text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-yellow"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Proprietary Platforms &amp; Products</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-3"
            >
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-400">
                Projects
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl font-medium text-slate-200"
            >
              Real solutions delivered for real businesses
            </motion.p>
          </div>

          {/* Platform Showcase: Uiverse.io Animated Cards (Our Projects Only) */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 max-w-5xl mx-auto py-8">
            {[
              {
                id: 'jkd-mart',
                name: 'JKD Mart',
                logo: getAssetUrl('/portfolio/jkd-mart-logo.svg'),
                tag: 'Smart Digital Retail & E-Commerce'
              },
              {
                id: 'vyapara',
                name: 'Vyapara',
                logo: getAssetUrl('/portfolio/vyapara-logo.svg'),
                tag: 'Smart Business & Billing Platform'
              },
              {
                id: 'tokens-boy',
                name: 'Tokens Boy',
                logo: getAssetUrl('/portfolio/tokens-boy-logo.svg'),
                tag: 'Smart Token & Queue Management'
              }
            ].map((prod, idx) => {
              const projectObj = ourProjectsData.find((p) => p.id === prod.id);
              return (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="uiverse-card group"
                  onClick={() => projectObj && setSelectedProject(projectObj)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      projectObj && setSelectedProject(projectObj);
                    }
                  }}
                >
                  <div className="uiverse-card-content">
                    <div className="flex items-center justify-between w-full">
                      <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex items-center justify-center border border-white/10 group-hover:border-brand-yellow/50 transition-colors">
                        <img
                          src={prod.logo}
                          alt={prod.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded-full border border-brand-yellow/30 uppercase tracking-wider">
                        {projectObj?.badge || 'PRODUCT'}
                      </span>
                    </div>

                    <div className="my-2">
                      <p className="heading group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-yellow transition-all">
                        {prod.name}
                      </p>
                      <span className="text-[11px] font-semibold text-slate-400 block mt-0.5 mb-2">
                        {prod.tag}
                      </span>
                      <p>
                        {projectObj?.shortDesc}
                      </p>
                    </div>

                    <p className="group-hover:translate-x-1 transition-transform">
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-4 h-4 ml-1 inline-block" />
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== BOTTOM CTA BANNER ===================== */}
      <section className="mt-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-brand-navy-surface border border-brand-yellow/30 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grow Your Digital Presence</span>
          </span>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-3">
            Ready to Build or Elevate Your Online Footprint?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
            From complete website maintenance and social media management to tailored token booking and workflow applications, we empower businesses with reliable technology solutions.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover shadow-lg hover:shadow-glow-yellow transition-all duration-200 active:scale-95 group"
          >
            <span>Get In Touch With Us</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
      </div>

      {/* ======================================================================= */}
      {/* ============ ANIMATED PROJECT DETAIL OPENING MODAL ==================== */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop with Blur and Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-brand-navy-dark/85 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Animated Modal Container (Scale-Up + Fade-In) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: 'spring', 
                damping: 26, 
                stiffness: 320 
              }}
              className="relative w-full max-w-3xl bg-brand-navy-surface border border-brand-yellow/30 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Header with Close Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-navy-card/80 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                  <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider">
                    {selectedProject.badge || selectedProject.category}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-brand-yellow hover:bg-white/10 transition-colors group"
                  aria-label="Close modal window"
                >
                  <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
                {/* Large Project Image Banner (Clickable to Lightbox) */}
                <div 
                  onClick={() => setLightboxImage({ src: selectedProject.bannerImage, title: selectedProject.title })}
                  className="relative h-56 sm:h-64 overflow-hidden rounded-2xl border border-white/10 bg-brand-navy-card cursor-pointer group"
                  title="Click to expand image in full-screen lightbox"
                >
                  <img
                    src={selectedProject.bannerImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/95 via-transparent to-transparent opacity-80" />

                  {/* Zoom Badge prompt */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-brand-navy-dark/80 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md border border-white/15 group-hover:bg-brand-yellow group-hover:text-brand-navy transition-colors">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to Enlarge</span>
                  </div>

                  {/* Overlapping Client Logo and Title */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-2xl border-2 border-white/20 flex-shrink-0">
                      <img
                        src={selectedProject.logoImage}
                        alt={selectedProject.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest block">
                        {selectedProject.category}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold text-white font-heading">
                        {selectedProject.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Executive Overview */}
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                    Executive Overview
                  </h4>
                  <p className="leading-relaxed text-slate-300 text-sm">
                    {selectedProject.fullDesc}
                  </p>
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <h5 className="text-brand-yellow font-bold text-xs uppercase tracking-wider mb-2">
                      The Objective / Challenge
                    </h5>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <h5 className="text-brand-yellow font-bold text-xs uppercase tracking-wider mb-2">
                      Our Delivered Solution
                    </h5>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Measurable Deliverables / Outcomes */}
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                    Key Deliverables &amp; Impact
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.results.map((res, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-yellow/5 border border-brand-yellow/15 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Scope Tags */}
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                    Service Scope &amp; Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium px-3 py-1 rounded-lg bg-white/5 text-brand-yellow border border-brand-yellow/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="p-6 border-t border-white/10 bg-brand-navy-card/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                {selectedProject.link && selectedProject.link.startsWith('http') ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand-yellow hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">
                    Engineered with dedicated continuous support SLA
                  </span>
                )}

                <Link
                  to={`/contact?service=${encodeURIComponent(selectedProject.title)}`}
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover shadow-lg hover:shadow-glow-yellow transition-all text-center active:scale-95"
                >
                  Inquire For Similar Build
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================================= */}
      {/* ============ FULL-SCREEN IMAGE LIGHTBOX MODAL ========================= */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[70] bg-black/92 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Top Close Button */}
            <div className="absolute top-5 right-6 z-10 flex items-center gap-4">
              <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                {lightboxImage.title} • Press ESC to close
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-brand-yellow text-white hover:text-brand-navy transition-colors shadow-xl"
                aria-label="Close image lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Animated Large Image Container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-brand-navy-dark"
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full h-full max-h-[82vh] object-contain"
              />
              <div className="p-4 bg-brand-navy-card/90 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm font-bold text-white font-heading">
                  {lightboxImage.title}
                </span>
                <span className="text-xs text-brand-yellow font-semibold">
                  High-Resolution Asset
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
