import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Star,
  Award,
  Users,
  Cpu,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Code2,
  Globe,
  Smartphone,
  Palette,
  Cloud,
  Layers,
  Zap,
  Eye,
  Terminal,
  Activity,
  Compass
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import AnimatedCounter from '../components/common/AnimatedCounter';
import Modal from '../components/common/Modal';
import MarqueeBanner from '../components/common/MarqueeBanner';
import HomeDigitalGridBackground from '../components/home/HomeDigitalGridBackground';
import ServiceCard from '../components/common/ServiceCard';
import { servicesData } from '../data/servicesData';
import { portfolioData } from '../data/portfolioData';
import { testimonialsData } from '../data/testimonialsData';
import { companyDetails } from '../data/companyData';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [activePortfolioFilter, setActivePortfolioFilter] = useState('All');
  const navigate = useNavigate();

  // Portfolio categories
  const categories = ['All', 'Web Application', 'Mobile Application', 'Cloud & AI Platform', 'UI/UX Design'];

  const filteredProjects = activePortfolioFilter === 'All'
    ? portfolioData.slice(0, 6)
    : portfolioData.filter((p) => p.category.toLowerCase().includes(activePortfolioFilter.toLowerCase().replace(' application', '').replace(' platform', ''))).slice(0, 6);

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <div className="relative pt-20 overflow-hidden bg-brand-light text-slate-700">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[92vh] flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-brand-light to-white">
        {/* Subtle geometric digital background */}
        <HomeDigitalGridBackground />

        <div className="relative max-w-7xl mx-auto w-full z-10">
          {/* Editorial Metadata Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-brand-silver/50 mb-8 sm:mb-12 text-xs font-mono"
          >
            <div className="flex items-center gap-2 text-brand-navy">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold tracking-wider uppercase">SIGNAL: ACTIVE ARCHITECTURE</span>
              <span className="text-brand-steel">·</span>
              <span className="text-slate-500 hidden sm:inline">MYSURU 12.2958° N, 76.6394° E</span>
            </div>
            <div className="flex items-center gap-2 text-brand-royal font-semibold tracking-wider uppercase text-[11px]">
              <span>[00 // SOFTWARE ENGINEERING LAB]</span>
            </div>
          </motion.div>

          {/* Main Hero Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Column: Bold Headline & Editorial Copy */}
            <div className="lg:col-span-8 space-y-6">
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-royal/30 text-brand-royal text-xs font-bold uppercase tracking-widest shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-brand-royal" />
                  <span>Digital Solutions That Drive Results</span>
                </span>
              </motion.div>

              {/* High-Impact Editorial Heading */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-brand-navy font-heading leading-[1.02] uppercase"
              >
                Smarter Solutions <br className="hidden sm:inline" />
                For{' '}
                <span className="text-brand-royal">
                  Better Future
                </span>
              </motion.h1>

              {/* Lede Paragraph */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed"
              >
                Navabharath Technologies is a <strong className="text-brand-navy font-semibold">Mysuru-based Software Company</strong> helping businesses adapt, grow, and stay secure in a digital-first world. We design practical IT solutions that simplify operations and support long-term growth. From custom web development and mobile applications to AI-driven automation and strategic digital marketing, we provide end-to-end services tailored to your unique goals.
              </motion.p>

              {/* Strong Editorial Call-to-Action Group */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <Link
                  to="/services"
                  className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-navy via-brand-navy to-brand-royal text-white hover:brightness-110 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Explore Practice Areas</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white hover:bg-slate-50 text-brand-navy border border-brand-silver/80 hover:border-brand-royal/50 shadow-sm transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4 text-brand-royal transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/portfolio"
                  className="px-4 py-4 font-semibold text-xs text-slate-600 hover:text-brand-royal transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Case Studies</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-royal" />
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Architectural Visual Card & Live Metrics */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-4 flex flex-col gap-4"
            >
              {/* Feature Pill Card */}
              <div className="p-6 rounded-3xl bg-white border border-brand-silver/60 shadow-xl shadow-brand-navy/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-royal/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-steel uppercase tracking-wider">
                    <Terminal className="w-4 h-4 text-brand-royal" />
                    <span>SYSTEM ARCHITECTURE</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-royal/10 text-brand-royal">
                    PROD v2.4
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-brand-navy font-heading mb-2">
                  Enterprise-Grade Reliability
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">
                  Engineered with zero compromise on cybersecurity, code hygiene, and microservice resilience.
                </p>

                {/* Tech Chips */}
                <div className="space-y-2 pt-2 border-t border-brand-silver/30">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Core Stack</span>
                    <span className="font-mono text-brand-navy font-bold">React · Node · Cloud</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Client Satisfaction</span>
                    <span className="font-mono text-brand-royal font-bold">99% Verified Index</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">IP Ownership</span>
                    <span className="font-mono text-emerald-600 font-bold">100% Client Transfer</span>
                  </div>
                </div>
              </div>

              {/* Quick Tech Badge Bar */}
              <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-brand-silver/50 shadow-sm flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  DEPLOYMENT LAB
                </div>
                <div className="flex items-center gap-1.5">
                  {['AWS', 'GCP', 'Docker', 'K8s'].map((pill) => (
                    <span
                      key={pill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-light text-brand-navy border border-brand-silver/60"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Editorial Technology Stack Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 sm:mt-16 pt-8 border-t border-brand-silver/40 flex flex-wrap items-center justify-between gap-4 text-xs"
          >
            <div className="flex items-center gap-2 text-brand-navy font-bold font-heading uppercase tracking-wider">
              <Code2 className="w-4 h-4 text-brand-royal" />
              <span>Full-Stack Engineering Competencies:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {['React & Next.js', 'Node.js & Go', 'React Native', 'AWS Cloud Architecture', 'Kubernetes', 'Cybersecurity & QA'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-white border border-brand-silver/60 text-slate-700 font-mono text-[11px] shadow-2xs hover:border-brand-royal/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== INFINITE HORIZONTAL MARQUEE ===================== */}
      <MarqueeBanner />

      {/* ===================== SECTION 01: THE VISION & ABOUT ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Asymmetric Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (Sticky Editorial Statement) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-brand-royal tracking-widest uppercase">
                <span>[01 // THE VISION]</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-heading tracking-tight leading-[1.12]">
                We do not just write code. We architect <span className="text-brand-royal">digital engines</span> that define industry benchmarks.
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Partnering with enterprises, growing mid-market leaders, and high-growth ventures to engineer digital software products, automate critical bottlenecks, and build resilient modern infrastructures.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-light hover:bg-brand-royal text-brand-navy hover:text-white font-bold text-xs uppercase tracking-wider border border-brand-silver/60 hover:border-brand-royal transition-all group"
                >
                  <span>Explore Company Journey</span>
                  <ArrowRight className="w-4 h-4 text-brand-royal group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>

            {/* Right Column: Values & CEO Message */}
            <div className="lg:col-span-7 space-y-8">
              {/* CEO Statement Card */}
              <div className="p-8 rounded-3xl bg-brand-light border border-brand-silver/50 shadow-sm relative overflow-hidden">
                <div className="text-xs font-mono font-bold text-brand-royal uppercase tracking-wider mb-3">
                  LEADERSHIP COMMITMENT
                </div>
                <blockquote className="text-base sm:text-lg text-brand-navy font-semibold leading-relaxed mb-6 font-heading">
                  "{companyDetails.mission}"
                </blockquote>
                <div className="flex items-center justify-between pt-4 border-t border-brand-silver/40">
                  <div>
                    <div className="text-sm font-bold text-brand-navy">Executive Leadership</div>
                    <div className="text-xs text-slate-500">Navabharath Technologies · Mysuru</div>
                  </div>
                  <span className="font-mono text-xs text-brand-steel font-bold">[2020 — PRESENT]</span>
                </div>
              </div>

              {/* 4 Core Pillars as Numbered Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companyDetails.values.map((val, idx) => (
                  <motion.div
                    key={val.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="p-6 rounded-2xl bg-white border border-brand-silver/50 hover:border-brand-royal/40 shadow-2xs hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-extrabold text-brand-steel/50 group-hover:text-brand-royal transition-colors">
                        /0{idx + 1}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-brand-royal/10 text-brand-royal flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-brand-navy font-heading mb-1.5 group-hover:text-brand-royal transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 02: WHAT WE DELIVER (SERVICES) ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-brand-light border-t border-brand-silver/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            number="02 // CORE PRACTICES"
            badge="Full-Stack Capabilities"
            title="Engineered for"
            titleHighlight="Scalability & Precision"
            description="From single-page web platforms to distributed cloud backends, we deliver end-to-end technological excellence across the entire software development lifecycle."
          />

          {/* Creative Numbered Service Rows Inspired by Alpha Groups */}
          <div className="space-y-4">
            {servicesData.slice(0, 6).map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-brand-silver/50 hover:border-brand-royal/40 transition-all duration-300 shadow-2xs hover:shadow-lg group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left: Number & Main Info */}
                  <div className="lg:col-span-5 flex items-start gap-4">
                    <span className="font-mono text-lg sm:text-xl font-extrabold text-brand-steel/40 group-hover:text-brand-royal transition-colors pt-1">
                      S/0{idx + 1}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading group-hover:text-brand-royal transition-colors mb-1.5">
                        {service.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Key Features / Tags */}
                  <div className="lg:col-span-4">
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-brand-light text-slate-700 border border-brand-silver/50 group-hover:border-brand-royal/20 transition-colors"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Metric & Action Link */}
                  <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-mono font-bold text-brand-navy">
                        {service.stats.value}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {service.stats.label}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold text-brand-royal hover:bg-brand-royal/10 transition-colors"
                      >
                        Details
                      </button>
                      <Link
                        to={`/services/${service.id}`}
                        className="w-10 h-10 rounded-xl bg-brand-royal/10 group-hover:bg-brand-royal text-brand-royal group-hover:text-white flex items-center justify-center transition-all shadow-2xs group-hover:scale-105"
                        aria-label={`Open ${service.title} details`}
                      >
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white hover:bg-brand-light text-brand-navy border border-brand-silver/80 hover:border-brand-royal shadow-sm transition-all"
            >
              <span>Explore All 7 Specialized Practices</span>
              <ArrowRight className="w-4 h-4 text-brand-royal" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 03: SELECTED WORKS (PORTFOLIO) ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-silver/40 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              number="03 // SELECTED WORKS"
              badge="Case Studies"
              title="Proven Results Across"
              titleHighlight="Global Industries"
              description="Explore how our tailored digital platforms and cloud architectures solve complex business challenges and drive operational efficiency."
              align="left"
            />

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 pb-6 md:pb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivePortfolioFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activePortfolioFilter === cat
                      ? 'bg-brand-royal text-white shadow-sm'
                      : 'bg-brand-light text-slate-600 hover:text-brand-navy hover:bg-slate-100 border border-brand-silver/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Agency Image-Based Project Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => setSelectedProject(project)}
                className="rounded-3xl bg-white border border-brand-silver/60 overflow-hidden hover:border-brand-royal/50 transition-all duration-300 group flex flex-col justify-between hover:shadow-xl cursor-pointer"
              >
                <div className="relative h-52 sm:h-56 overflow-hidden bg-brand-light">
                  <img
                    src={project.bannerImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-80" />

                  {/* Project Index Overlay */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-white/90 backdrop-blur-sm text-brand-navy font-mono text-xs font-extrabold shadow-sm">
                    /0{idx + 1}
                  </div>

                  {/* Client Logo */}
                  <div className="absolute -bottom-4 left-6 w-12 h-12 rounded-xl bg-white p-1.5 shadow-md border-2 border-brand-silver/50 flex items-center justify-center overflow-hidden z-10 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={project.logoImage}
                      alt={`${project.title} logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Impact Metric Floating Badge */}
                  <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-brand-navy/90 text-white font-mono text-[11px] font-bold border border-white/20">
                    {project.clientDomain}
                  </div>
                </div>

                <div className="pt-8 pb-6 px-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-brand-royal uppercase tracking-wider mb-1">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-royal transition-colors font-heading leading-snug">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-brand-light text-slate-700 border border-brand-silver/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-6">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-silver/30 flex items-center justify-between text-xs font-bold text-brand-navy group-hover:text-brand-royal transition-colors">
                    <span>Explore Case Blueprint</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-royal text-white hover:bg-brand-navy shadow-md transition-all"
            >
              <span>Browse Full Project Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 04: STATS DATA WALL ===================== */}
      <section className="relative py-20 bg-gradient-to-r from-brand-navy via-[#1B3E73] to-brand-navy border-y border-brand-steel/30 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold text-brand-silver uppercase tracking-widest block mb-2">
              [04 // PERFORMANCE METRICS]
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Engineering Velocity In Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {companyDetails.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center relative overflow-hidden group hover:border-brand-silver/40 transition-colors"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 font-heading">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>
                <p className="text-xs sm:text-sm font-medium text-brand-silver tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 05: CLIENT ENDORSEMENTS ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-brand-light relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            number="05 // ACCREDITATION"
            badge="Client Endorsements"
            title="Trusted By Leaders"
            titleHighlight="Across Sectors"
            description="Discover how our engineering solutions empower executive leaders to meet demanding deadlines and exceed operational metrics."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonialsData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-brand-silver/50 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-[#B69A63]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B69A63] text-[#B69A63]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-silver/40">
                  <div className="text-[11px] font-bold text-brand-royal uppercase tracking-wider mb-2">
                    {item.metric}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.clientName}
                      className="w-9 h-9 rounded-full object-cover border border-brand-silver/60"
                    />
                    <div>
                      <div className="text-xs font-bold text-brand-navy">{item.clientName}</div>
                      <div className="text-[10px] text-slate-500">{item.role}, {item.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE BANNER (DARK CONTRAST) ===================== */}
      <MarqueeBanner isDark={true} />

      {/* ===================== SECTION 06: CALL TO ACTION ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-navy via-[#1B3E73] to-brand-navy border border-brand-steel/40 p-8 sm:p-14 lg:p-16 text-center relative overflow-hidden shadow-2xl text-white">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-royal/20 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-brand-silver uppercase tracking-widest mb-4">
            <span>[06 // INITIATE DIALOGUE]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 font-heading tracking-tight leading-tight">
            Ready to Accelerate Your <span className="text-brand-silver">Digital Transformation?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-brand-silver max-w-2xl mx-auto leading-relaxed mb-8">
            Speak directly with our senior technology architects to discuss your technical challenges, project scope, and receive a transparent roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-brand-navy hover:bg-slate-100 shadow-md hover:shadow-lg transition-all"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-all"
            >
              Review Service Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Project Case Study Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          subtitle={`${selectedProject.category} | ${selectedProject.clientDomain}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6 text-slate-700 text-sm">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-xl border border-brand-silver/50"
            />

            <div>
              <h4 className="text-brand-navy font-bold text-base mb-1">Project Overview</h4>
              <p className="leading-relaxed text-slate-600">{selectedProject.fullDesc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-brand-light border border-brand-silver/50">
                <h5 className="text-brand-royal font-bold text-xs uppercase tracking-wider mb-2">
                  Technical Challenge
                </h5>
                <p className="text-xs leading-relaxed text-slate-600">{selectedProject.challenge}</p>
              </div>

              <div className="p-4 rounded-xl bg-brand-light border border-brand-silver/50">
                <h5 className="text-brand-royal font-bold text-xs uppercase tracking-wider mb-2">
                  Navabharath Solution
                </h5>
                <p className="text-xs leading-relaxed text-slate-600">{selectedProject.solution}</p>
              </div>
            </div>

            <div>
              <h4 className="text-brand-navy font-bold text-sm mb-2">Measurable Outcomes</h4>
              <ul className="space-y-2">
                {selectedProject.results.map((res, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-brand-silver/40 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-royal/10 text-brand-royal border border-brand-royal/20">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to={`/contact?service=${encodeURIComponent(selectedProject.title)}`}
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy transition-colors cursor-pointer shadow-sm"
              >
                Inquire For Similar Build
              </Link>
            </div>
          </div>
        </Modal>
      )}

      {/* Service Details Modal */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
          subtitle={selectedService.tagline}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-sm text-slate-700">
            <p className="leading-relaxed text-slate-600">{selectedService.fullDesc}</p>

            <div>
              <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
                Key Deliverables &amp; Architectural Standards
              </h4>
              <ul className="space-y-2">
                {selectedService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-2">
                Primary Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-brand-light border border-brand-silver/50 text-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-silver/40 flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-royal">
                {selectedService.stats.label}: {selectedService.stats.value}
              </span>
              <Link
                to={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy transition-colors cursor-pointer shadow-sm"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
