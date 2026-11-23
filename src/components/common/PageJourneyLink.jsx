import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  ArrowDown,
  ArrowUp,
  Compass, 
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { pageFlow } from '../../data/navigationFlow';

export default function PageJourneyLink() {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll charge state: 0 to 100
  const [scrollCharge, setScrollCharge] = useState(0);
  const [chargeDirection, setChargeDirection] = useState(null); // 'next' | 'prev' | null
  const [showFloatingPill, setShowFloatingPill] = useState(false);

  const chargeRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const resetTimerRef = useRef(null);
  const touchStartYRef = useRef(null);
  const lastWheelTimeRef = useRef(0);

  // Determine current page index
  const currentPath = location.pathname;
  let currentIndex = pageFlow.findIndex((p) => p.path === currentPath);
  
  if (currentIndex === -1) {
    if (currentPath.startsWith('/services/')) {
      currentIndex = 2; // Services
    } else {
      return null;
    }
  }

  const currentPage = pageFlow[currentIndex];
  const nextIndex = (currentIndex + 1) % pageFlow.length;
  const prevIndex = (currentIndex - 1 + pageFlow.length) % pageFlow.length;
  const nextPage = pageFlow[nextIndex];
  const prevPage = pageFlow[prevIndex];

  // Core navigation trigger with cooldown lock and direction flag
  const triggerNavigate = (direction) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const targetPage = direction === 'next' ? nextPage : prevPage;
    const transitionDirection = direction === 'next' ? 'down' : 'up';

    setScrollCharge(100);
    setChargeDirection(direction);

    // Navigate to target route with directional state for AnimatedRoutes
    navigate(targetPage.path, { state: { direction: transitionDirection } });
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 1000ms cooldown to absorb trackpad/mousewheel inertia
    setTimeout(() => {
      isTransitioningRef.current = false;
      chargeRef.current = 0;
      setScrollCharge(0);
      setChargeDirection(null);
    }, 1000);
  };

  // 1. Wheel listener: bidirectional overscroll detection
  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioningRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isAtBottom = windowHeight + scrollY >= docHeight - 35;
      const isAtTop = scrollY <= 12;

      // SCROLL DOWN AT BOTTOM -> Next Page
      if (isAtBottom && e.deltaY > 6) {
        const absDelta = Math.abs(e.deltaY);
        const addedCharge = Math.min(80, Math.max(35, absDelta * 0.7));
        chargeRef.current = Math.min(100, chargeRef.current + addedCharge);
        setScrollCharge(chargeRef.current);
        setChargeDirection('next');

        if (chargeRef.current >= 60) {
          triggerNavigate('next');
          return;
        }

        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => {
          chargeRef.current = 0;
          setScrollCharge(0);
          setChargeDirection(null);
        }, 500);
      }
      // SCROLL UP AT TOP -> Previous Page
      else if (isAtTop && e.deltaY < -6) {
        const absDelta = Math.abs(e.deltaY);
        const addedCharge = Math.min(80, Math.max(35, absDelta * 0.7));
        chargeRef.current = Math.min(100, chargeRef.current + addedCharge);
        setScrollCharge(chargeRef.current);
        setChargeDirection('prev');

        if (chargeRef.current >= 60) {
          triggerNavigate('prev');
          return;
        }

        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => {
          chargeRef.current = 0;
          setScrollCharge(0);
          setChargeDirection(null);
        }, 500);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextPage.path, prevPage.path]);

  // 2. Touch gesture listener for mobile & tablet
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!touchStartYRef.current || isTransitioningRef.current) return;
      const currentY = e.touches[0].clientY;
      const diffY = touchStartYRef.current - currentY; // positive = swipe up (scrolling down)

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isAtBottom = windowHeight + scrollY >= docHeight - 35;
      const isAtTop = scrollY <= 10;

      // Swipe UP at bottom -> Next Page
      if (isAtBottom && diffY > 60) {
        touchStartYRef.current = null;
        triggerNavigate('next');
      }
      // Swipe DOWN at top -> Previous Page
      else if (isAtTop && diffY < -60) {
        touchStartYRef.current = null;
        triggerNavigate('prev');
      }
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextPage.path, prevPage.path]);

  // 3. Monitor scroll depth to reveal quick navigator floating pill
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingPill(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Reset charges on route change
  useEffect(() => {
    chargeRef.current = 0;
    setScrollCharge(0);
    setChargeDirection(null);
  }, [location.pathname]);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DYNAMIC TOP SCROLL-UP FEEDBACK (RETURNING TO PREVIOUS PAGE)            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {chargeDirection === 'prev' && scrollCharge > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="flex flex-col items-center gap-2 px-6 py-3 rounded-2xl bg-brand-navy-dark/95 border border-brand-yellow/60 shadow-[0_10px_35px_rgba(7,27,58,0.8),0_0_20px_rgba(255,201,40,0.25)] backdrop-blur-md">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-brand-yellow font-heading">
                <ArrowUp className="w-4 h-4 animate-bounce" />
                <span>Scroll up or release to return to {prevPage.name} (0{prevPage.step}/07)</span>
              </div>
              {/* Progress Bar */}
              <div className="w-48 sm:w-64 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-brand-yellow shadow-glow-yellow transition-all duration-100"
                  style={{ width: `${scrollCharge}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. DYNAMIC BOTTOM SCROLL-DOWN FEEDBACK (ADVANCING TO NEXT PAGE)          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {chargeDirection === 'next' && scrollCharge > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="flex flex-col items-center gap-2 px-6 py-3 rounded-2xl bg-brand-navy-dark/95 border border-brand-yellow/60 shadow-[0_10px_35px_rgba(7,27,58,0.8),0_0_20px_rgba(255,201,40,0.25)] backdrop-blur-md">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-brand-yellow font-heading">
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span>Scroll down or release to continue to {nextPage.name} (0{nextPage.step}/07)</span>
              </div>
              {/* Progress Bar */}
              <div className="w-48 sm:w-64 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-brand-yellow shadow-glow-yellow transition-all duration-100"
                  style={{ width: `${scrollCharge}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 3. PERSISTENT FLOATING QUICK CONTROLLER (BOTTOM RIGHT)                   */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-brand-navy-surface/90 border border-brand-yellow/40 backdrop-blur-md shadow-2xl shadow-black/50 text-white">
        {/* Previous Page Button (Up) */}
        <button
          onClick={() => triggerNavigate('prev')}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-brand-navy-card/80 hover:bg-brand-yellow hover:text-brand-navy border border-white/10 hover:border-brand-yellow transition-all text-xs font-semibold group cursor-pointer active:scale-95"
          title={`Previous Page: ${prevPage.name}`}
          aria-label={`Go back to ${prevPage.name}`}
        >
          <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          <span className="hidden md:inline text-[11px] font-heading">{prevPage.name}</span>
        </button>

        {/* Current Page Step Pill */}
        <div className="px-2.5 sm:px-3 py-1 text-center select-none">
          <div className="text-[10px] text-brand-yellow font-bold uppercase tracking-wider font-mono">
            {currentPage.step}/7
          </div>
          <div className="text-xs font-bold text-white font-heading truncate max-w-[90px] sm:max-w-none">
            {currentPage.name}
          </div>
        </div>

        {/* Next Page Button (Down) */}
        <button
          onClick={() => triggerNavigate('next')}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy shadow-glow-yellow font-bold transition-all text-xs group cursor-pointer active:scale-95"
          title={`Next Page: ${nextPage.name}`}
          aria-label={`Continue to ${nextPage.name}`}
        >
          <span className="hidden md:inline text-[11px] font-heading">{nextPage.name}</span>
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 4. SEQUENTIAL ONE-BY-ONE JOURNEY CARD (ABOVE FOOTER)                      */}
      {/* ========================================================================= */}
      <section
        aria-label="Website Page Progression Flow"
        className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark border-t border-brand-yellow/20 overflow-hidden"
      >
        {/* Background Cyber Accents */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute -top-32 right-1/4 w-[500px] h-[350px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-[450px] h-[300px] bg-brand-navy-card/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          {/* Header & Step Sequence Breadcrumb */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow-yellow"
            >
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Step-by-Step Page Flow • Chapter {currentPage.step} of 7</span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight"
            >
              Linked Website Journey: <span className="text-brand-yellow">One-by-One Page Flow</span>
            </motion.h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              Scroll down to advance to the next page, or scroll up at the top to return to the previous page.
            </p>

            {/* Visual 7-Step Navigation Nodes */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 mt-6 overflow-x-auto pb-2 scrollbar-none">
              {pageFlow.map((page, idx) => {
                const isCurrent = page.id === currentPage.id;
                const isNext = page.id === nextPage.id;
                const isPast = page.step < currentPage.step;

                return (
                  <React.Fragment key={page.id}>
                    <button
                      onClick={() => {
                        const targetDir = page.step > currentPage.step ? 'down' : 'up';
                        navigate(page.path, { state: { direction: targetDir } });
                        window.scrollTo({ top: 0, behavior: 'instant' });
                      }}
                      className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                        isCurrent
                          ? 'bg-brand-yellow text-brand-navy shadow-glow-yellow font-bold scale-105'
                          : isNext
                          ? 'bg-brand-navy-surface border border-brand-yellow/60 text-brand-yellow hover:bg-brand-yellow/20'
                          : isPast
                          ? 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                          : 'bg-brand-navy-surface/60 border border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-80">{`0${page.step}`}</span>
                      <span className="hidden md:inline">{page.name}</span>
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-navy animate-pulse" />
                      )}
                    </button>

                    {idx < pageFlow.length - 1 && (
                      <span className={`text-[10px] ${isPast ? 'text-brand-yellow' : 'text-slate-600'}`}>
                        →
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Dual Action Journey Card: Next & Previous */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-gradient-to-br from-brand-navy-surface via-brand-navy-card to-brand-navy border border-brand-yellow/30 hover:border-brand-yellow/70 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-500 overflow-hidden"
          >
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
              {/* Next Chapter Info */}
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-brand-yellow/15 border border-brand-yellow/40 text-brand-yellow text-[11px] font-bold uppercase tracking-wider">
                    Next Chapter • 0{nextPage.step} of 07
                  </span>
                  <span className="text-slate-400 text-xs hidden sm:inline">
                    {nextPage.highlight}
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading">
                  {nextPage.name}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-400">{nextPage.tagline}</span>
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {nextPage.description}
                </p>
              </div>

              {/* Action Buttons: Next & Previous */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end flex-shrink-0">
                {/* Continue to Next Page */}
                <button
                  onClick={() => triggerNavigate('next')}
                  className="px-7 py-3.5 rounded-2xl bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-glow-yellow transition-all duration-300 flex items-center justify-center gap-3 group/btn cursor-pointer active:scale-95"
                >
                  <span>Continue to {nextPage.name}</span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover/btn:translate-y-1" />
                </button>

                {/* Back to Previous Page */}
                <button
                  onClick={() => triggerNavigate('prev')}
                  className="px-6 py-2.5 rounded-2xl bg-brand-navy-surface hover:bg-white/10 border border-brand-yellow/30 hover:border-brand-yellow text-slate-200 hover:text-brand-yellow text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Back to Previous: {prevPage.name}</span>
                </button>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
                <span>
                  Tip: Scroll down at the bottom of the page to advance to <strong className="text-white">{nextPage.name}</strong>, or scroll up at the top to go back to <strong className="text-white">{prevPage.name}</strong>.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
