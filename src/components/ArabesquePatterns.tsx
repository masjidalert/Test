import React from 'react';

// Ornate floral headpiece for prayer table header
export const IslamicFloralHeader: React.FC<{ className?: string }> = ({ className = 'w-full h-16' }) => (
  <svg viewBox="0 0 400 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ECC968" />
        <stop offset="50%" stopColor="#C5A059" />
        <stop offset="100%" stopColor="#8E6913" />
      </linearGradient>
      <linearGradient id="brightGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C5A059" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#ECC968" />
        <stop offset="100%" stopColor="#C5A059" stopOpacity="0.2" />
      </linearGradient>
    </defs>

    {/* Central Flower */}
    <g transform="translate(200, 30)">
      {/* 8-Petal Central Rosette */}
      <circle cx="0" cy="0" r="4.5" fill="url(#goldGradient)" />
      <circle cx="0" cy="0" r="8" stroke="url(#goldGradient)" strokeWidth="1" strokeDasharray="2 1.5" />
      
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <path
          key={i}
          d="M0,-8 C-3,-13 0,-18 0,-21 C0,-18 3,-13 0,-8"
          fill="url(#goldGradient)"
          transform={`rotate(${angle})`}
          opacity="0.85"
        />
      ))}
      
      {/* Outer Tendril Leaves */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path
          key={`sub-${i}`}
          d="M0,-14 C-5,-19 -4,-25 0,-27 C4,-25 5,-19 0,-14"
          stroke="url(#goldGradient)"
          strokeWidth="0.75"
          fill="none"
          transform={`rotate(${angle})`}
        />
      ))}
    </g>

    {/* Left Arabesque Tendril */}
    <g transform="translate(200, 30) scale(-1, 1)">
      <path
        d="M 28,0 C 45,-12 70,-15 100,-10 C 130,-5 155,-16 185,-5"
        stroke="url(#goldGradient)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M 35,5 C 60,-3 90,-2 120,-8 C 150,-14 170,-4 190,-1"
        stroke="url(#goldGradient)"
        strokeWidth="0.8"
        strokeOpacity="0.7"
        fill="none"
      />
      {/* Decorative leaf flourishes */}
      <path d="M 60,-13 C 65,-22 78,-20 82,-12 C 75,-14 68,-14 60,-13 Z" fill="url(#goldGradient)" opacity="0.8" />
      <path d="M 110,-8 C 118,-18 132,-16 135,-7 C 128,-9 120,-9 110,-8 Z" fill="url(#goldGradient)" opacity="0.8" />
      <path d="M 150,-12 C 156,-20 168,-18 172,-10 C 165,-12 158,-12 150,-12 Z" fill="url(#goldGradient)" opacity="0.8" />
      
      <circle cx="85" cy="-8" r="2.5" fill="url(#goldGradient)" />
      <circle cx="138" cy="-5" r="2.5" fill="url(#goldGradient)" />
      <circle cx="175" cy="-7" r="2" fill="url(#goldGradient)" />
    </g>

    {/* Right Arabesque Tendril */}
    <g transform="translate(200, 30)">
      <path
        d="M 28,0 C 45,-12 70,-15 100,-10 C 130,-5 155,-16 185,-5"
        stroke="url(#goldGradient)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M 35,5 C 60,-3 90,-2 120,-8 C 150,-14 170,-4 190,-1"
        stroke="url(#goldGradient)"
        strokeWidth="0.8"
        strokeOpacity="0.7"
        fill="none"
      />
      {/* Decorative leaf flourishes */}
      <path d="M 60,-13 C 65,-22 78,-20 82,-12 C 75,-14 68,-14 60,-13 Z" fill="url(#goldGradient)" opacity="0.8" />
      <path d="M 110,-8 C 118,-18 132,-16 135,-7 C 128,-9 120,-9 110,-8 Z" fill="url(#goldGradient)" opacity="0.8" />
      <path d="M 150,-12 C 156,-20 168,-18 172,-10 C 165,-12 158,-12 150,-12 Z" fill="url(#goldGradient)" opacity="0.8" />
      
      <circle cx="85" cy="-8" r="2.5" fill="url(#goldGradient)" />
      <circle cx="138" cy="-5" r="2.5" fill="url(#goldGradient)" />
      <circle cx="175" cy="-7" r="2" fill="url(#goldGradient)" />
    </g>

    {/* Bottom separator line */}
    <line x1="10" y1="56" x2="390" y2="56" stroke="url(#brightGold)" strokeWidth="1" />
  </svg>
);

