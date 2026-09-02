import React, { useState } from 'react';
import { JanazahAlertData } from '../types';
import { OrnateCorner } from './ArabesquePatterns';
import {
  MapPin,
  Clock,
  Heart,
  Share2,
  Users,
  Compass,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { motion } from 'motion/react';

interface DignifiedJanazahCardProps {
  data: JanazahAlertData;
  isLight?: boolean;
  onOpenDetails?: (data: JanazahAlertData) => void;
  compact?: boolean;
}

export const DignifiedJanazahCard: React.FC<DignifiedJanazahCardProps> = ({
  data,
  isLight = false,
  onOpenDetails,
  compact = false,
}) => {
  const [duaCount, setDuaCount] = useState(data.duasOfferedCount);
  const [hasOfferedDua, setHasOfferedDua] = useState(false);
  const [willAttend, setWillAttend] = useState(false);
  const [attendCount, setAttendCount] = useState(data.attendedCount);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleOfferDua = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasOfferedDua) {
      setDuaCount((prev) => prev + 1);
      setHasOfferedDua(true);
    } else {
      setDuaCount((prev) => prev - 1);
      setHasOfferedDua(false);
    }
  };

  const handleToggleAttend = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!willAttend) {
      setAttendCount((prev) => prev + 1);
      setWillAttend(true);
    } else {
      setAttendCount((prev) => prev - 1);
      setWillAttend(false);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Janazah Prayer for ${data.deceasedName} at ${data.locationName}, ${data.dateText} (${data.prayerTime}). Please attend and keep in your sincere du’ā.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(data)}
      className={`relative w-full rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg ${
        isLight
          ? 'bg-gradient-to-b from-[#FAF5EC] via-[#F3EAD9] to-[#E9DCB8] border-[#8C630D]/70 shadow-[0_8px_28px_rgba(140,99,13,0.14)] hover:border-[#8C630D]'
          : 'bg-gradient-to-b from-[#0F291E] via-[#091D15] to-[#040E0A] border-[#C5A059]/80 shadow-[0_10px_32px_rgba(4,14,10,0.85)] hover:border-[#FFDF78]'
      } ${compact ? 'p-3.5' : 'p-4 sm:p-5'}`}
    >
      {/* Ornate Corner Arabesque Accents */}
      <OrnateCorner position="top-left" size={20} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
      <OrnateCorner position="top-right" size={20} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
      <OrnateCorner position="bottom-left" size={20} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
      <OrnateCorner position="bottom-right" size={20} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />

      {/* Top Banner: Calligraphy & Fard Kifayah Badge */}
      <div className="flex items-center justify-between border-b pb-3 mb-3 border-opacity-40 border-current">
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
              isLight
                ? 'bg-[#E3D4B6] border-[#8C630D]/60 text-[#644605]'
                : 'bg-[#153D2D] border-[#ECC968]/70 text-[#FFDF78]'
            }`}
          >
            <span className="font-['Amiri'] font-bold text-base">ج</span>
          </div>
          <div>
            <span
              className={`font-['Cinzel'] font-bold text-xs sm:text-sm tracking-[0.18em] uppercase block ${
                isLight ? 'text-[#5C3F05]' : 'text-[#FFDF78]'
              }`}
            >
              JANAZAH NOTICE
            </span>
            <span
              className={`font-['Amiri'] text-xs block leading-tight ${
                isLight ? 'text-[#7A570E]' : 'text-[#ECC968]/90'
              }`}
            >
              إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`text-[10px] font-['Cinzel'] font-bold tracking-wider px-2 py-0.5 rounded-full border ${
              isLight
                ? 'bg-[#EBDDC1] text-[#644605] border-[#8C630D]/50'
                : 'bg-[#133829] text-[#FFDF78] border-[#ECC968]/60 shadow-[0_0_8px_rgba(236,201,104,0.15)]'
            }`}
          >
            FARD KIFAYAH
          </span>
          <span className={`text-[10px] ${isLight ? 'text-[#7A570E]' : 'text-[#C5A059]/80'}`}>
            {data.postedAt}
          </span>
        </div>
      </div>

      {/* Main Dignified Deceased Info */}
      <div className="space-y-2 mb-3.5">
        <div className="flex items-baseline justify-between flex-wrap gap-1">
          <h3
            className={`font-['Cinzel'] text-lg sm:text-xl font-bold tracking-wide ${
              isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
            }`}
          >
            {data.deceasedName}{' '}
            <span
              className={`font-['Amiri'] text-sm sm:text-base font-medium ml-1 ${
                isLight ? 'text-[#7A570E]' : 'text-[#ECC968]'
              }`}
            >
              (رَحِمَهُ ٱللَّٰهُ)
            </span>
          </h3>
        </div>

        {data.familyNote && !compact && (
          <p
            className={`text-xs leading-relaxed italic ${
              isLight ? 'text-[#2D3748]' : 'text-[#E2E8F0]/90'
            }`}
          >
            "{data.familyNote}"
          </p>
        )}
      </div>

      {/* Timing & Location Grid */}
      <div
        className={`rounded-xl p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3.5 border ${
          isLight
            ? 'bg-[#FAF6F0] border-[#8C630D]/30'
            : 'bg-[#081B13] border-[#C5A059]/30'
        }`}
      >
        <div className="flex items-start space-x-2">
          <Clock className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />
          <div>
            <span className={`font-semibold block ${isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'}`}>
              {data.prayerName} Prayer ({data.prayerTime})
            </span>
            <span className={`text-[11px] ${isLight ? 'text-[#7A570E]' : 'text-[#C5A059]/90'}`}>
              {data.dateText}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />
          <div>
            <span className={`font-semibold block ${isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'}`}>
              {data.locationName}
            </span>
            <span className={`text-[11px] truncate block ${isLight ? 'text-[#7A570E]' : 'text-[#C5A059]/90'}`}>
              {data.cemeteryName ? `Burial: ${data.cemeteryName}` : data.locationAddress}
            </span>
          </div>
        </div>
      </div>

      {/* Community Actions Row: Offer Du'a, RSVP Attend, Share, Sunnah Guide */}
      <div className="flex items-center justify-between pt-1 border-t border-opacity-30 border-current">
        <div className="flex items-center space-x-2">
          {/* Sincere Du'a Button */}
          <button
            onClick={handleOfferDua}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              hasOfferedDua
                ? isLight
                  ? 'bg-[#8C630D] text-white shadow'
                  : 'bg-[#FFDF78] text-[#040E0A] font-bold shadow-[0_0_12px_rgba(255,223,120,0.4)]'
                : isLight
                ? 'bg-[#EFE6D4] text-[#644605] border border-[#8C630D]/40 hover:bg-[#E5D7BF]'
                : 'bg-[#123325] text-[#FFDF78] border border-[#ECC968]/50 hover:bg-[#1A4532]'
            }`}
          >
            <motion.div whileTap={{ scale: 1.3 }}>
              <Heart
                className={`w-3.5 h-3.5 ${
                  hasOfferedDua ? 'fill-current' : 'text-current'
                }`}
              />
            </motion.div>
            <span>{hasOfferedDua ? 'Du’ā Offered' : 'Offer Du’ā'}</span>
            <span className="opacity-80 text-[11px]">({duaCount})</span>
          </button>

          {/* Attend / Fulfill Kifayah Button */}
          <button
            onClick={handleToggleAttend}
            className={`hidden sm:flex px-2.5 py-1.5 rounded-lg text-xs font-medium items-center space-x-1 transition-all ${
              willAttend
                ? isLight
                  ? 'bg-[#0D5C3A] text-white'
                  : 'bg-[#10B981] text-[#040E0A] font-bold'
                : isLight
                ? 'bg-[#FAF6F0] text-[#0D5C3A] border border-[#0D5C3A]/30'
                : 'bg-[#0A2218] text-[#6EE7B7] border border-[#10B981]/40'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{willAttend ? 'Attending' : 'Will Attend'}</span>
            <span className="opacity-80 text-[11px]">({attendCount})</span>
          </button>
        </div>

        {/* Right side: Step guide & Share */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleShare}
            title="Share Janazah details"
            className={`p-1.5 rounded-lg border transition-all ${
              isLight
                ? 'bg-[#FAF6F0] border-[#8C630D]/40 text-[#644605] hover:bg-[#EFE6D4]'
                : 'bg-[#081B13] border-[#C5A059]/40 text-[#ECC968] hover:bg-[#123325]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenDetails && onOpenDetails(data)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-['Cinzel'] font-bold flex items-center space-x-1 transition-all ${
              isLight
                ? 'text-[#644605] hover:text-[#061F15]'
                : 'text-[#FFDF78] hover:text-white'
            }`}
          >
            <span>Sunnah & Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Copy Notification Toast */}
      {copiedNotification && (
        <div className="absolute top-2 right-2 px-2.5 py-1 rounded bg-[#0A2218] text-[#FFDF78] text-[11px] font-semibold border border-[#FFDF78]/50 shadow-md">
          Copied to clipboard
        </div>
      )}
    </div>
  );
};
