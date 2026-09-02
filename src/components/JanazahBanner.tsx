import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JanazahNotice } from '../types';
import { OrnateCorner } from './ArabesquePatterns';

interface JanazahBannerProps {
  notice: JanazahNotice | null;
  isActive: boolean;
  isLight?: boolean;
}

export const JanazahBanner: React.FC<JanazahBannerProps> = ({ notice, isActive, isLight = false }) => {
  if (!isActive || !notice) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0, y: -20 }}
        animate={{ opacity: 1, height: 'auto', y: 0 }}
        exit={{ opacity: 0, height: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full px-6 py-2.5 z-10 overflow-hidden"
      >
        <div
          className={`relative w-full border-2 rounded-lg px-6 py-3 flex items-center justify-between transition-all duration-1000 ease-in-out ${
            isLight
              ? 'bg-gradient-to-r from-[#FAF5EC] via-[#F3EAD9] to-[#FAF5EC] border-[#8C630D]/70 shadow-[0_4px_20px_rgba(140,99,13,0.12)]'
              : 'bg-gradient-to-r from-[#112B20] via-[#18392B] to-[#112B20] border-[#C5A059]/70 shadow-[0_4px_25px_rgba(10,25,18,0.7)]'
          }`}
        >
          <OrnateCorner position="top-left" size={20} className={`transition-colors duration-1000 ease-in-out ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />
          <OrnateCorner position="top-right" size={20} className={`transition-colors duration-1000 ease-in-out ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />
          <OrnateCorner position="bottom-left" size={20} className={`transition-colors duration-1000 ease-in-out ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />
          <OrnateCorner position="bottom-right" size={20} className={`transition-colors duration-1000 ease-in-out ${isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'}`} />

          {/* Left Emblem / Title */}
          <div
            className={`flex items-center space-x-3.5 pr-6 shrink-0 border-r ${
              isLight ? 'border-[#8C630D]/30' : 'border-[#C5A059]/40'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg border flex items-center justify-center shadow-sm ${
                isLight ? 'border-[#8C630D]/60 bg-[#E8DBBF] text-[#644605]' : 'border-[#ECC968]/70 bg-[#194030] text-[#FFDF78]'
              }`}
            >
              <span className="font-['Amiri'] font-bold text-lg leading-none">ج</span>
            </div>
            <div className="text-left">
              <span
                className={`font-['Cinzel'] text-sm md:text-base font-bold tracking-[0.2em] uppercase block ${
                  isLight ? 'text-[#5C3F05]' : 'text-[#FFDF78]'
                }`}
              >
                JANAZAH NOTICE
              </span>
              <span
                className={`font-['Amiri'] text-xs block -mt-0.5 ${
                  isLight ? 'text-[#7A570E]' : 'text-[#ECC968]/90'
                }`}
              >
                إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
              </span>
            </div>
          </div>

          {/* Center / Right Content */}
          <div className="flex-1 px-6 flex flex-col justify-center text-left">
            <div className={`flex items-baseline space-x-2 ${isLight ? 'text-[#1E293B]' : 'text-[#FDF8EE]'}`}>
              <span className="font-semibold text-sm md:text-base tracking-wide">
                Janazah prayer for{' '}
                <span className={`font-bold ${isLight ? 'text-[#5C3F05]' : 'text-[#FFDF78]'}`}>
                  {notice.deceasedName}
                </span>{' '}
                <span className={`font-['Amiri'] text-base ${isLight ? 'text-[#7A570E]' : 'text-[#ECC968]'}`}>
                  (رَحِمَهُ ٱللَّٰهُ)
                </span>
              </span>
              <span className={isLight ? 'text-[#8C630D]' : 'text-[#C5A059]'}>―</span>
              <span
                className={`text-xs md:text-sm font-medium tracking-wide ${
                  isLight ? 'text-[#7A570E]' : 'text-[#F5E09A]'
                }`}
              >
                {notice.dayDescription}
              </span>
            </div>
            <p className={`text-xs mt-0.5 tracking-wide ${isLight ? 'text-[#475569]' : 'text-[#CBD5E1]'}`}>
              {notice.notes || 'Please attend to fulfill the fard kifayah and keep the family in your du’ā.'}
              {notice.cemetery ? ` · Burial at ${notice.cemetery}` : ''}
            </p>
          </div>

          {/* Right badge */}
          <div
            className={`shrink-0 pl-4 border-l text-right ${
              isLight ? 'border-[#8C630D]/30' : 'border-[#C5A059]/40'
            }`}
          >
            <span
              className={`inline-block px-3 py-1 rounded text-[11px] font-['Cinzel'] tracking-wider font-bold border ${
                isLight
                  ? 'bg-[#EBDDC1] border-[#8C630D]/60 text-[#644605]'
                  : 'bg-[#194030] border-[#ECC968]/60 text-[#FFDF78]'
              }`}
            >
              TODAY {notice.prayerTime}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
