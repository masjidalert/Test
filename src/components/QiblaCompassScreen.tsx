import React, { useState, useEffect } from 'react';
import { Compass, ArrowLeft, RotateCw, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface QiblaCompassScreenProps {
  isLight?: boolean;
  onBackToHome: () => void;
  cityState?: string;
}

export const QiblaCompassScreen: React.FC<QiblaCompassScreenProps> = ({
  isLight = false,
  onBackToHome,
  cityState = 'Arlington, TX (DFW Metro)',
}) => {
  // Qibla angle from Arlington, TX is approximately 43 degrees NE
  const targetQiblaAngle = 43;
  // Current simulated phone heading in degrees (0 = North)
  const [deviceHeading, setDeviceHeading] = useState<number>(40);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);

  // Compass needle angle relative to phone top
  const needleAngle = (targetQiblaAngle - deviceHeading + 360) % 360;
  // Aligned if needle points straight up (within +/- 3 degrees)
  const isAligned = needleAngle <= 3 || needleAngle >= 357;

  // Real sensor support if device supports orientation
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        // e.alpha represents compass heading on supported devices
        const heading = (360 - e.alpha) % 360;
        setDeviceHeading(Math.round(heading));
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const handleSimulateAlign = () => {
    setIsCalibrating(true);
    setDeviceHeading(targetQiblaAngle);
    setTimeout(() => setIsCalibrating(false), 800);
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className={`p-2 rounded-xl border flex items-center space-x-1.5 text-xs font-semibold transition-all ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
              : 'bg-[#05140E] border-slate-800 text-slate-200 hover:bg-[#082218]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Prayer Times</span>
        </button>

        <div className="text-right">
          <span
            className={`font-['Cinzel'] text-sm sm:text-base font-bold tracking-wide block ${
              isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
            }`}
          >
            Qibla Direction
          </span>
          <span className="text-[10px] opacity-70">{cityState}</span>
        </div>
      </div>

      {/* Status Bar Indicator */}
      <div
        className={`p-3 rounded-2xl border text-center transition-all ${
          isAligned
            ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.25)]'
            : isLight
            ? 'bg-white border-slate-200 text-slate-700'
            : 'bg-[#05140E] border-slate-800 text-slate-300'
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          {isAligned ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 animate-bounce" />
              <span className="font-['Cinzel'] font-bold text-xs sm:text-sm tracking-wider text-emerald-600 dark:text-emerald-400">
                FACING THE NOBLE KAABA (ALIGNED)
              </span>
            </>
          ) : (
            <>
              <RotateCw className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span className="font-['Cinzel'] font-semibold text-xs tracking-wider opacity-85">
                Rotate phone {Math.round(needleAngle)}° to align with Kaaba
              </span>
            </>
          )}
        </div>
      </div>

      {/* Compass Dial Stage */}
      <div
        className={`relative w-full aspect-square max-w-[340px] mx-auto rounded-full border-4 p-4 flex items-center justify-center transition-all ${
          isAligned
            ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
            : isLight
            ? 'border-[#8C630D]/40 bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#EFE4CF] shadow-md'
            : 'border-[#C5A059]/40 bg-gradient-to-b from-[#061811] via-[#030D08] to-[#010604] shadow-xl'
        }`}
      >
        {/* Outer Ring Tick Marks & Cardinal Directions */}
        <div className="absolute inset-2 rounded-full border border-dashed border-current opacity-20 pointer-events-none" />

        {/* Cardinal Directions */}
        <span className="absolute top-3 font-['Cinzel'] font-bold text-xs text-rose-500">N</span>
        <span className="absolute bottom-3 font-['Cinzel'] font-bold text-xs opacity-60">S</span>
        <span className="absolute right-3 font-['Cinzel'] font-bold text-xs opacity-60">E</span>
        <span className="absolute left-3 font-['Cinzel'] font-bold text-xs opacity-60">W</span>

        {/* 360 Tick Dots */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <div
            key={deg}
            className="absolute w-1 h-1 rounded-full bg-current opacity-30"
            style={{
              transform: `rotate(${deg}deg) translateY(-130px)`,
            }}
          />
        ))}

        {/* Central Rotating Needle */}
        <motion.div
          animate={{ rotate: needleAngle }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className="relative w-full h-full flex items-center justify-center pointer-events-none"
        >
          {/* North/Kaaba Tip Pointer */}
          <div className="absolute top-4 flex flex-col items-center">
            {/* Kaaba Golden Icon */}
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center text-base shadow-lg transition-transform ${
                isAligned ? 'scale-125 bg-emerald-600 border-white text-white' : 'bg-black border-[#FFDF78] text-[#FFDF78]'
              }`}
            >
              🕋
            </div>
            {/* Triangle pointer */}
            <div
              className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] -mt-0.5 ${
                isAligned ? 'border-b-emerald-500' : 'border-b-[#C5A059]'
              }`}
            />
          </div>

          {/* Compass Needle Body */}
          <div
            className={`w-1 h-32 rounded-full ${
              isAligned ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-gradient-to-b from-[#FFDF78] via-[#8C630D] to-slate-600'
            }`}
          />

          {/* South Tail pointer */}
          <div className="absolute bottom-6 w-2.5 h-2.5 rounded-full bg-slate-600 opacity-60" />
        </motion.div>

        {/* Center Pivot Star */}
        <div
          className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 shadow ${
            isAligned
              ? 'bg-emerald-600 border-white text-white font-bold text-xs'
              : isLight
              ? 'bg-[#8C630D] border-[#FFDF78] text-[#FFDF78] text-xs'
              : 'bg-[#03130C] border-[#FFDF78] text-[#FFDF78] text-xs'
          }`}
        >
          ✦
        </div>
      </div>

      {/* Info Card Below */}
      <div
        className={`p-4 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <div className="grid grid-cols-2 gap-3 text-center">
          <div
            className={`p-2.5 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020805] border-slate-800'
            }`}
          >
            <span className="text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider block opacity-60">
              Qibla Bearing
            </span>
            <span className="font-mono font-bold text-base sm:text-lg text-[#8C630D] dark:text-[#FFDF78]">
              {targetQiblaAngle}° North-East
            </span>
          </div>

          <div
            className={`p-2.5 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020805] border-slate-800'
            }`}
          >
            <span className="text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider block opacity-60">
              Distance to Kaaba
            </span>
            <span className="font-mono font-bold text-base sm:text-lg text-[#8C630D] dark:text-[#FFDF78]">
              12,240 km (7,605 mi)
            </span>
          </div>
        </div>

        {/* Interactive Phone Rotation Simulator Slider */}
        <div className="mt-3 pt-3 border-t border-opacity-20 border-current">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold opacity-75">Simulate Device Turning:</span>
            <span className="font-mono font-bold text-xs">{deviceHeading}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={deviceHeading}
            onChange={(e) => setDeviceHeading(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <div className="flex items-center justify-between mt-1">
            <button
              onClick={handleSimulateAlign}
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                isLight ? 'bg-[#FAF4E8] text-[#8C630D]' : 'bg-[#0E3524] text-[#FFDF78]'
              }`}
            >
              ⚡ Auto-Align to Qibla (43°)
            </button>
            <span className="text-[10px] opacity-60">Magnetometer Active</span>
          </div>
        </div>

        <p className="text-[11px] text-center opacity-70 mt-2">
          Tip: Hold phone flat and level on your hand away from large metal objects for best accuracy.
        </p>
      </div>
    </div>
  );
};
