import React from 'react';

/**
 * Modern Enterprise Fluid Wave Background
 * Matching user reference:
 * - Crisp white center (#FFFFFF) providing maximum contrast for typography
 * - Layered, translucent sky-blue organic curved waves on the right and bottom-right
 * - Soft swooping curved wave and delicate accent arc on the top-left
 * - Gentle ambient light blue gradient at bottom-left and top-center
 * - Pure SVG vector paths + CSS gradients for razor-sharp, zero-latency rendering
 */
export default function HomeDigitalGridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
      style={{
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* 1. Base Ambient Glows: Center remains pure white (#FFFFFF), subtle sky-blue at top-center and perimeter */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 65% 55% at 48% 42%, #FFFFFF 0%, #FFFFFF 52%, rgba(255, 255, 255, 0.85) 75%, transparent 100%),
            radial-gradient(ellipse 700px 350px at 50% -5%, #E3EFFF 0%, rgba(235, 246, 255, 0.6) 45%, transparent 80%),
            radial-gradient(circle 500px at 100% 10%, #D8EBFE 0%, rgba(225, 240, 255, 0.45) 50%, transparent 80%),
            radial-gradient(circle 450px at 0% 10%, #DCEDFE 0%, rgba(230, 244, 255, 0.45) 50%, transparent 80%)
          `
        }}
      />

      {/* 2. Vector Fluid Waves & Curved Arcs */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Top-Left Wave Gradient */}
          <linearGradient id="topLeftWaveGrad" x1="0%" y1="0%" x2="50%" y2="55%">
            <stop offset="0%" stopColor="#C8E2FD" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#DDF0FE" stopOpacity="0.55" />
            <stop offset="85%" stopColor="#F0F7FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Top-Left Secondary Layer */}
          <linearGradient id="topLeftSubtle" x1="0%" y1="0%" x2="70%" y2="70%">
            <stop offset="0%" stopColor="#D3E8FE" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#EBF4FE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Bottom-Left Ambient Wave Gradient */}
          <linearGradient id="bottomLeftGrad" x1="0%" y1="100%" x2="60%" y2="70%">
            <stop offset="0%" stopColor="#D2E8FE" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#E5F2FE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Right Main Sweeping Wave Gradient */}
          <linearGradient id="rightMainWave" x1="20%" y1="100%" x2="95%" y2="40%">
            <stop offset="0%" stopColor="#EAF3FE" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#CEE4FD" stopOpacity="0.75" />
            <stop offset="65%" stopColor="#BBDDFD" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D3E8FE" stopOpacity="0.7" />
          </linearGradient>

          {/* Right Secondary Upper Wave (Behind Card) */}
          <linearGradient id="rightUpperWave" x1="40%" y1="95%" x2="100%" y2="15%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="25%" stopColor="#E5F2FE" stopOpacity="0.5" />
            <stop offset="65%" stopColor="#CBE2FD" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#D9ECFE" stopOpacity="0.6" />
          </linearGradient>

          {/* Bottom-Right Deep Wave */}
          <linearGradient id="bottomRightDeep" x1="45%" y1="100%" x2="95%" y2="65%">
            <stop offset="0%" stopColor="#EFF7FF" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#D0E6FD" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B8DBFD" stopOpacity="0.9" />
          </linearGradient>

          {/* Top-Right Soft Wave */}
          <linearGradient id="topRightWave" x1="100%" y1="0%" x2="55%" y2="55%">
            <stop offset="0%" stopColor="#CCE3FD" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#E2F0FE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* --- TOP-LEFT FLUID WAVES & ACCENT ARCS --- */}
        {/* Top-left soft fill wave */}
        <path
          d="M0,0 L260,0 C240,110 170,220 90,300 C40,350 0,390 0,390 Z"
          fill="url(#topLeftWaveGrad)"
        />
        {/* Top-left secondary subtle layer */}
        <path
          d="M0,0 L160,0 C130,80 90,160 45,225 C15,265 0,285 0,285 Z"
          fill="url(#topLeftSubtle)"
        />
        {/* Delicate curved outline arcs seen in reference */}
        <path
          d="M0,420 C60,370 145,295 195,205 C245,115 255,45 265,0"
          stroke="rgba(155, 198, 246, 0.6)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0,280 C40,235 100,175 145,108 C175,55 185,18 190,0"
          stroke="rgba(175, 212, 250, 0.45)"
          strokeWidth="1"
          fill="none"
        />

        {/* --- BOTTOM-LEFT AMBIENT WAVE --- */}
        <path
          d="M0,640 C70,660 140,730 180,850 L0,850 Z"
          fill="url(#bottomLeftGrad)"
        />
        <path
          d="M0,640 C70,660 140,730 180,850"
          stroke="rgba(175, 212, 250, 0.4)"
          strokeWidth="1"
          fill="none"
        />

        {/* --- RIGHT-SIDE LAYERED FLUID WAVES (Behind and below Architecture Card) --- */}
        {/* Wave 1: Rising wave layer behind card towards top-right */}
        <path
          d="M1440,140 C1300,230 1180,370 1130,510 C1080,650 1100,770 1150,850 L1440,850 Z"
          fill="url(#rightUpperWave)"
        />

        {/* Wave 2: Bold sweeping diagonal wave rising from bottom center towards right edge */}
        <path
          d="M650,850 C800,830 960,760 1100,645 C1240,535 1350,425 1440,340 L1440,850 Z"
          fill="url(#rightMainWave)"
        />

        {/* Wave 3: Lower deep wave on bottom-right corner */}
        <path
          d="M800,850 C940,830 1080,765 1210,680 C1320,600 1395,530 1440,470 L1440,850 Z"
          fill="url(#bottomRightDeep)"
        />

        {/* Delicate accent strokes tracing the wave crests */}
        <path
          d="M650,850 C800,830 960,760 1100,645 C1240,535 1350,425 1440,340"
          stroke="rgba(160, 202, 248, 0.65)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M800,850 C940,830 1080,765 1210,680 C1320,600 1395,530 1440,470"
          stroke="rgba(175, 212, 250, 0.5)"
          strokeWidth="1"
          fill="none"
        />

        {/* Top-Right ambient corner soft wave */}
        <path
          d="M1150,0 C1200,80 1280,145 1440,185 L1440,0 Z"
          fill="url(#topRightWave)"
        />
      </svg>

      {/* 3. Soft ambient contour blurs to blend wave edges seamlessly into the canvas */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#D6EAFE] blur-[75px] opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-[520px] h-[520px] rounded-full bg-[#CDE5FD] blur-[90px] opacity-70 pointer-events-none" />
      <div className="absolute -bottom-16 right-8 w-[580px] h-[440px] rounded-full bg-[#C2DFFD] blur-[80px] opacity-65 pointer-events-none" />
    </div>
  );
}
