import React from 'react';
import { PrayerTime } from '../types';
import { IslamicDivider, MihrabBaseFloral, OrnateCorner, FadedIslamicPattern } from './ArabesquePatterns';

interface CenterHeroColumnProps {
  nextPrayer: PrayerTime;
  countdown: string;
  isBetweenAthanAndIqamah: boolean;
  iqamahProgressPercent: number;
  minutesUntilIqamah: number;
  isJumuahMode?: boolean;
  isIshaComplete?: boolean;
  isLight?: boolean;
}

export const CenterHeroColumn: React.FC<CenterHeroColumnProps> = ({
  nextPrayer,
  countdown,
  isBetweenAthanAndIqamah,
  iqamahProgressPercent,
  minutesUntilIqamah,
  isJumuahMode = false,
  isIshaComplete = false,
  isLight = false,
}) => {
  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between items-center border-2 rounded-t-[140px] rounded-b-xl px-6 py-5 overflow-hidden transition-all duration-1000 ease-in-out ${
        isLight
          ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#EEE5D2] border-[#BFA054] shadow-[0_12px_45px_rgba(140,110,40,0.18),inset_0_0_50px_rgba(197,160,89,0.12)]'
          : 'bg-gradient-to-b from-[#133427] via-[#184232] to-[#0E261D] border-[#C5A059] shadow-[0_12px_45px_rgba(4,14,10,0.8),inset_0_0_50px_rgba(197,160,89,0.08)]'
      }`}
    >
      {/* Inner Mihrab Arch Border */}
      <div
        className={`absolute inset-2 border rounded-t-[130px] rounded-b-lg pointer-events-none transition-all duration-1000 ease-in-out ${
          isLight ? 'border-[#BFA054]/40' : 'border-[#ECC968]/30'
        }`}
      />
      
      {/* Background Continuous Faded Arabesque & Calligraphic Lattice Pattern */}
      <FadedIslamicPattern opacity={isLight ? 0.055 : 0.065} isLight={isLight} />

      {/* Corner Accents on base */}
      <OrnateCorner position="bottom-left" size={26} className={`transition-colors duration-1000 ease-in-out ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />
      <OrnateCorner position="bottom-right" size={26} className={`transition-colors duration-1000 ease-in-out ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />

      {/* Top Arch Section: Calligraphy with Distinct Baseline Spacing */}
      <div className="w-full flex flex-col items-center pt-2 text-center z-10">
        {isJumuahMode ? (
          <div className="flex flex-col items-center">
            <h2
              className={`font-['Amiri'] text-3xl md:text-4xl font-bold tracking-normal ${
                isLight
                  ? 'text-[#091A38] drop-shadow-[0_1px_4px_rgba(140,99,13,0.2)]'
                  : 'text-[#FFDF78] drop-shadow-[0_2px_10px_rgba(255,223,120,0.4)]'
              }`}
            >
              جُمُعَة مُبَارَكَة
            </h2>
            <span
              className={`font-['Cinzel'] text-xs uppercase tracking-[0.22em] font-semibold mt-2 ${
                isLight ? 'text-[#7A570E]' : 'text-[#ECC968]'
              }`}
            >
              Jumu'ah Mubarak
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full px-2">
            {/* Ornate Arabic Calligraphy Bismillah with ample vertical breathing room */}
            <div className="flex items-center justify-center space-x-2 w-full">
              <span
                className={`h-px w-6 bg-gradient-to-r from-transparent ${
                  isLight ? 'to-[#8C630D]/60' : 'to-[#C5A059]/60'
                }`}
              />
              <h2
                dir="rtl"
                className={`font-['Scheherazade_New'] text-2xl md:text-[28px] lg:text-[31px] font-bold leading-[1.4] tracking-wide whitespace-nowrap ${
                  isLight
                    ? 'text-[#644605] drop-shadow-[0_1px_6px_rgba(140,99,13,0.2)]'
                    : 'text-[#FFDF78] drop-shadow-[0_2px_16px_rgba(255,223,120,0.45)]'
                }`}
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </h2>
              <span
                className={`h-px w-6 bg-gradient-to-l from-transparent ${
                  isLight ? 'to-[#8C630D]/60' : 'to-[#C5A059]/60'
                }`}
              />
            </div>

            {/* Lowered English Translation with clear buffer spacing */}
            <p
              className={`font-['Cinzel'] text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-semibold mt-2.5 max-w-[95%] leading-normal ${
                isLight ? 'text-[#4A3B18]' : 'text-[#ECC968]/90'
              }`}
            >
              In the Name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>
        )}
      </div>

      {/* Center Countdown Section */}
      <div className="w-full flex flex-col items-center justify-center my-auto py-2 z-10">
        {/* Next Prayer Title */}
        <div className="flex items-center space-x-3 mb-1.5">
          <span
            className={`h-px w-8 bg-gradient-to-r from-transparent ${
              isLight ? 'to-[#8C630D]' : 'to-[#C5A059]'
            }`}
          />
          <span
            className={`font-['Cinzel'] text-sm md:text-base font-bold tracking-[0.28em] uppercase ${
              isLight ? 'text-[#7A570E]' : 'text-[#ECC968]'
            }`}
          >
            {isBetweenAthanAndIqamah
              ? `IQAMAH IN PROGRESS ― ${nextPrayer.name.toUpperCase()}`
              : isIshaComplete
              ? 'FAJR COUNTDOWN'
              : `NEXT PRAYER ― ${nextPrayer.name.toUpperCase()}`}
          </span>
          <span
            className={`h-px w-8 bg-gradient-to-l from-transparent ${
              isLight ? 'to-[#8C630D]' : 'to-[#C5A059]'
            }`}
          />
        </div>

        {/* Live Monumental Digital Countdown */}
        <div className="relative my-0.5">
          <div
            className={`font-['Cinzel'] text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight ${
              isLight
                ? 'text-[#081836] drop-shadow-[0_2px_12px_rgba(140,99,13,0.2)]'
                : 'text-[#FDF8EE] drop-shadow-[0_4px_24px_rgba(236,201,104,0.4)]'
            }`}
          >
            {countdown}
          </div>
        </div>

        {/* Iqamah Progress Bar (Appears between Athan and Iqamah) */}
        {isBetweenAthanAndIqamah ? (
          <div className="w-full max-w-[280px] mt-2 mb-1 flex flex-col items-center">
            <div
              className={`w-full h-2 rounded-full overflow-hidden p-0.5 border ${
                isLight ? 'bg-[#E5DCC9] border-[#BFA054]/60' : 'bg-[#030919] border-[#C5A059]/50'
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  isLight
                    ? 'bg-gradient-to-r from-[#8C630D] via-[#B88B2A] to-[#ECC968] shadow-[0_0_6px_#B88B2A]'
                    : 'bg-gradient-to-r from-[#C5A059] via-[#ECC968] to-[#FFDF78] shadow-[0_0_8px_#ECC968]'
                }`}
                style={{ width: `${iqamahProgressPercent}%` }}
              />
            </div>
            <span
              className={`text-[11px] font-['Cinzel'] font-semibold tracking-wider mt-1.5 animate-pulse ${
                isLight ? 'text-[#7A570E]' : 'text-[#FFDF78]'
              }`}
            >
              Iqamah in ~{minutesUntilIqamah} min — Please silence phones
            </span>
          </div>
        ) : (
          <IslamicDivider className={`w-56 h-5 my-0.5 ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} width={220} />
        )}

        {/* Next Prayer Times Subtitle */}
        <div className="text-center mt-1.5">
          <p
            className={`font-['Cinzel'] text-sm md:text-base font-semibold tracking-wider ${
              isLight ? 'text-[#0F1E3B]' : 'text-[#F5E09A]'
            }`}
          >
            Athan {nextPrayer.athan}
            {!nextPrayer.isShuruq && ` · Iqamah ${nextPrayer.iqamah}`}
          </p>
        </div>
      </div>

      {/* Bottom Mihrab Floral Motif */}
      <div className="w-full flex justify-center shrink-0 -mb-2 z-10">
        <MihrabBaseFloral className="w-36 h-14" />
      </div>
    </div>
  );
};
