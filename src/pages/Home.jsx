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
      case 'Globe': return <Globe className="w-6 h-6 text-brand-yellow" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-brand-yellow" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-brand-yellow" />;
      case 'Palette': return <Palette className="w-6 h-6 text-brand-yellow" />;
      case 'Layers': return <Layers className="w-6 h-6 text-brand-yellow" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-brand-yellow" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-brand-yellow" />;
      default: return <Cpu className="w-6 h-6 text-brand-yellow" />;
    }
  };

  return (
    <div className="relative pt-20 overflow-hidden">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Premium Interactive Digital Grid Background Animation */}
        <HomeDigitalGridBackground />

        <div className="relative max-w-6xl mx-auto text-center z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-navy-surface/90 border border-brand-yellow/30 text-brand-yellow text-xs sm:text-sm font-semibold tracking-wide shadow-glow-yellow mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-brand-yellow animate-spin-slow" />
            <span>Digital Solutions That Drive Results</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-heading leading-[1.1] mb-6"
          >
            Smarter Solutions for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-400">
              Better Future
            </span>
          </motion.h1>

          {/* Company Introduction Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Navabharath Technologies is a <span className="text-brand-yellow font-semibold">Mysuru-based Software Company</span> helping businesses adapt, grow, and stay secure in a digital-first world. We design practical IT solutions that simplify operations and support long-term growth. From custom web development and mobile applications to AI-driven automation and strategic digital marketing, we provide end-to-end services tailored to your unique goals. Partner with us to accelerate your digital transformation and outpace the competition.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-brand-yellow text-brand-navy hover:bg-brand-yellow-hover shadow-xl hover:shadow-glow-yellow transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-brand-yellow/50 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Request a Quote</span>
              <ChevronRight className="w-4 h-4 text-brand-yellow transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/portfolio"
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <span>View Case Studies</span>
              <ExternalLink className="w-4 h-4 text-brand-yellow" />
            </Link>
          </motion.div>

          {/* Floating Technology Visuals / Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400"
          >
            <span className="font-semibold text-slate-300 uppercase tracking-wider">Enterprise Tech Stack:</span>
            {['React & Next.js', 'Node.js & Go', 'React Native', 'AWS Cloud', 'Kubernetes', 'Cybersecurity'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-brand-navy-surface/80 border border-white/10 text-slate-200 font-mono text-[11px]"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== HIGHLIGHTS & STATS BAR ===================== */}
      <section className="relative py-12 bg-brand-navy-dark/95 border-y border-brand-yellow/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {companyDetails.stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-brand-navy-surface/50 border border-white/10 text-center relative overflow-hidden group hover:border-brand-yellow/40 transition-colors"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-yellow mb-2 font-heading">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SERVICES PREVIEW SECTION ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative">
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-brand-yellow transition-all"
            >
              <span>Explore All Specialized Services</span>
              <ArrowRight className="w-4 h-4 text-brand-yellow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED PROJECTS SECTION ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark/70 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Case Studies"
            title="Proven Results Across"
            titleHighlight="Global Industries"
            description="Explore how our tailored digital platforms and cloud architectures solve complex business challenges and drive operational efficiency."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.slice(0, 6).map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-3xl bg-brand-navy-surface border border-white/10 overflow-hidden hover:border-brand-yellow/40 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                <div className="relative h-44 overflow-hidden bg-brand-navy-card">
                  <img
                    src={project.bannerImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-surface via-transparent to-transparent opacity-60" />
                  <div className="absolute -bottom-4 left-6 w-12 h-12 rounded-xl bg-white p-1.5 shadow-xl border-2 border-brand-navy-surface flex items-center justify-center overflow-hidden z-10 group-hover:scale-110 transition-transform duration-300">
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
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-yellow transition-colors font-heading leading-snug">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-white/5 text-slate-200 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-2">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-brand-yellow text-slate-200 hover:text-brand-navy font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-yellow text-brand-navy hover:bg-brand-yellow-hover shadow-lg transition-all"
            >
              <span>Browse Full Portfolio Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE US ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Why Navabharath"
            title="The Engineering Standard"
            titleHighlight="You Can Depend On"
            description="We bridge strategic vision and software execution through transparent communication, agile precision, and robust architecture."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyDetails.values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-brand-navy-surface/60 border border-white/10 hover:border-brand-yellow/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-heading">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS SECTION ===================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark/90 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="Client Endorsements"
            title="Trusted By Leaders"
            titleHighlight="Across Sectors"
            description="Discover how our engineering solutions empower executive leaders to meet demanding deadlines and exceed operational metrics."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonialsData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-brand-navy-surface border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-brand-yellow">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs font-bold text-brand-yellow mb-2">
                    {item.metric}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.clientName}
                      className="w-10 h-10 rounded-full object-cover border border-brand-yellow/30"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{item.clientName}</div>
                      <div className="text-xs text-slate-400">{item.role}, {item.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CALL TO ACTION SECTION ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-navy-surface via-brand-navy-card to-brand-navy-surface border border-brand-yellow/30 p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 font-heading">
            Ready to Accelerate Your <span className="text-brand-yellow">Digital Transformation?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Speak directly with our senior technology architects to discuss your technical challenges, project scope, and receive a transparent roadmap.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-brand-yellow text-brand-navy hover:bg-brand-yellow-hover shadow-xl hover:shadow-glow-yellow transition-all"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all"
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
          <div className="space-y-6 text-slate-300 text-sm">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-xl border border-white/10"
            />
            
            <div>
              <h4 className="text-white font-bold text-base mb-1">Project Overview</h4>
              <p className="leading-relaxed">{selectedProject.fullDesc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <h5 className="text-brand-yellow font-bold text-xs uppercase tracking-wider mb-2">
                  Technical Challenge
                </h5>
                <p className="text-xs leading-relaxed">{selectedProject.challenge}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <h5 className="text-brand-yellow font-bold text-xs uppercase tracking-wider mb-2">
                  Navabharath Solution
                </h5>
                <p className="text-xs leading-relaxed">{selectedProject.solution}</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-2">Measurable Outcomes</h4>
              <ul className="space-y-2">
                {selectedProject.results.map((res, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedProject(null);
                  scrollToSection('contact');
                }}
                className="px-4 py-2 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover transition-colors cursor-pointer"
              >
                Inquire For Similar Build
              </a>
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
          <div className="space-y-5 text-sm text-slate-300">
            <p className="leading-relaxed">{selectedService.fullDesc}</p>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Key Deliverables & Architectural Standards
              </h4>
              <ul className="space-y-2">
                {selectedService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                Primary Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedService.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-yellow">
                {selectedService.stats.label}: {selectedService.stats.value}
              </span>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedService(null);
                  scrollToSection('contact');
                }}
                className="px-4 py-2 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover transition-colors cursor-pointer"
              >
                Request Consultation
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

