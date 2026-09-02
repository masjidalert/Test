import React, { useState } from 'react';
import { MosqueProfile } from '../types';
import { MasjidAlertBrandIcon } from './MasjidAlertBrandIcon';
import {
  ShieldCheck,
  Bell,
  Heart,
  Compass,
  MapPin,
  Check,
  ArrowRight,
  ArrowLeft,
  Tv,
  Sparkles,
  Search,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingWelcomeFlowProps {
  isLight?: boolean;
  masjids: MosqueProfile[];
  onComplete: (selectedMasjid: MosqueProfile) => void;
}

export const OnboardingWelcomeFlow: React.FC<OnboardingWelcomeFlowProps> = ({
  isLight = false,
  masjids,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMasjid, setSelectedMasjid] = useState<MosqueProfile>(masjids[0]);

  const filteredMasjids = masjids.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.cityState.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`w-full max-w-md mx-auto rounded-[32px] p-5 sm:p-6 border flex flex-col justify-between min-h-[580px] transition-all ${
        isLight
          ? 'bg-[#FBF7EE] text-slate-900 border-[#8C630D]/30 shadow-lg'
          : 'bg-[#030E09] text-slate-100 border-[#C5A059]/30 shadow-2xl'
      }`}
    >
      {/* Top Header & Progress Dots */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <MasjidAlertBrandIcon size={32} showText={true} isLight={isLight} />
          <div className="flex items-center space-x-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  step === s
                    ? 'w-6 bg-[#C5A059]'
                    : step > s
                    ? 'w-2 bg-emerald-600'
                    : 'w-2 bg-slate-700/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: App Name & Tagline */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 pt-2"
            >
              <div className="text-center space-y-2 py-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#0D5C3A] to-[#041D12] text-[#FFDF78] border border-[#FFDF78]/50 flex items-center justify-center text-2xl shadow-lg">
                  🕌
                </div>
                <h1
                  className={`font-['Cinzel'] text-2xl sm:text-3xl font-bold tracking-wide ${
                    isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
                  }`}
                >
                  MasjidAlert
                </h1>
                <p
                  className={`text-sm font-semibold tracking-wider ${
                    isLight ? 'text-[#8C630D]' : 'text-[#FFDF78]'
                  }`}
                >
                  “Your community. Always connected.”
                </p>
                <p className={`text-xs leading-relaxed max-w-xs mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  A free, unified community alert network for Muslim masjids across the US and Canada.
                </p>
              </div>

              {/* Sadaqah Guarantee Card */}
              <div
                className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                  isLight
                    ? 'bg-white border-[#8C630D]/20 text-slate-800'
                    : 'bg-[#061A11] border-[#C5A059]/30 text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base">🤍</span>
                  <span className="font-['Cinzel'] font-bold text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Built as Sadaqah Jariyah
                  </span>
                </div>
                <p className="text-[11px] opacity-80 leading-relaxed">
                  Free forever. No ads, no monthly subscription fees, and no tracking. Built purely to serve the Muslim community.
                </p>
              </div>

              {/* Lobby TV Sync Note */}
              <div
                className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                  isLight
                    ? 'bg-white border-[#8C630D]/20 text-slate-800'
                    : 'bg-[#061A11] border-[#C5A059]/30 text-slate-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Tv className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-['Cinzel'] font-bold text-[11px] uppercase tracking-wider">
                    Synced with Mosque TV Kiosks
                  </span>
                </div>
                <p className="text-[11px] opacity-80 leading-relaxed">
                  Everything your Imam posts syncs simultaneously to both your phone and the physical TV kiosk in the mosque lobby.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Explain Alert Types */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3 pt-1"
            >
              <div>
                <h2
                  className={`font-['Cinzel'] text-lg sm:text-xl font-bold ${
                    isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
                  }`}
                >
                  Instant Alerts That Matter
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Custom-designed categories with solemn dignity and privacy
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-2.5">
                {/* 1. Janazah */}
                <div
                  className={`p-3 rounded-2xl border flex items-start space-x-3 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#061A11] border-slate-800'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 text-base border border-amber-400/40">
                    🤍
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-xs">Janazah Funeral Notices</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-[#0D5C3A] text-[#FFDF78] font-bold rounded">
                        FARD KIFAYAH
                      </span>
                    </div>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Our first-class solemn feature. Get instant burial times, cemetery GPS, du’ā supplication counters, and 4-Takbeer guide.
                    </p>
                  </div>
                </div>

                {/* 2. Community Aid with Discreet Mode */}
                <div
                  className={`p-3 rounded-2xl border flex items-start space-x-3 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#061A11] border-slate-800'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-950 text-amber-300 flex items-center justify-center shrink-0 text-base border border-amber-500/40">
                    🤲
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-xs">Discreet Community Aid</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-amber-700/80 text-white font-bold rounded">
                        PRIVACY PROTECTED
                      </span>
                    </div>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Notify the community that a family needs emergency relief without ever revealing their personal identity. Never displayed on public kiosk.
                    </p>
                  </div>
                </div>

                {/* 3. Stay Connected & Cross-Masjid Feed */}
                <div
                  className={`p-3 rounded-2xl border flex items-start space-x-3 ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#061A11] border-slate-800'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-300 flex items-center justify-center shrink-0 text-base border border-emerald-500/40">
                    🕌
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Stay Connected Across Cities</span>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Follow your former hometown masjids and college campus centers in one unified feed, even when you move.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Find & Follow Your Masjid */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3 pt-1"
            >
              <div>
                <h2
                  className={`font-['Cinzel'] text-lg sm:text-xl font-bold ${
                    isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
                  }`}
                >
                  Find Your Local Masjid
                </h2>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  No account or password required. Just select and follow.
                </p>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by mosque name, city or state..."
                  className={`w-full pl-8 pr-3 py-2 rounded-xl text-xs border outline-none ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 focus:border-[#8C630D]'
                      : 'bg-[#05140E] border-slate-800 text-slate-100 focus:border-[#C5A059]'
                  }`}
                />
              </div>

              {/* GPS Auto-detected Notice */}
              <div className="flex items-center justify-between text-[11px] px-1 opacity-75">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  <span>GPS detected: Arlington / DFW Area</span>
                </span>
                <span className="font-semibold">{filteredMasjids.length} Mosques found</span>
              </div>

              {/* Masjid List */}
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {filteredMasjids.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMasjid(m)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedMasjid.id === m.id
                        ? isLight
                          ? 'bg-[#FAF4E8] border-[#8C630D] shadow-sm'
                          : 'bg-[#0E3524] border-[#FFDF78] shadow-[0_0_12px_rgba(255,223,120,0.2)]'
                        : isLight
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-[#061A11] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-xs">{m.name}</span>
                        {m.isVerified && (
                          <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        )}
                      </div>
                      <div className="text-[10px] opacity-70">
                        {m.address}, {m.cityState}
                      </div>
                      <div className="text-[9px] text-[#C5A059] font-medium mt-0.5">
                        {m.followerCount.toLocaleString()} community followers · {m.distance}
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                        selectedMasjid.id === m.id
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-slate-600 opacity-40'
                      }`}
                    >
                      {selectedMasjid.id === m.id && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Controls */}
      <div className="pt-4 border-t border-opacity-20 border-current flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => (s - 1) as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border ${
              isLight
                ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                : 'border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={() => setStep((s) => (s + 1) as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md ${
              isLight
                ? 'bg-[#8C630D] text-white hover:bg-[#72500A]'
                : 'bg-[#FFDF78] text-[#040E0A] hover:bg-white'
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => onComplete(selectedMasjid)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-lg ${
              isLight
                ? 'bg-[#0D5C3A] text-white hover:bg-[#0A482D]'
                : 'bg-gradient-to-r from-[#0D5C3A] to-[#127A4E] text-[#FFDF78] border border-[#FFDF78]/60 hover:brightness-110'
            }`}
          >
            <span>Follow & Enter App</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
