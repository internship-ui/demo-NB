import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Briefcase, 
  Layers, 
  Code2, 
  CheckCircle2, 
  Activity, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Globe2,
  Stethoscope,
  Sprout,
  Terminal
} from 'lucide-react';

export default function PortfolioLoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const stages = [
    { 
      label: 'INITIALIZING DATA PIPELINE', 
      detail: 'Establishing secure client database connection & asset pipelines',
      icon: Terminal,
      code: 'SYS_INIT_OK'
    },
    { 
      label: 'COMPILING CLIENT REPOSITORIES', 
      detail: 'Loading Dr. Madhuram, Jisha Prime, & Shetty\'s Dental records',
      icon: Stethoscope,
      code: 'REPOS_MOUNTED'
    },
    { 
      label: 'RENDERING 3D CARD ARCHITECTURE', 
      detail: 'Synthesizing interactive spatial tilt physics & light shaders',
      icon: Layers,
      code: 'GPU_SHADER_READY'
    },
    { 
      label: 'CALIBRATING ENTERPRISE ASSETS', 
      detail: 'Optimizing high-resolution media & project case study specs',
      icon: Cpu,
      code: 'OPTIMIZE_100%'
    },
    { 
      label: 'PORTFOLIO SHOWCASE ENGAGED', 
      detail: 'All systems calibrated. Launching client showcase experience',
      icon: CheckCircle2,
      code: 'EXEC_READY'
    }
  ];

  const sectorChips = [
    { name: 'Healthcare Tech', icon: Stethoscope, threshold: 20 },
    { name: 'Sustainable Agro', icon: Sprout, threshold: 45 },
    { name: 'Workflow Engines', icon: Zap, threshold: 70 },
    { name: '3D Spatial Web', icon: Layers, threshold: 90 },
  ];

  // Frequency spectrum bar heights for telemetry visualizer
  const eqHeights = [
    [10, 24, 14, 32, 18, 40, 26, 12],
    [22, 12, 38, 16, 44, 20, 36, 28],
    [35, 42, 18, 50, 24, 38, 14, 30],
    [16, 30, 48, 22, 40, 52, 28, 18],
    [40, 48, 52, 44, 48, 50, 42, 38]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 360);
          return 100;
        }

        // Varied organic velocity increments
        const delta = Math.floor(Math.random() * 11) + 11;
        const next = Math.min(prev + delta, 100);

        if (next < 22) setCurrentStageIndex(0);
        else if (next < 48) setCurrentStageIndex(1);
        else if (next < 74) setCurrentStageIndex(2);
        else if (next < 94) setCurrentStageIndex(3);
        else setCurrentStageIndex(4);

        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onFinish]);

  const activeStage = stages[currentStageIndex];
  const StageIcon = activeStage.icon;
  const currentBars = eqHeights[currentStageIndex] || eqHeights[0];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.04,
        filter: 'blur(6px)',
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030B1A] px-4 select-none overflow-hidden font-sans"
    >
      {/* ================= BACKGROUND CYBER FX ================= */}
      {/* Perspective Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 201, 40, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 201, 40, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />

      {/* Atmospheric Radial Nebulas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-yellow/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#0E2D5E]/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-[#071B3A]/80 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Starfield Constellation Particles */}
      {[
        { top: '15%', left: '12%', size: 'w-2 h-2', delay: 0 },
        { top: '22%', right: '14%', size: 'w-1.5 h-1.5', delay: 0.5 },
        { bottom: '18%', left: '16%', size: 'w-2.5 h-2.5', delay: 1.0 },
        { bottom: '24%', right: '18%', size: 'w-1.5 h-1.5', delay: 1.5 },
        { top: '48%', left: '6%', size: 'w-1.5 h-1.5', delay: 0.8 },
        { top: '55%', right: '8%', size: 'w-2 h-2', delay: 1.2 },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-12, 12, -12],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          className={`absolute ${p.size} rounded-full bg-brand-yellow shadow-[0_0_12px_#FFC928] pointer-events-none hidden sm:block`}
          style={{ top: p.top, left: p.left, right: p.right, bottom: p.bottom }}
        />
      ))}

      {/* ================= MAIN CYBER CORE INTERFACE ================= */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-2xl w-full mx-auto"
      >
        {/* Holographic Glowing Border Frame */}
        <div className="relative rounded-3xl bg-[#071B3A]/90 border border-brand-yellow/30 shadow-[0_0_50px_rgba(7,27,58,0.9),0_0_30px_rgba(255,201,40,0.15)] backdrop-blur-2xl p-6 sm:p-9 overflow-hidden">
          
          {/* Cyber HUD Corner Crosshairs */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-brand-yellow/70 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-brand-yellow/70 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-brand-yellow/70 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-brand-yellow/70 pointer-events-none" />

          {/* Laser Scan Beam sweeping vertically */}
          <motion.div
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-brand-yellow/[0.04] to-transparent pointer-events-none"
          />

          {/* ---------- TOP HUD STATUS BAR ---------- */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-yellow" />
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-semibold text-slate-300 tracking-wider">
                NBT_CORE // <span className="text-brand-yellow">PORTFOLIO MATRIX</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block font-mono text-[10px] text-brand-yellow/80 bg-brand-yellow/10 px-2 py-0.5 rounded border border-brand-yellow/30">
                {activeStage.code}
              </span>
              <button
                type="button"
                onClick={onFinish}
                className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-brand-yellow text-slate-300 hover:text-brand-navy border border-white/10 hover:border-brand-yellow transition-all duration-200 text-[11px] font-mono font-medium cursor-pointer"
              >
                <span>SKIP INTRO</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ---------- CENTER CORE: MULTI-TIER ORBITAL ENGINE ---------- */}
          <div className="relative flex flex-col items-center justify-center my-2 sm:my-4">
            
            {/* SVG Planetary Orbitals Container */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              
              {/* Outer Orbital Ring with dashed track (Clockwise) */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="rgba(255, 201, 40, 0.25)"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="#FFC928"
                  strokeWidth="2.5"
                  strokeDasharray="28 160"
                  strokeLinecap="round"
                />
                {/* Orbital Satellite Node */}
                <circle cx="100" cy="8" r="4" fill="#FFC928" filter="drop-shadow(0 0 6px #FFC928)" />
                <circle cx="100" cy="192" r="3" fill="#FFFFFF" />
              </motion.svg>

              {/* Inner Counter-Rotating Precision Ring (Counter-Clockwise) */}
              <motion.svg
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] pointer-events-none"
                viewBox="0 0 160 160"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="72"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="72"
                  fill="none"
                  stroke="#FFC928"
                  strokeWidth="2"
                  strokeDasharray="18 90"
                  strokeLinecap="round"
                />
                {/* Satellite Node */}
                <circle cx="80" cy="8" r="3" fill="#FFC928" />
              </motion.svg>

              {/* Radiant Golden Glow Behind Logo Pod */}
              <div className="absolute w-28 h-28 rounded-full bg-brand-yellow/20 blur-xl pointer-events-none" />

              {/* Central Floating Logo Shield */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-b from-[#0B254E] to-[#041026] border-2 border-brand-yellow/60 flex items-center justify-center p-4 shadow-[0_0_35px_rgba(255,201,40,0.35)] backdrop-blur-md"
              >
                <img
                  src="/assets/logo.png"
                  alt="Navabharath Technologies"
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                />
                <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-brand-yellow text-brand-navy font-black text-[9px] uppercase tracking-wider font-mono shadow-md">
                  V3.2
                </div>
              </motion.div>
            </div>

            {/* Title & Brand Slogan */}
            <h2 className="mt-4 text-2xl sm:text-3xl font-black text-white font-heading tracking-tight text-center">
              NAVABHARATH <span className="text-brand-yellow drop-shadow-[0_0_15px_rgba(255,201,40,0.5)]">PORTFOLIO</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium text-center mt-1 max-w-md">
              Client Partnerships &amp; Enterprise Full-Stack Engineering
            </p>
          </div>

          {/* ---------- GIANT METRIC & FREQUENCY EQUALIZER ROW ---------- */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#041026]/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Giant Monospace Percentage */}
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-brand-yellow to-amber-400 tracking-tighter">
                {Math.round(progress)}
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-brand-yellow">
                %
              </span>
              <span className="ml-3 font-mono text-[11px] text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                COMPLETED
              </span>
            </div>

            {/* Dynamic Audio/Frequency Spectrum Equalizer Bars */}
            <div className="flex items-center gap-1.5 h-10 px-3 py-1.5 bg-[#071B3A] rounded-xl border border-brand-yellow/20">
              <Activity className="w-3.5 h-3.5 text-brand-yellow mr-1 animate-pulse" />
              {currentBars.map((height, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${Math.max(6, height * 0.4)}px`, `${height}px`, `${Math.max(8, height * 0.7)}px`] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', delay: i * 0.08 }}
                  className="w-1.5 bg-gradient-to-t from-amber-500 via-brand-yellow to-white rounded-full shadow-[0_0_8px_rgba(255,201,40,0.4)]"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>

          {/* ---------- DUAL-LAYER LASER PROGRESS BAR ---------- */}
          <div className="mt-4">
            <div className="relative w-full h-3 rounded-full bg-[#030B1A] border border-white/10 p-0.5 overflow-hidden shadow-inner">
              {/* Animated Progress Fill */}
              <motion.div
                className="relative h-full rounded-full bg-gradient-to-r from-amber-500 via-brand-yellow to-white shadow-[0_0_18px_#FFC928]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
              >
                {/* Laser Shimmer Sweep */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                />

                {/* Leading Edge Neon Flare Tip */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#FFFFFF,0_0_24px_#FFC928]" />
              </motion.div>
            </div>
          </div>

          {/* ---------- REAL-TIME TELEMETRY STATUS MESSAGE ---------- */}
          <div className="mt-3.5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-200 min-w-0">
              <StageIcon className="w-4 h-4 text-brand-yellow flex-shrink-0 animate-pulse" />
              <span className="font-bold text-[11px] sm:text-xs text-brand-yellow truncate">
                {activeStage.label}
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono hidden md:inline-block">
              {activeStage.detail}
            </span>
          </div>

          {/* ---------- SECTOR PREVIEW BADGES (ACTIVATES AT THRESHOLDS) ---------- */}
          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sectorChips.map((chip, idx) => {
              const ChipIcon = chip.icon;
              const isLoaded = progress >= chip.threshold;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-mono transition-all duration-300 ${
                    isLoaded
                      ? 'bg-brand-yellow/10 border-brand-yellow/40 text-brand-yellow shadow-[0_0_12px_rgba(255,201,40,0.15)]'
                      : 'bg-white/[0.02] border-white/5 text-slate-500'
                  }`}
                >
                  <ChipIcon className={`w-3.5 h-3.5 ${isLoaded ? 'text-brand-yellow' : 'text-slate-600'}`} />
                  <span className="text-[11px] truncate font-medium">{chip.name}</span>
                  {isLoaded && (
                    <CheckCircle2 className="w-3 h-3 text-brand-yellow ml-auto flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* ---------- FOOTER SYSTEM TELEMETRY STRIP ---------- */}
          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>CORE: <span className="text-slate-200">REACT 18 + FRAMER 3D</span></span>
            <span>SECURITY: <span className="text-brand-yellow">VERIFIED</span></span>
            <span>STATUS: <span className="text-emerald-400">OPTIMAL</span></span>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
