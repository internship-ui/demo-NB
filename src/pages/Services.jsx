import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Users, 
  Award, 
  Sparkles,
  LifeBuoy,
  TrendingUp,
  Cpu,
  Clock
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/common/ServiceCard';
import Modal from '../components/common/Modal';
import ServicesDataFlowBackground from '../components/services/ServicesDataFlowBackground';
import TechnologiesWeUse from '../components/services/TechnologiesWeUse';
import { servicesData } from '../data/servicesData';
import { getAssetUrl } from '../utils/assetPath';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const trustedClients = [
    {
      id: 'shashwath',
      name: 'Shashwath Souharda Co-operative Ltd.',
      domain: 'Banking & Financial Co-operative',
      badge: 'FINANCIAL & CO-OPERATIVE',
      logo: getAssetUrl('/clients/logo1.png'),
      scope: 'Core Digital Banking & Member Management',
      description: 'Enterprise financial management system, secure web portal architecture, and member transaction automation engineered for high reliability and financial compliance.',
      tags: ['Core Banking', 'Member Portal', 'Data Security']
    },
    {
      id: 'ar-hospital',
      name: 'A R Hospital Healthcare Services',
      domain: 'Multispeciality Hospital & Medical Care',
      badge: 'HEALTHCARE & MEDICAL',
      logo: getAssetUrl('/clients/logo2.png'),
      scope: 'Hospital Portal & Patient Workflow Support',
      description: 'Specialized healthcare digital presence, multi-department appointment routing, and patient consultation management for leading medical specialists in Mysuru.',
      tags: ['Healthcare IT', 'Patient Portal', 'Doctor Scheduling']
    },
    {
      id: 'shettys-dental',
      name: "Shetty's Hi-Tech Multispeciality Dental Clinic",
      domain: 'Advanced Dental Healthcare & Surgery',
      badge: 'ADVANCED DENTAL CARE',
      logo: getAssetUrl('/clients/logo3.png'),
      scope: 'Live Token Booking & Clinic Queue Automation',
      description: 'Custom token booking application with live queue progression tracking, automated SMS/WhatsApp alerts, and operatory chair assignment dashboard.',
      tags: ['Token Booking App', 'Queue Management', 'Clinic Automation']
    }
  ];

  const whyChooseUsPillars = [
    {
      icon: 'Cpu',
      title: 'Architectural Mastery & Scale',
      desc: 'We engineer high-availability, microservices-ready architectures built to support millions of concurrent transactions with sub-second latency.'
    },
    {
      icon: 'Zap',
      title: 'Agile Delivery Velocity',
      desc: 'Two-week structured sprints, transparent backlog tracking, continuous automated integration, and milestone demos that eliminate project drift.'
    },
    {
      icon: 'ShieldCheck',
      title: 'Enterprise Security & Compliance',
      desc: 'Built-in security hygiene adhering to OWASP Top 10, zero-trust network policies, end-to-end data encryption, and regulatory audit compliance.'
    },
    {
      icon: 'LifeBuoy',
      title: 'Dedicated SLA & 24/7 Operations',
      desc: 'Post-deployment reliability engineering, automated telemetry monitoring, pro-active vulnerability patches, and guaranteed response SLAs.'
    }
  ];

  const getPillarIcon = (name) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-brand-yellow" />;
      case 'Zap': return <Zap className="w-6 h-6 text-brand-yellow" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-yellow" />;
      default: return <LifeBuoy className="w-6 h-6 text-brand-yellow" />;
    }
  };

  return (
    <div className="pt-28 pb-20 relative min-h-screen overflow-hidden bg-brand-navy">
      {/* Premium Digital Data Flow Background Animation */}
      <ServicesDataFlowBackground />

      <div className="relative z-10">
        {/* ===================== HERO SECTION ===================== */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Background Grid & Gradients */}
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-navy-surface/90 border border-brand-yellow/30 text-brand-yellow text-xs sm:text-sm font-semibold tracking-wide shadow-glow-yellow mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-brand-yellow animate-spin-slow" />
            <span>End-to-End Enterprise Technology Solutions</span>
          </motion.div>

          {/* Title: Our Services */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight mb-4"
          >
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-400">
              Services
            </span>
          </motion.h1>

          {/* Subtitle: Innovative Technology Solutions That Empower Your Business */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-brand-yellow mb-4 font-heading"
          >
            Innovative Technology Solutions That Empower Your Business.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            From autonomous AI agents and cloud infrastructure to high-speed web apps, mobile ecosystems, brand marketing, and intelligent IVR telephony—we provide comprehensive digital engineering to accelerate your operational velocity.
          </motion.p>
        </div>
      </section>

      {/* ===================== RESPONSIVE SERVICE CARDS GRID ===================== */}
      {/* 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                idx={idx}
                variant="services"
                onSelect={(svc) => navigate(`/services/${svc.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== OUR TRUSTED CLIENTS ===================== */}
      {/* Placed below the service cards (IVR Solutions) following company dark navy & brand yellow colour code */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-4 shadow-glow-yellow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STRATEGIC CLIENT SUCCESS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-3">
              Our Trusted <span className="text-brand-yellow">Clients</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal">
              Empowering growth and delivering transformative software solutions for industry leaders across the globe.
            </p>
          </motion.div>

          {/* 3 Client Cards Grid - Following Company Colour Code (Dark Navy, Brand Yellow, White) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {trustedClients.map((client, idx) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-brand-navy-surface border border-white/10 hover:border-brand-yellow/50 rounded-3xl p-6 sm:p-8 hover:shadow-glow-yellow transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Category Badge & Logo Emblem */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
                      {client.badge}
                    </span>

                    {/* Logo Emblem Container: Clean White Rounded Frame */}
                    <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,201,40,0.3)] transition-all duration-300 flex-shrink-0">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Title & Domain */}
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading mb-1.5 group-hover:text-brand-yellow transition-colors leading-snug">
                    {client.name}
                  </h3>
                  <p className="text-xs font-semibold text-brand-yellow mb-3 tracking-wide">
                    {client.scope}
                  </p>

                  {/* Details / Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {client.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-5">
                    {client.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-brand-navy-card border border-white/5 text-[11px] font-medium text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link to Portfolio */}
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-yellow hover:text-white transition-colors group/link"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TECHNOLOGIES WE USE ===================== */}
      {/* Interactive enterprise tech stack directly below Our Trusted Clients */}
      <TechnologiesWeUse />

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark/80 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="The Navabharath Standard"
            title="Why Choose Us for"
            titleHighlight="Enterprise Technology"
            description="We bridge strategic technology leadership with rigorous engineering standards to guarantee tangible operational outcomes."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-brand-navy-surface border border-white/10 hover:border-brand-yellow/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-navy-card border border-brand-yellow/30 flex items-center justify-center mb-4">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-heading">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL GET IN TOUCH CTA ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-navy-surface via-brand-navy-card to-brand-navy-surface border border-brand-yellow/30 p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/15 text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start Your Transformation</span>
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 font-heading">
            Ready to Build Your Next <span className="text-brand-yellow">Digital Solution?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Connect directly with our senior technology consultants to discuss your technical parameters, timeline, and receive a customized architectural proposal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-yellow text-brand-navy hover:bg-brand-yellow-hover shadow-xl hover:shadow-glow-yellow transition-all"
            >
              Get In Touch With Us
            </Link>
            <Link
              to="/portfolio"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all"
            >
              View Client Case Studies
            </Link>
          </div>
        </div>
      </section>
      </div>

      {/* Optional Quick Modal Preview */}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
          subtitle={selectedService.tagline}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6 text-sm text-slate-300">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                Executive Overview
              </h4>
              <p className="leading-relaxed">{selectedService.fullDesc}</p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Key Features & Architectural Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setSelectedService(null)}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Close Window
              </button>
              <Link
                to={`/services/${selectedService.id}`}
                onClick={() => setSelectedService(null)}
                className="px-6 py-2.5 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover shadow-lg transition-colors flex items-center gap-1.5"
              >
                <span>Open Dedicated Service Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
