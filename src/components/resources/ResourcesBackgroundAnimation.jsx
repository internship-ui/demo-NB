import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function ResourcesBackgroundAnimation() {
  const canvasRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    // Viewport dimensions
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = () => window.innerWidth < 768;
    const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    window.addEventListener('resize', handleResize);

    // =========================================================================
    // COLOR PALETTE: 80% Dark Navy, 20% Blue/Yellow Technology Highlights
    // =========================================================================
    const nodeColors = [
      { r: 255, g: 201, b: 40 },  // Brand Yellow #FFC928
      { r: 56, g: 189, b: 248 },   // Cyber Sky Blue #38BDF8
      { r: 0, g: 240, b: 255 },    // Electric Cyan #00F0FF
      { r: 255, g: 255, b: 255 },  // Digital Pure White #FFFFFF
    ];

    let particles = [];
    let linePulses = [];
    let circuitPaths = [];
    let binaryDigits = [];
    let techShapes = [];

    // =========================================================================
    // INITIALIZE PARTICLES, CIRCUITS, BINARY STREAM, & TECH SHAPES
    // =========================================================================
    function initElements() {
      const mobile = isMobile();
      const tablet = isTablet();

      // 1. Network Nodes (Density scaled per device)
      const count = mobile ? 28 : tablet ? 46 : Math.min(Math.floor((width * height) / 19000), 68);
      particles = [];

      for (let i = 0; i < count; i++) {
        const colorObj = nodeColors[Math.floor(Math.random() * nodeColors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (mobile ? 0.35 : 0.55),
          vy: (Math.random() - 0.5) * (mobile ? 0.35 : 0.55),
          radius: Math.random() * 2.2 + 1.4,
          color: colorObj,
          baseAlpha: Math.random() * 0.45 + 0.4,
          pulseSpeed: Math.random() * 0.035 + 0.015,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }

      // 2. Data line pulses pool
      const pulseCount = mobile ? 6 : 14;
      linePulses = [];
      for (let i = 0; i < pulseCount; i++) {
        linePulses.push({
          fromIndex: Math.floor(Math.random() * particles.length),
          toIndex: Math.floor(Math.random() * particles.length),
          progress: Math.random(),
          speed: Math.random() * 0.014 + 0.009,
          color: Math.random() > 0.45 ? '#FFC928' : '#00F0FF',
        });
      }

      // 3. Circuit Board Lines (Orthogonal with 45° doglegs and solder pads)
      const circuitCount = mobile ? 3 : 7;
      circuitPaths = [];
      for (let c = 0; c < circuitCount; c++) {
        const startX = (c / circuitCount) * width + (Math.random() * 120 - 60);
        const startY = Math.random() * (height * 0.9);
        const seg1 = Math.random() * 140 + 70;
        const dirX = Math.random() > 0.5 ? 1 : -1;
        const corner1X = startX + seg1 * dirX;
        const corner1Y = startY;

        const seg2 = Math.random() * 100 + 40;
        const dirY = Math.random() > 0.5 ? 1 : -1;
        const corner2X = corner1X + seg2 * 0.707 * dirX;
        const corner2Y = corner1Y + seg2 * 0.707 * dirY;

        const seg3 = Math.random() * 100 + 50;
        const endX = corner2X + seg3 * dirX;
        const endY = corner2Y;

        circuitPaths.push({
          points: [
            { x: startX, y: startY },
            { x: corner1X, y: corner1Y },
            { x: corner2X, y: corner2Y },
            { x: endX, y: endY }
          ],
          totalLength: seg1 + seg2 + seg3,
          signalProgress: Math.random(),
          signalSpeed: Math.random() * 0.006 + 0.0035,
          signalColor: c % 2 === 0 ? '#FFC928' : '#38BDF8',
          padPulse: Math.random() * Math.PI * 2
        });
      }

      // 4. Subtle Floating Binary Digits (0 and 1)
      const binaryCount = mobile ? 10 : tablet ? 18 : 26;
      binaryDigits = [];
      for (let b = 0; b < binaryCount; b++) {
        binaryDigits.push({
          x: Math.random() * width,
          y: Math.random() * height,
          char: Math.random() > 0.5 ? '1' : '0',
          vy: -(Math.random() * 0.3 + 0.15),
          opacity: Math.random() * 0.25 + 0.12,
          fontSize: Math.floor(Math.random() * 4) + 11,
          color: Math.random() > 0.35 ? '56, 189, 248' : '255, 201, 40',
          changeTimer: Math.floor(Math.random() * 120) + 60
        });
      }

      // 5. Futuristic Geometric Shapes
      techShapes = [
        {
          type: 'hexagon',
          x: width * 0.12,
          y: height * 0.25,
          radius: mobile ? 34 : 60,
          angle: 0,
          rotSpeed: 0.002,
          color: 'rgba(56, 189, 248, 0.22)'
        },
        {
          type: 'hexagon',
          x: width * 0.88,
          y: height * 0.55,
          radius: mobile ? 40 : 70,
          angle: Math.PI / 4,
          rotSpeed: -0.0018,
          color: 'rgba(255, 201, 40, 0.18)'
        },
        {
          type: 'radar',
          x: width * 0.85,
          y: height * 0.20,
          radius: mobile ? 42 : 75,
          angle: 0,
          rotSpeed: 0.004,
          color: 'rgba(56, 189, 248, 0.24)'
        },
        {
          type: 'crosshair',
          x: width * 0.10,
          y: height * 0.75,
          size: mobile ? 22 : 36,
          color: 'rgba(255, 201, 40, 0.25)'
        }
      ];
    }

    initElements();

    // =========================================================================
    // MOUSE TRACKING & PARALLAX
    // =========================================================================
    let mouse = { x: -1000, y: -1000, radius: 140, active: false };
    let parallax = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 };

    const handleMouseMove = (e) => {
      if (isMobile()) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;
      parallax.targetX = normX * 28;
      parallax.targetY = normY * 28;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Visibility change handler: pause loop when tab is hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // =========================================================================
    // GEOMETRIC SHAPE DRAWING HELPERS
    // =========================================================================
    function drawHexagon(cx, cy, r, angle, color) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = angle + (i * Math.PI) / 3;
        const hx = cx + r * Math.cos(a);
        const hy = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Glowing center node
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    function drawRadar(cx, cy, r, angle, color) {
      // Outer segmented sweep
      ctx.beginPath();
      ctx.arc(cx, cy, r, angle, angle + Math.PI * 1.35);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Inner dashed concentric ring
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.arc(cx, cy, r * 0.62, -angle, -angle + Math.PI * 1.5);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Target Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - 14, cy);
      ctx.lineTo(cx + 14, cy);
      ctx.moveTo(cx, cy - 14);
      ctx.lineTo(cx, cy + 14);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawCrosshair(cx, cy, size, color) {
      ctx.beginPath();
      ctx.moveTo(cx - size, cy - size / 2);
      ctx.lineTo(cx - size, cy - size);
      ctx.lineTo(cx - size / 2, cy - size);

      ctx.moveTo(cx + size, cy - size / 2);
      ctx.lineTo(cx + size, cy - size);
      ctx.lineTo(cx + size / 2, cy - size);

      ctx.moveTo(cx - size, cy + size / 2);
      ctx.lineTo(cx - size, cy + size);
      ctx.lineTo(cx - size / 2, cy + size);

      ctx.moveTo(cx + size, cy + size / 2);
      ctx.lineTo(cx + size, cy + size);
      ctx.lineTo(cx + size / 2, cy + size);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    // =========================================================================
    // MAIN RENDER LOOP (60 FPS)
    // =========================================================================
    let tick = 0;

    const render = () => {
      tick++;

      // Smooth parallax interpolation
      parallax.currentX += (parallax.targetX - parallax.currentX) * 0.05;
      parallax.currentY += (parallax.targetY - parallax.currentY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(parallax.currentX, parallax.currentY);

      // -----------------------------------------------------------------------
      // 1. CIRCUIT BOARD TRACES & ANIMATED DATA SIGNALS
      // -----------------------------------------------------------------------
      for (let i = 0; i < circuitPaths.length; i++) {
        const cp = circuitPaths[i];
        const pts = cp.points;

        // Circuit line
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let p = 1; p < pts.length; p++) {
          ctx.lineTo(pts[p].x, pts[p].y);
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Solder pads
        for (let p = 0; p < pts.length; p++) {
          ctx.beginPath();
          ctx.arc(pts[p].x, pts[p].y, p === 0 || p === pts.length - 1 ? 3.5 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = p === 0 ? 'rgba(255, 201, 40, 0.6)' : 'rgba(56, 189, 248, 0.45)';
          ctx.fill();
        }

        // Animated signal packet darting along the circuit trace
        if (!prefersReducedMotion) {
          cp.signalProgress += cp.signalSpeed;
          if (cp.signalProgress > 1) cp.signalProgress = 0;

          const targetDist = cp.signalProgress * cp.totalLength;
          let accum = 0;
          let sigX = pts[0].x;
          let sigY = pts[0].y;

          for (let p = 0; p < pts.length - 1; p++) {
            const segDx = pts[p + 1].x - pts[p].x;
            const segDy = pts[p + 1].y - pts[p].y;
            const segLen = Math.sqrt(segDx * segDx + segDy * segDy);

            if (accum + segLen >= targetDist) {
              const r = (targetDist - accum) / segLen;
              sigX = pts[p].x + segDx * r;
              sigY = pts[p].y + segDy * r;
              break;
            }
            accum += segLen;
          }

          // Glowing signal pulse
          ctx.save();
          ctx.beginPath();
          ctx.arc(sigX, sigY, 3, 0, Math.PI * 2);
          ctx.fillStyle = cp.signalColor;
          ctx.shadowColor = cp.signalColor;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        }
      }

      // -----------------------------------------------------------------------
      // 2. FUTURISTIC GEOMETRIC SHAPES
      // -----------------------------------------------------------------------
      for (let i = 0; i < techShapes.length; i++) {
        const shape = techShapes[i];
        if (!prefersReducedMotion) {
          shape.angle += shape.rotSpeed;
        }

        if (shape.type === 'hexagon') {
          drawHexagon(shape.x, shape.y, shape.radius, shape.angle, shape.color);
        } else if (shape.type === 'radar') {
          drawRadar(shape.x, shape.y, shape.radius, shape.angle, shape.color);
        } else if (shape.type === 'crosshair') {
          drawCrosshair(shape.x, shape.y, shape.size, shape.color);
        }
      }

      // -----------------------------------------------------------------------
      // 3. SUBTLE FLOATING BINARY NUMBERS (0 AND 1)
      // -----------------------------------------------------------------------
      ctx.font = 'bold 12px "Courier New", Courier, monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      for (let b = 0; b < binaryDigits.length; b++) {
        const bin = binaryDigits[b];
        if (!prefersReducedMotion) {
          bin.y += bin.vy;
          bin.changeTimer--;
          if (bin.changeTimer <= 0) {
            bin.char = bin.char === '1' ? '0' : '1';
            bin.changeTimer = Math.floor(Math.random() * 120) + 60;
          }
          if (bin.y < -20) {
            bin.y = height + 20;
            bin.x = Math.random() * width;
          }
        }

        const alphaPulse = bin.opacity * (0.85 + 0.15 * Math.sin(tick * 0.05 + b));
        ctx.fillStyle = `rgba(${bin.color}, ${alphaPulse})`;
        ctx.fillText(bin.char, bin.x, bin.y);
      }

      // -----------------------------------------------------------------------
      // 4. INTERCONNECTED NETWORK LINES & DATA PULSES
      // -----------------------------------------------------------------------
      const maxDist = isMobile() ? 100 : 135;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isMobile() ? 0.20 : 0.32);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            // Alternate between soft blue and brand yellow connections
            ctx.strokeStyle = (i + j) % 3 === 0
              ? `rgba(255, 201, 40, ${alpha * 0.95})`
              : `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Animate Light Pulses travelling along network lines
      if (!prefersReducedMotion) {
        for (let p = 0; p < linePulses.length; p++) {
          const pulse = linePulses[p];
          pulse.progress += pulse.speed;
          if (pulse.progress >= 1) {
            pulse.progress = 0;
            pulse.fromIndex = Math.floor(Math.random() * particles.length);
            pulse.toIndex = Math.floor(Math.random() * particles.length);
          }

          const n1 = particles[pulse.fromIndex];
          const n2 = particles[pulse.toIndex];
          if (n1 && n2) {
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const pulseX = n1.x + (n2.x - n1.x) * pulse.progress;
              const pulseY = n1.y + (n2.y - n1.y) * pulse.progress;

              ctx.save();
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 2.8, 0, Math.PI * 2);
              ctx.fillStyle = pulse.color;
              ctx.shadowColor = pulse.color;
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }

      // -----------------------------------------------------------------------
      // 5. UPDATE & DRAW NETWORK NODES
      // -----------------------------------------------------------------------
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];

        if (!prefersReducedMotion) {
          pt.x += pt.vx;
          pt.y += pt.vy;

          if (pt.x < 0) { pt.x = 0; pt.vx *= -1; }
          if (pt.x > width) { pt.x = width; pt.vx *= -1; }
          if (pt.y < 0) { pt.y = 0; pt.vy *= -1; }
          if (pt.y > height) { pt.y = height; pt.vy *= -1; }

          // Gentle mouse deflection
          if (mouse.active) {
            const mdx = pt.x - mouse.x;
            const mdy = pt.y - mouse.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mdist < mouse.radius && mdist > 0) {
              const force = (1 - mdist / mouse.radius) * 0.75;
              pt.x += (mdx / mdist) * force * 1.8;
              pt.y += (mdy / mdist) * force * 1.8;
            }
          }
        }

        const pulse = Math.sin(tick * pt.pulseSpeed + pt.pulseOffset);
        const dynamicAlpha = Math.max(0.25, pt.baseAlpha + pulse * 0.25);
        const col = pt.color;

        // Core particle node
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${dynamicAlpha})`;
        ctx.fill();

        // Glowing outer halo for key nodes
        if (pt.radius > 2.0) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.radius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${dynamicAlpha * 0.3})`;
          ctx.fill();
        }
      }

      ctx.restore();

      if (!prefersReducedMotion && isVisible && isIntersecting) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    let isIntersecting = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !prefersReducedMotion && isVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { rootMargin: '100px 0px', threshold: 0 }
    );
    observer.observe(canvas);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [prefersReducedMotion]);

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* ===================== 80% DARK NAVY GRADIENT BASE ===================== */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030914] via-[#071B3A] to-[#040E1F]" />

      {/* ===================== DIGITAL HIGH-TECH GRID PATTERN ===================== */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      {/* ===================== CANVAS FOR NETWORK NODES, CIRCUITS & PARTICLES ===================== */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* ===================== SOFT HERO RADIAL GLOW ===================== */}
      {/* Placed specifically behind 'Engineering Insights & Technology Architecture' */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.15, 1],
          opacity: [0.22, 0.38, 0.22],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-1/2 -translate-x-1/2 w-[720px] h-[480px] bg-gradient-to-r from-brand-yellow/25 via-sky-500/25 to-amber-300/20 rounded-full blur-[110px] pointer-events-none"
      />

      {/* ===================== AMBIENT CYBER NEBULA GLOWS (20% BLUE/YELLOW HIGHLIGHTS) ===================== */}
      {/* Top Left Cyber Aura */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.28, 0.15],
          x: [0, 25, 0],
          y: [0, -15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-20 w-[550px] h-[550px] bg-gradient-to-br from-sky-600/25 via-brand-yellow/12 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Mid Right Golden Pulse */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.18, 1],
          opacity: [0.12, 0.26, 0.12],
          x: [0, -25, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-[42%] -right-20 w-[500px] h-[500px] bg-gradient-to-tl from-brand-yellow/22 via-brand-yellow/5 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Lower Mid Left Electric Blue */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.15, 1],
          opacity: [0.10, 0.22, 0.10],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        className="absolute top-[70%] -left-24 w-[520px] h-[520px] bg-gradient-to-tr from-brand-yellow/12 via-brand-navy-card/30 to-transparent rounded-full blur-3xl pointer-events-none"
      />
    </div>
  );
}
