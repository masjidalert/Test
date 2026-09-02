import React from 'react';
import { PrayerTime } from '../types';
import { PrayerStateInfo } from '../utils/prayerUtils';
import { KioskCornerAccent, KioskRubElHizb } from './KioskDecorations';

interface LeftPrayerColumnProps {
  prayers: PrayerTime[];
  prayerState: PrayerStateInfo;
  jumuahTimes: string[];
}

export const LeftPrayerColumn: React.FC<LeftPrayerColumnProps> = ({
  prayers,
  prayerState,
  jumuahTimes,
}) => {
  const { nextPrayer, formattedCountdown, isBetweenAthanAndIqamah } = prayerState;

  return (
    <div className="w-full lg:w-[30%] h-full flex flex-col gap-3">
      {/* 1. TOP CARD: Next Prayer Countdown */}
      <div className="w-full bg-gradient-to-br from-[#0d1c2e] to-[#142032] border border-[#f0be50]/30 rounded-xl p-3.5 flex flex-col justify-between shadow-lg relative overflow-hidden shrink-0">
        <KioskCornerAccent position="top-left" size={16} />
        <KioskCornerAccent position="top-right" size={16} />

        <div className="flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <KioskRubElHizb size={16} active />
            <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-widest text-[#f0be50]">
              {isBetweenAthanAndIqamah ? 'IQAMAH COUNTDOWN' : 'NEXT PRAYER'}
            </span>
          </div>
          <span className="font-['Amiri'] font-bold text-sm text-[#f0be50]" dir="rtl">
            {nextPrayer.arabicName}
          </span>
        </div>

        <div className="flex items-baseline justify-between mt-1 z-10">
          <div className="flex flex-col">
            <span className="font-['Cinzel'] text-lg font-black text-white tracking-wider">
              {nextPrayer.name.toUpperCase()}
            </span>
            <span className="text-[11px] text-[#d7e3fc]/70 font-sans">
              {isBetweenAthanAndIqamah ? `Iqamah at ${nextPrayer.iqamah}` : `Athan at ${nextPrayer.athan}`}
            </span>
          </div>

          {/* Large Gold Monospace Countdown */}
          <div className="font-mono font-black text-2xl sm:text-3xl text-[#f0be50] tracking-wider drop-shadow-md tabular-nums">
            {formattedCountdown}
          </div>
        </div>
      </div>

      {/* 2. MAIN CARD: Prayer Times Table */}
      <div className="w-full flex-1 bg-gradient-to-b from-[#0d1c2e] via-[#0f1f33] to-[#142032] border border-[#f0be50]/30 rounded-xl p-3.5 flex flex-col justify-between shadow-xl relative overflow-hidden">
        <KioskCornerAccent position="bottom-left" size={18} />
        <KioskCornerAccent position="bottom-right" size={18} />

        {/* Table Header */}
        <div className="grid grid-cols-12 pb-2 border-b border-[#f0be50]/25 text-[11px] font-['Cinzel'] font-bold tracking-wider text-[#f0be50] uppercase z-10">
          <span className="col-span-5 text-left">PRAYER</span>
          <span className="col-span-3 text-center">ATHAN</span>
          <span className="col-span-4 text-right pr-1">IQAMAH</span>
        </div>

        {/* Prayer Rows List */}
        <div className="flex-1 flex flex-col justify-around py-1 space-y-1 z-10">
          {prayers.map((prayer) => {
            const isCurrent = prayerState.currentPrayer?.key === prayer.key;
            const isNext = prayerState.nextPrayer?.key === prayer.key && !isCurrent;
            const isPast =
              prayerState.currentPrayer &&
              prayer.athanMinutes < prayerState.currentPrayer.athanMinutes &&
              !isCurrent;

            return (
              <div
                key={prayer.key}
                className={`grid grid-cols-12 items-center px-2.5 py-1.5 rounded-lg transition-all ${
                  isCurrent
                    ? 'bg-[#f0be50]/15 border border-[#f0be50] text-[#f0be50] shadow-[0_0_12px_rgba(240,190,80,0.18)]'
                    : isNext
                    ? 'bg-white/5 border border-white/10 text-white'
                    : isPast
                    ? 'opacity-50 text-[#d7e3fc]/60'
                    : 'text-white'
                }`}
              >
                {/* Prayer Name & Arabic */}
                <div className="col-span-5 flex items-center space-x-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCurrent ? 'bg-[#f0be50] animate-ping' : isNext ? 'bg-white/60' : 'bg-transparent'
                    }`}
                  />
                  <div className="flex flex-col">
                    <span className="font-['Cinzel'] font-bold text-xs sm:text-sm tracking-wide">
                      {prayer.name}
                    </span>
                    <span className="font-['Amiri'] text-[11px] text-[#f0be50]/80 leading-none" dir="rtl">
                      {prayer.arabicName}
                    </span>
                  </div>
                </div>

                {/* Athan Time */}
                <span className="col-span-3 text-center font-mono text-xs sm:text-sm font-semibold tabular-nums">
                  {prayer.athan}
                </span>

                {/* Iqamah Time */}
                <span className="col-span-4 text-right font-mono text-xs sm:text-sm font-bold tracking-wide text-white pr-1 tabular-nums">
                  {prayer.iqamah}
                </span>
              </div>
            );
          })}

          {/* Jumu'ah Row at Bottom */}
          <div className="grid grid-cols-12 items-center px-2.5 py-1.5 rounded-lg bg-[#c9a227]/10 border border-[#f0be50]/30 text-white">
            <div className="col-span-5 flex items-center space-x-2">
              <span className="text-[#f0be50] text-xs">✦</span>
              <div className="flex flex-col">
                <span className="font-['Cinzel'] font-bold text-xs sm:text-sm text-[#f0be50] tracking-wide">
                  Jumu'ah
                </span>
                <span className="font-['Amiri'] text-[11px] text-[#f0be50]" dir="rtl">
                  الجُمُعَة
                </span>
              </div>
            </div>

            <span className="col-span-3 text-center font-mono text-xs text-[#d7e3fc]/80">
              Khutbah
            </span>

            <span className="col-span-4 text-right font-mono text-xs sm:text-sm font-bold text-[#f0be50] pr-1">
              {jumuahTimes.join(' & ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
