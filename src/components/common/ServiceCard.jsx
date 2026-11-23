import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  RotateCcw,
  CheckCircle2, 
  Bot, 
  Cloud, 
  Smartphone, 
  Globe, 
  Palette, 
  Megaphone, 
  PhoneCall, 
  Cpu
} from 'lucide-react';

export default function ServiceCard({
  service,
  idx = 0
}) {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Card activates turn animation on hover OR on click / tap
  const isTurned = isFlipped || isHovered;

  const handleToggleFlip = (e) => {
    if (e) e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  const handleFlipBack = (e) => {
    if (e) e.stopPropagation();
    setIsFlipped(false);
    setIsHovered(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleFlip(e);
    }
  };

  const getServiceIcon = (iconName, className = "w-6 h-6 text-brand-yellow") => {
    switch (iconName) {
      case 'Bot': return <Bot className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      case 'Smartphone': return <Smartphone className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Megaphone': return <Megaphone className={className} />;
      case 'PhoneCall': return <PhoneCall className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-[360px]"
      style={{ 
        perspective: '1200px',
        WebkitPerspective: '1200px'
      }}
    >
      <div
        onClick={handleToggleFlip}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${service.title} card. Click or hover to flip for detailed information.`}
        aria-expanded={isTurned}
        className="relative w-full h-full cursor-pointer select-none rounded-2xl group focus:outline-none focus:ring-2 focus:ring-brand-yellow/60"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transform: isTurned ? 'rotateY(180deg)' : 'rotateY(0deg)',
          WebkitTransform: isTurned ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: prefersReducedMotion 
            ? 'transform 0.2s ease' 
            : 'transform 0.75s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        {/* ============================================================ */}
        {/* ======================== FRONT SIDE ======================== */}
        {/* ============================================================ */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            WebkitTransform: 'rotateY(0deg)',
            pointerEvents: isTurned ? 'none' : 'auto',
            zIndex: isTurned ? 1 : 2
          }}
          className={`absolute inset-0 w-full h-full rounded-2xl bg-brand-navy-surface border ${
            isTurned ? 'border-white/10' : 'border-white/10 group-hover:border-brand-yellow/60 group-hover:shadow-glow-yellow'
          } p-6 flex flex-col justify-between transition-colors duration-300`}
        >
          {/* Subtle Ambient Hover Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-yellow/[0.08] via-transparent to-brand-navy-card/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Top Row: Floating Icon + Service Number Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-brand-navy-card border border-brand-yellow/30 group-hover:border-brand-yellow group-hover:shadow-glow-yellow flex items-center justify-center transition-all duration-300">
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {getServiceIcon(service.icon)}
              </div>
            </div>

            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-brand-yellow">
              0{idx + 1}
            </span>
          </div>

          {/* Middle: Clean Service Title & Maximum 2-line Description */}
          <div className="relative z-10 my-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading group-hover:text-brand-yellow transition-colors duration-300 leading-snug">
              {service.title}
            </h3>

            {service.tagline && (
              <p className="text-[11px] font-medium text-brand-yellow/80 mb-2 italic line-clamp-1">
                {service.tagline}
              </p>
            )}

            <p className="text-xs text-slate-300 group-hover:text-slate-100 transition-colors duration-300 leading-relaxed line-clamp-2">
              {service.shortDesc}
            </p>
          </div>

          {/* Bottom: Click/Hover to Explore Indicator */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="text-[11px] font-bold text-brand-yellow uppercase tracking-wider flex items-center gap-1.5 group-hover:text-white transition-colors">
              <span>Click to Explore</span>
              <RotateCcw className="w-3.5 h-3.5 text-brand-yellow transition-transform duration-300 group-hover:rotate-180" />
            </div>

            <span className="text-[10px] text-slate-400 group-hover:text-brand-yellow transition-colors font-mono">
              Turn ↻
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ========================= BACK SIDE ======================== */}
        {/* ============================================================ */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            WebkitTransform: 'rotateY(180deg)',
            pointerEvents: isTurned ? 'auto' : 'none',
            zIndex: isTurned ? 2 : 1
          }}
          className="absolute inset-0 w-full h-full rounded-2xl bg-brand-navy-card border border-brand-yellow/60 shadow-glow-yellow p-6 flex flex-col justify-between"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-brand-yellow/[0.08] via-transparent to-brand-navy-card/[0.1] pointer-events-none" />

          {/* Header Row: Title & Flip Back Action */}
          <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              {getServiceIcon(service.icon, "w-4 h-4 text-brand-yellow flex-shrink-0")}
              <h4 className="text-base font-bold text-white font-heading truncate">
                {service.title}
              </h4>
            </div>

            <button
              type="button"
              onClick={handleFlipBack}
              className="p-1 rounded-md text-slate-400 hover:text-brand-yellow hover:bg-white/10 transition-colors flex-shrink-0"
              title="Flip back to front"
              aria-label="Flip back to front"
            >
              <RotateCcw className="w-3.5 h-3.5 text-brand-yellow" />
            </button>
          </div>

          {/* Back Body: 4–5 Key Capabilities with Icons */}
          <div className="relative z-10 space-y-1.5 my-auto">
            <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest block mb-1">
              Key Capabilities:
            </span>
            {service.features && service.features.slice(0, 5).map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px] text-slate-200 leading-tight">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>

          {/* Relevant Technologies Chips */}
          {service.technologies && (
            <div className="relative z-10 flex flex-wrap gap-1 py-1">
              {service.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-navy-surface border border-white/10 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Actions: Get In Touch + Dedicated Page Link */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/contact?service=${encodeURIComponent(service.title)}`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-brand-yellow text-brand-navy font-bold text-[11px] uppercase tracking-wider hover:bg-brand-yellow-hover shadow-md hover:shadow-glow-yellow transition-all duration-200 active:scale-95"
            >
              Get In Touch
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/services/${service.id}`);
              }}
              className="text-[11px] font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-1 group/link"
            >
              <span>Full Details</span>
              <ArrowRight className="w-3 h-3 text-brand-yellow transition-transform group-hover/link:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
