import React from 'react';
import { getClockComponents, getFormattedDates } from '../utils/prayerUtils';
import { Moon, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentTime: Date;
  masjidName: string;
  cityState: string;
  isJumuahMode?: boolean;
  isLight?: boolean;
  onOpenScreensaver?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTime,
  masjidName,
  cityState,
  isJumuahMode = false,
  isLight = false,
  onOpenScreensaver,
}) => {
  const { hours, minutes, seconds, ampm } = getClockComponents(currentTime);
  const { gregorian, hijri } = getFormattedDates(currentTime);
  const isSecondEven = currentTime.getSeconds() % 2 === 0;

  return (
    <header
      className={`relative w-full h-[76px] px-8 flex items-center justify-between border-b transition-all duration-1000 ease-in-out select-none z-20 ${
        isLight
          ? 'border-[#BFA054]/40 bg-gradient-to-r from-[#FBF8F1] via-[#F3ECE0] to-[#FBF8F1]'
          : 'border-[#C5A059]/30 bg-gradient-to-r from-[#0D241A] via-[#122E22] to-[#0D241A]'
      }`}
    >
      {/* Left: Masjid Name & Location */}
      <div className="flex flex-col justify-center min-w-[280px]">
        <div className="flex items-center space-x-2">
          <span
            className={`font-['Cinzel'] tracking-[0.16em] text-base md:text-lg font-bold uppercase transition-colors duration-1000 ease-in-out ${
              isLight
                ? 'text-[#0A1B3A] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]'
                : 'text-[#F5E09A] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
            }`}
          >
            {masjidName}
          </span>
          <span className={`text-xs transition-colors duration-1000 ease-in-out ${isLight ? 'text-[#8C630D]/70' : 'text-[#C5A059]/60'}`}>·</span>
          <span
            className={`font-['Cinzel'] tracking-[0.14em] text-xs md:text-sm uppercase transition-colors duration-1000 ease-in-out ${
              isLight ? 'text-[#4A3B18]/90 font-semibold' : 'text-[#E2D4B7]/80'
            }`}
          >
            {cityState}
          </span>
        </div>
        {isJumuahMode && (
          <span
            className={`text-[10px] uppercase font-semibold tracking-widest font-['Cinzel'] mt-0.5 transition-colors duration-1000 ease-in-out ${
              isLight ? 'text-[#8C630D]' : 'text-[#ECC968]/90'
            }`}
          >
            ★ Special Jumu'ah Mubarak Schedule Active
          </span>
        )}
      </div>

      {/* Center: Live Regal Gold Clock with Blinking Colon */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-baseline justify-center tracking-tight">
        <div
          className={`flex items-baseline font-['Cinzel'] text-3xl md:text-4xl lg:text-[42px] font-bold ${
            isLight
              ? 'text-[#091A38] drop-shadow-[0_2px_8px_rgba(140,99,13,0.2)]'
              : 'text-[#ECC968] drop-shadow-[0_2px_12px_rgba(236,201,104,0.35)]'
          }`}
        >
          <span>{hours}</span>
          <span
            className={`mx-0.5 transition-opacity duration-200 ${
              isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'
            } ${isSecondEven ? 'opacity-100' : 'opacity-25'}`}
          >
            :
          </span>
          <span>{minutes}</span>
          <span
            className={`mx-0.5 transition-opacity duration-200 ${
              isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'
            } ${isSecondEven ? 'opacity-100' : 'opacity-25'}`}
          >
            :
          </span>
          <span>{seconds}</span>
          <span
            className={`ml-2 font-['Cinzel'] text-lg md:text-xl font-medium tracking-normal ${
              isLight ? 'text-[#8C630D]' : 'text-[#C5A059]'
            }`}
          >
            {ampm}
          </span>
        </div>
      </div>

      {/* Right: Gregorian Date & Hijri Date & Standby Screensaver Button */}
      <div className="flex items-center justify-end space-x-3 text-right min-w-[280px]">
        <div className="flex items-center space-x-2">
          <span
            className={`font-['Cinzel'] tracking-[0.12em] text-xs md:text-sm uppercase ${
              isLight ? 'font-bold text-[#0A1B3A]' : 'font-semibold text-[#F5E09A]/95'
            }`}
          >
            {gregorian}
          </span>
          <span className={isLight ? 'text-[#8C630D]/70 text-xs' : 'text-[#C5A059]/70 text-xs'}>·</span>
          <span
            className={`font-['Cinzel'] tracking-[0.12em] text-xs md:text-sm uppercase ${
              isLight ? 'font-extrabold text-[#7A570E]' : 'font-bold text-[#ECC968]'
            }`}
          >
            {hijri}
          </span>
        </div>

        {onOpenScreensaver && (
          <button
            onClick={onOpenScreensaver}
            title="Launch Ambient Night Screensaver"
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border text-xs font-['Cinzel'] font-bold tracking-wider transition-all duration-300 ${
              isLight
                ? 'bg-[#FAF4E8] border-[#BFA054]/60 text-[#8C630D] hover:bg-[#8C630D] hover:text-white shadow-sm'
                : 'bg-[#0B2319] border-[#C5A059]/50 text-[#FFDF78] hover:bg-[#143B2C] hover:border-[#FFDF78] shadow-sm'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden xl:inline text-[11px]">Standby</span>
          </button>
        )}
      </div>
    </header>
  );
};
