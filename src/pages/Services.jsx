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
import MarqueeBanner from '../components/common/MarqueeBanner';
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
      case 'Cpu': return <Cpu className="w-6 h-6 text-brand-royal" />;
      case 'Zap': return <Zap className="w-6 h-6 text-brand-royal" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-royal" />;
      default: return <LifeBuoy className="w-6 h-6 text-brand-royal" />;
    }
  };

  return (
    <div className="pt-28 pb-20 relative min-h-screen overflow-hidden bg-brand-light">
      {/* Premium Digital Data Flow Background Animation */}
      <ServicesDataFlowBackground />

      <div className="relative z-10">
        {/* ===================== HERO SECTION ===================== */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="relative max-w-5xl mx-auto text-center">
            {/* Editorial Eyebrow */}
            <div className="font-mono text-xs text-brand-royal font-bold tracking-widest uppercase mb-4">
              [02 // SERVICES &amp; PRACTICES] · MYSURU 12.2958° N, 76.6394° E
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-brand-royal/30 text-brand-royal text-xs font-bold uppercase tracking-wider shadow-2xs mb-6"
            >
              <Sparkles className="w-4 h-4 text-brand-royal" />
              <span>End-to-End Enterprise Technology Solutions</span>
            </div>

            {/* Title: Our Services - Always 100% Solid & Visible */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy font-heading tracking-tight mb-4 uppercase"
            >
              Enterprise Engineering <br className="hidden sm:inline" />
              <span className="text-brand-royal">
                Capabilities
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg sm:text-xl md:text-2xl font-bold text-brand-navy mb-4 font-heading"
            >
              Innovative Technology Solutions That Empower Your Business.
            </p>

            <p
              className="text-sm sm:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              From autonomous AI agents and cloud infrastructure to high-speed web apps, mobile ecosystems, brand marketing, and intelligent IVR telephony—we provide comprehensive digital engineering to accelerate your operational velocity.
            </p>
          </div>
        </section>

        {/* Infinite Horizontal Marquee */}
        <MarqueeBanner />

        {/* ===================== RESPONSIVE SERVICE CARDS GRID ===================== */}
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
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-brand-silver/40 bg-white relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Heading & Subtitle */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-royal/10 border border-brand-royal/25 text-brand-royal text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>STRATEGIC CLIENT SUCCESS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-heading tracking-tight mb-3">
                Our Trusted <span className="text-brand-royal">Clients</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
                Empowering growth and delivering transformative software solutions for industry leaders across the globe.
              </p>
            </div>

            {/* 3 Client Cards Grid with Modern Updated Animation & CSS Styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {trustedClients.map((client, idx) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="trusted-client-card group p-6 sm:p-8 flex flex-col justify-between"
                >
                  {/* Subtle Background Radial Ambient Glow on Hover */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-brand-royal/5 blur-2xl group-hover:bg-brand-royal/10 transition-colors duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Top Header: Category Badge & Logo Emblem */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-brand-royal/10 text-brand-royal border border-brand-royal/20 group-hover:bg-brand-royal group-hover:text-white group-hover:border-brand-royal transition-all duration-300 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-royal group-hover:bg-white transition-colors" />
                        <span>{client.badge}</span>
                      </span>

                      {/* Logo Emblem Container */}
                      <div className="trusted-client-logo-box w-16 h-16 rounded-2xl bg-white p-2.5 flex items-center justify-center shadow-xs border border-brand-silver/60 flex-shrink-0">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Title & Domain */}
                    <h3 className="text-lg sm:text-xl font-bold text-brand-navy font-heading mb-1.5 group-hover:text-brand-royal transition-colors duration-300 leading-snug">
                      {client.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-royal/40 group-hover:bg-brand-royal transition-colors" />
                      <p className="text-xs font-semibold text-brand-steel tracking-wide">
                        {client.scope}
                      </p>
                    </div>

                    {/* Details / Description */}
                    <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-700 leading-relaxed mb-6 transition-colors">
                      {client.description}
                    </p>
                  </div>

                  <div className="relative z-10">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-brand-silver/40 mb-6">
                      {client.tags.map((tag) => (
                        <span
                          key={tag}
                          className="trusted-client-tag px-2.5 py-1 rounded-lg bg-brand-light border border-brand-silver/60 text-[11px] font-medium text-slate-700 hover:shadow-2xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Link to Portfolio */}
                    <Link
                      to="/portfolio"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-royal/5 hover:bg-brand-royal text-xs font-bold text-brand-royal hover:text-white border border-brand-royal/20 hover:border-brand-royal transition-all duration-200 group/link shadow-2xs hover:shadow-xs"
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
        <TechnologiesWeUse />

        {/* ===================== WHY CHOOSE US ===================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-light border-t border-brand-silver/40 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              badge="The Navabharath Standard"
              title="Why Choose Us for"
              titleHighlight="Enterprise Technology"
              description="We bridge strategic technology leadership with rigorous engineering standards to guarantee tangible operational outcomes."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUsPillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-white border border-brand-silver/60 hover:border-brand-royal/40 shadow-sm transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-light border border-brand-silver/50 flex items-center justify-center mb-4">
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2 font-heading">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FINAL GET IN TOUCH CTA ===================== */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-navy via-[#1B3E73] to-brand-navy border border-brand-steel/40 p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl text-white">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-royal/20 rounded-full blur-3xl pointer-events-none" />
            
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C4CCD5] border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Your Transformation</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 font-heading">
              Ready to Build Your Next <span className="text-[#C4CCD5]">Digital Solution?</span>
            </h2>
            <p className="text-base sm:text-lg text-[#C4CCD5] max-w-2xl mx-auto leading-relaxed mb-8">
              Connect directly with our senior technology consultants to discuss your technical parameters, timeline, and receive a customized architectural proposal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-royal text-white hover:bg-white hover:text-brand-navy shadow-lg transition-all"
              >
                Get In Touch With Us
              </Link>
              <Link
                to="/portfolio"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-all"
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
          <div className="space-y-6 text-sm text-slate-700">
            <div>
              <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-2">
                Executive Overview
              </h4>
              <p className="leading-relaxed text-slate-600">{selectedService.fullDesc}</p>
            </div>

            <div>
              <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
                Key Features &amp; Architectural Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-brand-light border border-brand-silver/50">
                    <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-silver/40 flex items-center justify-between">
              <button
                onClick={() => setSelectedService(null)}
                className="text-xs font-semibold text-slate-500 hover:text-brand-navy transition-colors"
              >
                Close Window
              </button>
              <Link
                to={`/services/${selectedService.id}`}
                onClick={() => setSelectedService(null)}
                className="px-6 py-2.5 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy shadow-md transition-colors flex items-center gap-1.5"
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
