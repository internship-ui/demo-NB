import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-2xl' }) {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative w-full ${maxWidth} bg-white border border-brand-silver/50 rounded-2xl shadow-2xl overflow-hidden z-10 my-8`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-brand-silver/40 bg-brand-light">
          <div>
            <h3 className="text-xl font-bold text-brand-navy tracking-tight">{title}</h3>
            {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-brand-royal hover:bg-brand-royal/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );
}
