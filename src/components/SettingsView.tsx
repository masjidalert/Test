import React, { useState } from 'react';
import { ThemeMode } from '../types';
import {
  Moon,
  Sun,
  Bell,
  Volume2,
  Compass,
  ShieldCheck,
  Smartphone,
  Check,
} from 'lucide-react';

interface SettingsViewProps {
  themeMode: ThemeMode;
  onSetThemeMode: (mode: ThemeMode) => void;
  isLight?: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  themeMode,
  onSetThemeMode,
  isLight = false,
}) => {
  const [calculationMethod, setCalculationMethod] = useState('ISNA');
  const [asrMethod, setAsrMethod] = useState('standard');
  const [janazahVipPush, setJanazahVipPush] = useState(true);
  const [selectedAdhan, setSelectedAdhan] = useState('makkah');

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div>
        <h2
          className={`font-['Cinzel'] text-xl font-bold tracking-wide ${
            isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
          }`}
        >
          App Preferences & Adhan Rules
        </h2>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Configure prayer calculations, solemn Janazah bypass alerts, and visual themes
        </p>
      </div>

      {/* Theme Selection Section */}
      <div
        className={`p-4 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <span className="text-xs font-['Cinzel'] font-bold uppercase tracking-wider block mb-2 opacity-75">
          App Visual Theme
        </span>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onSetThemeMode('auto')}
            className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              themeMode === 'auto'
                ? isLight
                  ? 'bg-[#8C630D] text-white border-[#8C630D]'
                  : 'bg-[#C5A059] text-black border-[#FFDF78] font-bold'
                : isLight
                ? 'bg-slate-50 text-slate-700 border-slate-200'
                : 'bg-[#020805] text-slate-300 border-slate-800'
            }`}
          >
            <span>⚡ Auto (Sun)</span>
          </button>

          <button
            type="button"
            onClick={() => onSetThemeMode('light')}
            className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              themeMode === 'light'
                ? 'bg-[#FDF8EE] text-[#061F15] border-[#8C630D] font-bold shadow'
                : isLight
                ? 'bg-slate-50 text-slate-700 border-slate-200'
                : 'bg-[#020805] text-slate-300 border-slate-800'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light Mode</span>
          </button>

          <button
            type="button"
            onClick={() => onSetThemeMode('dark')}
            className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
              themeMode === 'dark'
                ? 'bg-[#061C14] text-[#FFDF78] border-[#FFDF78] font-bold shadow'
                : isLight
                ? 'bg-slate-50 text-slate-700 border-slate-200'
                : 'bg-[#020805] text-slate-300 border-slate-800'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark Mode</span>
          </button>
        </div>
      </div>

      {/* Janazah VIP Emergency Push Toggle */}
      <div
        className={`p-4 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs">Solemn Janazah Emergency Override</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#0D5C3A] text-[#FFDF78]">
                FARD KIFAYAH
              </span>
            </div>
            <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Allows verified Janazah notices to bypass Focus/Silent modes so you never miss a funeral prayer for a community member.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
            <input
              type="checkbox"
              checked={janazahVipPush}
              onChange={(e) => setJanazahVipPush(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </div>

      {/* Prayer Calculation Methods */}
      <div
        className={`p-4 rounded-2xl border space-y-3 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <div>
          <label className="text-xs font-['Cinzel'] font-bold uppercase tracking-wider block mb-1 opacity-75">
            Prayer Calculation Convention
          </label>
          <select
            value={calculationMethod}
            onChange={(e) => setCalculationMethod(e.target.value)}
            className={`w-full p-2.5 rounded-xl text-xs border outline-none ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-[#020805] border-slate-800 text-slate-200'
            }`}
          >
            <option value="ISNA">Islamic Society of North America (ISNA - 15°)</option>
            <option value="MWL">Muslim World League (MWL - 18°)</option>
            <option value="UmmAlQura">Umm al-Qura University, Makkah</option>
            <option value="Karachi">University of Islamic Sciences, Karachi</option>
            <option value="Egyptian">Egyptian General Authority of Survey</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-['Cinzel'] font-bold uppercase tracking-wider block mb-1 opacity-75">
            Asr Jurisprudence (Fiqh)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAsrMethod('standard')}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                asrMethod === 'standard'
                  ? isLight
                    ? 'bg-[#8C630D] text-white border-[#8C630D]'
                    : 'bg-[#0E3524] text-[#FFDF78] border-[#FFDF78]'
                  : isLight
                  ? 'bg-slate-50 text-slate-700 border-slate-200'
                  : 'bg-[#020805] text-slate-300 border-slate-800'
              }`}
            >
              Standard (Shafi'i, Maliki, Hanbali)
            </button>

            <button
              type="button"
              onClick={() => setAsrMethod('hanafi')}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                asrMethod === 'hanafi'
                  ? isLight
                    ? 'bg-[#8C630D] text-white border-[#8C630D]'
                    : 'bg-[#0E3524] text-[#FFDF78] border-[#FFDF78]'
                  : isLight
                  ? 'bg-slate-50 text-slate-700 border-slate-200'
                  : 'bg-[#020805] text-slate-300 border-slate-800'
              }`}
            >
              Hanafi (Shadow Length 2x)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
