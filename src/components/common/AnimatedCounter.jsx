import React from 'react';

export default function AnimatedCounter({ value, suffix = '', prefix = '', isDecimal = false }) {
  const num = parseFloat(value);
  const formatted = isNaN(num) ? value : (isDecimal ? num.toFixed(1) : Math.round(num));

  return (
    <span className="font-heading tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
