import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Cpu, Target, Zap } from 'lucide-react';

/**
 * Premium Interactive Digital Grid Background Animation
 * Exclusively designed for the NAVABHARATH TECHNOLOGIES Home Page.
 *
 * Core Features:
 * - Futuristic Dark Navy digital grid (#071B3A) with subtle perspective drift
 * - Moving perspective grid lines with glowing intersections
 * - Magnetic particle attraction physics: particles gently pulled towards cursor and smoothly spring back
 * - Dynamic grid warping: grid points and connecting lines bend towards the mouse pointer
 * - Soft yellow (#FFC928) magnetic ambient glow around cursor
 * - Subtle cursor light trail with smooth fading
 * - Gentle click ripple effect radiating from mouse clicks
 * - System mouse cursor remains fully visible and normal
 * - Full accessibility: prefers-reduced-motion support, pause on tab hidden & off-screen IntersectionObserver
 * - Preserves all floating technology chips and high text contrast
 */
export default function HomeDigitalGridBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let isVisible = true;
    let isIntersecting = true;

    // Track width & height accurately
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const isMobile = () => window.innerWidth < 768;
    const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
      initGridAndParticles();
    };

    window.addEventListener('resize', handleResize);

    // =========================================================================
    // MOUSE & INTERACTION STATE
    // =========================================================================
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: 175,
      isHovering: false,
    };

    const mouseTrail = [];
    const ripples = [];

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      mouse.targetX = currentX;
      mouse.targetY = currentY;
      mouse.isHovering = true;

      // Add to cursor light trail
      if (
        currentX >= 0 &&
        currentX <= width &&
        currentY >= 0 &&
        currentY <= height
      ) {
        mouseTrail.push({
          x: currentX,
          y: currentY,
          alpha: 0.55,
          life: 1.0,
        });
        if (mouseTrail.length > 14) mouseTrail.shift();
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      mouse.isHovering = false;
    };

    const handlePointerDown = (e) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickX >= 0 && clickX <= width && clickY >= 0 && clickY <= height) {
        ripples.push({
          x: clickX,
          y: clickY,
          radius: 10,
          maxRadius: isMobile() ? 110 : 170,
          alpha: 0.75,
          speed: 4.8,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Conserve CPU when tab is hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && isIntersecting && !prefersReducedMotion) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // =========================================================================
    // PARTICLES & DIGITAL GRID SETUP
    // =========================================================================
    let particles = [];
    let gridCols = 0;
    let gridRows = 0;
    let gridSpacing = 64;

    const initGridAndParticles = () => {
      particles = [];
      const mobile = isMobile();
      const tablet = isTablet();

      gridSpacing = mobile ? 85 : tablet ? 72 : 62;
      gridCols = Math.ceil(width / gridSpacing) + 1;
      gridRows = Math.ceil(height / gridSpacing) + 1;

      // Floating particles
      const count = mobile ? 22 : tablet ? 38 : 56;
      const colors = [
        'rgba(255, 201, 40, ', // Brand Yellow
        'rgba(56, 189, 248, ', // Cyber Light Blue
        'rgba(255, 255, 255, ', // White highlight
      ];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * (mobile ? 0.35 : 0.55),
          vy: (Math.random() - 0.5) * (mobile ? 0.35 : 0.55),
          dispX: 0,
          dispY: 0,
          radius: Math.random() * 2 + 1.2,
          colorBase: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: Math.random() * 0.45 + 0.3,
          pulseSpeed: Math.random() * 0.025 + 0.012,
          pulseVal: Math.random() * Math.PI * 2,
        });
      }
    };

    initGridAndParticles();

    // =========================================================================
    // RENDER LOOP
    // =========================================================================
    let tick = 0;
    let lastTime = performance.now();

    const render = (time) => {
      if (!isVisible || !isIntersecting) return;

      tick++;
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Lerp mouse coordinates for smooth physical easing
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // --- 1. BASE ATMOSPHERIC GRADIENTS ---
      const baseGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        60,
        width * 0.5,
        height * 0.45,
        Math.max(width * 0.75, 600)
      );
      baseGrad.addColorStop(0, '#0C264D');
      baseGrad.addColorStop(0.55, '#081E40');
      baseGrad.addColorStop(1, '#071B3A');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // --- 2. SOFT YELLOW MAGNETIC GLOW AROUND MOUSE ---
      if (mouse.x > -500 && mouse.x < width + 500 && mouse.y > -500 && mouse.y < height + 500) {
        const glowRad = isMobile() ? 120 : 180;
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRad
        );
        mouseGlow.addColorStop(0, 'rgba(255, 201, 40, 0.18)'); // Soft brand yellow
        mouseGlow.addColorStop(0.45, 'rgba(56, 189, 248, 0.07)'); // Cyber blue aura
        mouseGlow.addColorStop(1, 'rgba(7, 27, 58, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(mouse.x - glowRad, mouse.y - glowRad, glowRad * 2, glowRad * 2);
      }

      // --- 3. DYNAMIC INTERACTIVE PERSPECTIVE GRID LINES ---
      // Grid points computed with subtle continuous wave + magnetic attraction bending
      const gridNodes = [];

      for (let r = 0; r < gridRows; r++) {
        gridNodes[r] = [];
        const baseRowY = r * gridSpacing;

        for (let c = 0; c < gridCols; c++) {
          const baseColX = c * gridSpacing;

          // Gentle continuous perspective wave drift
          const waveX = Math.sin(tick * 0.012 + baseRowY * 0.015) * 2.5;
          const waveY = Math.cos(tick * 0.012 + baseColX * 0.015) * 2.5;

          let posX = baseColX + waveX;
          let posY = baseRowY + waveY;

          // Magnetic grid point attraction towards cursor
          const dx = mouse.x - posX;
          const dy = mouse.y - posY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let isNearMouse = false;
          if (dist < mouse.radius && dist > 0.01) {
            isNearMouse = true;
            const factor = Math.pow(1 - dist / mouse.radius, 1.8);
            const pullDistance = factor * 16; // subtle displacement
            posX += (dx / dist) * pullDistance;
            posY += (dy / dist) * pullDistance;
          }

          gridNodes[r][c] = { x: posX, y: posY, isNearMouse, dist };
        }
      }

      // Render Horizontal Grid Lines
      ctx.lineWidth = 0.65;
      for (let r = 0; r < gridRows; r++) {
        ctx.beginPath();
        for (let c = 0; c < gridCols; c++) {
          const node = gridNodes[r][c];
          if (c === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            ctx.lineTo(node.x, node.y);
          }
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.065)';
        ctx.stroke();
      }

      // Render Vertical Grid Lines
      for (let c = 0; c < gridCols; c++) {
        ctx.beginPath();
        for (let r = 0; r < gridRows; r++) {
          const node = gridNodes[r][c];
          if (r === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            ctx.lineTo(node.x, node.y);
          }
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.065)';
        ctx.stroke();
      }

      // Render Glowing Grid Intersections
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const node = gridNodes[r][c];
          
          // Random gentle pulsing intersections or intersections near the cursor
          if (node.isNearMouse) {
            const nodeAlpha = (1 - node.dist / mouse.radius) * 0.85;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 201, 40, ${nodeAlpha})`;
            ctx.shadowColor = 'rgba(255, 201, 40, 0.7)';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else if ((r * 3 + c * 7 + tick) % 180 < 10) {
            // Ambient periodic spark on grid intersection
            ctx.beginPath();
            ctx.arc(node.x, node.y, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
            ctx.fill();
          }
        }
      }

      // --- 4. RIPPLES FROM CLICKS ---
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed;
        rip.alpha *= 0.95;

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 201, 40, ${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Push nearby particles on ripple wavefront
        for (let j = 0; j < particles.length; j++) {
          const p = particles[j];
          const px = p.x + p.dispX;
          const py = p.y + p.dispY;
          const rdx = px - rip.x;
          const rdy = py - rip.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const diff = Math.abs(rdist - rip.radius);
          if (diff < 20 && rdist > 0.01) {
            const push = ((20 - diff) / 20) * rip.alpha * 5;
            p.dispX += (rdx / rdist) * push;
            p.dispY += (rdy / rdist) * push;
          }
        }

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // --- 5. CURSOR LIGHT TRAIL ---
      if (mouseTrail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(mouseTrail[0].x, mouseTrail[0].y);
        for (let i = 1; i < mouseTrail.length; i++) {
          const pt = mouseTrail[i];
          const prevPt = mouseTrail[i - 1];
          const midX = (prevPt.x + pt.x) / 2;
          const midY = (prevPt.y + pt.y) / 2;
          ctx.quadraticCurveTo(prevPt.x, prevPt.y, midX, midY);
        }
        ctx.strokeStyle = 'rgba(255, 201, 40, 0.28)';
        ctx.lineWidth = 2.0;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(255, 201, 40, 0.6)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Fade trail
        for (let i = mouseTrail.length - 1; i >= 0; i--) {
          mouseTrail[i].life -= 0.045;
          if (mouseTrail[i].life <= 0) {
            mouseTrail.splice(i, 1);
          }
        }
      }

      // --- 6. PARTICLES ATTRACTION & INTERCONNECTIONS ---
      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Natural continuous drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around canvas edges smoothly
        if (p.x < -30) p.x = width + 30;
        else if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        else if (p.y > height + 30) p.y = -30;

        // Mouse magnetic attraction physics
        const currentPosX = p.x + p.dispX;
        const currentPosY = p.y + p.dispY;
        const mdx = mouse.x - currentPosX;
        const mdy = mouse.y - currentPosY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius && mdist > 0.01) {
          // Inverse square smooth attraction
          const force = Math.pow(1 - mdist / mouse.radius, 1.5) * 1.8;
          p.dispX += (mdx / mdist) * force;
          p.dispY += (mdy / mdist) * force;
        }

        // Damped harmonic oscillator / spring return to natural flow
        p.dispX *= 0.88;
        p.dispY *= 0.88;
      }

      // Draw connecting lines between neighboring particles with bending
      const connectDist = isMobile() ? 90 : 125;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const p1x = p1.x + p1.dispX;
        const p1y = p1.y + p1.dispY;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const p2x = p2.x + p2.dispX;
          const p2y = p2.y + p2.dispY;

          const dx = p1x - p2x;
          const dy = p1y - p2y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDist) {
            const alpha = (1 - dist / connectDist) * 0.22;

            ctx.beginPath();
            ctx.moveTo(p1x, p1y);

            // If line midpoint is near mouse, bend line towards mouse
            const midX = (p1x + p2x) / 2;
            const midY = (p1y + p2y) / 2;
            const lineMdx = mouse.x - midX;
            const lineMdy = mouse.y - midY;
            const lineMdist = Math.sqrt(lineMdx * lineMdx + lineMdy * lineMdy);

            if (lineMdist < mouse.radius && lineMdist > 0.01) {
              const bendFactor = (1 - lineMdist / mouse.radius) * 14;
              const ctrlX = midX + (lineMdx / lineMdist) * bendFactor;
              const ctrlY = midY + (lineMdy / lineMdist) * bendFactor;
              ctx.quadraticCurveTo(ctrlX, ctrlY, p2x, p2y);
              ctx.strokeStyle = `rgba(255, 201, 40, ${alpha * 1.4})`;
            } else {
              ctx.lineTo(p2x, p2y);
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            }

            ctx.lineWidth = 0.75;
            ctx.stroke();

            // Occasional glowing data packet along the connection
            if (dist > 45 && dist < 110 && (tick + i * 7) % 110 === 0) {
              const progress = ((tick * 1.5) % 60) / 60;
              const packetX = p1x + (p2x - p1x) * progress;
              const packetY = p1y + (p2y - p1y) * progress;
              ctx.beginPath();
              ctx.arc(packetX, packetY, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 201, 40, 0.95)';
              ctx.shadowColor = 'rgba(255, 201, 40, 0.8)';
              ctx.shadowBlur = 6;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      // Render Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const renderX = p.x + p.dispX;
        const renderY = p.y + p.dispY;

        p.pulseVal += p.pulseSpeed;
        const pulse = Math.sin(p.pulseVal) * 0.25;
        const currentAlpha = Math.max(0.12, p.baseAlpha + pulse);

        // Extra magnetic brightness when particle is pulled near mouse
        const isNear = Math.abs(p.dispX) > 0.5 || Math.abs(p.dispY) > 0.5;

        ctx.beginPath();
        ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNear
          ? `rgba(255, 201, 40, ${Math.min(1, currentAlpha * 1.6)})`
          : `${p.colorBase}${currentAlpha})`;

        if (isNear) {
          ctx.shadowColor = 'rgba(255, 201, 40, 0.8)';
          ctx.shadowBlur = 8;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Observer to pause when scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && isVisible && !prefersReducedMotion) {
          lastTime = performance.now();
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { rootMargin: '100px 0px', threshold: 0 }
    );
    observer.observe(container);

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  // Reduced motion fallback: calm ambient presentation
  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#071B3A]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
    >
      {/* Dynamic Digital Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Cyber Digital Mesh Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Top & Bottom Depth Fade Gradients */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#071B3A] via-[#071B3A]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071B3A] via-[#071B3A]/70 to-transparent pointer-events-none" />

      {/* Ambient Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-brand-yellow/20 via-brand-navy-card/40 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-brand-yellow/15 via-brand-yellow/5 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating Technology & Digital Marketing Visual Chips (Pointer-events auto for chips if hovered) */}
      
      {/* Chip 1: ROI & Growth (Top-Left) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.4 },
          x: { duration: 0.8, delay: 0.4 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="hidden xl:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-navy-surface/85 border border-brand-yellow/30 shadow-xl shadow-brand-navy-dark/80 backdrop-blur-md absolute top-28 left-8 pointer-events-none"
      >
        <div className="p-2 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Digital Marketing ROI</div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5 font-heading">
            <span>+240% Growth</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Chip 2: Cloud & Web Performance (Top-Right) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, y: [0, 12, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5 },
          x: { duration: 0.8, delay: 0.5 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
        }}
        className="hidden xl:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-navy-surface/85 border border-white/15 shadow-xl shadow-brand-navy-dark/80 backdrop-blur-md absolute top-36 right-8 pointer-events-none"
      >
        <div className="p-2 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">High-Speed Cloud Architecture</div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5 font-heading">
            <span>99.99% Uptime</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Chip 3: Lead Generation & Targeted Traffic (Bottom-Left) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, -12, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.6 },
          y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
        }}
        className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-navy-surface/85 border border-white/10 shadow-xl shadow-brand-navy-dark/80 backdrop-blur-md absolute bottom-20 left-12 pointer-events-none"
      >
        <div className="p-2 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow">
          <Target className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">Targeted Lead Generation</div>
          <div className="text-xs font-bold text-white font-heading">
            3.8x Conversion Rate
          </div>
        </div>
      </motion.div>

      {/* Chip 4: AI & Marketing Automation (Bottom-Right) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.7 },
          y: { duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
        }}
        className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-navy-surface/85 border border-brand-yellow/30 shadow-xl shadow-brand-navy-dark/80 backdrop-blur-md absolute bottom-24 right-12 pointer-events-none"
      >
        <div className="p-2 rounded-xl bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow">
          <Zap className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">AI Workflow Automation</div>
          <div className="text-xs font-bold text-white font-heading">
            Automated Marketing Funnels
          </div>
        </div>
      </motion.div>
    </div>
  );
}
