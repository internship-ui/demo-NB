import React, { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

/**
 * AnimatedCounter - Numbers count up smoothly when scrolled into view
 * Preserves all values, suffixes and prefixes.
 */
export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  isDecimal = false,
  duration = 2
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // Handle strings like "10+", "99.9%", "50+"
  let rawStr = String(value || '');
  let extractedPrefix = prefix;
  let extractedSuffix = suffix;
  let targetNumber = 0;

  // Check if string contains standard non-numeric like "24/7"
  if (rawStr.includes('/') || isNaN(parseFloat(rawStr))) {
    // Return direct string if it cannot be animated as single number
    return (
      <span className="font-heading tabular-nums">
        {prefix}{rawStr}{suffix}
      </span>
    );
  }

  // Parse numeric part
  const match = rawStr.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
  if (match) {
    if (!prefix && match[1]) extractedPrefix = match[1];
    targetNumber = parseFloat(match[2]) || 0;
    if (!suffix && match[3]) extractedSuffix = match[3];
  } else {
    targetNumber = parseFloat(rawStr) || 0;
  }

  const [displayValue, setDisplayValue] = useState(0);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    damping: 28,
    stiffness: 90,
    mass: 0.8
  });

  useEffect(() => {
    if (isInView) {
      motionVal.set(targetNumber);
    }
  }, [isInView, targetNumber, motionVal]);

  useEffect(() => {
    return springVal.on('change', (latest) => {
      setDisplayValue(isDecimal ? latest.toFixed(1) : Math.round(latest));
    });
  }, [springVal, isDecimal]);

  return (
    <span ref={ref} className="font-heading tabular-nums inline-block">
      {extractedPrefix}
      {isInView ? displayValue : 0}
      {extractedSuffix}
    </span>
  );
}
