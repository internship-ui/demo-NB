import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers } from 'lucide-react';

// =========================================================================
// ACCURATE VECTOR LOGOS FOR ENTERPRISE TECH STACK
// =========================================================================
const TechLogos = {
  react: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-7 h-7">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  typescript: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7 rounded-lg overflow-hidden">
      <rect width="128" height="128" rx="16" fill="#3178C6" />
      <path
        d="M37.5 56.5h33v11h-11v43.5h-11V67.5h-11v-11zm36.5 35.5c4 5 9 8 16 8 6 0 10.5-3 10.5-8 0-5.5-4-7.5-12-11-11.5-5-16.5-10-16.5-18.5 0-10.5 8.5-18 21.5-18 8 0 15 2.5 19.5 7.5l-6.5 8c-3.5-3.5-8-5.5-13-5.5-6.5 0-10.5 3.5-10.5 7.5 0 4.5 3.5 6.5 11.5 10 12 5 17 9.5 17 19.5 0 11.5-9 19-23 19-10 0-18-3.5-23.5-9.5l6.5-8.5z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  javascript: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7 rounded-lg overflow-hidden">
      <rect width="128" height="128" rx="16" fill="#F7DF1E" />
      <path
        d="M74.5 100.5c3.5 2 7 3.5 11.5 3.5 6.5 0 10.5-3 10.5-8 0-5.5-4-7.5-12-11-11.5-5-16.5-10-16.5-18.5 0-10.5 8.5-18 21.5-18 8 0 15 2.5 19.5 7.5l-6.5 8c-3.5-3.5-8-5.5-13-5.5-6.5 0-10.5 3.5-10.5 7.5 0 4.5 3.5 6.5 11.5 10 12 5 17 9.5 17 19.5 0 11.5-9 19-23 19-10 0-18-3.5-23.5-9.5l6.5-8.5zm-38-1.5l8-5c2.5 4 4.5 7.5 9 7.5 4.5 0 7.5-2.5 7.5-9V56.5h11V92c0 10-6.5 17-18 17-8.5 0-14.5-4-17.5-10z"
        fill="#000000"
      />
    </svg>
  ),
  angular: () => (
    <svg viewBox="0 0 250 250" className="w-7 h-7">
      <polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" fill="#DD0031" />
      <polygon points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2" fill="#C3002F" />
      <path d="M125,52.1L66.8,182.6h21.7l11.7-29.2h49.4l11.7,29.2h21.7L125,52.1z M141.7,135.4H108.3L125,93.2L141.7,135.4z" fill="#FFFFFF" />
    </svg>
  ),
  nodejs: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path d="M64 4.5L11.5 34.8v60.5L64 125.5l52.5-30.2V34.8L64 4.5z" fill="#339933" />
      <path d="M64 16.2l42.2 24.3v48.7L64 113.5 21.8 89.2V40.5L64 16.2z" fill="#FFFFFF" />
      <path d="M64 32.5l28.1 16.2v32.5L64 97.5 35.9 81.2V48.7L64 32.5z" fill="#339933" />
    </svg>
  ),
  python: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path
        d="M63.5 7.5c-27.5 0-25.5 12-25.5 12l.05 12.5h26v3.5h-36.5s-17.5 2-17.5 25.5c0 23.5 15.5 22.5 15.5 22.5h9v-13c0-14.5 12.5-14 12.5-14h24.5s12 .5 12-12.5V19.5s1.5-12-20-12zm-11 7c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5z"
        fill="#3776AB"
      />
      <path
        d="M64.5 120.5c27.5 0 25.5-12 25.5-12l-.05-12.5h-26v-3.5h36.5s17.5-2 17.5-25.5c0-23.5-15.5-22.5-15.5-22.5h-9v13c0 14.5-12.5 14-12.5 14h-24.5s-12-.5-12 12.5v26.5s-1.5 12 20 12zm11-7c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
        fill="#FFD43B"
      />
    </svg>
  ),
  java: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path d="M48.5 98.5c18.5 2.5 35.5-1.5 44-5.5-5 3.5-16.5 6.5-27 7-15 .5-29-2-17-1.5z" fill="#E76F00" />
      <path d="M40.5 83c24.5 3.5 47-2 57-7-7 4.5-22 8.5-36 9-20 .5-38-2.5-21-2z" fill="#5382A1" />
      <path d="M64 5.5c-8 11.5-1 20 3.5 27 5.5 8 5.5 14.5-2 21-6-7.5-9.5-14.5-5-22 5.5-8.5 10-15.5 3.5-26z" fill="#E76F00" />
      <path d="M51 23c-6.5 9-.5 16 3 21.5 4 6.5 4 11.5-1.5 16.5-4.5-6-7-11.5-4-17.5 4-6.5 7.5-12 2.5-20.5z" fill="#5382A1" />
      <path d="M30 108c31 6.5 68 3 80-6-10 4-33 7.5-51 7-25-.5-45-4-29-1z" fill="#5382A1" />
    </svg>
  ),
  php: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <ellipse cx="64" cy="64" rx="60" ry="36" fill="#777BB4" />
      <path
        d="M37 50h14c6 0 9.5 2.5 9.5 7.5 0 6.5-5.5 10.5-13.5 10.5h-5l-4 15h-9l8-33zm9 11h3c3 0 5-1 5-3 0-1.5-1-2.5-3-2.5h-3l-2 5.5zm25-11h9l-2 8.5h.5c2-6 6.5-9 12.5-9 6.5 0 10 3.5 10 9.5 0 1.5-.5 3.5-.5 5.5l-4 18.5h-9l3.5-15c.5-1.5.5-3 .5-4 0-2.5-1.5-3.5-4-3.5-3.5 0-6.5 3-7.5 7.5l-3.5 15h-9l9-33zm38 0h14c6 0 9.5 2.5 9.5 7.5 0 6.5-5.5 10.5-13.5 10.5h-5l-4 15h-9l8-33zm9 11h3c3 0 5-1 5-3 0-1.5-1-2.5-3-2.5h-3l-2 5.5z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  aws: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7 rounded-lg overflow-hidden">
      <rect width="128" height="128" rx="16" fill="#232F3E" />
      <path
        d="M38.5 74.5c-4.5 0-9-1.5-12.5-4l3-4.5c2.5 2 6 3.5 9.5 3.5 4.5 0 7-2 7-5.5 0-8-19-3-19-15 0-6 4.5-11 12.5-11 4 0 7.5 1 10.5 3l-2.5 5c-2.5-1.5-5-2.5-8-2.5-4 0-6.5 2-6.5 5 0 7.5 19 3 19 14.5 0 6.5-5 11.5-13 11.5zm29-35.5h6.5l8 24.5 8-24.5h6.5l-11.5 34h-6l-11.5-34zm-42 48c26.5 13.5 61 7.5 76-4.5l-1.5-1.5c-14.5 11.5-47.5 17-73 4.5l-1.5 1.5z"
        fill="#FF9900"
      />
      <polygon points="101,84 94,80 97,88" fill="#FF9900" />
    </svg>
  ),
  azure: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path d="M22 96h48l24-42-36-34H22l26 40z" fill="#0089D6" />
      <path d="M70 96h36l-32-58-16 26z" fill="#005BA1" />
      <path d="M70 96L58 64l16-26 20 58z" fill="#0078D4" />
    </svg>
  ),
  docker: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <rect x="36" y="52" width="10" height="9" rx="1" fill="#2496ED" />
      <rect x="49" y="52" width="10" height="9" rx="1" fill="#2496ED" />
      <rect x="62" y="52" width="10" height="9" rx="1" fill="#2496ED" />
      <rect x="49" y="40" width="10" height="9" rx="1" fill="#2496ED" />
      <rect x="62" y="40" width="10" height="9" rx="1" fill="#2496ED" />
      <rect x="75" y="52" width="10" height="9" rx="1" fill="#2496ED" />
      <rect x="88" y="52" width="10" height="9" rx="1" fill="#2496ED" />
      <path
        d="M123.5 66.5c-2.5-1.5-7.5-1.5-11.5 0-1-6.5-6.5-11-13-11-1 0-2 .2-3 .5V64H22.5c-2.5 0-4 1.5-4 4 0 16 12 30 33 30 25 0 45-12.5 52-31.5 7 0 14-2.5 20-7.5v-2.5h0z"
        fill="#2496ED"
      />
    </svg>
  ),
  git: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path
        d="M120.5 57.5L70.5 7.5c-3.5-3.5-9.5-3.5-13 0L44 21l16.5 16.5c3.5-1 7.5 0 10.5 2.5 3 3 4 7 2.5 10.5l16 16c3.5-1.5 7.5-.5 10.5 2.5 4 4 4 10.5 0 14.5s-10.5 4-14.5 0c-3-3-4-7.5-2.5-11l-15-15v31.5c1 1.5 1.5 3 1.5 5 0 5.5-4.5 10-10 10s-10-4.5-10-10c0-3.5 2-6.5 5-8.5v-32c-3-1.5-5-4.5-5-8.5 0-2 .5-4 1.5-5.5L34 29.5 7.5 56c-3.5 3.5-3.5 9.5 0 13l50 50c3.5 3.5 9.5 3.5 13 0l50-50c3.5-3.5 3.5-9.5 0-11.5z"
        fill="#F05032"
      />
    </svg>
  ),
  mongodb: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path
        d="M63.5 7c-2 2-19 25.5-19 49.5 0 24 15.5 39 18 43 1.5 2.5 1 16.5 1 21.5h1c0-5-.5-19 1-21.5 2.5-4 18-19 18-43C83.5 32.5 65.5 9 63.5 7z"
        fill="#47A248"
      />
      <path
        d="M64 7v114c0-5-.5-19 1-21.5 2.5-4 18-19 18-43C83 32.5 66 9 64 7z"
        fill="#499D4A"
      />
    </svg>
  ),
  sql: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <ellipse cx="64" cy="28" rx="44" ry="16" fill="#00758F" />
      <path d="M20 28v24c0 9 20 16 44 16s44-7 44-16V28H20z" fill="#008EA8" />
      <path d="M20 52v24c0 9 20 16 44 16s44-7 44-16V52H20z" fill="#00A2BF" />
      <path d="M20 76v24c0 9 20 16 44 16s44-7 44-16V76H20z" fill="#00B8D9" />
    </svg>
  ),
  figma: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path d="M43 21h21v21H43c-6 0-11-5-11-10.5S37 21 43 21z" fill="#F24E1E" />
      <path d="M64 21h21c6 0 11 5 11 10.5S91 42 85 42H64V21z" fill="#FF7262" />
      <path d="M64 42h21c6 0 11 5 11 10.5S91 63 85 63H64V42z" fill="#1ABCFE" />
      <circle cx="74.5" cy="74.5" r="10.5" fill="#0ACF83" />
      <path d="M43 42h21v21H43c-6 0-11-5-11-10.5S37 42 43 42z" fill="#A259FF" />
      <path d="M43 63h21v21H43c-6 0-11-5-11-10.5S37 63 43 63z" fill="#F24E1E" />
    </svg>
  ),
};

