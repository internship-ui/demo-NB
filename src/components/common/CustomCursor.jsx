import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Exact mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics for outer circular ring
  const springConfig = { damping: 26, stiffness: 360, mass: 0.45 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only active on desktop devices with fine mouse pointer
    if (!window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let checkScheduled = false;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Throttled detection of interactive targets
      if (!checkScheduled) {
        checkScheduled = true;
        const target = e.target;
        requestAnimationFrame(() => {
          checkScheduled = false;
          if (
            target &&
            target instanceof Element &&
            target.closest(
              'a, button, input, textarea, select, [role="button"], [role="link"], label, .card, .uiverse-card, .cursor-pointer'
            )
          ) {
            setIsHovered(true);
          } else {
            setIsHovered(false);
          }
        });
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Outer Smooth Trailing Circle Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 48 : 34,
          height: isHovered ? 48 : 34,
          borderColor: isHovered ? '#FFC928' : 'rgba(255, 201, 40, 0.65)',
          backgroundColor: isHovered ? 'rgba(255, 201, 40, 0.12)' : 'transparent',
          boxShadow: isHovered 
            ? '0 0 20px rgba(255, 201, 40, 0.45), inset 0 0 10px rgba(255, 201, 40, 0.2)' 
            : '0 0 10px rgba(255, 201, 40, 0.25)',
          scale: isClicked ? 0.82 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          scale: { duration: 0.12 },
          opacity: { duration: 0.2 }
        }}
      />

      {/* 2. Inner Precise Center Dot Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-brand-yellow pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          scale: isClicked ? 1.3 : 1,
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 8px #FFC928'
        }}
        transition={{
          scale: { duration: 0.1 },
          opacity: { duration: 0.15 }
        }}
      />
    </div>
  );
}
