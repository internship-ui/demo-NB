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
import MarqueeBanner from '../components/common/MarqueeBanner';
import { getAssetUrl } from '../utils/assetPath';

// =========================================================================
// REUSABLE PROJECT CARD COMPONENT
// =========================================================================
function InteractiveProjectCard({
  project,
  idx = 0,
  onSelect,
  onImageClick,
  badgeColor = "border-brand-silver/60 hover:border-brand-royal/50"
}) {
  return (
    <div className="h-full">
      <div
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
        className={`relative h-full rounded-3xl bg-white border ${badgeColor} overflow-hidden cursor-pointer flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-brand-royal/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
      >
        {/* Top Header Banner + Overlapping Logo */}
        <div className="relative h-44 overflow-hidden bg-brand-light">
          <img
            src={project.bannerImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />

          {/* Image Lightbox Trigger Prompt Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onImageClick(project);
            }}
            title="Click to view full image in lightbox"
            aria-label="Enlarge image in lightbox"
            className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 hover:bg-brand-royal text-brand-navy hover:text-white backdrop-blur-md border border-brand-silver/50 opacity-0 group-hover:opacity-100 transition-all duration-200 z-20 shadow-sm cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Floating Client Logo Badge */}
          <div className="absolute -bottom-5 left-6 w-14 h-14 rounded-2xl bg-white p-1.5 shadow-md border-2 border-brand-silver/50 flex items-center justify-center overflow-hidden z-10 group-hover:scale-105 transition-transform duration-300">
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
            <h3 className="text-xl font-bold text-brand-navy mb-3 font-heading group-hover:text-brand-royal transition-colors leading-snug">
              {project.title}
            </h3>

            {/* Service Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-3 py-1 rounded-lg bg-brand-light text-slate-700 border border-brand-silver/50 group-hover:border-brand-royal/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-2">
              {project.shortDesc}
            </p>
          </div>

          {/* Action Button: View Case Study */}
          <div>
            <div className="w-full py-3 rounded-xl bg-brand-light group-hover:bg-brand-royal text-brand-navy group-hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-brand-silver/60 group-hover:border-brand-royal shadow-sm">
              <span>View Case Study</span>
              <ArrowUpRight className="w-4 h-4 text-brand-royal group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
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

      <div className="pt-24 pb-20 relative min-h-screen overflow-hidden bg-brand-light">
      {/* Premium Floating Digital Data Background Animation */}
      <PortfolioDataBackground />

      <div className="relative z-10">
        {/* ===================== HERO / HEADER: CLIENT PORTFOLIO ===================== */}
        <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="relative max-w-5xl mx-auto text-center">
            {/* Editorial Eyebrow */}
            <div className="font-mono text-xs text-brand-royal font-bold tracking-widest uppercase mb-4">
              [03 // SELECTED WORKS] · MYSURU 12.2958° N, 76.6394° E
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-royal/25 text-brand-royal text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-royal" />
              <span>Proven Client Work &amp; Digital Engineering</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy font-heading tracking-tight mb-6 uppercase">
              Client{' '}
              <span className="text-brand-royal underline decoration-brand-steel/30 decoration-wavy underline-offset-8">
                Portfolio
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explore our trusted client partnerships across healthcare, sustainable organisations, and local businesses—delivering reliable website maintenance, digital presence, and specialized software.
            </p>
          </div>
        </section>

        {/* Marquee Banner */}
        <MarqueeBanner className="mb-12" />

        {/* ===================== CATEGORY FILTER TABS ===================== */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {clientPortfolioCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-royal text-white font-bold shadow-md border border-brand-royal'
                      : 'bg-white border border-brand-silver/60 text-slate-700 hover:text-brand-royal hover:bg-brand-light'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* ===================== CLIENT PORTFOLIO GALLERY GRID ===================== */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClientProjects.map((project, idx) => (
                <InteractiveProjectCard
                  key={project.id}
                  project={project}
                  idx={idx}
                  onSelect={setSelectedProject}
                  onImageClick={(p) => setLightboxImage({ src: p.bannerImage, title: p.title })}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* ============ DEDICATED SECTION UNDER CLIENT PORTFOLIO: OUR PROJECTS === */}
        {/* ======================================================================= */}
        <section className="mt-28 py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-silver/40 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-royal/10 border border-brand-royal/20 text-brand-royal text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Proprietary Platforms &amp; Products</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-heading tracking-tight mb-3"
              >
                Our <span className="text-brand-royal">Projects</span>
              </h2>

              <p className="text-lg sm:text-xl font-medium text-slate-600">
                Real solutions delivered for real businesses
              </p>
            </div>

            {/* Platform Showcase: Uiverse.io Cards */}
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
              ].map((prod) => {
                const projectObj = ourProjectsData.find((p) => p.id === prod.id);
                return (
                  <div
                    key={prod.id}
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
                        <div className="w-12 h-12 rounded-xl bg-brand-light p-2 flex items-center justify-center border border-brand-silver/50 group-hover:border-brand-royal/50 transition-colors">
                          <img
                            src={prod.logo}
                            alt={prod.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-brand-royal bg-brand-royal/10 px-2 py-0.5 rounded-full border border-brand-royal/30 uppercase tracking-wider">
                          {projectObj?.badge || 'PRODUCT'}
                        </span>
                      </div>

                      <div className="my-2">
                        <p className="heading group-hover:text-brand-royal transition-colors">
                          {prod.name}
                        </p>
                        <span className="text-[11px] font-semibold text-slate-500 block mt-0.5 mb-2">
                          {prod.tag}
                        </span>
                        <p className="text-slate-600 text-xs line-clamp-3">
                          {projectObj?.shortDesc}
                        </p>
                      </div>

                      <p className="group-hover:translate-x-1 transition-transform text-xs font-bold text-brand-royal flex items-center">
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4 ml-1 inline-block" />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== BOTTOM CTA BANNER ===================== */}
        <section className="mt-20 px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-navy via-[#1B3E73] to-brand-navy border border-brand-steel/40 text-center relative overflow-hidden shadow-2xl text-white"
          >
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-brand-royal/20 rounded-full blur-3xl pointer-events-none" />

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C4CCD5] border border-white/20 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grow Your Digital Presence</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-3">
              Ready to Build or Elevate Your Online Footprint?
            </h3>
            <p className="text-sm sm:text-base text-[#C4CCD5] mb-8 max-w-xl mx-auto leading-relaxed">
              From complete website maintenance and social media management to tailored token booking and workflow applications, we empower businesses with reliable technology solutions.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-brand-navy shadow-lg transition-all duration-200 active:scale-95 group"
            >
              <span>Get In Touch With Us</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </div>

      {/* ======================================================================= */}
      {/* ============ ANIMATED PROJECT DETAIL OPENING MODAL ==================== */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Container */}
            <div
              className="relative w-full max-w-3xl bg-white border border-brand-silver/60 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Header with Close Button */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-silver/40 bg-brand-light">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-royal" />
                  <span className="text-xs font-bold text-brand-royal uppercase tracking-wider">
                    {selectedProject.badge || selectedProject.category}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-brand-royal hover:bg-brand-royal/10 transition-colors group cursor-pointer"
                  aria-label="Close modal window"
                >
                  <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar text-slate-700">
                {/* Large Project Image Banner */}
                <div 
                  onClick={() => setLightboxImage({ src: selectedProject.bannerImage, title: selectedProject.title })}
                  className="relative h-56 sm:h-64 overflow-hidden rounded-2xl border border-brand-silver/50 bg-brand-light cursor-pointer group"
                  title="Click to expand image in full-screen lightbox"
                >
                  <img
                    src={selectedProject.bannerImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

                  {/* Zoom Badge prompt */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-white/90 text-brand-navy text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md border border-brand-silver/50 group-hover:bg-brand-royal group-hover:text-white transition-colors">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to Enlarge</span>
                  </div>

                  {/* Overlapping Client Logo and Title */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-md border-2 border-brand-silver/50 flex-shrink-0">
                      <img
                        src={selectedProject.logoImage}
                        alt={selectedProject.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest block drop-shadow-sm">
                        {selectedProject.category}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-bold text-white font-heading drop-shadow-sm">
                        {selectedProject.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Executive Overview */}
                <div>
                  <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                    Executive Overview
                  </h4>
                  <p className="leading-relaxed text-slate-600 text-sm">
                    {selectedProject.fullDesc}
                  </p>
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-brand-light border border-brand-silver/50">
                    <h5 className="text-brand-royal font-bold text-xs uppercase tracking-wider mb-2">
                      The Objective / Challenge
                    </h5>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-light border border-brand-silver/50">
                    <h5 className="text-brand-royal font-bold text-xs uppercase tracking-wider mb-2">
                      Our Delivered Solution
                    </h5>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Measurable Deliverables / Outcomes */}
                <div>
                  <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                    Key Deliverables &amp; Impact
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.results.map((res, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-royal/5 border border-brand-royal/15 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Scope Tags */}
                <div>
                  <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                    Service Scope &amp; Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium px-3 py-1 rounded-lg bg-brand-light text-brand-royal border border-brand-silver/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Bottom Actions */}
              <div className="p-6 border-t border-brand-silver/40 bg-brand-light flex flex-col sm:flex-row items-center justify-between gap-3">
                {selectedProject.link && selectedProject.link.startsWith('http') ? (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand-royal hover:underline flex items-center gap-1.5 transition-colors"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">
                    Engineered with dedicated continuous support SLA
                  </span>
                )}

                <Link
                  to={`/contact?service=${encodeURIComponent(selectedProject.title)}`}
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy shadow-md transition-all text-center active:scale-95"
                >
                  Inquire For Similar Build
                </Link>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================================= */}
      {/* ============ FULL-SCREEN IMAGE LIGHTBOX MODAL ========================= */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Top Close Button */}
            <div className="absolute top-5 right-6 z-10 flex items-center gap-4">
              <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                {lightboxImage.title} • Press ESC to close
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-brand-navy transition-colors shadow-xl cursor-pointer"
                aria-label="Close image lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-brand-navy"
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full h-full max-h-[82vh] object-contain"
              />
              <div className="p-4 bg-brand-navy border-t border-white/10 flex items-center justify-between">
                <span className="text-sm font-bold text-white font-heading">
                  {lightboxImage.title}
                </span>
                <span className="text-xs text-[#C4CCD5] font-semibold">
                  High-Resolution Asset
                </span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
