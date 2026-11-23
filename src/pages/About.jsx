import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Eye, 
  Zap, 
  Cpu, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Users, 
  Clock, 
  Target, 
  Compass, 
  Building2,
  Sparkles,
  Database
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import AnimatedCounter from '../components/common/AnimatedCounter';
import AboutBackground from '../components/about/AboutBackground';
import { companyDetails } from '../data/companyData';

export default function About() {
  const getValueIcon = (name) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-yellow" />;
      case 'Eye': return <Eye className="w-6 h-6 text-brand-yellow" />;
      case 'Zap': return <Zap className="w-6 h-6 text-brand-yellow" />;
      default: return <Cpu className="w-6 h-6 text-brand-yellow" />;
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* ===================== HERO / HEADER: ABOUT US ===================== */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background: Dynamic Canvas Particles & Breathing Cyber Orbs */}
        <AboutBackground />

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Main Hero Header */}
          <div className="relative max-w-4xl mx-auto text-center mb-16 sm:mb-20">
            {/* Subtle Ambient Tech Icons on Left and Right */}
            <div className="absolute -left-2 sm:-left-8 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none hidden sm:block">
              <Database className="w-10 h-10 text-brand-yellow/70 animate-pulse" />
            </div>
            <div className="absolute -right-2 sm:-right-8 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none hidden sm:block">
              <ShieldCheck className="w-10 h-10 text-brand-yellow/70 animate-pulse" />
            </div>

            {/* Badge: WHO WE ARE */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-5 shadow-glow-yellow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>WHO WE ARE</span>
            </motion.div>

            {/* Heading: About Us */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight mb-4"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-400">Us</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              Empowering businesses with scalable, future-ready technology and customer-centric engineering.
            </motion.p>
          </div>

          {/* ===================== CEO & COMPANY OVERVIEW ===================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
            {/* Left Column: CEO Photo Card with Premium Animation */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -35, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative bg-brand-navy-surface/90 border border-brand-yellow/30 hover:border-brand-yellow/60 rounded-3xl p-5 shadow-2xl hover:shadow-glow-yellow transition-all duration-500 overflow-hidden backdrop-blur-md"
              >
                {/* Floating Leadership Badge */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-8 left-8 z-20 px-3.5 py-1.5 rounded-full bg-brand-navy-dark/90 border border-brand-yellow/50 backdrop-blur-md flex items-center gap-2 shadow-xl"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
                  <span className="text-[11px] font-bold text-white tracking-wide uppercase font-heading">
                    Executive Leadership
                  </span>
                </motion.div>

                {/* Photo Frame with Hover Zoom & Subtle Lighting */}
                <div className="relative rounded-2xl overflow-hidden bg-brand-navy-card aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src="/assets/dinesh-jk-ceo.png"
                    alt="Dinesh J K (CEO & Founder)"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                {/* Caption / Title */}
                <div className="pt-5 pb-2 text-center">
                  <h3 className="text-xl font-bold text-white font-heading group-hover:text-brand-yellow transition-colors">
                    Dinesh J K
                  </h3>
                  <p className="text-xs font-semibold text-brand-yellow uppercase tracking-wider mt-0.5">
                    CEO &amp; Founder
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Information, Vision & Highlights with Gentle Fade */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-wider">
                <span>Executive Leadership &amp; Company Overview</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
                Empowering Businesses With <span className="text-brand-yellow">Scalable, Efficient Technology</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Navabharath Technologies is a leading IT solutions provider dedicated to delivering innovative and robust digital products. With a team of expert developers and designers, we transform ideas into reality. Our mission is to empower businesses with scalable, efficient technology and comprehensive end-to-end services.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Under the visionary leadership of our CEO &amp; Founder, Dinesh J K, we have cultivated a culture of continuous learning and technical excellence. Our dedicated team of professionals doesn't just write code—we build lasting partnerships with our clients. From the initial consultation through deployment and ongoing maintenance, we prioritize transparent communication, agile development methodologies, and a steadfast commitment to delivering exceptional return on investment.
              </p>

              {/* 4 Feature Badges in 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-navy-surface border border-white/10">
                  <div className="w-5 h-5 rounded-full bg-brand-yellow/15 text-brand-yellow flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">Innovative Solutions</span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-navy-surface border border-white/10">
                  <div className="w-5 h-5 rounded-full bg-brand-yellow/15 text-brand-yellow flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">Digital Marketing</span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-navy-surface border border-white/10">
                  <div className="w-5 h-5 rounded-full bg-brand-yellow/15 text-brand-yellow flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">Customer-Centric Approach</span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-navy-surface border border-white/10">
                  <div className="w-5 h-5 rounded-full bg-brand-yellow/15 text-brand-yellow flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">Expert Team</span>
                </div>
              </div>

              {/* Explore Button */}
              <div className="pt-2">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover shadow-lg transition-colors"
                >
                  <span>Explore Our Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Animated Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companyDetails.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-brand-navy-surface/80 border border-white/10 text-center"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-brand-yellow font-heading mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MISSION, VISION & VALUES ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mission & Vision Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-brand-navy-surface border border-brand-yellow/30 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-brand-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-white font-heading mb-4">
                Our Corporate Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {companyDetails.mission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-brand-navy-surface border border-white/10 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6 text-brand-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-white font-heading mb-4">
                Our Strategic Vision
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {companyDetails.vision}
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <SectionHeading
            badge="Core Principles"
            title="Values That Guide Every"
            titleHighlight="Line of Code"
            description="Our engineering culture is anchored by four foundational values that dictate how we architect, build, and support enterprise technology."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyDetails.values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-brand-navy-surface border border-white/10 hover:border-brand-yellow/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-navy-card border border-brand-yellow/30 flex items-center justify-center mb-4">
                  {getValueIcon(val.icon)}
                </div>
                <h4 className="text-lg font-bold text-white font-heading mb-2">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

