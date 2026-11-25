import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  ArrowDown, 
  ArrowUp, 
  Compass, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import { pageFlow } from '../../data/navigationFlow';

export default function PageJourneyLink() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current page index
  const currentPath = location.pathname;
  let currentIndex = pageFlow.findIndex((p) => p.path === currentPath);
  
  if (currentIndex === -1) {
    if (currentPath.startsWith('/services/')) {
      currentIndex = 2; // Services
    } else {
      return null;
    }
  }

  const currentPage = pageFlow[currentIndex];
  const nextIndex = (currentIndex + 1) % pageFlow.length;
  const prevIndex = (currentIndex - 1 + pageFlow.length) % pageFlow.length;
  const nextPage = pageFlow[nextIndex];
  const prevPage = pageFlow[prevIndex];

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  return (
    <>
      {/* ===================== FLOATING QUICK JOURNEY PILL ===================== */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-full bg-white/95 border border-brand-silver/80 shadow-xl backdrop-blur-md">
        {/* Previous Page Button */}
        <button
          onClick={() => handleNavigate(prevPage.path)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-light hover:bg-brand-royal/10 text-slate-700 hover:text-brand-royal text-xs font-semibold cursor-pointer transition-colors"
          title={`Previous Page: ${prevPage.name}`}
          aria-label={`Previous Page: ${prevPage.name}`}
        >
          <ChevronLeft className="w-3.5 h-3.5 text-brand-royal" />
          <span className="hidden md:inline">{prevPage.name}</span>
        </button>

        {/* Current Position Tag */}
        <div className="px-2.5 py-1 rounded-full bg-brand-royal/10 border border-brand-royal/30 text-brand-royal text-[11px] font-mono font-bold">
          {currentPage.step}/7
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => handleNavigate(nextPage.path)}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-brand-royal hover:bg-brand-navy text-white text-xs font-bold cursor-pointer shadow-md transition-colors"
          title={`Next Page: ${nextPage.name}`}
          aria-label={`Next Page: ${nextPage.name}`}
        >
          <span>{nextPage.name}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ===================== BOTTOM FULL JOURNEY SECTION ===================== */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-brand-silver/40 bg-gradient-to-b from-[#F7F9FC] via-white to-[#EBF2FA] overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          {/* Header & Step Sequence Breadcrumb */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-royal/10 border border-brand-royal/25 text-brand-royal text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Step-by-Step Page Flow • Chapter {currentPage.step} of 7</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy font-heading tracking-tight">
              Linked Website Journey: <span className="text-brand-royal">One-by-One Page Flow</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto">
              Follow our complete website flow sequentially, or navigate to any chapter directly.
            </p>

            {/* Visual 7-Step Navigation Nodes */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 mt-6 overflow-x-auto pb-2 scrollbar-none">
              {pageFlow.map((page, idx) => {
                const isCurrent = page.id === currentPage.id;
                const isNext = page.id === nextPage.id;
                const isPast = page.step < currentPage.step;

                return (
                  <React.Fragment key={page.id}>
                    <button
                      onClick={() => handleNavigate(page.path)}
                      className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-brand-royal text-white font-bold shadow-sm'
                          : isNext
                          ? 'bg-white border border-brand-royal text-brand-royal hover:bg-brand-royal/10'
                          : isPast
                          ? 'bg-white border border-brand-silver text-slate-700 hover:text-brand-royal hover:bg-brand-light'
                          : 'bg-brand-light border border-brand-silver/50 text-slate-500 hover:text-brand-navy'
                      }`}
                    >
                      <span className="text-[10px] font-mono opacity-80">{`0${page.step}`}</span>
                      <span className="hidden md:inline">{page.name}</span>
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </button>

                    {idx < pageFlow.length - 1 && (
                      <span className={`text-[10px] ${isPast ? 'text-brand-royal font-bold' : 'text-slate-400'}`}>
                        →
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Dual Action Journey Card: Next & Previous */}
          <div className="group relative bg-white border border-brand-silver/70 hover:border-brand-royal/50 rounded-3xl p-6 sm:p-10 shadow-lg overflow-hidden transition-all">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
              {/* Next Chapter Info */}
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-brand-royal/10 border border-brand-royal/20 text-brand-royal text-[11px] font-bold uppercase tracking-wider">
                    Next Chapter • 0{nextPage.step} of 07
                  </span>
                  <span className="text-slate-500 text-xs hidden sm:inline">
                    {nextPage.highlight}
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy font-heading">
                  {nextPage.name}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-royal via-brand-royal to-brand-steel">{nextPage.tagline}</span>
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {nextPage.description}
                </p>
              </div>

              {/* Action Buttons: Next & Previous */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end flex-shrink-0">
                {/* Continue to Next Page */}
                <button
                  onClick={() => handleNavigate(nextPage.path)}
                  className="px-7 py-3.5 rounded-2xl bg-brand-royal hover:bg-brand-navy text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-3 cursor-pointer transition-colors"
                >
                  <span>Continue to {nextPage.name}</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Back to Previous Page */}
                <button
                  onClick={() => handleNavigate(prevPage.path)}
                  className="px-6 py-2.5 rounded-2xl bg-white hover:bg-brand-light border border-brand-silver text-slate-700 hover:text-brand-royal text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-brand-royal" />
                  <span>Back to Previous: {prevPage.name}</span>
                </button>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="mt-6 pt-5 border-t border-brand-silver/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-royal" />
                <span>
                  Tip: Click <strong className="text-brand-navy">Continue to {nextPage.name}</strong> to proceed along the journey, or <strong className="text-brand-navy">Back to {prevPage.name}</strong> to revisit previous sections.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
