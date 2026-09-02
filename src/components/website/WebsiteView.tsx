import React, { useState } from 'react';
import { WebsitePage, AppViewMode, ThemeMode } from '../../types';
import { WebsiteNavbar } from './WebsiteNavbar';
import { WebsiteFooter } from './WebsiteFooter';
import { HomePage } from './HomePage';
import { ForMasjidsPage } from './ForMasjidsPage';
import { DownloadPage } from './DownloadPage';
import { ArabesqueBackgroundPattern } from '../ArabesquePatterns';

interface WebsiteViewProps {
  initialPage?: WebsitePage;
  isLight: boolean;
  onToggleTheme: () => void;
  onSwitchViewMode: (mode: AppViewMode) => void;
  onOpenScreensaver?: () => void;
}

export const WebsiteView: React.FC<WebsiteViewProps> = ({
  initialPage = 'home',
  isLight,
  onToggleTheme,
  onSwitchViewMode,
  onOpenScreensaver,
}) => {
  const [currentPage, setCurrentPage] = useState<WebsitePage>(initialPage);

  const handleScrollToAddMasjid = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('add-masjid-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('add-masjid-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between transition-colors duration-500 relative ${
        isLight ? 'bg-[#FAF6EE] text-slate-900' : 'bg-[#0B1E17] text-slate-100'
      }`}
    >
      {/* Background Islamic Arabesque Geometric Pattern */}
      <ArabesqueBackgroundPattern isLight={isLight} />

      {/* Top Outer Vignette Atmosphere */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EDE0C4]/40 via-transparent to-[#E5D7B7]/20'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#143C2E]/40 via-transparent to-[#081812]/85'
        }`}
      />

      {/* 1. Header / Navbar */}
      <WebsiteNavbar
        currentPage={currentPage}
        onNavigatePage={setCurrentPage}
        onSwitchViewMode={onSwitchViewMode}
        isLight={isLight}
        onToggleTheme={onToggleTheme}
        onScrollToAddMasjid={handleScrollToAddMasjid}
        onOpenScreensaver={onOpenScreensaver}
      />

      {/* 2. Main Page Content */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {currentPage === 'home' && (
          <HomePage
            isLight={isLight}
            onNavigatePage={setCurrentPage}
            onSwitchViewMode={onSwitchViewMode}
          />
        )}

        {currentPage === 'for-masjids' && (
          <ForMasjidsPage
            isLight={isLight}
            onNavigatePage={setCurrentPage}
            onSwitchViewMode={onSwitchViewMode}
          />
        )}

        {currentPage === 'download' && (
          <DownloadPage
            isLight={isLight}
            onNavigatePage={setCurrentPage}
            onSwitchViewMode={onSwitchViewMode}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      <WebsiteFooter
        isLight={isLight}
        onNavigatePage={setCurrentPage}
        onSwitchViewMode={onSwitchViewMode}
      />
    </div>
  );
};
