import React, { useState } from 'react';
import { AdminUser, AlertType, CommunityAlert, MosqueProfile } from '../types';
import { ALL_ALERT_TYPES_META, ADMIN_USERS } from '../data/mobileData';
import { CategoryIconBadge } from './CategoryIconBadge';
import { MonthlyTimetableManager } from './MonthlyTimetableManager';
import {
  Send,
  Tv,
  Clock,
  Users,
  Shield,
  ShieldCheck,
  Calendar,
  Heart,
  Trash2,
  CheckCircle2,
  AlertCircle,
  EyeOff,
  Sparkles,
  HelpCircle,
  Plus,
  RefreshCw,
  LogOut,
  Sliders,
  Mail,
  Lock,
  Printer,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPortalMainProps {
  isLight?: boolean;
  currentUser: AdminUser;
  activeMasjid: MosqueProfile;
  alerts: CommunityAlert[];
  onAddNewAlert: (newAlert: CommunityAlert) => void;
  onDeleteAlert: (alertId: string) => void;
  onUpdateIqamah: (iqamahTimes: MosqueProfile['iqamahTimes']) => void;
  onLogout: () => void;
  onOpenKioskView: () => void;
}

export const AdminPortalMain: React.FC<AdminPortalMainProps> = ({
  isLight = false,
  currentUser,
  activeMasjid,
  alerts,
  onAddNewAlert,
  onDeleteAlert,
  onUpdateIqamah,
  onLogout,
  onOpenKioskView,
}) => {
  // Alert Posting Form States
  const [selectedType, setSelectedType] = useState<AlertType>('janazah');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isHighPriority, setIsHighPriority] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState('');

  // Janazah specific
  const [deceasedName, setDeceasedName] = useState('');
  const [janazahPrayer, setJanazahPrayer] = useState('Maghrib (7:55 PM)');
  const [cemeteryName, setCemeteryName] = useState('Arlington Muslim Memorial Cemetery');
  const [familyNote, setFamilyNote] = useState('');

  // Community Aid specific
  const [discreetMode, setDiscreetMode] = useState(true);
  const [familyPseudonym, setFamilyPseudonym] = useState('Family in Arlington (Ref #415)');
  const [aidGoalAmount, setAidGoalAmount] = useState('2500');

  // Event / Lecture / Learning specific
  const [eventDate, setEventDate] = useState('This Saturday, Aug 29');
  const [eventTime, setEventTime] = useState('8:00 PM');
  const [eventLocation, setEventLocation] = useState('Main Sanctuary & Banquet Hall');
  const [speaker, setSpeaker] = useState('Sheikh Omar Suleiman');

  // Charity specific
  const [charityGoal, setCharityGoal] = useState('50000');
  const [charityUrl, setCharityUrl] = useState('https://masjidannoor.org/donate');

  // Volunteer specific
  const [volunteerSlots, setVolunteerSlots] = useState('20');

  // Prayer Change specific
  const [prayerChanged, setPrayerChanged] = useState('Asr & Isha');
  const [newPrayerTime, setNewPrayerTime] = useState('Asr: 5:15 PM | Isha: 9:20 PM');

  // Iqamah Schedule State
  const [iqamahState, setIqamahState] = useState(activeMasjid.iqamahTimes);
  const [iqamahSavedMessage, setIqamahSavedMessage] = useState(false);
  const [alertPostedMessage, setAlertPostedMessage] = useState(false);

  // Active Admin Sub-tab
  const [activeSection, setActiveSection] = useState<'post' | 'monthly_timetable' | 'iqamah' | 'history' | 'admins' | 'jumuah' | 'support'>('monthly_timetable');

  // Handle Post Submit
  const handlePostAlert = (e: React.FormEvent) => {
    e.preventDefault();

    const newAlert: CommunityAlert = {
      id: `alert-${Date.now()}`,
      type: selectedType,
      title: title || `${selectedType.toUpperCase()} Announcement`,
      body: body || 'Important announcement from masjid leadership.',
      masjidId: activeMasjid.id,
      masjidName: activeMasjid.name,
      timestamp: 'Just now',
      isHighPriority: isHighPriority || selectedType === 'janazah' || selectedType === 'urgent_aid',
      isRead: false,
      badge: selectedType.toUpperCase().replace('_', ' '),
      discreetMode: selectedType === 'community_aid' ? discreetMode : undefined,
      familyPseudonym: selectedType === 'community_aid' ? familyPseudonym : undefined,
      goalAmount: selectedType === 'charity' ? Number(charityGoal) : selectedType === 'community_aid' ? Number(aidGoalAmount) : undefined,
      raisedAmount: 0,
      donationUrl: selectedType === 'charity' ? charityUrl : undefined,
      eventDate: selectedType === 'event' || selectedType === 'lecture' ? eventDate : undefined,
      eventTime: selectedType === 'event' || selectedType === 'lecture' ? eventTime : undefined,
      eventLocation: selectedType === 'event' || selectedType === 'lecture' ? eventLocation : undefined,
      speaker: selectedType === 'lecture' ? speaker : undefined,
      volunteerSlotsTotal: selectedType === 'volunteer' ? Number(volunteerSlots) : undefined,
      volunteerSlotsFilled: 0,
      prayerChanged: selectedType === 'prayer_change' ? prayerChanged : undefined,
      effectiveDate: selectedType === 'prayer_change' ? newPrayerTime : undefined,
      janazahData:
        selectedType === 'janazah'
          ? {
              id: `janazah-${Date.now()}`,
              deceasedName: deceasedName || 'Beloved Community Member',
              prayerName: janazahPrayer.split(' ')[0],
              prayerTime: janazahPrayer,
              dateText: 'Today after congregation',
              locationName: activeMasjid.name,
              locationAddress: activeMasjid.address,
              cemeteryName: cemeteryName,
              familyNote: familyNote || 'May Allah grant forgiveness and elevate their status in Jannatul Firdaus.',
              duasOfferedCount: 1,
              attendedCount: 0,
              postedAt: 'Just now',
            }
          : undefined,
    };

    onAddNewAlert(newAlert);
    setAlertPostedMessage(true);
    setTimeout(() => setAlertPostedMessage(false), 4000);

    // Reset basics
    setTitle('');
    setBody('');
    setDeceasedName('');
    setFamilyNote('');
  };

  const handleSaveIqamah = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateIqamah(iqamahState);
    setIqamahSavedMessage(true);
    setTimeout(() => setIqamahSavedMessage(false), 3000);
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Admin Status Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isLight
            ? 'bg-white border-[#8C630D]/30 shadow-sm'
            : 'bg-[#04110B] border-[#C5A059]/40 shadow-lg'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold text-base">
            🕌
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xs sm:text-sm">{activeMasjid.name}</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-emerald-600 text-white font-bold rounded">
                VERIFIED ADMIN
              </span>
            </div>
            <div className="text-[11px] opacity-75">
              Logged in as <span className="font-semibold">{currentUser.name}</span> ({currentUser.role})
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Lobby TV Kiosk preview trigger */}
          <button
            onClick={onOpenKioskView}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border transition-all ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                : 'bg-[#061A11] border-slate-700 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Tv className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Lobby TV View</span>
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="p-1.5 rounded-xl border border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-400 transition-all text-xs"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Admin Section Tabs Navigation */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'monthly_timetable', label: 'Monthly Prayer & Iqamah (12 Mo)', icon: Calendar },
          { id: 'post', label: 'Post Alert', icon: Send },
          { id: 'iqamah', label: 'Quick Daily Iqamah', icon: Clock },
          { id: 'history', label: 'Recent Posts', icon: Calendar },
          { id: 'jumuah', label: 'Jumu’ah Schedule', icon: Users },
          { id: 'admins', label: 'Co-Admins', icon: Shield },
          { id: 'support', label: 'Contact Dev', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all ${
                isActive
                  ? isLight
                    ? 'bg-[#8C630D] text-white shadow-sm'
                    : 'bg-[#FFDF78] text-[#040E0A] shadow-md font-extrabold'
                  : isLight
                  ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-[#05140E] border border-slate-800 text-slate-300 hover:bg-[#092218]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 0: YEAR-ROUND MONTHLY TIMETABLE MANAGER & PRINTABLE SHEET */}
      {activeSection === 'monthly_timetable' && (
        <MonthlyTimetableManager
          isLight={isLight}
          activeMasjid={activeMasjid}
          onPublishToAppAndKiosk={(updatedTimes) => {
            onUpdateIqamah(updatedTimes);
            setIqamahState(updatedTimes);
          }}
        />
      )}

      {/* SECTION 1: POST NEW ALERT */}
      {activeSection === 'post' && (
        <div
          className={`p-5 rounded-2xl border space-y-4 shadow-md ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
          }`}
        >
          <div>
            <h3
              className={`font-['Cinzel'] text-base font-bold tracking-wide ${
                isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
              }`}
            >
              Broadcast New Community Alert
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Sends push notifications to {activeMasjid.followerCount.toLocaleString()} followers & updates lobby TV screen
            </p>
          </div>

          {/* Success Banner */}
          {alertPostedMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-semibold flex items-center space-x-2 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Alert dispatched successfully! Mobile push broadcasted & Lobby TV updated.</span>
            </div>
          )}

          <form onSubmit={handlePostAlert} className="space-y-4">
            {/* 1. Category 10-Type Selector */}
            <div>
              <label className="text-[11px] font-['Cinzel'] font-bold uppercase tracking-wider block opacity-70 mb-2">
                Select Alert Category (10 Distinct Types):
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {ALL_ALERT_TYPES_META.map((meta) => {
                  const isSelected = selectedType === meta.type;
                  return (
                    <button
                      key={meta.type}
                      type="button"
                      onClick={() => setSelectedType(meta.type)}
                      className={`p-2 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? isLight
                            ? 'bg-[#FAF4E8] border-[#8C630D] ring-2 ring-[#8C630D]/30 shadow-sm'
                            : 'bg-[#0E3524] border-[#FFDF78] ring-2 ring-[#FFDF78]/30 shadow-[0_0_10px_rgba(255,223,120,0.2)]'
                          : isLight
                          ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
                          : 'bg-[#020805] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CategoryIconBadge type={meta.type} size="sm" isLight={isLight} />
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                      </div>
                      <div className="mt-1">
                        <span className="font-bold text-[11px] block">{meta.label}</span>
                        <span className="text-[9px] opacity-60 leading-tight block truncate">
                          {meta.colorName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specialized Field Sets based on selected type */}

            {/* A. JANAZAH SPECIALIZED FORM */}
            {selectedType === 'janazah' && (
              <div
                className={`p-3.5 rounded-2xl border space-y-3 ${
                  isLight ? 'bg-[#FAF4E8] border-[#8C630D]/40' : 'bg-[#082015] border-[#C5A059]/40'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🤍</span>
                  <div>
                    <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider text-amber-500">
                      Janazah Funeral Notice (First-Class Solemn Treatment)
                    </span>
                    <p className="text-[10px] opacity-75">
                      Automatically generates Fard Kifayah badge, burial GPS link & du’ā counter.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold block mb-1 opacity-80">
                      Deceased Full Name (المَرْحُوم) *
                    </label>
                    <input
                      type="text"
                      required
                      value={deceasedName}
                      onChange={(e) => setDeceasedName(e.target.value)}
                      placeholder="e.g. Hajji Yusuf Abdullah"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold block mb-1 opacity-80">
                      Janazah Prayer Time & Date *
                    </label>
                    <input
                      type="text"
                      required
                      value={janazahPrayer}
                      onChange={(e) => setJanazahPrayer(e.target.value)}
                      placeholder="e.g. Today after Maghrib (7:55 PM)"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1 opacity-80">
                    Cemetery Burial Location
                  </label>
                  <input
                    type="text"
                    value={cemeteryName}
                    onChange={(e) => setCemeteryName(e.target.value)}
                    placeholder="e.g. Arlington Muslim Memorial Cemetery (4300 Cemetery Rd)"
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                      isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold block mb-1 opacity-80">
                    Family Request & Condolences Note
                  </label>
                  <textarea
                    rows={2}
                    value={familyNote}
                    onChange={(e) => setFamilyNote(e.target.value)}
                    placeholder="e.g. The Abdullah family requests your presence to fulfill Fard Kifayah and sincere du’ā."
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                      isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* B. COMMUNITY AID (WITH DISCREET MODE) */}
            {selectedType === 'community_aid' && (
              <div
                className={`p-3.5 rounded-2xl border space-y-3 ${
                  isLight ? 'bg-amber-50 border-amber-300' : 'bg-[#1C1206] border-amber-600/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🤲</span>
                    <div>
                      <span className="font-bold text-xs">Community Aid with Discreet Mode</span>
                      <p className="text-[10px] opacity-75">
                        Protects family dignity by hiding personal details.
                      </p>
                    </div>
                  </div>

                  {/* Discreet Mode Toggle */}
                  <button
                    type="button"
                    onClick={() => setDiscreetMode(!discreetMode)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 border transition-all ${
                      discreetMode
                        ? 'bg-amber-600 text-white border-amber-500'
                        : isLight
                        ? 'bg-white border-slate-300 text-slate-700'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Discreet Mode: {discreetMode ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                {discreetMode && (
                  <div className="p-2.5 rounded-xl bg-amber-900/30 border border-amber-500/50 text-[11px] text-amber-200 flex items-start space-x-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <span>
                      <strong>Privacy Guard Active:</strong> Recipient name and address are masked on mobile feeds and <strong>COMPLETELY EXCLUDED</strong> from the public TV kiosk display in the lobby.
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold block mb-1 opacity-80">
                      Family Pseudonym / Case ID
                    </label>
                    <input
                      type="text"
                      value={familyPseudonym}
                      onChange={(e) => setFamilyPseudonym(e.target.value)}
                      placeholder="e.g. Family in Arlington (Ref #415)"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold block mb-1 opacity-80">
                      Emergency Relief Target Amount ($)
                    </label>
                    <input
                      type="number"
                      value={aidGoalAmount}
                      onChange={(e) => setAidGoalAmount(e.target.value)}
                      placeholder="2500"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* C. CHARITY / FUNDRAISER FORM */}
            {selectedType === 'charity' && (
              <div
                className={`p-3.5 rounded-2xl border space-y-3 ${
                  isLight ? 'bg-teal-50 border-teal-300' : 'bg-[#051C17] border-teal-600/40'
                }`}
              >
                <span className="font-bold text-xs block text-teal-400">
                  Charity & Campaign Fundraiser Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold block mb-1 opacity-80">
                      Campaign Target Goal ($)
                    </label>
                    <input
                      type="number"
                      value={charityGoal}
                      onChange={(e) => setCharityGoal(e.target.value)}
                      placeholder="50000"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold block mb-1 opacity-80">
                      Donation Link URL
                    </label>
                    <input
                      type="url"
                      value={charityUrl}
                      onChange={(e) => setCharityUrl(e.target.value)}
                      placeholder="https://masjidannoor.org/donate"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* D. EVENT / LECTURE / LEARNING */}
            {(selectedType === 'event' || selectedType === 'lecture' || selectedType === 'learning') && (
              <div
                className={`p-3.5 rounded-2xl border space-y-3 ${
                  isLight ? 'bg-purple-50 border-purple-200' : 'bg-[#150720] border-purple-800/40'
                }`}
              >
                <span className="font-bold text-xs block text-purple-300">
                  Event, Lecture & Educational Program Metadata
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold block mb-1 opacity-80">Date</label>
                    <input
                      type="text"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      placeholder="Saturday, Aug 29"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold block mb-1 opacity-80">Time</label>
                    <input
                      type="text"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      placeholder="8:00 PM (After Maghrib)"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold block mb-1 opacity-80">Speaker / Instructor</label>
                    <input
                      type="text"
                      value={speaker}
                      onChange={(e) => setSpeaker(e.target.value)}
                      placeholder="Sheikh Omar Suleiman"
                      className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Standard Title & Body */}
            <div>
              <label className="text-[11px] font-semibold block mb-1 opacity-80">
                Alert Title / Headline *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Salatul Janazah for Hajji Yusuf Abdullah"
                className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-[#8C630D]'
                    : 'bg-[#061A11] border-slate-800 text-slate-100 focus:border-[#C5A059]'
                }`}
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold block mb-1 opacity-80">
                Announcement Message Body *
              </label>
              <textarea
                required
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Provide detailed instructions, timings, and parking notes for community members..."
                className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 focus:border-[#8C630D]'
                    : 'bg-[#061A11] border-slate-800 text-slate-100 focus:border-[#C5A059]'
                }`}
              />
            </div>

            {/* Scheduling & High-Priority Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHighPriority}
                  onChange={(e) => setIsHighPriority(e.target.checked)}
                  className="accent-rose-600 rounded"
                />
                <span className="font-semibold text-rose-400">Send as Critical High-Priority Push</span>
              </label>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsScheduled(!isScheduled)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                    isScheduled
                      ? 'bg-amber-600 text-white border-amber-500'
                      : isLight
                      ? 'border-slate-300 text-slate-600'
                      : 'border-slate-700 text-slate-300'
                  }`}
                >
                  {isScheduled ? 'Scheduled for Future' : 'Send Immediately'}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-lg transition-all ${
                isLight
                  ? 'bg-[#8C630D] text-white hover:bg-[#72500A]'
                  : 'bg-gradient-to-r from-[#0D5C3A] to-[#146D46] text-[#FFDF78] border border-[#FFDF78]/50 hover:brightness-110'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Alert to Phones & TV Kiosk</span>
            </button>
          </form>
        </div>
      )}

      {/* SECTION 2: IQAMAH TIMES MANAGEMENT */}
      {activeSection === 'iqamah' && (
        <div
          className={`p-5 rounded-2xl border space-y-4 shadow-md ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
          }`}
        >
          <div>
            <h3
              className={`font-['Cinzel'] text-base font-bold tracking-wide ${
                isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
              }`}
            >
              Daily Iqamah Congregation Schedules
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Updating these times immediately synchronizes both the mobile app and the physical lobby TV display.
            </p>
          </div>

          {/* Sync Guarantee Note */}
          <div
            className={`p-3 rounded-xl border text-xs flex items-center space-x-2.5 ${
              isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-[#082015] border-emerald-500/40 text-emerald-200'
            }`}
          >
            <Tv className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              <strong>Lobby TV Sync:</strong> Saving these updates the masjid TV kiosk display within 60 seconds.
            </span>
          </div>

          {iqamahSavedMessage && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Iqamah times updated! Mobile app subscribers and Lobby TV display synced.</span>
            </div>
          )}

          <form onSubmit={handleSaveIqamah} className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold block mb-1 opacity-80">Fajr Iqamah</label>
                <input
                  type="text"
                  value={iqamahState.fajr}
                  onChange={(e) => setIqamahState({ ...iqamahState, fajr: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1 opacity-80">Dhuhr Iqamah</label>
                <input
                  type="text"
                  value={iqamahState.dhuhr}
                  onChange={(e) => setIqamahState({ ...iqamahState, dhuhr: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1 opacity-80">Asr Iqamah</label>
                <input
                  type="text"
                  value={iqamahState.asr}
                  onChange={(e) => setIqamahState({ ...iqamahState, asr: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1 opacity-80">Maghrib Iqamah</label>
                <input
                  type="text"
                  value={iqamahState.maghrib}
                  onChange={(e) => setIqamahState({ ...iqamahState, maghrib: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1 opacity-80">Isha Iqamah</label>
                <input
                  type="text"
                  value={iqamahState.isha}
                  onChange={(e) => setIqamahState({ ...iqamahState, isha: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1 opacity-80">1st Jumu’ah Khutbah</label>
                <input
                  type="text"
                  value={iqamahState.jumuah1}
                  onChange={(e) => setIqamahState({ ...iqamahState, jumuah1: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono border outline-none ${
                    isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-md ${
                isLight
                  ? 'bg-[#0D5C3A] text-white hover:bg-[#09472C]'
                  : 'bg-[#FFDF78] text-[#040E0A] hover:bg-white'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Save & Sync to Masjid TV Kiosk</span>
            </button>
          </form>
        </div>
      )}

      {/* SECTION 3: RECENT POSTS / HISTORY */}
      {activeSection === 'history' && (
        <div
          className={`p-5 rounded-2xl border space-y-4 shadow-md ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`font-['Cinzel'] text-base font-bold tracking-wide ${
                  isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
                }`}
              >
                Recent Dispatched Alerts ({alerts.length})
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Manage or withdraw active announcements from subscriber phones
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-xl border flex items-start justify-between ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020805] border-slate-800'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <CategoryIconBadge type={alert.type} size="sm" isLight={isLight} />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold">{alert.title}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase bg-slate-700 text-slate-200">
                        {alert.type.replace('_', ' ')}
                      </span>
                      {alert.discreetMode && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-amber-600 text-white">
                          DISCREET MODE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] opacity-75 line-clamp-1">{alert.body}</p>
                    <div className="text-[10px] opacity-60 flex items-center space-x-3">
                      <span>Sent {alert.timestamp}</span>
                      <span>·</span>
                      <span>Delivered to 2,840 devices</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteAlert(alert.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-all text-xs"
                  title="Withdraw/Delete alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: CO-ADMINS */}
      {activeSection === 'admins' && (
        <div
          className={`p-5 rounded-2xl border space-y-4 shadow-md ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`font-['Cinzel'] text-base font-bold tracking-wide ${
                  isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
                }`}
              >
                Mosque Staff & Co-Admins
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Authorized personnel allowed to post push notices and update Iqamah times
              </p>
            </div>

            <button
              onClick={() => alert('Invite link generated for new verified co-admin.')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 ${
                isLight ? 'bg-[#8C630D] text-white' : 'bg-[#FFDF78] text-black'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite Co-Admin</span>
            </button>
          </div>

          <div className="space-y-2">
            {ADMIN_USERS.map((admin) => (
              <div
                key={admin.id}
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020805] border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-400/40 flex items-center justify-center font-bold text-xs text-[#FFDF78]">
                    {admin.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xs">{admin.name}</div>
                    <div className="text-[10px] opacity-70">
                      {admin.role} · {admin.email}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: JUMUAH SCHEDULE */}
      {activeSection === 'jumuah' && (
        <div
          className={`p-5 rounded-2xl border space-y-4 shadow-md ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
          }`}
        >
          <div>
            <h3
              className={`font-['Cinzel'] text-base font-bold tracking-wide ${
                isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
              }`}
            >
              Friday Jumu’ah Schedule & Khateebs
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Broadcasts to lobby TV entrance screen on Thursdays and Fridays
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className={`p-3.5 rounded-xl border space-y-1.5 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020805] border-slate-800'
              }`}
            >
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">
                1st Jumu’ah Shift
              </span>
              <div className="font-bold text-sm">1:15 PM Khutbah · 1:45 PM Salah</div>
              <div className="text-xs opacity-75">Khateeb: Sheikh Omar Suleiman</div>
            </div>

            <div
              className={`p-3.5 rounded-xl border space-y-1.5 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020805] border-slate-800'
              }`}
            >
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider block">
                2nd Jumu’ah Shift
              </span>
              <div className="font-bold text-sm">2:15 PM Khutbah · 2:45 PM Salah</div>
              <div className="text-xs opacity-75">Khateeb: Dr. Tariq Al-Mansoor</div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CONTACT DEVELOPER */}
      {activeSection === 'support' && (
        <div
          className={`p-5 rounded-2xl border space-y-4 shadow-md ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
          }`}
        >
          <div>
            <h3
              className={`font-['Cinzel'] text-base font-bold tracking-wide ${
                isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
              }`}
            >
              Contact Developer & Kiosk Hardware Support
            </h3>
            <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Direct channel to the single developer maintaining MasjidAlert as Sadaqah
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Support ticket submitted directly to developer. Insha’Allah will respond within 4 hours.');
            }}
            className="space-y-3"
          >
            <div>
              <label className="text-[11px] font-semibold block mb-1 opacity-80">
                Inquiry Category
              </label>
              <select
                className={`w-full p-2.5 rounded-xl text-xs border outline-none ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-[#020805] border-slate-800 text-slate-200'
                }`}
              >
                <option>Lobby TV Kiosk Hardware / HDMI Pairing</option>
                <option>Bug Report or Mobile Push Issue</option>
                <option>Feature Request for Imam Control Panel</option>
                <option>Account Credentials & Co-Admin Help</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold block mb-1 opacity-80">Message</label>
              <textarea
                required
                rows={3}
                placeholder="Describe what you need assistance with..."
                className={`w-full p-2.5 rounded-xl text-xs border outline-none ${
                  isLight ? 'bg-white border-slate-300' : 'bg-[#020805] border-slate-800'
                }`}
              />
            </div>

            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl text-xs font-bold ${
                isLight ? 'bg-[#8C630D] text-white' : 'bg-[#FFDF78] text-black'
              }`}
            >
              Submit Support Ticket
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
