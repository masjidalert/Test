import React, { useState } from 'react';
import {
  PrayerTime,
  JanazahAlertData,
  CommunityAlert,
  MosqueProfile,
} from '../types';
import { DignifiedJanazahCard } from './DignifiedJanazahCard';
import { MasjidAlertBrandIcon } from './MasjidAlertBrandIcon';
import { OrnateCorner, RubElHizbStar } from './ArabesquePatterns';
import { INITIAL_JANAZAH_DETAILS, FEATURED_MOSQUES } from '../data/mobileData';
import {
  MapPin,
  Clock,
  Compass,
  Moon,
  Sun,
  ChevronRight,
  Sparkles,
  Volume2,
  VolumeX,
  Calendar,
  Utensils,
  SunMedium,
  Heart,
  ChevronDown,
} from 'lucide-react';

interface MobileHomeScreenProps {
  prayerTimes: PrayerTime[];
  currentTime: Date;
  isLight?: boolean;
  activeMosque?: MosqueProfile;
  onNavigateToAlerts: () => void;
  onNavigateToJanazahDetail: (data: JanazahAlertData) => void;
  onNavigateToQibla: () => void;
  onNavigateToGiving?: () => void;
  onNavigateToMasjids?: () => void;
}

export const MobileHomeScreen: React.FC<MobileHomeScreenProps> = ({
  prayerTimes,
  currentTime,
  isLight = false,
  activeMosque = FEATURED_MOSQUES[0],
  onNavigateToAlerts,
  onNavigateToJanazahDetail,
  onNavigateToQibla,
  onNavigateToGiving,
  onNavigateToMasjids,
}) => {
  const [selectedMosque, setSelectedMosque] = useState<MosqueProfile>(activeMosque);
  const [showMosqueSelector, setShowMosqueSelector] = useState(false);
  const [showRamadanBanner, setShowRamadanBanner] = useState(true);
  const [isAdhanMuted, setIsAdhanMuted] = useState(false);

  // Time calculations
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  
  // Find current active and next prayer
  const nonShuruqPrayers = prayerTimes.filter((p) => !p.isShuruq);
  const nextPrayer =
    nonShuruqPrayers.find((p) => p.athanMinutes > currentMinutes) || nonShuruqPrayers[0];

  const minutesUntilNext =
    nextPrayer.athanMinutes > currentMinutes
      ? nextPrayer.athanMinutes - currentMinutes
      : 24 * 60 - currentMinutes + nextPrayer.athanMinutes;

  const hoursRemaining = Math.floor(minutesUntilNext / 60);
  const minsRemaining = minutesUntilNext % 60;

  // Gregorian & Hijri Dates
  const gregorianDateStr = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const hijriDateStr = '8 Safar 1448 AH';

  // Ramadan / Fasting Timings
  const fajrPrayer = prayerTimes.find((p) => p.key === 'fajr');
  const maghribPrayer = prayerTimes.find((p) => p.key === 'maghrib');

  return (
    <div className="w-full space-y-3.5">
      {/* 1. TOP HEADER: App Logo, GPS City Badge, Gregorian & Hijri Dates */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
          isLight
            ? 'bg-white border-[#8C630D]/30 shadow-sm'
            : 'bg-[#04110B] border-[#C5A059]/30 shadow-md'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <MasjidAlertBrandIcon size={26} showText={true} isLight={isLight} />
              <button
                onClick={onNavigateToMasjids}
                className="flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 transition-all"
              >
                <MapPin className="w-3 h-3" />
                <span>{selectedMosque.cityState}</span>
              </button>
            </div>
            <div className="mt-1 flex items-center space-x-2 text-[11px]">
              <span className="opacity-80 font-medium">{gregorianDateStr}</span>
              <span className="text-[#C5A059] font-bold">· {hijriDateStr}</span>
            </div>
          </div>

          {/* Mute/Sound Toggle */}
          <button
            onClick={() => setIsAdhanMuted(!isAdhanMuted)}
            title={isAdhanMuted ? 'Unmute Athan' : 'Mute Athan'}
            className={`p-2 rounded-xl border ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-[#071F15] border-slate-800 text-[#FFDF78]'
            }`}
          >
            {isAdhanMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Active Mosque Bar */}
        <div className="mt-2.5 pt-2 border-t border-opacity-15 border-current flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="text-sm">🕌</span>
            <span className="font-bold">{selectedMosque.name}</span>
            <span className="text-[10px] opacity-60">({selectedMosque.distance})</span>
          </div>

          <button
            onClick={onNavigateToMasjids}
            className={`text-[11px] font-bold ${isLight ? 'text-[#8C630D]' : 'text-[#FFDF78]'}`}
          >
            Change Mosque →
          </button>
        </div>
      </div>

      {/* 2. RAMADAN / VOLUNTARY FASTING BANNER (Suhoor/Imsak & Iftar Countdown) */}
      {showRamadanBanner && (
        <div
          className={`p-3 rounded-2xl border relative overflow-hidden transition-all ${
            isLight
              ? 'bg-gradient-to-r from-[#FAF4E8] via-[#F5ECD7] to-[#FAF4E8] border-[#8C630D]/40 text-slate-900'
              : 'bg-gradient-to-r from-[#082015] via-[#04110B] to-[#082015] border-[#C5A059]/40 text-slate-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-[#C5A059] flex items-center justify-center font-bold text-sm">
                🌙
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider">
                    Fasting & Suhoor Schedule
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#0D5C3A] text-[#FFDF78] font-bold rounded">
                    SUNNAH FAST
                  </span>
                </div>
                <div className="text-[11px] opacity-75 mt-0.5 flex items-center space-x-3 font-mono">
                  <span>Suhoor ends: <strong>{fajrPrayer?.athan || '5:12 AM'}</strong></span>
                  <span>·</span>
                  <span>Iftar (Sunset): <strong>{maghribPrayer?.athan || '7:58 PM'}</strong></span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowRamadanBanner(false)}
              className="text-[10px] opacity-50 hover:opacity-100 p-1"
              title="Dismiss banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 3. NEXT PRAYER CARD (Most prominent element on screen) */}
      <div
        className={`relative p-4 sm:p-5 rounded-[24px] border-2 shadow-lg overflow-hidden transition-all ${
          isLight
            ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#EFE4CF] border-[#8C630D]/70'
            : 'bg-gradient-to-b from-[#061C14] via-[#030F0A] to-[#010604] border-[#C5A059]/80'
        }`}
      >
        <OrnateCorner position="top-left" size={18} className={isLight ? 'text-[#8C630D]' : 'text-[#FFDF78]'} />
        <OrnateCorner position="top-right" size={18} className={isLight ? 'text-[#8C630D]' : 'text-[#FFDF78]'} />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <RubElHizbStar size={12} />
            <span
              className={`font-['Cinzel'] font-bold text-[11px] uppercase tracking-widest ${
                isLight ? 'text-[#644605]' : 'text-[#FFDF78]'
              }`}
            >
              Upcoming Congregation
            </span>
          </div>

          <div className="flex items-center space-x-1 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            <Clock className="w-3.5 h-3.5" />
            <span>
              in {hoursRemaining > 0 ? `${hoursRemaining}h ` : ''}
              {minsRemaining}m
            </span>
          </div>
        </div>

        {/* Large Prayer Headline */}
        <div className="flex items-end justify-between py-1">
          <div>
            <div className="flex items-baseline space-x-2">
              <h2
                className={`font-['Cinzel'] text-2xl sm:text-3xl font-extrabold tracking-wide ${
                  isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
                }`}
              >
                {nextPrayer.name}
              </h2>
              <span className="font-['Amiri'] text-lg opacity-75">{nextPrayer.arabicName}</span>
            </div>
            <div className="text-xs opacity-75 mt-0.5">
              Athan Call to Prayer at <span className="font-bold">{nextPrayer.athan}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-['Cinzel'] uppercase opacity-60 block">
              Iqamah Salah
            </span>
            <span className="font-mono font-extrabold text-lg sm:text-xl text-[#8C630D] dark:text-[#FFDF78]">
              {nextPrayer.iqamah}
            </span>
          </div>
        </div>
      </div>

      {/* 4. PRAYER TIMES TABLE (All 6 Prayers: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) */}
      <div
        className={`p-4 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#04110B] border-slate-800'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider opacity-70">
            Daily Prayer Schedule (6 Prayers)
          </span>
          <span className="text-[10px] opacity-60">ISNA Calculation · Angle 15°</span>
        </div>

        {/* 6-Prayer Clean Table */}
        <div className="space-y-1.5">
          {prayerTimes.map((prayer) => {
            const isNext = nextPrayer.key === prayer.key;
            const isPast = prayer.athanMinutes < currentMinutes && !isNext;

            return (
              <div
                key={prayer.key}
                className={`px-3 py-2 rounded-xl border flex items-center justify-between transition-all ${
                  isNext
                    ? isLight
                      ? 'bg-[#FAF4E8] border-[#8C630D] ring-1 ring-[#8C630D]/50 shadow-sm'
                      : 'bg-[#0E3524] border-[#FFDF78] ring-1 ring-[#FFDF78]/50 shadow-[0_0_10px_rgba(255,223,120,0.2)]'
                    : isPast
                    ? 'opacity-40 bg-transparent border-transparent'
                    : isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-[#020805] border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-16">
                    <span className="font-bold text-xs block">{prayer.name}</span>
                    <span className="font-['Amiri'] text-[10px] opacity-75">{prayer.arabicName}</span>
                  </div>

                  {prayer.isShuruq && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-500 rounded font-semibold">
                      Sunrise
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-6">
                  <div>
                    <span className="text-[9px] opacity-50 block uppercase">Athan</span>
                    <span className="font-mono font-bold text-xs">{prayer.athan}</span>
                  </div>

                  <div className="text-right w-16">
                    <span className="text-[9px] opacity-50 block uppercase">Iqamah</span>
                    <span
                      className={`font-mono font-bold text-xs ${
                        isNext ? 'text-[#8C630D] dark:text-[#FFDF78]' : ''
                      }`}
                    >
                      {prayer.iqamah}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. QIBLA DIRECTION BUTTON ROW */}
      <button
        onClick={onNavigateToQibla}
        className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
          isLight
            ? 'bg-white border-slate-200 hover:border-[#8C630D]/60 shadow-sm'
            : 'bg-[#05140E] border-slate-800 hover:border-[#C5A059]/60 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs block">Qibla Direction & Compass</span>
            <span className="text-[10px] opacity-70">
              43° NE from {selectedMosque.city} · 12,240 km to Noble Kaaba
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs font-bold text-[#C5A059]">
          <span>Open</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>

      {/* 6. DIGNIFIED SOLEMN JANAZAH NOTICE */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span
              className={`font-['Cinzel'] font-bold text-xs uppercase tracking-wider ${
                isLight ? 'text-[#644605]' : 'text-[#FFDF78]'
              }`}
            >
              Active Janazah Alert
            </span>
          </div>

          <button
            onClick={onNavigateToAlerts}
            className={`text-xs font-semibold ${isLight ? 'text-[#0D5C3A]' : 'text-[#C5A059]'}`}
          >
            All Alerts →
          </button>
        </div>

        <DignifiedJanazahCard
          data={INITIAL_JANAZAH_DETAILS}
          isLight={isLight}
          onOpenDetails={onNavigateToJanazahDetail}
          compact={false}
        />
      </div>
    </div>
  );
};
