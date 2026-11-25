import React from 'react';
import { motion } from 'framer-motion';

/**
 * WordReveal - Staggers word-by-word reveal using an overflow mask
 */
export function WordReveal({ 
  text, 
  className = '', 
  delay = 0, 
  highlightWords = [],
  highlightClassName = 'text-brand-royal'
}) {
  if (!text) return null;
  const words = text.split(' ');

  return (
    <span className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(
          (hw) => word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <span key={i} className="inline-block overflow-hidden pb-1">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.55,
                delay: delay + i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block ${isHighlight ? highlightClassName : ''}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * CharReveal - Character-by-character reveal for bold hero titles
 */
export function CharReveal({ 
  text, 
  className = '', 
  delay = 0 
}) {
  if (!text) return null;
  const chars = Array.from(text);

  return (
    <span className={`inline-block ${className}`}>
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: delay + i * 0.02,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default WordReveal;
