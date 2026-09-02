import React, { useState } from 'react';
import { WebsitePage, AppViewMode } from '../../types';
import { AddMasjidForm } from './AddMasjidForm';
import { OrnateCorner, RubElHizbStar } from '../ArabesquePatterns';
import { MasjidAlertBrandIcon } from '../MasjidAlertBrandIcon';
import { CategoryIconBadge, PlatformStoreIcon } from '../CategoryIconBadge';
import {
  Bell,
  Heart,
  ShieldCheck,
  Tv,
  Smartphone,
  MapPin,
  Clock,
  Compass,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Users,
  EyeOff,
  Layers,
  ArrowRight,
  Download,
  Calendar,
  Mic,
  BookOpen,
  DollarSign,
  Coffee,
  HelpCircle,
  Building2,
  CheckCircle2,
  Sliders,
  Send,
  Eye,
  Radio,
  Share2,
  HeartHandshake,
  HandHeart,
  Droplets,
} from 'lucide-react';

interface HomePageProps {
  isLight: boolean;
  onNavigatePage: (page: WebsitePage) => void;
  onSwitchViewMode: (mode: AppViewMode) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  isLight,
  onNavigatePage,
  onSwitchViewMode,
}) => {
  // Hero Interactive Simulation Tab
  const [heroActiveTab, setHeroActiveTab] = useState<'janazah' | 'discreet' | 'blood' | 'iqamah' | 'event'>('janazah');
  const [heroDuaCount, setHeroDuaCount] = useState<number>(148);
  const [hasOfferedHeroDua, setHasOfferedHeroDua] = useState<boolean>(false);
  const [discreetShieldActive, setDiscreetShieldActive] = useState<boolean>(true);

  // How It Works Tabs
  const [activeHowItWorksTab, setActiveHowItWorksTab] = useState<'masjids' | 'community'>('masjids');

  // Kiosk TV Interactive Demo
  const [kioskDemoTheme, setKioskDemoTheme] = useState<'day' | 'night'>('night');

  // Community Reach Calculator
  const [congregationSize, setCongregationSize] = useState<number>(1500);

  // Sample Masjids for Directory preview
  const [directorySearch, setDirectorySearch] = useState('');
  const [followedMasjidIds, setFollowedMasjidIds] = useState<string[]>(['m1', 'm2']);

  const sampleDirectoryMasjids = [
    {
      id: 'm1',
      name: 'Memphis Islamic Center (MIC)',
      city: 'Memphis',
      state: 'TN',
      distance: '0.8 mi',
      fajr: '5:15 AM',
      dhuhr: '1:30 PM',
      asr: '5:15 PM',
      maghrib: '7:42 PM',
      isha: '9:00 PM',
      activeAlert: 'Janazah Notice (Dhuhr)',
      alertType: 'janazah',
    },
    {
      id: 'm2',
      name: 'Muslim Community Association (MCA)',
      city: 'Santa Clara',
      state: 'CA',
      distance: '2.4 mi',
      fajr: '5:28 AM',
      dhuhr: '1:15 PM',
      asr: '5:00 PM',
      maghrib: '7:55 PM',
      isha: '9:15 PM',
      activeAlert: 'Youth Quran Competition',
      alertType: 'event',
    },
    {
      id: 'm3',
      name: 'Islamic Center of Arlington',
      city: 'Arlington',
      state: 'TX',
      distance: '5.1 mi',
      fajr: '5:32 AM',
      dhuhr: '1:30 PM',
      asr: '5:20 PM',
      maghrib: '7:50 PM',
      isha: '9:05 PM',
      activeAlert: 'Discreet Family Aid',
      alertType: 'aid',
    },
    {
      id: 'm4',
      name: 'Dar Al-Hijrah Islamic Center',
      city: 'Falls Church',
      state: 'VA',
      distance: '8.3 mi',
      fajr: '5:10 AM',
      dhuhr: '1:15 PM',
      asr: '4:45 PM',
      maghrib: '7:38 PM',
      isha: '8:55 PM',
      activeAlert: 'Urgent O-Negative Blood Request',
      alertType: 'blood',
    },
  ];

  const filteredMasjids = sampleDirectoryMasjids.filter(
    (m) =>
      m.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      m.city.toLowerCase().includes(directorySearch.toLowerCase()) ||
      m.state.toLowerCase().includes(directorySearch.toLowerCase())
  );

  const toggleFollowMasjid = (id: string) => {
    setFollowedMasjidIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 10 Alert Types Grid (Janazah #1, no red star/circle)
  const alertTypes = [
    {
      typeKey: 'janazah',
      type: 'Janazah Notices',
      badge: 'Fard Kifayah Priority',
      desc: 'Instant funeral alerts with deceased name, salah time, cemetery directions, and digital du’ā counter.',
      cardTheme: isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#122D22] border-[#2A5C47]',
    },
    {
      typeKey: 'community_aid',
      type: 'Community Aid',
      badge: 'Discreet Mode Shield',
      desc: 'Direct verified family emergency assistance that protects recipient identity and dignity.',
      cardTheme: isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#122D22] border-[#2A5C47]',
    },
    {
      typeKey: 'urgent_aid',
      type: 'Urgent Aid & Blood',
      badge: 'Immediate Broadcast',
      desc: 'Rapid broadcasts for urgent rare blood needs, local medical emergencies, and missing persons.',
      cardTheme: isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#122D22] border-[#2A5C47]',
    },
    {
      typeKey: 'iqamah_change',
      type: 'Iqamah & Jumu’ah Updates',
      badge: 'Auto-Syncs with Kiosks',
      desc: 'Seasonal prayer timing shifts and multi-shift Jumu’ah arrangements broadcast in real time.',
      cardTheme: isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#122D22] border-[#2A5C47]',
    },
    {
      typeKey: 'event',
      type: 'Community Events',
      badge: 'Family Programs',
      desc: 'Community iftars, Eid picnics, sisters’ gatherings, and open houses with calendar reminders.',
      cardTheme: isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#122D22] border-[#2A5C47]',
    },
    {
      typeKey: 'lecture',
      type: 'Scholarly Lectures',
      badge: 'Special Guests',
      desc: 'Visiting Shaykh halaqas, weekend intensive seminars, and topical khutbah reminders.',
      cardTheme: isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#122D22] border-[#2A5C47]',
    },
    {
      typeKey: 'learning',
      type: 'Quran & Ilm Classes',
      badge: 'Youth & Adults',
      desc: 'Tajweed programs, weekend madrasah registrations, and adult Arabic courses.',
      cardTheme: isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#122D22] border-[#2A5C47]',
    },
    {
      typeKey: 'charity',
      type: 'Charity & Campaigns',
      badge: 'Live Progress Bar',
      desc: 'Masjid expansion projects, winter coats, and refugee support with verified direct links.',
      cardTheme: isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#122D22] border-[#2A5C47]',
    },
    {
      typeKey: 'volunteer',
      type: 'Volunteer Calls',
      badge: 'Community Service',
      desc: 'Event setup crews, parking coordinators, Ramadan kitchen volunteers, and security teams.',
      cardTheme: isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#122D22] border-[#2A5C47]',
    },
    {
      typeKey: 'general_notice',
      type: 'General Notices',
      badge: 'Administrative',
      desc: 'Parking alerts, weather closures, board elections, and general mosque facilities news.',
      cardTheme: isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#122D22] border-[#2A5C47]',
    },
  ];

  const comparisonRows = [
    { feature: 'Subscription / Monthly fee', masjidAlert: '$0 Free Forever (Sadaqah Jariyah)', others: '$25 – $250 / month' },
    { feature: 'Instant push notifications', masjidAlert: 'Free, 100% reliable, unlimited', others: 'Expensive SMS / paid tiers' },
    { feature: 'Solemn Janazah priority banner', masjidAlert: 'Built-in first priority with du’ā tally', others: 'Treated as generic text' },
    { feature: 'Discreet Community Aid shield', masjidAlert: 'Yes (Protects family privacy & dignity)', others: 'No privacy protection' },
    { feature: 'Cross-masjid network following', masjidAlert: 'Follow any masjid across US & Canada', others: 'Single-masjid silo locking' },
    { feature: 'Synchronized Lobby TV Kiosk', masjidAlert: 'Included (60s cloud auto-sync)', others: 'Separate hardware ($500+)' },
    { feature: 'Account / registration requirement', masjidAlert: 'Zero accounts required for users', others: 'Mandatory email / data capture' },
    { feature: 'Built by', masjidAlert: 'Muslim developer (Memphis, TN)', others: 'Commercial enterprise' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full space-y-16 sm:space-y-24">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH INTERACTIVE LIVE ALERT STUDIO */}
      {/* ========================================================================= */}
      <section className="relative pt-4 sm:pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Pitch */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Top Ummah Ribbon */}
              <div
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold shadow-sm transition-all"
                style={{
                  backgroundColor: isLight ? '#FAF4E8' : '#102E23',
                  borderColor: isLight ? '#8C630D' : '#C5A059',
                  color: isLight ? '#644605' : '#FFDF78',
                }}
              >
                <RubElHizbStar size={12} />
                <span>The Free Muslim Community Alert Network · Built for Masjids</span>
              </div>

              {/* Tagline */}
              <div className="space-y-3">
                <h1 className="font-['Cinzel'] text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
                  Your community. <br />
                  <span className={isLight ? 'text-[#8C630D]' : 'text-[#FFDF78]'}>
                    Always connected.
                  </span>
                </h1>

                <p className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  Free instant alerts for masjids — dignified janazah notices, confidential family aid, prayer times, and community programs. Delivered straight to your congregation’s phones and lobby screens in seconds.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigatePage('download')}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-xl ${
                    isLight
                      ? 'bg-[#125A3D] hover:bg-[#0E462F] text-white shadow-emerald-950/20'
                      : 'bg-[#FFDF78] hover:bg-[#FFEAA0] text-[#0B2118] shadow-[0_0_25px_rgba(255,223,120,0.3)]'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Get the App (100% Free)</span>
                </button>

                <button
                  onClick={() => scrollToSection('add-masjid-section')}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center space-x-2 ${
                    isLight
                      ? 'bg-white border-[#8C630D]/40 text-[#644605] hover:bg-[#FAF5EB]'
                      : 'bg-[#122D22] border-[#2A5C47] text-[#FFDF78] hover:bg-[#173C2E]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Add Your Masjid</span>
                </button>
              </div>

              {/* Value Guarantees */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs opacity-80">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No login / account required</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified masjid administrators</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Lobby TV kiosk included</span>
                </span>
              </div>
            </div>

            {/* Right Hero Visual: Interactive Live Alert Device Simulator */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Interactive Alert Simulator Tabs */}
              <div className="flex items-center space-x-1 mb-3 bg-[#112A20] p-1 rounded-2xl border border-[#2A5C47]/60 text-[11px] font-bold text-slate-300">
                <button
                  onClick={() => setHeroActiveTab('janazah')}
                  className={`px-2.5 py-1 rounded-xl transition-all ${
                    heroActiveTab === 'janazah' ? 'bg-[#FFDF78] text-[#0A2218] shadow-sm' : 'hover:text-white'
                  }`}
                >
                  Janazah
                </button>
                <button
                  onClick={() => setHeroActiveTab('discreet')}
                  className={`px-2.5 py-1 rounded-xl transition-all ${
                    heroActiveTab === 'discreet' ? 'bg-[#FFDF78] text-[#0A2218] shadow-sm' : 'hover:text-white'
                  }`}
                >
                  Discreet Aid
                </button>
                <button
                  onClick={() => setHeroActiveTab('blood')}
                  className={`px-2.5 py-1 rounded-xl transition-all ${
                    heroActiveTab === 'blood' ? 'bg-[#FFDF78] text-[#0A2218] shadow-sm' : 'hover:text-white'
                  }`}
                >
                  Urgent Blood
                </button>
                <button
                  onClick={() => setHeroActiveTab('iqamah')}
                  className={`px-2.5 py-1 rounded-xl transition-all ${
                    heroActiveTab === 'iqamah' ? 'bg-[#FFDF78] text-[#0A2218] shadow-sm' : 'hover:text-white'
                  }`}
                >
                  Iqamah
                </button>
              </div>

              {/* Smartphone Frame */}
              <div
                className={`relative w-full max-w-[340px] rounded-[42px] border-[8px] p-4 shadow-2xl space-y-3 transition-all ${
                  isLight
                    ? 'bg-[#FAF6EE] border-[#8C630D]/60 text-slate-900 shadow-[0_20px_50px_rgba(140,99,13,0.18)]'
                    : 'bg-[#0E241C] border-[#2A5C47] text-slate-100 shadow-[0_20px_60px_rgba(4,14,10,0.85)]'
                }`}
              >
                {/* Speaker Island */}
                <div className="w-24 h-4 bg-black/60 rounded-full mx-auto flex items-center justify-between px-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                </div>

                {/* Top Masjid Status Bar */}
                <div className="flex items-center justify-between text-xs px-1">
                  <div className="flex items-center space-x-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#FFDF78]" />
                    <span className="font-bold text-[11px]">Islamic Center of Arlington</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold flex items-center space-x-1">
                    <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                    <span>Live Push</span>
                  </span>
                </div>

                {/* DYNAMIC TAB CONTENT 1: Janazah (Dignified, No red star/circle) */}
                {heroActiveTab === 'janazah' && (
                  <div
                    className={`p-3.5 rounded-2xl border text-xs space-y-2 relative overflow-hidden transition-all ${
                      isLight
                        ? 'bg-gradient-to-b from-[#FAF5EC] to-[#F1E8D7] border-[#8C630D]/50 text-slate-900'
                        : 'bg-gradient-to-b from-[#143327] to-[#0E261D] border-[#C5A059]/60 text-slate-100 shadow-md'
                    }`}
                  >
                    <OrnateCorner position="top-left" size={16} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
                    <OrnateCorner position="top-right" size={16} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />

                    <div className="flex items-center justify-between text-[10px] border-b pb-1.5 border-current border-opacity-20">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold px-1.5 py-0.5 rounded bg-[#FFDF78]/20 text-[#FFDF78] border border-[#FFDF78]/40">
                          ج
                        </span>
                        <span className="font-['Cinzel'] font-bold tracking-wider text-[#FFDF78]">
                          JANAZAH NOTICE
                        </span>
                      </div>
                      <span className="opacity-75 font-semibold">Today · Dhuhr</span>
                    </div>

                    <div>
                      <div className="font-bold text-xs sm:text-sm text-white">
                        Br. Muhammad Tariq Al-Hashimi
                      </div>
                      <div className="text-[11px] opacity-80 mt-0.5">
                        Salah: 1:30 PM · Burial at Dar Al-Salam Cemetery
                      </div>
                    </div>

                    <div className="pt-1.5 flex items-center justify-between border-t border-current border-opacity-15">
                      <button
                        onClick={() => {
                          if (!hasOfferedHeroDua) {
                            setHeroDuaCount((c) => c + 1);
                            setHasOfferedHeroDua(true);
                          } else {
                            setHeroDuaCount((c) => c - 1);
                            setHasOfferedHeroDua(false);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center space-x-1 transition-all ${
                          hasOfferedHeroDua
                            ? 'bg-emerald-500 text-black'
                            : 'bg-[#1A4232] text-[#FFDF78] border border-[#C5A059]/40 hover:bg-[#20523E]'
                        }`}
                      >
                        <Heart className="w-3 h-3 fill-current" />
                        <span>{heroDuaCount} Du’ās Offered</span>
                      </button>

                      <span className="text-[10px] text-[#FFDF78] font-semibold underline cursor-pointer">
                        Directions →
                      </span>
                    </div>
                  </div>
                )}

                {/* DYNAMIC TAB CONTENT 2: Discreet Community Aid */}
                {heroActiveTab === 'discreet' && (
                  <div
                    className={`p-3.5 rounded-2xl border text-xs space-y-2 relative overflow-hidden transition-all ${
                      isLight
                        ? 'bg-amber-500/10 border-amber-500/30 text-slate-900'
                        : 'bg-gradient-to-b from-[#18362B] to-[#102920] border-amber-400/50 text-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-amber-400 flex items-center space-x-1">
                        <EyeOff className="w-3 h-3" />
                        <span>DISCREET COMMUNITY AID</span>
                      </span>
                      <button
                        onClick={() => setDiscreetShieldActive(!discreetShieldActive)}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold hover:bg-amber-500/30"
                      >
                        {discreetShieldActive ? 'Show Shield: ON' : 'Show Shield: OFF'}
                      </button>
                    </div>

                    <div>
                      <div className="font-bold text-xs text-amber-200">
                        {discreetShieldActive ? 'Confidential Family Relief · Medical Support' : 'A Local Arlington Family with 3 Children'}
                      </div>
                      <div className="text-[10px] opacity-80 mt-0.5">
                        {discreetShieldActive
                          ? 'Protected by Imam’s Discreet Mode. Verified by Mosque Board.'
                          : 'Facing sudden emergency medical bills. Goal: $3,500.'}
                      </div>
                    </div>

                    <div className="pt-1.5 flex items-center justify-between border-t border-current border-opacity-15">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">$2,850 of $3,500</span>
                      <button className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-amber-500 text-black">
                        Contribute ($0 Fee)
                      </button>
                    </div>
                  </div>
                )}

                {/* DYNAMIC TAB CONTENT 3: Urgent Blood Drive */}
                {heroActiveTab === 'blood' && (
                  <div
                    className={`p-3.5 rounded-2xl border text-xs space-y-2 relative overflow-hidden transition-all ${
                      isLight
                        ? 'bg-rose-500/10 border-rose-500/30 text-slate-900'
                        : 'bg-gradient-to-b from-[#2A1E24] to-[#1A1317] border-rose-400/50 text-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-rose-400 flex items-center space-x-1">
                        <span>🩸 URGENT MEDICAL BROADCAST</span>
                      </span>
                      <span className="opacity-75 font-semibold">Hospital Emergency</span>
                    </div>

                    <div>
                      <div className="font-bold text-xs text-white">
                        Urgent Need: O-Negative Blood Donors
                      </div>
                      <div className="text-[10px] opacity-80 mt-0.5">
                        Methodist Hospital · Patient: Br. Bilal Qureshi. Please call blood bank immediately.
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span className="text-rose-300 font-bold">2 Donors Dispatched</span>
                      <button className="px-2 py-0.5 rounded bg-rose-500 text-white font-bold">
                        Call Blood Center
                      </button>
                    </div>
                  </div>
                )}

                {/* DYNAMIC TAB CONTENT 4: Iqamah Prayer Shift */}
                {heroActiveTab === 'iqamah' && (
                  <div
                    className={`p-3.5 rounded-2xl border text-xs space-y-2 relative overflow-hidden transition-all ${
                      isLight
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-900'
                        : 'bg-gradient-to-b from-[#143A2C] to-[#0E261D] border-emerald-400/50 text-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-emerald-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>IQAMAH TIME CHANGE</span>
                      </span>
                      <span className="opacity-75 font-semibold">Starting Monday</span>
                    </div>

                    <div>
                      <div className="font-bold text-xs text-white">
                        Maghrib & Isha Iqamah Adjustment
                      </div>
                      <div className="text-[10px] opacity-80 mt-0.5">
                        Maghrib: 10 mins after Athan · Isha moves to 9:15 PM sharp.
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span className="text-emerald-300 font-bold">Synced with TV Kiosks</span>
                      <span className="text-[#FFDF78] font-semibold">Save to Calendar →</span>
                    </div>
                  </div>
                )}

                {/* Live Prayer Times Card */}
                <div
                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                    isLight ? 'bg-amber-500/10 border-amber-500/30' : 'bg-[#122D22] border-[#2A5C47]'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-['Cinzel'] uppercase opacity-75 block">
                      Next Prayer · Asr
                    </span>
                    <span className="text-base font-extrabold font-mono text-[#FFDF78]">5:15 PM</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] opacity-60 block">Iqamah in</span>
                    <span className="text-xs font-bold text-emerald-400">
                      18 minutes
                    </span>
                  </div>
                </div>

                {/* Bottom navigation simulated tabs */}
                <div className="pt-2 border-t border-[#2A5C47]/40 flex items-center justify-around text-[10px] opacity-80">
                  <span className="font-bold text-[#FFDF78]">Home</span>
                  <span>Alerts (3)</span>
                  <span>Qibla</span>
                  <span>Masjids</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CORE PILLARS & WHAT IS MASJIDALERT */}
      {/* ========================================================================= */}
      <section id="features-section" className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Built as Perpetual Sadaqah Jariyah</span>
            </div>
            <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-extrabold tracking-tight">
              Why masjids and communities love MasjidAlert
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Traditional social media and messaging apps bury critical mosque notifications under algorithm chatter and unread group spam. MasjidAlert provides a dedicated, dignified channel.
            </p>
          </div>

          {/* 6 Core Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Janazah */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden space-y-3 transition-all ${
              isLight ? 'bg-white border-[#8C630D]/30 shadow-md' : 'bg-[#122D22] border-[#2A5C47] shadow-xl'
            }`}>
              <OrnateCorner position="top-right" size={20} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
              <CategoryIconBadge type="janazah" size="md" isLight={isLight} />
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-white">
                Solemn Janazah Notifications
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Fulfill the collective obligation (Fard Kifayah). Instant alerts include prayer times, cemetery location maps, family notes, and an interactive du’ā counter.
              </p>
            </div>

            {/* Card 2: Discreet Community Aid */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden space-y-3 transition-all ${
              isLight ? 'bg-white border-[#8C630D]/30 shadow-md' : 'bg-[#122D22] border-[#2A5C47] shadow-xl'
            }`}>
              <OrnateCorner position="top-right" size={20} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
              <CategoryIconBadge type="community_aid" size="md" isLight={isLight} />
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-white">
                Discreet Community Aid
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Support families in hardship without compromising their dignity. Masjid leaders can post emergency aid requests while keeping recipient identities confidential.
              </p>
            </div>

            {/* Card 3: Multi-Masjid Following */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden space-y-3 transition-all ${
              isLight ? 'bg-white border-[#8C630D]/30 shadow-md' : 'bg-[#122D22] border-[#2A5C47] shadow-xl'
            }`}>
              <OrnateCorner position="top-right" size={20} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  isLight ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-blue-950/60 border-blue-500/40 text-blue-300'
                }`}
              >
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-white">
                Cross-Masjid Directory
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Users are not locked into one isolated mosque. Follow your home community, your workplace mosque, and your university center all in one feed.
              </p>
            </div>

            {/* Card 4: Lobby TV Auto-Sync */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden space-y-3 transition-all ${
              isLight ? 'bg-white border-[#8C630D]/30 shadow-md' : 'bg-[#122D22] border-[#2A5C47] shadow-xl'
            }`}>
              <OrnateCorner position="top-right" size={20} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  isLight ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                }`}
              >
                <Tv className="w-5 h-5" />
              </div>
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-white">
                60-Second TV Kiosk Sync
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Post an alert once from your phone or admin portal, and every TV in your mosque foyer, prayer hall, and sisters’ gallery updates automatically within 60 seconds.
              </p>
            </div>

            {/* Card 5: 10 Alert Types */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden space-y-3 transition-all ${
              isLight ? 'bg-white border-[#8C630D]/30 shadow-md' : 'bg-[#122D22] border-[#2A5C47] shadow-xl'
            }`}>
              <OrnateCorner position="top-right" size={20} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
              <CategoryIconBadge type="general_notice" size="md" isLight={isLight} />
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-white">
                10 Specialized Categories
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                From blood donation urgencies to Jumu’ah shifts, youth halaqas, and charity drives — each alert type has structured fields, tags, and actionable buttons.
              </p>
            </div>

            {/* Card 6: 100% Free Forever */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden space-y-3 transition-all ${
              isLight ? 'bg-white border-[#8C630D]/30 shadow-md' : 'bg-[#122D22] border-[#2A5C47] shadow-xl'
            }`}>
              <OrnateCorner position="top-right" size={20} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  isLight ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-[#143B2C] border-[#FFDF78]/40 text-[#FFDF78]'
                }`}
              >
                <RubElHizbStar size={16} />
              </div>
              <h3 className="font-['Cinzel'] text-base sm:text-lg font-bold text-white">
                100% Free Forever ($0)
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Zero monthly fees, zero tiers, zero advertising, and zero data tracking. Built by a Muslim developer as enduring charity for the sake of Allah.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE MASJID REACH & IMPACT CALCULATOR */}
      {/* ========================================================================= */}
      <section className="relative py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div
            className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden shadow-2xl transition-all ${
              isLight
                ? 'bg-gradient-to-b from-[#FAF5EC] to-[#F1E8D7] border-[#8C630D]/40 text-slate-900'
                : 'bg-gradient-to-b from-[#133226] via-[#0E271D] to-[#0A1E16] border-[#2A5C47] text-slate-100'
            }`}
          >
            <OrnateCorner position="top-left" size={24} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
            <OrnateCorner position="top-right" size={24} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />

            <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
              <span className="text-xs font-bold text-[#FFDF78] uppercase tracking-widest font-['Cinzel']">
                Live Community Impact Tool
              </span>
              <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold">
                Calculate your Masjid’s Direct Push Reach
              </h3>
              <p className="text-xs sm:text-sm opacity-80">
                See how many congregants you reach with MasjidAlert’s direct push notifications vs WhatsApp and social media algorithms.
              </p>
            </div>

            {/* Slider */}
            <div className="space-y-4 max-w-lg mx-auto">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>Estimated Congregation Size:</span>
                <span className="text-lg font-mono text-[#FFDF78]">{congregationSize.toLocaleString()} worshippers</span>
              </div>

              <input
                type="range"
                min="200"
                max="10000"
                step="100"
                value={congregationSize}
                onChange={(e) => setCongregationSize(Number(e.target.value))}
                className="w-full h-2 bg-[#1A4433] rounded-lg appearance-none cursor-pointer accent-[#FFDF78]"
              />

              <div className="flex justify-between text-[10px] opacity-60 font-mono">
                <span>200</span>
                <span>2,500</span>
                <span>5,000</span>
                <span>10,000+</span>
              </div>
            </div>

            {/* Comparative Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              {/* MasjidAlert */}
              <div className="p-4 rounded-2xl bg-[#FFDF78]/15 border border-[#FFDF78]/50 text-center space-y-1">
                <span className="text-[11px] font-bold text-[#FFDF78] uppercase block">MasjidAlert Direct Push</span>
                <span className="text-2xl font-mono font-extrabold text-white">
                  {Math.round(congregationSize * 0.94).toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 block font-semibold">94% Instant Reach (&lt; 3s)</span>
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-center space-y-1">
                <span className="text-[11px] font-bold opacity-75 uppercase block">WhatsApp Groups</span>
                <span className="text-2xl font-mono font-extrabold text-slate-300">
                  {Math.min(1024, Math.round(congregationSize * 0.35)).toLocaleString()}
                </span>
                <span className="text-[10px] text-amber-400 block">Capped at 1,024 / Muted</span>
              </div>

              {/* Facebook / Social */}
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 text-center space-y-1">
                <span className="text-[11px] font-bold opacity-75 uppercase block">Facebook / Instagram</span>
                <span className="text-2xl font-mono font-extrabold text-slate-300">
                  {Math.round(congregationSize * 0.08).toLocaleString()}
                </span>
                <span className="text-[10px] text-rose-400 block">8% Organic Feed Algorithm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE CROSS-MASJID DIRECTORY PREVIEW */}
      {/* ========================================================================= */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Connected Network</span>
              </div>
              <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-extrabold">
                Explore masjids across North America
              </h2>
              <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Users follow multiple masjids to stay tuned to local events, Janazah notices, and hometown prayer schedules.
              </p>
            </div>

            {/* Live Search Input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                placeholder="Search city, state, or mosque..."
                className={`w-full px-4 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-[#8C630D]'
                    : 'bg-[#122D22] border-[#2A5C47] text-white focus:border-[#FFDF78]'
                }`}
              />
            </div>
          </div>

          {/* Masjids Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMasjids.map((masjid) => {
              const isFollowed = followedMasjidIds.includes(masjid.id);
              return (
                <div
                  key={masjid.id}
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#102B20] border-[#2A5C47] shadow-md'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">{masjid.name}</h4>
                        <span className="text-[11px] opacity-75">{masjid.city}, {masjid.state} · {masjid.distance}</span>
                      </div>
                      <span className="text-xs">🕌</span>
                    </div>

                    {/* Active Alert Badge */}
                    <div className="p-2 rounded-xl bg-[#173A2B] border border-[#2A5C47]/50 text-[11px]">
                      <span className="text-[9px] uppercase font-bold text-[#FFDF78] block">Live Alert</span>
                      <span className="font-semibold text-white truncate block">{masjid.activeAlert}</span>
                    </div>

                    {/* Prayer Times Strip */}
                    <div className="grid grid-cols-5 gap-1 text-[10px] text-center font-mono opacity-80 pt-1">
                      <div>
                        <span className="block opacity-60 text-[8px]">FAJR</span>
                        <span>{masjid.fajr}</span>
                      </div>
                      <div>
                        <span className="block opacity-60 text-[8px]">DHUHR</span>
                        <span>{masjid.dhuhr}</span>
                      </div>
                      <div>
                        <span className="block opacity-60 text-[8px]">ASR</span>
                        <span>{masjid.asr}</span>
                      </div>
                      <div>
                        <span className="block opacity-60 text-[8px]">MAGH</span>
                        <span>{masjid.maghrib}</span>
                      </div>
                      <div>
                        <span className="block opacity-60 text-[8px]">ISHA</span>
                        <span>{masjid.isha}</span>
                      </div>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <button
                    onClick={() => toggleFollowMasjid(masjid.id)}
                    className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      isFollowed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-[#FFDF78] text-[#0A2218] hover:bg-[#FFEAA0]'
                    }`}
                  >
                    {isFollowed ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <span>+ Follow Masjid</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. 10 SPECIALIZED ALERT TYPES VISUAL GRID (Janazah Solemn #1) */}
      {/* ========================================================================= */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-extrabold tracking-tight">
              10 specialized alert types
            </h2>
            <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Every dispatch is crafted for clarity with dedicated badge types, respectful styling, and instant action buttons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {alertTypes.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border space-y-2 relative overflow-hidden transition-all hover:scale-[1.02] ${item.cardTheme}`}
              >
                <div className="flex items-center justify-between">
                  <CategoryIconBadge type={item.typeKey} size="md" isLight={isLight} />
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FFDF78]/20 text-[#FFDF78] border border-[#FFDF78]/30">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-['Cinzel'] font-bold text-xs sm:text-sm text-white">{item.type}</h4>
                <p className="text-[11px] opacity-75 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. LOBBY TV KIOSK DEMO & SIMULATOR */}
      {/* ========================================================================= */}
      <section id="kiosk-section" className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden space-y-6 shadow-2xl transition-all ${
              isLight
                ? 'bg-gradient-to-b from-[#FAF5EC] to-[#F1E8D7] border-[#8C630D]/40 text-slate-900'
                : 'bg-gradient-to-b from-[#122D22] via-[#0E251C] to-[#0A1B14] border-[#2A5C47] text-slate-100'
            }`}
          >
            <OrnateCorner position="top-left" size={24} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />
            <OrnateCorner position="top-right" size={24} className={isLight ? 'text-[#8C630D]' : 'text-[#ECC968]'} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                  <Tv className="w-3.5 h-3.5" />
                  <span>Integrated Lobby Hardware Display</span>
                </div>
                <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold">
                  Lobby TV Kiosk included at $0 cost
                </h3>
                <p className="text-xs sm:text-sm opacity-80 max-w-xl">
                  Turn any Smart TV or $25 FireStick into an ornate Islamic prayer board that updates in under 60 seconds whenever prayer times or janazah notices change.
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => onSwitchViewMode('kiosk')}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#FFDF78] text-[#0A2218] hover:bg-[#FFEAA0] shadow-lg flex items-center space-x-2"
                >
                  <Tv className="w-4 h-4" />
                  <span>Launch Full TV Kiosk Mode</span>
                </button>
              </div>
            </div>

            {/* Kiosk Interactive TV Screen Preview */}
            <div className="relative rounded-2xl border-4 border-neutral-800 bg-[#0A1F18] p-4 shadow-2xl overflow-hidden text-white font-['Cinzel']">
              <div className="flex items-center justify-between border-b border-[#2A5C47] pb-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#FFDF78]">MEMPHIS ISLAMIC CENTER</span>
                  <span className="opacity-50">·</span>
                  <span className="opacity-80 text-[10px]">MEMPHIS, TN</span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] font-mono text-[#FFDF78]">
                  <span>5:15:32 PM</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px]">
                    ● TV LIVE SYNC
                  </span>
                </div>
              </div>

              {/* Dignified Janazah Strip in Kiosk (No red star/circle) */}
              <div className="my-2.5 p-2 rounded-lg bg-[#143929] border border-[#C5A059]/60 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-bold px-1.5 py-0.5 rounded bg-[#FFDF78] text-[#0A2218] text-[10px]">
                    JANAZAH
                  </span>
                  <span className="font-bold text-white text-xs">Br. Muhammad Tariq Al-Hashimi (رَحِمَهُ ٱللَّٰهُ)</span>
                  <span className="opacity-75 text-[10px] hidden sm:inline">· Today at Dhuhr (1:30 PM)</span>
                </div>
                <span className="text-[10px] text-[#FFDF78] font-bold font-mono">TODAY 1:30 PM</span>
              </div>

              {/* 3 Columns Preview */}
              <div className="grid grid-cols-10 gap-2 text-xs py-2">
                <div className="col-span-3 p-2 rounded-lg bg-[#102B20] border border-[#2A5C47] space-y-1 text-[11px]">
                  <div className="flex justify-between font-bold text-[#FFDF78] border-b border-[#2A5C47] pb-1 text-[9px]">
                    <span>PRAYER</span>
                    <span>ATHAN</span>
                    <span>IQAMAH</span>
                  </div>
                  <div className="flex justify-between"><span>Fajr</span><span>5:15</span><span>5:45</span></div>
                  <div className="flex justify-between"><span>Dhuhr</span><span>1:15</span><span>1:30</span></div>
                  <div className="flex justify-between text-emerald-300 font-bold"><span>Asr</span><span>5:15</span><span>5:35</span></div>
                  <div className="flex justify-between"><span>Maghrib</span><span>7:42</span><span>7:47</span></div>
                  <div className="flex justify-between"><span>Isha</span><span>9:00</span><span>9:15</span></div>
                </div>

                <div className="col-span-4 p-2 rounded-lg bg-[#102B20] border border-[#2A5C47] flex flex-col items-center justify-center text-center space-y-1">
                  <span className="text-[10px] opacity-75">NEXT PRAYER</span>
                  <span className="font-bold text-lg text-[#FFDF78]">ASR IQAMAH</span>
                  <span className="text-xl font-mono font-extrabold text-white">00:18:24</span>
                  <span className="text-[9px] text-emerald-400">Silent Phones in Prayer Hall</span>
                </div>

                <div className="col-span-3 p-2 rounded-lg bg-[#102B20] border border-[#2A5C47] flex flex-col justify-center space-y-1 text-[10px]">
                  <span className="font-bold text-[#FFDF78]">COMMUNITY ANNOUNCEMENT</span>
                  <p className="opacity-80 text-[9px] leading-tight">
                    Youth Quran Competition Registration closes this Friday. Scan QR to register.
                  </p>
                  <span className="text-[8px] text-emerald-400">Scan QR Code on Foyer Stand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. WHY MASJIDS CHOOSE MASJIDALERT (TRANSPARENT COMPARISON) */}
      {/* ========================================================================= */}
      <section className="relative py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-extrabold tracking-tight">
              Sadaqah Jariyah vs Commercial SaaS
            </h2>
            <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Why masjids choose MasjidAlert over expensive subscription software.
            </p>
          </div>

          <div
            className={`rounded-3xl border overflow-hidden shadow-2xl ${
              isLight ? 'bg-white border-[#8C630D]/30' : 'bg-[#102B20] border-[#2A5C47]'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={`border-b ${isLight ? 'bg-[#FAF5EB] border-slate-200' : 'bg-[#16382B] border-[#2A5C47]'}`}>
                    <th className="p-4 font-['Cinzel'] font-bold text-xs">Feature</th>
                    <th className="p-4 font-['Cinzel'] font-bold text-xs text-[#FFDF78]">MasjidAlert</th>
                    <th className="p-4 font-['Cinzel'] font-bold text-xs opacity-60">Commercial Providers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A5C47]/30">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-transparent' : 'bg-white/5'}>
                      <td className="p-4 font-semibold">{row.feature}</td>
                      <td className="p-4 text-emerald-400 font-bold">{row.masjidAlert}</td>
                      <td className="p-4 opacity-60">{row.others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ONBOARDING SUBMISSION: ADD YOUR MASJID */}
      {/* ========================================================================= */}
      <section id="add-masjid-section" className="relative py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AddMasjidForm isLight={isLight} onComplete={() => scrollToSection('features-section')} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. DEVELOPER & SADAQAH STORY */}
      {/* ========================================================================= */}
      <section className="relative py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div
            className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 shadow-xl ${
              isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0E271D] border-[#2A5C47] text-slate-100'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFDF78]/15 border border-[#FFDF78]/40 flex items-center justify-center mx-auto text-[#FFDF78] shadow-[0_0_15px_rgba(255,223,120,0.2)]">
              <RubElHizbStar size={24} />
            </div>

            <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-bold">
              Built as Sadaqah for the Global Ummah
            </h3>

            <p className="text-xs sm:text-sm opacity-80 leading-relaxed max-w-xl mx-auto">
              MasjidAlert was developed by <strong>Yaqub Sharhan</strong> in Memphis, Tennessee. It was born out of seeing Janazah announcements missed on crowded WhatsApp groups and families in need hesitant to ask for help publicly. It will always remain 100% free and ad-free.
            </p>

            <div className="pt-2 flex items-center justify-center space-x-3 text-xs font-semibold">
              <a
                href="https://ko-fi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#FFDF78] text-[#0A2218] hover:bg-[#FFEAA0] flex items-center space-x-1.5 font-bold"
              >
                <Coffee className="w-4 h-4" />
                <span>Support Server Costs on Ko-fi</span>
              </a>

              <a
                href="mailto:yaqub.sharhan@gmail.com"
                className="px-4 py-2 rounded-xl border border-slate-600 hover:border-[#FFDF78] flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Developer</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
