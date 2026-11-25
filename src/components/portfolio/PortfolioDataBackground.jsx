import React from 'react';

export default function PortfolioDataBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#F7F9FC] via-[#FFFFFF] to-[#EBF2FA]/60 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#234F91]/7 via-[#52749A]/5 to-transparent rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
}
