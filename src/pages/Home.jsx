import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Award,
  Users,
  Cpu,
  Bot,
  Megaphone,
  PhoneCall,
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
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const updateVisibleCards = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setVisibleCards(1);
        } else if (window.innerWidth < 1024) {
          setVisibleCards(2);
        } else {
          setVisibleCards(3);
        }
      }
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, servicesData.length - visibleCards);

  const handleNextService = () => {
    if (startIndex < maxIndex) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrevService = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const getServiceIcon = (iconName, className = "w-5 h-5 text-brand-royal") => {
    switch (iconName) {
      case 'Bot': return <Bot className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      case 'Smartphone': return <Smartphone className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Megaphone': return <Megaphone className={className} />;
      case 'PhoneCall': return <PhoneCall className={className} />;
      default: return <Cpu className={className} />;
    }
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

  const wordVariants = {
    hidden: { y: '105%', opacity: 0, rotate: -2 },
    visible: (i) => ({
      y: '0%',
      opacity: 1,
      rotate: 0,
      transition: {
        delay: 0.12 + i * 0.12,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div className="relative pt-20 overflow-hidden bg-[#F8FAFD] text-slate-700">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[92vh] flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
        {/* Subtle geometric digital background */}
        <HomeDigitalGridBackground />

        <div className="relative max-w-7xl mx-auto w-full z-10">
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
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#315FA5] text-xs font-bold uppercase tracking-widest shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#315FA5]" />
                  <span>Digital Solutions That Drive Results</span>
                </span>
              </div>

              {/* High-Impact Animated Editorial Heading */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-[#101F3D] font-heading leading-[1.02] uppercase select-none">
                {/* Sentence 1: SMARTER SOLUTIONS */}
                <div className="overflow-hidden flex flex-wrap gap-x-3 sm:gap-x-5 py-0.5">
                  <motion.span
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={wordVariants}
                    className="hero-word"
                  >
                    Smarter
                  </motion.span>
                  <motion.span
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={wordVariants}
                    className="hero-word"
                  >
                    Solutions
                  </motion.span>
                </div>

                {/* Sentence 2: FOR BETTER FUTURE */}
                <div className="overflow-hidden flex flex-wrap gap-x-3 sm:gap-x-5 items-center py-0.5">
                  <motion.span
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={wordVariants}
                    className="hero-word"
                  >
                    For
                  </motion.span>

                  <motion.span
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={wordVariants}
                    className="hero-word animate-hero-gradient font-black"
                  >
                    Better
                  </motion.span>

                  <motion.span
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    variants={wordVariants}
                    className="hero-word animate-hero-gradient font-black"
                  >
                    Future
                  </motion.span>
                </div>

                {/* Dynamic Royal Blue Accent Line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-1 sm:h-1.5 w-32 sm:w-48 bg-gradient-to-r from-[#315FA5] via-[#4A80D4] to-transparent rounded-full origin-left mt-3"
                />
              </h1>

              {/* Lede Paragraph - Always 100% Visible */}
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed font-normal">
                Navabharath Technologies is a <strong className="text-[#101F3D] font-semibold">Mysuru-based Software Company</strong> helping businesses adapt, grow, and stay secure in a digital-first world. We design practical IT solutions that simplify operations and support long-term growth. From custom web development and mobile applications to AI-driven automation and strategic digital marketing, we provide end-to-end services tailored to your unique goals.
              </p>

              {/* Strong Editorial Call-to-Action Group - Always 100% Visible */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <MagneticButton strength={0.15}>
                  <Link
                    to="/services"
                    className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#315FA5] hover:bg-[#254c86] text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <span>Explore Practice Areas</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.15}>
                  <Link
                    to="/contact"
                    className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white hover:bg-[#F8FAFD] text-[#101F3D] border border-[#E2E8F0] hover:border-[#315FA5]/50 shadow-sm transition-all flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <span>Schedule Consultation</span>
                    <ArrowRight className="w-4 h-4 text-[#315FA5] transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>

                <Link
                  to="/portfolio"
                  className="px-4 py-4 font-semibold text-xs text-slate-600 hover:text-[#315FA5] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Case Studies</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#315FA5]" />
                </Link>
              </div>
            </div>

            {/* Right Column: Architectural Visual Card & Live Metrics */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Feature Pill Card with clean, subtle enterprise styling */}
              <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(16,31,61,0.05)] relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
                    <Terminal className="w-4 h-4 text-[#315FA5]" />
                    <span>SYSTEM ARCHITECTURE</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EFF5FF] text-[#315FA5]">
                    PROD v2.4
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#101F3D] font-heading mb-2">
                  Enterprise-Grade Reliability
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Engineered with zero compromise on cybersecurity, code hygiene, and microservice resilience.
                </p>

                {/* Technology Architecture Visual Preview */}
                <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-4 border border-[#E2E8F0] bg-gradient-to-br from-[#101F3D] to-[#1E3E70] shadow-sm group/img">
                  <img
                    src={getAssetUrl('/assets/system-architecture-tech.jpg')}
                    alt="Enterprise System Architecture & Technology Platform"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101F3D]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#101F3D]/85 backdrop-blur-md text-[10px] font-mono text-white border border-white/20 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#315FA5]" />
                      <span>CLOUD RUNTIME ACTIVE</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-300 bg-[#101F3D]/75 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 hidden sm:inline-block">
                      ISO/IEC 27001
                    </span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Core Stack</span>
                    <span className="font-mono text-[#101F3D] font-bold">React · Node · Cloud</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Client Satisfaction</span>
                    <span className="font-mono text-[#315FA5] font-bold">99% Verified Index</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">IP Ownership</span>
                    <span className="font-mono text-[#315FA5] font-bold">100% Client Transfer</span>
                  </div>
                </div>
              </div>

              {/* Quick Tech Badge Bar */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  DEPLOYMENT LAB
                </div>
                <div className="flex items-center gap-1.5">
                  {['AWS', 'GCP', 'Docker', 'K8s'].map((pill) => (
                    <span
                      key={pill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8FAFD] text-[#101F3D] border border-[#E2E8F0]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Editorial Technology Stack Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12 sm:mt-16 pt-8 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4 text-xs"
          >
            <div className="flex items-center gap-2 text-[#101F3D] font-bold font-heading uppercase tracking-wider">
              <Code2 className="w-4 h-4 text-[#315FA5]" />
              <span>Full-Stack Engineering Competencies:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {['React & Next.js', 'Node.js & Go', 'React Native', 'AWS Cloud Architecture', 'Kubernetes', 'Cybersecurity & QA'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-slate-700 font-mono text-[11px] shadow-2xs hover:border-[#315FA5]/40 transition-colors"
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
      <section id="vision" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-[#F8FAFD] border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Asymmetric Split Layout (Vision on Left, Leadership on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Left Column: Vision Statement & Action */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#315FA5] tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#315FA5]" />
                  <span>[01 // THE VISION]</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[36px] xl:text-[40px] font-extrabold text-[#101F3D] font-heading tracking-tight leading-[1.25]">
                  We do not just write code.<br className="hidden sm:inline" />
                  We architect <span className="text-[#315FA5]">digital engines</span><br className="hidden sm:inline" />
                  that define industry benchmarks.
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Partnering with enterprises, growing mid-market leaders, and high-growth ventures to engineer digital software products, automate critical bottlenecks, and build resilient modern infrastructures.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#315FA5] text-[#101F3D] hover:text-white font-bold text-xs uppercase tracking-wider border border-[#E2E8F0] hover:border-[#315FA5] transition-all group shadow-sm hover:shadow-md"
                >
                  <span>Explore Company Journey</span>
                  <ArrowRight className="w-4 h-4 text-[#315FA5] group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>

            {/* Right Column: Leadership Commitment */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              {/* CEO Statement Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm relative overflow-hidden h-full flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-[#315FA5] uppercase tracking-wider mb-3">
                    LEADERSHIP COMMITMENT
                  </div>
                  <blockquote className="text-base sm:text-lg text-[#101F3D] font-semibold leading-relaxed mb-6 font-heading">
                    "{companyDetails.mission}"
                  </blockquote>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                  <div>
                    <div className="text-sm font-bold text-[#101F3D]">Executive Leadership</div>
                    <div className="text-xs text-slate-500">Navabharath Technologies · Mysuru</div>
                  </div>
                  <span className="font-mono text-xs text-slate-400 font-bold">[2020 — PRESENT]</span>
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
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#315FA5]/40 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-extrabold text-slate-400 group-hover:text-[#315FA5] transition-colors">
                      /0{idx + 1}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#EFF5FF] text-[#315FA5] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#101F3D] font-heading mb-1.5 group-hover:text-[#315FA5] transition-colors">
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
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-[#F8FAFD] border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            number="02 // CORE PRACTICES"
            badge="Full-Stack Capabilities"
            title="Engineered for"
            titleHighlight="Scalability & Precision"
            description="From single-page web platforms to distributed cloud backends, we deliver end-to-end technological excellence across the entire software development lifecycle."
          />

          {/* 3-Card Modern Sliding Carousel with Left and Right Navigation Arrows */}
          <div className="relative mt-8 sm:mt-12">
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrevService}
                disabled={startIndex === 0}
                aria-label="Previous services"
                className={`shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 border ${
                  startIndex === 0
                    ? 'opacity-30 cursor-not-allowed border-[#E2E8F0] text-slate-300 bg-white/50'
                    : 'bg-white hover:bg-[#315FA5] text-[#101F3D] hover:text-white border-[#E2E8F0] hover:border-[#315FA5] shadow-sm hover:shadow-md hover:scale-105 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* 3-Card Viewport Track */}
              <div className="flex-1 overflow-hidden min-w-0 py-4 -my-1">
                <div
                  className="flex transition-transform duration-500 ease-in-out -mx-2 sm:-mx-3"
                  style={{ transform: `translateX(-${startIndex * (100 / visibleCards)}%)` }}
                >
                  {servicesData.map((service, idx) => (
                    <div
                      key={service.id}
                      className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2 sm:px-3"
                    >
                      <div className="home-practice-card group h-full p-6 sm:p-7 flex flex-col justify-between cursor-pointer">
                        {/* Subtle Background Radial Ambient Glow on Hover */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-brand-royal/5 blur-2xl group-hover:bg-brand-royal/10 transition-colors duration-500 pointer-events-none" />

                        <div className="relative z-10">
                          {/* Top Row: Icon + Number */}
                          <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-brand-silver/40">
                            <div className="flex items-center gap-2.5">
                              <div className="home-practice-icon-box w-11 h-11 rounded-xl bg-brand-royal/10 text-brand-royal border border-brand-royal/20 flex items-center justify-center">
                                {getServiceIcon(service.icon, "w-5 h-5 text-brand-royal group-hover:text-white transition-colors duration-300")}
                              </div>
                              <div>
                                <span className="font-mono text-[11px] font-bold text-brand-royal uppercase tracking-wider block">
                                  PRACTICE /0{idx + 1}
                                </span>
                                <span className="text-[10px] text-slate-400 group-hover:text-slate-500 transition-colors">
                                  Enterprise Solutions
                                </span>
                              </div>
                            </div>

                            <span className="font-mono text-base font-extrabold text-brand-steel/50 group-hover:text-brand-royal transition-colors duration-300">
                              S/0{idx + 1}
                            </span>
                          </div>

                          {/* Service Title */}
                          <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy font-heading group-hover:text-brand-royal transition-colors duration-300 mb-2 leading-snug">
                            {service.title}
                          </h3>

                          {/* Tagline */}
                          {service.tagline && (
                            <p className="text-[11px] font-medium text-brand-royal mb-2.5 italic line-clamp-1">
                              {service.tagline}
                            </p>
                          )}

                          {/* Description */}
                          <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                            {service.shortDesc}
                          </p>

                          {/* Key Capabilities: Displayed Vertically One Below Another */}
                          <div className="space-y-1.5 mb-5">
                            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                              CORE CAPABILITIES
                            </div>
                            {service.features.slice(0, 3).map((feat, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 p-1.5 rounded-lg bg-[#F8FAFD] text-slate-700 border border-[#E2E8F0] group-hover:border-[#315FA5]/30 group-hover:bg-[#EFF5FF]/40 text-[11px] font-medium transition-colors duration-200"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#315FA5] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                <span className="line-clamp-1">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Row: Metric & Action Buttons */}
                        <div className="relative z-10 pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                          <div>
                            <div className="text-base font-mono font-extrabold text-[#101F3D] group-hover:text-[#315FA5] transition-colors duration-300">
                              {service.stats.value}
                            </div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                              {service.stats.label}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedService(service)}
                              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#315FA5] bg-[#EFF5FF] hover:bg-[#315FA5] hover:text-white transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                            >
                              Details
                            </button>
                            <Link
                              to={`/services/${service.id}`}
                              className="w-9 h-9 rounded-xl bg-[#101F3D] hover:bg-[#315FA5] text-white flex items-center justify-center transition-all duration-200 shadow-2xs hover:shadow-md group/btn active:scale-95"
                              aria-label={`Open ${service.title} details`}
                            >
                              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNextService}
                disabled={startIndex >= maxIndex}
                aria-label="Next services"
                className={`shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 border ${
                  startIndex >= maxIndex
                    ? 'opacity-30 cursor-not-allowed border-[#E2E8F0] text-slate-300 bg-white/50'
                    : 'bg-white hover:bg-[#315FA5] text-[#101F3D] hover:text-white border-[#E2E8F0] hover:border-[#315FA5] shadow-sm hover:shadow-md hover:scale-105 active:scale-95'
                }`}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Pagination / Dots indicator */}
            <div className="flex items-center justify-center gap-3 pt-6">
              <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
                0{startIndex + 1} — 0{Math.min(startIndex + visibleCards, servicesData.length)} / 0{servicesData.length}
              </span>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setStartIndex(dotIdx)}
                    aria-label={`Jump to page ${dotIdx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === startIndex
                        ? 'w-6 bg-[#315FA5]'
                        : 'w-1.5 bg-[#E2E8F0] hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white hover:bg-[#EFF5FF] text-[#101F3D] border border-[#E2E8F0] hover:border-[#315FA5]/50 shadow-sm transition-all"
            >
              <span>Explore All 7 Specialized Practices</span>
              <ArrowRight className="w-4 h-4 text-[#315FA5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 03: STATS DATA WALL ===================== */}
      <section className="relative py-20 bg-[#F8FAFD] border-y border-[#E2E8F0] text-slate-700 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(ellipse 65% 50% at 50% 50%, #FFFFFF 0%, #FFFFFF 45%, transparent 100%)'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold text-[#315FA5] uppercase tracking-widest block mb-2">
              [03 // PERFORMANCE METRICS]
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101F3D] font-heading">
              Engineering Velocity In Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {companyDetails.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] text-center relative overflow-hidden shadow-sm hover:shadow-md hover:border-[#315FA5]/40 transition-all"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101F3D] mb-2 font-heading">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-600 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MARQUEE BANNER (LIGHT ENTERPRISE CONTRAST) ===================== */}
      <MarqueeBanner isDark={false} direction="right" speed="slow" />

      {/* ===================== SECTION 04: CALL TO ACTION ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-[#F8FAFD] border-t border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#101F3D] via-[#162B54] to-[#101F3D] border border-[#234275] p-8 sm:p-14 lg:p-16 text-center relative overflow-hidden shadow-xl text-white">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#315FA5]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#93B4E8] uppercase tracking-widest mb-4">
            <span>[04 // INITIATE DIALOGUE]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 font-heading tracking-tight leading-tight">
            Ready to Accelerate Your <span className="text-[#93B4E8]">Digital Transformation?</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Speak directly with our senior technology architects to discuss your technical challenges, project scope, and receive a transparent roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton strength={0.2}>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-[#101F3D] hover:bg-slate-100 shadow-md hover:shadow-lg transition-all inline-block"
              >
                Schedule Consultation
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link
                to="/services"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all inline-block"
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
              <h4 className="text-[#101F3D] font-bold text-xs uppercase tracking-wider mb-3">
                Key Deliverables &amp; Architectural Standards
              </h4>
              <ul className="space-y-2">
                {selectedService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#315FA5] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#101F3D] font-bold text-xs uppercase tracking-wider mb-2">
                Primary Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-[#F8FAFD] border border-[#E2E8F0] text-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#315FA5]">
                {selectedService.stats.label}: {selectedService.stats.value}
              </span>
              <Link
                to={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-xl bg-[#315FA5] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#101F3D] transition-colors cursor-pointer shadow-sm"
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
