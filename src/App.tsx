import React, { useState, useEffect } from 'react';
import {
  INITIAL_PRAYER_TIMES,
  DAILY_WISDOM_LIST,
  ANNOUNCEMENTS_LIST,
  INITIAL_JANAZAH,
  DEFAULT_CONFIG,
} from './data/kioskData';
import { calculatePrayerState } from './utils/prayerUtils';
import { KioskHeader } from './components/KioskHeader';
import { JanazahAlertBanner } from './components/JanazahAlertBanner';
import { LeftPrayerColumn } from './components/LeftPrayerColumn';
import { CenterMihrabColumn } from './components/CenterMihrabColumn';
import { RightInfoColumn } from './components/RightInfoColumn';
import { KioskFooter } from './components/KioskFooter';
import { KioskArabesqueBackground, KioskCornerAccent } from './components/KioskDecorations';
import { Sparkles, Bell, Calendar, Eye } from 'lucide-react';

export type KioskScreenMode = 'main' | 'janazah' | 'jumuah';

export const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [screenMode, setScreenMode] = useState<KioskScreenMode>('main');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Active wisdom and announcement rotation
  const [wisdomIndex, setWisdomIndex] = useState<number>(0);
  const [announcementIndex, setAnnouncementIndex] = useState<number>(0);

  // Real-time clock update (every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Periodic rotation of wisdom and announcements
  useEffect(() => {
    const rotateTimer = setInterval(() => {
      setWisdomIndex((prev) => (prev + 1) % DAILY_WISDOM_LIST.length);
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS_LIST.length);
    }, 15000);
    return () => clearInterval(rotateTimer);
  }, []);

  // Keyboard shortcut listener for Amazon Fire TV remote or kiosk testing (1: Main, 2: Janazah, 3: Jumu'ah)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') setScreenMode('main');
      if (e.key === '2') setScreenMode('janazah');
      if (e.key === '3') setScreenMode('jumuah');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const prayerState = calculatePrayerState(INITIAL_PRAYER_TIMES, currentTime);
  const currentWisdom = DAILY_WISDOM_LIST[wisdomIndex];
  const currentAnnouncement = ANNOUNCEMENTS_LIST[announcementIndex];

  return (
    <div className="w-full h-full bg-[#071325] text-white p-5 flex flex-col justify-between select-none relative overflow-hidden font-sans">
      {/* 1. Subtle 8-Point Star Geometric Islamic Background Texture */}
      <KioskArabesqueBackground opacity={0.035} />

      {/* 2. TV Safe Zone Outer Corner Accents */}
      <KioskCornerAccent position="top-left" size={28} className="text-[#f0be50]/30" />
      <KioskCornerAccent position="top-right" size={28} className="text-[#f0be50]/30" />
      <KioskCornerAccent position="bottom-left" size={28} className="text-[#f0be50]/30" />
      <KioskCornerAccent position="bottom-right" size={28} className="text-[#f0be50]/30" />

      {/* ------------------------------------------------------------------ */}
      {/* HEADER SECTION (Full Width)                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="w-full flex flex-col gap-2.5 shrink-0 z-20">
        <KioskHeader
          masjidName={DEFAULT_CONFIG.masjidName}
          cityState={DEFAULT_CONFIG.cityState}
          currentTime={currentTime}
        />

        {/* SCREEN 2: JANAZAH ALERT MODE BANNER */}
        {screenMode === 'janazah' && (
          <JanazahAlertBanner janazah={INITIAL_JANAZAH} />
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN 3-COLUMN LAYOUT (Left 30%, Center 40%, Right 30%)              */}
      {/* ------------------------------------------------------------------ */}
      <main className="w-full flex-1 flex flex-col lg:flex-row gap-3 py-3 z-10 overflow-hidden min-h-0">
        {/* Left Column (30%): Countdown Card + Prayer Times Table */}
        <LeftPrayerColumn
          prayers={INITIAL_PRAYER_TIMES}
          prayerState={prayerState}
          jumuahTimes={DEFAULT_CONFIG.jumuahTimes}
        />

        {/* Center Column (40%): Mihrab Islamic Arch with Bismillah & Countdown / Jumu'ah Friday Mode */}
        <CenterMihrabColumn
          prayerState={prayerState}
          isFridayMode={screenMode === 'jumuah'}
          jumuahTimes={DEFAULT_CONFIG.jumuahTimes}
          khateebs={DEFAULT_CONFIG.khateebs}
        />

        {/* Right Column (30%): Donation QR + Hadith/Ayah Wisdom + Weather & Announcements */}
        <RightInfoColumn
          config={DEFAULT_CONFIG}
          wisdom={currentWisdom}
          announcement={currentAnnouncement}
        />
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER SECTION (Full Width) & SCREEN MODE SWITCHER                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="w-full flex flex-col gap-2 shrink-0 z-20">
        <KioskFooter
          masjidName={DEFAULT_CONFIG.masjidName}
          isWifiConnected={DEFAULT_CONFIG.wifiConnected}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted((prev) => !prev)}
        />

        {/* Screen Mode Quick Switcher (For Fire TV Kiosk Testing & Live Demonstrations) */}
        <div className="w-full flex items-center justify-center space-x-2 pt-0.5">
          <span className="text-[10px] uppercase font-['Cinzel'] font-bold text-[#f0be50]/60 tracking-wider hidden sm:inline">
            Screen View:
          </span>

          {/* Mode 1: Main Kiosk View */}
          <button
            onClick={() => setScreenMode('main')}
            className={`px-3 py-1 rounded-full text-xs font-['Cinzel'] font-bold tracking-wider transition-all flex items-center space-x-1.5 ${
              screenMode === 'main'
                ? 'bg-[#f0be50] text-[#071325] shadow-md scale-105'
                : 'bg-[#0d1c2e] text-[#d7e3fc]/70 border border-white/10 hover:border-[#f0be50]/40'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>1. Main Kiosk View</span>
          </button>

          {/* Mode 2: Janazah Alert Mode */}
          <button
            onClick={() => setScreenMode('janazah')}
            className={`px-3 py-1 rounded-full text-xs font-['Cinzel'] font-bold tracking-wider transition-all flex items-center space-x-1.5 ${
              screenMode === 'janazah'
                ? 'bg-rose-600 text-white border border-[#f0be50] shadow-md scale-105 animate-pulse'
                : 'bg-[#0d1c2e] text-[#d7e3fc]/70 border border-white/10 hover:border-rose-400/40'
            }`}
          >
            <Bell className="w-3 h-3 text-[#f0be50]" />
            <span>2. Janazah Alert Mode</span>
          </button>

          {/* Mode 3: Jumu'ah Friday Mode */}
          <button
            onClick={() => setScreenMode('jumuah')}
            className={`px-3 py-1 rounded-full text-xs font-['Cinzel'] font-bold tracking-wider transition-all flex items-center space-x-1.5 ${
              screenMode === 'jumuah'
                ? 'bg-[#c9a227] text-[#071325] font-black border border-[#f0be50] shadow-md scale-105'
                : 'bg-[#0d1c2e] text-[#d7e3fc]/70 border border-white/10 hover:border-[#f0be50]/40'
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span>3. Jumu'ah Friday Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
