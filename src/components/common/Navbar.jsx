import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ChevronRight, 
  Search,
  ArrowRight
} from 'lucide-react';
import { companyDetails } from '../../data/companyData';
import { getAssetUrl } from '../../utils/assetPath';
import SearchModal from './SearchModal';
import MagneticButton from './MagneticButton';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'About Us', path: '/about', id: 'about' },
    { name: 'Services', path: '/services', id: 'services' },
    { name: 'Portfolio', path: '/portfolio', id: 'portfolio' },
    { name: 'Resources', path: '/resources', id: 'resources' },
    { name: 'Careers', path: '/careers', id: 'careers' },
    { name: 'Contact Us', path: '/contact', id: 'contact' }
  ];

  // IntersectionObserver to detect which page section is currently on screen
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'portfolio', 'resources', 'careers', 'contact'];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-15% 0px -55% 0px',
      threshold: 0
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (e, link) => {
    const el = document.getElementById(link.id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(link.id);
      setMobileMenuOpen(false);
    }
  };

  // Track scroll position to enhance navbar shadow/blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut: Ctrl+K or Cmd+K opens search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-gradient-to-r from-white via-white/95 to-[#EBF2FA]/90 backdrop-blur-md border-b border-brand-silver/50 shadow-md py-3'
            : 'bg-gradient-to-r from-white/95 via-[#F7F9FC]/90 to-[#EBF2FA]/80 backdrop-blur-sm border-b border-brand-silver/30 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Link */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-royal/50 rounded-lg"
              aria-label="NAVABHARATH TECHNOLOGIES Home"
            >
              <div className="relative p-1 rounded-xl bg-white border border-brand-silver/60 group-hover:border-brand-royal/50 shadow-sm transition-colors">
                <img
                  src={getAssetUrl('/assets/logo.png')}
                  alt="NAVABHARATH TECHNOLOGIES Logo"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-extrabold tracking-wider text-brand-navy uppercase group-hover:text-brand-royal transition-colors font-heading leading-tight">
                  NAVABHARATH
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-brand-royal uppercase leading-none">
                  TECHNOLOGIES
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Smooth Scrolling to One-by-One Sections */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${
                      isActive
                        ? 'text-brand-royal font-bold'
                        : 'text-brand-navy hover:text-brand-royal hover:bg-brand-royal/5'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-brand-royal/10 rounded-lg border-b-2 border-brand-royal shadow-xs z-0"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Search Button & Contact Button & Mobile Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Professional Search Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-brand-royal/5 border border-brand-silver/60 hover:border-brand-royal/50 text-brand-navy text-xs font-semibold transition-all shadow-sm hover:shadow-md group cursor-pointer active:scale-95"
                title="Search website (⌘K / Ctrl+K)"
                aria-label="Search website"
              >
                <Search className="w-4 h-4 text-brand-royal group-hover:scale-110 transition-transform" />
                <span className="font-heading tracking-wide">Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-brand-light text-slate-500 group-hover:text-brand-royal rounded border border-brand-silver/50">
                  ⌘K
                </kbd>
              </button>

              {/* Navy-to-Royal-Blue Gradient Contact Us CTA Button with Magnetic Physics */}
              <MagneticButton strength={0.2} className="hidden md:inline-block">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-brand-navy to-brand-royal text-white hover:brightness-110 shadow-sm hover:shadow-md transition-all active:scale-95 group"
                >
                  <span>Start Project</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </MagneticButton>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-brand-navy hover:text-brand-royal hover:bg-brand-royal/10 border border-brand-silver/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-royal cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-brand-royal" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white border-l border-brand-silver/50 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
            >
              <div>
                {/* Header inside mobile drawer */}
                <div className="flex items-center justify-between pb-5 border-b border-brand-silver/40 mb-5">
                  <div className="flex items-center gap-2">
                    <img src={getAssetUrl('/assets/logo.png')} alt="NAVABHARATH TECHNOLOGIES" className="h-9 w-auto" />
                    <div>
                      <div className="text-xs font-bold text-brand-navy uppercase tracking-wider">NAVABHARATH</div>
                      <div className="text-[9px] font-semibold text-brand-royal uppercase tracking-widest">TECHNOLOGIES</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-500 hover:text-brand-royal hover:bg-brand-royal/10 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-brand-royal" />
                  </button>
                </div>

                {/* Mobile Search Quick Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-brand-light border border-brand-silver/60 text-slate-600 hover:text-brand-navy text-xs mb-4 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-brand-royal" />
                    <span className="font-medium">Search services, portfolio, careers...</span>
                  </span>
                  <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded text-slate-500 font-mono border border-brand-silver/40">⌘K</kbd>
                </button>

                {/* Nav Links - Smooth Scrolling to Sections */}
                <div className="space-y-1">
                  {navLinks.map((link, idx) => {
                    const isActive = activeSection === link.id;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all cursor-pointer ${
                          isActive
                            ? 'bg-brand-royal/10 text-brand-royal border-l-4 border-brand-royal font-bold'
                            : 'text-brand-navy hover:text-brand-royal hover:bg-brand-royal/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-brand-steel/60">/0{idx + 1}</span>
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Contact in Drawer */}
              <div className="pt-6 border-t border-brand-silver/40 space-y-4">
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-royal" />
                    <span>{companyDetails.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-royal" />
                    <span>{companyDetails.phone}</span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-brand-navy to-brand-royal text-white hover:opacity-95 shadow-md transition-all cursor-pointer"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
