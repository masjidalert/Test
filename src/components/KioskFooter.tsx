import React from 'react';
import { Wifi, Radio, Volume2, VolumeX } from 'lucide-react';

interface KioskFooterProps {
  masjidName: string;
  isWifiConnected?: boolean;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const KioskFooter: React.FC<KioskFooterProps> = ({
  masjidName,
  isWifiConnected = true,
  isMuted = false,
  onToggleMute,
}) => {
  return (
    <footer className="w-full bg-[#0d1c2e] border border-[#f0be50]/30 rounded-xl px-5 py-2 flex items-center justify-between shadow-lg text-xs text-[#d7e3fc]/80 font-sans z-10 shrink-0">
      {/* Left: Branding & Version */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-['Cinzel'] font-bold text-xs tracking-wider text-[#f0be50]">
            MASJIDALERT KIOSK v1.0
          </span>
        </div>
        <span className="text-[#f0be50]/40">|</span>
        <span className="text-[11px] text-[#d7e3fc]/60 hidden sm:inline">
          Permanent TV Display Engine · Silk Browser Optimized
        </span>
      </div>

      {/* Center audio toggle (optional quick access) */}
      {onToggleMute && (
        <button
          onClick={onToggleMute}
          className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-lg bg-[#071325] border border-white/10 hover:border-[#f0be50]/40 transition-all text-[11px]"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-rose-300">Quiet Mode</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">Sound ON</span>
            </>
          )}
        </button>
      )}

      {/* Right: WiFi Status & Masjid Name */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5">
          <Wifi className={`w-3.5 h-3.5 ${isWifiConnected ? 'text-emerald-400' : 'text-rose-400'}`} />
          <span className="text-[11px] font-mono">
            {isWifiConnected ? 'Connected' : 'Offline'}
          </span>
        </div>
        <span className="text-[#f0be50]/40">✦</span>
        <span className="font-['Cinzel'] font-bold text-xs text-[#f0be50] tracking-wide">
          {masjidName}
        </span>
      </div>
    </footer>
  );
};
