import React, { useState } from 'react';
import {
  PrayerTime,
  JanazahAlertData,
  CommunityAlert,
  ThemeMode,
  MobileTab,
  MosqueProfile,
  AdminUser,
} from '../types';
import { MobileHomeScreen } from './MobileHomeScreen';
import { CommunityAlertsFeed } from './CommunityAlertsFeed';
import { JanazahDetailModal } from './JanazahDetailModal';
import { DignifiedJanazahCard } from './DignifiedJanazahCard';
import { OnboardingWelcomeFlow } from './OnboardingWelcomeFlow';
import { QiblaCompassScreen } from './QiblaCompassScreen';
import { MasjidsDirectoryTab } from './MasjidsDirectoryTab';
import { SettingsTab } from './SettingsTab';
import { AdminPortalLogin } from './AdminPortalLogin';
import { AdminPortalMain } from './AdminPortalMain';
import { MasjidAlertBrandIcon } from './MasjidAlertBrandIcon';
import {
  INITIAL_JANAZAH_DETAILS,
  COMMUNITY_ALERTS_LIST,
  INITIAL_MOSQUES,
  ADMIN_USERS,
} from '../data/mobileData';
import {
  Sun,
  Moon,
  Smartphone,
  Columns,
  Sparkles,
  Heart,
  Bell,
  Layers,
  ChevronRight,
  Tv,
  Compass,
  Lock,
  Search,
  Shield,
  Clock,
  Globe,
} from 'lucide-react';

interface ScreenShowcaseProps {
  prayerTimes: PrayerTime[];
  currentTime: Date;
  themeMode: ThemeMode;
  onSetThemeMode: (mode: ThemeMode) => void;
  onSwitchToKiosk: () => void;
  onSwitchToWebsite?: () => void;
}

