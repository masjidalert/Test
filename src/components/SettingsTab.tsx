import React, { useState } from 'react';
import { ALL_ALERT_TYPES_META } from '../data/mobileData';
import { AlertType } from '../types';
import {
  Moon,
  Sun,
  Bell,
  Sliders,
  Bookmark,
  Heart,
  Shield,
  MapPin,
  Lock,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Coffee,
  Sparkles,
  Info,
} from 'lucide-react';

interface SettingsTabProps {
  isLight?: boolean;
  onToggleTheme: () => void;
  onOpenAdminLogin: () => void;
  onOpenMasjidsTab: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  isLight = false,
  onToggleTheme,
  onOpenAdminLogin,
  onOpenMasjidsTab,
}) => {
  const [enabledAlertTypes, setEnabledAlertTypes] = useState<Record<AlertType, boolean>>({
    janazah: true,
    urgent_aid: true,
    community_aid: true,
    event: true,
    lecture: true,
    learning: true,
    charity: true,
    volunteer: true,
    prayer_change: true,
    update: true,
  });

  const [isFilterMatrixExpanded, setIsFilterMatrixExpanded] = useState<boolean>(false);
  const [janazahOverride, setJanazahOverride] = useState<boolean>(true);

  const enabledCount = Object.values(enabledAlertTypes).filter(Boolean).length;

  const toggleAlertType = (type: AlertType) => {
    setEnabledAlertTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div>
        <h2
          className={`font-['Cinzel'] text-xl font-bold tracking-wide ${
            isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
          }`}
        >
          App Preferences & Settings
        </h2>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Configure alerts, theme mode, and community connectivity
        </p>
      </div>

      {/* 1. APPEARANCE (Dark / Light Mode Toggle) */}
      <div
        className={`p-4 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <span className="text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider block opacity-70 mb-3">
          Display Theme
        </span>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isLight ? 'bg-amber-100 text-amber-800' : 'bg-slate-800 text-[#FFDF78]'
              }`}
            >
              {isLight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </div>
            <div>
              <span className="font-bold text-xs block">
                {isLight ? 'Light Theme (Parchment & Gold)' : 'Dark Theme (Night Sanctuary)'}
              </span>
              <span className="text-[11px] opacity-70">
                {isLight ? 'Bright contrast with warm Islamic accents' : 'High-contrast emerald & gold dark mode'}
              </span>
            </div>
          </div>

          <button
            onClick={onToggleTheme}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isLight
                ? 'bg-[#FAF4E8] border-[#8C630D] text-[#8C630D] hover:bg-[#8C630D] hover:text-white'
                : 'bg-[#0E3524] border-[#FFDF78] text-[#FFDF78] hover:bg-[#FFDF78] hover:text-black'
            }`}
          >
            Switch to {isLight ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>

      {/* 2. NOTIFICATION FILTERS (Collapsed by default showing 10 of 10 enabled) */}
      <div
        className={`p-4 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Bell className="w-4 h-4 text-[#C5A059]" />
            <div>
              <span className="font-bold text-xs block">Notification Categories</span>
              <span className="text-[10px] text-emerald-500 font-semibold">
                {enabledCount} of 10 categories enabled
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsFilterMatrixExpanded(!isFilterMatrixExpanded)}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center space-x-1 border ${
              isLight
                ? 'border-slate-300 text-slate-700 hover:bg-slate-50'
                : 'border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>{isFilterMatrixExpanded ? 'Collapse' : 'Customize'}</span>
            {isFilterMatrixExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Janazah Special Override Toggle */}
        <div
          className={`mt-3 p-3 rounded-xl border flex items-center justify-between ${
            isLight ? 'bg-[#FAF4E8] border-[#8C630D]/30' : 'bg-[#082015] border-[#C5A059]/30'
          }`}
        >
          <div className="flex items-start space-x-2.5">
            <span className="text-base">🤍</span>
            <div>
              <span className="font-bold text-xs block">Janazah Critical Override</span>
              <p className="text-[10px] opacity-75 leading-tight">
                Play dignified tone even if phone is on silent (Fard Kifayah communal obligation)
              </p>
            </div>
          </div>

          <button
            onClick={() => setJanazahOverride(!janazahOverride)}
            className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
              janazahOverride ? 'bg-emerald-600' : 'bg-slate-600'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                janazahOverride ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Expandable 10-category list */}
        {isFilterMatrixExpanded && (
          <div className="mt-3 pt-3 border-t border-opacity-15 border-current space-y-2">
            <span className="text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider block opacity-70">
              Individual Alert Channels
            </span>

            <div className="space-y-1.5">
              {ALL_ALERT_TYPES_META.map((meta) => {
                const isEnabled = enabledAlertTypes[meta.type];
                return (
                  <div
                    key={meta.type}
                    className={`p-2 rounded-xl border flex items-center justify-between ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020805] border-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-base">{meta.icon}</span>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-xs">{meta.label}</span>
                          <span className={`text-[8px] px-1.5 py-0.2 rounded font-bold ${meta.badgeClass}`}>
                            {meta.colorName}
                          </span>
                        </div>
                        <span className="text-[10px] opacity-70 block">{meta.description}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleAlertType(meta.type)}
                      className={`w-9 h-4.5 rounded-full p-0.5 transition-colors ${
                        isEnabled ? 'bg-emerald-600' : 'bg-slate-600'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-4.5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. STAY CONNECTED (Home Communities) */}
      <div
        className={`p-4 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-[#C5A059] flex items-center justify-center shrink-0">
            <Bookmark className="w-5 h-5 fill-current" />
          </div>
          <div className="space-y-1">
            <span className="font-bold text-xs block">Stay Connected Across Cities</span>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Never miss a Janazah or emergency from your former hometown, parents’ mosque, or university community.
              Home communities stay active wherever you travel.
            </p>
            <button
              onClick={onOpenMasjidsTab}
              className={`mt-1 text-xs font-bold flex items-center space-x-1 ${
                isLight ? 'text-[#8C630D] hover:underline' : 'text-[#FFDF78] hover:underline'
              }`}
            >
              <span>Manage Home Communities in Directory →</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. SUPPORT THE DEVELOPER (Sadaqah & Ko-fi) */}
      <div
        className={`p-4 rounded-2xl border ${
          isLight
            ? 'bg-gradient-to-br from-[#FFFDF9] to-[#FAF4E8] border-[#8C630D]/40 shadow-sm'
            : 'bg-gradient-to-br from-[#061A11] to-[#020805] border-[#C5A059]/40'
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <Coffee className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center space-x-1.5">
              <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider">
                Support the Developer
              </span>
              <span className="text-[9px] px-1.5 py-0.2 bg-emerald-600 text-white font-bold rounded">
                SADAQAH
              </span>
            </div>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              “MasjidAlert is built by one Muslim developer as sadaqah. Free forever for all masjids. Contributions help cover server, push notification relay, and lobby TV hardware costs.”
            </p>

            <a
              href="https://ko-fi.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow ${
                isLight
                  ? 'bg-[#8C630D] text-white hover:bg-[#72500A]'
                  : 'bg-[#FFDF78] text-black hover:bg-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
              <span>Contribute via Ko-fi</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>

      {/* 5. SYSTEM ACCESS & PRIVACY */}
      <div
        className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <span className="text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider block opacity-70">
          Permissions & Security
        </span>

        <div className="flex items-center justify-between text-[11px] opacity-80">
          <span className="flex items-center space-x-1.5">
            <Bell className="w-3.5 h-3.5 text-emerald-500" />
            <span>Push Notifications</span>
          </span>
          <span className="font-semibold text-emerald-500">Authorized (Instant Delivery)</span>
        </div>

        <div className="flex items-center justify-between text-[11px] opacity-80">
          <span className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            <span>Location Services</span>
          </span>
          <span className="font-semibold text-emerald-500">Granted (Precise Qibla & Prayer Times)</span>
        </div>

        <div className="pt-2 border-t border-opacity-15 border-current flex items-center justify-between text-[10px] opacity-60">
          <span>Version 2.4.0 (Build 2026.08)</span>
          <span className="underline cursor-pointer">Privacy Policy & Terms</span>
        </div>
      </div>

      {/* 6. ADMIN & IMAM PORTAL LINK */}
      <div
        className={`p-4 rounded-2xl border ${
          isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#020805] border-slate-800'
        }`}
      >
        <button
          onClick={onOpenAdminLogin}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/40">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs block group-hover:text-[#C5A059] transition-colors">
                Masjid Admin & Imam Portal
              </span>
              <span className="text-[10px] opacity-70">
                Post alerts to mobile app & sync lobby TV kiosk display
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-xs font-bold text-[#C5A059]">
            <span>Log in</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </div>
  );
};
