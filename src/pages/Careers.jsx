import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  TrendingUp, 
  HeartHandshake, 
  Stethoscope, 
  Trophy, 
  BookOpen, 
  Laptop, 
  Coffee, 
  ChevronDown, 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  ArrowUpRight,
  Upload, 
  FileText, 
  X, 
  Send, 
  Briefcase
} from 'lucide-react';
import Modal from '../components/common/Modal';
import MarqueeBanner from '../components/common/MarqueeBanner';
import CareersBackgroundAnimation from '../components/careers/CareersBackgroundAnimation';
import MagneticButton from '../components/common/MagneticButton';
import { 
  whyNavabharathData, 
  perksAndBenefitsData, 
  teamsList, 
  hiringProcessSteps, 
  jobOpenings 
} from '../data/careersData';
import { companyDetails } from '../data/companyData';
import { useNotification } from '../context/NotificationContext';

export default function Careers() {
  const { addToast } = useNotification();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [targetJobTitle, setTargetJobTitle] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openRolesRef = useRef(null);
  const hiringProcessRef = useRef(null);

  // Application Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '3-5 years',
    portfolioUrl: '',
    coverNote: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Smooth scroll helpers
  const scrollToOpenRoles = () => {
    openRolesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHiringProcess = () => {
    hiringProcessRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Check URL hash on load
  useEffect(() => {
    if (window.location.hash === '#open-roles' || window.location.hash === '#roles') {
      setTimeout(() => scrollToOpenRoles(), 400);
    } else if (window.location.hash === '#process' || window.location.hash === '#hiring-process') {
      setTimeout(() => scrollToHiringProcess(), 400);
    }
  }, []);

  // Filter jobs by selected department
  const filteredJobs = useMemo(() => {
    if (selectedTeam === 'All Teams') return jobOpenings;
    return jobOpenings.filter((job) => 
      job.department.toLowerCase().includes(selectedTeam.toLowerCase()) || 
      selectedTeam.toLowerCase().includes(job.department.toLowerCase())
    );
  }, [selectedTeam]);

  const getWhyIcon = (iconName) => {
    const iconClass = "w-7 h-7 text-brand-royal group-hover:text-white transition-colors duration-300";
    switch (iconName) {
      case 'Rocket': 
        return <Rocket className={iconClass} />;
      case 'TrendingUp': 
        return <TrendingUp className={iconClass} />;
      case 'HeartHandshake': 
        return <HeartHandshake className={iconClass} />;
      default: 
        return <Rocket className={iconClass} />;
    }
  };

  const getPerkIcon = (iconName) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Laptop': return <Laptop className="w-6 h-6" />;
      default: return <Coffee className="w-6 h-6" />;
    }
  };

  const handleOpenApplyModal = (jobTitle) => {
    setTargetJobTitle(jobTitle);
    setIsApplyModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({ ...prev, resume: 'File exceeds 5MB limit.' }));
        return;
      }
      setResumeFile(file);
      setFormErrors((prev) => ({ ...prev, resume: null }));
    }
  };

  const handlePhoneChange = (e) => {
    const rawVal = e.target.value;
    let digits = rawVal.replace(/\D/g, '');

    if (digits.startsWith('91') && digits.length > 10) {
      digits = digits.slice(2);
    } else if (digits.startsWith('0') && digits.length > 10) {
      digits = digits.slice(1);
    }

    digits = digits.slice(0, 10);

    setFormData((prev) => ({ ...prev, phone: digits }));
    if (formErrors.phone) {
      setFormErrors((prev) => ({ ...prev, phone: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your legal full name.';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide a contact phone number.';
    } else if (formData.phone.length !== 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!resumeFile) {
      errors.resume = 'Please attach your resume document.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSubmitting(false);
            setIsApplyModalOpen(false);
            setUploadProgress(0);
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              experience: '3-5 years',
              portfolioUrl: '',
              coverNote: ''
            });
            setResumeFile(null);
            addToast(`Application for "${targetJobTitle}" submitted successfully! Our recruiting team will review your profile.`, 'success', 5000);
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  return (
    <div className="pt-24 pb-0 bg-brand-light min-h-screen">
      {/* ===================== HERO: BUILD THE FUTURE WITH US ===================== */}
      <section className="relative min-h-[75vh] flex items-center justify-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F7F9FC] to-[#EDF2F7]">
        {/* Technology Background Animation */}
        <CareersBackgroundAnimation />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Editorial Eyebrow */}
          <div className="font-mono text-xs text-brand-royal font-bold tracking-widest uppercase mb-4">
            [05 // TALENT &amp; CULTURE] · MYSURU 12.2958° N, 76.6394° E
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-navy font-heading tracking-tight mb-6 uppercase"
          >
            Build the{' '}
            <span className="text-brand-royal">
              Future
            </span>{' '}
            with Us
          </h1>

          <p
            className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
          >
            Start your career growth with us. Join a team of innovators, creators, and problem solvers dedicated to shaping the digital world.
          </p>

          {/* Action CTA Buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-12"
          >
            <MagneticButton strength={0.15}>
              <button
                onClick={scrollToOpenRoles}
                className="px-7 sm:px-8 py-3.5 rounded-xl bg-brand-royal hover:bg-brand-navy text-white font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer inline-block"
              >
                View Open Roles
              </button>
            </MagneticButton>
            <MagneticButton strength={0.15}>
              <button
                onClick={scrollToHiringProcess}
                className="px-7 sm:px-8 py-3.5 rounded-xl border border-brand-silver/80 bg-white hover:bg-brand-light text-brand-navy font-semibold text-sm sm:text-base shadow-sm transition-all cursor-pointer inline-block"
              >
                Our Hiring Process
              </button>
            </MagneticButton>
          </div>

          {/* Value Checkmarks */}
          <div
            className="flex flex-col items-center gap-3 text-slate-700 text-sm sm:text-[15px]"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0" />
                <span className="font-medium tracking-wide">Continuous Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0" />
                <span className="font-medium tracking-wide">Inclusive Culture</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0" />
              <span className="font-medium tracking-wide">High Ownership</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <MarqueeBanner />

      {/* ===================== SECTION 1: WHY NAVABHARATH TECHNOLOGIES? ===================== */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-silver/40 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-heading tracking-tight">
              Why <span className="text-brand-royal">Navabharath Technologies</span>?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal">
              We're not just building software; we're building careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whyNavabharathData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: idx * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="career-value-card group p-8 sm:p-10 flex flex-col items-start text-left justify-between"
              >
                {/* Subtle Background Radial Ambient Glows on Hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-brand-royal/5 blur-2xl group-hover:bg-brand-royal/10 transition-colors duration-500 pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-brand-royal/5 blur-2xl group-hover:bg-brand-royal/10 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10 w-full">
                  {/* Top Header Row: Icon + Value Index */}
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="career-value-icon-box w-14 h-14 rounded-2xl bg-white border border-brand-silver/60 flex items-center justify-center shadow-xs">
                      {getWhyIcon(item.icon)}
                    </div>
                    <span className="font-mono text-xs font-bold text-brand-royal/70 group-hover:text-brand-royal transition-colors tracking-widest uppercase">
                      [0{idx + 1}]
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-brand-navy font-heading mb-3 group-hover:text-brand-royal transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal group-hover:text-slate-700 transition-colors">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 2: PERKS & BENEFITS ===================== */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-light to-white border-t border-brand-silver/40 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-heading tracking-tight">
              Perks &amp; <span className="text-brand-royal">Benefits</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal">
              We take care of our team so they can take care of our customers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {perksAndBenefitsData.map((perk) => (
              <div
                key={perk.id}
                className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-brand-silver/60 hover:border-brand-royal/50 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer overflow-hidden"
              >
                <div className="relative text-brand-royal group-hover:scale-105 transition-all duration-200">
                  {getPerkIcon(perk.icon)}
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <h4 className="text-sm sm:text-base font-bold text-brand-navy font-heading leading-snug group-hover:text-brand-royal transition-colors">
                    {perk.title}
                  </h4>
                  <span className="w-0 group-hover:w-8 h-0.5 bg-brand-royal rounded-full transition-all duration-200 mt-2 block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 3: OPEN ROLES & OUR HIRING PROCESS ===================== */}
      <section 
        ref={openRolesRef}
        id="open-roles"
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-brand-silver/40 text-slate-700"
      >
        <div className="max-w-6xl mx-auto">
          {/* Part A: Open Roles (Alpha Groups India Editorial Reference) */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="font-mono text-xs text-brand-royal font-bold tracking-widest uppercase mb-3">
              [05 // TALENT OPPORTUNITIES]
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-heading tracking-tight mb-4 uppercase">
              OPEN <span className="bg-[#101F3C] text-white px-3.5 py-0.5 rounded-md inline-block shadow-sm">ROLES</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Explore active positions across all teams and build the next generation of enterprise software with Navabharath Technologies.
            </p>

            {/* Dropdown Menu & Filter Pill (Mobile) */}
            <div className="relative inline-block text-left mt-6 mb-4 sm:hidden">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="border border-brand-silver/80 hover:border-brand-royal rounded-xl px-5 py-2.5 bg-white text-brand-navy font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-4 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-royal/40 cursor-pointer min-w-[200px] justify-between"
              >
                <span>{selectedTeam}</span>
                <ChevronDown className={`w-4 h-4 text-brand-royal transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border border-brand-silver/60 py-2 z-30"
                  >
                    {teamsList.map((team) => (
                      <button
                        key={team}
                        onClick={() => {
                          setSelectedTeam(team);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                          selectedTeam === team
                            ? 'bg-brand-royal/10 text-brand-royal font-bold'
                            : 'text-slate-700 hover:text-brand-navy hover:bg-brand-light'
                        }`}
                      >
                        <span>{team}</span>
                        {selectedTeam === team && <CheckCircle2 className="w-4 h-4 text-brand-royal" />}
                      </button>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Filter Pill Buttons (Desktop & Tablet) */}
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-2.5 mt-8">
              {teamsList.map((team) => (
                <button
                  key={team}
                  onClick={() => setSelectedTeam(team)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedTeam === team
                      ? 'bg-[#101F3C] text-white font-bold shadow-md border border-[#101F3C]'
                      : 'bg-white text-slate-700 border border-brand-silver/70 hover:border-[#101F3C]/60 hover:text-brand-navy hover:bg-brand-light'
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>

          {/* Job Openings Editorial Rows List (Inspired by Alpha Groups India) */}
          <div className="rounded-2xl border border-brand-silver/60 bg-white overflow-hidden shadow-sm divide-y divide-brand-silver/50 mb-20">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => {
                const formattedIndex = String(index + 1).padStart(2, '0');
                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedJob(job);
                      }
                    }}
                    className="group relative p-6 sm:p-8 lg:px-10 bg-white hover:bg-[#101F3C] transition-all duration-300 ease-out cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-6 overflow-hidden"
                  >
                    {/* Left & Center Information */}
                    <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
                      {/* Monospace Index e.g. /01 */}
                      <span className="font-mono text-base sm:text-lg font-bold text-slate-400 group-hover:text-white transition-colors duration-200 flex-shrink-0 pt-0.5">
                        /{formattedIndex}
                      </span>

                      <div className="space-y-2 flex-1 min-w-0">
                        {/* Title in bold uppercase */}
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-navy group-hover:text-white font-heading tracking-tight uppercase transition-colors duration-200">
                          {job.title}
                        </h3>

                        {/* Meta Tags: Type, Experience, Location */}
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded border border-brand-silver/70 group-hover:border-white/20 bg-brand-light group-hover:bg-white/10 text-slate-700 group-hover:text-white transition-colors duration-200">
                            {job.type}
                          </span>
                          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded border border-brand-silver/70 group-hover:border-white/20 bg-brand-light group-hover:bg-white/10 text-slate-700 group-hover:text-white transition-colors duration-200">
                            {job.experience}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-[#C4CCD5] transition-colors duration-200 pl-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-brand-royal group-hover:text-white transition-colors duration-200 flex-shrink-0" />
                            <span>{job.location}</span>
                          </div>
                        </div>

                        {/* Overview snippet */}
                        <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-300 transition-colors duration-200 leading-relaxed max-w-3xl line-clamp-2 pt-0.5">
                          {job.overview}
                        </p>
                      </div>
                    </div>

                    {/* Right Side: Department Tag + Arrow + Action Buttons */}
                    <div className="flex flex-wrap lg:flex-nowrap items-center justify-between lg:justify-end gap-3 sm:gap-4 flex-shrink-0 pt-2 lg:pt-0">
                      {/* Department Tag & Animated Arrow Box (matching Alpha Groups reference) */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded border border-brand-silver/80 group-hover:border-white/40 text-brand-navy group-hover:text-white bg-white group-hover:bg-white/10 transition-all duration-200 shadow-sm">
                          {job.department}
                        </span>

                        {/* Animated Arrow ↗ */}
                        <div className="w-9 h-9 rounded-lg border border-brand-silver/80 group-hover:border-white/40 flex items-center justify-center text-brand-navy group-hover:text-white bg-white group-hover:bg-white/10 transition-all duration-300 shadow-sm">
                          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </div>
                      </div>

                      {/* Explicit Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJob(job);
                          }}
                          className="px-4 py-2 rounded-xl bg-brand-light hover:bg-white group-hover:bg-white/10 group-hover:hover:bg-white text-slate-700 hover:text-brand-navy group-hover:text-white group-hover:hover:text-[#101F3C] border border-brand-silver/70 group-hover:border-white/30 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                        >
                          Job Specs
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenApplyModal(job.title);
                          }}
                          className="px-5 py-2 rounded-xl bg-brand-royal hover:bg-brand-navy group-hover:bg-white group-hover:text-[#101F3C] group-hover:hover:bg-brand-royal group-hover:hover:text-white text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all duration-200 cursor-pointer"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl">
                <Briefcase className="w-12 h-12 text-brand-royal mx-auto mb-3" />
                <h4 className="text-lg font-bold text-brand-navy mb-1">No Openings in {selectedTeam} Right Now</h4>
                <p className="text-sm text-slate-500 mb-4">We are actively expanding. Submit a general application or check other teams.</p>
                <button
                  type="button"
                  onClick={() => setSelectedTeam('All Teams')}
                  className="px-5 py-2 rounded-xl bg-brand-royal text-white hover:bg-brand-navy text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  View All Roles
                </button>
              </div>
            )}
          </div>

          {/* Part B: Our Hiring Process */}
          <div 
            ref={hiringProcessRef}
            id="hiring-process"
            className="pt-10 border-t border-brand-silver/40"
          >
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy font-heading tracking-tight">
                Our <span className="text-brand-royal">Hiring Process</span>
              </h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Connecting line on desktop */}
              <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 border-t-2 border-dashed border-brand-silver/60 -z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                {hiringProcessSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex flex-col items-center text-center group cursor-default"
                  >
                    {/* Circle badge */}
                    <div 
                      className={`w-12 h-12 rounded-full bg-brand-light text-brand-royal border-2 border-brand-royal/30 font-bold text-lg flex items-center justify-center shadow-sm transition-all duration-200 group-hover:bg-brand-royal group-hover:text-white ${
                        step.step === 4 ? 'ring-4 ring-brand-royal/20 border-brand-royal' : ''
                      }`}
                    >
                      {step.step}
                    </div>

                    <h3 className="font-bold text-brand-navy font-heading text-base sm:text-lg mt-4 mb-1 group-hover:text-brand-royal transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed max-w-[170px]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GENERAL APPLICATION BANNER ===================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-light">
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-navy via-[#1B3E73] to-brand-navy border border-brand-steel/40 text-center text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-2">
            Don't See Your Exact Specialty?
          </h3>
          <p className="text-sm text-[#C4CCD5] max-w-lg mx-auto mb-6 leading-relaxed">
            We are always interested in connecting with passionate software engineers, cloud architects, and product specialists.
          </p>
          <button
            onClick={() => handleOpenApplyModal('General Open Talent Application')}
            className="px-8 py-3.5 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-brand-navy shadow-md transition-colors cursor-pointer"
          >
            Send Spontaneous Application
          </button>
        </div>
      </section>

      {/* ===================== JOB SPECS MODAL ===================== */}
      {selectedJob && (
        <Modal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title={selectedJob.title}
          subtitle={`${selectedJob.department} • ${selectedJob.location}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6 text-sm text-slate-700">
            <div>
              <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-2">
                Position Overview
              </h4>
              <p className="leading-relaxed text-slate-600">{selectedJob.overview}</p>
            </div>

            <div>
              <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
                Core Responsibilities
              </h4>
              <ul className="space-y-2 text-xs">
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
                Candidate Requirements
              </h4>
              <ul className="space-y-2 text-xs">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-royal flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-brand-navy font-bold text-xs uppercase tracking-wider mb-2">
                Position Benefits
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.benefits.map((b, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded bg-brand-light text-slate-700 border border-brand-silver/50">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-silver/40 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Contact: {companyDetails.careersEmail}
              </span>
              <button
                onClick={() => {
                  const title = selectedJob.title;
                  setSelectedJob(null);
                  handleOpenApplyModal(title);
                }}
                className="px-6 py-2.5 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy shadow-md transition-colors cursor-pointer"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================== RESUME APPLICATION MODAL ===================== */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Submit Career Application"
        subtitle={`Role: ${targetJobTitle}`}
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs text-slate-700">
          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Full Legal Name <span className="text-brand-royal">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. John Doe"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-light border ${
                formErrors.fullName ? 'border-red-400' : 'border-brand-silver/60'
              } text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-royal text-xs`}
            />
            {formErrors.fullName && <p className="text-red-500 text-[11px] mt-1">{formErrors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-brand-navy mb-1">
                Email Address <span className="text-brand-royal">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-light border ${
                  formErrors.email ? 'border-red-400' : 'border-brand-silver/60'
                } text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-royal text-xs`}
              />
              {formErrors.email && <p className="text-red-500 text-[11px] mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-semibold text-brand-navy">
                  Phone Number <span className="text-brand-royal">*</span>
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  {formData.phone ? `${formData.phone.length}/10 digits` : '10 digits'}
                </span>
              </div>
              <div className="relative flex items-center">
                {/* Fixed +91 Country Code Badge */}
                <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pr-2.5 pointer-events-none border-r border-brand-silver/50 my-1.5 gap-1.5 select-none">
                  <span className="text-sm leading-none" role="img" aria-label="India flag">🇮🇳</span>
                  <span className="font-mono text-xs font-bold text-brand-navy">+91</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="98765 43210"
                  className={`w-full pl-[78px] pr-3.5 py-2.5 rounded-xl bg-brand-light border ${
                    formErrors.phone ? 'border-red-400' : 'border-brand-silver/60'
                  } text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-royal focus:bg-white text-xs font-mono transition-colors`}
                />
              </div>
              {formErrors.phone && <p className="text-red-500 text-[11px] mt-1">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-brand-navy mb-1">Relevant Experience</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-light border border-brand-silver/60 text-brand-navy focus:outline-none focus:border-brand-royal text-xs"
              >
                <option value="1-3 years">1 - 3 Years</option>
                <option value="3-5 years">3 - 5 Years</option>
                <option value="5-8 years">5 - 8 Years</option>
                <option value="8+ years">8+ Years (Lead / Principal)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-brand-navy mb-1">LinkedIn / Portfolio URL</label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-light border border-brand-silver/60 text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-royal text-xs"
              />
            </div>
          </div>

          {/* Resume Upload Picker */}
          <div>
            <label className="block font-semibold text-brand-navy mb-1">
              Resume Document (PDF / Word, Max 5MB) <span className="text-brand-royal">*</span>
            </label>
            <div className="relative border-2 border-dashed border-brand-silver/80 hover:border-brand-royal/60 rounded-xl p-4 text-center cursor-pointer transition-colors bg-brand-light">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {resumeFile ? (
                <div className="flex items-center justify-center gap-2 text-brand-royal">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold text-xs text-brand-navy">{resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)} KB)</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-500">
                  <Upload className="w-5 h-5 text-brand-royal mb-1" />
                  <span className="text-xs text-brand-navy font-medium">Click or drag resume file here</span>
                  <span className="text-[10px]">PDF, DOC, DOCX supported up to 5MB</span>
                </div>
              )}
            </div>
            {formErrors.resume && <p className="text-red-500 text-[11px] mt-1">{formErrors.resume}</p>}
          </div>

          <div>
            <label className="block font-semibold text-brand-navy mb-1">Candidate Statement / Cover Note</label>
            <textarea
              rows={3}
              value={formData.coverNote}
              onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
              placeholder="Tell us briefly about your primary technical strengths and why you're interested in Navabharath Technologies..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-light border border-brand-silver/60 text-brand-navy placeholder-slate-400 focus:outline-none focus:border-brand-royal text-xs resize-none"
            />
          </div>

          {isSubmitting && (
            <div className="space-y-1">
              <div className="w-full bg-brand-silver/40 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-royal h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="text-center text-[10px] text-slate-500 font-mono">Uploading Application Package... {uploadProgress}%</p>
            </div>
          )}

          <div className="pt-3 border-t border-brand-silver/40 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="text-xs text-slate-500 hover:text-brand-navy cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-brand-royal text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-navy shadow-md flex items-center gap-2 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Application</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
