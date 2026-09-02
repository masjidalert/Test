export type PrayerKey = 'fajr' | 'shuruq' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
export type ThemeMode = 'auto' | 'light' | 'dark';
export type AppViewMode = 'website' | 'screen-showcase' | 'kiosk';
export type WebsitePage = 'home' | 'for-masjids' | 'download';

export type AlertType =
  | 'janazah'
  | 'urgent_aid'
  | 'community_aid'
  | 'event'
  | 'lecture'
  | 'learning'
  | 'charity'
  | 'volunteer'
  | 'prayer_change'
  | 'update';

export type MobileTab = 'home' | 'alerts' | 'masjids' | 'settings' | 'qibla' | 'onboarding' | 'admin-login' | 'admin-portal';

export interface PrayerTime {
  key: PrayerKey;
  name: string;
  arabicName: string;
  athan: string; // e.g. "5:12 AM"
  iqamah: string; // e.g. "5:30 AM"
  athanMinutes: number; // minutes from midnight
  iqamahMinutes: number; // minutes from midnight
  isShuruq?: boolean;
}

export interface JanazahAlertData {
  id: string;
  deceasedName: string;
  honorific?: string;
  prayerName: string;
  prayerTime: string;
  dateText: string;
  locationName: string;
  locationAddress: string;
  cemeteryName?: string;
  cemeteryAddress?: string;
  familyNote?: string;
  duasOfferedCount: number;
  attendedCount: number;
  livestreamAvailable?: boolean;
  postedAt: string;
}

export interface CommunityAlert {
  id: string;
  type: AlertType;
  title: string;
  subtitle?: string;
  body: string;
  masjidId: string;
  masjidName: string;
  timestamp: string;
  isHighPriority?: boolean;
  isRead?: boolean;
  badge?: string;
  
  // Specific metadata based on alert type
  discreetMode?: boolean; // For Community Aid: hides family identity
  familyPseudonym?: string; // e.g. "Family in Arlington (Ref #409)"
  
  // Charity / Fundraiser
  goalAmount?: number;
  raisedAmount?: number;
  donationUrl?: string;
  
  // Event / Lecture / Learning
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  speaker?: string;
  instructor?: string;
  contactEmail?: string;
  registrationUrl?: string;
  
  // Volunteer
  volunteerSlotsTotal?: number;
  volunteerSlotsFilled?: number;
  
  // Prayer Change
  effectiveDate?: string;
  prayerChanged?: string;
  newTime?: string;
  
  // Janazah attached data
  janazahData?: JanazahAlertData;
}

export interface MosqueProfile {
  id: string;
  name: string;
  arabicName: string;
  address: string;
  city: string;
  state: string;
  country: 'US' | 'Canada';
  cityState: string;
  distance: string;
  isVerified: boolean;
  isHomeCommunity: boolean;
  isFollowed: boolean;
  followerCount: number;
  imams: string[];
  phone: string;
  website: string;
  dailyCongregationEstimate: number;
  iqamahTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    jumuah1: string;
    jumuah2: string;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Head Imam' | 'Resident Scholar' | 'General Secretary' | 'Youth Director';
  masjidId: string;
  masjidName: string;
  avatarUrl?: string;
}

export interface JanazahNotice {
  id: string;
  deceasedName: string;
  prayerName: string;
  prayerTime: string;
  dayDescription: string;
  cemetery?: string;
  notes?: string;
  postedAt: string;
  expiresInMinutes?: number;
}

export interface DailyWisdom {
  id: string;
  arabic: string;
  translation: string;
  reference: string;
  type: 'quran' | 'hadith';
}

export interface Announcement {
  id: string;
  title: string;
  details?: string;
  category: 'general' | 'youth' | 'halaqa' | 'fundraiser' | 'ramadan' | 'event';
  iconType: 'bullhorn' | 'users' | 'book' | 'heart' | 'sparkles' | 'calendar';
  isFundraiser?: boolean;
  fundraiserTarget?: number;
  fundraiserRaised?: number;
  fundraiserName?: string;
  qrOverrideUrl?: string;
}

export interface KioskConfig {
  masjidName: string;
  cityState: string;
  donationUrl: string;
  jumuahTimes: string[];
  khateebs?: string[];
  weather: {
    temp: number;
    condition: string;
    sunset: string;
    high: number;
    low: number;
  };
  wifiConnected: boolean;
  networkActive: boolean;
  lastSyncTimestamp: number;
  syncIntervalSeconds: number;
}


