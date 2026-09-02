import React from 'react';

// Subtle 8-Point Star Geometric Background Pattern for TV Kiosks
export const KioskArabesqueBackground: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.04,
}) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <defs>
        <pattern id="kiosk8PointStar" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* 8-Point Islamic Star */}
          <path
            d="M 40,0 L 48,24 L 72,16 L 56,36 L 80,40 L 56,44 L 72,64 L 48,56 L 40,80 L 32,56 L 8,64 L 24,44 L 0,40 L 24,36 L 8,16 L 32,24 Z"
            stroke="#f0be50"
            strokeWidth="0.75"
            fill="none"
          />
          {/* Connecting Octagonal Web */}
          <rect x="20" y="20" width="40" height="40" stroke="#f0be50" strokeWidth="0.5" strokeOpacity="0.6" fill="none" />
          <rect x="20" y="20" width="40" height="40" transform="rotate(45 40 40)" stroke="#f0be50" strokeWidth="0.5" strokeOpacity="0.6" fill="none" />
          <circle cx="40" cy="40" r="12" stroke="#f0be50" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
          <circle cx="0" cy="0" r="10" stroke="#f0be50" strokeWidth="0.5" fill="none" />
          <circle cx="80" cy="0" r="10" stroke="#f0be50" strokeWidth="0.5" fill="none" />
          <circle cx="0" cy="80" r="10" stroke="#f0be50" strokeWidth="0.5" fill="none" />
          <circle cx="80" cy="80" r="10" stroke="#f0be50" strokeWidth="0.5" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kiosk8PointStar)" />
    </svg>
  </div>
);

// Ornate Gold Filigree Divider
export const KioskGoldDivider: React.FC<{ className?: string }> = ({ className = 'w-36 h-4' }) => (
  <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="kioskGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f0be50" stopOpacity="0" />
        <stop offset="25%" stopColor="#c9a227" />
        <stop offset="50%" stopColor="#f0be50" />
        <stop offset="75%" stopColor="#c9a227" />
        <stop offset="100%" stopColor="#f0be50" stopOpacity="0" />
      </linearGradient>
    </defs>
    <line x1="0" y1="10" x2="200" y2="10" stroke="url(#kioskGoldGrad)" strokeWidth="1" />
    <g transform="translate(100, 10)">
      <polygon points="0,-5 5,0 0,5 -5,0" fill="#f0be50" />
      <circle cx="0" cy="0" r="1.5" fill="#071325" />
      <circle cx="-12" cy="0" r="1.2" fill="#c9a227" />
      <circle cx="12" cy="0" r="1.2" fill="#c9a227" />
      <circle cx="-22" cy="0" r="0.8" fill="#f0be50" opacity="0.6" />
      <circle cx="22" cy="0" r="0.8" fill="#f0be50" opacity="0.6" />
    </g>
  </svg>
);

// 8-Point Rub el Hizb Star Icon (Gold)
export const KioskRubElHizb: React.FC<{ className?: string; size?: number; active?: boolean }> = ({
  className = '',
  size = 20,
  active = false,
}) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size}>
    <g transform="translate(12, 12)">
      <rect
        x="-7"
        y="-7"
        width="14"
        height="14"
        stroke={active ? '#f0be50' : '#c9a227'}
        strokeWidth="1.2"
        fill={active ? 'rgba(240,190,80,0.2)' : 'none'}
      />
      <rect
        x="-7"
        y="-7"
        width="14"
        height="14"
        transform="rotate(45)"
        stroke={active ? '#f0be50' : '#c9a227'}
        strokeWidth="1.2"
        fill={active ? 'rgba(240,190,80,0.2)' : 'none'}
      />
      <circle cx="0" cy="0" r="2" fill={active ? '#f0be50' : '#c9a227'} />
    </g>
  </svg>
);

// Arabesque Corner Filigree
export const KioskCornerAccent: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
}> = ({ position, size = 20, className = '' }) => {
  const getPaths = () => {
    switch (position) {
      case 'top-right':
        return {
          pos: 'top-0 right-0',
          outer: 'M 20,20 L 20,2 L 2,2',
          inner: 'M 16,16 L 16,6 L 6,6',
          dot: { cx: 17, cy: 3 },
        };
      case 'bottom-left':
        return {
          pos: 'bottom-0 left-0',
          outer: 'M 2,2 L 2,20 L 20,20',
          inner: 'M 6,6 L 6,16 L 16,16',
          dot: { cx: 3, cy: 17 },
        };
      case 'bottom-right':
        return {
          pos: 'bottom-0 right-0',
          outer: 'M 20,2 L 20,20 L 2,20',
          inner: 'M 16,6 L 16,16 L 6,16',
          dot: { cx: 17, cy: 17 },
        };
      case 'top-left':
      default:
        return {
          pos: 'top-0 left-0',
          outer: 'M 2,20 L 2,2 L 20,2',
          inner: 'M 6,16 L 6,6 L 16,6',
          dot: { cx: 3, cy: 3 },
        };
    }
  };

  const { pos, outer, inner, dot } = getPaths();

  return (
    <svg
      viewBox="0 0 22 22"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute z-10 ${pos} text-[#f0be50]/40 ${className}`}
    >
      <path d={outer} stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d={inner} stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={dot.cx} cy={dot.cy} r="1.2" fill="currentColor" />
    </svg>
  );
};
