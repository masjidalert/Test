import React, { useState } from 'react';
import { AdminUser } from '../types';
import { ADMIN_USERS } from '../data/mobileData';
import { MasjidAlertBrandIcon } from './MasjidAlertBrandIcon';
import {
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  Tv,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface AdminPortalLoginProps {
  isLight?: boolean;
  onLoginSuccess: (user: AdminUser) => void;
  onBackToApp: () => void;
}

export const AdminPortalLogin: React.FC<AdminPortalLoginProps> = ({
  isLight = false,
  onLoginSuccess,
  onBackToApp,
}) => {
  const [email, setEmail] = useState('imam@masjidannoor.org');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const matched = ADMIN_USERS.find((u) => u.email === email) || ADMIN_USERS[0];
      onLoginSuccess(matched);
    }, 600);
  };

  const handleQuickSelect = (user: AdminUser) => {
    setEmail(user.email);
    setPassword('••••••••••••');
    onLoginSuccess(user);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Top Return Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToApp}
          className={`p-2 rounded-xl border flex items-center space-x-1.5 text-xs font-semibold ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
              : 'bg-[#05140E] border-slate-800 text-slate-200 hover:bg-[#082218]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Community Feed</span>
        </button>

        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
          ADMIN ACCESS
        </span>
      </div>

      {/* Main Login Card */}
      <div
        className={`p-5 sm:p-6 rounded-[28px] border shadow-xl space-y-4 ${
          isLight
            ? 'bg-white border-[#8C630D]/30 text-slate-900'
            : 'bg-[#04110B] border-[#C5A059]/30 text-slate-100'
        }`}
      >
        {/* Brand & Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-900 border border-amber-400/50 flex items-center justify-center text-xl shadow-md">
            <Lock className="w-6 h-6 text-[#FFDF78]" />
          </div>
          <h2
            className={`font-['Cinzel'] text-xl font-bold tracking-wide ${
              isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
            }`}
          >
            Masjid Admin & Imam Portal
          </h2>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Post alerts to mobile app subscribers and sync lobby TV kiosk display instantly.
          </p>
        </div>

        {/* Sync Info Pill */}
        <div
          className={`p-3 rounded-2xl border text-xs flex items-center space-x-2.5 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020805] border-slate-800 text-slate-300'
          }`}
        >
          <Tv className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span className="text-[11px] leading-tight">
            Directly controls push notifications and the physical TV kiosk inside the masjid lobby.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold block mb-1 opacity-80">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="imam@masjid.org"
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-none ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-[#8C630D]'
                    : 'bg-[#061A11] border-slate-800 text-slate-100 focus:border-[#C5A059]'
                }`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold opacity-80">Password</label>
              <button
                type="button"
                onClick={() => alert('Password reset email dispatched to verified masjid admin address.')}
                className="text-[10px] text-[#C5A059] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-none ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-[#8C630D]'
                    : 'bg-[#061A11] border-slate-800 text-slate-100 focus:border-[#C5A059]'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-emerald-600 rounded"
              />
              <span className="text-[11px] opacity-75">Keep me logged in</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-md transition-all ${
              isLight
                ? 'bg-[#8C630D] text-white hover:bg-[#72500A]'
                : 'bg-[#FFDF78] text-[#040E0A] hover:bg-white'
            }`}
          >
            {isLoading ? (
              <span>Authenticating Admin Credentials...</span>
            ) : (
              <>
                <span>Enter Imam Control Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Logins for Testing */}
        <div className="pt-3 border-t border-opacity-20 border-current space-y-2">
          <span className="text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider block opacity-70">
            Demo 1-Tap Logins (Select Role):
          </span>

          <div className="space-y-1.5">
            {ADMIN_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleQuickSelect(user)}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-[#8C630D]'
                    : 'bg-[#020805] border-slate-800 hover:border-[#C5A059]'
                }`}
              >
                <div>
                  <div className="font-bold text-[11px]">{user.name}</div>
                  <div className="text-[10px] opacity-70">
                    {user.role} · {user.masjidName}
                  </div>
                </div>
                <span className="text-[10px] text-[#C5A059] font-bold">Select →</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
