import React from 'react';

/**
 * WordReveal - Ensures text is ALWAYS 100% visible immediately,
 * never hidden or clipped, preserving full typography and readability.
 */
export function WordReveal({ 
  text, 
  className = '', 
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
          <span
            key={i}
            className={`inline-block ${isHighlight ? highlightClassName : ''}`}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}

/**
 * CharReveal - Character reveal that guarantees 100% immediate visibility
 */
export function CharReveal({ 
  text, 
  className = ''
}) {
  if (!text) return null;
  return <span className={`inline-block ${className}`}>{text}</span>;
}

export default WordReveal;
