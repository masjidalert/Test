import React from 'react';
import {
  HeartHandshake,
  AlertTriangle,
  HandHeart,
  Calendar,
  Heart,
  Mic,
  BookOpen,
  Users,
  Clock,
  Bell,
  Droplets,
  Radio,
  Sparkles,
  ShieldCheck,
  Moon,
  Sun,
  SunMedium,
  Sunset,
  Sunrise,
  Smartphone,
  Tv,
  Compass,
  MapPin,
  Building2,
  Share2,
  CheckCircle2,
  Phone,
  QrCode,
  Sliders,
  DollarSign,
  Award,
} from 'lucide-react';
import { AlertType } from '../types';

interface CategoryIconBadgeProps {
  type: AlertType | string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLight?: boolean;
  className?: string;
}

export const CategoryIconBadge: React.FC<CategoryIconBadgeProps> = ({
  type,
  size = 'md',
  isLight = false,
  className = '',
}) => {
  const sizeMap = {
    xs: { container: 'w-6 h-6 rounded-lg', icon: 'w-3 h-3' },
    sm: { container: 'w-8 h-8 rounded-xl', icon: 'w-4 h-4' },
    md: { container: 'w-10 h-10 rounded-xl', icon: 'w-5 h-5' },
    lg: { container: 'w-12 h-12 rounded-2xl', icon: 'w-6 h-6' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  switch (type) {
    case 'janazah':
      return (
        <div
          className={`${currentSize.container} flex items-center justify-center shrink-0 border transition-all ${
            isLight
              ? 'bg-[#F4EBD9] border-[#8C630D]/40 text-[#644605]'
              : 'bg-[#153426] border-[#FFDF78]/40 text-[#FFDF78]'
          } ${className}`}
        >
          <HeartHandshake className={currentSize.icon} />
        </div>
      );

    case 'urgent_aid':
    case 'blood':
      return (
        <div
          className={`${currentSize.container} flex items-center justify-center shrink-0 border transition-all ${
            isLight
              ? 'bg-rose-100 border-rose-300 text-rose-700'
              : 'bg-rose-950/60 border-rose-500/40 text-rose-400'
          } ${className}`}
        >
          <Droplets className={currentSize.icon} />
        </div>
      );

    case 'community_aid':
    case 'aid':
    case 'discreet':
      return (
        <div
          className={`${currentSize.container} flex items-center justify-center shrink-0 border transition-all ${
            isLight
              ? 'bg-amber-100 border-amber-300 text-amber-800'
              : 'bg-amber-950/60 border-amber-500/40 text-[#FFDF78]'
          } ${className}`}
        >
          <HandHeart className={currentSize.icon} />
        </div>
      );

    case 'iqamah_change':
    case 'iqamah':
      return (
        <div
          className={`${currentSize.container} flex items-center justify-center shrink-0 border transition-all ${
            isLight
              ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
              : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
          } ${className}`}
        >
          <Clock className={currentSize.icon} />
        </div>
      );

    case 'event':
      return (
        <div
          className={`${currentSize.container} flex items-center justify-center shrink-0 border transition-all ${
            isLight
              ? 'bg-teal-100 border-teal-300 text-teal-800'
              : 'bg-teal-950/60 border-teal-500/40 text-teal-300'
          } ${className}`}
        >
          <Calendar className={currentSize.icon} />
        </div>
      );

    case 'lecture':
      return (
        <div
          className={`${currentSize.container} flex items-center justify-center shrink-0 border transition-all ${
            isLight
              ? 'bg-purple-100 border-purple-300 text-purple-800'
              : 'bg-purple-950/60 border-purple-500/40 text-purple-300'
          } ${className}`}
        >
          <Mic className={currentSize.icon} />
        </div>
      );

    case 'learning':
      return (
        <div
          className={`${currentSize.container} flex items-center justify-center shrink-0 border transition-all ${
            isLight
              ? 'bg-sky-100 border-sky-300 text-sky-800'
              : 'bg-sky-950/60 border-sky-500/40 text-sky-300'
          } ${className}`}
        >
          <BookOpen className={currentSize.icon} />
        </div>
      );

    case 'charity':
      return (
        <div
          className={`${currentSize.container} flex items-center justify-center shrink-0 border transition-all ${
            isLight
              ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
              : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
          } ${className}`}
        >
          <Heart className={currentSize.icon} />
        </div>
      );

    case 'volunteer':
      return (
        <div
          className={`${currentSize.container} flex items-center justify-center shrink-0 border transition-all ${
            isLight
              ? 'bg-cyan-100 border-cyan-300 text-cyan-800'
              : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
          } ${className}`}
        >
          <Users className={currentSize.icon} />
        </div>
      );

    case 'general_notice':
    case 'update':
    default:
      return (
        <div
          className={`${currentSize.container} flex items-center justify-center shrink-0 border transition-all ${
            isLight
              ? 'bg-slate-100 border-slate-300 text-slate-700'
              : 'bg-[#153426] border-[#2A5C47] text-slate-300'
          } ${className}`}
        >
          <Bell className={currentSize.icon} />
        </div>
      );
  }
};

/**
 * Clean SVG Brand Logo Glyphs for Store Badges (Google Play, iOS Apple, Web, TV)
 */
export const PlatformStoreIcon: React.FC<{ platform: 'android' | 'apple' | 'web' | 'kiosk'; size?: number; className?: string }> = ({
  platform,
  size = 20,
  className = '',
}) => {
  if (platform === 'android') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`shrink-0 ${className}`}
      >
        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.996-3.4572c.1561-.2704.0634-.6154-.207-.7715-.2704-.1561-.6154-.0634-.7715.207l-2.0232 3.5042C15.3023 8.1633 13.7027 7.79 12 7.79c-1.7027 0-3.3023.3733-4.8758 1.0139L5.101 5.2997c-.1561-.2704-.5011-.3631-.7715-.207-.2704.1561-.3631.5011-.207.7715l1.996 3.4572C2.6886 11.2335.3435 14.8697 0 19.2h24c-.3435-4.3303-2.6886-7.9665-6.1185-9.8786" />
      </svg>
    );
  }

  if (platform === 'apple') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`shrink-0 ${className}`}
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-1 .04-2.16.66-2.84 1.46-.59.68-1.12 1.8-1 2.89 1.12.09 2.19-.51 2.85-1.31z" />
      </svg>
    );
  }

  if (platform === 'kiosk') {
    return <Tv className={`shrink-0 ${className}`} style={{ width: size, height: size }} />;
  }

  return <Smartphone className={`shrink-0 ${className}`} style={{ width: size, height: size }} />;
};