// Ornate Islamic Divider / Tailpiece
export const IslamicDivider: React.FC<{ className?: string; width?: number }> = ({ className = 'w-48 h-6', width = 200 }) => (
  <svg viewBox={`0 0 ${width} 24`} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="divGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C5A059" stopOpacity="0" />
        <stop offset="30%" stopColor="#C5A059" />
        <stop offset="50%" stopColor="#F5E09A" />
        <stop offset="70%" stopColor="#C5A059" />
        <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
      </linearGradient>
    </defs>
    <line x1="0" y1="12" x2={width} y2="12" stroke="url(#divGold)" strokeWidth="1" />
    <g transform={`translate(${width / 2}, 12)`}>
      <polygon points="0,-6 6,0 0,6 -6,0" fill="#D4AF37" />
      <circle cx="0" cy="0" r="2" fill="#030A1A" />
      <circle cx="-14" cy="0" r="1.5" fill="#D4AF37" />
      <circle cx="14" cy="0" r="1.5" fill="#D4AF37" />
      <path d="M-10,-3 C-5,-4 -3,-1 0,0 C-3,1 -5,4 -10,3" stroke="#D4AF37" strokeWidth="0.75" fill="none" />
      <path d="M10,-3 C5,-4 3,-1 0,0 C3,1 5,4 10,3" stroke="#D4AF37" strokeWidth="0.75" fill="none" />
    </g>
  </svg>
);

// 8-Point Rub el Hizb Star Icon
export const RubElHizbStar: React.FC<{ className?: string; size?: number; active?: boolean }> = ({
  className = 'w-5 h-5',
  size = 24,
  active = false,
}) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
    <g transform="translate(12, 12)">
      {/* Square 1 */}
      <rect
        x="-7"
        y="-7"
        width="14"
        height="14"
        stroke={active ? '#ECC968' : '#C5A059'}
        strokeWidth="1.2"
        fill={active ? 'rgba(212,175,55,0.15)' : 'none'}
        className="transition-colors duration-300"
      />
      {/* Square 2 (rotated 45deg) */}
      <rect
        x="-7"
        y="-7"
        width="14"
        height="14"
        transform="rotate(45)"
        stroke={active ? '#ECC968' : '#C5A059'}
        strokeWidth="1.2"
        fill={active ? 'rgba(212,175,55,0.15)' : 'none'}
        className="transition-colors duration-300"
      />
      {/* Center dot */}
      <circle cx="0" cy="0" r="2.2" fill={active ? '#FFDF78' : '#C5A059'} />
    </g>
  </svg>
);

