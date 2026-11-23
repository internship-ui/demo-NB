import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Bot, 
  Cloud, 
  Smartphone, 
  Globe, 
  Palette, 
  Megaphone, 
  PhoneCall, 
  Cpu, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Zap, 
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = servicesData.find((s) => s.id === serviceId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-28">
        <span className="text-6xl font-extrabold text-brand-yellow font-heading mb-4">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Service Not Found</h1>
        <p className="text-sm text-slate-300 max-w-md mb-8">
          The service practice you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/services"
          className="px-6 py-3 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover transition-colors"
        >
          View All Services
        </Link>
      </div>
    );
  }

  const getServiceIcon = (iconName) => {
    const props = { className: "w-10 h-10 text-brand-yellow" };
    switch (iconName) {
      case 'Bot': return <Bot {...props} />;
      case 'Cloud': return <Cloud {...props} />;
      case 'Smartphone': return <Smartphone {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Megaphone': return <Megaphone {...props} />;
      case 'PhoneCall': return <PhoneCall {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  const otherServices = servicesData.filter((s) => s.id !== serviceId).slice(0, 3);

  return (
    <div className="pt-28 pb-20">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb & Back Link */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-brand-yellow font-medium">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Practice Area</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight leading-[1.1]">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {service.fullDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="px-8 py-3.5 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover shadow-lg hover:shadow-glow-yellow transition-all flex items-center gap-2"
                >
                  <span>Inquire for {service.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/services"
                  className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All Services</span>
                </Link>
              </div>
            </motion.div>

            {/* Glowing Icon Showcase Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 flex justify-center"
            >
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-brand-navy-surface border border-brand-yellow/30 flex flex-col items-center justify-center p-6 shadow-2xl shadow-brand-navy-dark/90 group">
                <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none" />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-2xl bg-brand-navy-card border-2 border-brand-yellow flex items-center justify-center mb-4 shadow-glow-yellow"
                >
                  {getServiceIcon(service.icon)}
                </motion.div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-white font-heading">
                    {service.stats.value}
                  </div>
                  <div className="text-xs text-brand-yellow font-semibold uppercase tracking-wider mt-1">
                    {service.stats.label}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== CORE FEATURES & CAPABILITIES ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow block mb-2">
              Capabilities Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              What We Deliver in <span className="text-brand-yellow">{service.title}</span>
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Engineered with proven frameworks and tailored to eliminate enterprise bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-brand-navy-surface border border-white/10 hover:border-brand-yellow/40 transition-all flex flex-col justify-between group hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-brand-yellow transition-colors">
                    {feature}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Designed for resilience, enterprise compliance, and frictionless production deployment.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== STRATEGIC BUSINESS BENEFITS ===================== */}
      {service.benefits && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark/80 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow block">
                  ROI & Strategic Advantage
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                  Why Invest in Our {service.title}?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We don't just supply code; we build dependable digital engines that generate measurable commercial return and elevate customer satisfaction.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-brand-navy-surface border border-white/10 hover:border-brand-yellow/30 transition-colors flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-lg bg-brand-yellow/15 text-brand-yellow flex-shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===================== IMPLEMENTATION WORKFLOW ===================== */}
      {service.process && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow block mb-2">
                Structured Execution
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                Our Four-Stage Implementation Blueprint
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, idx) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-brand-navy-surface border border-white/10 relative group hover:border-brand-yellow/40 transition-colors"
                >
                  <div className="text-3xl font-extrabold text-brand-yellow/30 font-heading mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== TECH STACK & DELIVERABLES ===================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark/90 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tech Stack */}
          <div className="p-8 rounded-3xl bg-brand-navy-surface border border-white/10 space-y-4">
            <h3 className="text-xl font-bold text-white font-heading border-b border-white/10 pb-3">
              Technologies & Frameworks
            </h3>
            <p className="text-xs text-slate-400">
              Built on battle-tested modern tools for high speed, long-term maintainability, and zero security compromise.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {service.technologies.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 text-brand-yellow border border-brand-yellow/20"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="p-8 rounded-3xl bg-brand-navy-surface border border-white/10 space-y-4">
            <h3 className="text-xl font-bold text-white font-heading border-b border-white/10 pb-3">
              Client Production Deliverables
            </h3>
            <p className="text-xs text-slate-400">
              Clear milestone handoffs with complete ownership and architectural transparency.
            </p>
            <ul className="space-y-2.5 pt-2">
              {service.deliverables.map((d, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===================== EXPLORE OTHER SERVICES ===================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-yellow block mb-1">
                More Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                Explore Other Services
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs font-bold uppercase tracking-wider text-brand-yellow hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>View All 7 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((other) => (
              <div
                key={other.id}
                onClick={() => navigate(`/services/${other.id}`)}
                className="p-6 rounded-2xl bg-brand-navy-surface border border-white/10 hover:border-brand-yellow/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-brand-yellow transition-colors mb-2">
                    {other.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                    {other.shortDesc}
                  </p>
                </div>
                <div className="text-xs font-bold text-brand-yellow flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL GET IN TOUCH CTA ===================== */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-navy-surface via-brand-navy-card to-brand-navy-surface border border-brand-yellow/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-heading">
            Ready to Accelerate With <span className="text-brand-yellow">{service.title}?</span>
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8">
            Speak directly with our senior technology architects to discuss your technical specifications, project milestones, and receive a comprehensive proposal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover shadow-lg transition-colors"
            >
              Get In Touch With Us
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Browse All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

