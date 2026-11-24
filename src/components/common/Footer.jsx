import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { companyDetails } from '../../data/companyData';
import { getAssetUrl } from '../../utils/assetPath';
import Modal from './Modal';

export default function Footer() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState('privacy'); // 'privacy' | 'terms' | 'security'

  const openLegalModal = (type) => {
    setLegalModalType(type);
    setLegalModalOpen(true);
  };

  const getSocialIcon = (name) => {
    switch (name) {
      case 'LinkedIn':
        return <Linkedin className="w-3.5 h-3.5" />;
      case 'Twitter / X':
        return <Twitter className="w-3.5 h-3.5" />;
      case 'GitHub':
        return <Github className="w-3.5 h-3.5" />;
      case 'Instagram':
        return <Instagram className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <>
      <footer className="relative bg-brand-navy-dark text-slate-300 border-t border-brand-yellow/15 pt-8 pb-4 overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 4 Balanced Desktop Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pb-6">

            {/* Col 1: Brand, 2-line Description, Compact Verification & Socials */}
            <div className="space-y-2.5">
              <Link
                to="/"
                className="inline-flex items-center gap-2 group cursor-pointer"
              >
                <img
                  src={getAssetUrl('/assets/logo.png')}
                  alt="NAVABHARATH TECHNOLOGIES"
                  className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold text-white tracking-wider font-heading leading-tight group-hover:text-brand-yellow transition-colors">
                    NAVABHARATH
                  </span>
                  <span className="text-[9px] font-semibold text-brand-yellow tracking-widest uppercase leading-none">
                    TECHNOLOGIES
                  </span>
                </div>
              </Link>

              {/* Maximum 2-line description */}
              <p className="text-[12px] text-slate-300 leading-snug line-clamp-2">
                Delivering innovative digital products, robust enterprise software, and scalable modern web solutions.
              </p>

              {/* Compact Corporate Verification without large background box */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                <span className="truncate">{companyDetails.cin}</span>
              </div>

              {/* Compact Social Icons */}
              <div className="flex items-center gap-2 pt-0.5">
                {companyDetails.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-brand-navy hover:bg-brand-yellow hover:border-brand-yellow transition-all"
                    aria-label={`Visit our ${social.name}`}
                  >
                    {getSocialIcon(social.name)}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-white mb-2.5 border-l-2 border-brand-yellow pl-2">
                Quick Links
              </h4>
              <ul className="space-y-1 text-[12px]">
                <li>
                  <Link
                    to="/"
                    className="text-slate-300 hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-slate-300 hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-slate-300 hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio"
                    className="text-slate-300 hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources"
                    className="text-slate-300 hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-slate-300 hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-slate-300 hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Expertise */}
            <div>
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-white mb-2.5 border-l-2 border-brand-yellow pl-2">
                Expertise
              </h4>
              <ul className="space-y-1 text-[12px] text-slate-300">
                <li>
                  <Link
                    to="/services/web-development"
                    className="hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/ai-solutions"
                    className="hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/mobile-app-development"
                    className="hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    Mobile App Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/ui-ux-design"
                    className="hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/cloud-solutions"
                    className="hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    Cloud Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/digital-marketing"
                    className="hover:text-brand-yellow transition-colors block py-0.5"
                  >
                    Digital Marketing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Details */}
            <div>
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-white mb-2.5 border-l-2 border-brand-yellow pl-2">
                Contact
              </h4>
              <div className="space-y-2 text-[12px] text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0 mt-0.5" />
                  <span className="leading-tight">{companyDetails.officialAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                  <a href={`mailto:${companyDetails.email}`} className="hover:text-brand-yellow transition-colors truncate">
                    {companyDetails.email}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5">
                    <a href="tel:+917996078472" className="hover:text-brand-yellow transition-colors">
                      +91-7996078472
                    </a>
                    <a href="tel:+918213128831" className="hover:text-brand-yellow transition-colors">
                      +91-8213128831
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                  <span className="truncate">{companyDetails.businessHours}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Thin Divider & Single Compact Bottom Row */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} NAVABHARATH TECHNOLOGIES. All rights reserved.
            </div>
            <div className="flex items-center gap-5">
              <button
                onClick={() => openLegalModal('privacy')}
                className="hover:text-brand-yellow transition-colors focus:outline-none"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openLegalModal('terms')}
                className="hover:text-brand-yellow transition-colors focus:outline-none"
              >
                Terms of Service
              </button>
              <button
                onClick={() => openLegalModal('security')}
                className="hover:text-brand-yellow transition-colors focus:outline-none"
              >
                Security &amp; Compliance
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible Legal Modals */}
      <Modal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        title={
          legalModalType === 'privacy'
            ? 'Corporate Privacy Policy'
            : legalModalType === 'terms'
              ? 'Terms of Service & Engagement'
              : 'Security & Enterprise Compliance'
        }
        subtitle="NAVABHARATH TECHNOLOGIES Corporate Governance"
      >
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          {legalModalType === 'privacy' && (
            <>
              <p>
                <strong>Effective Date:</strong> January 2026 | Last Updated: February 2026
              </p>
              <p>
                Navabharath Technologies prioritizes the protection and confidentiality of client and visitor data. We adhere strictly to applicable global data privacy regulations including GDPR and Indian Digital Personal Data Protection standards.
              </p>
              <h4 className="text-white font-bold mt-3">1. Information We Collect</h4>
              <p>
                We only collect information voluntarily provided through project inquiry forms, career applications, and newsletter subscriptions (such as name, verified corporate email, and project specifications).
              </p>
              <h4 className="text-white font-bold mt-3">2. Data Security &amp; Storage</h4>
              <p>
                All data transmitted across our web platforms is encrypted via TLS 1.3 encryption. We never sell, rent, or trade client contact information to third-party data brokers.
              </p>
              <h4 className="text-white font-bold mt-3">3. Contacting the Data Protection Officer</h4>
              <p>
                For data access or erasure requests, reach out to <span className="text-brand-yellow">{companyDetails.email}</span>.
              </p>
            </>
          )}

          {legalModalType === 'terms' && (
            <>
              <p>
                <strong>Terms of Engagement:</strong> Standard Enterprise Agreement
              </p>
              <p>
                Welcome to Navabharath Technologies. By accessing our website or engaging our technology consulting services, you agree to comply with our professional terms of engagement.
              </p>
              <h4 className="text-white font-bold mt-3">1. Intellectual Property</h4>
              <p>
                All proprietary methodologies, source code frameworks, and brand assets developed by Navabharath Technologies remain the exclusive property of the company until assigned under a ratified Statement of Work (SOW).
              </p>
              <h4 className="text-white font-bold mt-3">2. Service Delivery &amp; SLAs</h4>
              <p>
                Engagements are executed under mutually agreed timelines, milestone sign-offs, and service level agreements defined in formal project contracts.
              </p>
            </>
          )}

          {legalModalType === 'security' && (
            <>
              <p>
                <strong>Security Architecture:</strong> Defense-in-Depth Model
              </p>
              <p>
                Navabharath Technologies enforces zero-trust architecture, automated vulnerability scanning (OWASP Top 10), static code analysis, and strict least-privilege role-based access across all client development environments.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>TLS 1.3 in-transit and AES-256 at-rest encryption standards</li>
                <li>Automated CI/CD dependency vulnerability scans</li>
                <li>Isolated staging environments with simulated client sanitization</li>
              </ul>
            </>
          )}

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => setLegalModalOpen(false)}
              className="px-5 py-2 rounded-xl bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider hover:bg-brand-yellow-hover transition-colors"
            >
              Close Document
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
