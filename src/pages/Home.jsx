import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Users,
  Cpu,
  ExternalLink,
  ChevronLeft,
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
import MagneticButton from '../components/common/MagneticButton';
import { servicesData } from '../data/servicesData';
import { companyDetails } from '../data/companyData';
import { getAssetUrl } from '../utils/assetPath';

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const navigate = useNavigate();

  const handleNextService = () => {
    if (currentServiceIndex < servicesData.length - 1) {
      setSlideDirection(1);
      setCurrentServiceIndex((prev) => prev + 1);
    }
  };

  const handlePrevService = () => {
    if (currentServiceIndex > 0) {
      setSlideDirection(-1);
      setCurrentServiceIndex((prev) => prev - 1);
    }
  };

  const serviceSlideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 }
      }
    })
  };

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
              <span className="inline-block w-2 h-2 rounded-full bg-brand-royal animate-pulse shadow-[0_0_8px_rgba(35,79,145,0.7)]" />
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
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-royal/30 text-brand-royal text-xs font-bold uppercase tracking-widest shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-brand-royal" />
                  <span>Digital Solutions That Drive Results</span>
                </span>
              </div>

              {/* High-Impact Animated Editorial Heading */}
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 1 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.1
                    }
                  }
                }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-brand-navy font-heading leading-[1.02] uppercase select-none"
              >
                {/* Sentence 1: SMARTER SOLUTIONS */}
                <div className="overflow-hidden flex flex-wrap gap-x-3 sm:gap-x-5 py-0.5">
                  <motion.span
                    variants={{
                      hidden: { y: '105%', opacity: 0, rotate: -2 },
                      visible: {
                        y: '0%',
                        opacity: 1,
                        rotate: 0,
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                    className="hero-word"
                  >
                    Smarter
                  </motion.span>
                  <motion.span
                    variants={{
                      hidden: { y: '105%', opacity: 0, rotate: -2 },
                      visible: {
                        y: '0%',
                        opacity: 1,
                        rotate: 0,
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                    className="hero-word"
                  >
                    Solutions
                  </motion.span>
                </div>

                {/* Sentence 2: FOR BETTER FUTURE */}
                <div className="overflow-hidden flex flex-wrap gap-x-3 sm:gap-x-5 items-center py-0.5">
                  <motion.span
                    variants={{
                      hidden: { y: '105%', opacity: 0, rotate: -2 },
                      visible: {
                        y: '0%',
                        opacity: 1,
                        rotate: 0,
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                    className="hero-word"
                  >
                    For
                  </motion.span>

                  <motion.span
                    variants={{
                      hidden: { y: '105%', opacity: 0, rotate: -2 },
                      visible: {
                        y: '0%',
                        opacity: 1,
                        rotate: 0,
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                    className="hero-word animate-hero-gradient font-black"
                  >
                    Better
                  </motion.span>

                  <motion.span
                    variants={{
                      hidden: { y: '105%', opacity: 0, rotate: -2 },
                      visible: {
                        y: '0%',
                        opacity: 1,
                        rotate: 0,
                        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                    className="hero-word animate-hero-gradient font-black"
                  >
                    Future
                  </motion.span>
                </div>

                {/* Dynamic Royal Blue Accent Line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="h-1 sm:h-1.5 w-40 sm:w-64 bg-gradient-to-r from-brand-royal via-brand-steel to-transparent rounded-full origin-left mt-3"
                />
              </motion.h1>

              {/* Lede Paragraph - Always 100% Visible */}
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed font-normal">
                Navabharath Technologies is a <strong className="text-brand-navy font-semibold">Mysuru-based Software Company</strong> helping businesses adapt, grow, and stay secure in a digital-first world. We design practical IT solutions that simplify operations and support long-term growth. From custom web development and mobile applications to AI-driven automation and strategic digital marketing, we provide end-to-end services tailored to your unique goals.
              </p>

              {/* Strong Editorial Call-to-Action Group - Always 100% Visible */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <MagneticButton strength={0.15}>
                  <Link
                    to="/services"
                    className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-navy via-brand-navy to-brand-royal text-white hover:brightness-110 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <span>Explore Practice Areas</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.15}>
                  <Link
                    to="/contact"
                    className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white hover:bg-slate-50 text-brand-navy border border-brand-silver/80 hover:border-brand-royal/50 shadow-sm transition-all flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <span>Schedule Consultation</span>
                    <ArrowRight className="w-4 h-4 text-brand-royal transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>

                <Link
                  to="/portfolio"
                  className="px-4 py-4 font-semibold text-xs text-slate-600 hover:text-brand-royal transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Case Studies</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-royal" />
                </Link>
              </div>
            </div>

            {/* Right Column: Architectural Visual Card & Live Metrics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-4 flex flex-col gap-4"
            >
              {/* Feature Pill Card with subtle floating motion */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="p-6 rounded-3xl bg-white border border-brand-silver/60 shadow-xl shadow-brand-navy/5 relative overflow-hidden group"
              >
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
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Engineered with zero compromise on cybersecurity, code hygiene, and microservice resilience.
                </p>

                {/* Technology Architecture Visual Preview */}
                <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-4 border border-brand-silver/60 bg-gradient-to-br from-[#101F3C] to-[#1E3E70] shadow-md group/img">
                  <img
                    src={getAssetUrl('/assets/system-architecture-tech.jpg')}
                    alt="Enterprise System Architecture & Technology Platform"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101F3C]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#101F3C]/85 backdrop-blur-md text-[10px] font-mono text-white border border-white/20 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-royal animate-pulse shadow-[0_0_8px_#234F91]" />
                      <span>CLOUD RUNTIME ACTIVE</span>
                    </div>
                    <span className="text-[10px] font-mono text-brand-silver/90 bg-[#101F3C]/75 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 hidden sm:inline-block">
                      ISO/IEC 27001
                    </span>
                  </div>
                </div>

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
                    <span className="font-mono text-brand-royal font-bold">100% Client Transfer</span>
                  </div>
                </div>
              </motion.div>

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
          {/* Top Row: Asymmetric Split Layout (Vision on Left, Leadership on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Left Column: Vision Statement & Action */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-brand-royal tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-brand-royal" />
                  <span>[01 // THE VISION]</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[36px] xl:text-[40px] font-extrabold text-brand-navy font-heading tracking-tight leading-[1.25]">
                  We do not just write code.<br className="hidden sm:inline" />
                  We architect <span className="text-brand-royal">digital engines</span><br className="hidden sm:inline" />
                  that define industry benchmarks.
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Partnering with enterprises, growing mid-market leaders, and high-growth ventures to engineer digital software products, automate critical bottlenecks, and build resilient modern infrastructures.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-light hover:bg-brand-royal text-brand-navy hover:text-white font-bold text-xs uppercase tracking-wider border border-brand-silver/60 hover:border-brand-royal transition-all group shadow-xs hover:shadow-md"
                >
                  <span>Explore Company Journey</span>
                  <ArrowRight className="w-4 h-4 text-brand-royal group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>

            {/* Right Column: Leadership Commitment */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              {/* CEO Statement Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-brand-light border border-brand-silver/50 shadow-sm relative overflow-hidden h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-brand-royal uppercase tracking-wider mb-3">
                    LEADERSHIP COMMITMENT
                  </div>
                  <blockquote className="text-base sm:text-lg text-brand-navy font-semibold leading-relaxed mb-6 font-heading">
                    "{companyDetails.mission}"
                  </blockquote>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-brand-silver/40">
                  <div>
                    <div className="text-sm font-bold text-brand-navy">Executive Leadership</div>
                    <div className="text-xs text-slate-500">Navabharath Technologies · Mysuru</div>
                  </div>
                  <span className="font-mono text-xs text-brand-steel font-bold">[2020 — PRESENT]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: All 4 Core Pillars in the EXACT SAME LINE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
            {companyDetails.values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-brand-silver/50 hover:border-brand-royal/40 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
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
                </div>
              </motion.div>
            ))}
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

          {/* Modern Vertical Card Carousel with Left and Right Navigation Arrows */}
          <div className="relative mt-8 sm:mt-10">
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrevService}
                disabled={currentServiceIndex === 0}
                aria-label="Previous service card"
                className={`shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-200 border ${
                  currentServiceIndex === 0
                    ? 'opacity-30 cursor-not-allowed border-brand-silver/40 text-slate-400 bg-white/50'
                    : 'bg-white hover:bg-brand-royal text-brand-navy hover:text-white border-brand-silver/60 hover:border-brand-royal shadow-xs hover:shadow-md hover:scale-105 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Single Service Card Container */}
              <div className="flex-1 overflow-hidden min-w-0 py-2">
                <AnimatePresence mode="wait" custom={slideDirection}>
                  {(() => {
                    const service = servicesData[currentServiceIndex];
                    return (
                      <motion.div
                        key={service.id}
                        custom={slideDirection}
                        variants={serviceSlideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="p-6 sm:p-8 rounded-2xl bg-white border border-brand-silver/50 hover:border-brand-royal/40 transition-all duration-300 shadow-2xs hover:shadow-lg group hover:-translate-y-0.5"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                          {/* Left: Number & Main Info */}
                          <div className="lg:col-span-5 flex items-start gap-4">
                            <span className="font-mono text-lg sm:text-xl font-extrabold text-brand-steel/40 group-hover:text-brand-royal transition-colors pt-1">
                              S/0{currentServiceIndex + 1}
                            </span>
                            <div>
                              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy font-heading group-hover:text-brand-royal transition-colors mb-1.5 relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-royal group-hover:after:w-full after:transition-all after:duration-300">
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
                    );
                  })()}
                </AnimatePresence>
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNextService}
                disabled={currentServiceIndex === servicesData.length - 1}
                aria-label="Next service card"
                className={`shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-200 border ${
                  currentServiceIndex === servicesData.length - 1
                    ? 'opacity-30 cursor-not-allowed border-brand-silver/40 text-slate-400 bg-white/50'
                    : 'bg-white hover:bg-brand-royal text-brand-navy hover:text-white border-brand-silver/60 hover:border-brand-royal shadow-xs hover:shadow-md hover:scale-105 active:scale-95'
                }`}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Pagination Indicator / Dots */}
            <div className="flex items-center justify-center gap-3 pt-6">
              <span className="font-mono text-xs font-bold text-brand-steel tracking-wider">
                0{currentServiceIndex + 1} / 0{servicesData.length}
              </span>
              <div className="flex items-center gap-1.5">
                {servicesData.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => {
                      setSlideDirection(dotIdx > currentServiceIndex ? 1 : -1);
                      setCurrentServiceIndex(dotIdx);
                    }}
                    aria-label={`Jump to service ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === currentServiceIndex
                        ? 'w-6 bg-brand-royal'
                        : 'w-1.5 bg-brand-silver/60 hover:bg-brand-steel/50'
                    }`}
                  />
                ))}
              </div>
            </div>
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

      {/* ===================== SECTION 03: STATS DATA WALL ===================== */}
      <section className="relative py-20 bg-gradient-to-r from-brand-navy via-[#1B3E73] to-brand-navy border-y border-brand-steel/30 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold text-brand-silver uppercase tracking-widest block mb-2">
              [03 // PERFORMANCE METRICS]
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Engineering Velocity In Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {companyDetails.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE BANNER (DARK CONTRAST & REVERSE DIRECTION) ===================== */}
      <MarqueeBanner isDark={true} direction="right" speed="slow" />

      {/* ===================== SECTION 04: CALL TO ACTION ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-navy via-[#1B3E73] to-brand-navy border border-brand-steel/40 p-8 sm:p-14 lg:p-16 text-center relative overflow-hidden shadow-2xl text-white">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-royal/20 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-brand-silver uppercase tracking-widest mb-4">
            <span>[04 // INITIATE DIALOGUE]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 font-heading tracking-tight leading-tight">
            Ready to Accelerate Your <span className="text-brand-silver">Digital Transformation?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-brand-silver max-w-2xl mx-auto leading-relaxed mb-8">
            Speak directly with our senior technology architects to discuss your technical challenges, project scope, and receive a transparent roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton strength={0.2}>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-brand-navy hover:bg-slate-100 shadow-md hover:shadow-lg transition-all inline-block"
              >
                Schedule Consultation
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link
                to="/services"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-all inline-block"
              >
                Review Service Catalog
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

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
