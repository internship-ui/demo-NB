import React, { useEffect, useRef, useState } from 'react';

/**
 * Premium Floating Digital Data Background Animation
 * Designed exclusively for the NAVABHARATH TECHNOLOGIES Portfolio Page.
 *
 * Visual Features:
 * - Floating binary numbers (0 and 1) moving smoothly from BOTTOM to TOP with subtle glow
 * - Digital particles (some moving horizontally, some floating in 2.5D depth layers)
 * - Programming code symbols ({ }, </>, const, return, git, cloud, =>, 0x, //) & geometric tech shapes (hexagons, tech diamonds)
 * - Network connection lines with glowing nodes and traveling data sparks
 * - Subtle circuit patterns with moving pulse packets
 * - Soft yellow radial glow behind the hero section keeping all headings and category filters clearly readable
 * - Fully extended behind all client project cards & internal products without interfering with card tilt, clicks, or modals
 * - Gentle mouse-responsive parallax (smoothed with damping)
 * - Brand colours: Dark Navy (#071B3A), Yellow (#FFC928), White (#FFFFFF), Cyber Blue (#38BDF8)
 * - Optimized particle counts for desktop, tablet, and mobile
 * - Full prefers-reduced-motion, visibilitychange, and IntersectionObserver support
 */
export default function PortfolioDataBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Accessibility check
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

    // Track dimensions accurately
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const isMobile = () => window.innerWidth < 768;
    const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
      initElements();
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for subtle parallax
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

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
    // DATA STRUCTURES
    // =========================================================================

    // 1. Upward Floating Binary Data (Bottom to Top)
    let binaryBits = [];

    // 2. Horizontal & Ambient Data Particles
    let dataParticles = [];

    // 3. Programming Symbols & Geometric Tech Shapes
    let techItems = [];

    // 4. Network Mesh Nodes & Connections
    let networkNodes = [];
    let networkPulses = [];

    // 5. Circuit Patterns & Highway Traces
    let circuitTraces = [];

    const programmingGlyphs = [
      '{ }', '</>', '01', 'const', 'return', 'git',
      'docker', 'cloud', 'npm', '//', '=>', '0x',
      '[ ]', 'async', 'API', 'def', 'void'
    ];

    const initElements = () => {
      binaryBits = [];
      dataParticles = [];
      techItems = [];
      networkNodes = [];
      networkPulses = [];
      circuitTraces = [];

      const mobile = isMobile();
      const tablet = isTablet();

      // --- 1. Upward Floating Binary Numbers (0 and 1) ---
      const binaryCount = mobile ? 28 : tablet ? 55 : 90;
      for (let i = 0; i < binaryCount; i++) {
        binaryBits.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: Math.random() * 0.9 + (mobile ? 0.4 : 0.6), // upward speed
          val: Math.random() > 0.5 ? '1' : '0',
          fontSize: Math.floor(Math.random() * 4) + 11,
          swayAmp: Math.random() * 15 + 5,
          swaySpeed: Math.random() * 0.018 + 0.008,
          swayOffset: Math.random() * Math.PI * 2,
          isYellow: Math.random() > 0.72,
          baseAlpha: Math.random() * 0.28 + 0.12,
          flipCooldown: Math.floor(Math.random() * 100) + 40,
        });
      }

      // --- 2. Horizontal & Ambient Data Particles ---
      const particleCount = mobile ? 25 : tablet ? 45 : 75;
      for (let i = 0; i < particleCount; i++) {
        const isHorizontal = Math.random() > 0.5;
        dataParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: isHorizontal ? (Math.random() * 1.6 + 0.8) * (Math.random() > 0.5 ? 1 : -1) : (Math.random() - 0.5) * 0.5,
          vy: isHorizontal ? (Math.random() - 0.5) * 0.15 : (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          isYellow: Math.random() > 0.6,
          trailLength: isHorizontal ? Math.random() * 25 + 10 : 0,
          alpha: Math.random() * 0.4 + 0.2,
          pulseSpeed: Math.random() * 0.025 + 0.01,
          pulseVal: Math.random() * Math.PI * 2,
        });
      }

      // --- 3. Technology Symbols & Geometric Shapes ---
      const techCount = mobile ? 8 : tablet ? 15 : 22;
      for (let i = 0; i < techCount; i++) {
        const type = Math.random() > 0.45 ? 'glyph' : Math.random() > 0.5 ? 'hex' : 'diamond';
        techItems.push({
          type,
          text: programmingGlyphs[Math.floor(Math.random() * programmingGlyphs.length)],
          x: Math.random() * width,
          y: Math.random() * height,
          vy: -Math.random() * 0.35 - 0.12, // gentle upward drift
          vx: (Math.random() - 0.5) * 0.2,
          size: type === 'glyph' ? Math.floor(Math.random() * 3) + 11 : Math.random() * 14 + 10,
          isYellow: Math.random() > 0.6,
          phase: Math.random() * Math.PI * 2,
          fadeSpeed: Math.random() * 0.015 + 0.008,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.008,
          depth: Math.random() * 0.6 + 0.4, // 0.4 to 1.0
        });
      }

      // --- 4. Network Mesh Nodes ---
      const nodeCount = mobile ? 18 : tablet ? 32 : 48;
      for (let i = 0; i < nodeCount; i++) {
        networkNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 1.2,
          isYellow: Math.random() > 0.7,
          alpha: Math.random() * 0.35 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseAngle: Math.random() * Math.PI * 2,
        });
      }

      // --- 5. Circuit Traces with Pulse Beacons ---
      const traceCount = mobile ? 3 : tablet ? 6 : 9;
      for (let i = 0; i < traceCount; i++) {
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        const seg1 = Math.random() * 120 + 60;
        const seg2 = Math.random() * 80 + 40;
        const goRight = Math.random() > 0.5;

        circuitTraces.push({
          p1: { x: startX, y: startY },
          p2: { x: goRight ? startX + seg1 : startX - seg1, y: startY },
          p3: { x: goRight ? startX + seg1 + seg2 * 0.7 : startX - seg1 - seg2 * 0.7, y: startY + seg2 * 0.7 },
          progress: Math.random(),
          speed: Math.random() * 0.003 + 0.002,
          alpha: Math.random() * 0.12 + 0.05,
          isYellow: Math.random() > 0.5,
        });
      }
    };

    initElements();

    let lastTime = performance.now();
    let tick = 0;

    // Helper: Draw wireframe hexagon
    const drawHexagon = (cx, cy, r, rot = 0) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rot + (i * Math.PI) / 3;
        const hx = cx + r * Math.cos(angle);
        const hy = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
    };

    // Helper: Draw wireframe tech diamond
    const drawDiamond = (cx, cy, size, rot = 0) => {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = rot + (i * Math.PI) / 2;
        const dx = cx + size * Math.cos(angle);
        const dy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(dx, dy);
        else ctx.lineTo(dx, dy);
      }
      ctx.closePath();
    };

    // =========================================================================
    // MAIN RENDER LOOP
    // =========================================================================
    const render = (time) => {
      if (!isVisible || !isIntersecting) return;

      tick++;
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth mouse parallax lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      const offsetX = (mouse.x - width / 2) * 0.015;
      const offsetY = (mouse.y - height / 2) * 0.015;

      ctx.clearRect(0, 0, width, height);

      // --- LAYER 0: Soft Yellow Radial Glow Behind Hero Section ---
      // Positioned strategically behind the Client Portfolio title and category filters
      const heroGlowY = Math.min(height * 0.14, 380);
      const heroGlow = ctx.createRadialGradient(
        width * 0.5 + offsetX * 0.5,
        heroGlowY + offsetY * 0.5,
        40,
        width * 0.5,
        heroGlowY,
        Math.max(width * 0.55, 480)
      );
      heroGlow.addColorStop(0, 'rgba(255, 201, 40, 0.085)'); // Soft brand yellow
      heroGlow.addColorStop(0.45, 'rgba(56, 189, 248, 0.035)'); // Soft cyan transition
      heroGlow.addColorStop(1, 'rgba(7, 27, 58, 0)');
      ctx.fillStyle = heroGlow;
      ctx.fillRect(0, 0, width, height);

      // Secondary ambient glow behind the "Our Projects" section
      const projectsGlowY = Math.min(height * 0.65, 2100);
      const projectsGlow = ctx.createRadialGradient(
        width * 0.5 + offsetX * 0.3,
        projectsGlowY + offsetY * 0.3,
        60,
        width * 0.5,
        projectsGlowY,
        Math.max(width * 0.5, 450)
      );
      projectsGlow.addColorStop(0, 'rgba(255, 201, 40, 0.05)');
      projectsGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.025)');
      projectsGlow.addColorStop(1, 'rgba(7, 27, 58, 0)');
      ctx.fillStyle = projectsGlow;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 1: Subtle Circuit Traces ---
      circuitTraces.forEach((trace) => {
        ctx.strokeStyle = trace.isYellow
          ? `rgba(255, 201, 40, ${trace.alpha * 0.7})`
          : `rgba(56, 189, 248, ${trace.alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(trace.p1.x + offsetX * 0.3, trace.p1.y + offsetY * 0.3);
        ctx.lineTo(trace.p2.x + offsetX * 0.3, trace.p2.y + offsetY * 0.3);
        ctx.lineTo(trace.p3.x + offsetX * 0.3, trace.p3.y + offsetY * 0.3);
        ctx.stroke();

        // Terminal pad dot
        ctx.fillStyle = trace.isYellow ? '#FFC928' : '#38BDF8';
        ctx.beginPath();
        ctx.arc(trace.p3.x + offsetX * 0.3, trace.p3.y + offsetY * 0.3, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Moving pulse dot along trace
        trace.progress += trace.speed;
        if (trace.progress > 1) trace.progress = 0;

        let dotX, dotY;
        if (trace.progress < 0.65) {
          const t = trace.progress / 0.65;
          dotX = trace.p1.x + (trace.p2.x - trace.p1.x) * t;
          dotY = trace.p1.y + (trace.p2.y - trace.p1.y) * t;
        } else {
          const t = (trace.progress - 0.65) / 0.35;
          dotX = trace.p2.x + (trace.p3.x - trace.p2.x) * t;
          dotY = trace.p2.y + (trace.p3.y - trace.p2.y) * t;
        }

        ctx.fillStyle = trace.isYellow ? '#FFC928' : '#FFFFFF';
        ctx.shadowColor = trace.isYellow ? '#FFC928' : '#38BDF8';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(dotX + offsetX * 0.3, dotY + offsetY * 0.3, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- LAYER 2: Network Mesh (Drifting Nodes & Connecting Lines) ---
      const maxConnectDist = isMobile() ? 80 : 120;
      for (let i = 0; i < networkNodes.length; i++) {
        const node = networkNodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.pulseAngle += node.pulseSpeed;
        const currentAlpha = node.alpha + Math.sin(node.pulseAngle) * 0.12;

        const nodeX = node.x + offsetX * 0.5;
        const nodeY = node.y + offsetY * 0.5;

        // Draw connections
        for (let j = i + 1; j < networkNodes.length; j++) {
          const other = networkNodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.18;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodeX, nodeY);
            ctx.lineTo(other.x + offsetX * 0.5, other.y + offsetY * 0.5);
            ctx.stroke();

            // Rare traveling spark pulse between nodes
            if (Math.random() < 0.0012 && networkPulses.length < 12) {
              networkPulses.push({
                x1: nodeX,
                y1: nodeY,
                x2: other.x + offsetX * 0.5,
                y2: other.y + offsetY * 0.5,
                progress: 0,
                speed: Math.random() * 0.025 + 0.015,
                isYellow: Math.random() > 0.6,
              });
            }
          }
        }

        // Draw node
        ctx.fillStyle = node.isYellow
          ? `rgba(255, 201, 40, ${currentAlpha})`
          : `rgba(56, 189, 248, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, node.radius, 0, Math.PI * 2);
        ctx.fill();

        if (node.isYellow) {
          ctx.fillStyle = `rgba(255, 201, 40, ${currentAlpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, node.radius * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update & render traveling packet pulses
      for (let p = networkPulses.length - 1; p >= 0; p--) {
        const pulse = networkPulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          networkPulses.splice(p, 1);
          continue;
        }

        const px = pulse.x1 + (pulse.x2 - pulse.x1) * pulse.progress;
        const py = pulse.y1 + (pulse.y2 - pulse.y1) * pulse.progress;

        ctx.fillStyle = pulse.isYellow ? '#FFC928' : '#FFFFFF';
        ctx.shadowColor = pulse.isYellow ? '#FFC928' : '#38BDF8';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // --- LAYER 3: Horizontal & Ambient Data Particles ---
      dataParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -40) p.x = width + 40;
        else if (p.x > width + 40) p.x = -40;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        p.pulseVal += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulseVal) * 0.12;

        const posX = p.x + offsetX * 0.7;
        const posY = p.y + offsetY * 0.7;

        // If horizontal particle, draw soft trailing line
        if (p.trailLength > 0) {
          const trailX = p.vx > 0 ? posX - p.trailLength : posX + p.trailLength;
          const grad = ctx.createLinearGradient(trailX, posY, posX, posY);
          const colStr = p.isYellow ? '255, 201, 40' : '56, 189, 248';
          grad.addColorStop(0, `rgba(${colStr}, 0)`);
          grad.addColorStop(1, `rgba(${colStr}, ${currentAlpha * 0.5})`);

          ctx.beginPath();
          ctx.moveTo(trailX, posY);
          ctx.lineTo(posX, posY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Particle dot
        ctx.fillStyle = p.isYellow
          ? `rgba(255, 201, 40, ${currentAlpha})`
          : `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(posX, posY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- LAYER 4: Floating Binary Numbers (0 and 1) Moving Bottom to Top ---
      ctx.font = '12px "JetBrains Mono", Consolas, monospace';
      binaryBits.forEach((bit) => {
        // Float upwards
        bit.y -= bit.speed;
        if (bit.y < -30) {
          bit.y = height + 30;
          bit.x = Math.random() * width;
        }

        // Periodic bit flips (0 <-> 1)
        bit.flipCooldown--;
        if (bit.flipCooldown <= 0) {
          bit.val = bit.val === '1' ? '0' : '1';
          bit.flipCooldown = Math.floor(Math.random() * 80) + 40;
        }

        // Horizontal sinusoidal sway
        const swayX = Math.sin(tick * bit.swaySpeed + bit.swayOffset) * bit.swayAmp;
        const drawX = bit.x + swayX + offsetX * 0.6;
        const drawY = bit.y + offsetY * 0.6;

        // Soft fade near top and bottom edges
        let edgeAlpha = 1;
        if (bit.y < 120) edgeAlpha = Math.max(0, bit.y / 120);
        else if (bit.y > height - 120) edgeAlpha = Math.max(0, (height - bit.y) / 120);

        const currentAlpha = bit.baseAlpha * edgeAlpha;

        if (bit.isYellow) {
          ctx.fillStyle = `rgba(255, 201, 40, ${currentAlpha * 1.25})`;
          ctx.shadowColor = 'rgba(255, 201, 40, 0.6)';
          ctx.shadowBlur = 5;
          ctx.fillText(bit.val, drawX, drawY);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
          ctx.fillText(bit.val, drawX, drawY);
        }
      });

      // --- LAYER 5: Programming Symbols & Geometric Tech Shapes ---
      techItems.forEach((item) => {
        item.y += item.vy;
        item.x += item.vx;

        if (item.y < -40) {
          item.y = height + 40;
          item.x = Math.random() * width;
        }
        if (item.x < -30) item.x = width + 30;
        else if (item.x > width + 30) item.x = -30;

        item.rotation += item.rotSpeed;

        // Smooth fade in / fade out sine oscillation
        const fade = (Math.sin(tick * item.fadeSpeed + item.phase) + 1) * 0.5;
        const currentAlpha = (0.08 + fade * 0.16) * item.depth;

        const posX = item.x + offsetX * item.depth;
        const posY = item.y + offsetY * item.depth;

        if (item.type === 'glyph') {
          ctx.font = `${item.size}px "JetBrains Mono", Consolas, monospace`;
          ctx.fillStyle = item.isYellow
            ? `rgba(255, 201, 40, ${currentAlpha * 1.2})`
            : `rgba(56, 189, 248, ${currentAlpha})`;
          ctx.fillText(item.text, posX, posY);
        } else if (item.type === 'hex') {
          ctx.strokeStyle = item.isYellow
            ? `rgba(255, 201, 40, ${currentAlpha})`
            : `rgba(56, 189, 248, ${currentAlpha})`;
          ctx.lineWidth = 0.8;
          drawHexagon(posX, posY, item.size, item.rotation);
          ctx.stroke();
        } else if (item.type === 'diamond') {
          ctx.strokeStyle = item.isYellow
            ? `rgba(255, 201, 40, ${currentAlpha})`
            : `rgba(56, 189, 248, ${currentAlpha})`;
          ctx.lineWidth = 0.8;
          drawDiamond(posX, posY, item.size, item.rotation);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause when scrolled out of view
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
      { rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(container);

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  // Accessibility fallback: calm static grid & soft ambient glow
  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[500px] h-[500px] bg-brand-navy-card/30 rounded-full blur-3xl pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
    >
      {/* Hardware accelerated dynamic canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />

      {/* Top & Bottom Depth Masking Gradients */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-brand-navy via-brand-navy/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-transparent pointer-events-none" />
    </div>
  );
}
