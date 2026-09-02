import React, { useState } from 'react';
import { CommunityAlert, JanazahAlertData } from '../types';
import { RubElHizbStar } from './ArabesquePatterns';
import {
  Bell,
  Heart,
  Navigation,
  Volume2,
  Sparkles,
  Smartphone,
  ChevronRight,
  ShieldAlert,
  Moon,
  Sun,
  X,
  AlertTriangle,
  Clock,
  Flashlight,
  Camera,
  HeartHandshake,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LockScreenPushSimulatorProps {
  isLight?: boolean;
  onOpenJanazahDetail?: (data: JanazahAlertData) => void;
  janazahData: JanazahAlertData;
}

export const LockScreenPushSimulator: React.FC<LockScreenPushSimulatorProps> = ({
  isLight = false,
  onOpenJanazahDetail,
  janazahData,
}) => {
  const [activeTab, setActiveTab] = useState<'janazah' | 'urgent' | 'athan'>('janazah');
  const [hasSentDuaFromPush, setHasSentDuaFromPush] = useState(false);
  const [simulatedTime, setSimulatedTime] = useState('7:42 PM');

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-4">
      {/* Simulator Explanation Header */}
      <div className="w-full max-w-md text-center mb-4 space-y-1">
        <span
          className={`text-[10px] font-['Cinzel'] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${
            isLight
              ? 'bg-[#FAF4E8] text-[#8C630D] border-[#8C630D]/30'
              : 'bg-[#0E3524] text-[#FFDF78] border-[#ECC968]/50'
          }`}
        >
          LIVE PUSH NOTIFICATION SIMULATOR
        </span>
        <h3
          className={`font-['Cinzel'] text-lg font-bold ${
            isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
          }`}
        >
          Lock Screen Visual Treatment
        </h3>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          See how high-priority Janazah alerts and mosque advisories arrive on community members' devices
        </p>
      </div>

      {/* Selector for notification types */}
      <div className="flex items-center space-x-2 mb-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('janazah')}
          className={`px-3 py-1.5 rounded-full border transition-all ${
            activeTab === 'janazah'
              ? isLight
                ? 'bg-[#8C630D] text-white border-[#8C630D]'
                : 'bg-[#0E3524] text-[#FFDF78] border-[#FFDF78] shadow-[0_0_10px_rgba(255,223,120,0.3)]'
              : isLight
              ? 'bg-white text-slate-700 border-slate-200'
              : 'bg-[#05140E] text-slate-300 border-slate-800'
          }`}
        >
          Solemn Janazah Push
        </button>

        <button
          onClick={() => setActiveTab('urgent')}
          className={`px-3 py-1.5 rounded-full border transition-all ${
            activeTab === 'urgent'
              ? 'bg-rose-600 text-white border-rose-600 shadow'
              : isLight
              ? 'bg-white text-slate-700 border-slate-200'
              : 'bg-[#05140E] text-slate-300 border-slate-800'
          }`}
        >
          Urgent Parking Push
        </button>

        <button
          onClick={() => setActiveTab('athan')}
          className={`px-3 py-1.5 rounded-full border transition-all ${
            activeTab === 'athan'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow'
              : isLight
              ? 'bg-white text-slate-700 border-slate-200'
              : 'bg-[#05140E] text-slate-300 border-slate-800'
          }`}
        >
          Maghrib Athan Push
        </button>
      </div>

      {/* Realistic Phone Lock Screen Container */}
      <div
        className={`w-full max-w-[360px] rounded-[44px] border-[6px] shadow-2xl p-4 flex flex-col justify-between aspect-[9/18.5] relative overflow-hidden transition-all duration-500 ${
          isLight
            ? 'bg-gradient-to-b from-[#F3ECE0] via-[#E8DEC8] to-[#D9CCB0] border-[#8C630D]/60 text-slate-900 shadow-[0_20px_50px_rgba(140,99,13,0.2)]'
            : 'bg-gradient-to-b from-[#0A1A2F] via-[#05101E] to-[#02060C] border-[#C5A059]/60 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Dynamic Island / Top Notch */}
        <div className="w-28 h-5 bg-black rounded-full mx-auto mb-2 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
        </div>

        {/* Lock Screen Clock & Date */}
        <div className="text-center pt-2 pb-4 space-y-0.5">
          <div className="flex items-center justify-center space-x-1.5 text-xs opacity-75">
            <span>Tuesday, August 25</span>
            <span>·</span>
            <span>12 Safar 1448</span>
          </div>
          <h1 className="text-5xl font-['Cinzel'] font-bold tracking-tight">
            {simulatedTime}
          </h1>
        </div>

        {/* Push Notification Area */}
        <div className="flex-1 flex flex-col justify-center space-y-3 z-10">
          <AnimatePresence mode="wait">
            {/* NOTIFICATION 1: SOLEMN JANAZAH NOTICE */}
            {activeTab === 'janazah' && (
              <motion.div
                key="janazah-push"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className={`w-full rounded-2xl p-3.5 border-2 shadow-2xl backdrop-blur-md transition-all ${
                  isLight
                    ? 'bg-[#FAF5EC]/95 border-[#8C630D] text-[#061F15] shadow-[0_8px_30px_rgba(140,99,13,0.25)]'
                    : 'bg-[#092218]/95 border-[#FFDF78] text-[#FDF8EE] shadow-[0_8px_30px_rgba(0,0,0,0.9)]'
                }`}
              >
                {/* Notification App Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-md bg-[#0D5C3A] border border-[#FFDF78] flex items-center justify-center text-[#FFDF78]">
                      <HeartHandshake className="w-3 h-3" />
                    </div>
                    <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider">
                      MasjidAlert · Janazah
                    </span>
                  </div>
                  <span className="text-[10px] opacity-75">NOW</span>
                </div>

                {/* Solemn Arabic Banner */}
                <div
                  className={`p-1.5 rounded-lg text-center mb-2 border ${
                    isLight
                      ? 'bg-[#EFE4D0] border-[#8C630D]/40 text-[#644605]'
                      : 'bg-[#04110C] border-[#ECC968]/50 text-[#FFDF78]'
                  }`}
                >
                  <span className="font-['Amiri'] font-bold text-sm block leading-none">
                    إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                  </span>
                </div>

                {/* Deceased Details */}
                <h4 className="font-bold text-xs leading-tight mb-1">
                  Janazah Prayer: {janazahData.deceasedName}
                </h4>
                <p className="text-[11px] opacity-90 leading-snug mb-3">
                  Today after Maghrib (7:55 PM) at Masjid An-Noor. Fard Kifayah obligation.
                </p>

                {/* Action Buttons on Notification */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-current border-opacity-20 text-[11px] font-semibold">
                  <button
                    onClick={() => setHasSentDuaFromPush(!hasSentDuaFromPush)}
                    className={`py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 border transition-all ${
                      hasSentDuaFromPush
                        ? 'bg-[#8C630D] text-white font-bold'
                        : isLight
                        ? 'bg-[#EBE0CD] text-[#644605] border-[#8C630D]/40'
                        : 'bg-[#154631] text-[#FFDF78] border-[#FFDF78]/40'
                    }`}
                  >
                    <Heart className="w-3 h-3 fill-current" />
                    <span>{hasSentDuaFromPush ? 'Du’ā Sent ✓' : 'Offer Du’ā'}</span>
                  </button>

                  <button
                    onClick={() => onOpenJanazahDetail && onOpenJanazahDetail(janazahData)}
                    className={`py-1.5 px-2 rounded-lg flex items-center justify-center space-x-1 border transition-all ${
                      isLight
                        ? 'bg-[#0D5C3A] text-white'
                        : 'bg-[#FFDF78] text-black font-bold'
                    }`}
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* NOTIFICATION 2: URGENT PARKING NOTICE */}
            {activeTab === 'urgent' && (
              <motion.div
                key="urgent-push"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className={`w-full rounded-2xl p-3.5 border-2 shadow-2xl backdrop-blur-md ${
                  isLight
                    ? 'bg-rose-50/95 border-rose-400 text-rose-950'
                    : 'bg-[#2B0E14]/95 border-rose-500 text-rose-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-5 h-5 rounded-md bg-rose-600 text-white flex items-center justify-center">
                      <AlertTriangle className="w-3 h-3" />
                    </div>
                    <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider">
                      MasjidAlert · Urgent
                    </span>
                  </div>
                  <span className="text-[10px] opacity-75">10m ago</span>
                </div>

                <h4 className="font-bold text-xs leading-tight mb-1">
                  Jumu’ah Parking Overflow Advisory
                </h4>
                <p className="text-[11px] opacity-90 leading-snug mb-2.5">
                  West lot full. Free shuttle active every 5 min from Cooper Plaza Lot C.
                </p>

                <div className="flex space-x-2 text-[11px] font-semibold">
                  <button className="flex-1 py-1.5 bg-rose-600 text-white rounded-lg flex items-center justify-center space-x-1">
                    <Navigation className="w-3 h-3" />
                    <span>Navigate to Lot C</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* NOTIFICATION 3: ATHAN PRAYER CALL */}
            {activeTab === 'athan' && (
              <motion.div
                key="athan-push"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className={`w-full rounded-2xl p-3.5 border-2 shadow-2xl backdrop-blur-md ${
                  isLight
                    ? 'bg-emerald-50/95 border-emerald-400 text-emerald-950'
                    : 'bg-[#071F16]/95 border-emerald-500 text-emerald-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center">
                      <Clock className="w-3 h-3" />
                    </div>
                    <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider">
                      MasjidAlert · Adhan
                    </span>
                  </div>
                  <span className="text-[10px] opacity-75">JUST NOW</span>
                </div>

                <h4 className="font-bold text-xs leading-tight mb-0.5">
                  Maghrib Prayer Time has Entered
                </h4>
                <p className="text-[11px] opacity-90 leading-snug mb-2">
                  Athan: 7:52 PM · Iqamah: 7:55 PM at Masjid An-Noor.
                </p>

                <div className="flex space-x-2 text-[11px] font-semibold">
                  <button className="flex-1 py-1.5 bg-emerald-700 text-white rounded-lg flex items-center justify-center space-x-1">
                    <Volume2 className="w-3 h-3" />
                    <span>Play Makkah Adhan</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Lock Screen Bottom Controls: Flashlight & Camera */}
        <div className="flex items-center justify-between pt-4 px-3">
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
            <Flashlight className="w-4 h-4" />
          </div>
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
            <Camera className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom Home Indicator bar */}
        <div className="w-32 h-1 bg-current opacity-40 rounded-full mx-auto mt-2" />
      </div>
    </div>
  );
};
