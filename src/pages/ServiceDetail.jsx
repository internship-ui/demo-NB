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
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-28 bg-brand-light">
        <span className="text-6xl font-extrabold text-brand-royal font-heading mb-4">404</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-3">Service Not Found</h1>
        <p className="text-sm text-slate-600 max-w-md mb-8">
          The service practice you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/services"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-navy to-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md transition-all"
        >
          View All Services
        </Link>
      </div>
    );
  }

  const getServiceIcon = (iconName) => {
    const props = { className: "w-10 h-10 text-brand-royal" };
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
    <div className="pt-28 pb-20 bg-brand-light text-slate-700">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-brand-light to-white border-b border-brand-silver/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-royal/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb & Back Link */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link to="/" className="hover:text-brand-navy transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-brand-navy transition-colors">Services</Link>
            <span>/</span>
            <span className="text-brand-royal font-semibold">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-royal/10 border border-brand-royal/20 text-brand-royal text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Practice Area</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy font-heading tracking-tight leading-[1.1]">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {service.fullDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-navy to-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center gap-2"
                >
                  <span>Inquire for {service.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/services"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-brand-navy border border-brand-silver/50 font-bold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center gap-2"
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
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-white border border-brand-silver/40 flex flex-col items-center justify-center p-6 shadow-xl shadow-brand-navy/5 group">
                <div className="absolute inset-0 bg-dots-pattern opacity-5 pointer-events-none" />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-2xl bg-brand-royal/10 border-2 border-brand-royal flex items-center justify-center mb-4 shadow-sm"
                >
                  {getServiceIcon(service.icon)}
                </motion.div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-brand-navy font-heading">
                    {service.stats.value}
                  </div>
                  <div className="text-xs text-brand-royal font-semibold uppercase tracking-wider mt-1">
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
            <span className="text-xs font-bold uppercase tracking-widest text-brand-royal block mb-2">
              Capabilities Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-heading">
              What We Deliver in <span className="text-brand-royal">{service.title}</span>
            </h2>
            <p className="mt-3 text-sm text-slate-600">
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
                className="p-6 rounded-2xl bg-white border border-brand-silver/40 hover:border-brand-royal/40 transition-all flex flex-col justify-between group hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-royal/10 border border-brand-royal/20 flex items-center justify-center text-brand-royal mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-2 font-heading group-hover:text-brand-royal transition-colors">
                    {feature}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EBF2FA]/60 border-y border-brand-silver/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-royal block">
                  ROI & Strategic Advantage
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-heading">
                  Why Invest in Our {service.title}?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We don't just supply code; we build dependable digital engines that generate measurable commercial return and elevate customer satisfaction.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-brand-silver/40 hover:border-brand-royal/40 shadow-xs transition-colors flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-lg bg-brand-royal/10 text-brand-royal flex-shrink-0 mt-0.5">
                      <Zap className="w-4 h-4" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
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
              <span className="text-xs font-bold uppercase tracking-widest text-brand-royal block mb-2">
                Structured Execution
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy font-heading">
                Our Four-Stage Implementation Blueprint
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, idx) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-white border border-brand-silver/40 relative group hover:border-brand-royal/40 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="text-3xl font-extrabold text-brand-steel/30 font-heading mb-2 group-hover:text-brand-royal/40 transition-colors">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mb-2 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== TECH STACK & DELIVERABLES ===================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-silver/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tech Stack */}
          <div className="p-8 rounded-3xl bg-brand-light border border-brand-silver/40 space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-brand-navy font-heading border-b border-brand-silver/30 pb-3">
              Technologies & Frameworks
            </h3>
            <p className="text-xs text-slate-500">
              Built on battle-tested modern tools for high speed, long-term maintainability, and zero security compromise.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {service.technologies.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white text-brand-navy border border-brand-silver/60 font-semibold shadow-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="p-8 rounded-3xl bg-brand-light border border-brand-silver/40 space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-brand-navy font-heading border-b border-brand-silver/30 pb-3">
              Client Production Deliverables
            </h3>
            <p className="text-xs text-slate-500">
              Clear milestone handoffs with complete ownership and architectural transparency.
            </p>
            <ul className="space-y-2.5 pt-2">
              {service.deliverables.map((d, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0" />
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
              <span className="text-xs font-bold uppercase tracking-wider text-brand-royal block mb-1">
                More Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-heading">
                Explore Other Services
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs font-bold uppercase tracking-wider text-brand-royal hover:text-brand-navy transition-colors flex items-center gap-1.5"
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
                className="p-6 rounded-2xl bg-white border border-brand-silver/40 hover:border-brand-royal/40 transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  <h3 className="text-lg font-bold text-brand-navy font-heading group-hover:text-brand-royal transition-colors mb-2">
                    {other.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4">
                    {other.shortDesc}
                  </p>
                </div>
                <div className="text-xs font-bold text-brand-royal flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-brand-navy via-brand-navy to-brand-royal border border-brand-royal/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-xl text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-heading">
            Ready to Accelerate With <span className="text-brand-silver">{service.title}?</span>
          </h2>
          <p className="text-sm text-slate-200 max-w-xl mx-auto mb-8">
            Speak directly with our senior technology architects to discuss your technical specifications, project milestones, and receive a comprehensive proposal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-slate-100 shadow-md transition-all"
            >
              Get In Touch With Us
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Browse All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

