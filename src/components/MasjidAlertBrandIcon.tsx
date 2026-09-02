import React from 'react';

interface MasjidAlertBrandIconProps {
  className?: string;
  size?: number;
  showText?: boolean;
  isLight?: boolean;
  variant?: 'standard' | 'badge' | 'minimal';
}

export const MasjidAlertBrandIcon: React.FC<MasjidAlertBrandIconProps> = ({
  className = '',
  size = 36,
  showText = false,
  isLight = false,
  variant = 'standard',
}) => {
  return (
    <div className={`inline-flex items-center space-x-2.5 ${className}`}>
      {/* Custom Vector Islamic Star & Beacon Crest */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105"
        style={{
          width: size,
          height: size,
          boxShadow: isLight
            ? '0 4px 14px rgba(140, 99, 13, 0.18)'
            : '0 4px 18px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 223, 120, 0.25)',
        }}
      >
        {/* Background gradient (Sanctuary Emerald with gold rim) */}
        <div
          className={`absolute inset-0 transition-colors ${
            isLight
              ? 'bg-gradient-to-br from-[#135B3E] via-[#0E4730] to-[#083020] border-2 border-[#8C630D]'
              : 'bg-gradient-to-br from-[#144230] via-[#0D2D21] to-[#071912] border-2 border-[#C5A059]'
          }`}
        />

        {/* Ambient Center Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,223,120,0.22)_0%,transparent_70%)]" />

        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-[82%] h-[82%]"
        >
          <defs>
            {/* Gold Metallic Linear Gradient */}
            <linearGradient id="brandGoldGrad" x1="12" y1="6" x2="52" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF2B2" />
              <stop offset="0.3" stopColor="#FFDF78" />
              <stop offset="0.7" stopColor="#C5A059" />
              <stop offset="1" stopColor="#8C630D" />
            </linearGradient>

            {/* Dome Subtle Shimmer */}
            <linearGradient id="brandDomeFill" x1="32" y1="12" x2="32" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFDF78" stopOpacity="0.35" />
              <stop offset="0.6" stopColor="#C5A059" stopOpacity="0.18" />
              <stop offset="1" stopColor="#0B2017" stopOpacity="0.8" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="beaconGlow" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Islamic 8-Point Geometric Star (Rub el Hizb) Background Filigree */}
          <path
            d="M32 4L37.5 13.5H48.5V24.5L58 30L52.5 39.5H41.5V50.5L32 60L22.5 50.5H11.5V39.5L6 30L15.5 24.5V13.5H26.5L32 4Z"
            stroke="url(#brandGoldGrad)"
            strokeWidth="1.2"
            strokeOpacity="0.45"
            fill="none"
          />

          {/* 2. Beacon Resonance Waves (Alert Broadcast Pulses) */}
          <path
            d="M45 20C49 23.5 51.5 28.5 51.5 34C51.5 39.5 49 44.5 45 48"
            stroke="url(#brandGoldGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
          <path
            d="M51 14C56.5 19 60 26 60 34C60 42 56.5 49 51 54"
            stroke="url(#brandGoldGrad)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />
          <path
            d="M19 20C15 23.5 12.5 28.5 12.5 34C12.5 39.5 15 44.5 19 48"
            stroke="url(#brandGoldGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
          <path
            d="M13 14C7.5 19 4 26 4 34C4 42 7.5 49 13 54"
            stroke="url(#brandGoldGrad)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeOpacity="0.5"
          />

          {/* 3. Central Mosque Mihrab Dome */}
          <path
            d="M32 14C28 20 20 24 20 34V49H44V34C44 24 36 20 32 14Z"
            fill="url(#brandDomeFill)"
            stroke="url(#brandGoldGrad)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* 4. Mihrab Archway Door */}
          <path
            d="M28 49V38C28 35.7909 29.7909 34 32 34C34.2091 34 36 35.7909 36 38V49H28Z"
            fill={isLight ? '#0A2A1E' : '#05160F'}
            stroke="url(#brandGoldGrad)"
            strokeWidth="1.5"
          />

          {/* 5. Minaret Crescent Finial (Spire Star & Hilal) */}
          <path
            d="M32 7V14M32 7C30.9 7 30 6.1 30 5C30 3.9 30.9 3 32 3C33.1 3 34 3.9 34 5C34 6.1 33.1 7 32 7Z"
            stroke="url(#brandGoldGrad)"
            strokeWidth="1.8"
            fill="#FFDF78"
          />

          {/* 6. Central Minaret Light Point */}
          <circle cx="32" cy="27" r="1.8" fill="#FFF2B2" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      {showText && (
        <div className="flex flex-col text-left select-none">
          <div className="flex items-center space-x-1.5">
            <span
              className={`font-['Cinzel'] font-extrabold tracking-wider text-base md:text-lg uppercase leading-none ${
                isLight ? 'text-[#0A2E20]' : 'text-[#FAF5EB]'
              }`}
            >
              Masjid<span className={isLight ? 'text-[#8C630D]' : 'text-[#FFDF78]'}>Alert</span>
            </span>
            <span
              className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold tracking-widest leading-none ${
                isLight
                  ? 'bg-[#8C630D]/15 text-[#8C630D] border border-[#8C630D]/30'
                  : 'bg-[#C5A059]/20 text-[#FFDF78] border border-[#C5A059]/40'
              }`}
            >
              Network
            </span>
          </div>
          <span
            className={`text-[10px] font-['Cinzel'] tracking-widest uppercase font-semibold mt-1 leading-none ${
              isLight ? 'text-[#125A3D]' : 'text-[#C5A059]'
            }`}
          >
            Prayer Times & Community Alerts
          </span>
        </div>
      )}
    </div>
  );
};

