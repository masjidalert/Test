import { PrayerTime } from '../types';

export interface PrayerStateInfo {
  currentPrayer: PrayerTime | null;
  nextPrayer: PrayerTime;
  timeRemainingSeconds: number;
  formattedCountdown: string;
  isBetweenAthanAndIqamah: boolean;
  iqamahProgressPercent: number; // 0 to 100
  minutesUntilIqamah: number;
  isIshaComplete: boolean;
}

// Convert Date object to minutes from midnight
export function getMinutesFromMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
}

// Format seconds into HH:MM:SS with leading zeroes
export function formatHHMMSS(totalSeconds: number): string {
  if (totalSeconds < 0) totalSeconds = 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
}

// Calculate which prayer is past, current, and next
export function calculatePrayerState(prayerTimes: PrayerTime[], now: Date): PrayerStateInfo {
  const currentMinutes = getMinutesFromMidnight(now);
  const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  // Find non-shuruq prayers sorted by athanMinutes
  const mainPrayers = prayerTimes.filter(p => !p.isShuruq);

  let currentPrayer: PrayerTime | null = null;
  let nextPrayer: PrayerTime = mainPrayers[0]; // default to Fajr next day
  let targetSeconds = 0;
  let isBetweenAthanAndIqamah = false;
  let iqamahProgressPercent = 0;
  let minutesUntilIqamah = 0;
  let isIshaComplete = false;

  const ishaPrayer = prayerTimes.find(p => p.key === 'isha') || mainPrayers[mainPrayers.length - 1];
  const fajrPrayer = prayerTimes.find(p => p.key === 'fajr') || mainPrayers[0];

  // If after Isha iqamah (+ 20 mins) or before Fajr
  if (currentMinutes > (ishaPrayer.iqamahMinutes + 20) || currentMinutes < fajrPrayer.athanMinutes) {
    isIshaComplete = true;
    nextPrayer = fajrPrayer;
    
    // Target is Fajr tomorrow or today
    const fajrSeconds = fajrPrayer.athanMinutes * 60;
    if (currentMinutes < fajrPrayer.athanMinutes) {
      targetSeconds = fajrSeconds;
    } else {
      // Fajr tomorrow
      targetSeconds = (24 * 3600) + fajrSeconds;
    }
  } else {
    // Check between prayers
    for (let i = 0; i < mainPrayers.length; i++) {
      const p = mainPrayers[i];
      const nextP = mainPrayers[(i + 1) % mainPrayers.length];
      
      const pAthanSec = p.athanMinutes * 60;
      const pIqamahSec = p.iqamahMinutes * 60;

      if (currentSeconds >= pAthanSec && (i === mainPrayers.length - 1 || currentSeconds < mainPrayers[i + 1].athanMinutes * 60)) {
        currentPrayer = p;
        
        // Are we currently between Athan and Iqamah?
        if (currentSeconds < pIqamahSec) {
          isBetweenAthanAndIqamah = true;
          const totalDuration = pIqamahSec - pAthanSec;
          const elapsed = currentSeconds - pAthanSec;
          iqamahProgressPercent = Math.min(100, Math.max(0, (elapsed / (totalDuration || 1)) * 100));
          minutesUntilIqamah = Math.ceil((pIqamahSec - currentSeconds) / 60);
          
          nextPrayer = p; // focus on current prayer's iqamah
          targetSeconds = pIqamahSec;
        } else {
          // Athan & Iqamah have passed for this prayer, target next prayer's Athan
          nextPrayer = nextP;
          targetSeconds = (i === mainPrayers.length - 1) ? (24 * 3600 + nextP.athanMinutes * 60) : (nextP.athanMinutes * 60);
        }
        break;
      }
    }
  }

  // If no current prayer was found (e.g., right before Fajr)
  if (!currentPrayer && currentMinutes < fajrPrayer.athanMinutes) {
    nextPrayer = fajrPrayer;
    targetSeconds = fajrPrayer.athanMinutes * 60;
  }

  const timeRemainingSeconds = Math.max(0, targetSeconds - currentSeconds);
  const formattedCountdown = formatHHMMSS(timeRemainingSeconds);

  return {
    currentPrayer,
    nextPrayer,
    timeRemainingSeconds,
    formattedCountdown,
    isBetweenAthanAndIqamah,
    iqamahProgressPercent,
    minutesUntilIqamah,
    isIshaComplete,
  };
}

// Gregorian and Hijri formatted date string
export function getFormattedDates(date: Date): { gregorian: string; hijri: string; dayName: string } {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayNum = date.getDate();
  const year = date.getFullYear();

  const gregorian = `${dayName}, ${monthName} ${dayNum} ${year}`;
  
  // Approximate Hijri Calculation (1448 AH reference)
  // Safar / Rabi I 1448 AH for Aug 2026
  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
  ];
  
  // Aug 25 2026 is approx 12 Safar 1448 AH
  const hijriDay = 12 + ((dayNum - 25));
  const hijri = `${Math.max(1, (hijriDay % 30) || 12)} SAFAR 1448 AH`;

  return { gregorian, hijri, dayName };
}

// Format 12-hour clock with AM/PM
export function getClockComponents(date: Date): { hours: string; minutes: string; seconds: string; ampm: string } {
  let h = date.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // 0 becomes 12
  
  const hours = h.toString();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return { hours, minutes, seconds, ampm };
}

// Determines if it is daytime based on Shuruq (Sunrise) and Maghrib (Sunset) prayer times
export function isDaytimeByPrayer(prayerTimes: PrayerTime[], now: Date): boolean {
  const currentMinutes = getMinutesFromMidnight(now);
  
  const shuruq = prayerTimes.find((p) => p.key === 'shuruq') || prayerTimes.find((p) => p.key === 'fajr');
  const maghrib = prayerTimes.find((p) => p.key === 'maghrib');

  // Fallback defaults if prayer times aren't loaded: 6:30 AM to 7:45 PM
  const sunriseMinutes = shuruq ? shuruq.athanMinutes : (6 * 60 + 30);
  const sunsetMinutes = maghrib ? maghrib.athanMinutes : (19 * 60 + 45);

  return currentMinutes >= sunriseMinutes && currentMinutes < sunsetMinutes;
}
