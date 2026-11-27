import React from 'react';

/**
 * Enterprise Minimal CSS Gradient Background
 * - Off-white base colour (#F8FAFD)
 * - Subtle blue gradient (#EFF5FF)
 * - Soft, light-blue gradient areas near the edges
 * - Center kept mostly white (#FFFFFF)
 * - Pure CSS gradients, ultra-sharp, high-performance, and minimal
 */
export default function HomeDigitalGridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
      style={{
        backgroundColor: '#F8FAFD',
        backgroundImage: `
          radial-gradient(ellipse 70% 55% at 50% 32%, #FFFFFF 0%, #FFFFFF 52%, rgba(248, 250, 253, 0.75) 80%, transparent 100%),
          radial-gradient(circle 600px at 0% 0%, #EFF5FF 0%, rgba(239, 245, 255, 0.5) 45%, transparent 75%),
          radial-gradient(circle 650px at 100% 0%, #EFF5FF 0%, rgba(239, 245, 255, 0.45) 45%, transparent 75%),
          radial-gradient(ellipse 500px 700px at 0% 80%, rgba(239, 245, 255, 0.7) 0%, transparent 70%),
          radial-gradient(ellipse 550px 700px at 100% 80%, rgba(239, 245, 255, 0.7) 0%, transparent 70%),
          linear-gradient(180deg, #F8FAFD 0%, #FFFFFF 25%, #F8FAFD 70%, #EFF5FF 100%)
        `
      }}
    >
      {/* Soft light-blue ambient gradient highlight areas near edges (CSS only, zero patterns) */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-[#EFF5FF] blur-[110px] opacity-80 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#EFF5FF] blur-[120px] opacity-75 pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[480px] h-[650px] rounded-full bg-[#EFF5FF] blur-[130px] opacity-70 pointer-events-none" />
      <div className="absolute top-2/3 -right-40 w-[520px] h-[650px] rounded-full bg-[#EFF5FF] blur-[130px] opacity-70 pointer-events-none" />
    </div>
  );
}
