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

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Resources', path: '/resources' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' }
  ];

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
            ? 'bg-brand-navy/90 backdrop-blur-md border-b border-brand-yellow/15 shadow-xl shadow-brand-navy-dark/40 py-3'
            : 'bg-brand-navy/60 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Link */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 rounded-lg"
              aria-label="NAVABHARATH TECHNOLOGIES Home"
            >
              <div className="relative p-1 rounded-xl bg-white/5 border border-white/10 group-hover:border-brand-yellow/50 transition-colors">
                <img
                  src={getAssetUrl('/assets/logo.png')}
                  alt="NAVABHARATH TECHNOLOGIES Logo"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-extrabold tracking-wider text-white uppercase group-hover:text-brand-yellow transition-colors font-heading leading-tight">
                  NAVABHARATH
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-brand-yellow uppercase leading-none">
                  TECHNOLOGIES
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  state={{
                    direction:
                      navLinks.findIndex((l) => l.path === link.path) >=
                      navLinks.findIndex((l) => l.path === location.pathname)
                        ? 'down'
                        : 'up',
                  }}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActive
                        ? 'text-brand-yellow font-semibold'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-yellow rounded-full shadow-glow-yellow"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Action: Professional Search Button next to Contact Us & Mobile Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Professional Search Button */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-brand-yellow/10 border border-white/15 hover:border-brand-yellow/60 text-slate-200 hover:text-white text-xs font-semibold transition-all shadow-sm hover:shadow-glow-yellow group cursor-pointer active:scale-95"
                title="Search website (⌘K / Ctrl+K)"
                aria-label="Search website"
              >
                <Search className="w-4 h-4 text-brand-yellow group-hover:scale-110 transition-transform" />
                <span className="font-heading tracking-wide">Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/10 text-slate-300 group-hover:text-brand-yellow rounded border border-white/10">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-brand-yellow" /> : <Menu className="w-6 h-6" />}
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
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-navy-dark/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-brand-navy-surface border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
            >
              <div>
                {/* Header inside mobile drawer */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <img src={getAssetUrl('/assets/logo.png')} alt="NAVABHARATH TECHNOLOGIES" className="h-9 w-auto" />
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">NAVABHARATH</div>
                      <div className="text-[9px] font-semibold text-brand-yellow uppercase tracking-widest">TECHNOLOGIES</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-brand-yellow" />
                  </button>
                </div>

                {/* Mobile Search Quick Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 border border-brand-yellow/30 text-slate-300 hover:text-white text-xs mb-4 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-brand-yellow" />
                    <span className="font-medium">Search services, portfolio, careers...</span>
                  </span>
                  <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400 font-mono">⌘K</kbd>
                </button>

                {/* Nav Links */}
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      state={{
                        direction:
                          navLinks.findIndex((l) => l.path === link.path) >=
                          navLinks.findIndex((l) => l.path === location.pathname)
                            ? 'down'
                            : 'up',
                      }}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          isActive
                            ? 'bg-brand-yellow/15 text-brand-yellow border-l-4 border-brand-yellow font-semibold'
                            : 'text-slate-200 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Contact in Drawer */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-yellow" />
                    <span>{companyDetails.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-yellow" />
                    <span>{companyDetails.phone}</span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm uppercase tracking-wider bg-brand-yellow text-brand-navy hover:bg-brand-yellow-hover shadow-lg transition-colors cursor-pointer"
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