// =========================================================================
// 15 TECHNOLOGIES WITH EXACT METADATA FROM USER IMAGE
// =========================================================================
const techData = [
  // 1. React JS
  {
    id: 'react',
    name: 'React JS',
    role: 'UI Framework',
    category: 'Frontend & Mobile',
    icon: TechLogos.react,
  },
  // 2. TypeScript
  {
    id: 'typescript',
    name: 'TypeScript',
    role: 'Type-Safe Web',
    category: 'Frontend & Mobile',
    icon: TechLogos.typescript,
  },
  // 3. JavaScript
  {
    id: 'javascript',
    name: 'JavaScript',
    role: 'ES6+ Dynamic',
    category: 'Frontend & Mobile',
    icon: TechLogos.javascript,
  },
  // 4. Angular
  {
    id: 'angular',
    name: 'Angular',
    role: 'SPA Platform',
    category: 'Frontend & Mobile',
    icon: TechLogos.angular,
  },
  // 5. Node.js
  {
    id: 'nodejs',
    name: 'Node.js',
    role: 'Runtime & APIs',
    category: 'Backend & APIs',
    icon: TechLogos.nodejs,
  },
  // 6. Python
  {
    id: 'python',
    name: 'Python',
    role: 'AI & Backend',
    category: 'Backend & APIs',
    icon: TechLogos.python,
  },
  // 7. Java
  {
    id: 'java',
    name: 'Java',
    role: 'Enterprise Core',
    category: 'Backend & APIs',
    icon: TechLogos.java,
  },
  // 8. PHP
  {
    id: 'php',
    name: 'PHP',
    role: 'Web Services',
    category: 'Backend & APIs',
    icon: TechLogos.php,
  },
  // 9. AWS
  {
    id: 'aws',
    name: 'AWS',
    role: 'Cloud Infra',
    category: 'Cloud & DevOps',
    icon: TechLogos.aws,
  },
  // 10. Azure
  {
    id: 'azure',
    name: 'Azure',
    role: 'Cloud Solutions',
    category: 'Cloud & DevOps',
    icon: TechLogos.azure,
  },
  // 11. Docker
  {
    id: 'docker',
    name: 'Docker',
    role: 'Containers',
    category: 'Cloud & DevOps',
    icon: TechLogos.docker,
  },
  // 12. Git
  {
    id: 'git',
    name: 'Git',
    role: 'Version Control',
    category: 'Cloud & DevOps',
    icon: TechLogos.git,
  },
  // 13. MongoDB
  {
    id: 'mongodb',
    name: 'MongoDB',
    role: 'NoSQL Database',
    category: 'Databases & UI',
    icon: TechLogos.mongodb,
  },
  // 14. SQL
  {
    id: 'sql',
    name: 'SQL',
    role: 'Relational Data',
    category: 'Databases & UI',
    icon: TechLogos.sql,
  },
  // 15. Figma
  {
    id: 'figma',
    name: 'Figma',
    role: 'UI/UX Systems',
    category: 'Databases & UI',
    icon: TechLogos.figma,
  },
];

