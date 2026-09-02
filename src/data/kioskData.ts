import { PrayerTime, JanazahNotice, DailyWisdom, Announcement, KioskConfig } from '../types';

export const INITIAL_PRAYER_TIMES: PrayerTime[] = [
  {
    key: 'fajr',
    name: 'Fajr',
    arabicName: 'الفجر',
    athan: '5:12 AM',
    iqamah: '5:30 AM',
    athanMinutes: 5 * 60 + 12,
    iqamahMinutes: 5 * 60 + 30,
  },
  {
    key: 'shuruq',
    name: 'Shuruq',
    arabicName: 'الشروق',
    athan: '6:38 AM',
    iqamah: '—',
    athanMinutes: 6 * 60 + 38,
    iqamahMinutes: 6 * 60 + 38,
    isShuruq: true,
  },
  {
    key: 'dhuhr',
    name: 'Dhuhr',
    arabicName: 'الظهر',
    athan: '1:00 PM',
    iqamah: '1:15 PM',
    athanMinutes: 13 * 60 + 0,
    iqamahMinutes: 13 * 60 + 15,
  },
  {
    key: 'asr',
    name: 'Asr',
    arabicName: 'العصر',
    athan: '5:00 PM',
    iqamah: '5:25 PM',
    athanMinutes: 17 * 60 + 0,
    iqamahMinutes: 17 * 60 + 25,
  },
  {
    key: 'maghrib',
    name: 'Maghrib',
    arabicName: 'المغرب',
    athan: '7:52 PM',
    iqamah: '7:55 PM',
    athanMinutes: 19 * 60 + 52,
    iqamahMinutes: 19 * 60 + 55,
  },
  {
    key: 'isha',
    name: 'Isha',
    arabicName: 'العشاء',
    athan: '9:10 PM',
    iqamah: '9:30 PM',
    athanMinutes: 21 * 60 + 10,
    iqamahMinutes: 21 * 60 + 30,
  },
];

export const DAILY_WISDOM_LIST: DailyWisdom[] = [
  {
    id: 'w1',
    arabic: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا',
    translation: 'Indeed, prayer has been decreed upon the believers at specified times.',
    reference: "Qur'an 4:103",
    type: 'quran',
  },
  {
    id: 'w2',
    arabic: 'وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ',
    translation: 'And establish prayer at the two ends of the day and at the approach of the night. Indeed, good deeds do away with misdeeds.',
    reference: "Qur'an 11:114",
    type: 'quran',
  },
  {
    id: 'w3',
    arabic: 'مَنْ بَنَى لِلَّهِ مَسْجِدًا بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ',
    translation: 'Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.',
    reference: 'Sahih al-Bukhari 450',
    type: 'hadith',
  },
  {
    id: 'w4',
    arabic: 'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ الصَّلَاةُ عَلَى وَقْتِهَا',
    translation: 'The deed most beloved to Allah is performing the prayer at its proper appointed time.',
    reference: 'Sahih Muslim 85',
    type: 'hadith',
  },
  {
    id: 'w5',
    arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
    translation: 'My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.',
    reference: "Qur'an 14:40",
    type: 'quran',
  },
];

export const JANAZAH_WISDOM: DailyWisdom = {
  id: 'w-janazah',
  arabic: 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۖ ثُمَّ إِلَيْنَا تُرْجَعُونَ',
  translation: 'Every soul shall taste death. Then unto Us you shall be returned.',
  reference: "Qur'an 29:57",
  type: 'quran',
};

export const ANNOUNCEMENTS_LIST: Announcement[] = [
  {
    id: 'a1',
    title: 'Youth halaqa resumes Tue, Sep 2',
    details: 'Weekly mentorship & reflections for high school and college youth in the community hall after Asr.',
    category: 'youth',
    iconType: 'users',
  },
  {
    id: 'a2',
    title: 'Elevator & Accessibility Fund',
    details: 'Phase 2 installation for elder access to 2nd floor sisters prayer area.',
    category: 'fundraiser',
    iconType: 'heart',
    isFundraiser: true,
    fundraiserName: 'Elevator Fund',
    fundraiserRaised: 48250,
    fundraiserTarget: 75000,
    qrOverrideUrl: 'an-noor.gives/elevator',
  },
  {
    id: 'a3',
    title: 'Tajweed & Quran Recitation Circles',
    details: 'Daily after Fajr & Maghrib with Sheikh Omar for all levels.',
    category: 'halaqa',
    iconType: 'book',
  },
  {
    id: 'a4',
    title: 'Community Food Drive & Pantry Service',
    details: 'Drop non-perishable canned items at the north lobby donation bins.',
    category: 'general',
    iconType: 'sparkles',
  },
];

export const INITIAL_JANAZAH: JanazahNotice = {
  id: 'j1',
  deceasedName: 'Br. Yusuf Abdullah',
  prayerName: 'Maghrib',
  prayerTime: '8:15 PM',
  dayDescription: 'today after Maghrib, 8:15 PM',
  cemetery: 'Arlington Muslim Cemetery',
  notes: 'Please attend and keep the family in your du’ā',
  postedAt: '12 minutes ago',
  expiresInMinutes: 180,
};

export const DEFAULT_CONFIG: KioskConfig = {
  masjidName: 'Masjid An-Noor',
  cityState: 'Arlington, Texas',
  donationUrl: 'an-noor.gives',
  jumuahTimes: ['1:15 PM', '2:15 PM'],
  khateebs: ['Dr. Tariq Al-Mansoor', 'Sheikh Ibrahim Hasan'],
  weather: {
    temp: 96,
    condition: 'Clear',
    sunset: '7:52 PM',
    high: 99,
    low: 76,
  },
  wifiConnected: true,
  networkActive: true,
  lastSyncTimestamp: Date.now(),
  syncIntervalSeconds: 60,
};
