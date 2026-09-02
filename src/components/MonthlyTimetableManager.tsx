import React, { useState, useMemo } from 'react';
import { MosqueProfile } from '../types';
import {
  generateMonthlyTimetable,
  MONTH_NAMES,
  HIJRI_MONTH_MAP,
  DEFAULT_MONTH_CONFIG,
  MonthTimetableConfig,
  DayPrayerSchedule,
} from '../utils/monthlyPrayerGenerator';
import { RubElHizbStar, OrnateCorner, IslamicDivider } from './ArabesquePatterns';
import { MasjidAlertBrandIcon } from './MasjidAlertBrandIcon';
import {
  Calendar,
  Clock,
  Printer,
  UploadCloud,
  CheckCircle2,
  Sliders,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  Edit2,
  RotateCcw,
  Download,
  Share2,
  Tv,
  Smartphone,
  Eye,
  X,
} from 'lucide-react';

interface MonthlyTimetableManagerProps {
  isLight?: boolean;
  activeMasjid: MosqueProfile;
  onPublishToAppAndKiosk: (updatedIqamahTimes: MosqueProfile['iqamahTimes']) => void;
}

export const MonthlyTimetableManager: React.FC<MonthlyTimetableManagerProps> = ({
  isLight = false,
  activeMasjid,
  onPublishToAppAndKiosk,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(8); // 8 = September
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [config, setConfig] = useState<MonthTimetableConfig>({
    ...DEFAULT_MONTH_CONFIG,
    monthIndex: 8,
    year: 2026,
    fajrIqamahRule: { type: 'fixed', fixedTime: activeMasjid.iqamahTimes.fajr || '5:45 AM', offsetMinutes: 20 },
    dhuhrIqamahRule: { type: 'fixed', fixedTime: activeMasjid.iqamahTimes.dhuhr || '1:30 PM', offsetMinutes: 15 },
    asrIqamahRule: { type: 'fixed', fixedTime: activeMasjid.iqamahTimes.asr || '5:15 PM', offsetMinutes: 15 },
    maghribIqamahRule: { type: 'offset', fixedTime: activeMasjid.iqamahTimes.maghrib || '7:55 PM', offsetMinutes: 5 },
    ishaIqamahRule: { type: 'fixed', fixedTime: activeMasjid.iqamahTimes.isha || '9:30 PM', offsetMinutes: 15 },
    jumuah1Time: activeMasjid.iqamahTimes.jumuah1 || '1:15 PM',
    jumuah2Time: activeMasjid.iqamahTimes.jumuah2 || '2:15 PM',
  });

  const [overrides, setOverrides] = useState<Record<number, Partial<DayPrayerSchedule>>>({});
  const [showConfigDrawer, setShowConfigDrawer] = useState<boolean>(false);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);
  const [editingDay, setEditingDay] = useState<number | null>(null);

  // Generate the 30/31-day timetable
  const timetable = useMemo(() => {
    return generateMonthlyTimetable({
      ...config,
      monthIndex: selectedMonth,
      year: selectedYear,
      customDayOverrides: overrides,
    });
  }, [config, selectedMonth, selectedYear, overrides]);

  // Handle month change
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  // Publish to App & Kiosk
  const handlePublish = () => {
    setIsPublishing(true);

    // Get current day's iqamah or representative iqamah
    const currentDaySchedule = timetable[0] || {
      fajrIqamah: config.fajrIqamahRule.fixedTime,
      dhuhrIqamah: config.dhuhrIqamahRule.fixedTime,
      asrIqamah: config.asrIqamahRule.fixedTime,
      maghribIqamah: '5 min after Sunset',
      ishaIqamah: config.ishaIqamahRule.fixedTime,
    };

    const newIqamahTimes: MosqueProfile['iqamahTimes'] = {
      fajr: currentDaySchedule.fajrIqamah,
      dhuhr: currentDaySchedule.dhuhrIqamah,
      asr: currentDaySchedule.asrIqamah,
      maghrib: currentDaySchedule.maghribIqamah,
      isha: currentDaySchedule.ishaIqamah,
      jumuah1: config.jumuah1Time,
      jumuah2: config.jumuah2Time,
    };

    setTimeout(() => {
      onPublishToAppAndKiosk(newIqamahTimes);
      setIsPublishing(false);
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 5000);
    }, 600);
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-5">
      {/* Top Banner & Control Bar */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
          isLight
            ? 'bg-white border-[#8C630D]/30 shadow-sm text-slate-800'
            : 'bg-[#04110B] border-[#2A5C47] shadow-xl text-slate-100'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Month Selector & Title */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
              <RubElHizbStar size={14} />
              <span>Year-Round Monthly Timetable Manager</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                className={`p-2 rounded-xl border transition-all hover:scale-105 ${
                  isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-[#0E271D] border-[#2A5C47] text-[#FFDF78]'
                }`}
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-left">
                <h2 className="font-['Cinzel'] text-xl sm:text-2xl font-bold tracking-wide">
                  {MONTH_NAMES[selectedMonth]} {selectedYear}
                </h2>
                <p className="text-xs text-amber-400/90 font-medium">
                  {HIJRI_MONTH_MAP[selectedMonth] || '1448 AH'} · Astronomical Athan & Custom Iqamah
                </p>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className={`p-2 rounded-xl border transition-all hover:scale-105 ${
                  isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-[#0E271D] border-[#2A5C47] text-[#FFDF78]'
                }`}
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons: Configure Iqamah Rules, Print Schedule, Publish */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowConfigDrawer(!showConfigDrawer)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 border transition-all ${
                showConfigDrawer
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-[#0E271D] hover:bg-[#143B2C] border-[#2A5C47] text-slate-200'
              }`}
            >
              <Sliders className="w-4 h-4 text-[#FFDF78]" />
              <span>{showConfigDrawer ? 'Hide Iqamah Rules' : 'Edit Iqamah Rules'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPrintModal(true)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 border transition-all ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-[#0E271D] hover:bg-[#143B2C] border-[#2A5C47] text-[#FFDF78]'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Print Monthly Schedule</span>
            </button>

            <button
              type="button"
              onClick={handlePublish}
              disabled={isPublishing}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-lg transition-all transform hover:scale-[1.02] ${
                isLight
                  ? 'bg-[#0D5C3A] hover:bg-[#09472C] text-white shadow-emerald-900/20'
                  : 'bg-[#FFDF78] hover:bg-[#FFEAA0] text-[#0A2218] shadow-[0_0_20px_rgba(255,223,120,0.3)]'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>{isPublishing ? 'Broadcasting...' : 'Publish to App & TV Kiosk'}</span>
            </button>
          </div>
        </div>

        {/* Sync Success Feedback */}
        {publishSuccess && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>
                <strong>Published Successfully!</strong> {MONTH_NAMES[selectedMonth]} {selectedYear} prayer timetable and Iqamah shifts are now live on subscriber smartphones and lobby TV kiosks.
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] opacity-80">
              <span className="flex items-center space-x-1"><Smartphone className="w-3.5 h-3.5" /> 2,840 Apps</span>
              <span className="flex items-center space-x-1"><Tv className="w-3.5 h-3.5" /> Lobby Kiosk</span>
            </div>
          </div>
        )}
      </div>

      {/* Iqamah Rules Configuration Suite (Expandable Drawer) */}
      {showConfigDrawer && (
        <div
          className={`p-5 rounded-2xl border space-y-4 transition-all ${
            isLight
              ? 'bg-amber-50/70 border-amber-300 text-slate-800'
              : 'bg-[#0A2419] border-[#C5A059]/40 text-slate-100 shadow-xl'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-[#FFDF78]" />
              <h3 className="font-['Cinzel'] font-bold text-sm sm:text-base">
                Global Iqamah Automation & Shift Rules for {MONTH_NAMES[selectedMonth]}
              </h3>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              Auto-Applies to All {timetable.length} Days
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Fajr Rule */}
            <div
              className={`p-3.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
              }`}
            >
              <label className="text-xs font-bold block mb-1 text-emerald-500">Fajr Iqamah</label>
              <div className="space-y-2">
                <select
                  value={config.fajrIqamahRule.type}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      fajrIqamahRule: { ...config.fajrIqamahRule, type: e.target.value as any },
                    })
                  }
                  className={`w-full px-2.5 py-1.5 rounded-lg text-xs border outline-none ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E271D] border-[#2A5C47]'
                  }`}
                >
                  <option value="fixed">Fixed Time</option>
                  <option value="offset">Offset after Athan</option>
                </select>

                {config.fajrIqamahRule.type === 'fixed' ? (
                  <input
                    type="text"
                    value={config.fajrIqamahRule.fixedTime}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        fajrIqamahRule: { ...config.fajrIqamahRule, fixedTime: e.target.value },
                      })
                    }
                    placeholder="5:45 AM"
                    className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-mono border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E271D] border-[#2A5C47]'
                    }`}
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">+</span>
                    <input
                      type="number"
                      value={config.fajrIqamahRule.offsetMinutes}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          fajrIqamahRule: { ...config.fajrIqamahRule, offsetMinutes: Number(e.target.value) },
                        })
                      }
                      className={`w-20 px-2.5 py-1.5 rounded-lg text-xs font-mono border outline-none ${
                        isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E271D] border-[#2A5C47]'
                      }`}
                    />
                    <span className="text-xs opacity-75">mins after Athan</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dhuhr Rule */}
            <div
              className={`p-3.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
              }`}
            >
              <label className="text-xs font-bold block mb-1 text-emerald-500">Dhuhr Iqamah</label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={config.dhuhrIqamahRule.fixedTime}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      dhuhrIqamahRule: { ...config.dhuhrIqamahRule, fixedTime: e.target.value },
                    })
                  }
                  placeholder="1:30 PM"
                  className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-mono border outline-none ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E271D] border-[#2A5C47]'
                  }`}
                />
                <p className="text-[10px] opacity-60">Standard midday congregation</p>
              </div>
            </div>

            {/* Asr Rule */}
            <div
              className={`p-3.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
              }`}
            >
              <label className="text-xs font-bold block mb-1 text-emerald-500">Asr Iqamah</label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={config.asrIqamahRule.fixedTime}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      asrIqamahRule: { ...config.asrIqamahRule, fixedTime: e.target.value },
                    })
                  }
                  placeholder="5:15 PM"
                  className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-mono border outline-none ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E271D] border-[#2A5C47]'
                  }`}
                />
                <p className="text-[10px] opacity-60">Shafi/Hanbali/Maliki standard</p>
              </div>
            </div>

            {/* Maghrib Rule (Usually +5 min) */}
            <div
              className={`p-3.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
              }`}
            >
              <label className="text-xs font-bold block mb-1 text-emerald-500">Maghrib Iqamah</label>
              <div className="flex items-center space-x-2">
                <span className="text-xs">+</span>
                <input
                  type="number"
                  value={config.maghribIqamahRule.offsetMinutes}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      maghribIqamahRule: { ...config.maghribIqamahRule, offsetMinutes: Number(e.target.value) },
                    })
                  }
                  className={`w-20 px-2.5 py-1.5 rounded-lg text-xs font-mono border outline-none ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E271D] border-[#2A5C47]'
                  }`}
                />
                <span className="text-xs font-bold opacity-80">mins after Sunset Athan</span>
              </div>
              <p className="text-[10px] opacity-60 mt-1">Direct sunnah congregation</p>
            </div>

            {/* Isha Rule */}
            <div
              className={`p-3.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
              }`}
            >
              <label className="text-xs font-bold block mb-1 text-emerald-500">Isha Iqamah</label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={config.ishaIqamahRule.fixedTime}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      ishaIqamahRule: { ...config.ishaIqamahRule, fixedTime: e.target.value },
                    })
                  }
                  placeholder="9:30 PM"
                  className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-mono border outline-none ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E271D] border-[#2A5C47]'
                  }`}
                />
                <p className="text-[10px] opacity-60">Night congregational prayer</p>
              </div>
            </div>

            {/* Jumu'ah 1 & 2 Shifts */}
            <div
              className={`p-3.5 rounded-xl border ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-slate-800'
              }`}
            >
              <label className="text-xs font-bold block mb-1 text-amber-400">Friday Jumu’ah Shifts</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] block opacity-70">1st Khutbah</span>
                  <input
                    type="text"
                    value={config.jumuah1Time}
                    onChange={(e) => setConfig({ ...config, jumuah1Time: e.target.value })}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-mono border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E271D] border-[#2A5C47]'
                    }`}
                  />
                </div>
                <div>
                  <span className="text-[10px] block opacity-70">2nd Khutbah</span>
                  <input
                    type="text"
                    value={config.jumuah2Time}
                    onChange={(e) => setConfig({ ...config, jumuah2Time: e.target.value })}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-mono border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#0E271D] border-[#2A5C47]'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Prayer Grid Table */}
      <div
        className={`rounded-2xl border overflow-hidden shadow-md ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#04110B] border-[#2A5C47]'
        }`}
      >
        <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-inherit">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-[#FFDF78]" />
            <h3 className="font-['Cinzel'] font-bold text-sm tracking-wide">
              {MONTH_NAMES[selectedMonth]} {selectedYear} Day-by-Day Schedule
            </h3>
          </div>
          <span className="text-[11px] opacity-70">
            Click any cell or edit button to customize a specific day (e.g. Ramadan, Eid, or Eclipse)
          </span>
        </div>

        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead
              className={`sticky top-0 z-10 text-[11px] font-['Cinzel'] font-bold uppercase tracking-wider ${
                isLight ? 'bg-slate-100 text-slate-700' : 'bg-[#082015] text-[#FFDF78] border-b border-[#2A5C47]'
              }`}
            >
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-2">Hijri</th>
                <th className="py-2.5 px-2 bg-emerald-950/20">Fajr Athan</th>
                <th className="py-2.5 px-2 bg-emerald-900/30 text-[#FFDF78]">Fajr Iqamah</th>
                <th className="py-2.5 px-2">Sunrise</th>
                <th className="py-2.5 px-2">Dhuhr Athan</th>
                <th className="py-2.5 px-2 text-[#FFDF78]">Dhuhr Iqamah</th>
                <th className="py-2.5 px-2">Asr Athan</th>
                <th className="py-2.5 px-2 text-[#FFDF78]">Asr Iqamah</th>
                <th className="py-2.5 px-2">Maghrib</th>
                <th className="py-2.5 px-2 text-[#FFDF78]">Maghrib Iqamah</th>
                <th className="py-2.5 px-2">Isha Athan</th>
                <th className="py-2.5 px-2 text-[#FFDF78]">Isha Iqamah</th>
                <th className="py-2.5 px-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {timetable.map((row) => {
                const isEditing = editingDay === row.dayOfMonth;
                const isFriday = row.isFriday;

                return (
                  <tr
                    key={row.dayOfMonth}
                    className={`transition-colors font-mono ${
                      isFriday
                        ? isLight
                          ? 'bg-amber-50/80 font-semibold'
                          : 'bg-[#142A1E]/80 text-[#FFDF78]'
                        : isLight
                        ? 'hover:bg-slate-50 text-slate-700'
                        : 'hover:bg-[#071A12] text-slate-200'
                    }`}
                  >
                    <td className="py-2 px-3 font-sans font-bold whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        {isFriday && <span className="text-[10px] text-amber-500 font-bold">★</span>}
                        <span>{row.dateStr}</span>
                        <span className="text-[10px] opacity-60">({row.dayOfWeek})</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-[10px] whitespace-nowrap opacity-75">{row.hijriDateStr}</td>
                    
                    {/* Fajr */}
                    <td className="py-2 px-2 opacity-80">{row.fajrAthan}</td>
                    <td className="py-2 px-2 font-bold text-emerald-400">
                      {isEditing ? (
                        <input
                          type="text"
                          value={overrides[row.dayOfMonth]?.fajrIqamah || row.fajrIqamah}
                          onChange={(e) =>
                            setOverrides({
                              ...overrides,
                              [row.dayOfMonth]: { ...overrides[row.dayOfMonth], fajrIqamah: e.target.value },
                            })
                          }
                          className="w-20 px-1 py-0.5 text-xs bg-black/40 border rounded text-white"
                        />
                      ) : (
                        row.fajrIqamah
                      )}
                    </td>

                    {/* Shuruq */}
                    <td className="py-2 px-2 opacity-60 text-slate-400">{row.shuruq}</td>

                    {/* Dhuhr / Jumu'ah */}
                    <td className="py-2 px-2 opacity-80">{row.dhuhrAthan}</td>
                    <td className="py-2 px-2 font-bold text-amber-400">
                      {isFriday ? `Jumu’ah: ${row.jumuah1}` : row.dhuhrIqamah}
                    </td>

                    {/* Asr */}
                    <td className="py-2 px-2 opacity-80">{row.asrAthan}</td>
                    <td className="py-2 px-2 font-bold text-emerald-400">{row.asrIqamah}</td>

                    {/* Maghrib */}
                    <td className="py-2 px-2 opacity-80">{row.maghribAthan}</td>
                    <td className="py-2 px-2 font-bold text-emerald-400">{row.maghribIqamah}</td>

                    {/* Isha */}
                    <td className="py-2 px-2 opacity-80">{row.ishaAthan}</td>
                    <td className="py-2 px-2 font-bold text-emerald-400">{row.ishaIqamah}</td>

                    {/* Edit action */}
                    <td className="py-2 px-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setEditingDay(isEditing ? null : row.dayOfMonth)}
                        className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                      >
                        {isEditing ? 'Done' : 'Edit'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINT PREVIEW MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className={`w-full max-w-4xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden ${
              isLight ? 'bg-white text-slate-900 border-slate-300' : 'bg-[#0B1E17] text-slate-100 border-[#C5A059]'
            }`}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-inherit flex items-center justify-between bg-black/20">
              <div className="flex items-center space-x-2">
                <Printer className="w-5 h-5 text-[#FFDF78]" />
                <span className="font-['Cinzel'] font-bold text-base">
                  Monthly Prayer Timetable Print Sheet ({MONTH_NAMES[selectedMonth]} {selectedYear})
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleTriggerPrint}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Send to Printer (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Document Container (Styled for physical paper print) */}
            <div className="p-6 overflow-y-auto print:p-0 print:overflow-visible bg-white text-slate-900">
              {/* Masjid Printable Header */}
              <div className="text-center border-b-2 border-emerald-900 pb-4 mb-4">
                <div className="font-['Amiri'] text-2xl text-emerald-950 font-bold mb-1">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
                <h1 className="font-['Cinzel'] text-2xl font-bold text-emerald-950 tracking-wider">
                  {activeMasjid.name.toUpperCase()}
                </h1>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  {activeMasjid.address} · {activeMasjid.cityState} · Tel: {activeMasjid.phone} · {activeMasjid.website}
                </p>

                {/* Sub-Banner for Month */}
                <div className="mt-3 inline-flex items-center space-x-4 px-6 py-1.5 rounded-lg bg-emerald-900 text-[#FFDF78] font-['Cinzel'] font-bold text-sm tracking-widest uppercase">
                  <span>{MONTH_NAMES[selectedMonth]} {selectedYear}</span>
                  <span>•</span>
                  <span>{HIJRI_MONTH_MAP[selectedMonth] || '1448 AH'}</span>
                </div>
              </div>

              {/* Jumu'ah Shift Notice Banner */}
              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs">
                <div className="text-center">
                  <span className="font-bold text-amber-900 uppercase block font-['Cinzel']">1st Friday Jumu’ah Prayer</span>
                  <span className="text-sm font-mono font-bold text-slate-900">Khutbah: {config.jumuah1Time}</span>
                </div>
                <div className="text-center border-l border-amber-200">
                  <span className="font-bold text-amber-900 uppercase block font-['Cinzel']">2nd Friday Jumu’ah Prayer</span>
                  <span className="text-sm font-mono font-bold text-slate-900">Khutbah: {config.jumuah2Time}</span>
                </div>
              </div>

              {/* High-Contrast Print Table */}
              <table className="w-full text-center text-[10px] border-collapse border border-slate-400">
                <thead>
                  <tr className="bg-emerald-900 text-white font-bold font-['Cinzel'] uppercase">
                    <th className="border border-slate-400 py-1.5 px-1">Day</th>
                    <th className="border border-slate-400 py-1.5 px-1">Date</th>
                    <th className="border border-slate-400 py-1.5 px-1">Hijri</th>
                    <th className="border border-slate-400 py-1.5 px-1">Fajr Athan</th>
                    <th className="border border-slate-400 py-1.5 px-1 bg-emerald-800 text-[#FFDF78]">Fajr Iqamah</th>
                    <th className="border border-slate-400 py-1.5 px-1">Sunrise</th>
                    <th className="border border-slate-400 py-1.5 px-1">Dhuhr Athan</th>
                    <th className="border border-slate-400 py-1.5 px-1 bg-emerald-800 text-[#FFDF78]">Dhuhr Iqamah</th>
                    <th className="border border-slate-400 py-1.5 px-1">Asr Athan</th>
                    <th className="border border-slate-400 py-1.5 px-1 bg-emerald-800 text-[#FFDF78]">Asr Iqamah</th>
                    <th className="border border-slate-400 py-1.5 px-1">Maghrib</th>
                    <th className="border border-slate-400 py-1.5 px-1 bg-emerald-800 text-[#FFDF78]">Maghrib Iqamah</th>
                    <th className="border border-slate-400 py-1.5 px-1">Isha Athan</th>
                    <th className="border border-slate-400 py-1.5 px-1 bg-emerald-800 text-[#FFDF78]">Isha Iqamah</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((row, idx) => (
                    <tr
                      key={row.dayOfMonth}
                      className={row.isFriday ? 'bg-amber-100/70 font-bold' : idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                    >
                      <td className="border border-slate-300 py-1 px-1 font-bold">{row.dayOfWeek}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono">{row.dateStr}</td>
                      <td className="border border-slate-300 py-1 px-1">{row.hijriDateStr}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono">{row.fajrAthan}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono font-bold text-emerald-950">{row.fajrIqamah}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono text-slate-500">{row.shuruq}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono">{row.dhuhrAthan}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono font-bold text-emerald-950">
                        {row.isFriday ? 'Jumu’ah' : row.dhuhrIqamah}
                      </td>
                      <td className="border border-slate-300 py-1 px-1 font-mono">{row.asrAthan}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono font-bold text-emerald-950">{row.asrIqamah}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono">{row.maghribAthan}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono font-bold text-emerald-950">{row.maghribIqamah}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono">{row.ishaAthan}</td>
                      <td className="border border-slate-300 py-1 px-1 font-mono font-bold text-emerald-950">{row.ishaIqamah}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Printable Footer with Hadith & QR Code */}
              <div className="mt-4 pt-3 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-700">
                <div className="max-w-md">
                  <p className="italic">
                    "The prayer in congregation is twenty-seven times more superior than the prayer offered individually."
                  </p>
                  <p className="font-bold text-emerald-900 mt-0.5">— Sahih Al-Bukhari & Muslim</p>
                  <p className="text-[9px] text-slate-500 mt-1">
                    Published officially via MasjidAlert. Live sync to {activeMasjid.name} mobile subscribers.
                  </p>
                </div>

                <div className="flex items-center space-x-2 text-right">
                  <div>
                    <span className="font-bold block text-[10px] text-emerald-950">Get Live Masjid Alerts</span>
                    <span className="text-[9px] text-slate-500">Scan QR on iOS & Android</span>
                  </div>
                  {/* Decorative QR Container */}
                  <div className="w-12 h-12 border border-slate-400 bg-slate-900 text-[#FFDF78] flex items-center justify-center font-mono text-[8px] font-bold">
                    [QR CODE]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
