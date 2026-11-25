import React, { useState } from 'react';
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

  // Card toggles view on hover OR on click / tap
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

  const getServiceIcon = (iconName, className = "w-6 h-6 text-brand-royal") => {
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
    <div className="w-full h-[360px]">
      <div
        onClick={handleToggleFlip}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${service.title} card. Click or hover for detailed information.`}
        aria-expanded={isTurned}
        className="relative w-full h-full cursor-pointer select-none rounded-2xl group focus:outline-none focus:ring-2 focus:ring-brand-royal/60"
      >
        {!isTurned ? (
          /* ======================== FRONT SIDE ======================== */
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-white border border-[#C4CCD5]/60 hover:border-[#234F91]/50 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between">
            {/* Top Row: Icon + Service Number Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#EBF2FA] border border-[#234F91]/20 flex items-center justify-center">
                <div>
                  {getServiceIcon(service.icon)}
                </div>
              </div>

              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#F7F9FC] border border-[#C4CCD5]/60 text-brand-royal">
                0{idx + 1}
              </span>
            </div>

            {/* Middle: Clean Service Title & Description */}
            <div className="relative z-10 my-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-navy mb-2 font-heading group-hover:text-brand-royal leading-snug">
                {service.title}
              </h3>

              {service.tagline && (
                <p className="text-[11px] font-medium text-brand-steel mb-2 italic line-clamp-1">
                  {service.tagline}
                </p>
              )}

              <p className="text-xs text-slate-600 group-hover:text-slate-800 leading-relaxed line-clamp-2">
                {service.shortDesc}
              </p>
            </div>

            {/* Bottom: Click/Hover Indicator */}
            <div className="relative z-10 pt-3 border-t border-[#C4CCD5]/40 flex items-center justify-between">
              <div className="text-[11px] font-bold text-brand-royal uppercase tracking-wider flex items-center gap-1.5 group-hover:text-brand-navy">
                <span>Click to Explore</span>
                <RotateCcw className="w-3.5 h-3.5 text-brand-royal" />
              </div>

              <span className="text-[10px] text-slate-400 group-hover:text-brand-royal font-mono">
                Details ↻
              </span>
            </div>
          </div>
        ) : (
          /* ========================= BACK SIDE ======================== */
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-white border border-brand-royal/50 shadow-lg p-6 flex flex-col justify-between">
            {/* Header Row: Title & Flip Back Action */}
            <div className="relative z-10 flex items-center justify-between pb-2 border-b border-[#C4CCD5]/40">
              <div className="flex items-center gap-2 min-w-0">
                {getServiceIcon(service.icon, "w-4 h-4 text-brand-royal flex-shrink-0")}
                <h4 className="text-base font-bold text-brand-navy font-heading truncate">
                  {service.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={handleFlipBack}
                className="p-1 rounded-md text-slate-400 hover:text-brand-royal hover:bg-brand-royal/10 flex-shrink-0"
                title="Flip back to front"
                aria-label="Flip back to front"
              >
                <RotateCcw className="w-3.5 h-3.5 text-brand-royal" />
              </button>
            </div>

            {/* Back Body: 4–5 Key Capabilities with Icons */}
            <div className="relative z-10 space-y-1.5 my-auto">
              <span className="text-[10px] font-bold text-brand-royal uppercase tracking-widest block mb-1">
                Key Capabilities:
              </span>
              {service.features && service.features.slice(0, 5).map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700 leading-tight">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-royal flex-shrink-0 mt-0.5" />
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
                    className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-light border border-brand-silver/50 text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Bottom Actions: Get In Touch + Dedicated Page Link */}
            <div className="relative z-10 pt-3 border-t border-[#C4CCD5]/40 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/contact?service=${encodeURIComponent(service.title)}`);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-brand-royal text-white font-bold text-[11px] uppercase tracking-wider hover:bg-brand-navy shadow-sm transition-colors"
              >
                Get In Touch
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/services/${service.id}`);
                }}
                className="text-[11px] font-bold text-brand-navy hover:text-brand-royal flex items-center gap-1 group/link"
              >
                <span>Full Details</span>
                <ArrowRight className="w-3 h-3 text-brand-royal" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
