import React, { useEffect, useRef, useState } from 'react';

/**
 * Premium Digital Data Flow Background Animation
 * Designed exclusively for the NAVABHARATH TECHNOLOGIES Services Page.
 *
 * Features:
 * - Vertical digital code streams / binary rain (0 and 1) with varied speeds & glow
 * - Flowing horizontal data highway lines & light trails
 * - Curved optical fiber data streams with traveling light pulses
 * - Network connection mesh (interactive drifting nodes & dynamic data packets)
 * - Subtle digital background grid with junction markers
 * - Floating technology symbols (</>, {}, λ, AI, API, =>, 0x, //, cloud)
 * - Gentle mouse-responsive parallax (damping / smooth interpolation)
 * - Strict brand palette: Dark Navy (#071B3A), Yellow (#FFC928), White (#FFFFFF), Cyber Blue (#38BDF8)
 * - Responsive particle density (mobile / tablet / desktop)
 * - Zero interference: pointer-events-none, stays strictly behind service cards
 * - Performance optimized: RAF loop, visibility listener, IntersectionObserver, prefers-reduced-motion
 */
export default function ServicesDataFlowBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Accessibility check for reduced motion
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

    // Dimensions
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const isMobile = () => window.innerWidth < 768;
    const isTablet = () => window.innerWidth >= 768 && window.innerWidth < 1024;

    // Resize handler
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

    // Tab visibility handling (conserve CPU/battery when inactive)
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

    // 1. Vertical Binary Code Rain Streams
    let binaryStreams = [];

    // 2. Horizontal Data Lines with Light Trails
    let dataBuses = [];

    // 3. Curved Optical Data Beams
    let curvedStreams = [];

    // 4. Network Mesh Nodes & Pulses
    let networkNodes = [];
    let travelingPulses = [];

    // 5. Floating Technology Symbols
    let techSymbols = [];

    // Tech symbols array
    const symbolGlyphs = [
      '</>', '{ }', '01', 'λ', '∑', '//', '=>', '0x',
      'AI', 'API', 'CLOUD', 'DATA', 'SQL', 'NODE', 'IoT'
    ];

    const initElements = () => {
      binaryStreams = [];
      dataBuses = [];
      curvedStreams = [];
      networkNodes = [];
      travelingPulses = [];
      techSymbols = [];

      const mobile = isMobile();
      const tablet = isTablet();

      // --- 1. Init Binary Streams (Digital Rain) ---
      // Spread evenly across width with varied densities
      const streamCount = mobile ? 12 : tablet ? 22 : 36;
      const colStep = width / streamCount;

      for (let i = 0; i < streamCount; i++) {
        const charCount = Math.floor(Math.random() * 12) + (mobile ? 8 : 14);
        const chars = [];
        for (let c = 0; c < charCount; c++) {
          chars.push(Math.random() > 0.5 ? '1' : '0');
        }

        const isYellowLeading = Math.random() > 0.65;
        binaryStreams.push({
          x: i * colStep + (Math.random() - 0.5) * (colStep * 0.6),
          y: Math.random() * height * 1.5 - height * 0.5,
          speed: Math.random() * 1.4 + (mobile ? 0.8 : 1.2),
          charSpacing: Math.random() * 3 + 14,
          fontSize: Math.floor(Math.random() * 3) + 11,
          chars,
          isYellowLeading,
          baseAlpha: Math.random() * 0.25 + 0.15,
          mutateCooldown: Math.floor(Math.random() * 20),
        });
      }

      // --- 2. Init Horizontal Data Buses & Moving Light Trails ---
      const busCount = mobile ? 4 : tablet ? 6 : 9;
      for (let i = 0; i < busCount; i++) {
        const yPos = (height / (busCount + 1)) * (i + 1) + (Math.random() - 0.5) * 40;
        const speed = (Math.random() * 2.2 + 1.2) * (Math.random() > 0.3 ? 1 : -1);
        const trailLength = Math.random() * 80 + (mobile ? 60 : 110);
        const isYellow = Math.random() > 0.5;

        dataBuses.push({
          y: yPos,
          packetX: Math.random() * width,
          speed,
          trailLength,
          lineAlpha: Math.random() * 0.08 + 0.04,
          packetAlpha: Math.random() * 0.4 + 0.35,
          isYellow,
          pulseTimer: Math.random() * Math.PI * 2,
        });
      }

      // --- 3. Init Curved Optical Data Streams ---
      const curveCount = mobile ? 1 : tablet ? 2 : 3;
      for (let i = 0; i < curveCount; i++) {
        const startY = Math.random() * height * 0.8 + height * 0.1;
        const endY = Math.random() * height * 0.8 + height * 0.1;
        const cp1x = width * 0.33;
        const cp1y = startY + (Math.random() - 0.5) * 300;
        const cp2x = width * 0.66;
        const cp2y = endY + (Math.random() - 0.5) * 300;

        curvedStreams.push({
          p0: { x: -50, y: startY },
          p1: { x: cp1x, y: cp1y },
          p2: { x: cp2x, y: cp2y },
          p3: { x: width + 50, y: endY },
          t: Math.random(),
          speed: Math.random() * 0.0018 + 0.0012,
          color: Math.random() > 0.5 ? '#FFC928' : '#38BDF8',
          alpha: Math.random() * 0.2 + 0.12,
        });
      }

      // --- 4. Init Network Mesh Nodes ---
      const nodeCount = mobile ? 16 : tablet ? 28 : 42;
      for (let i = 0; i < nodeCount; i++) {
        networkNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2 + 1.2,
          isYellow: Math.random() > 0.75,
          alpha: Math.random() * 0.35 + 0.25,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseAngle: Math.random() * Math.PI * 2,
        });
      }

      // --- 5. Init Floating Technology Symbols ---
      const symbolCount = mobile ? 6 : tablet ? 10 : 15;
      for (let i = 0; i < symbolCount; i++) {
        techSymbols.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vy: -Math.random() * 0.22 - 0.08,
          wobbleOffset: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.015 + 0.008,
          glyph: symbolGlyphs[Math.floor(Math.random() * symbolGlyphs.length)],
          isYellow: Math.random() > 0.6,
          alpha: Math.random() * 0.16 + 0.12,
          size: Math.floor(Math.random() * 4) + 11,
        });
      }
    };

    initElements();

    let lastTime = performance.now();
    let tick = 0;

    // Helper: Cubic Bézier point calculation
    const getBezierPoint = (p0, p1, p2, p3, t) => {
      const cx = 3 * (p1.x - p0.x);
      const bx = 3 * (p2.x - p1.x) - cx;
      const ax = p3.x - p0.x - cx - bx;

      const cy = 3 * (p1.y - p0.y);
      const by = 3 * (p2.y - p1.y) - cy;
      const ay = p3.y - p0.y - cy - by;

      const tSquared = t * t;
      const tCubed = tSquared * t;

      return {
        x: ax * tCubed + bx * tSquared + cx * t + p0.x,
        y: ay * tCubed + by * tSquared + cy * t + p0.y,
      };
    };

    // =========================================================================
    // ANIMATION RENDER LOOP
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

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // --- LAYER 0: Ambient Cyber Glows ---
      // Soft ambient radiant gradients behind sections
      const heroGlow = ctx.createRadialGradient(
        width * 0.5 + offsetX,
        Math.min(height * 0.25, 450) + offsetY,
        50,
        width * 0.5,
        Math.min(height * 0.25, 450),
        Math.max(width * 0.6, 500)
      );
      heroGlow.addColorStop(0, 'rgba(255, 201, 40, 0.055)');
      heroGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.035)');
      heroGlow.addColorStop(1, 'rgba(7, 27, 58, 0)');
      ctx.fillStyle = heroGlow;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 1: Subtle Digital Grid & Junction Points ---
      const gridStep = isMobile() ? 70 : 80;
      ctx.lineWidth = 0.5;

      const gridStartX = (offsetX * 0.5) % gridStep;
      const gridStartY = (offsetY * 0.5) % gridStep;

      // Vertical grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.035)';
      ctx.beginPath();
      for (let x = gridStartX; x < width; x += gridStep) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();

      // Horizontal grid lines
      ctx.beginPath();
      for (let y = gridStartY; y < height; y += gridStep) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Subtle grid junction crosses (low frequency)
      ctx.fillStyle = 'rgba(255, 201, 40, 0.12)';
      for (let x = gridStartX; x < width; x += gridStep * 2) {
        for (let y = gridStartY; y < height; y += gridStep * 2) {
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }

      // --- LAYER 2: Horizontal Data Highways & Light Trails ---
      dataBuses.forEach((bus) => {
        // Draw baseline
        ctx.beginPath();
        ctx.moveTo(0, bus.y + offsetY * 0.3);
        ctx.lineTo(width, bus.y + offsetY * 0.3);
        ctx.strokeStyle = `rgba(56, 189, 248, ${bus.lineAlpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Move packet
        bus.packetX += bus.speed;
        if (bus.speed > 0 && bus.packetX > width + bus.trailLength) {
          bus.packetX = -bus.trailLength;
        } else if (bus.speed < 0 && bus.packetX < -bus.trailLength) {
          bus.packetX = width + bus.trailLength;
        }

        // Light trail gradient
        const trailStartX = bus.speed > 0 ? bus.packetX - bus.trailLength : bus.packetX + bus.trailLength;
        const trailGrad = ctx.createLinearGradient(
          trailStartX,
          bus.y + offsetY * 0.3,
          bus.packetX,
          bus.y + offsetY * 0.3
        );

        const colorStr = bus.isYellow ? '255, 201, 40' : '56, 189, 248';
        trailGrad.addColorStop(0, `rgba(${colorStr}, 0)`);
        trailGrad.addColorStop(0.7, `rgba(${colorStr}, ${bus.packetAlpha * 0.4})`);
        trailGrad.addColorStop(1, `rgba(${colorStr}, ${bus.packetAlpha})`);

        ctx.beginPath();
        ctx.moveTo(trailStartX, bus.y + offsetY * 0.3);
        ctx.lineTo(bus.packetX, bus.y + offsetY * 0.3);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Glowing packet head
        ctx.fillStyle = bus.isYellow ? '#FFC928' : '#FFFFFF';
        ctx.shadowColor = bus.isYellow ? 'rgba(255, 201, 40, 0.8)' : 'rgba(56, 189, 248, 0.8)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(bus.packetX, bus.y + offsetY * 0.3, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- LAYER 3: Curved Optical Fiber Data Streams ---
      curvedStreams.forEach((stream) => {
        // Draw subtle curve path
        ctx.beginPath();
        ctx.moveTo(stream.p0.x + offsetX * 0.4, stream.p0.y + offsetY * 0.4);
        ctx.bezierCurveTo(
          stream.p1.x + offsetX * 0.4,
          stream.p1.y + offsetY * 0.4,
          stream.p2.x + offsetX * 0.4,
          stream.p2.y + offsetY * 0.4,
          stream.p3.x + offsetX * 0.4,
          stream.p3.y + offsetY * 0.4
        );
        ctx.strokeStyle = `rgba(56, 189, 248, ${stream.alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Advance traveling pulse along the curve
        stream.t += stream.speed;
        if (stream.t > 1) stream.t = 0;

        const pulsePt = getBezierPoint(
          { x: stream.p0.x + offsetX * 0.4, y: stream.p0.y + offsetY * 0.4 },
          { x: stream.p1.x + offsetX * 0.4, y: stream.p1.y + offsetY * 0.4 },
          { x: stream.p2.x + offsetX * 0.4, y: stream.p2.y + offsetY * 0.4 },
          { x: stream.p3.x + offsetX * 0.4, y: stream.p3.y + offsetY * 0.4 },
          stream.t
        );

        // Draw glowing pulse dot
        ctx.fillStyle = stream.color;
        ctx.shadowColor = stream.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(pulsePt.x, pulsePt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- LAYER 4: Digital Rain (Vertical Binary Streams) ---
      binaryStreams.forEach((stream) => {
        // Stream moves vertically
        stream.y += stream.speed;
        if (stream.y - stream.chars.length * stream.charSpacing > height) {
          stream.y = -stream.charSpacing * 3;
          stream.x = Math.random() * width;
        }

        // Randomly mutate characters
        stream.mutateCooldown--;
        if (stream.mutateCooldown <= 0) {
          const idx = Math.floor(Math.random() * stream.chars.length);
          stream.chars[idx] = Math.random() > 0.5 ? '1' : '0';
          stream.mutateCooldown = Math.floor(Math.random() * 25) + 10;
        }

        ctx.font = `${stream.fontSize}px "JetBrains Mono", Consolas, "Courier New", monospace`;

        const streamX = stream.x + offsetX * 0.6;

        for (let i = 0; i < stream.chars.length; i++) {
          const charY = stream.y - i * stream.charSpacing + offsetY * 0.6;
          if (charY < -20 || charY > height + 20) continue;

          // Leading character (head of digital stream)
          if (i === 0) {
            ctx.fillStyle = stream.isYellow ? '#FFC928' : '#FFFFFF';
            ctx.shadowColor = stream.isYellow ? 'rgba(255, 201, 40, 0.9)' : 'rgba(56, 189, 248, 0.9)';
            ctx.shadowBlur = 7;
            ctx.fillText(stream.chars[i], streamX, charY);
            ctx.shadowBlur = 0;
          } else {
            // Fading trail
            const trailProgress = i / stream.chars.length;
            const alpha = Math.max(0, (1 - trailProgress) * stream.baseAlpha);

            if (stream.isYellow && i < 3) {
              ctx.fillStyle = `rgba(255, 201, 40, ${alpha * 1.2})`;
            } else {
              ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
            }
            ctx.fillText(stream.chars[i], streamX, charY);
          }
        }
      });

      // --- LAYER 5: Network Mesh (Drifting Nodes & Connecting Lines) ---
      const maxConnectDist = isMobile() ? 85 : 125;

      for (let i = 0; i < networkNodes.length; i++) {
        const node = networkNodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.pulseAngle += node.pulseSpeed;
        const currentAlpha = node.alpha + Math.sin(node.pulseAngle) * 0.12;

        const nodeX = node.x + offsetX * 0.8;
        const nodeY = node.y + offsetY * 0.8;

        // Draw connections to nearby nodes
        for (let j = i + 1; j < networkNodes.length; j++) {
          const other = networkNodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.22;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodeX, nodeY);
            ctx.lineTo(other.x + offsetX * 0.8, other.y + offsetY * 0.8);
            ctx.stroke();

            // Rare chance to spawn data pulse between connected nodes
            if (Math.random() < 0.0012 && travelingPulses.length < 12) {
              travelingPulses.push({
                x1: nodeX,
                y1: nodeY,
                x2: other.x + offsetX * 0.8,
                y2: other.y + offsetY * 0.8,
                progress: 0,
                speed: Math.random() * 0.025 + 0.015,
                isYellow: Math.random() > 0.6,
              });
            }
          }
        }

        // Draw node dot
        ctx.fillStyle = node.isYellow
          ? `rgba(255, 201, 40, ${currentAlpha})`
          : `rgba(56, 189, 248, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glowing halo on yellow nodes
        if (node.isYellow) {
          ctx.fillStyle = `rgba(255, 201, 40, ${currentAlpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, node.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Update & render traveling packet pulses
      for (let p = travelingPulses.length - 1; p >= 0; p--) {
        const pulse = travelingPulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          travelingPulses.splice(p, 1);
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

      // --- LAYER 6: Floating Technology Symbols ---
      ctx.font = '12px "JetBrains Mono", Consolas, monospace';
      techSymbols.forEach((sym) => {
        sym.y += sym.vy;
        if (sym.y < -30) {
          sym.y = height + 30;
          sym.x = Math.random() * width;
        }

        const wobbleX = Math.sin(tick * sym.wobbleSpeed + sym.wobbleOffset) * 10;
        const symX = sym.x + wobbleX + offsetX;
        const symY = sym.y + offsetY;

        ctx.fillStyle = sym.isYellow
          ? `rgba(255, 201, 40, ${sym.alpha})`
          : `rgba(56, 189, 248, ${sym.alpha})`;
        ctx.fillText(sym.glyph, symX, symY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause RAF when scrolled off-screen
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

    // Initial trigger
    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  // Reduced motion fallback (calm static digital grid and gentle ambient glows)
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
      {/* Dynamic Hardware-Accelerated Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />

      {/* Top & Bottom Depth Masking Gradients */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-navy via-brand-navy/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-transparent pointer-events-none" />
    </div>
  );
}
