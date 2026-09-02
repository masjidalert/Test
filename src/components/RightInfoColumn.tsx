import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { DailyWisdom, Announcement, KioskConfig } from '../types';
import { KioskCornerAccent, KioskRubElHizb } from './KioskDecorations';
import { CloudSun, Sun, Moon, Volume2 } from 'lucide-react';

interface RightInfoColumnProps {
  config: KioskConfig;
  wisdom: DailyWisdom;
  announcement: Announcement;
  onTestAthan?: () => void;
}

export const RightInfoColumn: React.FC<RightInfoColumnProps> = ({
  config,
  wisdom,
  announcement,
}) => {
  return (
    <div className="w-full lg:w-[30%] h-full flex flex-col gap-3">
      {/* 1. TOP CARD: Donation QR Code Card */}
      <div className="w-full bg-gradient-to-br from-[#0d1c2e] to-[#142032] border border-[#f0be50]/30 rounded-xl p-3.5 flex items-center justify-between shadow-lg relative overflow-hidden shrink-0">
        <KioskCornerAccent position="top-left" size={16} />
        <KioskCornerAccent position="top-right" size={16} />

        <div className="flex flex-col justify-between pr-3 z-10">
          <div>
            <div className="flex items-center space-x-1.5 text-[#f0be50] mb-0.5">
              <KioskRubElHizb size={14} active />
              <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-widest">
                SUPPORT THE MASJID
              </span>
            </div>
            <span className="font-['Cinzel'] text-sm font-black text-white tracking-wide block">
              Sadaqah & Operations
            </span>
            <p className="text-[11px] text-[#d7e3fc]/70 font-sans mt-0.5 leading-snug">
              Scan with your phone camera to donate securely.
            </p>
          </div>

          <div className="mt-2 inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#071325] border border-[#f0be50]/30 w-fit">
            <span className="text-[10px] font-mono text-[#f0be50] font-bold">
              {config.donationUrl}
            </span>
          </div>
        </div>

        {/* High-Contrast QR Code */}
        <div className="p-2 bg-white rounded-xl shadow-md shrink-0 z-10 border-2 border-[#f0be50]">
          <QRCodeSVG
            value={`https://${config.donationUrl}`}
            size={72}
            bgColor="#ffffff"
            fgColor="#071325"
            level="M"
          />
        </div>
      </div>

      {/* 2. MIDDLE CARD: Islamic Wisdom / Hadith Card */}
      <div className="w-full flex-1 bg-gradient-to-b from-[#0d1c2e] via-[#0f1f33] to-[#142032] border border-[#f0be50]/30 rounded-xl p-3.5 flex flex-col justify-between shadow-xl relative overflow-hidden">
        <KioskCornerAccent position="top-left" size={16} />
        <KioskCornerAccent position="bottom-right" size={16} />

        {/* Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#f0be50]/20 z-10">
          <div className="flex items-center space-x-1.5 text-[#f0be50]">
            <span className="text-xs">✦</span>
            <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-widest">
              DAILY AYAH & WISDOM
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#d7e3fc]/60 uppercase">
            {wisdom.reference}
          </span>
        </div>

        {/* Arabic Text (Amiri Font) */}
        <div className="my-auto py-2 text-center z-10">
          <p
            className="font-['Amiri'] text-base sm:text-lg font-bold text-[#f0be50] leading-relaxed select-none"
            dir="rtl"
          >
            {wisdom.arabic}
          </p>
          <p className="text-xs sm:text-sm text-white/90 font-sans mt-2 italic leading-relaxed">
            "{wisdom.translation}"
          </p>
        </div>

        {/* Reference Footer */}
        <div className="pt-1 flex items-center justify-between text-[10px] text-[#d7e3fc]/60 font-sans border-t border-white/5 z-10">
          <span>{wisdom.type === 'quran' ? 'Noble Qur\'an' : 'Prophetic Hadith'}</span>
          <span className="text-[#f0be50] font-semibold">{wisdom.reference}</span>
        </div>
      </div>

      {/* 3. BOTTOM CARD: Weather Widget & Community Announcement Card */}
      <div className="w-full bg-gradient-to-br from-[#0d1c2e] to-[#142032] border border-[#f0be50]/30 rounded-xl p-3 flex flex-col justify-between shadow-lg relative overflow-hidden shrink-0">
        <KioskCornerAccent position="bottom-left" size={16} />
        <KioskCornerAccent position="bottom-right" size={16} />

        <div className="flex items-center justify-between z-10 pb-1.5 border-b border-white/10">
          {/* Weather Widget */}
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-[#071325] text-[#f0be50] border border-[#f0be50]/30">
              <Sun className="w-4 h-4 text-[#f0be50]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1">
                <span className="font-mono text-sm font-bold text-white">
                  {config.weather.temp}°F
                </span>
                <span className="text-[10px] text-[#d7e3fc]/70 font-sans">
                  {config.weather.condition}
                </span>
              </div>
              <span className="text-[9px] text-[#d7e3fc]/60">
                Sunset: {config.weather.sunset} · H: {config.weather.high}° L: {config.weather.low}°
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-['Cinzel'] font-bold text-[#f0be50] uppercase">
              MASJID NOTICE
            </span>
          </div>
        </div>

        {/* Announcement Ticker/Snippet */}
        <div className="mt-1.5 flex items-center space-x-2 z-10">
          <span className="text-[#f0be50] text-xs">📢</span>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">
              {announcement.title}
            </p>
            <p className="text-[10px] text-[#d7e3fc]/70 truncate">
              {announcement.details}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
