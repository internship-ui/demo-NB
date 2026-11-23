import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { companyDetails } from '../data/companyData';
import { useNotification } from '../context/NotificationContext';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const { addToast } = useNotification();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: preselectedService || 'Web Development',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      errors.email = 'Please provide a valid corporate email.';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      errors.phone = 'Please provide a contact phone number.';
    }
    if (!formData.message.trim() || formData.message.length < 15) {
      errors.message = 'Please describe your project (at least 15 characters).';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast('Your inquiry has been submitted! A technology consultant will contact you within 24 business hours.', 'success', 6000);
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      service: 'Web Development',
      message: ''
    });
    setFormErrors({});
  };

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 bg-brand-navy min-h-screen">
      {/* ===================== COMPACT HERO HEADER ===================== */}
      <section className="relative pt-4 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With Our Technology Team</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-3"
          >
            Let's Engineer Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-400">
              Next Digital Breakthrough
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Reach out to schedule a consultation with our senior engineering architects. We respond promptly with actionable insights, feasibility assessments, and transparent project timelines.
          </motion.p>
        </div>
      </section>

      {/* ===================== COMPACT MAIN CONTACT SECTION ===================== */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT COLUMN: COMPACT CONTACT INFORMATION CARD (5 COLS) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-brand-navy-surface border border-brand-yellow/25 hover:border-brand-yellow/40 transition-colors shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Card Header: Corporate Headquarters */}
              <div className="border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-brand-yellow" />
                    <span>Corporate Headquarters</span>
                  </h3>
                  <span className="text-[10px] font-mono text-brand-yellow/90 bg-brand-yellow/10 px-2.5 py-0.5 rounded-full border border-brand-yellow/20">
                    Mysuru, IN
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Ready to start your project? Get in touch with our team today.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-3.5 text-slate-300">
                {/* 1. Official Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider block">Official Address</span>
                    <span className="text-xs text-slate-300 leading-snug block mt-0.5">
                      {companyDetails.officialAddress}
                    </span>
                    <a
                      href="https://maps.google.com/?q=%23667%2FB+2nd+Floor+Chitrabhanu+Road+Kuvempu+Nagar+Mysore+Karnataka+570023"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-brand-yellow hover:underline mt-1 font-medium"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* 2. Email Communications */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider block">Email Communications</span>
                    <a
                      href={`mailto:${companyDetails.email}`}
                      className="text-xs text-brand-yellow hover:underline block mt-0.5 font-medium truncate"
                    >
                      {companyDetails.email}
                    </a>
                  </div>
                </div>

                {/* 3. Direct Telephone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider block">Direct Telephone</span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-brand-yellow font-medium">
                      <a href="tel:+917996078472" className="hover:underline">
                        +91-7996078472
                      </a>
                      <span className="text-slate-500">•</span>
                      <a href="tel:+918213128831" className="hover:underline">
                        +91-8213128831
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4. Operational Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider block">Operational Working Hours</span>
                    <span className="text-xs text-slate-300 block mt-0.5">
                      {companyDetails.businessHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: Corporate Verification & Compliance + Social Channels */}
            <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
              {/* 5. Corporate Verification & Compliance */}
              <div className="p-3 rounded-xl bg-brand-navy-card/90 border border-brand-yellow/20 text-xs text-slate-400 space-y-0.5">
                <div className="flex items-center gap-1.5 text-brand-yellow font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Corporate Verification & Compliance</span>
                </div>
                <div className="font-mono text-slate-300 text-[11px]">{companyDetails.cin}</div>
                <div className="text-[10px] text-slate-400">Official registration documents available upon mutual NDA.</div>
              </div>

              {/* 6. Social Media Links */}
              <div>
                <span className="text-[11px] font-bold text-white uppercase tracking-wider block mb-2">
                  Follow Our Social Channels
                </span>
                <div className="flex items-center gap-2">
                  {companyDetails.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-brand-navy hover:bg-brand-yellow hover:border-brand-yellow transition-all"
                      aria-label={social.name}
                    >
                      {social.name.includes('LinkedIn') && <Linkedin className="w-3.5 h-3.5" />}
                      {social.name.includes('Twitter') && <Twitter className="w-3.5 h-3.5" />}
                      {social.name.includes('GitHub') && <Github className="w-3.5 h-3.5" />}
                      {social.name.includes('Instagram') && <Instagram className="w-3.5 h-3.5" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: COMPACT CONTACT FORM (7 COLS) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 p-5 sm:p-7 rounded-2xl bg-brand-navy-surface border border-brand-yellow/30 hover:border-brand-yellow/45 transition-colors relative overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full pointer-events-none" />

            <div className="mb-4 relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-1">
                Initiate a Technology Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Complete this form to receive a preliminary architectural consultation and project scope estimation.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 px-4 text-center space-y-3.5 my-auto"
              >
                <div className="w-14 h-14 rounded-full bg-brand-yellow/20 border-2 border-brand-yellow flex items-center justify-center mx-auto text-brand-yellow mb-2 shadow-glow-yellow">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  Consultation Request Received!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Our enterprise solutions team has received your project parameters for{' '}
                  <span className="text-brand-yellow font-semibold">{formData.service}</span>.
                </p>
                <p className="text-[11px] text-slate-400">
                  A designated technical lead will connect via {formData.email} within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-300 relative z-10">
                {/* Row 1: Your Full Name & Work / Corporate Email (2 cols desktop, 1 col mobile) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-semibold text-white mb-1">
                      Your Full Name <span className="text-brand-yellow">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikram Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border ${
                        formErrors.fullName ? 'border-red-400' : 'border-white/10'
                      } text-white focus:outline-none focus:border-brand-yellow text-xs transition-colors`}
                    />
                    {formErrors.fullName && <p className="text-red-400 text-[10px] mt-0.5">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold text-white mb-1">
                      Work / Corporate Email <span className="text-brand-yellow">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="v.sharma@enterprise.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border ${
                        formErrors.email ? 'border-red-400' : 'border-white/10'
                      } text-white focus:outline-none focus:border-brand-yellow text-xs transition-colors`}
                    />
                    {formErrors.email && <p className="text-red-400 text-[10px] mt-0.5">{formErrors.email}</p>}
                  </div>
                </div>

                {/* Row 2: Contact Phone & Service Required (2 cols desktop, 1 col mobile) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-semibold text-white mb-1">
                      Contact Phone <span className="text-brand-yellow">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border ${
                        formErrors.phone ? 'border-red-400' : 'border-white/10'
                      } text-white focus:outline-none focus:border-brand-yellow text-xs transition-colors`}
                    />
                    {formErrors.phone && <p className="text-red-400 text-[10px] mt-0.5">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold text-white mb-1">Service Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border border-white/10 text-white focus:outline-none focus:border-brand-yellow text-xs"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Software Development">Software Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Digital Solutions">Digital Solutions</option>
                      <option value="Software Testing & QA">Software Testing & QA</option>
                      <option value="Enterprise Architecture Assessment">Enterprise Architecture Assessment</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Project Requirements & Target Milestones (textarea) */}
                <div>
                  <label className="block font-semibold text-white mb-1">
                    Project Requirements & Target Milestones <span className="text-brand-yellow">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please share details regarding your technical requirements, expected timelines, existing stack, and operational objectives..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border ${
                      formErrors.message ? 'border-red-400' : 'border-white/10'
                    } text-white focus:outline-none focus:border-brand-yellow text-xs transition-colors resize-none`}
                  />
                  {formErrors.message && <p className="text-red-400 text-[10px] mt-0.5">{formErrors.message}</p>}
                </div>

                {/* Submit Consultation Request Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover shadow-lg hover:shadow-glow-yellow transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-brand-navy border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Consultation Request</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-center text-slate-400 mt-1">
                  Protected by strict NDA and ISO-compliant security. No unsolicited communications.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
