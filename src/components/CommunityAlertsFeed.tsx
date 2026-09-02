import React, { useState } from 'react';
import { CommunityAlert, AlertType, JanazahAlertData } from '../types';
import { ALL_ALERT_TYPES_META } from '../data/mobileData';
import { DignifiedJanazahCard } from './DignifiedJanazahCard';
import {
  Bell,
  ShieldCheck,
  MapPin,
  Calendar,
  Heart,
  Users,
  ExternalLink,
  BookOpen,
  Mic,
  Clock,
  EyeOff,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'motion/react';

interface CommunityAlertsFeedProps {
  alerts: CommunityAlert[];
  isLight?: boolean;
  followedMasjidCount?: number;
  onOpenJanazahDetail: (data: JanazahAlertData) => void;
  onOpenMasjidsTab: () => void;
}

export const CommunityAlertsFeed: React.FC<CommunityAlertsFeedProps> = ({
  alerts,
  isLight = false,
  followedMasjidCount = 3,
  onOpenJanazahDetail,
  onOpenMasjidsTab,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | AlertType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [duasGiven, setDuasGiven] = useState<Record<string, number>>({});

  const handlePrayDua = (alertId: string) => {
    setDuasGiven((prev) => ({
      ...prev,
      [alertId]: (prev[alertId] || 0) + 1,
    }));
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesFilter = selectedFilter === 'all' || alert.type === selectedFilter;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.masjidName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className={`font-['Cinzel'] text-xl font-bold tracking-wide ${
              isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
            }`}
          >
            Community Alerts
          </h2>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Cross-masjid network · Following {followedMasjidCount} masjids
          </p>
        </div>

        <button
          onClick={onOpenMasjidsTab}
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
            isLight
              ? 'bg-[#FAF4E8] border-[#8C630D] text-[#8C630D]'
              : 'bg-[#0E3524] border-[#FFDF78] text-[#FFDF78]'
          }`}
        >
          Manage Masjids →
        </button>
      </div>

      {/* Filter Chips / Tabs (All + 10 Categories) */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedFilter === 'all'
              ? isLight
                ? 'bg-[#8C630D] text-white shadow-sm'
                : 'bg-[#FFDF78] text-[#040E0A] shadow-md'
              : isLight
              ? 'bg-white border border-slate-200 text-slate-700'
              : 'bg-[#05140E] border border-slate-800 text-slate-300'
          }`}
        >
          All Alerts ({alerts.length})
        </button>

        {ALL_ALERT_TYPES_META.map((meta) => {
          const isSelected = selectedFilter === meta.type;
          const count = alerts.filter((a) => a.type === meta.type).length;
          if (count === 0 && selectedFilter !== meta.type) return null;

          return (
            <button
              key={meta.type}
              onClick={() => setSelectedFilter(meta.type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 transition-all ${
                isSelected
                  ? isLight
                    ? 'bg-[#8C630D] text-white shadow-sm'
                    : 'bg-[#FFDF78] text-[#040E0A] shadow-md font-bold'
                  : isLight
                  ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-[#05140E] border border-slate-800 text-slate-300 hover:bg-[#092218]'
              }`}
            >
              <span>{meta.icon}</span>
              <span>{meta.label}</span>
              <span className="opacity-60 text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Search Filter input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter alerts by keyword, topic or masjid..."
          className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border outline-none ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 focus:border-[#8C630D]'
              : 'bg-[#05140E] border-slate-800 text-slate-100 focus:border-[#C5A059]'
          }`}
        />
      </div>

      {/* EMPTY STATE */}
      {filteredAlerts.length === 0 && (
        <div
          className={`p-8 rounded-2xl border text-center space-y-3 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#05140E] border-slate-800'
          }`}
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-xl">
            📭
          </div>
          <div>
            <h3 className="font-bold text-sm">No Alerts in this Category</h3>
            <p className="text-xs opacity-70 mt-1">
              You are currently following {followedMasjidCount} masjids. Try choosing another filter or follow more masjids in your directory.
            </p>
          </div>
          <button
            onClick={onOpenMasjidsTab}
            className={`px-4 py-2 rounded-xl text-xs font-bold ${
              isLight ? 'bg-[#8C630D] text-white' : 'bg-[#FFDF78] text-black'
            }`}
          >
            Explore Masjids Directory
          </button>
        </div>
      )}

      {/* ALERT CARDS LIST */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          // If Janazah, render the Dignified Janazah Card
          if (alert.type === 'janazah' && alert.janazahData) {
            return (
              <DignifiedJanazahCard
                key={alert.id}
                data={alert.janazahData}
                isLight={isLight}
                onOpenDetails={onOpenJanazahDetail}
                compact={false}
              />
            );
          }

          // Render other 9 category cards
          const isUrgent = alert.type === 'urgent_aid';
          const isCommunityAid = alert.type === 'community_aid';
          const isCharity = alert.type === 'charity';
          const isLecture = alert.type === 'lecture';
          const isLearning = alert.type === 'learning';
          const isEvent = alert.type === 'event';
          const isVolunteer = alert.type === 'volunteer';
          const isPrayerChange = alert.type === 'prayer_change';

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-2xl border transition-all ${
                isUrgent
                  ? isLight
                    ? 'bg-rose-50 border-rose-300 shadow-sm'
                    : 'bg-[#1C080B] border-rose-800 shadow-md'
                  : isCommunityAid
                  ? isLight
                    ? 'bg-[#FAF6F0] border-amber-300 shadow-sm'
                    : 'bg-[#160E05] border-amber-800 shadow-md'
                  : isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-[#05140E] border-slate-800'
              }`}
            >
              {/* Top Card Meta: Mosque & Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isUrgent
                        ? 'bg-rose-500/20 text-rose-500'
                        : isCommunityAid
                        ? 'bg-amber-500/20 text-amber-500'
                        : isCharity
                        ? 'bg-teal-500/20 text-teal-500'
                        : 'bg-emerald-500/20 text-emerald-500'
                    }`}
                  >
                    {isUrgent ? '🆘' : isCommunityAid ? '🤲' : isCharity ? '💚' : isLecture ? '🎤' : isLearning ? '📖' : isVolunteer ? '🙋' : isPrayerChange ? '⏰' : '📢'}
                  </div>
                  <div>
                    <span className="font-bold text-xs block">{alert.masjidName}</span>
                    <span className="text-[10px] opacity-60">{alert.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  {alert.badge && (
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isUrgent
                          ? 'bg-rose-600 text-white'
                          : isCommunityAid
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {alert.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-bold text-xs sm:text-sm leading-snug">{alert.title}</h3>
              {alert.subtitle && (
                <div className="text-[11px] font-medium text-[#C5A059] mt-0.5">
                  {alert.subtitle}
                </div>
              )}

              {/* Discreet Mode Safety Banner for Community Aid */}
              {isCommunityAid && alert.discreetMode && (
                <div
                  className={`mt-2.5 p-2.5 rounded-xl border text-[11px] flex items-start space-x-2 ${
                    isLight
                      ? 'bg-amber-100/70 border-amber-300 text-amber-950'
                      : 'bg-amber-950/60 border-amber-600/50 text-amber-200'
                  }`}
                >
                  <EyeOff className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                  <div>
                    <span className="font-bold block">Discreet Mode Active:</span>
                    <span>
                      Family identity is strictly protected by Admin. This emergency request is{' '}
                      <strong>never shown on the public lobby TV display</strong>.
                    </span>
                  </div>
                </div>
              )}

              {/* Body Text */}
              <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {alert.body}
              </p>

              {/* Charity Progress Bar */}
              {isCharity && alert.goalAmount && alert.raisedAmount && (
                <div className="mt-3 pt-2 border-t border-opacity-15 border-current">
                  <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                    <span>${alert.raisedAmount.toLocaleString()} Raised</span>
                    <span className="opacity-70">${alert.goalAmount.toLocaleString()} Goal</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-700/30 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${Math.min(100, (alert.raisedAmount / alert.goalAmount) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Metadata Details (Date, Time, Speaker) */}
              {(alert.eventDate || alert.speaker || alert.volunteerSlotsTotal) && (
                <div
                  className={`mt-2.5 p-2.5 rounded-xl border text-[11px] grid grid-cols-2 gap-2 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020805] border-slate-800'
                  }`}
                >
                  {alert.eventDate && (
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{alert.eventDate} ({alert.eventTime})</span>
                    </div>
                  )}
                  {alert.speaker && (
                    <div className="flex items-center space-x-1.5">
                      <Mic className="w-3.5 h-3.5 text-purple-400" />
                      <span>{alert.speaker}</span>
                    </div>
                  )}
                  {alert.volunteerSlotsTotal && (
                    <div className="flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{alert.volunteerSlotsFilled} of {alert.volunteerSlotsTotal} Slots Filled</span>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-opacity-15 border-current flex items-center justify-between">
                <button
                  onClick={() => handlePrayDua(alert.id)}
                  className={`text-xs font-semibold flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                    duasGiven[alert.id]
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                      : isLight
                      ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>🤲</span>
                  <span>{duasGiven[alert.id] ? `Du’ā Sent (${duasGiven[alert.id]})` : 'Make Du’ā'}</span>
                </button>

                {alert.donationUrl && (
                  <a
                    href={alert.donationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center space-x-1 shadow ${
                      isLight ? 'bg-[#0D5C3A] text-white' : 'bg-[#FFDF78] text-black'
                    }`}
                  >
                    <span>Donate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
