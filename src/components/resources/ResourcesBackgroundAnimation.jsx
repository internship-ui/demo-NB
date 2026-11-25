import React from 'react';

export default function ResourcesBackgroundAnimation() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#F7F9FC] via-[#FFFFFF] to-[#EDF2F7] pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-[#234F91]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[450px] h-[450px] bg-[#52749A]/6 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
