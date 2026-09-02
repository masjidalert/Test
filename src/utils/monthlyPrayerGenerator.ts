import { PrayerTime } from '../types';

export interface DayPrayerSchedule {
  dayOfMonth: number;
  dayOfWeek: string;
  isFriday: boolean;
  dateStr: string; // "Sep 01"
  fullDateStr: string; // "Tuesday, Sep 1, 2026"
  hijriDateStr: string; // "19 Safar 1448"
  fajrAthan: string;
  fajrIqamah: string;
  shuruq: string;
  dhuhrAthan: string;
  dhuhrIqamah: string;
  asrAthan: string;
  asrIqamah: string;
  maghribAthan: string;
  maghribIqamah: string;
  ishaAthan: string;
  ishaIqamah: string;
  jumuah1?: string;
  jumuah2?: string;
  notes?: string;
}

export interface MonthTimetableConfig {
  monthIndex: number; // 0 = Jan, 8 = Sep
  year: number; // 2026
  fajrIqamahRule: { type: 'fixed' | 'offset'; fixedTime: string; offsetMinutes: number };
  dhuhrIqamahRule: { type: 'fixed' | 'offset'; fixedTime: string; offsetMinutes: number };
  asrIqamahRule: { type: 'fixed' | 'offset'; fixedTime: string; offsetMinutes: number };
  maghribIqamahRule: { type: 'fixed' | 'offset'; fixedTime: string; offsetMinutes: number };
  ishaIqamahRule: { type: 'fixed' | 'offset'; fixedTime: string; offsetMinutes: number };
  jumuah1Time: string;
  jumuah2Time: string;
  customDayOverrides?: Record<number, Partial<DayPrayerSchedule>>;
}

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const HIJRI_MONTH_MAP: Record<number, string> = {
  0: 'Rajab / Sha\'ban 1447',
  1: 'Sha\'ban / Ramadan 1447',
  2: 'Ramadan / Shawwal 1447',
  3: 'Shawwal / Dhu al-Qi\'dah 1447',
  4: 'Dhu al-Qi\'dah / Dhu al-Hijjah 1447',
  5: 'Dhu al-Hijjah 1447 / Muharram 1448',
  6: 'Muharram / Safar 1448',
  7: 'Safar / Rabi\' al-Awwal 1448',
  8: 'Rabi\' al-Awwal / Rabi\' al-Thani 1448',
  9: 'Rabi\' al-Thani / Jumada al-Awwal 1448',
  10: 'Jumada al-Awwal / Jumada al-Thani 1448',
  11: 'Jumada al-Thani / Rajab 1448',
};

