import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Smartphone,
  Globe,
  Palette,
  Layers,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Star,
  Award,
  Users,
  Cpu,
  ExternalLink,
  ChevronRight,
  Shield,
  Clock,
  Sparkles
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import AnimatedCounter from '../components/common/AnimatedCounter';
import Modal from '../components/common/Modal';
import TechMarketingBackground from '../components/common/TechMarketingBackground';
import HomeDigitalGridBackground from '../components/home/HomeDigitalGridBackground';
import ServiceCard from '../components/common/ServiceCard';
import { servicesData } from '../data/servicesData';
import { portfolioData } from '../data/portfolioData';
import { testimonialsData } from '../data/testimonialsData';
import { companyDetails } from '../data/companyData';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-brand-royal" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-brand-royal" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-brand-royal" />;
      case 'Palette': return <Palette className="w-6 h-6 text-brand-royal" />;
      case 'Layers': return <Layers className="w-6 h-6 text-brand-royal" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-brand-royal" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-royal" />;
      default: return <Cpu className="w-6 h-6 text-brand-royal" />;
    }
  };

  return (
    <div className="relative pt-20 overflow-hidden bg-brand-light">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Soft-white background with subtle light blue gradient effects */}
        <HomeDigitalGridBackground />

        <div className="relative max-w-6xl mx-auto text-center z-10">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-brand-royal/30 text-brand-royal text-xs sm:text-sm font-semibold tracking-wide shadow-sm mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-brand-royal" />
            <span>Digital Solutions That Drive Results</span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-brand-navy font-heading leading-[1.1] mb-6"
          >
            Smarter Solutions for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-royal via-brand-royal to-brand-steel">
              Better Future
            </span>
          </h1>

          {/* Company Introduction Subheading */}
          <p
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Navabharath Technologies is a <span className="text-brand-royal font-semibold">Mysuru-based Software Company</span> helping businesses adapt, grow, and stay secure in a digital-first world. We design practical IT solutions that simplify operations and support long-term growth. From custom web development and mobile applications to AI-driven automation and strategic digital marketing, we provide end-to-end services tailored to your unique goals. Partner with us to accelerate your digital transformation and outpace the competition.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-brand-royal text-white hover:bg-brand-navy shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-white hover:bg-brand-light text-brand-navy border border-brand-silver/80 hover:border-brand-royal/50 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Request a Quote</span>
              <ChevronRight className="w-4 h-4 text-brand-royal transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/portfolio"
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-slate-600 hover:text-brand-royal transition-colors flex items-center justify-center gap-2"
            >
              <span>View Case Studies</span>
              <ExternalLink className="w-4 h-4 text-brand-royal" />
            </Link>
          </div>

          {/* Floating Technology Visuals / Badges */}
          <div
            className="mt-14 pt-8 border-t border-brand-silver/40 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-500"
          >
            <span className="font-semibold text-brand-navy uppercase tracking-wider">Enterprise Tech Stack:</span>
            {['React & Next.js', 'Node.js & Go', 'React Native', 'AWS Cloud', 'Kubernetes', 'Cybersecurity'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-white border border-brand-silver/60 text-slate-700 font-mono text-[11px] shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HIGHLIGHTS & STATS BAR ===================== */}
      {/* Subtle navy-blue and steel-blue gradient background */}
      <section className="relative py-12 bg-gradient-to-r from-brand-navy via-[#1B3E73] to-brand-navy border-y border-brand-steel/30 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <p className="text-xs sm:text-sm font-medium text-[#C4CCD5] tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SERVICES PREVIEW SECTION ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-brand-light">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Our Capabilities"
            title="Engineered for"
            titleHighlight="Scalability & Precision"
            description="From single-page web platforms to distributed cloud backends, we deliver end-to-end technological excellence across the entire software development lifecycle."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesData.slice(0, 6).map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                idx={idx}
                variant="home"
                onSelect={setSelectedService}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white hover:bg-brand-light text-brand-navy border border-brand-silver/80 hover:border-brand-royal shadow-sm transition-all"
            >
              <span>Explore All Specialized Services</span>
              <ArrowRight className="w-4 h-4 text-brand-royal" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED PROJECTS SECTION ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-silver/40 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Case Studies"
            title="Proven Results Across"
            titleHighlight="Global Industries"
            description="Explore how our tailored digital platforms and cloud architectures solve complex business challenges and drive operational efficiency."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.slice(0, 6).map((project, idx) => (
              <div
                key={project.id}
                className="rounded-3xl bg-white border border-brand-silver/60 overflow-hidden hover:border-brand-royal/50 transition-all duration-300 group flex flex-col justify-between hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden bg-brand-light">
                  <img
                    src={project.bannerImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent opacity-60" />
                  <div className="absolute -bottom-4 left-6 w-12 h-12 rounded-xl bg-white p-1.5 shadow-md border-2 border-brand-silver/50 flex items-center justify-center overflow-hidden z-10 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={project.logoImage}
                      alt={`${project.title} logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="pt-7 pb-6 px-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-royal transition-colors font-heading leading-snug">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-brand-light text-slate-700 border border-brand-silver/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-2">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-2.5 rounded-xl bg-brand-light hover:bg-brand-royal text-brand-navy hover:text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group/btn border border-brand-silver/50 hover:border-brand-royal"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-royal text-white hover:bg-brand-navy shadow-md transition-all"
            >
              <span>Browse Full Portfolio Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-brand-light to-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Why Navabharath"
            title="The Engineering Standard"
            titleHighlight="You Can Depend On"
            description="We bridge strategic vision and software execution through transparent communication, agile precision, and robust architecture."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyDetails.values.map((val, idx) => (
              <div
                key={val.title}
                className="p-6 rounded-2xl bg-white border border-brand-silver/60 hover:border-brand-royal/40 shadow-sm transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-royal/10 border border-brand-royal/20 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-brand-royal" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-2 font-heading">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS SECTION ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#101F3C] via-[#1B3E73] to-[#101F3C] border-t border-brand-steel/30 relative text-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            isDark={true}
            badge="Client Endorsements"
            title="Trusted By Leaders"
            titleHighlight="Across Sectors"
            description="Discover how our engineering solutions empower executive leaders to meet demanding deadlines and exceed operational metrics."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonialsData.map((item, idx) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-[#B69A63]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#B69A63] text-[#B69A63]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#C4CCD5] leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-bold text-white mb-2">
                    {item.metric}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.clientName}
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{item.clientName}</div>
                      <div className="text-xs text-[#C4CCD5]">{item.role}, {item.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CALL TO ACTION SECTION ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-white">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-navy via-[#1B3E73] to-brand-navy border border-brand-steel/40 p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl text-white">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-royal/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 font-heading">
            Ready to Accelerate Your <span className="text-[#C4CCD5]">Digital Transformation?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#C4CCD5] max-w-2xl mx-auto leading-relaxed mb-8">
            Speak directly with our senior technology architects to discuss your technical challenges, project scope, and receive a transparent roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-royal text-white hover:bg-white hover:text-brand-navy shadow-lg transition-all"
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
