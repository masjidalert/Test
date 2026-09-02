import React from 'react';
import { JanazahNotice } from '../types';
import { KioskCornerAccent } from './KioskDecorations';

interface JanazahAlertBannerProps {
  janazah: JanazahNotice;
}

export const JanazahAlertBanner: React.FC<JanazahAlertBannerProps> = ({ janazah }) => {
  return (
    <div className="w-full bg-gradient-to-r from-[#3f0f12] via-[#5c161a] to-[#3f0f12] border-2 border-[#f0be50] rounded-xl px-5 py-2.5 flex items-center justify-between shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
      <KioskCornerAccent position="top-left" size={18} className="text-[#f0be50]" />
      <KioskCornerAccent position="top-right" size={18} className="text-[#f0be50]" />
      <KioskCornerAccent position="bottom-left" size={18} className="text-[#f0be50]" />
      <KioskCornerAccent position="bottom-right" size={18} className="text-[#f0be50]" />

      {/* Left: Janazah Badge & Arabic Istirja */}
      <div className="flex items-center space-x-3.5 z-10">
        <div className="px-3 py-1 bg-[#f0be50] text-[#3f0f12] font-['Cinzel'] font-black text-xs sm:text-sm tracking-widest uppercase rounded shadow">
          JANAZAH ALERT
        </div>
        <div className="flex flex-col">
          <span className="font-['Amiri'] text-base sm:text-lg font-bold text-[#f0be50] leading-none" dir="rtl">
            إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
          </span>
          <span className="text-[11px] text-[#fce7f3]/80 font-sans tracking-wide">
            Indeed to Allah we belong, and to Him we shall return
          </span>
        </div>
      </div>

      {/* Center: Deceased Name and Prayer Timing */}
      <div className="flex items-center space-x-3 z-10 text-center">
        <div className="flex flex-col">
          <span className="text-xs text-[#fce7f3]/70 uppercase tracking-wider font-semibold">
            Salat al-Janazah For:
          </span>
          <span className="font-['Cinzel'] font-black text-base sm:text-lg text-white tracking-wide drop-shadow-sm">
            {janazah.deceasedName}
          </span>
        </div>
        <span className="text-[#f0be50] text-lg font-bold">✦</span>
        <div className="flex flex-col text-left">
          <span className="text-xs text-[#f0be50] font-bold uppercase tracking-wider font-mono">
            {janazah.prayerName} Prayer ({janazah.prayerTime})
          </span>
          <span className="text-xs text-white/90 font-sans">
            {janazah.cemetery ? `Burial: ${janazah.cemetery}` : janazah.dayDescription}
          </span>
        </div>
      </div>

      {/* Right: Call to action / Note */}
      <div className="hidden lg:flex flex-col items-end z-10 text-right">
        <span className="text-xs font-semibold text-[#f0be50]">
          Please attend & pray for the family
        </span>
        <span className="text-[11px] text-[#fce7f3]/70 italic">
          {janazah.notes || 'May Allah grant them Jannatul Firdaus'}
        </span>
      </div>
    </div>
  );
};
