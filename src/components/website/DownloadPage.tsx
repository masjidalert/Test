import React, { useState } from 'react';
import { WebsitePage, AppViewMode } from '../../types';
import { MasjidAlertBrandIcon } from '../MasjidAlertBrandIcon';
import { RubElHizbStar, OrnateCorner } from '../ArabesquePatterns';
import { PlatformStoreIcon, CategoryIconBadge } from '../CategoryIconBadge';
import {
  Download,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Bell,
  MapPin,
  Clock,
  Compass,
  Mail,
  Send,
  Sparkles,
  Layers,
  ArrowRight,
  HeartHandshake,
  Building2,
} from 'lucide-react';

interface DownloadPageProps {
  isLight: boolean;
  onNavigatePage: (page: WebsitePage) => void;
  onSwitchViewMode: (mode: AppViewMode) => void;
}

export const DownloadPage: React.FC<DownloadPageProps> = ({
  isLight,
  onNavigatePage,
  onSwitchViewMode,
}) => {
  const [iosEmail, setIosEmail] = useState('');
  const [iosSubscribed, setIosSubscribed] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'prayer' | 'alerts' | 'directory'>('prayer');

  const handleIosNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!iosEmail) return;
    setIosSubscribed(true);
  };

  return (
    <div className="w-full space-y-16 sm:space-y-20 py-6 sm:py-12">
      {/* 1. HERO DOWNLOAD BLOCK */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Large App Brand Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-3xl border shadow-2xl transition-all"
            style={{
              backgroundColor: isLight ? '#FAF4E8' : '#122D22',
              borderColor: isLight ? '#8C630D' : '#C5A059',
            }}
          >
            <MasjidAlertBrandIcon size={72} showText={false} isLight={isLight} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <RubElHizbStar size={10} />
            <span>Version 1.4.0 · Free Forever · Built as Sadaqah</span>
          </div>

          <h1 className="font-['Cinzel'] text-3xl sm:text-5xl font-extrabold tracking-tight">
            Download MasjidAlert free
          </h1>

          <p className={`text-sm sm:text-base max-w-lg mx-auto leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            No account required. No personal information collected. Find your masjid and follow in under a minute.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Google Play (Android) */}
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-3 transition-all shadow-xl ${
              isLight
                ? 'bg-[#125A3D] hover:bg-[#0E462F] text-white shadow-emerald-900/20'
                : 'bg-[#FFDF78] hover:bg-[#FFEAA0] text-[#0A2218] shadow-[0_0_20px_rgba(255,223,120,0.3)]'
            }`}
          >
            <PlatformStoreIcon platform="android" size={22} />
            <div className="text-left">
              <span className="text-[9px] block opacity-80 uppercase leading-none">Available Now on</span>
              <span className="font-bold">Google Play Store</span>
            </div>
          </a>

          {/* Apple App Store (Coming Soon) */}
          <div
            className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-3 border opacity-65 cursor-not-allowed ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-[#122D22] border-[#2A5C47] text-slate-300'
            }`}
          >
            <PlatformStoreIcon platform="apple" size={22} />
            <div className="text-left">
              <span className="text-[9px] block opacity-80 uppercase leading-none">Apple App Store</span>
              <span className="font-bold">iOS (Coming Soon)</span>
            </div>
          </div>
        </div>

        {/* Try Web Interactive Demo Button */}
        <div className="pt-2">
          <button
            onClick={() => onSwitchViewMode('screen-showcase')}
            className={`inline-flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-xl border transition-all ${
              isLight
                ? 'bg-white border-slate-300 text-slate-800 hover:border-[#8C630D]'
                : 'bg-[#122D22] border-[#2A5C47] text-emerald-300 hover:border-[#FFDF78]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Try Interactive Smartphone Simulator in Browser →</span>
          </button>
        </div>

        {/* Small Print & iOS Notification Form */}
        <div className="pt-4 max-w-md mx-auto">
          {iosSubscribed ? (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-400 font-bold">
              ✓ JazakAllahu Khairan! We’ll email you as soon as the iOS app goes live on the App Store.
            </div>
          ) : (
            <form onSubmit={handleIosNotify} className="space-y-2 text-left">
              <div className="text-[11px] opacity-75 text-center">
                iOS coming soon. If you’d like to be notified when iOS launches, enter your email below:
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email for iOS notification"
                  value={iosEmail}
                  onChange={(e) => setIosEmail(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-xl text-xs border outline-none ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 focus:border-[#8C630D]'
                      : 'bg-[#102B20] border-[#2A5C47] text-slate-100 focus:border-[#C5A059]'
                  }`}
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isLight ? 'bg-[#8C630D] text-white' : 'bg-[#FFDF78] text-[#0A2218]'
                  }`}
                >
                  Notify Me
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 2. SCREENSHOTS & APP FEATURES VISUAL SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-widest text-[#8C630D] dark:text-[#FFDF78]">
            What’s Inside the App
          </span>
          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-extrabold tracking-wide">
            Designed for Reverence, Speed & Clarity
          </h2>

          {/* Tab Filter */}
          <div className="pt-2 flex justify-center space-x-2">
            <button
              onClick={() => setActivePreviewTab('prayer')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePreviewTab === 'prayer'
                  ? isLight
                    ? 'bg-[#8C630D] text-white'
                    : 'bg-[#FFDF78] text-[#0A2218]'
                  : isLight
                  ? 'bg-white border text-slate-700'
                  : 'bg-[#122D22] border border-[#2A5C47] text-slate-300'
              }`}
            >
              1. Prayer Schedule & Fasting
            </button>

            <button
              onClick={() => setActivePreviewTab('alerts')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePreviewTab === 'alerts'
                  ? isLight
                    ? 'bg-[#8C630D] text-white'
                    : 'bg-[#FFDF78] text-[#0A2218]'
                  : isLight
                  ? 'bg-white border text-slate-700'
                  : 'bg-[#122D22] border border-[#2A5C47] text-slate-300'
              }`}
            >
              2. Alerts Feed & Discreet Aid
            </button>

            <button
              onClick={() => setActivePreviewTab('directory')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activePreviewTab === 'directory'
                  ? isLight
                    ? 'bg-[#8C630D] text-white'
                    : 'bg-[#FFDF78] text-[#0A2218]'
                  : isLight
                  ? 'bg-white border text-slate-700'
                  : 'bg-[#122D22] border border-[#2A5C47] text-slate-300'
              }`}
            >
              3. Cross-Masjid Directory
            </button>
          </div>
        </div>

        {/* Mock Screen Showcase Frame */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Accurate Prayer Times */}
          <div
            className={`p-6 rounded-3xl border space-y-3 transition-all ${
              activePreviewTab === 'prayer'
                ? isLight
                  ? 'bg-[#FAF4E8] border-[#8C630D] ring-2 ring-[#8C630D]/30 shadow-lg'
                  : 'bg-[#143B2C] border-[#FFDF78] ring-2 ring-[#FFDF78]/40 shadow-xl'
                : isLight
                ? 'bg-white border-slate-200'
                : 'bg-[#102B20] border-[#2A5C47]'
            }`}
          >
            <CategoryIconBadge type="iqamah" size="md" isLight={isLight} />
            <h3 className="font-['Cinzel'] font-bold text-sm tracking-wide">
              Daily Prayer & Fasting Timings
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Displays all 6 prayer calculations (Fajr, Shuruq, Dhuhr, Asr, Maghrib, Isha), active iqamah times from your masjid, Suhoor cut-off countdowns, and Qibla bearing.
            </p>
          </div>

          {/* Card 2: Alerts Feed */}
          <div
            className={`p-6 rounded-3xl border space-y-3 transition-all ${
              activePreviewTab === 'alerts'
                ? isLight
                  ? 'bg-[#FAF4E8] border-[#8C630D] ring-2 ring-[#8C630D]/30 shadow-lg'
                  : 'bg-[#143B2C] border-[#FFDF78] ring-2 ring-[#FFDF78]/40 shadow-xl'
                : isLight
                ? 'bg-white border-slate-200'
                : 'bg-[#102B20] border-[#2A5C47]'
            }`}
          >
            <CategoryIconBadge type="janazah" size="md" isLight={isLight} />
            <h3 className="font-['Cinzel'] font-bold text-sm tracking-wide">
              Dignified Janazah & Discreet Aid
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Receive instant alerts for funeral prayers with cemetery map links and Fard Kifayah instructions. Protect family dignity with Admin Discreet Mode.
            </p>
          </div>

          {/* Card 3: Masjids Directory */}
          <div
            className={`p-6 rounded-3xl border space-y-3 transition-all ${
              activePreviewTab === 'directory'
                ? isLight
                  ? 'bg-[#FAF4E8] border-[#8C630D] ring-2 ring-[#8C630D]/30 shadow-lg'
                  : 'bg-[#143B2C] border-[#FFDF78] ring-2 ring-[#FFDF78]/40 shadow-xl'
                : isLight
                ? 'bg-white border-slate-200'
                : 'bg-[#102B20] border-[#2A5C47]'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                isLight ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-purple-950/60 border-purple-500/40 text-purple-300'
              }`}
            >
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-['Cinzel'] font-bold text-sm tracking-wide">
              Cross-Masjid Directory & Home Roots
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Search across the US and Canada or let GPS detect nearby masjids. Pin your childhood home masjid to never miss important notices when away.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TRUST & SADAQAH COMMITMENT */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <div
          className={`p-6 sm:p-8 rounded-3xl border text-center space-y-3 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#102B20] border-[#2A5C47]'
          }`}
        >
          <div className="flex items-center justify-center space-x-2 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Tracking · Zero Advertising · Sadaqah Jariyah</span>
          </div>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            MasjidAlert was built purely as a community service for the sake of Allah. It collects no email addresses or phone numbers from app users and contains no commercial tracking scripts.
          </p>
        </div>
      </section>
    </div>
  );
};