// Base solar curve approximations for mid-latitude (e.g., ~32.7°N Dallas/Arlington)
export function calculateAstronomicalAthanTimes(year: number, monthIndex: number, day: number) {
  // Day of year calculation
  const startOfYear = new Date(year, 0, 1);
  const targetDate = new Date(year, monthIndex, day);
  const dayOfYear = Math.floor((targetDate.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Seasonal solar declination sinusoidal approximation
  const seasonalFactor = Math.sin(((dayOfYear - 80) / 365) * 2 * Math.PI); // -1 in winter, +1 in summer

  // Base minutes from midnight
  // Winter Fajr ~ 5:50 AM (350 min), Summer Fajr ~ 4:40 AM (280 min)
  const fajrMin = Math.round(315 - seasonalFactor * 35);
  // Shuruq ~ 7:15 AM winter, 6:15 AM summer
  const shuruqMin = Math.round(405 - seasonalFactor * 30);
  // Dhuhr solar noon ~ 12:25 PM (745 min) +/- 10 min equation of time
  const dhuhrMin = Math.round(745 + Math.sin((dayOfYear / 182) * Math.PI) * 10);
  // Asr (Standard Shafi/Hanbali/Maliki shadow ratio 1:1) ~ 3:45 PM winter (945 min), 5:15 PM summer (1035 min)
  const asrMin = Math.round(990 + seasonalFactor * 45);
  // Maghrib (Sunset) ~ 5:30 PM winter (1050 min), 8:35 PM summer (1235 min)
  const maghribMin = Math.round(1142 + seasonalFactor * 92);
  // Isha (18 deg twilight) ~ 6:50 PM winter (1130 min), 10:00 PM summer (1320 min)
  const ishaMin = Math.round(1225 + seasonalFactor * 95);

  return {
    fajrMin,
    shuruqMin,
    dhuhrMin,
    asrMin,
    maghribMin,
    ishaMin,
    fajr: formatMinutesTo12h(fajrMin),
    shuruq: formatMinutesTo12h(shuruqMin),
    dhuhr: formatMinutesTo12h(dhuhrMin),
    asr: formatMinutesTo12h(asrMin),
    maghrib: formatMinutesTo12h(maghribMin),
    isha: formatMinutesTo12h(ishaMin),
  };
}

export function formatMinutesTo12h(totalMinutes: number): string {
  let mins = Math.floor(totalMinutes) % (24 * 60);
  if (mins < 0) mins += 24 * 60;
  let hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

export function parse12hToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const cleaned = timeStr.trim().toUpperCase();
  const isPM = cleaned.includes('PM');
  const isAM = cleaned.includes('AM');
  const numbersOnly = cleaned.replace(/[^0-9:]/g, '');
  const parts = numbersOnly.split(':');
  let h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;

  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;

  return h * 60 + m;
}

export function generateMonthlyTimetable(config: MonthTimetableConfig): DayPrayerSchedule[] {
  const { monthIndex, year, fajrIqamahRule, dhuhrIqamahRule, asrIqamahRule, maghribIqamahRule, ishaIqamahRule, jumuah1Time, jumuah2Time, customDayOverrides } = config;

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const schedule: DayPrayerSchedule[] = [];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, monthIndex, day);
    const dayOfWeek = dayNames[d.getDay()];
    const isFriday = d.getDay() === 5;
    const dateStr = `${MONTH_NAMES[monthIndex].slice(0, 3)} ${day.toString().padStart(2, '0')}`;
    const fullDateStr = `${fullDayNames[d.getDay()]}, ${MONTH_NAMES[monthIndex]} ${day}, ${year}`;

    // Astronomical Athan
    const athan = calculateAstronomicalAthanTimes(year, monthIndex, day);

    // Compute Iqamah by Rule
    const fajrIqamah = fajrIqamahRule.type === 'fixed'
      ? fajrIqamahRule.fixedTime
      : formatMinutesTo12h(athan.fajrMin + fajrIqamahRule.offsetMinutes);

    const dhuhrIqamah = dhuhrIqamahRule.type === 'fixed'
      ? dhuhrIqamahRule.fixedTime
      : formatMinutesTo12h(athan.dhuhrMin + dhuhrIqamahRule.offsetMinutes);

    const asrIqamah = asrIqamahRule.type === 'fixed'
      ? asrIqamahRule.fixedTime
      : formatMinutesTo12h(athan.asrMin + asrIqamahRule.offsetMinutes);

    const maghribIqamah = maghribIqamahRule.type === 'fixed'
      ? maghribIqamahRule.fixedTime
      : formatMinutesTo12h(athan.maghribMin + maghribIqamahRule.offsetMinutes);

    const ishaIqamah = ishaIqamahRule.type === 'fixed'
      ? ishaIqamahRule.fixedTime
      : formatMinutesTo12h(athan.ishaMin + ishaIqamahRule.offsetMinutes);

    // Approximate Hijri Day
    // Reference: Sept 1, 2026 ≈ 19 Safar 1448
    const approxHijriDay = ((day + 18) % 30) + 1;
    const hijriMonthName = monthIndex === 8 ? (day < 12 ? 'Safar' : 'Rabi\' I') : 'Hijri';
    const hijriDateStr = `${approxHijriDay} ${hijriMonthName} 1448`;

    let item: DayPrayerSchedule = {
      dayOfMonth: day,
      dayOfWeek,
      isFriday,
      dateStr,
      fullDateStr,
      hijriDateStr,
      fajrAthan: athan.fajr,
      fajrIqamah,
      shuruq: athan.shuruq,
      dhuhrAthan: athan.dhuhr,
      dhuhrIqamah,
      asrAthan: athan.asr,
      asrIqamah,
      maghribAthan: athan.maghrib,
      maghribIqamah,
      ishaAthan: athan.isha,
      ishaIqamah,
      jumuah1: isFriday ? jumuah1Time : undefined,
      jumuah2: isFriday ? jumuah2Time : undefined,
    };

    // Apply custom override if any
    if (customDayOverrides && customDayOverrides[day]) {
      item = { ...item, ...customDayOverrides[day] };
    }

    schedule.push(item);
  }

  return schedule;
}

export const DEFAULT_MONTH_CONFIG: MonthTimetableConfig = {
  monthIndex: 8, // September 2026
  year: 2026,
  fajrIqamahRule: { type: 'fixed', fixedTime: '5:45 AM', offsetMinutes: 20 },
  dhuhrIqamahRule: { type: 'fixed', fixedTime: '1:30 PM', offsetMinutes: 15 },
  asrIqamahRule: { type: 'fixed', fixedTime: '5:15 PM', offsetMinutes: 15 },
  maghribIqamahRule: { type: 'offset', fixedTime: '7:55 PM', offsetMinutes: 5 },
  ishaIqamahRule: { type: 'fixed', fixedTime: '9:30 PM', offsetMinutes: 15 },
  jumuah1Time: '1:15 PM',
  jumuah2Time: '2:15 PM',
};
