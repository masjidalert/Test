import React, { useState } from 'react';
import { MasjidAlertBrandIcon } from '../MasjidAlertBrandIcon';
import { ThemeMode, WebsitePage, AppViewMode } from '../../types';
import {
  Sun,
  Moon,
  Smartphone,
  Tv,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Shield,
  Download,
  Building,
  Heart,
} from 'lucide-react';

interface WebsiteNavbarProps {
  currentPage: WebsitePage;
  onNavigatePage: (page: WebsitePage) => void;
  onSwitchViewMode: (mode: AppViewMode) => void;
  isLight: boolean;
  onToggleTheme: () => void;
  onScrollToAddMasjid?: () => void;
  onOpenScreensaver?: () => void;
}

export const WebsiteNavbar: React.FC<WebsiteNavbarProps> = ({
  currentPage,
  onNavigatePage,
  onSwitchViewMode,
  isLight,
  onToggleTheme,
  onScrollToAddMasjid,
  onOpenScreensaver,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: WebsitePage; label: string; icon?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'for-masjids', label: 'For Masjids' },
    { id: 'download', label: 'Download App' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* Top Banner Ribbon */}
      <div
        className={`px-4 py-1.5 text-center text-[11px] font-semibold flex items-center justify-center space-x-2 border-b ${
          isLight
            ? 'bg-[#FAF4E8] text-[#8C630D] border-[#8C630D]/20'
            : 'bg-[#0E281F] text-[#FFDF78] border-[#C5A059]/25'
        }`}
      >
        <span className="hidden sm:inline">🌙</span>
        <span>Free Community Alert Network for Masjids across US & Canada · Built as Sadaqah</span>
        <span className="hidden md:inline font-mono opacity-80 font-normal">| 100% Free Forever</span>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`px-4 sm:px-6 py-3 border-b backdrop-blur-md transition-all ${
          isLight
            ? 'bg-[#FAF6EE]/95 border-[#8C630D]/20 text-slate-900 shadow-sm'
            : 'bg-[#0B1E17]/95 border-[#C5A059]/25 text-slate-100 shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo & Tag */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                onNavigatePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2.5 text-left group focus:outline-none"
            >
              <MasjidAlertBrandIcon size={34} showText={true} isLight={isLight} />
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigatePage(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? isLight
                        ? 'bg-[#8C630D] text-white shadow-sm'
                        : 'bg-[#FFDF78] text-[#0A2218] font-bold shadow-md'
                      : isLight
                      ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                      : 'text-slate-300 hover:text-white hover:bg-[#15382B]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  onNavigatePage('home');
                  setTimeout(() => {
                    const el = document.getElementById('kiosk-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('kiosk-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isLight
                  ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                  : 'text-slate-300 hover:text-white hover:bg-[#15382B]'
              }`}
            >
              Lobby Kiosk
            </button>

            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  onNavigatePage('home');
                  setTimeout(() => {
                    const el = document.getElementById('features-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('features-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isLight
                  ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                  : 'text-slate-300 hover:text-white hover:bg-[#15382B]'
              }`}
            >
              Features
            </button>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center space-x-2">
            {/* Theme Mode Toggle (Daylight Parchment vs Night Sanctuary) */}
            <button
              onClick={onToggleTheme}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className={`p-2 rounded-xl border transition-all ${
                isLight
                  ? 'bg-white border-slate-200 text-[#8C630D] hover:bg-slate-100 shadow-sm'
                  : 'bg-[#122F24] border-[#2A5C47] text-[#FFDF78] hover:bg-[#173C2E]'
              }`}
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Switch to Interactive Mobile App Simulator */}
            <button
              onClick={() => onSwitchViewMode('screen-showcase')}
              title="Test interactive Mobile App simulator"
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-800 hover:border-[#8C630D]'
                  : 'bg-[#122F24] border-[#2A5C47] text-emerald-300 hover:border-[#FFDF78]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Try App Demo</span>
            </button>

            {/* Switch to Mosque Kiosk Display */}
            <button
              onClick={() => onSwitchViewMode('kiosk')}
              title="Preview physical Mosque TV Kiosk"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#145338] text-[#FFDF78] border border-[#FFDF78]/40 hover:bg-[#196444] shadow-sm transition-all"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>TV Kiosk Mode</span>
            </button>

            {/* Standby Screensaver Button */}
            {onOpenScreensaver && (
              <button
                onClick={onOpenScreensaver}
                title="Preview OLED Ambient Night Screensaver"
                className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isLight
                    ? 'bg-[#FAF4E8] border-[#8C630D]/30 text-[#8C630D] hover:bg-[#8C630D] hover:text-white'
                    : 'bg-[#0E261D] border-[#C5A059]/40 text-[#ECC968] hover:bg-[#183E30]'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-[#ECC968]" />
                <span>Screensaver</span>
              </button>
            )}

            {/* Primary CTA: Add Your Masjid */}
            <button
              onClick={() => {
                if (onScrollToAddMasjid) {
                  onScrollToAddMasjid();
                } else if (currentPage !== 'home') {
                  onNavigatePage('home');
                  setTimeout(() => {
                    const el = document.getElementById('add-masjid-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('add-masjid-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 ${
                isLight
                  ? 'bg-[#8C630D] text-white hover:bg-[#644605]'
                  : 'bg-[#FFDF78] text-[#0A2218] hover:bg-[#FFEAA0]'
              }`}
            >
              <span>Add Your Masjid</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#122F24] border-[#2A5C47]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden mt-3 pt-3 border-t space-y-2 text-xs font-semibold ${
              isLight ? 'border-slate-200' : 'border-slate-800'
            }`}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigatePage(link.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
                  currentPage === link.id
                    ? isLight
                      ? 'bg-[#8C630D] text-white'
                      : 'bg-[#FFDF78] text-black font-bold'
                    : isLight
                    ? 'hover:bg-slate-100'
                    : 'hover:bg-slate-800'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3 h-3 opacity-60" />
              </button>
            ))}

            <div className="pt-2 border-t border-opacity-15 border-current grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onSwitchViewMode('screen-showcase');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl border flex items-center justify-center space-x-1.5 font-bold ${
                  isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#071F15] border-slate-800 text-emerald-400'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>App Demo</span>
              </button>

              <button
                onClick={() => {
                  onSwitchViewMode('kiosk');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl border border-[#FFDF78]/40 bg-[#0D5C3A] text-[#FFDF78] flex items-center justify-center space-x-1.5 font-bold"
              >
                <Tv className="w-4 h-4" />
                <span>Lobby TV</span>
              </button>
            </div>

            {onOpenScreensaver && (
              <button
                onClick={() => {
                  onOpenScreensaver();
                  setMobileMenuOpen(false);
                }}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-center space-x-2 font-bold ${
                  isLight
                    ? 'bg-[#FAF4E8] border-[#8C630D]/30 text-[#8C630D]'
                    : 'bg-[#0E261D] border-[#C5A059]/40 text-[#ECC968]'
                }`}
              >
                <Moon className="w-4 h-4 text-[#ECC968]" />
                <span>Launch Screensaver (Standby Mode)</span>
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
