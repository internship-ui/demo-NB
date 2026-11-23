import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ value, duration = 2, suffix = '', prefix = '', isDecimal = false }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end)) return;

    const frameRate = 1000 / 60;
    const totalFrames = Math.round((duration * 1000) / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out cubic
      const current = start + (end - start) * (1 - Math.pow(1 - progress, 3));

      if (frame >= totalFrames) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-heading tabular-nums">
      {prefix}
      {isDecimal ? displayValue.toFixed(1) : Math.round(displayValue)}
      {suffix}
    </span>
  );
}

