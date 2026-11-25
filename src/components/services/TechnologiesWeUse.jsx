import React, { useState, useMemo } from 'react';
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
      <path
        d="M117 62c-2.5-1.5-8-1.5-12.5.5-2.5-9-10-14.5-10-14.5s-4.5 7-1 15c-3 2-8 2-12 1.5H11v14c0 18.5 15 33.5 33.5 33.5 25.5 0 46.5-14 53-33 7.5 0 14-4 19.5-17z"
        fill="#2496ED"
      />
    </svg>
  ),
  kubernetes: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path
        d="M64 12l45 26v52l-45 26-45-26V38l45-26z"
        fill="#326CE5"
      />
      <circle cx="64" cy="64" r="14" fill="#FFFFFF" />
      <path d="M64 42v10m0 24v10m-16-22l8.7 5m14.6 8.4l8.7 5m-32 0l8.7-5m14.6-8.4l8.7-5" stroke="#326CE5" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  mongodb: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path
        d="M64 6c-2 2-24 24-24 58 0 28 17 48 24 58 7-10 24-30 24-58 0-34-22-56-24-58z"
        fill="#47A248"
      />
      <path d="M64 6v116c1-2 24-24 24-58 0-34-22-56-24-58z" fill="#499D4A" />
      <path d="M64 6v116c-1-2-24-24-24-58 0-34 22-56 24-58z" fill="#58AA50" />
      <path d="M64 88c-1 0-8-5-8-12 0-9 8-15 8-15s8 6 8 15c0 7-7 12-8 12z" fill="#FFFFFF" />
    </svg>
  ),
  sql: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <ellipse cx="64" cy="28" rx="44" ry="16" fill="#00758F" />
      <path d="M20 28v36c0 8.8 19.7 16 44 16s44-7.2 44-16V28H20z" fill="#F29111" />
      <path d="M20 64v36c0 8.8 19.7 16 44 16s44-7.2 44-16V64H20z" fill="#00758F" />
    </svg>
  ),
  figma: () => (
    <svg viewBox="0 0 128 128" className="w-7 h-7">
      <path d="M43 124c11.6 0 21-9.4 21-21V82H43c-11.6 0-21 9.4-21 21s9.4 21 21 21z" fill="#0ACF83" />
      <path d="M22 61c0-11.6 9.4-21 21-21h21v42H43c-11.6 0-21-9.4-21-21z" fill="#A259FF" />
      <path d="M22 19c0-11.6 9.4-21 21-21h21v42H43C31.4 40 22 30.6 22 19z" fill="#F24E1E" />
      <path d="M64 -2h21c11.6 0 21 9.4 21 21s-9.4 21-21 21H64V-2z" fill="#FF7262" />
      <circle cx="85" cy="61" r="21" fill="#1ABCFE" />
    </svg>
  ),
};

const techData = [
  { id: 'react', name: 'React.js', role: 'Frontend & SPAs', category: 'Frontend & Mobile', icon: TechLogos.react },
  { id: 'typescript', name: 'TypeScript', role: 'Strict Typing', category: 'Frontend & Mobile', icon: TechLogos.typescript },
  { id: 'javascript', name: 'JavaScript', role: 'Dynamic Engine', category: 'Frontend & Mobile', icon: TechLogos.javascript },
  { id: 'angular', name: 'Angular', role: 'Enterprise UI', category: 'Frontend & Mobile', icon: TechLogos.angular },
  { id: 'nodejs', name: 'Node.js', role: 'High-Concurrency APIs', category: 'Backend & APIs', icon: TechLogos.nodejs },
  { id: 'python', name: 'Python', role: 'AI & Data Engineering', category: 'Backend & APIs', icon: TechLogos.python },
  { id: 'java', name: 'Java', role: 'Robust Microservices', category: 'Backend & APIs', icon: TechLogos.java },
  { id: 'php', name: 'PHP', role: 'Server-Side Web', category: 'Backend & APIs', icon: TechLogos.php },
  { id: 'aws', name: 'AWS Cloud', role: 'Hyperscale Cloud', category: 'Cloud & DevOps', icon: TechLogos.aws },
  { id: 'azure', name: 'Microsoft Azure', role: 'Enterprise Cloud', category: 'Cloud & DevOps', icon: TechLogos.azure },
  { id: 'docker', name: 'Docker', role: 'Containerization', category: 'Cloud & DevOps', icon: TechLogos.docker },
  { id: 'kubernetes', name: 'Kubernetes', role: 'Cluster Orchestration', category: 'Cloud & DevOps', icon: TechLogos.kubernetes },
  { id: 'mongodb', name: 'MongoDB', role: 'Document NoSQL', category: 'Databases & UI', icon: TechLogos.mongodb },
  { id: 'sql', name: 'SQL', role: 'Relational Data', category: 'Databases & UI', icon: TechLogos.sql },
  { id: 'figma', name: 'Figma', role: 'UI/UX Systems', category: 'Databases & UI', icon: TechLogos.figma },
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-brand-silver/40 relative overflow-hidden bg-gradient-to-b from-brand-light to-white">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-royal/10 border border-brand-royal/25 text-brand-royal text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enterprise Tech Stack</span>
        </div>

        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-heading tracking-tight mb-3"
        >
          Technologies <span className="text-brand-royal">We Use</span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal mb-10"
        >
          We leverage modern and powerful stacks to build scalable products.
        </p>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-brand-royal text-white font-bold shadow-md border border-brand-royal scale-105'
                    : 'bg-white border border-brand-silver/60 text-slate-700 hover:text-brand-royal hover:border-brand-royal/40 hover:bg-brand-light'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Technology Cards Grid */}
        <div
          className="flex flex-wrap justify-center gap-3 sm:gap-3.5 max-w-6xl mx-auto"
        >
          {filteredTech.map((tech) => {
            const LogoComponent = tech.icon;
            return (
              <div
                key={tech.id}
                className="group relative bg-white border border-brand-silver/60 hover:border-brand-royal/50 rounded-2xl p-3 sm:p-3.5 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2.5 text-left cursor-default overflow-hidden w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(16.666%-0.75rem)] min-w-[155px] max-w-[178px]"
              >
                {/* Logo Container */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-light border border-brand-silver/40 flex items-center justify-center p-1.5 flex-shrink-0 group-hover:scale-105 group-hover:border-brand-royal/40 transition-all duration-200">
                  <LogoComponent />
                </div>

                {/* Title & Subtitle */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-[13px] font-bold text-brand-navy font-heading group-hover:text-brand-royal transition-colors truncate">
                    {tech.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 transition-colors truncate mt-0.5">
                    {tech.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
