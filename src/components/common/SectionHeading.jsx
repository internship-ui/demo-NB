import React from 'react';

export default function SectionHeading({
  badge,
  title,
  titleHighlight,
  description,
  align = 'center',
  light = false,
  isDark = false
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 ${
            isDark
              ? 'bg-white/10 text-[#C4CCD5] border border-white/20'
              : 'bg-brand-royal/10 text-brand-royal border border-brand-royal/25'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-brand-silver' : 'bg-brand-royal'}`} />
          {badge}
        </div>
      )}

      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight ${
          isDark ? 'text-white' : 'text-brand-navy'
        }`}
      >
        {title}{' '}
        {titleHighlight && (
          <span
            className={
              isDark
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-slate-200'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-brand-royal via-brand-royal to-brand-steel'
            }
          >
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${
            isDark ? 'text-[#C4CCD5]' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
