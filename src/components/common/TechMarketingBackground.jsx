import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Cpu, Target, Zap, BarChart3, Rocket } from 'lucide-react';

export default function TechMarketingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes configuration
    const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
    const particles = [];

    const colors = [
      'rgba(255, 201, 40, ', // Brand Yellow
      'rgba(56, 189, 248, ', // Cyber Light Blue
      'rgba(255, 255, 255, ', // Pure White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.2 + 1,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Mouse tracking for interactive tech particle attraction
    let mouse = { x: -1000, y: -1000, radius: 120 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let tick = 0;
    let isIntersecting = true;

    const render = () => {
      if (!isIntersecting) return;
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Connect particles within proximity
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 201, 40, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Occasional data packet pulse moving along connection lines
            if (dist > 40 && dist < 100 && (tick + i * 5) % 90 === 0) {
              const progress = ((tick * 1.5) % 60) / 60;
              const px = particles[i].x + (particles[j].x - particles[i].x) * progress;
              const py = particles[i].y + (particles[j].y - particles[i].y) * progress;
              ctx.beginPath();
              ctx.arc(px, py, 1.8, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 201, 40, 0.9)';
              ctx.shadowColor = 'rgba(255, 201, 40, 0.8)';
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      // Draw and move individual particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off canvas boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse gentle interaction
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouse.radius) {
          const force = (1 - mDist / mouse.radius) * 0.8;
          p.x += (mdx / mDist) * force;
          p.y += (mdy / mDist) * force;
        }

        // Pulsing glow
        const pulse = Math.sin(tick * p.pulseSpeed + p.pulseOffset) * 0.25;
        const currentAlpha = Math.max(0.1, p.baseAlpha + pulse);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${currentAlpha})`;
        ctx.shadowColor = 'rgba(255, 201, 40, 0.5)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Observer to pause canvas rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Dynamic Digital Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-65 pointer-events-auto"
      />

      {/* Cyber Digital Mesh Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />

      {/* Ambient Glowing Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18],
          x: [0, 20, 0],
          y: [0, -15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-brand-yellow/20 via-brand-navy-card/40 to-transparent rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, -25, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-brand-yellow/15 via-brand-yellow/5 to-transparent rounded-full blur-3xl"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-navy-card/30 rounded-full blur-3xl" />

      {/* Floating Technology & Digital Marketing Visual Chips (Hidden on small mobile screens to keep hero clean) */}
      
      {/* Chip 1: ROI & Growth (Top-Left) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.4 },
          x: { duration: 0.8, delay: 0.4 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }}
        className="hidden xl:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-navy-surface/80 border border-brand-yellow/30 shadow-xl shadow-brand-navy-dark/80 backdrop-blur-md absolute top-28 left-8"
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
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
        }}
        className="hidden xl:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-navy-surface/80 border border-white/15 shadow-xl shadow-brand-navy-dark/80 backdrop-blur-md absolute top-36 right-8"
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
          y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }
        }}
        className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-navy-surface/80 border border-white/10 shadow-xl shadow-brand-navy-dark/80 backdrop-blur-md absolute bottom-20 left-12"
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
          y: { duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }
        }}
        className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-navy-surface/80 border border-brand-yellow/30 shadow-xl shadow-brand-navy-dark/80 backdrop-blur-md absolute bottom-24 right-12"
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

