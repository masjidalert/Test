import React from 'react';
import { PrayerTime } from '../types';
import { PrayerStateInfo } from '../utils/prayerUtils';
import { KioskGoldDivider, KioskRubElHizb } from './KioskDecorations';

interface CenterMihrabColumnProps {
  prayerState: PrayerStateInfo;
  isFridayMode?: boolean;
  jumuahTimes: string[];
  khateebs?: string[];
}

export const CenterMihrabColumn: React.FC<CenterMihrabColumnProps> = ({
  prayerState,
  isFridayMode = false,
  jumuahTimes,
  khateebs = ['Dr. Tariq Al-Mansoor', 'Sheikh Ibrahim Hasan'],
}) => {
  const { nextPrayer, formattedCountdown, isBetweenAthanAndIqamah, iqamahProgressPercent } = prayerState;

  return (
    <div className="w-full lg:w-[40%] h-full flex flex-col">
      {/* Outer Mihrab Islamic Arch Container */}
      <div className="w-full h-full flex-1 bg-gradient-to-b from-[#0d1c2e] via-[#10233b] to-[#142032] border-2 border-[#f0be50]/40 rounded-t-[80px] sm:rounded-t-[100px] rounded-b-2xl p-4 sm:p-6 flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden">
        
        {/* Subtle Arch Inset Border (Pointed Mihrab Inner Arc) */}
        <div className="absolute inset-2 sm:inset-3 border border-[#f0be50]/20 rounded-t-[70px] sm:rounded-t-[90px] rounded-b-xl pointer-events-none" />

        {/* 1. TOP: Bismillah in Sacred Arabic Calligraphy */}
        <div className="flex flex-col items-center pt-2 sm:pt-4 z-10">
          <span
            className="font-['Amiri'] text-lg sm:text-2xl font-bold text-[#f0be50] tracking-wider drop-shadow-sm select-none leading-relaxed"
            dir="rtl"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <span className="text-[10px] text-[#d7e3fc]/60 uppercase tracking-widest font-sans mt-0.5">
            In the Name of Allah, the Most Gracious, the Most Merciful
          </span>
          <KioskGoldDivider className="w-40 sm:w-52 h-4 my-1 text-[#f0be50]" />
        </div>

        {/* 2. CENTER CONTENT: NORMAL MODE vs JUMU'AH FRIDAY MODE */}
        {!isFridayMode ? (
          /* STANDARD PRAYER ARCH VIEW */
          <div className="flex flex-col items-center justify-center my-auto py-2 z-10 w-full">
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#f0be50]/15 border border-[#f0be50]/40 text-[#f0be50] mb-2">
              <KioskRubElHizb size={14} active />
              <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-widest">
                {isBetweenAthanAndIqamah ? 'IQAMAH COUNTDOWN' : 'TIME REMAINING UNTIL PRAYER'}
              </span>
            </div>

            {/* Next Prayer Big Title (Arabic + English) */}
            <div className="flex items-center space-x-3 mb-1">
              <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-black text-white tracking-widest drop-shadow-md">
                {nextPrayer.name.toUpperCase()}
              </h2>
              <span className="text-[#f0be50] text-xl font-bold">·</span>
              <span className="font-['Amiri'] text-2xl sm:text-3xl font-bold text-[#f0be50]" dir="rtl">
                {nextPrayer.arabicName}
              </span>
            </div>

            {/* Huge Monospace Monolithic Countdown Timer */}
            <div className="font-mono font-black text-4xl sm:text-5xl lg:text-6xl text-[#f0be50] tracking-widest drop-shadow-[0_0_20px_rgba(240,190,80,0.35)] tabular-nums my-1">
              {formattedCountdown}
            </div>

            {/* Iqamah Progress Bar (if within Athan to Iqamah window) */}
            {isBetweenAthanAndIqamah && (
              <div className="w-3/4 bg-[#071325] h-2 rounded-full overflow-hidden border border-[#f0be50]/30 my-2">
                <div
                  className="bg-gradient-to-r from-[#c9a227] to-[#f0be50] h-full transition-all duration-1000"
                  style={{ width: `${iqamahProgressPercent}%` }}
                />
              </div>
            )}

            {/* Athan and Iqamah Times Below Countdown */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-3 pt-3 border-t border-[#f0be50]/20">
              <div className="bg-[#071325]/80 border border-[#f0be50]/25 rounded-xl p-2.5 flex flex-col items-center">
                <span className="font-['Cinzel'] text-[10px] sm:text-xs text-[#d7e3fc]/70 uppercase font-bold tracking-wider">
                  ATHAN TIME
                </span>
                <span className="font-mono text-sm sm:text-lg font-bold text-white mt-0.5 tabular-nums">
                  {nextPrayer.athan}
                </span>
              </div>

              <div className="bg-[#071325]/80 border border-[#f0be50]/40 rounded-xl p-2.5 flex flex-col items-center shadow-[inset_0_0_10px_rgba(240,190,80,0.1)]">
                <span className="font-['Cinzel'] text-[10px] sm:text-xs text-[#f0be50] uppercase font-bold tracking-wider">
                  IQAMAH TIME
                </span>
                <span className="font-mono text-sm sm:text-lg font-black text-[#f0be50] mt-0.5 tabular-nums">
                  {nextPrayer.iqamah}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* JUMU'AH FRIDAY MODE VIEW */
          <div className="flex flex-col items-center justify-center my-auto py-2 z-10 w-full animate-in fade-in duration-300">
            {/* Friday Greeting Arabic */}
            <div className="px-4 py-1 rounded-full bg-[#f0be50]/20 border border-[#f0be50] text-[#f0be50] mb-2">
              <span className="font-['Amiri'] text-xl sm:text-2xl font-bold tracking-wide" dir="rtl">
                جُمُعَة مُبَارَكَة
              </span>
            </div>

            {/* English Heading */}
            <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-black text-[#f0be50] tracking-widest drop-shadow-md">
              JUMU'AH MUBARAK
            </h2>
            <p className="text-xs text-[#d7e3fc]/80 font-sans tracking-wide mt-1 mb-3">
              The Blessed Day of Gathering & Supplication
            </p>

            {/* Khutbah & Prayer Shifts */}
            <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-3">
              {jumuahTimes.map((time, idx) => (
                <div
                  key={idx}
                  className="bg-[#071325]/90 border border-[#f0be50]/35 rounded-xl p-2.5 flex flex-col items-center text-center shadow"
                >
                  <span className="font-['Cinzel'] text-[10px] font-bold text-[#f0be50] uppercase tracking-wider">
                    {idx === 0 ? '1ST JUMU\'AH' : '2ND JUMU\'AH'}
                  </span>
                  <span className="font-mono text-base sm:text-lg font-black text-white my-0.5">
                    {time}
                  </span>
                  <span className="text-[11px] text-[#d7e3fc]/70 font-sans">
                    {khateebs[idx] || 'Resident Khateeb'}
                  </span>
                </div>
              ))}
            </div>

            {/* Sunnah Reminders */}
            <div className="px-4 py-2 bg-[#071325]/60 border border-white/10 rounded-lg text-center">
              <span className="text-[11px] text-[#f0be50] font-semibold block">
                ✦ Reminders for Friday:
              </span>
              <span className="text-[10px] text-[#d7e3fc]/80 italic">
                Recite Surah Al-Kahf · Make abundant Salawat upon the Prophet ﷺ · Make Du’ā in the final hour
              </span>
            </div>
          </div>
        )}

        {/* 3. BOTTOM: Sacred Verse / Footer inside Arch */}
        <div className="flex flex-col items-center pb-2 z-10 w-full">
          <KioskGoldDivider className="w-36 h-3 text-[#f0be50]/60 mb-1" />
          <span className="font-['Amiri'] text-xs sm:text-sm text-[#d7e3fc]/90 italic" dir="rtl">
            «أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ الصَّلَاةُ عَلَى وَقْتِهَا»
          </span>
          <span className="text-[10px] text-[#d7e3fc]/60 font-sans">
            "The deed most beloved to Allah is performing prayer on its proper time."
          </span>
        </div>
      </div>
    </div>
  );
};
