import React from 'react';

interface FooterProps {
  masjidName: string;
  wifiConnected: boolean;
  networkActive: boolean;
  secondsUntilSync: number;
  isLight?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  masjidName,
  wifiConnected = true,
  networkActive = true,
  secondsUntilSync,
  isLight = false,
}) => {
  return (
    <footer
      className={`relative w-full h-11 px-8 flex items-center justify-between border-t select-none z-20 text-xs font-['Cinzel'] tracking-wider transition-all duration-1000 ease-in-out ${
        isLight
          ? 'border-[#BFA054]/40 bg-gradient-to-r from-[#EDE5D5] via-[#E5DCB7]/50 to-[#EDE5D5]'
          : 'border-[#C5A059]/30 bg-gradient-to-r from-[#0D241A] via-[#102B20] to-[#0D241A]'
      }`}
    >
      {/* Left: Branding */}
      <div className="flex items-center space-x-3">
        <span
          className={`font-bold text-xs uppercase tracking-[0.2em] transition-colors duration-1000 ease-in-out ${
            isLight ? 'text-[#7A570E]' : 'text-[#C5A059]'
          }`}
        >
          MASJIDALERT KIOSK
        </span>
        <span className={`text-[10px] transition-colors duration-1000 ease-in-out ${isLight ? 'text-[#7A570E]/60' : 'text-[#E2D4B7]/40'}`}>v1.0</span>
      </div>

      {/* Center: Subtle Cloud Sync Indicator */}
      <div
        className={`hidden md:flex items-center space-x-2 text-[11px] transition-colors duration-1000 ease-in-out ${
          isLight ? 'text-[#7A570E]/80' : 'text-[#C5A059]/60'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isLight ? 'bg-[#7A570E]' : 'bg-[#C5A059]/50'}`} />
        <span>Syncing with Cloud in {secondsUntilSync}s</span>
      </div>

      {/* Right: Network Status */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {/* Green Pulsing Dot */}
          <span className="relative flex h-2.5 w-2.5">
            {wifiConnected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            )}
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                wifiConnected ? 'bg-emerald-600 shadow-[0_0_8px_#059669]' : 'bg-rose-500'
              }`}
            />
          </span>
          <span className={`font-semibold text-xs tracking-wide ${isLight ? 'text-[#1E293B]' : 'text-[#E2D4B7]'}`}>
            {wifiConnected ? 'WiFi Connected' : 'Connecting...'}
          </span>
        </div>

        <span className={isLight ? 'text-[#BFA054]/60' : 'text-[#C5A059]/40'}>·</span>
        <span className={`text-xs ${isLight ? 'text-[#475569]' : 'text-[#E2D4B7]/80'}`}>Network Active</span>
        <span className={isLight ? 'text-[#BFA054]/60' : 'text-[#C5A059]/40'}>·</span>
        <span className={`font-bold text-xs uppercase ${isLight ? 'text-[#7A570E]' : 'text-[#ECC968]'}`}>{masjidName}</span>
      </div>
    </footer>
  );
};
