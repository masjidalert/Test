import React, { useState } from 'react';
import { WebsitePage, AppViewMode } from '../../types';
import { AddMasjidForm } from './AddMasjidForm';
import { OrnateCorner, RubElHizbStar } from '../ArabesquePatterns';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users,
  Smartphone,
  Tv,
  EyeOff,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Building2,
  Calendar,
  Lock,
  ArrowRight,
  MessageSquare,
  Volume2,
} from 'lucide-react';

interface ForMasjidsPageProps {
  isLight: boolean;
  onNavigatePage: (page: WebsitePage) => void;
  onSwitchViewMode: (mode: AppViewMode) => void;
}

export const ForMasjidsPage: React.FC<ForMasjidsPageProps> = ({
  isLight,
  onNavigatePage,
  onSwitchViewMode,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const painPoints = [
    {
      problem: 'WhatsApp group fragmentation',
      text: 'Janazah notices that reach half the community because they’re in a WhatsApp group people forgot to join or got muted.',
    },
    {
      problem: 'Emergency delays',
      text: 'Urgent blood donation requests and emergency family needs that don’t spread fast enough across the local network.',
    },
    {
      problem: 'Compromised dignity',
      text: 'Families who need community support but don’t want the whole masjid knowing their private identity and personal situation.',
    },
    {
      problem: 'Missed prayer changes',
      text: 'Prayer time and iqamah changes announced at Jumu’ah that people who didn’t attend in person never find out about.',
    },
    {
      problem: 'Lost event awareness',
      text: 'Important halaqas, youth events, and community lectures that only the people who saw the physical wall flyer know about.',
    },
  ];

  const adminFeatures = [
    { title: 'Post alerts in seconds', desc: 'Post alerts across all 10 specialized alert types with single-click ease.' },
    { title: 'Schedule future alerts', desc: 'Prepare event and reminder notices in advance to broadcast automatically.' },
    { title: 'Auto-sync lobby TV iqamah', desc: 'Set iqamah times that update your lobby TV kiosk automatically within 60 seconds.' },
    { title: 'Multi-admin management', desc: 'Add Imams, resident scholars, and general secretaries with role-based access.' },
    { title: 'Delivery transparency', desc: 'View recipient confirmation counts and community engagement for every dispatch.' },
    { title: 'Direct developer support', desc: 'Contact the developer directly with any technical questions or customization requests.' },
  ];

  const memberBenefits = [
    { title: 'Zero friction signup', desc: 'Free app with no account, email, or password required.' },
    { title: 'Instant push notifications', desc: 'Reliable real-time alerts on their mobile devices for every dispatch.' },
    { title: 'GPS prayer times', desc: 'Accurate local prayer schedules based on their immediate GPS coordinates.' },
    { title: 'Follow multiple masjids', desc: 'Keep track of local masjids, university centers, and hometown mosques.' },
    { title: 'Home communities feature', desc: 'Stay permanently connected to their childhood masjid even after moving cities.' },
  ];

  const faqs = [
    {
      q: 'Is MasjidAlert really free?',
      a: 'Yes. Free for masjids, free for community members, free forever including push notifications. There are no subscriptions, setup fees, or hidden tiers.',
    },
    {
      q: 'How long does setup take?',
      a: 'Less than 10 minutes from receiving your admin login to posting your first alert.',
    },
    {
      q: 'Do community members need to create an account?',
      a: 'No. They download the app, search for your masjid, and follow. No email, no password, no personal information required.',
    },
    {
      q: 'What if we already use another tool or website?',
      a: 'MasjidAlert works alongside any existing system. Many masjids use it in addition to their website or existing tools to ensure reliable instant push notifications for urgent matters like Janazah.',
    },
    {
      q: 'Can multiple people manage the alerts?',
      a: 'Yes. You can add co-admins (Imams, board members, youth directors) and each has their own dedicated login.',
    },
    {
      q: 'Is our community’s data private?',
      a: 'Yes. MasjidAlert collects no personal information from community members. No data is sold to anyone, ever.',
    },
    {
      q: 'What is the Community Aid Discreet Mode?',
      a: 'When posting a Community Aid alert, you can enable Discreet Mode which removes identifying details from the notification so the community knows there is a family in need without knowing who they are. Discreet alerts are also never broadcasted on the public lobby TV.',
    },
    {
      q: 'Does MasjidAlert work in Canada?',
      a: 'Yes. MasjidAlert works for masjids across the US and Canada with full regional state/provincial support.',
    },
  ];

  return (
    <div className="w-full space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <div
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-semibold shadow-sm"
            style={{
              backgroundColor: isLight ? '#FAF4E8' : '#112C20',
              borderColor: isLight ? '#8C630D' : '#C5A059',
              color: isLight ? '#644605' : '#FFDF78',
            }}
          >
            <RubElHizbStar size={12} />
            <span>Dedicated Portal for Imams, Shura Boards & Mosque Secretaries</span>
          </div>

          <h1 className="font-['Cinzel'] text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Give your community the communication tool they deserve.{' '}
            <span className={isLight ? 'text-[#8C630D]' : 'text-[#FFDF78]'}>
              Free.
            </span>
          </h1>

          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            Connect every congregant directly with verified announcements, dignified janazah notices, and live prayer times — without messy group chats or paid subscription tiers.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('get-started-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-xl transition-all ${
                isLight
                  ? 'bg-[#125A3D] text-white hover:bg-[#0E462F]'
                  : 'bg-[#FFDF78] text-[#0A2218] hover:bg-[#FFEAA0]'
              }`}
            >
              Get Started for Your Masjid
            </button>

            <button
              onClick={() => onSwitchViewMode('screen-showcase')}
              className={`px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                isLight
                  ? 'bg-white border-[#8C630D]/40 text-[#644605] hover:bg-[#FAF5EB]'
                  : 'bg-[#122D22] border-[#2A5C47] text-[#FFDF78] hover:bg-[#173C2E]'
              }`}
            >
              Preview Admin Portal Demo
            </button>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS & THE SOLUTION */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-widest text-[#8C630D] dark:text-[#FFDF78]">
              The Problem with Current Methods
            </span>
            <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-extrabold tracking-wide">
              What Masjids Deal with Today
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all space-y-2 ${
                  isLight ? 'bg-white border-rose-200' : 'bg-[#1E1215] border-rose-800/40'
                }`}
              >
                <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{item.problem}</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  “{item.text}”
                </p>
              </div>
            ))}

            {/* High Impact Solution Card */}
            <div
              className={`p-6 rounded-2xl border col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between space-y-3 ${
                isLight
                  ? 'bg-gradient-to-br from-[#125A3D] to-[#0E462F] text-white border-emerald-800'
                  : 'bg-gradient-to-br from-[#143B2C] to-[#0E281F] text-[#FFDF78] border-[#FFDF78]/50 shadow-[0_0_20px_rgba(255,223,120,0.15)]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>The MasjidAlert Solution</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-100 dark:text-slate-200 font-medium">
                  MasjidAlert solves all of this with one tap. Your admin posts an alert. Every follower gets a push notification on their phone within seconds.
                </p>
              </div>
              <div className="text-[11px] font-bold opacity-80 pt-2 border-t border-white/15">
                ● 100% Delivery Reliability
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ADMIN PORTAL INCLUDES VS WHAT MEMBERS GET */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-widest text-[#8C630D] dark:text-[#FFDF78]">
              Feature Ecosystem
            </span>
            <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-extrabold tracking-wide">
              Equipped for Leadership & Congregation
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: What Your Admin Portal Includes */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#102B20] border-[#2A5C47] shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3 pb-3 border-b border-opacity-15 border-current">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <h3 className="font-['Cinzel'] font-bold text-base">
                    What Your Admin Portal Includes
                  </h3>
                  <p className="text-[11px] opacity-70">Dedicated web & mobile control panel</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {adminFeatures.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs">{item.title}</h4>
                      <p className={`text-xs mt-0.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: What Your Community Members Get */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#102B20] border-[#2A5C47] shadow-md'
              }`}
            >
              <div className="flex items-center space-x-3 pb-3 border-b border-opacity-15 border-current">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  📱
                </div>
                <div>
                  <h3 className="font-['Cinzel'] font-bold text-base">
                    What Your Community Members Get
                  </h3>
                  <p className="text-[11px] opacity-70">Clean, dignified mobile app experience</p>
                </div>
              </div>

              <div className="space-y-3.5">
                {memberBenefits.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs">{item.title}</h4>
                      <p className={`text-xs mt-0.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-widest text-[#8C630D] dark:text-[#FFDF78]">
              Clear Answers
            </span>
            <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-extrabold tracking-wide">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#102B20] border-[#2A5C47]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 shrink-0 text-[#C5A059]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 shrink-0 opacity-60" />
                    )}
                  </button>

                  {isOpen && (
                    <div
                      className={`px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed border-t ${
                        isLight
                          ? 'border-slate-100 text-slate-700 bg-slate-50/50'
                          : 'border-[#2A5C47] text-slate-300 bg-[#0A1D16]/50'
                      }`}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. GET STARTED SECTION */}
      <section id="get-started-form" className="relative scroll-mt-20 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-2">
            <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-widest text-[#8C630D] dark:text-[#FFDF78]">
              Ready to Join?
            </span>
            <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-extrabold tracking-wide">
              Submit Your Masjid
            </h2>
            <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
              Submit your masjid and we’ll verify and set you up within 24 hours.
            </p>
          </div>

          <AddMasjidForm isLight={isLight} />
        </div>
      </section>
    </div>
  );
};
