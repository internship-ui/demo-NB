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
  Upload, 
  FileText, 
  X, 
  Send, 
  Briefcase
} from 'lucide-react';
import Modal from '../components/common/Modal';
import CareersBackgroundAnimation from '../components/careers/CareersBackgroundAnimation';
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
    switch (iconName) {
      case 'Rocket': 
        return <Rocket className="w-7 h-7 text-brand-yellow" />;
      case 'TrendingUp': 
        return <TrendingUp className="w-7 h-7 text-brand-yellow" />;
      case 'HeartHandshake': 
        return <HeartHandshake className="w-7 h-7 text-brand-yellow" />;
      default: 
        return <Rocket className="w-7 h-7 text-brand-yellow" />;
    }
  };

  const getPerkIcon = (iconName) => {
    switch (iconName) {
      case 'Stethoscope': 
        return <Stethoscope className="w-8 h-8 text-brand-yellow" />;
      case 'Trophy': 
        return <Trophy className="w-8 h-8 text-brand-yellow" />;
      case 'BookOpen': 
        return <BookOpen className="w-8 h-8 text-brand-yellow" />;
      case 'Laptop': 
        return <Laptop className="w-8 h-8 text-brand-yellow" />;
      case 'Coffee': 
        return <Coffee className="w-8 h-8 text-brand-yellow" />;
      default: 
        return <Trophy className="w-8 h-8 text-brand-yellow" />;
    }
  };

  const handleOpenApplyModal = (jobTitle = '') => {
    setTargetJobTitle(jobTitle || 'General Engineering Application');
    setIsApplyModalOpen(true);
    setFormErrors({});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('File size must be under 5MB.', 'error');
        return;
      }
      const allowedTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedTypes.includes(file.type)) {
        addToast('Please upload a PDF or Word document (.pdf, .doc, .docx).', 'error');
        return;
      }
      setResumeFile(file);
      addToast(`Attached: ${file.name}`, 'info');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errors.phone = 'Please provide a valid contact number.';
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
    <div className="pt-24 pb-0 bg-brand-navy">
      {/* ===================== HERO: BUILD THE FUTURE WITH US ===================== */}
      <section className="relative min-h-[75vh] flex items-center justify-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#071B3A]">
        {/* Professional Technology Background Animation */}
        <CareersBackgroundAnimation />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight mb-6"
          >
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-400">Future</span> with Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
          >
            Start your career growth with us. Join a team of innovators, creators, and problem solvers dedicated to shaping the digital world.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-12"
          >
            <button
              onClick={scrollToOpenRoles}
              className="px-7 sm:px-8 py-3.5 rounded-xl bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-sm sm:text-base shadow-lg hover:shadow-glow-yellow hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              View Open Roles
            </button>
            <button
              onClick={scrollToHiringProcess}
              className="px-7 sm:px-8 py-3.5 rounded-xl border border-brand-yellow/40 bg-brand-navy-surface/80 hover:bg-white/10 text-white font-semibold text-sm sm:text-base backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Our Hiring Process
            </button>
          </motion.div>

          {/* Value Checkmarks */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-3 text-white text-sm sm:text-[15px]"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <span className="font-medium tracking-wide text-slate-200">Continuous Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <span className="font-medium tracking-wide text-slate-200">Inclusive Culture</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0" />
              <span className="font-medium tracking-wide text-slate-200">High Ownership</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== SECTION 1: WHY NAVABHARATH TECHNOLOGIES? ===================== */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-navy border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
              Why <span className="text-brand-yellow">Navabharath Technologies</span>?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-normal">
              We're not just building software; we're building careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {whyNavabharathData.map((item) => (
              <div
                key={item.id}
                className="bg-brand-navy-surface rounded-[28px] p-8 sm:p-10 shadow-xl border border-white/10 hover:border-brand-yellow/60 hover:shadow-[0_16px_40px_rgba(7,27,58,0.7),0_0_24px_rgba(255,201,40,0.18)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left group overflow-hidden relative"
              >
                {/* Subtle Sheen */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-yellow/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="w-14 h-14 rounded-2xl bg-brand-navy-card border border-brand-yellow/30 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:border-brand-yellow group-hover:shadow-glow-yellow transition-all duration-300">
                  {getWhyIcon(item.icon)}
                </div>
                <h3 className="text-2xl font-bold text-white font-heading mb-3 group-hover:text-brand-yellow transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 2: PERKS & BENEFITS ===================== */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-navy-dark border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
              Perks & <span className="text-brand-yellow">Benefits</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 font-normal">
              We take care of our team so they can take care of our customers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {perksAndBenefitsData.map((perk, idx) => (
              <motion.div
                key={perk.id}
                initial={{ opacity: 0, y: 25, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ 
                  duration: 0.5, 
                  delay: idx * 0.08, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.25, ease: 'easeOut' }
                }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-brand-navy-surface rounded-2xl p-6 sm:p-8 shadow-lg border border-white/10 hover:border-brand-yellow/70 hover:shadow-[0_16px_32px_rgba(7,27,58,0.6),0_0_20px_rgba(255,201,40,0.22)] transition-all duration-300 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer overflow-hidden"
              >
                {/* Subtle Sheen Highlight on Card Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-yellow/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Animated Icon with Glow Halo */}
                <div className="relative text-brand-yellow group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 transform">
                  <div className="relative">
                    {getPerkIcon(perk.icon)}
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <h4 className="text-sm sm:text-base font-bold text-white font-heading leading-snug group-hover:text-brand-yellow transition-colors">
                    {perk.title}
                  </h4>
                  {/* Expanding Accent Bar */}
                  <span className="w-0 group-hover:w-8 h-0.5 bg-brand-yellow rounded-full transition-all duration-300 mt-2 block shadow-glow-yellow" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 3: OPEN ROLES & OUR HIRING PROCESS ===================== */}
      <section 
        ref={openRolesRef}
        id="open-roles"
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-brand-navy border-t border-white/5 text-white"
      >
        <div className="max-w-6xl mx-auto">
          {/* Part A: Open Roles */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-6">
              Open <span className="text-brand-yellow">Roles</span>
            </h2>

            {/* Dropdown Menu & Filter Pill */}
            <div className="relative inline-block text-left mb-6">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="border border-brand-yellow/40 hover:border-brand-yellow rounded-xl px-6 py-2.5 bg-brand-navy-surface text-white font-semibold text-sm inline-flex items-center gap-4 shadow-md hover:shadow-glow-yellow transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow/40 cursor-pointer min-w-[180px] justify-between"
              >
                <span>{selectedTeam}</span>
                <ChevronDown className={`w-4 h-4 text-brand-yellow transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-brand-navy-surface rounded-xl shadow-2xl border border-brand-yellow/30 py-2 z-30"
                  >
                    {teamsList.map((team) => (
                      <button
                        key={team}
                        onClick={() => {
                          setSelectedTeam(team);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          selectedTeam === team
                            ? 'bg-brand-yellow/15 text-brand-yellow font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span>{team}</span>
                        {selectedTeam === team && <CheckCircle2 className="w-4 h-4 text-brand-yellow" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Filter Pill Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {teamsList.map((team) => (
                <button
                  key={team}
                  onClick={() => setSelectedTeam(team)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedTeam === team
                      ? 'bg-brand-yellow text-brand-navy font-bold shadow-glow-yellow border border-brand-yellow scale-105'
                      : 'bg-brand-navy-surface text-slate-300 border border-white/10 hover:border-brand-yellow/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>

          {/* Job Openings Cards List with Dynamic Animations */}
          <motion.div 
            layout
            className="space-y-5 mb-24"
          >
            {filteredJobs.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ 
                      duration: 0.45, 
                      delay: idx * 0.06, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.25, ease: 'easeOut' }
                    }}
                    className="relative p-6 sm:p-8 rounded-2xl bg-brand-navy-surface border border-white/10 hover:border-brand-yellow/60 shadow-xl hover:shadow-[0_16px_36px_rgba(7,27,58,0.7),0_0_24px_rgba(255,201,40,0.18)] transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 group overflow-hidden"
                  >
                    {/* Left Accent Border Bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand-yellow via-amber-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Ambient Hover Gradient Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="space-y-2.5 flex-1 relative z-10 pl-0 sm:group-hover:pl-1 transition-all duration-300">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30">
                          {job.department}
                        </span>
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                          {job.type}
                        </span>
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                          {job.experience}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-brand-yellow transition-colors duration-200">
                        {job.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                        {job.overview}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-brand-yellow group-hover:scale-110 transition-transform duration-200" />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col sm:flex-row gap-3 pt-2 lg:pt-0 relative z-10">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="group/btn px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 hover:border-brand-yellow/40 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <span>Job Specs</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-200 group-hover/btn:translate-x-1 group-hover/btn:text-brand-yellow transition-transform duration-200" />
                      </button>

                      <button
                        onClick={() => handleOpenApplyModal(job.title)}
                        className="px-6 py-2.5 rounded-xl bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-glow-yellow hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="p-12 text-center bg-brand-navy-surface rounded-2xl border border-white/10">
                <Briefcase className="w-12 h-12 text-brand-yellow mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">No Openings in {selectedTeam} Right Now</h4>
                <p className="text-sm text-slate-400 mb-4">We are actively expanding. Submit a general application or check other teams.</p>
                <button
                  onClick={() => setSelectedTeam('All Teams')}
                  className="px-5 py-2 rounded-xl bg-brand-yellow text-brand-navy hover:bg-brand-yellow-hover text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View All Roles
                </button>
              </div>
            )}
          </motion.div>

          {/* Part B: Our Hiring Process */}
          <div 
            ref={hiringProcessRef}
            id="hiring-process"
            className="pt-10 border-t border-white/10"
          >
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
                Our <span className="text-brand-yellow">Hiring Process</span>
              </h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Connecting line on desktop */}
              <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 border-t-2 border-dashed border-white/15 -z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                {hiringProcessSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex flex-col items-center text-center group cursor-default"
                  >
                    {/* Circle badge */}
                    <div 
                      className={`w-12 h-12 rounded-full bg-brand-navy-card text-brand-yellow border-2 border-brand-yellow/40 font-bold text-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-brand-yellow group-hover:shadow-glow-yellow ${
                        step.step === 4 ? 'ring-4 ring-brand-yellow/30 border-brand-yellow' : ''
                      }`}
                    >
                      {step.step}
                    </div>

                    <h3 className="font-bold text-white font-heading text-base sm:text-lg mt-4 mb-1 group-hover:text-brand-yellow transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed max-w-[170px]">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-navy">
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-brand-navy-surface border border-white/10 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-2">
            Don't See Your Exact Specialty?
          </h3>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
            We are always interested in connecting with passionate software engineers, cloud architects, and product specialists.
          </p>
          <button
            onClick={() => handleOpenApplyModal('General Open Talent Application')}
            className="px-8 py-3.5 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover shadow-lg transition-colors cursor-pointer"
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
          <div className="space-y-6 text-sm text-slate-300">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                Position Overview
              </h4>
              <p className="leading-relaxed">{selectedJob.overview}</p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Core Responsibilities
              </h4>
              <ul className="space-y-2 text-xs">
                {selectedJob.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Candidate Requirements
              </h4>
              <ul className="space-y-2 text-xs">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                Position Benefits
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.benefits.map((b, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Contact: {companyDetails.careersEmail}
              </span>
              <button
                onClick={() => {
                  const title = selectedJob.title;
                  setSelectedJob(null);
                  handleOpenApplyModal(title);
                }}
                className="px-6 py-2.5 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover shadow-lg transition-colors cursor-pointer"
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
        <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs text-slate-300">
          <div>
            <label className="block font-semibold text-white mb-1">
              Full Legal Name <span className="text-brand-yellow">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. John Doe"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border ${
                formErrors.fullName ? 'border-red-400' : 'border-white/10'
              } text-white focus:outline-none focus:border-brand-yellow text-xs`}
            />
            {formErrors.fullName && <p className="text-red-400 text-[11px] mt-1">{formErrors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-white mb-1">
                Email Address <span className="text-brand-yellow">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border ${
                  formErrors.email ? 'border-red-400' : 'border-white/10'
                } text-white focus:outline-none focus:border-brand-yellow text-xs`}
              />
              {formErrors.email && <p className="text-red-400 text-[11px] mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block font-semibold text-white mb-1">
                Phone Number <span className="text-brand-yellow">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border ${
                  formErrors.phone ? 'border-red-400' : 'border-white/10'
                } text-white focus:outline-none focus:border-brand-yellow text-xs`}
              />
              {formErrors.phone && <p className="text-red-400 text-[11px] mt-1">{formErrors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-white mb-1">Relevant Experience</label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border border-white/10 text-white focus:outline-none focus:border-brand-yellow text-xs"
              >
                <option value="1-3 years">1 - 3 Years</option>
                <option value="3-5 years">3 - 5 Years</option>
                <option value="5-8 years">5 - 8 Years</option>
                <option value="8+ years">8+ Years (Lead / Principal)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-white mb-1">LinkedIn / Portfolio URL</label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border border-white/10 text-white focus:outline-none focus:border-brand-yellow text-xs"
              />
            </div>
          </div>

          {/* Resume Upload Picker */}
          <div>
            <label className="block font-semibold text-white mb-1">
              Resume Document (PDF / Word, Max 5MB) <span className="text-brand-yellow">*</span>
            </label>
            <div className="relative border-2 border-dashed border-white/20 hover:border-brand-yellow/50 rounded-xl p-4 text-center cursor-pointer transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {resumeFile ? (
                <div className="flex items-center justify-center gap-2 text-brand-yellow">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold text-xs">{resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)} KB)</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-slate-400">
                  <Upload className="w-5 h-5 text-brand-yellow mb-1" />
                  <span className="text-xs text-white font-medium">Click or drag resume file here</span>
                  <span className="text-[10px]">PDF, DOC, DOCX supported up to 5MB</span>
                </div>
              )}
            </div>
            {formErrors.resume && <p className="text-red-400 text-[11px] mt-1">{formErrors.resume}</p>}
          </div>

          <div>
            <label className="block font-semibold text-white mb-1">Candidate Statement / Cover Note</label>
            <textarea
              rows={3}
              value={formData.coverNote}
              onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
              placeholder="Tell us briefly about your primary technical strengths and why you're interested in Navabharath Technologies..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-navy-card border border-white/10 text-white focus:outline-none focus:border-brand-yellow text-xs"
            />
          </div>

          {isSubmitting && (
            <div className="space-y-1">
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-brand-yellow h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="text-center text-[10px] text-slate-400 font-mono">Uploading Application Package... {uploadProgress}%</p>
            </div>
          )}

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover shadow-lg flex items-center gap-2 disabled:opacity-50 transition-colors cursor-pointer"
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
