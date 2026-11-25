import React from 'react';

export default function MarqueeBanner({
  items,
  isDark = false,
  className = '',
  speed = 'normal'
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

  return (
    <div
      className={`relative w-full overflow-hidden py-3 sm:py-4 border-y transition-colors select-none ${
        isDark
          ? 'bg-brand-navy border-brand-steel/30 text-white'
          : 'bg-white/80 backdrop-blur-sm border-brand-silver/50 text-brand-navy'
      } ${className}`}
    >
      <div className="flex animate-marquee items-center gap-8 whitespace-nowrap">
        {/* First repetition */}
        {displayItems.map((item, index) => (
          <div key={`m1-${index}`} className="flex items-center gap-8">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest font-heading uppercase flex items-center gap-2">
              <span className="text-brand-royal text-sm sm:text-base">✦</span>
              <span>{item}</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-steel/40" />
          </div>
        ))}

        {/* Second repetition for seamless loop */}
        {displayItems.map((item, index) => (
          <div key={`m2-${index}`} className="flex items-center gap-8">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest font-heading uppercase flex items-center gap-2">
              <span className="text-brand-royal text-sm sm:text-base">✦</span>
              <span>{item}</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-steel/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
