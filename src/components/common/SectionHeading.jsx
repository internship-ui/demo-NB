import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  badge,
  number,
  title,
  titleHighlight,
  description,
  align = 'center',
  light = false,
  isDark = false
}) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}`}
    >
      {(number || badge) && (
        <div className="inline-flex items-center gap-2 mb-3.5">
          {number && (
            <span className="font-mono text-xs sm:text-sm font-bold text-brand-royal tracking-widest uppercase">
              [{number}]
            </span>
          )}
          {badge && (
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase ${
                isDark
                  ? 'bg-white/10 text-brand-silver border border-white/20'
                  : 'bg-brand-royal/10 text-brand-royal border border-brand-royal/20 shadow-2xs'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-brand-silver' : 'bg-brand-royal'}`} />
              {badge}
            </span>
          )}
        </div>
      )}

      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading leading-[1.15] ${
          isDark ? 'text-white' : 'text-brand-navy'
        }`}
      >
        {title}{' '}
        {titleHighlight && (
          <span
            className={
              isDark
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-slate-200'
                : 'text-brand-royal'
            }
          >
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={`mt-4 text-sm sm:text-base md:text-lg leading-relaxed ${
            isDark ? 'text-brand-silver' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