export const ScreenShowcase: React.FC<ScreenShowcaseProps> = ({
  prayerTimes,
  currentTime,
  themeMode,
  onSetThemeMode,
  onSwitchToKiosk,
  onSwitchToWebsite,
}) => {
  const [selectedScreen, setSelectedScreen] = useState<MobileTab>('home');
  const [viewStyle, setViewStyle] = useState<'side-by-side' | 'interactive-device'>('side-by-side');
  const [activeJanazahDetail, setActiveJanazahDetail] = useState<JanazahAlertData | null>(null);
  const [interactiveIsLight, setInteractiveIsLight] = useState<boolean>(false);

  // App-wide state
  const [masjids, setMasjids] = useState<MosqueProfile[]>(INITIAL_MOSQUES);
  const [alerts, setAlerts] = useState<CommunityAlert[]>(COMMUNITY_ALERTS_LIST);
  const [activeMosque, setActiveMosque] = useState<MosqueProfile>(INITIAL_MOSQUES[0]);
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser>(ADMIN_USERS[0]);

  const screens = [
    { id: 'onboarding', label: '1. Onboarding / Welcome (3 Steps)', icon: '✨' },
    { id: 'home', label: '2. Home & Prayer Times', icon: '🕌' },
    { id: 'qibla', label: '3. Qibla Direction Compass', icon: '🕋' },
    { id: 'alerts', label: '4. Alerts Feed (10 Categories & Discreet Mode)', icon: '🚨' },
    { id: 'masjids', label: '5. Masjids Directory & Home Communities', icon: '📍' },
    { id: 'settings', label: '6. Settings & Notification Filters', icon: '⚙️' },
    { id: 'admin-login', label: '7. Admin Portal — Login', icon: '🔐' },
    { id: 'admin-portal', label: '8. Admin Portal — Imam Control Panel', icon: '⚡' },
  ];

  const handleToggleFollow = (masjidId: string) => {
    setMasjids((prev) =>
      prev.map((m) =>
        m.id === masjidId
          ? {
              ...m,
              isFollowed: !m.isFollowed,
              followerCount: m.isFollowed ? m.followerCount - 1 : m.followerCount + 1,
            }
          : m
      )
    );
  };

  const handleToggleHomeCommunity = (masjidId: string) => {
    setMasjids((prev) =>
      prev.map((m) =>
        m.id === masjidId ? { ...m, isHomeCommunity: !m.isHomeCommunity } : m
      )
    );
  };

  const handleAddNewAlert = (newAlert: CommunityAlert) => {
    setAlerts((prev) => [newAlert, ...prev]);
  };

  const handleDeleteAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const handleUpdateIqamah = (newIqamah: MosqueProfile['iqamahTimes']) => {
    setActiveMosque((prev) => ({
      ...prev,
      iqamahTimes: newIqamah,
    }));
    setMasjids((prev) =>
      prev.map((m) => (m.id === activeMosque.id ? { ...m, iqamahTimes: newIqamah } : m))
    );
  };

  // Helper renderer for a single screen
  const renderScreenContent = (isLight: boolean) => {
    switch (selectedScreen) {
      case 'onboarding':
        return (
          <OnboardingWelcomeFlow
            isLight={isLight}
            masjids={masjids}
            onComplete={(mosque) => {
              setActiveMosque(mosque);
              setSelectedScreen('home');
            }}
          />
        );

      case 'home':
        return (
          <MobileHomeScreen
            prayerTimes={prayerTimes}
            currentTime={currentTime}
            isLight={isLight}
            activeMosque={activeMosque}
            onNavigateToAlerts={() => setSelectedScreen('alerts')}
            onNavigateToJanazahDetail={(data) => setActiveJanazahDetail(data)}
            onNavigateToQibla={() => setSelectedScreen('qibla')}
            onNavigateToMasjids={() => setSelectedScreen('masjids')}
          />
        );

      case 'qibla':
        return (
          <QiblaCompassScreen
            isLight={isLight}
            onBackToHome={() => setSelectedScreen('home')}
            cityState={`${activeMosque.city}, ${activeMosque.state}`}
          />
        );

      case 'alerts':
        return (
          <CommunityAlertsFeed
            alerts={alerts}
            isLight={isLight}
            followedMasjidCount={masjids.filter((m) => m.isFollowed).length}
            onOpenJanazahDetail={(data) => setActiveJanazahDetail(data)}
            onOpenMasjidsTab={() => setSelectedScreen('masjids')}
          />
        );

      case 'masjids':
        return (
          <MasjidsDirectoryTab
            isLight={isLight}
            masjids={masjids}
            onToggleFollow={handleToggleFollow}
            onToggleHomeCommunity={handleToggleHomeCommunity}
            onSelectActiveMasjid={(m) => {
              setActiveMosque(m);
              setSelectedScreen('home');
            }}
          />
        );

      case 'settings':
        return (
          <SettingsTab
            isLight={isLight}
            onToggleTheme={() => {
              if (viewStyle === 'interactive-device') {
                setInteractiveIsLight(!interactiveIsLight);
              } else {
                onSetThemeMode(themeMode === 'light' ? 'dark' : 'light');
              }
            }}
            onOpenAdminLogin={() => setSelectedScreen('admin-login')}
            onOpenMasjidsTab={() => setSelectedScreen('masjids')}
          />
        );

      case 'admin-login':
        return (
          <AdminPortalLogin
            isLight={isLight}
            onLoginSuccess={(user) => {
              setCurrentAdminUser(user);
              setSelectedScreen('admin-portal');
            }}
            onBackToApp={() => setSelectedScreen('home')}
          />
        );

      case 'admin-portal':
        return (
          <AdminPortalMain
            isLight={isLight}
            currentUser={currentAdminUser}
            activeMasjid={activeMosque}
            alerts={alerts}
            onAddNewAlert={handleAddNewAlert}
            onDeleteAlert={handleDeleteAlert}
            onUpdateIqamah={handleUpdateIqamah}
            onLogout={() => setSelectedScreen('admin-login')}
            onOpenKioskView={onSwitchToKiosk}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0B1E17] text-slate-100 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0E271E]/95 backdrop-blur-md border-b border-[#C5A059]/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MasjidAlertBrandIcon size={34} showText={true} isLight={false} />
          <span className="hidden md:inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold">
            Sadaqah Network · US & Canada
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Switcher for Side-by-Side vs Device View */}
          <div className="hidden sm:flex items-center bg-[#091B14] p-1 rounded-xl border border-[#2A5C47]/50 text-xs font-semibold">
            <button
              onClick={() => setViewStyle('side-by-side')}
              className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all ${
                viewStyle === 'side-by-side'
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Light & Dark Comparison</span>
            </button>

            <button
              onClick={() => setViewStyle('interactive-device')}
              className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all ${
                viewStyle === 'interactive-device'
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Interactive Phone View</span>
            </button>
          </div>

          {/* Switch to Website masjidalert.com */}
          {onSwitchToWebsite && (
            <button
              onClick={onSwitchToWebsite}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#8C630D]/30 border border-[#FFDF78]/40 hover:bg-[#8C630D]/50 text-[#FFDF78] shadow-md flex items-center space-x-1.5 transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>
          )}

          {/* Switch to Mosque Kiosk Display */}
          <button
            onClick={onSwitchToKiosk}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0D5C3A] text-[#FFDF78] border border-[#FFDF78]/50 hover:bg-[#126F48] shadow-md flex items-center space-x-1.5"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Lobby TV Kiosk</span>
          </button>
        </div>
      </header>

      {/* Screen Navigation Ribbon */}
      <nav className="bg-[#030A0E] border-b border-slate-800 px-4 py-2.5 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScreen(s.id as MobileTab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 border transition-all ${
                selectedScreen === s.id
                  ? 'bg-gradient-to-r from-[#0D5C3A] to-[#083E26] text-[#FFDF78] border-[#FFDF78] shadow-[0_0_12px_rgba(255,223,120,0.25)]'
                  : 'bg-[#061217] text-slate-300 border-slate-800 hover:border-[#C5A059]/40'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Showcase Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {viewStyle === 'side-by-side' ? (
          /* DUAL LIGHT & DARK MODE SIDE-BY-SIDE PRESENTATION */
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-['Cinzel'] text-xl sm:text-2xl font-bold tracking-wide text-[#FDF8EE]">
                  {screens.find((s) => s.id === selectedScreen)?.label}
                </h1>
                <p className="text-xs text-slate-400">
                  Comparing Light Mode (Parchment & Warm Gold) vs Dark Mode (Night Sanctuary Emerald & Gold)
                </p>
              </div>
            </div>

            {/* Side-by-Side Dual Frames */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 1. LIGHT MODE COLUMN */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#FAF5EB] text-[#644605] border border-[#8C630D]/40">
                  <div className="flex items-center space-x-1.5 font-['Cinzel'] font-bold text-xs">
                    <Sun className="w-4 h-4 text-[#8C630D]" />
                    <span>☀️ LIGHT MODE (Daytime / High Ambient Light)</span>
                  </div>
                  <span className="text-[10px] font-semibold opacity-75">WCAG AAA Contrast</span>
                </div>

                <div className="w-full rounded-[32px] p-4 sm:p-5 bg-[#F9F5EC] text-slate-900 border-2 border-[#8C630D]/40 shadow-xl overflow-hidden min-h-[520px]">
                  {renderScreenContent(true)}
                </div>
              </div>

              {/* 2. DARK MODE COLUMN */}
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#112C20] text-[#FFDF78] border border-[#C5A059]/40">
                  <div className="flex items-center space-x-1.5 font-['Cinzel'] font-bold text-xs">
                    <Moon className="w-4 h-4 text-[#FFDF78]" />
                    <span>🌙 DARK MODE (Nighttime / Reverent Ambient)</span>
                  </div>
                  <span className="text-[10px] font-semibold opacity-75">Sanctuary Emerald Tone</span>
                </div>

                <div className="w-full rounded-[32px] p-4 sm:p-5 bg-[#0D241B] text-slate-100 border-2 border-[#C5A059]/40 shadow-2xl overflow-hidden min-h-[520px]">
                  {renderScreenContent(false)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* INTERACTIVE SMARTPHONE DEVICE SIMULATOR */
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Phone Controls */}
            <div className="flex items-center space-x-3 bg-[#0E271E] p-2 rounded-2xl border border-[#2A5C47]/50">
              <span className="text-xs font-semibold text-slate-300">Theme:</span>
              <button
                onClick={() => setInteractiveIsLight(false)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  !interactiveIsLight
                    ? 'bg-[#145338] text-[#FFDF78] border border-[#FFDF78]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark Mode</span>
              </button>
              <button
                onClick={() => setInteractiveIsLight(true)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  interactiveIsLight
                    ? 'bg-[#FAF5EB] text-[#644605] border border-[#8C630D] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light Mode</span>
              </button>
            </div>

            {/* Smartphone Mockup */}
            <div
              className={`w-full max-w-[420px] rounded-[48px] border-[10px] shadow-2xl overflow-hidden flex flex-col aspect-[9/18] transition-all duration-500 ${
                interactiveIsLight
                  ? 'bg-[#FAF6EE] text-slate-900 border-[#8C630D]/70 shadow-[0_25px_60px_rgba(140,99,13,0.25)]'
                  : 'bg-[#0E241B] text-slate-100 border-[#2A5C47] shadow-[0_25px_70px_rgba(4,14,10,0.9)]'
              }`}
            >
              {/* Phone Speaker & Dynamic Island */}
              <div className="w-32 h-5 bg-black/70 rounded-full mx-auto mt-2 mb-1 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              </div>

              {/* Status Bar */}
              <div className="px-5 py-1 flex items-center justify-between text-[11px] opacity-70">
                <span className="font-semibold">9:41 AM</span>
                <div className="flex items-center space-x-1.5">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* App Content inside Phone */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {renderScreenContent(interactiveIsLight)}
              </div>

              {/* Phone Bottom Tab Bar */}
              <div
                className={`border-t py-2 px-2 flex items-center justify-around text-[9px] font-semibold ${
                  interactiveIsLight
                    ? 'bg-[#FAF4E8] border-[#8C630D]/30 text-slate-700'
                    : 'bg-[#102B20] border-[#2A5C47] text-slate-300'
                }`}
              >
                <button
                  onClick={() => setSelectedScreen('home')}
                  className={`flex flex-col items-center space-y-0.5 ${
                    selectedScreen === 'home'
                      ? interactiveIsLight
                        ? 'text-[#8C630D] font-bold'
                        : 'text-[#FFDF78] font-bold'
                      : 'opacity-70'
                  }`}
                >
                  <span className="text-base">🕌</span>
                  <span>Prayers</span>
                </button>

                <button
                  onClick={() => setSelectedScreen('qibla')}
                  className={`flex flex-col items-center space-y-0.5 ${
                    selectedScreen === 'qibla'
                      ? interactiveIsLight
                        ? 'text-[#8C630D] font-bold'
                        : 'text-[#FFDF78] font-bold'
                      : 'opacity-70'
                  }`}
                >
                  <span className="text-base">🧭</span>
                  <span>Qibla</span>
                </button>

                <button
                  onClick={() => setSelectedScreen('alerts')}
                  className={`flex flex-col items-center space-y-0.5 ${
                    selectedScreen === 'alerts'
                      ? interactiveIsLight
                        ? 'text-[#8C630D] font-bold'
                        : 'text-[#FFDF78] font-bold'
                      : 'opacity-70'
                  }`}
                >
                  <span className="text-base">🚨</span>
                  <span>Alerts</span>
                </button>

                <button
                  onClick={() => setSelectedScreen('masjids')}
                  className={`flex flex-col items-center space-y-0.5 ${
                    selectedScreen === 'masjids'
                      ? interactiveIsLight
                        ? 'text-[#8C630D] font-bold'
                        : 'text-[#FFDF78] font-bold'
                      : 'opacity-70'
                  }`}
                >
                  <span className="text-base">📍</span>
                  <span>Masjids</span>
                </button>

                <button
                  onClick={() => setSelectedScreen('settings')}
                  className={`flex flex-col items-center space-y-0.5 ${
                    selectedScreen === 'settings'
                      ? interactiveIsLight
                        ? 'text-[#8C630D] font-bold'
                        : 'text-[#FFDF78] font-bold'
                      : 'opacity-70'
                  }`}
                >
                  <span className="text-base">⚙️</span>
                  <span>Settings</span>
                </button>
              </div>

              {/* Bottom Home Indicator */}
              <div className="w-32 h-1 bg-current opacity-40 rounded-full mx-auto my-1.5" />
            </div>
          </div>
        )}
      </main>

      {/* Janazah Detailed Full Modal */}
      <JanazahDetailModal
        data={activeJanazahDetail}
        isOpen={!!activeJanazahDetail}
        onClose={() => setActiveJanazahDetail(null)}
        isLight={viewStyle === 'side-by-side' ? false : interactiveIsLight}
      />
    </div>
  );
};
