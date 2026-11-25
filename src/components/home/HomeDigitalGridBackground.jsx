import React from 'react';

export default function HomeDigitalGridBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F7F9FC] to-[#EDF2F7] pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Light subtle geometric grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      {/* Subtle blue gradient orbs for corporate depth */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-gradient-to-br from-[#234F91]/8 via-[#52749A]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-[550px] h-[550px] bg-gradient-to-bl from-[#234F91]/7 via-[#C4CCD5]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-[#52749A]/6 to-transparent rounded-full blur-[90px] pointer-events-none" />
    </div>
  );
}
