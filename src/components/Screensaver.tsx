import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getClockComponents } from '../utils/prayerUtils';
import { ArabesqueBackgroundPattern, IslamicDivider, RubElHizbStar, OrnateCorner } from './ArabesquePatterns';
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  Play,
  Pause,
  MapPin,
  Eye,
  Info,
} from 'lucide-react';

// Pure Architectural Islamic Photography with ZERO Arabic script or Calligraphy on structures
import whiteColonnadeImg from '../assets/images/white_marble_colonnade_1787854017875.jpg';
import minaretsTwilightImg from '../assets/images/minarets_twilight_sky_1787854030818.jpg';
import marbleDawnCourtyardImg from '../assets/images/marble_courtyard_dawn_1787854042492.jpg';
import horseshoeArchesImg from '../assets/images/horseshoe_arches_andalusia_1787854054093.jpg';
import geometricDomeImg from '../assets/images/geometric_dome_interior_1787854064852.jpg';
import stonePorticoImg from '../assets/images/stone_archway_portico_1787854075699.jpg';

interface ScreensaverProps {
  isActive: boolean;
  onWakeUp: () => void;
  currentTime: Date;
  nextPrayerName?: string;
  nextPrayerTime?: string;
}

export type ScreensaverViewMode = 'standalone_photos' | 'clock_ambient';

export interface StandaloneMosqueImage {
  id: string;
  title: string;
  arabicName: string;
  location: string;
  architecturalFeature: string;
  image: string;
  // Cinematic slow Ken Burns pan/zoom vectors
  initialTransform: { scale: number; x: string; y: string };
  targetTransform: { scale: number; x: string; y: string };
}

export const STANDALONE_MOSQUE_IMAGES: StandaloneMosqueImage[] = [
  {
    id: 'marble_colonnade',
    title: 'Grand Marble Colonnade',
    arabicName: 'أروقة الرخام الأبيض والمصابيح',
    location: 'Prophetic Classical Architecture',
    architecturalFeature: 'Smooth White Marble Pillars & Lanterns',
    image: whiteColonnadeImg,
    initialTransform: { scale: 1.0, x: '0%', y: '0%' },
    targetTransform: { scale: 1.1, x: '-2%', y: '-1.5%' },
  },
  {
    id: 'minarets_twilight',
    title: 'Twilight Minarets & Domes',
    arabicName: 'المآذن والقباب وقت الغسق',
    location: 'Sanctuary Skyline & Crescent Finials',
    architecturalFeature: 'Illuminated Minaret Spires at Dusk',
    image: minaretsTwilightImg,
    initialTransform: { scale: 1.02, x: '1.5%', y: '-1%' },
    targetTransform: { scale: 1.12, x: '-1.5%', y: '1%' },
  },
  {
    id: 'marble_sahn',
    title: 'Reflective Sahn Courtyard at Dawn',
    arabicName: 'صحن المسجد والمرايا الرخامية',
    location: 'Open-Air Marble Sanctuary Portico',
    architecturalFeature: 'Mirror Water Reflection & Morning Mist',
    image: marbleDawnCourtyardImg,
    initialTransform: { scale: 1.0, x: '1%', y: '-1%' },
    targetTransform: { scale: 1.1, x: '-1%', y: '1.5%' },
  },
  {
    id: 'horseshoe_arcade',
    title: 'Andalusian Horseshoe Arcade',
    arabicName: 'العمارة الأندلسية والعقود الحدوية',
    location: 'Cordoba Geometric Architecture',
    architecturalFeature: 'Two-Tiered Alternating Stone Arches',
    image: horseshoeArchesImg,
    initialTransform: { scale: 1.1, x: '-1%', y: '-1.5%' },
    targetTransform: { scale: 1.0, x: '1.5%', y: '1%' },
  },
  {
    id: 'geometric_dome',
    title: 'Geometric Symmetry Dome',
    arabicName: 'القبة الهندسية وثريا المصلى',
    location: 'Pure Geometric Islamic Woodwork',
    architecturalFeature: '16-Point Star Lattice & Ring Chandelier',
    image: geometricDomeImg,
    initialTransform: { scale: 1.1, x: '0.5%', y: '1.5%' },
    targetTransform: { scale: 1.0, x: '-0.5%', y: '-0.5%' },
  },
  {
    id: 'stone_portico',
    title: 'Sandstone Portico & Oasis Sunset',
    arabicName: 'الأروقة الحجرية وإطلالة الواحة',
    location: 'Traditional Desert Stone Masonry',
    architecturalFeature: 'Carved Sandstone Archways & Brass Lamps',
    image: stonePorticoImg,
    initialTransform: { scale: 1.08, x: '-1.5%', y: '1%' },
    targetTransform: { scale: 1.0, x: '1%', y: '-1%' },
  },
];

