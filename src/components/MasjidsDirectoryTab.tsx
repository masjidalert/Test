import React, { useState } from 'react';
import { MosqueProfile } from '../types';
import {
  Search,
  MapPin,
  ShieldCheck,
  Heart,
  Users,
  Compass,
  Check,
  Plus,
  Phone,
  Globe,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Sparkles,
} from 'lucide-react';

interface MasjidsDirectoryTabProps {
  isLight?: boolean;
  masjids: MosqueProfile[];
  onToggleFollow: (masjidId: string) => void;
  onToggleHomeCommunity: (masjidId: string) => void;
  onSelectActiveMasjid?: (masjid: MosqueProfile) => void;
}

export const MasjidsDirectoryTab: React.FC<MasjidsDirectoryTabProps> = ({
  isLight = false,
  masjids,
  onToggleFollow,
  onToggleHomeCommunity,
  onSelectActiveMasjid,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<'All' | 'US' | 'Canada'>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [expandedMasjidId, setExpandedMasjidId] = useState<string | null>(null);

  // Available states based on country
  const statesAvailable = Array.from(
    new Set(
      masjids
        .filter((m) => selectedCountry === 'All' || m.country === selectedCountry)
        .map((m) => m.state)
    )
  );

  // Available cities based on state
  const citiesAvailable = Array.from(
    new Set(
      masjids
        .filter(
          (m) =>
            (selectedCountry === 'All' || m.country === selectedCountry) &&
            (selectedState === 'All' || m.state === selectedState)
        )
        .map((m) => m.city)
    )
  );

  // Filtered List
  const filteredMasjids = masjids.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.cityState.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.imams.some((imam) => imam.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCountry = selectedCountry === 'All' || m.country === selectedCountry;
    const matchesState = selectedState === 'All' || m.state === selectedState;
    const matchesCity = selectedCity === 'All' || m.city === selectedCity;

    return matchesSearch && matchesCountry && matchesState && matchesCity;
  });

  const homeCommunities = masjids.filter((m) => m.isHomeCommunity);
  const followedCount = masjids.filter((m) => m.isFollowed).length;

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
            Masjids Directory
          </h2>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Cross-masjid network across US & Canada · Following {followedCount} masjids
          </p>
        </div>

        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
            isLight ? 'bg-[#EBDDC1] text-[#644605]' : 'bg-[#0E3524] text-[#FFDF78]'
          }`}
        >
          {masjids.length} Registered
        </span>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by mosque name, imam or city..."
          className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs border outline-none ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 focus:border-[#8C630D]'
              : 'bg-[#05140E] border-slate-800 text-slate-100 focus:border-[#C5A059]'
          }`}
        />
      </div>

      {/* Cascading Filter Controls (Country -> State -> City) */}
      <div
        className={`p-3 rounded-2xl border space-y-2 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <span className="text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider block opacity-70">
          Geographic Filters
        </span>

        <div className="grid grid-cols-3 gap-2">
          {/* Country */}
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value as any);
              setSelectedState('All');
              setSelectedCity('All');
            }}
            className={`p-2 rounded-xl text-xs border outline-none ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-[#020805] border-slate-800 text-slate-200'
            }`}
          >
            <option value="All">Country: All</option>
            <option value="US">🇺🇸 United States</option>
            <option value="Canada">🇨🇦 Canada</option>
          </select>

          {/* State / Province */}
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity('All');
            }}
            className={`p-2 rounded-xl text-xs border outline-none ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-[#020805] border-slate-800 text-slate-200'
            }`}
          >
            <option value="All">State: All</option>
            {statesAvailable.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* City */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={`p-2 rounded-xl text-xs border outline-none ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-[#020805] border-slate-800 text-slate-200'
            }`}
          >
            <option value="All">City: All</option>
            {citiesAvailable.map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 1. HOME COMMUNITIES SECTION (Stay Connected feature) */}
      {homeCommunities.length > 0 && (
        <div
          className={`p-3.5 sm:p-4 rounded-2xl border ${
            isLight
              ? 'bg-gradient-to-r from-[#FAF4E8] to-[#F1E4CB] border-[#8C630D]/40'
              : 'bg-gradient-to-r from-[#082015] to-[#04110B] border-[#C5A059]/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1.5">
              <Bookmark className="w-3.5 h-3.5 text-[#C5A059] fill-current" />
              <span
                className={`font-['Cinzel'] font-bold text-xs uppercase tracking-wider ${
                  isLight ? 'text-[#644605]' : 'text-[#FFDF78]'
                }`}
              >
                My Home Communities (Stay Connected)
              </span>
            </div>
            <span className="text-[10px] opacity-75">Always Active</span>
          </div>
          <p className={`text-[11px] mb-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            You permanently receive push alerts from these communities regardless of your current GPS location.
          </p>

          <div className="space-y-2">
            {homeCommunities.map((m) => (
              <div
                key={`home-${m.id}`}
                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#020805] border-slate-800'
                }`}
              >
                <div>
                  <div className="font-bold text-xs flex items-center space-x-1.5">
                    <span>{m.name}</span>
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  </div>
                  <div className="text-[10px] opacity-70">{m.cityState}</div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                    Home Base
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. GPS NEARBY SECTION & ALL MASJIDS */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-['Cinzel'] font-bold text-xs uppercase tracking-wider opacity-75">
            Nearby & Directory Listings ({filteredMasjids.length})
          </span>
          <span className="flex items-center space-x-1 text-[10px] text-emerald-500 font-semibold">
            <MapPin className="w-3 h-3" />
            <span>GPS: Arlington / DFW</span>
          </span>
        </div>

        {filteredMasjids.map((masjid) => {
          const isExpanded = expandedMasjidId === masjid.id;
          return (
            <div
              key={masjid.id}
              className={`p-4 rounded-2xl border transition-all ${
                masjid.isFollowed
                  ? isLight
                    ? 'bg-white border-[#8C630D]/40 shadow-sm'
                    : 'bg-[#05140E] border-[#C5A059]/40 shadow-sm'
                  : isLight
                  ? 'bg-slate-50 border-slate-200 opacity-90'
                  : 'bg-[#020805] border-slate-800 opacity-90'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-xs sm:text-sm">{masjid.name}</span>
                    {masjid.isVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" title="Verified Masjid" />
                    )}
                  </div>
                  <div className="font-['Amiri'] text-[11px] opacity-75">{masjid.arabicName}</div>
                  <div className="text-[11px] opacity-70 mt-0.5">
                    {masjid.address}, {masjid.cityState}
                  </div>
                  <div className="text-[10px] text-[#C5A059] font-medium mt-1 flex items-center space-x-2">
                    <span>{masjid.followerCount.toLocaleString()} followers</span>
                    <span>·</span>
                    <span>{masjid.distance}</span>
                  </div>
                </div>

                {/* Follow / Unfollow Button */}
                <div className="flex flex-col items-end space-y-1.5">
                  <button
                    onClick={() => onToggleFollow(masjid.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
                      masjid.isFollowed
                        ? isLight
                          ? 'bg-[#0D5C3A] text-white hover:bg-rose-700'
                          : 'bg-emerald-600 text-white hover:bg-rose-700'
                        : isLight
                        ? 'bg-[#FAF4E8] text-[#8C630D] border border-[#8C630D] hover:bg-[#8C630D] hover:text-white'
                        : 'bg-[#0E3524] text-[#FFDF78] border border-[#FFDF78] hover:bg-[#FFDF78] hover:text-black'
                    }`}
                  >
                    {masjid.isFollowed ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3 h-3" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>

                  {/* Home Community Toggle Star */}
                  <button
                    onClick={() => onToggleHomeCommunity(masjid.id)}
                    title="Toggle Home Community status (Always receive alerts when traveling)"
                    className={`p-1 rounded-lg text-[10px] font-semibold flex items-center space-x-1 ${
                      masjid.isHomeCommunity
                        ? 'text-amber-500'
                        : isLight
                        ? 'text-slate-400 hover:text-slate-700'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Bookmark className={`w-3 h-3 ${masjid.isHomeCommunity ? 'fill-current' : ''}`} />
                    <span>{masjid.isHomeCommunity ? 'Home base' : 'Set home base'}</span>
                  </button>
                </div>
              </div>

              {/* Expander toggle */}
              <div className="mt-3 pt-2 border-t border-opacity-15 border-current flex items-center justify-between text-xs">
                <button
                  onClick={() => setExpandedMasjidId(isExpanded ? null : masjid.id)}
                  className="flex items-center space-x-1 opacity-75 hover:opacity-100 font-semibold"
                >
                  <span>{isExpanded ? 'Hide Details' : 'View Imams & Iqamah'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {onSelectActiveMasjid && (
                  <button
                    onClick={() => onSelectActiveMasjid(masjid)}
                    className={`text-[11px] font-bold ${isLight ? 'text-[#8C630D]' : 'text-[#FFDF78]'}`}
                  >
                    Set as Active View →
                  </button>
                )}
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div
                  className={`mt-3 p-3 rounded-xl border text-xs space-y-2 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#020805] border-slate-800'
                  }`}
                >
                  <div>
                    <span className="font-['Cinzel'] font-bold text-[10px] uppercase opacity-70 block mb-1">
                      Resident Imams & Leadership:
                    </span>
                    <div className="space-y-0.5">
                      {masjid.imams.map((imam, i) => (
                        <div key={i} className="font-semibold text-[11px] flex items-center space-x-1">
                          <span className="text-[#C5A059]">✦</span>
                          <span>{imam}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-['Cinzel'] font-bold text-[10px] uppercase opacity-70 block mb-1">
                      Iqamah Congregations:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                      <div>Fajr: {masjid.iqamahTimes.fajr}</div>
                      <div>Dhuhr: {masjid.iqamahTimes.dhuhr}</div>
                      <div>Asr: {masjid.iqamahTimes.asr}</div>
                      <div>Maghrib: {masjid.iqamahTimes.maghrib}</div>
                      <div>Isha: {masjid.iqamahTimes.isha}</div>
                      <div>Jumu’ah: {masjid.iqamahTimes.jumuah1}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-1 text-[10px] opacity-75">
                    <span className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{masjid.phone}</span>
                    </span>
                    <a
                      href={masjid.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-[#C5A059] hover:underline"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Website</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
