import React, { useState } from 'react';
import { JanazahAlertData } from '../types';
import { OrnateCorner, IslamicDivider } from './ArabesquePatterns';
import {
  JANAZAH_SUNNAH_STEPS,
  JANAZAH_DUA_ARABIC,
  JANAZAH_DUA_TRANSLATION,
} from '../data/mobileData';
import {
  X,
  MapPin,
  Clock,
  Heart,
  Share2,
  Navigation,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JanazahDetailModalProps {
  data: JanazahAlertData | null;
  isOpen: boolean;
  onClose: () => void;
  isLight?: boolean;
}

export const JanazahDetailModal: React.FC<JanazahDetailModalProps> = ({
  data,
  isOpen,
  onClose,
  isLight = false,
}) => {
  const [hasOfferedDua, setHasOfferedDua] = useState(false);
  const [duaCount, setDuaCount] = useState(data ? data.duasOfferedCount : 0);
  const [activeTab, setActiveTab] = useState<'details' | 'sunnah-guide' | 'dua'>('details');

  if (!isOpen || !data) return null;

  const handleOfferDua = () => {
    if (!hasOfferedDua) {
      setDuaCount((prev) => prev + 1);
      setHasOfferedDua(true);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`relative w-full max-w-2xl rounded-3xl border-2 overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col ${
            isLight
              ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#EFE4D0] border-[#8C630D] text-[#1E293B]'
              : 'bg-gradient-to-b from-[#092218] via-[#05160F] to-[#020A06] border-[#C5A059] text-slate-100'
          }`}
        >
          {/* Ornate Corner Accents */}
          <OrnateCorner position="top-left" size={24} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
          <OrnateCorner position="top-right" size={24} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
          <OrnateCorner position="bottom-left" size={24} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
          <OrnateCorner position="bottom-right" size={24} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />

          {/* Modal Header */}
          <div
            className={`relative p-5 sm:p-6 border-b flex items-start justify-between ${
              isLight ? 'border-[#8C630D]/30 bg-[#F6EDE0]' : 'border-[#C5A059]/30 bg-[#071C14]'
            }`}
          >
            <div className="flex-1 pr-4">
              <div className="flex items-center space-x-2 mb-1">
                <span
                  className={`text-[10px] font-['Cinzel'] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
                    isLight
                      ? 'bg-[#EADBC0] text-[#644605] border-[#8C630D]/50'
                      : 'bg-[#0E3524] text-[#FFDF78] border-[#ECC968]/60'
                  }`}
                >
                  SOLEMN JANAZAH MEMORIAL
                </span>
                <span className={`text-xs ${isLight ? 'text-[#7A570E]' : 'text-[#C5A059]'}`}>
                  Fard Kifayah Notice
                </span>
              </div>

              <h2
                className={`font-['Cinzel'] text-xl sm:text-2xl font-bold tracking-wide ${
                  isLight ? 'text-[#061F15]' : 'text-[#FFDF78]'
                }`}
              >
                {data.deceasedName}
              </h2>
              <p
                className={`font-['Amiri'] text-base sm:text-lg -mt-0.5 ${
                  isLight ? 'text-[#7A570E]' : 'text-[#ECC968]'
                }`}
              >
                {data.honorific || 'رَحِمَهُ ٱللَّٰهُ تَعَالَى'}
              </p>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-full border transition-all ${
                isLight
                  ? 'bg-[#EAE0CD] border-[#8C630D]/40 text-[#644605] hover:bg-[#DFD3BD]'
                  : 'bg-[#0E3524] border-[#C5A059]/40 text-[#ECC968] hover:bg-[#154631]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs inside Modal */}
          <div
            className={`flex border-b text-xs font-['Cinzel'] font-bold tracking-wider px-4 ${
              isLight ? 'border-[#8C630D]/20 bg-[#EFE5D3]' : 'border-[#C5A059]/20 bg-[#051810]'
            }`}
          >
            <button
              onClick={() => setActiveTab('details')}
              className={`py-2.5 px-4 border-b-2 transition-all ${
                activeTab === 'details'
                  ? isLight
                    ? 'border-[#8C630D] text-[#8C630D]'
                    : 'border-[#FFDF78] text-[#FFDF78]'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              Prayer & Location
            </button>
            <button
              onClick={() => setActiveTab('sunnah-guide')}
              className={`py-2.5 px-4 border-b-2 transition-all ${
                activeTab === 'sunnah-guide'
                  ? isLight
                    ? 'border-[#8C630D] text-[#8C630D]'
                    : 'border-[#FFDF78] text-[#FFDF78]'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              How to Pray (4 Takbeers)
            </button>
            <button
              onClick={() => setActiveTab('dua')}
              className={`py-2.5 px-4 border-b-2 transition-all ${
                activeTab === 'dua'
                  ? isLight
                    ? 'border-[#8C630D] text-[#8C630D]'
                    : 'border-[#FFDF78] text-[#FFDF78]'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              Authentic Du’ā
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            {/* Tab 1: Details */}
            {activeTab === 'details' && (
              <div className="space-y-4">
                {/* Quran Verse Callout */}
                <div
                  className={`p-4 rounded-2xl border text-center relative overflow-hidden ${
                    isLight
                      ? 'bg-[#FAF5EC] border-[#8C630D]/40 shadow-inner'
                      : 'bg-[#071F16] border-[#C5A059]/40 shadow-inner'
                  }`}
                >
                  <p
                    dir="rtl"
                    className={`font-['Amiri'] text-lg sm:text-xl font-bold leading-loose mb-1 ${
                      isLight ? 'text-[#644605]' : 'text-[#FFDF78]'
                    }`}
                  >
                    الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                  </p>
                  <p
                    className={`text-xs italic leading-relaxed ${
                      isLight ? 'text-[#475569]' : 'text-slate-300'
                    }`}
                  >
                    "Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'"
                  </p>
                  <span
                    className={`text-[11px] font-['Cinzel'] font-bold uppercase mt-1 block ${
                      isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'
                    }`}
                  >
                    Surah Al-Baqarah 2:156
                  </span>
                </div>

                {/* Logistics Schedule */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className={`p-4 rounded-2xl border ${
                      isLight
                        ? 'bg-[#FAF6F0] border-[#8C630D]/30'
                        : 'bg-[#071E15] border-[#C5A059]/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className={`w-4 h-4 ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />
                      <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider">
                        Janazah Timing
                      </span>
                    </div>
                    <p className="text-base font-bold">{data.prayerName} Prayer ({data.prayerTime})</p>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-[#7A570E]' : 'text-[#C5A059]'}`}>
                      {data.dateText}
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border ${
                      isLight
                        ? 'bg-[#FAF6F0] border-[#8C630D]/30'
                        : 'bg-[#071E15] border-[#C5A059]/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className={`w-4 h-4 ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />
                      <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider">
                        Mosque Location
                      </span>
                    </div>
                    <p className="text-sm font-bold">{data.locationName}</p>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-[#7A570E]' : 'text-[#C5A059]'}`}>
                      {data.locationAddress}
                    </p>
                  </div>
                </div>

                {/* Cemetery & Burial Details */}
                {data.cemeteryName && (
                  <div
                    className={`p-4 rounded-2xl border flex items-center justify-between ${
                      isLight
                        ? 'bg-[#F5ECE0] border-[#8C630D]/30'
                        : 'bg-[#092218] border-[#C5A059]/30'
                    }`}
                  >
                    <div>
                      <span className="text-[11px] font-['Cinzel'] font-bold uppercase tracking-wider opacity-75 block">
                        Burial Location
                      </span>
                      <p className="text-sm font-bold">{data.cemeteryName}</p>
                      {data.cemeteryAddress && (
                        <p className="text-xs opacity-75">{data.cemeteryAddress}</p>
                      )}
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        data.cemeteryName + ' ' + (data.cemeteryAddress || '')
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 border ${
                        isLight
                          ? 'bg-white border-[#8C630D]/40 text-[#644605]'
                          : 'bg-[#04110C] border-[#FFDF78]/40 text-[#FFDF78]'
                      }`}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>
                  </div>
                )}

                {/* Family Note */}
                {data.familyNote && (
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#040F0A] border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-bold font-['Cinzel'] tracking-wider uppercase block mb-1">
                      Note from Family & Mosque
                    </span>
                    <p>{data.familyNote}</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Sunnah Guide (4 Takbeers) */}
            {activeTab === 'sunnah-guide' && (
              <div className="space-y-3">
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center space-x-2.5 ${
                    isLight ? 'bg-[#FAF4E8] border-[#8C630D]/30' : 'bg-[#081F15] border-[#C5A059]/30'
                  }`}
                >
                  <ShieldCheck className={`w-5 h-5 shrink-0 ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />
                  <p>
                    Salatul Janazah is a communal obligation (Fard Kifayah). It is prayed entirely standing — there is <strong>no Ruku’ (bowing)</strong> and <strong>no Sujood (prostration)</strong>.
                  </p>
                </div>

                <div className="space-y-2.5">
                  {JANAZAH_SUNNAH_STEPS.map((step) => (
                    <div
                      key={step.step}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isLight
                          ? 'bg-white border-slate-200 hover:border-[#8C630D]/50'
                          : 'bg-[#061810] border-slate-800 hover:border-[#C5A059]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-xs font-['Cinzel'] font-bold tracking-wider px-2 py-0.5 rounded ${
                            isLight
                              ? 'bg-[#FAF4E8] text-[#8C630D] border border-[#8C630D]/30'
                              : 'bg-[#0B2C1E] text-[#FFDF78] border border-[#ECC968]/40'
                          }`}
                        >
                          Step {step.step}: {step.title}
                        </span>
                        <span className="font-['Amiri'] text-xs font-bold opacity-75">
                          {step.arabic}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        {step.instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Authentic Du'a */}
            {activeTab === 'dua' && (
              <div className="space-y-4">
                <div
                  className={`p-5 rounded-2xl border text-center space-y-3 ${
                    isLight
                      ? 'bg-[#FAF5EC] border-[#8C630D]/40'
                      : 'bg-[#071F16] border-[#C5A059]/40'
                  }`}
                >
                  <span className="text-xs font-['Cinzel'] font-bold tracking-widest uppercase opacity-75 block">
                    Prophetic Supplication for the Deceased
                  </span>

                  <p
                    dir="rtl"
                    className={`font-['Amiri'] text-xl sm:text-2xl font-bold leading-loose ${
                      isLight ? 'text-[#644605]' : 'text-[#FFDF78]'
                    }`}
                  >
                    {JANAZAH_DUA_ARABIC}
                  </p>

                  <IslamicDivider className={`w-40 h-4 mx-auto ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />

                  <p className={`text-xs sm:text-sm leading-relaxed italic ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                    {JANAZAH_DUA_TRANSLATION}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div
            className={`p-4 sm:p-5 border-t flex items-center justify-between gap-3 ${
              isLight ? 'border-[#8C630D]/30 bg-[#F6EDE0]' : 'border-[#C5A059]/30 bg-[#071C14]'
            }`}
          >
            <button
              onClick={handleOfferDua}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
                hasOfferedDua
                  ? isLight
                    ? 'bg-[#8C630D] text-white'
                    : 'bg-[#FFDF78] text-[#040E0A] font-bold shadow-[0_0_12px_rgba(255,223,120,0.4)]'
                  : isLight
                  ? 'bg-[#0D5C3A] text-white hover:bg-[#0A482D]'
                  : 'bg-[#154631] text-[#FFDF78] border border-[#ECC968] hover:bg-[#1E5C42]'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasOfferedDua ? 'fill-current' : ''}`} />
              <span>{hasOfferedDua ? 'Du’ā Sent for Deceased' : 'Offer Sincere Du’ā'}</span>
              <span className="opacity-80">({duaCount})</span>
            </button>

            <button
              onClick={onClose}
              className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  : 'bg-[#040F0A] border-slate-700 text-slate-200 hover:bg-slate-800'
              }`}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