const ISLAMIC_AYAT_LIST = [
  {
    arabic: 'وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ',
    english: '“And establish prayer at the two ends of the day and at the approach of the night. Indeed, good deeds do away with misdeeds.”',
    reference: 'Surah Hud (11:114)',
  },
  {
    arabic: 'فِي بُيُوتٍ أَذِنَ اللَّهُ أَن تُرْفَعَ وَيُذْكَرَ فِيهَا اسْمُهُ يُسَبِّحُ لَهُ فِيهَا بِالْغُدُوِّ وَالْآصَالِ',
    english: '“[Such niches are] in mosques which Allah has ordered to be raised and that His name be mentioned therein.”',
    reference: 'Surah An-Nur (24:36)',
  },
  {
    arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    english: '“Unquestionably, by the remembrance of Allah hearts are assured.”',
    reference: 'Surah Ar-Ra’d (13:28)',
  },
];

export const Screensaver: React.FC<ScreensaverProps> = ({
  isActive,
  onWakeUp,
  currentTime,
  nextPrayerName = 'Fajr',
  nextPrayerTime = '05:20 AM',
}) => {
  // Default to standalone pure mosque architecture mode
  const [viewMode, setViewMode] = useState<ScreensaverViewMode>('standalone_photos');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
  const [showCaption, setShowCaption] = useState<boolean>(true);
  const [ayahIndex, setAyahIndex] = useState<number>(0);
  const [burnInOffset, setBurnInOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeImage = useMemo(
    () => STANDALONE_MOSQUE_IMAGES[currentImageIndex] || STANDALONE_MOSQUE_IMAGES[0],
    [currentImageIndex]
  );

  // Auto-cycle through standalone images every 16 seconds
  useEffect(() => {
    if (!isActive || !isAutoCycling || viewMode !== 'standalone_photos') return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % STANDALONE_MOSQUE_IMAGES.length);
    }, 16000);
    return () => clearInterval(interval);
  }, [isActive, isAutoCycling, viewMode]);

  // Rotate Ayat for clock mode
  useEffect(() => {
    if (!isActive || viewMode !== 'clock_ambient') return;
    const interval = setInterval(() => {
      setAyahIndex((prev) => (prev + 1) % ISLAMIC_AYAT_LIST.length);
    }, 14000);
    return () => clearInterval(interval);
  }, [isActive, viewMode]);

  // Anti burn-in pixel drift
  useEffect(() => {
    if (!isActive) return;
    const driftInterval = setInterval(() => {
      const offsetX = Math.sin(Date.now() / 15000) * 10;
      const offsetY = Math.cos(Date.now() / 15000) * 8;
      setBurnInOffset({ x: offsetX, y: offsetY });
    }, 10000);
    return () => clearInterval(driftInterval);
  }, [isActive]);

  if (!isActive) return null;

  const { hours, minutes, seconds } = getClockComponents(currentTime);
  const isSecondEven = currentTime.getSeconds() % 2 === 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between select-none overflow-hidden"
        style={{
          aspectRatio: '16/10', // 1280x800 native ratio
        }}
      >
        {/* ========================================================================= */}
        {/* MODE A: STANDALONE PURE ARCHITECTURE MOSQUE IMAGES (NO CALLIGRAPHY)       */}
        {/* ========================================================================= */}
        {viewMode === 'standalone_photos' ? (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            {/* 1. Crystal Clear, Full-Screen Pure Architectural Image with Ken Burns Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage.id}
                  initial={{
                    opacity: 0,
                    scale: activeImage.initialTransform.scale,
                    x: activeImage.initialTransform.x,
                    y: activeImage.initialTransform.y,
                  }}
                  animate={{
                    opacity: 1,
                    scale: activeImage.targetTransform.scale,
                    x: activeImage.targetTransform.x,
                    y: activeImage.targetTransform.y,
                    transition: {
                      opacity: { duration: 1.5, ease: 'easeInOut' },
                      scale: { duration: 16, ease: 'linear' },
                      x: { duration: 16, ease: 'linear' },
                      y: { duration: 16, ease: 'linear' },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 1.2, ease: 'easeInOut' },
                  }}
                  className="absolute inset-[-3%] w-[106%] h-[106%]"
                >
                  <img
                    src={activeImage.image}
                    alt={activeImage.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-100 contrast-105"
                    style={{ imageRendering: 'auto' }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Minimal soft top & bottom edge gradients for subtle HUD readability */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Corner Ornate Islamic Accents */}
            <OrnateCorner position="top-left" size={50} className="text-[#FFDF78]/35 pointer-events-none z-10" />
            <OrnateCorner position="top-right" size={50} className="text-[#FFDF78]/35 pointer-events-none z-10" />
            <OrnateCorner position="bottom-left" size={50} className="text-[#FFDF78]/35 pointer-events-none z-10" />
            <OrnateCorner position="bottom-right" size={50} className="text-[#FFDF78]/35 pointer-events-none z-10" />

            {/* 2. Top Minimal Bar */}
            <div className="w-full flex items-center justify-between p-4 sm:p-6 z-20">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FFDF78]/15 border border-[#FFDF78]/30 flex items-center justify-center text-[#FFDF78]">
                  <RubElHizbStar size={14} />
                </div>
                <div>
                  <span className="font-['Cinzel'] text-xs font-bold tracking-widest text-[#FFDF78] block">
                    MASJID ARCHITECTURAL SHOWCASE
                  </span>
                  <span className="text-[10px] text-slate-300">
                    Slide {currentImageIndex + 1} of {STANDALONE_MOSQUE_IMAGES.length}
                  </span>
                </div>
              </div>

              {/* Minimal HUD Controls */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Switch to Clock Mode */}
                <button
                  onClick={() => setViewMode('clock_ambient')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[11px] text-slate-200 hover:text-white hover:border-[#FFDF78] transition-all"
                  title="Switch to Prayer Clock & Qur'an Mode"
                >
                  <Clock className="w-3.5 h-3.5 text-[#FFDF78]" />
                  <span className="hidden sm:inline">Clock Mode</span>
                </button>

                {/* Caption Toggle */}
                <button
                  onClick={() => setShowCaption((v) => !v)}
                  className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-full border backdrop-blur-md text-[11px] transition-all ${
                    showCaption
                      ? 'bg-black/60 border-[#FFDF78]/40 text-[#FFDF78]'
                      : 'bg-black/40 border-white/10 text-slate-400'
                  }`}
                  title="Toggle Mosque Info Caption"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Caption: {showCaption ? 'ON' : 'OFF'}</span>
                </button>

                {/* Slideshow Auto-Cycle Play/Pause */}
                <button
                  onClick={() => setIsAutoCycling((v) => !v)}
                  className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-full border backdrop-blur-md text-[11px] transition-all ${
                    isAutoCycling
                      ? 'bg-black/60 border-emerald-400/50 text-emerald-300'
                      : 'bg-black/40 border-white/10 text-slate-400'
                  }`}
                  title="Toggle Auto Slide Rotation"
                >
                  {isAutoCycling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{isAutoCycling ? '16s' : 'Paused'}</span>
                </button>

                {/* Exit Screensaver Button */}
                <button
                  onClick={onWakeUp}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFDF78] text-[#0A1B3A] font-['Cinzel'] font-bold text-xs shadow-lg hover:bg-white transition-all transform hover:scale-105 active:scale-95"
                >
                  <span>Exit Screensaver</span>
                </button>
              </div>
            </div>

            {/* 3. Floating Left/Right Navigation Arrows */}
            <button
              onClick={() =>
                setCurrentImageIndex((prev) =>
                  prev === 0 ? STANDALONE_MOSQUE_IMAGES.length - 1 : prev - 1
                )
              }
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white/80 hover:text-white hover:scale-110 transition-all backdrop-blur-md"
              title="Previous Mosque Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setCurrentImageIndex((prev) => (prev + 1) % STANDALONE_MOSQUE_IMAGES.length)
              }
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/80 border border-white/20 text-white/80 hover:text-white hover:scale-110 transition-all backdrop-blur-md"
              title="Next Mosque Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* 4. Bottom Info Caption Tag */}
            {showCaption && (
              <div className="w-full flex items-end justify-between p-6 sm:p-8 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.6 }}
                    className="bg-black/75 backdrop-blur-md border border-white/20 px-5 py-3.5 rounded-2xl shadow-2xl max-w-xl"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-[#FFDF78]/20 text-[#FFDF78] text-[10px] font-['Cinzel'] font-bold tracking-wider">
                        {activeImage.architecturalFeature}
                      </span>
                      <span className="text-[11px] text-slate-300 flex items-center font-sans">
                        <MapPin className="w-3 h-3 mr-1 text-emerald-400" />
                        {activeImage.location}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="font-['Cinzel'] text-lg sm:text-2xl font-bold tracking-wide text-white">
                        {activeImage.title}
                      </h2>
                      <span className="font-['Amiri'] text-base sm:text-xl text-[#FFDF78] font-bold" dir="rtl">
                        {activeImage.arabicName}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Compact Carousel Quick-Pills */}
                <div className="hidden sm:flex items-center space-x-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                  {STANDALONE_MOSQUE_IMAGES.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                        currentImageIndex === idx
                          ? 'bg-[#FFDF78] text-[#0A1B3A] shadow-md scale-105'
                          : 'text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {img.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* MODE B: CLASSICAL MONUMENTAL TIMEPIECE & VERIFIED QUR'ANIC AYAT           */
          /* ========================================================================= */
          <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 z-10">
            <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
              <ArabesqueBackgroundPattern />
            </div>

            {/* Top Bar with Switch Back to Standalone Photos */}
            <div className="w-full flex items-center justify-between z-20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFDF78]/10 border border-[#FFDF78]/30 flex items-center justify-center text-[#FFDF78]">
                  <RubElHizbStar size={16} />
                </div>
                <div>
                  <span className="font-['Cinzel'] text-xs sm:text-sm font-bold tracking-widest text-[#FFDF78] block">
                    MASJID ALERT · AMBIENT TIMEPIECE
                  </span>
                  <span className="text-[10px] text-slate-300">
                    Verified Qur'an & Prayer Countdown
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setViewMode('standalone_photos')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#FFDF78] text-[#0A1B3A] font-bold text-xs shadow-md hover:bg-white transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Mosque Photos</span>
                </button>

                <button
                  onClick={onWakeUp}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white font-['Cinzel'] font-bold text-xs hover:bg-white hover:text-black transition-all"
                >
                  Exit
                </button>
              </div>
            </div>

            {/* Monumental Clock & Ayah */}
            <motion.div
              animate={{
                x: burnInOffset.x,
                y: burnInOffset.y,
              }}
              transition={{ duration: 4, ease: 'easeInOut' }}
              className="flex flex-col items-center text-center max-w-4xl px-4 z-10 my-auto mx-auto"
            >
              <div className="font-['Cinzel'] text-7xl sm:text-9xl md:text-[130px] font-bold tracking-tight flex items-baseline drop-shadow-[0_4px_45px_rgba(255,223,120,0.5)] text-[#FFDF78]">
                <span>{hours}</span>
                <span className={`mx-2 sm:mx-3 ${isSecondEven ? 'opacity-100' : 'opacity-20'}`}>:</span>
                <span>{minutes}</span>
                <span className="text-2xl sm:text-4xl md:text-5xl ml-3 sm:ml-5 font-light text-slate-300 font-mono">
                  {seconds}
                </span>
              </div>

              <div className="mt-3 flex items-center space-x-3 text-xs sm:text-base font-['Cinzel'] tracking-widest text-[#FFDF78]/90">
                <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="text-[#C5A059]">✦</span>
                <span>Sha'ban 1447 AH</span>
              </div>

              <div className="relative mt-6 flex flex-col items-center max-w-3xl w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ayahIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center w-full"
                  >
                    <h2 className="font-['Amiri'] text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide leading-relaxed text-center text-[#FFDF78]">
                      {ISLAMIC_AYAT_LIST[ayahIndex].arabic}
                    </h2>
                    <IslamicDivider className="w-64 h-5 my-2.5 opacity-70" width={260} />
                    <p className="font-['Cinzel'] text-xs sm:text-base md:text-lg font-medium text-center leading-relaxed max-w-2xl text-slate-100">
                      {ISLAMIC_AYAT_LIST[ayahIndex].english}
                    </p>
                    <span className="text-[11px] font-mono tracking-widest text-[#C5A059] mt-1.5 block uppercase">
                      — {ISLAMIC_AYAT_LIST[ayahIndex].reference}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 px-6 py-2 rounded-2xl bg-black/60 border border-[#FFDF78]/30 backdrop-blur-md flex items-center space-x-3 text-xs sm:text-sm font-['Cinzel'] tracking-wider text-[#FFDF78]">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Next Prayer: {nextPrayerName} at {nextPrayerTime}</span>
              </div>
            </motion.div>

            {/* Bottom Footer */}
            <div className="w-full flex items-center justify-between z-20 text-[11px] font-['Cinzel'] text-[#C5A059]/90 tracking-[0.16em] uppercase">
              <span>MASJIDALERT AMBIENT DISPLAY</span>
              <span className="text-[10px] text-slate-400 font-sans tracking-normal">
                Autonomous TV Display Mode
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
