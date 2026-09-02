import React from 'react';
import { getClockComponents, getFormattedDates } from '../utils/prayerUtils';
import { KioskRubElHizb } from './KioskDecorations';

interface KioskHeaderProps {
  masjidName: string;
  arabicName?: string;
  cityState?: string;
  currentTime: Date;
}

export const KioskHeader: React.FC<KioskHeaderProps> = ({
  masjidName,
  arabicName = 'مَسْجِدُ النُّور',
  cityState = 'Arlington, Texas',
  currentTime,
}) => {
  const clock = getClockComponents(currentTime);
  const { gregorian, hijri } = getFormattedDates(currentTime);

  return (
    <header className="w-full bg-[#0d1c2e] border border-[#f0be50]/30 rounded-xl px-5 py-3 flex items-center justify-between shadow-lg relative overflow-hidden">
      {/* Left: Masjid Name in Cinzel Serif Font Gold */}
      <div className="flex items-center space-x-3.5 z-10">
        <div className="w-10 h-10 rounded-lg bg-[#071325] border border-[#f0be50]/40 flex items-center justify-center text-[#f0be50] shadow-md shrink-0">
          <KioskRubElHizb size={22} active />
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline space-x-2.5">
            <h1 className="font-['Cinzel'] text-xl sm:text-2xl font-bold tracking-wider text-[#f0be50] drop-shadow-sm whitespace-nowrap">
              {masjidName.toUpperCase()}
            </h1>
            <span className="font-['Amiri'] text-lg text-[#d7e3fc]/80 font-bold hidden sm:inline" dir="rtl">
              {arabicName}
            </span>
          </div>
          <p className="text-xs text-[#d7e3fc]/70 font-sans tracking-wide">
            {cityState} · Islamic Center & Sanctuary
          </p>
        </div>
      </div>

      {/* Center: Clock in Large Bold White */}
      <div className="flex items-baseline space-x-1.5 z-10">
        <span className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight drop-shadow-md tabular-nums">
          {clock.hours}
        </span>
        <span className="font-sans font-extrabold text-3xl sm:text-4xl text-[#f0be50] animate-pulse">
          :
        </span>
        <span className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight drop-shadow-md tabular-nums">
          {clock.minutes}
        </span>
        <span className="text-xs sm:text-sm font-semibold text-[#f0be50] uppercase ml-1 tracking-widest font-mono">
          {clock.ampm}
        </span>
        <span className="text-xs font-mono text-[#d7e3fc]/60 tabular-nums ml-1 hidden md:inline">
          :{clock.seconds}
        </span>
      </div>

      {/* Right: Date and Hijri Date */}
      <div className="flex flex-col items-end z-10 text-right">
        <span className="font-['Cinzel'] text-xs sm:text-sm font-bold tracking-wider text-[#f0be50]">
          {gregorian.toUpperCase()}
        </span>
        <div className="flex items-center space-x-1.5 text-xs text-[#d7e3fc]/90 font-mono mt-0.5">
          <span>{hijri}</span>
          <span className="text-[#c9a227]">✦</span>
          <span className="font-['Amiri'] text-sm text-[#f0be50] font-bold" dir="rtl">
            ١٦ صَفَر ١٤٤٨
          </span>
        </div>
      </div>
    </header>
  );
};
