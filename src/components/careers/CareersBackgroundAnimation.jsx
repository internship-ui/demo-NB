import React, { useEffect, useRef, useState } from 'react';

/**
 * Premium Floating Code Background Animation
 * Designed exclusively for the NAVABHARATH TECHNOLOGIES Careers Page.
 *
 * Visual Features:
 * - Futuristic dark navy background (#071B3A) with atmospheric radial glows
 * - Floating programming snippets from JavaScript, React JS, Python, HTML and CSS
 * - Snippets include:
 *     const future = "Innovation";
 *     function buildSolutions() {};
 *     import React from "react";
 *     AI = Technology + Innovation;
 *     def optimize_model(data): return True
 *     const [scale, setScale] = useState(1);
 *     async function deploy() { await cloud.push(); }
 *     <Component runtime="v8" />
 *     display: flex; backdrop-filter: blur(12px);
 *     class SystemArchitect:
 *     from neural_net import DeepPipeline
 *     export default EnterpriseApp;
 * - Syntax highlighting in company colours: Dark Navy (#071B3A), Yellow (#FFC928), White (#FFFFFF), Cyber Blue (#38BDF8)
 * - Multi-plane depth layers (foreground, midground, background) with varied speeds, sizes, and opacities
 * - Natural upward floating movement with horizontal sinusoidal sway
 * - Glowing digital particles & floating binary numbers (0 and 1)
 * - Subtle yellow & blue ambient glows
 * - Gentle mouse-responsive parallax with damping
 * - Performance optimized: requestAnimationFrame, pause on hidden tab, IntersectionObserver, prefers-reduced-motion
 * - pointer-events: none on decorative layers to preserve 100% interactivity of buttons, job listings, and application forms
 */
