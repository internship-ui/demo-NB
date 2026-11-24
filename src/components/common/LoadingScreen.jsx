import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetUrl } from '../../utils/assetPath';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 350);
          return 100;
        }
        const diff = Math.random() * 25 + 10;
        return Math.min(old + diff, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-navy-dark px-4"
    >
      <div className="relative flex flex-col items-center max-w-sm w-full text-center">
        {/* Glowing aura */}
        <div className="absolute w-44 h-44 rounded-full bg-brand-yellow/15 blur-2xl pointer-events-none -top-6" />

        {/* Company Logo - unmodified */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6 p-4 rounded-2xl bg-brand-navy-surface/80 border border-brand-yellow/20 shadow-2xl backdrop-blur-md"
        >
          <img
            src={getAssetUrl('/assets/logo.png')}
            alt="NAVABHARATH TECHNOLOGIES"
            className="h-20 w-auto object-contain"
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-bold tracking-wider text-white uppercase mb-1"
        >
          NAVABHARATH TECHNOLOGIES
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-brand-yellow font-medium tracking-wide mb-8"
        >
          Smarter Solutions for Better Future
        </motion.p>

        {/* Progress bar */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-yellow to-amber-400 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
        <div className="text-[11px] text-slate-400 font-mono tracking-wider">
          Initializing Digital Framework... {Math.round(progress)}%
        </div>
      </div>
    </motion.div>
  );
}

