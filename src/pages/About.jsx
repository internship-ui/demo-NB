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
import MarqueeBanner from '../components/common/MarqueeBanner';
import { companyDetails } from '../data/companyData';
import { getAssetUrl } from '../utils/assetPath';

export default function About() {
  const getValueIcon = (name) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-royal" />;
      case 'Eye': return <Eye className="w-6 h-6 text-brand-royal" />;
      case 'Zap': return <Zap className="w-6 h-6 text-brand-royal" />;
      default: return <Cpu className="w-6 h-6 text-brand-royal" />;
    }
  };

  return (
    <div className="pt-24 pb-20 bg-brand-light min-h-screen">
      {/* ===================== HERO / HEADER: ABOUT US ===================== */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Soft-white background with subtle silver patterns */}
        <AboutBackground />

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Main Hero Header */}
          <div className="relative max-w-4xl mx-auto text-center mb-16 sm:mb-20">
            {/* Subtle Ambient Tech Icons on Left and Right */}
            <div className="absolute -left-2 sm:-left-8 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none hidden sm:block">
              <Database className="w-10 h-10 text-brand-royal/50" />
            </div>
            <div className="absolute -right-2 sm:-right-8 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none hidden sm:block">
              <ShieldCheck className="w-10 h-10 text-brand-royal/50" />
            </div>

            {/* Badge: WHO WE ARE & Coordinates */}
            <div className="flex flex-col items-center gap-2 mb-5">
              <div className="font-mono text-xs text-brand-royal font-bold tracking-widest uppercase">
                [01 // WHO WE ARE] · MYSURU 12.2958° N, 76.6394° E
              </div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-royal/25 text-brand-royal text-xs font-bold uppercase tracking-wider shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-royal" />
                <span>EXCELLENCE IN SOFTWARE ENGINEERING</span>
              </div>
            </div>

            {/* Heading: About Us */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy font-heading tracking-tight mb-4 uppercase"
            >
              Architecting <br className="hidden sm:inline" />
              <span className="text-brand-royal underline decoration-brand-steel/30 decoration-wavy underline-offset-8">
                Digital Excellence
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal"
            >
              Empowering businesses with scalable, future-ready technology and customer-centric engineering.
            </p>
          </div>

          {/* ===================== CEO & COMPANY OVERVIEW ===================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
            {/* Left Column: CEO Photo Card */}
            <div className="lg:col-span-5">
              <div
                className="group relative bg-white border border-brand-silver/60 hover:border-brand-royal/40 rounded-3xl p-5 shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Floating Leadership Badge */}
                <div
                  className="absolute top-8 left-8 z-20 px-3.5 py-1.5 rounded-full bg-white/95 border border-brand-silver/60 backdrop-blur-md flex items-center gap-2 shadow-md"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-royal" />
                  <span className="text-[11px] font-bold text-brand-navy tracking-wide uppercase font-heading">
                    Executive Leadership
                  </span>
                </div>

                {/* Photo Frame */}
                <div className="relative rounded-2xl overflow-hidden bg-brand-light aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src={getAssetUrl('/assets/dinesh-jk-ceo.png')}
                    alt="Dinesh J K (CEO & Founder)"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                </div>

                {/* Caption / Title */}
                <div className="pt-5 pb-2 text-center">
                  <h3 className="text-xl font-bold text-brand-navy font-heading group-hover:text-brand-royal transition-colors">
                    Dinesh J K
                  </h3>
                  <p className="text-xs font-semibold text-brand-royal uppercase tracking-wider mt-0.5">
                    CEO &amp; Founder
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Information, Vision & Highlights */}
            <div
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-royal/10 border border-brand-royal/25 text-brand-royal text-xs font-semibold uppercase tracking-wider">
                <span>Executive Leadership &amp; Company Overview</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-heading leading-tight">
                Empowering Businesses With <span className="text-brand-royal">Scalable, Efficient Technology</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Navabharath Technologies is a leading IT solutions provider dedicated to delivering innovative and robust digital products. With a team of expert developers and designers, we transform ideas into reality. Our mission is to empower businesses with scalable, efficient technology and comprehensive end-to-end services.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Under the visionary leadership of our CEO &amp; Founder, Dinesh J K, we have cultivated a culture of continuous learning and technical excellence. Our dedicated team of professionals doesn't just write code—we build lasting partnerships with our clients. From the initial consultation through deployment and ongoing maintenance, we prioritize transparent communication, agile development methodologies, and a steadfast commitment to delivering exceptional return on investment.
              </p>

              {/* 4 Feature Badges in 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-brand-silver/60 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-brand-royal/10 text-brand-royal flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-royal" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-brand-navy">Innovative Solutions</span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-brand-silver/60 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-brand-royal/10 text-brand-royal flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-royal" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-brand-navy">Digital Marketing</span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-brand-silver/60 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-brand-royal/10 text-brand-royal flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-royal" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-brand-navy">Customer-Centric Approach</span>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-brand-silver/60 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-brand-royal/10 text-brand-royal flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-royal" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-brand-navy">Expert Team</span>
                </div>
              </div>

              {/* Explore Button */}
              <div className="pt-2">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy shadow-md transition-colors"
                >
                  <span>Explore Our Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companyDetails.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-white border border-brand-silver/60 text-center shadow-sm"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-heading mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Divider */}
      <MarqueeBanner />

      {/* ===================== MISSION, VISION & VALUES ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-silver/40">
        <div className="max-w-7xl mx-auto">
          {/* Mission & Vision Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div
              className="p-8 rounded-3xl bg-brand-light border border-brand-silver/70 shadow-sm relative overflow-hidden"
            >
              <div className="font-mono text-xs font-bold text-brand-royal uppercase tracking-widest mb-4">
                [02 // PURPOSE]
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-royal/10 border border-brand-royal/20 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-brand-royal" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy font-heading mb-4">
                Our Corporate Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {companyDetails.mission}
              </p>
            </div>

            <div
              className="p-8 rounded-3xl bg-white border border-brand-silver/70 shadow-sm relative overflow-hidden"
            >
              <div className="font-mono text-xs font-bold text-brand-royal uppercase tracking-widest mb-4">
                [03 // ASPIRATION]
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-royal/10 border border-brand-royal/20 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6 text-brand-royal" />
              </div>
              <h3 className="text-2xl font-bold text-brand-navy font-heading mb-4">
                Our Strategic Vision
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {companyDetails.vision}
              </p>
            </div>
          </div>

          {/* Core Values */}
          <SectionHeading
            number="04 // PILLARS"
            badge="Core Principles"
            title="Values That Guide Every"
            titleHighlight="Line of Code"
            description="Our engineering culture is anchored by four foundational values that dictate how we architect, build, and support enterprise technology."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyDetails.values.map((val, idx) => (
              <div
                key={val.title}
                className="p-6 rounded-2xl bg-brand-light border border-brand-silver/60 hover:border-brand-royal/40 shadow-sm transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-brand-silver/50 flex items-center justify-center text-brand-royal">
                    {getValueIcon(val.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-brand-steel/50 group-hover:text-brand-royal transition-colors">
                    /0{idx + 1}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-brand-navy font-heading mb-2 group-hover:text-brand-royal transition-colors">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