export default function CareersBackgroundAnimation() {
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

    // Mouse tracking for gentle parallax
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
    // CODE SNIPPET DEFINITIONS WITH SYNTAX COLOR TOKENS
    // =========================================================================
    const rawSnippetTemplates = [
      // 1. JavaScript / React
      [
        { text: 'const', color: '#FFC928', glow: true },
        { text: ' future = ', color: '#FFFFFF' },
        { text: '"Innovation";', color: '#FDE047' },
      ],
      // 2. JavaScript Function
      [
        { text: 'function', color: '#FFC928' },
        { text: ' buildSolutions', color: '#38BDF8' },
        { text: '() {', color: '#FFFFFF' },
        { text: ' return scale; ', color: '#94A3B8' },
        { text: '};', color: '#FFC928' },
      ],
      // 3. React Import
      [
        { text: 'import', color: '#FFC928' },
        { text: ' React ', color: '#FFFFFF' },
        { text: 'from', color: '#FFC928' },
        { text: ' "react";', color: '#38BDF8' },
      ],
      // 4. AI Formula
      [
        { text: 'AI', color: '#FFC928', glow: true },
        { text: ' = ', color: '#38BDF8' },
        { text: 'Technology', color: '#FFFFFF' },
        { text: ' + ', color: '#FFC928' },
        { text: 'Innovation;', color: '#FFFFFF' },
      ],
      // 5. Python def
      [
        { text: 'def', color: '#FFC928' },
        { text: ' optimize_model', color: '#38BDF8' },
        { text: '(data): ', color: '#FFFFFF' },
        { text: 'return', color: '#FFC928' },
        { text: ' True', color: '#38BDF8' },
      ],
      // 6. React State Hook
      [
        { text: 'const', color: '#FFC928' },
        { text: ' [scale, setScale] = ', color: '#FFFFFF' },
        { text: 'useState', color: '#38BDF8' },
        { text: '(1);', color: '#FFC928' },
      ],
      // 7. JSX Tag
      [
        { text: '<', color: '#FFC928' },
        { text: 'Component', color: '#38BDF8' },
        { text: ' runtime=', color: '#FFFFFF' },
        { text: '"v8"', color: '#FDE047' },
        { text: ' />', color: '#FFC928' },
      ],
      // 8. CSS Properties
      [
        { text: 'display:', color: '#38BDF8' },
        { text: ' flex; ', color: '#FFC928' },
        { text: 'backdrop-filter:', color: '#38BDF8' },
        { text: ' blur(12px);', color: '#FFFFFF' },
      ],
      // 9. Async / Await Deploy
      [
        { text: 'async function', color: '#FFC928' },
        { text: ' deploy() { ', color: '#FFFFFF' },
        { text: 'await', color: '#38BDF8' },
        { text: ' cloud.push(); }', color: '#FFFFFF' },
      ],
      // 10. Python Class
      [
        { text: 'class', color: '#FFC928' },
        { text: ' SystemArchitect', color: '#38BDF8' },
        { text: ':', color: '#FFC928' },
      ],
      // 11. Python Import
      [
        { text: 'from', color: '#FFC928' },
        { text: ' neural_net ', color: '#FFFFFF' },
        { text: 'import', color: '#FFC928' },
        { text: ' DeepPipeline', color: '#38BDF8' },
      ],
      // 12. React Export
      [
        { text: 'export default', color: '#FFC928' },
        { text: ' EnterpriseApp;', color: '#FFFFFF' },
      ],
      // 13. React useEffect
      [
        { text: 'useEffect', color: '#38BDF8' },
        { text: '(() => { ', color: '#FFFFFF' },
        { text: 'innovate();', color: '#FFC928' },
        { text: ' }, []);', color: '#FFFFFF' },
      ],
      // 14. HTML Tag Snippet
      [
        { text: '<div', color: '#38BDF8' },
        { text: ' className=', color: '#FFFFFF' },
        { text: '"engineering-grid"', color: '#FDE047' },
        { text: '>', color: '#38BDF8' },
      ],
      // 15. Short Syntax Token: Curly Braces
      [
        { text: '{ ', color: '#FFC928', glow: true },
        { text: '...careerGrowth, status: "Active"', color: '#FFFFFF' },
        { text: ' }', color: '#FFC928', glow: true },
      ],
      // 16. Arrow Function
      [
        { text: 'const', color: '#FFC928' },
        { text: ' solve = (challenge) => ', color: '#FFFFFF' },
        { text: 'deliver();', color: '#38BDF8' },
      ],
      // 17. PyTorch Training
      [
        { text: 'model.train', color: '#38BDF8' },
        { text: '(epochs=', color: '#FFFFFF' },
        { text: '100', color: '#FFC928' },
        { text: ', lr=', color: '#FFFFFF' },
        { text: '0.001', color: '#FFC928' },
        { text: ')', color: '#FFFFFF' },
      ],
      // 18. Angle Brackets & Fragments
      [
        { text: '<>', color: '#FFC928', glow: true },
        { text: ' <FullStackDeveloper /> </ >', color: '#38BDF8' },
      ],
    ];

    // Single Syntax Tokens & Symbols
    const syntaxSymbols = [
      '{ }', '< >', '=>', '//', '0x', '[ ]', '( )', '::', '===', '&&', '||', 'λ', 'git'
    ];

    // =========================================================================
    // STATEFUL CANVAS OBJECTS
    // =========================================================================
    let codeSnippets = [];
    let binaryBits = [];
    let digitalParticles = [];

    const initElements = () => {
      codeSnippets = [];
      binaryBits = [];
      digitalParticles = [];

      const mobile = isMobile();
      const tablet = isTablet();

      // --- 1. Init Floating Code Snippets ---
      const snippetCount = mobile ? 9 : tablet ? 15 : 24;
      for (let i = 0; i < snippetCount; i++) {
        const template = rawSnippetTemplates[i % rawSnippetTemplates.length];
        const depth = Math.random() * 0.6 + 0.4; // 0.4 to 1.0 depth
        const baseSpeed = Math.random() * 0.35 + (mobile ? 0.2 : 0.28);

        codeSnippets.push({
          tokens: template,
          x: Math.random() * width,
          y: Math.random() * height,
          vy: -baseSpeed * depth, // upward movement scaled by depth
          swayAmp: Math.random() * 16 + 8,
          swaySpeed: Math.random() * 0.015 + 0.006,
          swayOffset: Math.random() * Math.PI * 2,
          depth,
          fontSize: Math.floor(depth * 3) + (mobile ? 10 : 12),
          baseAlpha: Math.random() * 0.25 + (depth > 0.8 ? 0.35 : 0.18),
        });
      }

      // --- 2. Floating Binary Bits (0 and 1) ---
      const binaryCount = mobile ? 12 : tablet ? 24 : 36;
      for (let i = 0; i < binaryCount; i++) {
        binaryBits.push({
          val: Math.random() > 0.5 ? '1' : '0',
          x: Math.random() * width,
          y: Math.random() * height,
          vy: -Math.random() * 0.45 - 0.15, // upward drift
          swayAmp: Math.random() * 12 + 4,
          swaySpeed: Math.random() * 0.02 + 0.01,
          swayOffset: Math.random() * Math.PI * 2,
          fontSize: Math.floor(Math.random() * 3) + 11,
          isYellow: Math.random() > 0.65,
          alpha: Math.random() * 0.3 + 0.15,
          flipCooldown: Math.floor(Math.random() * 70) + 30,
        });
      }

      // --- 3. Glowing Digital Particles ---
      const particleCount = mobile ? 16 : tablet ? 30 : 45;
      for (let i = 0; i < particleCount; i++) {
        digitalParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -Math.random() * 0.35 - 0.1,
          radius: Math.random() * 2 + 1,
          isYellow: Math.random() > 0.65,
          alpha: Math.random() * 0.4 + 0.2,
          pulseSpeed: Math.random() * 0.025 + 0.01,
          pulseVal: Math.random() * Math.PI * 2,
        });
      }
    };

    initElements();

    let lastTime = performance.now();
    let tick = 0;

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
      const offsetX = (mouse.x - width / 2) * 0.014;
      const offsetY = (mouse.y - height / 2) * 0.014;

      ctx.clearRect(0, 0, width, height);

      // --- LAYER 0: Ambient Cyber Gradients & Radial Glows ---
      // Base atmospheric dark navy gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5 + offsetX * 0.4,
        height * 0.4 + offsetY * 0.4,
        80,
        width * 0.5,
        height * 0.4,
        Math.max(width * 0.65, 500)
      );
      bgGrad.addColorStop(0, '#0F2B57');
      bgGrad.addColorStop(0.5, '#0A2044');
      bgGrad.addColorStop(1, '#071B3A');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Soft yellow ambient radial aura behind the center title
      const yellowAura = ctx.createRadialGradient(
        width * 0.5 + offsetX * 0.6,
        height * 0.42 + offsetY * 0.6,
        30,
        width * 0.5,
        height * 0.42,
        Math.max(width * 0.45, 380)
      );
      yellowAura.addColorStop(0, 'rgba(255, 201, 40, 0.075)'); // Brand yellow glow
      yellowAura.addColorStop(0.5, 'rgba(56, 189, 248, 0.035)'); // Subtle cyber blue
      yellowAura.addColorStop(1, 'rgba(7, 27, 58, 0)');
      ctx.fillStyle = yellowAura;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 1: Subtle Digital Grid Background ---
      const gridStep = isMobile() ? 75 : 85;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
      ctx.beginPath();
      const startX = (offsetX * 0.3) % gridStep;
      const startY = (offsetY * 0.3) % gridStep;

      for (let x = startX; x < width; x += gridStep) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = startY; y < height; y += gridStep) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // --- LAYER 2: Floating Binary Numbers (0 and 1) ---
      ctx.font = '12px "JetBrains Mono", Consolas, monospace';
      binaryBits.forEach((bit) => {
        bit.y += bit.vy;
        if (bit.y < -30) {
          bit.y = height + 30;
          bit.x = Math.random() * width;
        }

        bit.flipCooldown--;
        if (bit.flipCooldown <= 0) {
          bit.val = bit.val === '1' ? '0' : '1';
          bit.flipCooldown = Math.floor(Math.random() * 80) + 40;
        }

        const swayX = Math.sin(tick * bit.swaySpeed + bit.swayOffset) * bit.swayAmp;
        const drawX = bit.x + swayX + offsetX * 0.5;
        const drawY = bit.y + offsetY * 0.5;

        // Vertical edge fade
        let edgeAlpha = 1;
        if (bit.y < 80) edgeAlpha = Math.max(0, bit.y / 80);
        else if (bit.y > height - 80) edgeAlpha = Math.max(0, (height - bit.y) / 80);

        const currentAlpha = bit.alpha * edgeAlpha;

        if (bit.isYellow) {
          ctx.fillStyle = `rgba(255, 201, 40, ${currentAlpha * 1.3})`;
          ctx.shadowColor = 'rgba(255, 201, 40, 0.7)';
          ctx.shadowBlur = 6;
          ctx.fillText(bit.val, drawX, drawY);
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
          ctx.fillText(bit.val, drawX, drawY);
        }
      });

      // --- LAYER 3: Glowing Digital Particles ---
      digitalParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;

        p.pulseVal += p.pulseSpeed;
        const pulse = Math.sin(p.pulseVal) * 0.12;
        const currentAlpha = Math.max(0.08, p.alpha + pulse);

        const posX = p.x + offsetX * 0.6;
        const posY = p.y + offsetY * 0.6;

        ctx.fillStyle = p.isYellow
          ? `rgba(255, 201, 40, ${currentAlpha})`
          : `rgba(255, 255, 255, ${currentAlpha})`;

        if (p.isYellow) {
          ctx.shadowColor = 'rgba(255, 201, 40, 0.8)';
          ctx.shadowBlur = 6;
        }

        ctx.beginPath();
        ctx.arc(posX, posY, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- LAYER 4: Floating Code Snippets with Syntax Highlighting ---
      codeSnippets.forEach((snippet) => {
        // Upward floating
        snippet.y += snippet.vy;
        if (snippet.y < -50) {
          snippet.y = height + 50;
          snippet.x = Math.random() * (width - 150);
        }

        const swayX = Math.sin(tick * snippet.swaySpeed + snippet.swayOffset) * snippet.swayAmp;
        const posX = snippet.x + swayX + offsetX * snippet.depth;
        const posY = snippet.y + offsetY * snippet.depth;

        // Smooth fade in / out at top and bottom margins
        let fadeFactor = 1;
        if (snippet.y < 110) fadeFactor = Math.max(0, snippet.y / 110);
        else if (snippet.y > height - 110) fadeFactor = Math.max(0, (height - snippet.y) / 110);

        const currentAlpha = snippet.baseAlpha * fadeFactor;
        if (currentAlpha <= 0.01) return;

        ctx.font = `${snippet.fontSize}px "JetBrains Mono", Consolas, "Courier New", monospace`;

        // Render syntax-highlighted tokens horizontally
        let tokenCursorX = posX;

        snippet.tokens.forEach((token) => {
          let alphaAdjustedColor = token.color;

          // Convert hex colors to rgba with currentAlpha
          if (token.color === '#FFC928') {
            alphaAdjustedColor = `rgba(255, 201, 40, ${Math.min(1, currentAlpha * 1.35)})`;
          } else if (token.color === '#38BDF8') {
            alphaAdjustedColor = `rgba(56, 189, 248, ${currentAlpha * 1.15})`;
          } else if (token.color === '#FDE047') {
            alphaAdjustedColor = `rgba(253, 224, 71, ${currentAlpha * 1.2})`;
          } else if (token.color === '#94A3B8') {
            alphaAdjustedColor = `rgba(148, 163, 184, ${currentAlpha * 0.9})`;
          } else {
            alphaAdjustedColor = `rgba(255, 255, 255, ${currentAlpha})`;
          }

          ctx.fillStyle = alphaAdjustedColor;

          if (token.glow) {
            ctx.shadowColor = token.color === '#FFC928' ? 'rgba(255, 201, 40, 0.7)' : 'rgba(56, 189, 248, 0.7)';
            ctx.shadowBlur = 8;
          }

          ctx.fillText(token.text, tokenCursorX, posY);
          ctx.shadowBlur = 0;

          // Measure token width to position subsequent token
          const measured = ctx.measureText(token.text);
          tokenCursorX += measured.width;
        });
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

  // Reduced motion fallback: calm ambient code snippets with zero continuous motion
  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0"
      >
        <div className="absolute inset-0 bg-[#071B3A]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
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
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#071B3A] via-[#071B3A]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#071B3A] via-[#071B3A]/70 to-transparent pointer-events-none" />
    </div>
  );
}