const categories = [
  'All Technologies',
  'Frontend & Mobile',
  'Backend & APIs',
  'Cloud & DevOps',
  'Databases & UI',
];

export default function TechnologiesWeUse() {
  const [selectedCategory, setSelectedCategory] = useState('All Technologies');

  const filteredTech = useMemo(() => {
    if (selectedCategory === 'All Technologies') return techData;
    return techData.filter((tech) => tech.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden bg-brand-navy">
      {/* Background Cyber Accents */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-yellow"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enterprise Tech Stack</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-3"
        >
          Technologies <span className="text-brand-yellow">We Use</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal mb-10"
        >
          We leverage modern and powerful stacks to build scalable products.
        </motion.p>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-brand-yellow text-brand-navy shadow-glow-yellow font-bold scale-105 border border-brand-yellow'
                    : 'bg-brand-navy-surface/80 border border-white/10 text-slate-300 hover:text-white hover:border-brand-yellow/40 hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Technology Cards Grid */}
        <motion.div
          layout
          className="flex flex-wrap justify-center gap-3 sm:gap-3.5 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => {
              const LogoComponent = tech.icon;
              return (
                <motion.div
                  key={tech.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="group relative bg-brand-navy-surface border border-white/10 hover:border-brand-yellow/60 rounded-2xl p-3 sm:p-3.5 shadow-md hover:shadow-[0_12px_28px_rgba(7,27,58,0.4),0_0_18px_rgba(255,201,40,0.18)] transition-all duration-300 flex items-center gap-2.5 text-left cursor-default overflow-hidden w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(16.666%-0.75rem)] min-w-[155px] max-w-[178px]"
                >
                  {/* Subtle hover gradient sheen */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-yellow/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Logo Container */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-navy-card/90 border border-white/10 flex items-center justify-center p-1.5 flex-shrink-0 group-hover:scale-110 group-hover:border-brand-yellow/40 transition-all duration-300">
                    <LogoComponent />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-[13px] font-bold text-white font-heading group-hover:text-brand-yellow transition-colors truncate">
                      {tech.name}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors truncate mt-0.5">
                      {tech.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
