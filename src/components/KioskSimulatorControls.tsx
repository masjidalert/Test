import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  Sparkles,
  AlertTriangle,
  Clock,
  QrCode,
  Maximize,
  Moon,
  Sun,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react';
import { JanazahNotice, ThemeMode } from '../types';

interface KioskSimulatorControlsProps {
  isJanazahActive: boolean;
  onToggleJanazah: (active: boolean) => void;
  isJumuahMode: boolean;
  onToggleJumuah: (active: boolean) => void;
  isFundraiserActive: boolean;
  onToggleFundraiser: (active: boolean) => void;
  isScreensaverActive: boolean;
  onToggleScreensaver: (active: boolean) => void;
  onTriggerSync: () => void;
  onSetSimulatedTime: (date: Date | null) => void;
  simulatedTime: Date | null;
  masjidName: string;
  onUpdateMasjidName: (name: string) => void;
  cityState: string;
  onUpdateCityState: (city: string) => void;
  activeJanazah: JanazahNotice;
  onUpdateJanazahName: (name: string) => void;
  themeMode: ThemeMode;
  onSetThemeMode: (mode: ThemeMode) => void;
  resolvedIsLight: boolean;
}

export const KioskSimulatorControls: React.FC<KioskSimulatorControlsProps> = ({
  isJanazahActive,
  onToggleJanazah,
  isJumuahMode,
  onToggleJumuah,
  isFundraiserActive,
  onToggleFundraiser,
  isScreensaverActive,
  onToggleScreensaver,
  onTriggerSync,
  onSetSimulatedTime,
  simulatedTime,
  masjidName,
  onUpdateMasjidName,
  cityState,
  onUpdateCityState,
  activeJanazah,
  onUpdateJanazahName,
  themeMode,
  onSetThemeMode,
  resolvedIsLight,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Time preset handlers
  const setPresetTime = (hours: number, minutes: number) => {
    const d = new Date();
    d.setHours(hours, minutes, 0, 0);
    onSetSimulatedTime(d);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (isHidden) {
    return (
      <button
        onClick={() => setIsHidden(false)}
        title="Show Kiosk Preview Controls"
        className="fixed bottom-3 right-3 z-40 bg-[#0B1528] text-[#ECC968] p-2 rounded-full border border-[#C5A059]/60 shadow-lg opacity-40 hover:opacity-100 transition-opacity"
      >
        <Sliders className="w-4 h-4" />
      </button>
    );
  }

  return (
    <aside aria-label="Imam Remote Simulator" className="fixed bottom-4 right-4 z-40 max-w-sm w-full select-none">
      {/* Mini Bar when closed */}
      {!isOpen ? (
        <div className="bg-[#0B1528]/95 backdrop-blur-md border border-[#C5A059]/70 rounded-lg p-2.5 shadow-2xl flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-['Cinzel'] font-bold text-[#FFDF78]">
              Imam Remote Simulator
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => onToggleJanazah(!isJanazahActive)}
              className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors ${
                isJanazahActive
                  ? 'bg-rose-950 text-rose-200 border border-rose-600'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Janazah: {isJanazahActive ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="p-1 rounded bg-[#030919] text-[#ECC968] border border-[#C5A059]/40 hover:bg-[#C5A059]/20"
              title="Open Controls"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsHidden(true)}
              className="p-1 rounded text-slate-400 hover:text-white"
              title="Hide controls entirely for pure TV kiosk look"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Expanded Drawer */
        <div className="bg-[#071020]/98 backdrop-blur-xl border-2 border-[#C5A059] rounded-xl p-4 shadow-2xl text-slate-200 text-xs flex flex-col space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#ECC968]" />
              <h3 className="font-['Cinzel'] font-bold text-sm text-[#FFDF78]">
                MasjidAlert Imam Cloud Remote
              </h3>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={handleToggleFullscreen}
                className="p-1 rounded text-slate-300 hover:text-[#ECC968]"
                title="Toggle Fullscreen"
              >
                <Maximize className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-300 hover:text-[#ECC968]"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Triggers Grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Janazah Notice Trigger */}
            <button
              onClick={() => onToggleJanazah(!isJanazahActive)}
              className={`p-2 rounded border flex items-center justify-between transition-all ${
                isJanazahActive
                  ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-[0_0_10px_rgba(225,29,72,0.3)]'
                  : 'bg-[#030919] border-slate-700 text-slate-300 hover:border-[#C5A059]'
              }`}
            >
              <span className="font-semibold text-[11px]">Janazah Alert</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isJanazahActive ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isJanazahActive ? 'ACTIVE' : 'OFF'}
              </span>
            </button>

            {/* Jumu'ah Mubarak Mode */}
            <button
              onClick={() => onToggleJumuah(!isJumuahMode)}
              className={`p-2 rounded border flex items-center justify-between transition-all ${
                isJumuahMode
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                  : 'bg-[#030919] border-slate-700 text-slate-300 hover:border-[#C5A059]'
              }`}
            >
              <span className="font-semibold text-[11px]">Jumu'ah Mode</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isJumuahMode ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isJumuahMode ? 'FRIDAY' : 'OFF'}
              </span>
            </button>

            {/* Fundraiser QR Swap */}
            <button
              onClick={() => onToggleFundraiser(!isFundraiserActive)}
              className={`p-2 rounded border flex items-center justify-between transition-all ${
                isFundraiserActive
                  ? 'bg-amber-950/80 border-amber-500 text-amber-100 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'bg-[#030919] border-slate-700 text-slate-300 hover:border-[#C5A059]'
              }`}
            >
              <span className="font-semibold text-[11px]">Fundraiser QR</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isFundraiserActive ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isFundraiserActive ? 'CAMPAIGN' : 'GENERAL'}
              </span>
            </button>

            {/* Screensaver Standby */}
            <button
              onClick={() => onToggleScreensaver(!isScreensaverActive)}
              className={`p-2 rounded border flex items-center justify-between transition-all ${
                isScreensaverActive
                  ? 'bg-purple-950/80 border-purple-500 text-purple-100'
                  : 'bg-[#030919] border-slate-700 text-slate-300 hover:border-[#C5A059]'
              }`}
            >
              <span className="font-semibold text-[11px]">Night Screensaver</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isScreensaverActive ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isScreensaverActive ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>

          {/* Theme Mode Selector: Auto by Prayer, Light, Dark */}
          <div className="space-y-1.5 pt-1 border-t border-[#C5A059]/20">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold uppercase font-['Cinzel'] text-[#C5A059]">
                Kiosk Theme
              </span>
              <span className="text-[10px] text-[#ECC968] font-medium">
                Active:{' '}
                <span className="font-bold uppercase">
                  {resolvedIsLight ? '☀️ Light' : '🌙 Dark'}
                </span>
                {themeMode === 'auto' && ' (Auto Schedule)'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => onSetThemeMode('auto')}
                className={`py-1 px-1.5 rounded border text-[10px] font-semibold flex items-center justify-center space-x-1 transition-all ${
                  themeMode === 'auto'
                    ? 'bg-[#C5A059] text-[#030919] border-[#FFDF78] font-bold shadow-md'
                    : 'bg-[#030919] border-slate-700 text-slate-300 hover:border-[#C5A059]'
                }`}
              >
                <span>⚡ Auto (Prayer)</span>
              </button>

              <button
                onClick={() => onSetThemeMode('light')}
                className={`py-1 px-1.5 rounded border text-[10px] font-semibold flex items-center justify-center space-x-1 transition-all ${
                  themeMode === 'light'
                    ? 'bg-[#FDF8EE] text-[#030919] border-[#C5A059] font-bold shadow-md'
                    : 'bg-[#030919] border-slate-700 text-slate-300 hover:border-[#C5A059]'
                }`}
              >
                <span>☀️ Light</span>
              </button>

              <button
                onClick={() => onSetThemeMode('dark')}
                className={`py-1 px-1.5 rounded border text-[10px] font-semibold flex items-center justify-center space-x-1 transition-all ${
                  themeMode === 'dark'
                    ? 'bg-[#0A1833] text-[#FFDF78] border-[#C5A059] font-bold shadow-md'
                    : 'bg-[#030919] border-slate-700 text-slate-300 hover:border-[#C5A059]'
                }`}
              >
                <span>🌙 Dark</span>
              </button>
            </div>
          </div>

          {/* Time Jump / Prayer Scenarios */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-[#C5A059]">
              <span className="font-bold uppercase font-['Cinzel']">Simulate Prayer Time</span>
              {simulatedTime ? (
                <button
                  onClick={() => onSetSimulatedTime(null)}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Reset to Live Clock
                </button>
              ) : (
                <span className="text-[10px] text-emerald-400">● Live Device Clock</span>
              )}
            </div>

            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => setPresetTime(5, 20)}
                className="p-1 rounded bg-[#030919] border border-slate-700 hover:border-[#ECC968] text-[10px] text-center"
              >
                Fajr
              </button>
              <button
                onClick={() => setPresetTime(13, 5)}
                className="p-1 rounded bg-[#030919] border border-slate-700 hover:border-[#ECC968] text-[10px] text-center"
              >
                Dhuhr
              </button>
              <button
                onClick={() => setPresetTime(17, 10)}
                className="p-1 rounded bg-[#030919] border border-[#ECC968] text-[#FFDF78] text-[10px] text-center font-bold"
                title="Between Athan and Iqamah (shows progress bar)"
              >
                Asr (Iqamah)
              </button>
              <button
                onClick={() => setPresetTime(19, 45)}
                className="p-1 rounded bg-[#030919] border border-slate-700 hover:border-[#ECC968] text-[10px] text-center"
              >
                Maghrib
              </button>
            </div>
          </div>

          {/* Masjid Customization */}
          <div className="space-y-1.5 pt-1 border-t border-[#C5A059]/20">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-['Cinzel'] text-[#C5A059] uppercase font-bold">
                Masjid Name & City
              </label>
              <button
                onClick={onTriggerSync}
                className="flex items-center space-x-1 text-[10px] text-[#ECC968] hover:underline"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simulate 60s Poll</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <input
                type="text"
                value={masjidName}
                onChange={(e) => onUpdateMasjidName(e.target.value)}
                className="bg-[#030919] border border-slate-700 rounded px-2 py-1 text-xs text-[#FFDF78] focus:border-[#C5A059] outline-none"
                placeholder="Masjid Name"
              />
              <input
                type="text"
                value={cityState}
                onChange={(e) => onUpdateCityState(e.target.value)}
                className="bg-[#030919] border border-slate-700 rounded px-2 py-1 text-xs text-[#E2D4B7] focus:border-[#C5A059] outline-none"
                placeholder="City, State"
              />
            </div>
          </div>

          {/* Janazah Name Customizer if active */}
          {isJanazahActive && (
            <div className="space-y-1 pt-1 border-t border-rose-900/40">
              <label className="text-[10px] text-rose-300 font-semibold">
                Deceased Name in Janazah Alert:
              </label>
              <input
                type="text"
                value={activeJanazah.deceasedName}
                onChange={(e) => onUpdateJanazahName(e.target.value)}
                className="w-full bg-[#1A080B] border border-rose-700 rounded px-2 py-1 text-xs text-rose-200 focus:border-rose-400 outline-none"
              />
            </div>
          )}

          <div className="text-[10px] text-slate-500 text-center font-sans">
            Pre-configured for Amazon Fire TV Stick · Polling every 60s
          </div>
        </div>
      )}
    </aside>
  );
};
