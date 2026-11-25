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
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 bg-brand-light min-h-screen">
      {/* ===================== COMPACT HERO HEADER ===================== */}
      <section className="relative pt-4 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        <div className="relative max-w-4xl mx-auto">
          {/* Editorial Eyebrow */}
          <div className="font-mono text-xs text-brand-royal font-bold tracking-widest uppercase mb-4">
            [06 // INITIATE DIALOGUE] · MYSURU 12.2958° N, 76.6394° E
          </div>

          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-royal/25 text-brand-royal text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-royal" />
            <span>Connect With Our Technology Team</span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-heading tracking-tight mb-3 uppercase"
          >
            Let's Engineer Your{' '}
            <span className="text-brand-royal underline decoration-brand-steel/30 decoration-wavy underline-offset-8">
              Digital Breakthrough
            </span>
          </h1>

          <p
            className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Reach out to schedule a consultation with our senior engineering architects. We respond promptly with actionable insights, feasibility assessments, and transparent project timelines.
          </p>
        </div>
      </section>

      {/* ===================== MAIN CONTACT SECTION ===================== */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT COLUMN: CONTACT INFORMATION CARD */}
          <div
            className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white border border-brand-silver/60 hover:border-brand-royal/40 transition-colors shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Card Header: Corporate Headquarters */}
              <div className="border-b border-brand-silver/40 pb-3 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-brand-navy font-heading flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-brand-royal" />
                    <span>Corporate Headquarters</span>
                  </h3>
                  <span className="text-[10px] font-mono text-brand-royal bg-brand-royal/10 px-2.5 py-0.5 rounded-full border border-brand-royal/20">
                    Mysuru, IN
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Ready to start your project? Get in touch with our team today.
                </p>
              </div>

              {/* Contact Details List */}
              <div className="space-y-3.5 text-slate-700">
                {/* 1. Official Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-light border border-brand-silver/50 text-brand-royal flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">Official Address</span>
                    <span className="text-xs text-slate-600 leading-snug block mt-0.5">
                      {companyDetails.officialAddress}
                    </span>
                    <a
                      href="https://maps.google.com/?q=%23667%2FB+2nd+Floor+Chitrabhanu+Road+Kuvempu+Nagar+Mysore+Karnataka+570023"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-brand-royal hover:underline mt-1 font-medium"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* 2. Email Communications */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-light border border-brand-silver/50 text-brand-royal flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">Email Communications</span>
                    <a
                      href={`mailto:${companyDetails.email}`}
                      className="text-xs text-brand-royal hover:underline block mt-0.5 font-medium truncate"
                    >
                      {companyDetails.email}
                    </a>
                  </div>
                </div>

                {/* 3. Direct Telephone */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-light border border-brand-silver/50 text-brand-royal flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">Direct Telephone</span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-brand-royal font-medium">
                      <a href="tel:+917996078472" className="hover:underline">
                        +91-7996078472
                      </a>
                      <span className="text-slate-400">•</span>
                      <a href="tel:+918213128831" className="hover:underline">
                        +91-8213128831
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4. Operational Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-light border border-brand-silver/50 text-brand-royal flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">Operational Working Hours</span>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      {companyDetails.businessHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: Corporate Verification & Compliance + Social Channels */}
            <div className="mt-4 pt-3 border-t border-brand-silver/40 space-y-3">
              {/* 5. Corporate Verification & Compliance */}
              <div className="p-3 rounded-xl bg-brand-light border border-brand-silver/50 text-xs text-slate-600 space-y-0.5">
                <div className="flex items-center gap-1.5 text-brand-royal font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Corporate Verification &amp; Compliance</span>
                </div>
                <div className="font-mono text-brand-navy text-[11px]">{companyDetails.cin}</div>
                <div className="text-[10px] text-slate-500">Official registration documents available upon mutual NDA.</div>
              </div>

              {/* 6. Social Media Links */}
              <div>
                <span className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block mb-2">
                  Follow Our Social Channels
                </span>
                <div className="flex items-center gap-2">
                  {companyDetails.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-brand-light border border-brand-silver/50 text-slate-700 hover:text-white hover:bg-brand-royal hover:border-brand-royal transition-all"
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
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div
            className="lg:col-span-7 p-5 sm:p-7 rounded-2xl bg-white border border-brand-silver/60 hover:border-brand-royal/40 transition-colors relative overflow-hidden shadow-md flex flex-col justify-between"
          >
            <div className="mb-4 relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-navy font-heading mb-1">
                Initiate a Technology Consultation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Complete this form to receive a preliminary architectural consultation and project scope estimation.
              </p>
            </div>

            {isSubmitted ? (
              <div
                className="py-10 px-4 text-center space-y-3.5 my-auto"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-600 mb-2 shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-brand-navy font-heading">
                  Consultation Request Received!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-brand-navy font-semibold">{formData.fullName}</span>. Our enterprise solutions team has received your project parameters for{' '}
                  <span className="text-brand-royal font-semibold">{formData.service}</span>.
                </p>
                <p className="text-[11px] text-slate-500">
                  A designated technical lead will connect via {formData.email} within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy transition-colors cursor-pointer shadow-sm"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-700 relative z-10">
                {/* Row 1: Your Full Name & Work / Corporate Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-semibold text-brand-navy mb-1">
                      Your Full Name <span className="text-brand-royal">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikram Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-light border ${
                        formErrors.fullName ? 'border-red-400' : 'border-brand-silver/60'
                      } text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-royal focus:bg-white text-xs transition-colors`}
                    />
                    {formErrors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-navy mb-1">
                      Work / Corporate Email <span className="text-brand-royal">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="v.sharma@enterprise.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-light border ${
                        formErrors.email ? 'border-red-400' : 'border-brand-silver/60'
                      } text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-royal focus:bg-white text-xs transition-colors`}
                    />
                    {formErrors.email && <p className="text-red-500 text-[10px] mt-0.5">{formErrors.email}</p>}
                  </div>
                </div>

                {/* Row 2: Contact Phone & Service Required */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-semibold text-brand-navy mb-1">
                      Contact Phone <span className="text-brand-royal">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-light border ${
                        formErrors.phone ? 'border-red-400' : 'border-brand-silver/60'
                      } text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-royal focus:bg-white text-xs transition-colors`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-[10px] mt-0.5">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold text-brand-navy mb-1">Service Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-light border border-brand-silver/60 text-brand-navy focus:outline-none focus:border-brand-royal focus:bg-white text-xs"
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

                {/* Row 3: Project Requirements & Target Milestones */}
                <div>
                  <label className="block font-semibold text-brand-navy mb-1">
                    Project Requirements &amp; Target Milestones <span className="text-brand-royal">*</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please share details regarding your technical requirements, expected timelines, existing stack, and operational objectives..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-light border ${
                      formErrors.message ? 'border-red-400' : 'border-brand-silver/60'
                    } text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-royal focus:bg-white text-xs transition-colors resize-none`}
                  />
                  {formErrors.message && <p className="text-red-500 text-[10px] mt-0.5">{formErrors.message}</p>}
                </div>

                {/* Submit Consultation Request Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-navy to-brand-royal text-white hover:opacity-95 font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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

                <p className="text-[10px] text-center text-slate-500 mt-1">
                  Protected by strict NDA and ISO-compliant security. No unsolicited communications.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