// Ornate Corner Filigree for Cards
export const OrnateCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
}> = ({ position, size = 24, className = '' }) => {
  const getCornerPaths = () => {
    switch (position) {
      case 'top-right':
        return {
          posClass: 'top-0 right-0',
          triangle: 'M 24,0 L 8,0 C 13,3 17,7 21,11 L 24,16 Z',
          circle: { cx: 20.5, cy: 3.5 },
          outerLine: 'M 22,20 L 22,2 L 4,2',
          innerLine: 'M 18,16 L 18,6 L 8,6',
        };
      case 'bottom-left':
        return {
          posClass: 'bottom-0 left-0',
          triangle: 'M 0,24 L 16,24 C 11,21 7,17 3,13 L 0,8 Z',
          circle: { cx: 3.5, cy: 20.5 },
          outerLine: 'M 2,4 L 2,22 L 20,22',
          innerLine: 'M 6,8 L 6,18 L 16,18',
        };
      case 'bottom-right':
        return {
          posClass: 'bottom-0 right-0',
          triangle: 'M 24,24 L 8,24 C 13,21 17,17 21,13 L 24,8 Z',
          circle: { cx: 20.5, cy: 20.5 },
          outerLine: 'M 22,4 L 22,22 L 4,22',
          innerLine: 'M 18,8 L 18,18 L 8,18',
        };
      case 'top-left':
      default:
        return {
          posClass: 'top-0 left-0',
          triangle: 'M 0,0 L 16,0 C 11,3 7,7 3,11 L 0,16 Z',
          circle: { cx: 3.5, cy: 3.5 },
          outerLine: 'M 2,20 L 2,2 L 20,2',
          innerLine: 'M 6,16 L 6,6 L 16,6',
        };
    }
  };

  const { posClass, triangle, circle, outerLine, innerLine } = getCornerPaths();

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute z-10 ${posClass} ${className}`}
    >
      <path d={triangle} fill="currentColor" opacity="0.65" />
      <circle cx={circle.cx} cy={circle.cy} r="1.5" fill="currentColor" />
      <path d={outerLine} stroke="currentColor" strokeWidth="1" strokeOpacity="0.85" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={innerLine} stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.45" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
};

// Bottom Floral Motif for Center Mihrab Arch
export const MihrabBaseFloral: React.FC<{ className?: string }> = ({ className = 'w-36 h-16' }) => (
  <svg viewBox="0 0 160 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="mihrabGold" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#8E6913" />
        <stop offset="50%" stopColor="#C5A059" />
        <stop offset="100%" stopColor="#ECC968" />
      </linearGradient>
    </defs>
    <g transform="translate(80, 50)">
      {/* Central rising palmette */}
      <path
        d="M 0,-35 C -6,-25 -12,-15 0,0 C 12,-15 6,-25 0,-35 Z"
        fill="url(#mihrabGold)"
        opacity="0.9"
      />
      <path
        d="M 0,-42 C -3,-36 -4,-30 0,-25 C 4,-30 3,-36 0,-42 Z"
        fill="url(#mihrabGold)"
      />
      
      {/* Side wings */}
      <path
        d="M -3,-12 C -18,-25 -32,-18 -38,-5 C -25,-4 -12,-6 -3,-12 Z"
        fill="url(#mihrabGold)"
        opacity="0.8"
      />
      <path
        d="M 3,-12 C 18,-25 32,-18 38,-5 C 25,-4 12,-6 3,-12 Z"
        fill="url(#mihrabGold)"
        opacity="0.8"
      />
      
      {/* Lower scroll flourishes */}
      <path
        d="M -5,0 C -25,-8 -45,5 -55,10 C -38,10 -20,6 -5,0 Z"
        fill="url(#mihrabGold)"
        opacity="0.7"
      />
      <path
        d="M 5,0 C 25,-8 45,5 55,10 C 38,10 20,6 5,0 Z"
        fill="url(#mihrabGold)"
        opacity="0.7"
      />

      <circle cx="0" cy="-2" r="3" fill="#ECC968" />
      <circle cx="-25" cy="-3" r="2" fill="#C5A059" />
      <circle cx="25" cy="-3" r="2" fill="#C5A059" />
    </g>
  </svg>
);

// Seamless Arabesque & Calligraphy Background Pattern
export const ArabesqueBackgroundPattern: React.FC<{ showCalligraphy?: boolean; isLight?: boolean }> = ({
  showCalligraphy = true,
  isLight = false,
}) => {
  const strokeColor = isLight ? '#967226' : '#D4AF37';
  const calligraphyColor = isLight ? '#825A08' : '#F5E09A';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Base Geometric Arabesque Star Matrix */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.038]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamicStarGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 50,0 L 60,30 L 90,20 L 70,45 L 100,50 L 70,55 L 90,80 L 60,70 L 50,100 L 40,70 L 10,80 L 30,55 L 0,50 L 30,45 L 10,20 L 40,30 Z"
              stroke={strokeColor}
              strokeWidth="0.9"
              fill="none"
            />
            <circle cx="50" cy="50" r="20" stroke={strokeColor} strokeWidth="0.6" fill="none" strokeDasharray="3 2" />
            <circle cx="0" cy="0" r="15" stroke={strokeColor} strokeWidth="0.6" fill="none" />
            <circle cx="100" cy="0" r="15" stroke={strokeColor} strokeWidth="0.6" fill="none" />
            <circle cx="0" cy="100" r="15" stroke={strokeColor} strokeWidth="0.6" fill="none" />
            <circle cx="100" cy="100" r="15" stroke={strokeColor} strokeWidth="0.6" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamicStarGrid)" />
      </svg>

      {/* 2. Flowing Arabic Calligraphy & Kufic Flourish Watermark Layer */}
      {showCalligraphy && (
        <svg className="absolute inset-0 w-full h-full opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arabicCalligraphyPattern" width="360" height="240" patternUnits="userSpaceOnUse">
              {/* Flowing Thuluth Calligraphic Script curves & ligatures */}
              <g stroke={calligraphyColor} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {/* Calligraphic word motif 1 (Allah / Lillah flowing flourish) */}
                <path d="M 30,70 C 45,30 65,25 75,55 C 85,25 105,20 115,50 C 125,25 140,25 145,65 C 145,85 110,95 80,90 C 50,85 30,95 20,80" />
                <path d="M 60,35 C 70,38 75,45 80,45" strokeWidth="1.6" />
                <circle cx="95" cy="30" r="2" fill={calligraphyColor} />
                <circle cx="130" cy="32" r="2" fill={calligraphyColor} />
                <path d="M 75,18 Q 85,12 95,22" strokeWidth="0.8" />

                {/* Square Kufic interwoven sacred geometry block */}
                <g transform="translate(220, 30)">
                  <rect x="0" y="0" width="80" height="80" stroke={calligraphyColor} strokeWidth="0.8" fill="none" strokeOpacity="0.4" />
                  <path d="M 10,10 H 70 V 70 H 10 Z" strokeWidth="0.8" />
                  <path d="M 20,20 H 60 V 50 H 30 V 40 H 50" strokeWidth="1.2" />
                  <path d="M 20,60 V 30 H 40" strokeWidth="1.2" />
                  <rect x="35" y="55" width="6" height="6" fill={calligraphyColor} />
                </g>

                {/* Calligraphic ribbon flow 2 (SubhanAllah / Alhamdulillah ligature wave) */}
                <path d="M 30,190 C 70,160 120,150 160,180 C 200,210 250,190 290,165 C 320,145 350,165 355,185" />
                <path d="M 65,165 Q 85,140 100,160 Q 115,135 130,155 Q 145,130 155,160" strokeWidth="1" />
                <circle cx="90" cy="140" r="2" fill={calligraphyColor} />
                <circle cx="120" cy="135" r="2" fill={calligraphyColor} />
                <circle cx="210" cy="175" r="2" fill={calligraphyColor} />
                <circle cx="270" cy="160" r="2" fill={calligraphyColor} />

                {/* Classical Calligraphic Diacritical Floral Marks (Shaddah, Damma, Tanween flourishes) */}
                <path d="M 180,75 C 185,68 192,68 196,74 C 200,68 207,68 211,74" strokeWidth="1.4" />
                <path d="M 45,140 C 48,132 54,132 57,138 C 60,132 66,132 69,138" strokeWidth="1.4" />
                <path d="M 290,95 Q 295,85 305,90 Q 315,95 310,105" strokeWidth="1" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arabicCalligraphyPattern)" />
        </svg>
      )}
    </div>
  );
};

// Seamless Faded Islamic Arabesque & Calligraphic Lattice Texture (Delicate, elegant, non-overwhelming)
export const FadedIslamicPattern: React.FC<{ className?: string; opacity?: number; isLight?: boolean }> = ({
  className = 'w-full h-full',
  opacity = 0.07,
  isLight = false,
}) => {
  const strokeColor = isLight ? '#8C630D' : '#ECC968';
  const nodeColor = isLight ? '#B38318' : '#FFDF78';
  const nodeBorder = isLight ? '#644605' : '#C5A059';

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <defs>
          {/* Seamless Moroccan Ogee Arched Trellis with Calligraphic Leaf & Qalam Flourishes */}
          <pattern id={isLight ? "fadedArabesqueLatticeLight" : "fadedArabesqueLatticeDark"} width="120" height="160" patternUnits="userSpaceOnUse">
            <g stroke={strokeColor} strokeWidth="0.85" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* Primary Ogee Arch Trellis Lines */}
              <path d="M 0,80 C 20,40 40,40 60,0 C 80,40 100,40 120,80" />
              <path d="M 0,80 C 20,120 40,120 60,160 C 80,120 100,120 120,80" />
              
              {/* Secondary Interlacing Counter-Arch */}
              <path d="M 60,0 C 80,40 80,120 60,160" strokeDasharray="3 2" strokeWidth="0.6" />
              <path d="M 60,0 C 40,40 40,120 60,160" strokeDasharray="3 2" strokeWidth="0.6" />
              <path d="M 0,80 C 40,80 80,80 120,80" strokeWidth="0.5" strokeOpacity="0.6" />

              {/* Inner Flowing Calligraphic Leaf / Flourish Curves */}
              <path d="M 60,40 C 70,55 70,70 60,85 C 50,70 50,55 60,40 Z" fill={strokeColor} fillOpacity="0.1" strokeWidth="0.6" />
              <path d="M 60,120 C 70,105 70,90 60,75 C 50,90 50,105 60,120 Z" fill={strokeColor} fillOpacity="0.1" strokeWidth="0.6" />

              {/* Small Rosette Node Accents */}
              <circle cx="60" cy="0" r="2.5" fill={nodeColor} stroke={nodeBorder} strokeWidth="0.5" />
              <circle cx="60" cy="160" r="2.5" fill={nodeColor} stroke={nodeBorder} strokeWidth="0.5" />
              <circle cx="0" cy="80" r="2.5" fill={nodeColor} stroke={nodeBorder} strokeWidth="0.5" />
              <circle cx="120" cy="80" r="2.5" fill={nodeColor} stroke={nodeBorder} strokeWidth="0.5" />
              <circle cx="60" cy="80" r="1.8" fill={strokeColor} />

              {/* Delicate Qalam Diacritical Dots & Calligraphic Accents */}
              <circle cx="30" cy="40" r="1" fill={nodeColor} />
              <circle cx="90" cy="40" r="1" fill={nodeColor} />
              <circle cx="30" cy="120" r="1" fill={nodeColor} />
              <circle cx="90" cy="120" r="1" fill={nodeColor} />
              
              <path d="M 25,65 Q 30,58 35,65" strokeWidth="0.7" />
              <path d="M 85,65 Q 90,58 95,65" strokeWidth="0.7" />
              <path d="M 25,95 Q 30,102 35,95" strokeWidth="0.7" />
              <path d="M 85,95 Q 90,102 95,95" strokeWidth="0.7" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${isLight ? "fadedArabesqueLatticeLight" : "fadedArabesqueLatticeDark"})`} />
      </svg>
    </div>
  );
};
