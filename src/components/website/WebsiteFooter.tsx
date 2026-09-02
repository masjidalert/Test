import React from 'react';
import { MasjidAlertBrandIcon } from '../MasjidAlertBrandIcon';
import { WebsitePage, AppViewMode } from '../../types';
import { Heart, Mail, MapPin, ShieldCheck, Sparkles, ExternalLink, ArrowUp } from 'lucide-react';

interface WebsiteFooterProps {
  isLight: boolean;
  onNavigatePage: (page: WebsitePage) => void;
  onSwitchViewMode: (mode: AppViewMode) => void;
}

export const WebsiteFooter: React.FC<WebsiteFooterProps> = ({
  isLight,
  onNavigatePage,
  onSwitchViewMode,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t transition-all ${
        isLight
          ? 'bg-[#FAF5EB] border-[#8C630D]/20 text-slate-800'
          : 'bg-[#081812] border-[#2A5C47]/40 text-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <MasjidAlertBrandIcon size={32} showText={true} isLight={isLight} />
            </div>

            <p className={`text-xs leading-relaxed max-w-sm ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
              The free Muslim community alert network for masjids across the US and Canada.
              Delivering instant Janazah notices, urgent community aid, daily prayer schedules, and synchronized lobby TV displays.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Built as Sadaqah · 100% Free Forever
              </span>
            </div>

            <div className="flex items-center space-x-2 text-[11px] opacity-75">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Memphis, Tennessee · Built by Yaqub Sharhan</span>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h5 className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider text-[#8C630D] dark:text-[#FFDF78]">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('home');
                    scrollToTop();
                  }}
                  className="hover:underline opacity-80 hover:opacity-100"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('for-masjids');
                    scrollToTop();
                  }}
                  className="hover:underline opacity-80 hover:opacity-100"
                >
                  For Masjids & Imams
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('download');
                    scrollToTop();
                  }}
                  className="hover:underline opacity-80 hover:opacity-100"
                >
                  Download App
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('home');
                    setTimeout(() => {
                      const el = document.getElementById('kiosk-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:underline opacity-80 hover:opacity-100"
                >
                  Lobby TV Kiosk
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('home');
                    setTimeout(() => {
                      const el = document.getElementById('features-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:underline opacity-80 hover:opacity-100"
                >
                  Key Features
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Admin */}
          <div className="space-y-3">
            <h5 className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider text-[#8C630D] dark:text-[#FFDF78]">
              Community & Admin
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('home');
                    setTimeout(() => {
                      const el = document.getElementById('add-masjid-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:underline opacity-80 hover:opacity-100 font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  Add Your Masjid
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSwitchViewMode('screen-showcase')}
                  className="hover:underline opacity-80 hover:opacity-100 flex items-center space-x-1"
                >
                  <span>Interactive App Simulator</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSwitchViewMode('kiosk')}
                  className="hover:underline opacity-80 hover:opacity-100 flex items-center space-x-1"
                >
                  <span>Live TV Kiosk Mode</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <a
                  href="https://ko-fi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline opacity-80 hover:opacity-100 flex items-center space-x-1 text-[#C5A059]"
                >
                  <span>Support on Ko-fi</span>
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Inquiries */}
          <div className="space-y-3">
            <h5 className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider text-[#8C630D] dark:text-[#FFDF78]">
              Direct Contact
            </h5>
            <p className="text-xs opacity-80">
              Have questions or need assistance onboarding your masjid? Reach out directly:
            </p>
            <a
              href="mailto:admin@masjidalert.com"
              className={`inline-flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 hover:border-[#8C630D]'
                  : 'bg-[#05140E] border-slate-800 text-[#FFDF78] hover:border-[#C5A059]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>admin@masjidalert.com</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright ribbon */}
        <div className="mt-12 pt-6 border-t border-opacity-15 border-current flex flex-col sm:flex-row items-center justify-between text-xs opacity-75 gap-3">
          <p>© 2025 MasjidAlert · Built as sadaqah by a Muslim developer · Free forever</p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 hover:opacity-100 font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
