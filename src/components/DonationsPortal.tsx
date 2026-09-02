import React, { useState } from 'react';
import { Heart, ShieldCheck, Check, Sparkles, CreditCard, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface DonationsPortalProps {
  isLight?: boolean;
}

export const DonationsPortal: React.FC<DonationsPortalProps> = ({ isLight = false }) => {
  const [selectedFund, setSelectedFund] = useState<'elevator' | 'zakat' | 'sadaqah' | 'janazah-jariyah'>('elevator');
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const funds = [
    {
      id: 'elevator',
      name: 'Elevator Accessibility Campaign',
      desc: 'Elder and sister 2nd-floor access',
      badge: 'Urgent Target',
    },
    {
      id: 'zakat',
      name: 'Zakat-ul-Mal (Local Families)',
      desc: '100% verified local distribution',
      badge: 'Obligatory',
    },
    {
      id: 'sadaqah',
      name: 'General Mosque Operations',
      desc: 'Utilities, youth halls, and maintenance',
      badge: 'General',
    },
    {
      id: 'janazah-jariyah',
      name: 'Sadaqah Jariyah for the Deceased',
      desc: 'Ongoing water wells & Quran prints',
      badge: 'Memorial',
    },
  ];

  const presets = [25, 50, 100, 250, 500];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
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
          Sadaqah & Zakat Giving
        </h2>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Direct, secure, 100% tax-deductible contributions to your local mosque
        </p>
      </div>

      {/* Fund Type Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {funds.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setSelectedFund(f.id as any)}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedFund === f.id
                ? isLight
                  ? 'bg-[#FAF4E8] border-[#8C630D] shadow-sm'
                  : 'bg-[#0E3524] border-[#FFDF78] shadow-[0_0_12px_rgba(255,223,120,0.2)]'
                : isLight
                ? 'bg-white border-slate-200 hover:border-slate-300'
                : 'bg-[#05140E] border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs">{f.name}</span>
              <span
                className={`text-[9px] font-['Cinzel'] font-bold px-2 py-0.5 rounded ${
                  selectedFund === f.id
                    ? isLight
                      ? 'bg-[#8C630D] text-white'
                      : 'bg-[#FFDF78] text-black font-bold'
                    : isLight
                    ? 'bg-slate-100 text-slate-600'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {f.badge}
              </span>
            </div>
            <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {f.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Amount Selector */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <label className="text-xs font-['Cinzel'] font-bold uppercase tracking-wider block mb-2 opacity-75">
          Select Contribution Amount
        </label>

        <div className="grid grid-cols-5 gap-2 mb-3">
          {presets.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => {
                setAmount(val);
                setCustomAmount('');
              }}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                amount === val && !customAmount
                  ? isLight
                    ? 'bg-[#8C630D] text-white border-[#8C630D]'
                    : 'bg-[#FFDF78] text-black border-[#FFDF78] font-bold shadow'
                  : isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#020805] border-slate-800 text-slate-200'
              }`}
            >
              ${val}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="relative mb-3">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold opacity-60">
            $
          </span>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              if (e.target.value) setAmount(Number(e.target.value));
            }}
            placeholder="Or enter custom amount in USD"
            className={`w-full pl-8 pr-4 py-2 rounded-xl text-xs border outline-none ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-[#8C630D]'
                : 'bg-[#020805] border-slate-800 text-slate-100 focus:border-[#C5A059]'
            }`}
          />
        </div>

        {/* Friday Recurring Toggle */}
        <label className="flex items-center space-x-2 text-xs cursor-pointer select-none py-1">
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="rounded border-slate-400 text-emerald-600 focus:ring-emerald-500"
          />
          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
            Make this a weekly recurring Friday Sadaqah (Earn reward on Sayyid al-Ayyam)
          </span>
        </label>

        {/* Submit Button */}
        <button
          onClick={handleDonate}
          className={`w-full mt-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-md transition-all ${
            isLight
              ? 'bg-[#0D5C3A] text-white hover:bg-[#0A482D]'
              : 'bg-[#FFDF78] text-[#040E0A] hover:bg-white'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>
            {isSubmitted
              ? 'Processing JazakAllahu Khayran...'
              : `Give $${customAmount || amount} with 1-Tap Pay`}
          </span>
        </button>

        {isSubmitted && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs text-center border border-emerald-500/40">
            JazakAllahu Khayran! Your receipt was generated and sent to your email.
          </div>
        )}

        <div className="flex items-center justify-center space-x-2 mt-3 text-[10px] opacity-60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>256-Bit Encrypted · 501(c)(3) Official Mosque Non-Profit</span>
        </div>
      </div>
    </div>
  );
};
