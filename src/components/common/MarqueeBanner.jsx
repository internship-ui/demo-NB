import React from 'react';

/**
 * MarqueeBanner - Infinite scrolling ticker inspired by Alpha Groups India
 * Supports bidirectional movement (left or right), hover pause, and variable speed.
 */
export default function MarqueeBanner({
  items,
  isDark = false,
  className = '',
  speed = 'normal', // 'slow' | 'normal' | 'fast'
  direction = 'left' // 'left' | 'right'
}) {
  const defaultItems = [
    'CUSTOM WEB ENGINEERING',
    'CLOUD ARCHITECTURE & DEVOPS',
    'AI & ENTERPRISE AUTOMATION',
    'CROSS-PLATFORM MOBILE APPS',
    'HIGH-CONVERSION UI/UX DESIGN',
    'CYBER DEFENSE & COMPLIANCE',
    'PERFORMANCE DIGITAL MARKETING',
    'API & MICROSERVICES INTEGRATION'
  ];

  const displayItems = items || defaultItems;

  const speedClass = {
    slow: direction === 'right' ? 'animate-marquee-reverse-slow' : 'animate-marquee-slow',
    normal: direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee',
    fast: direction === 'right' ? 'animate-marquee-reverse-fast' : 'animate-marquee-fast'
  }[speed] || (direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee');

  return (
    <div
      className={`relative w-full overflow-hidden py-3 sm:py-4 border-y transition-colors select-none group ${
        isDark
          ? 'bg-brand-navy border-brand-steel/30 text-white'
          : 'bg-white/80 backdrop-blur-sm border-brand-silver/50 text-brand-navy'
      } ${className}`}
    >
      <div className={`flex ${speedClass} items-center gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]`}>
        {/* Render 4 repetitions to guarantee zero gaps on ultra-wide 4K screens */}
        {[0, 1, 2, 3].map((rep) => (
          <div key={`rep-${rep}`} className="flex items-center gap-8 shrink-0">
            {displayItems.map((item, index) => (
              <div key={`item-${rep}-${index}`} className="flex items-center gap-8 shrink-0">
                <span className="text-xs sm:text-sm font-extrabold tracking-widest font-heading uppercase flex items-center gap-2">
                  <span className="text-brand-royal text-sm sm:text-base">✦</span>
                  <span>{item}</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-steel/40" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
