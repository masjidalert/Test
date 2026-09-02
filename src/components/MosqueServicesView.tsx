import React from 'react';
import { MOSQUE_SERVICES, FEATURED_MOSQUES } from '../data/mobileData';
import {
  Phone,
  Clock,
  Shield,
  Heart,
  BookOpen,
  Calendar,
  Users,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface MosqueServicesViewProps {
  isLight?: boolean;
  onOpenJanazahContact?: () => void;
}

export const MosqueServicesView: React.FC<MosqueServicesViewProps> = ({
  isLight = false,
  onOpenJanazahContact,
}) => {
  const currentMosque = FEATURED_MOSQUES[0];

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div>
        <h2
          className={`font-['Cinzel'] text-xl font-bold tracking-wide ${
            isLight ? 'text-[#061F15]' : 'text-[#FDF8EE]'
          }`}
        >
          Mosque Pastoral Services
        </h2>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Essential Islamic services, community assistance, and scholar consultations
        </p>
      </div>

      {/* 24/7 Emergency Janazah Service Banner (Dignified & Highlighted) */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
          isLight
            ? 'bg-gradient-to-r from-[#FAF4E8] via-[#F3E8D3] to-[#FAF4E8] border-[#8C630D] shadow-md'
            : 'bg-gradient-to-r from-[#092218] via-[#05160F] to-[#092218] border-[#FFDF78] shadow-[0_4px_25px_rgba(0,0,0,0.6)]'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span
              className={`font-['Cinzel'] font-bold text-xs uppercase tracking-widest ${
                isLight ? 'text-[#644605]' : 'text-[#FFDF78]'
              }`}
            >
              24/7 IMMEDIATE JANAZAH HOTLINE
            </span>
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              isLight ? 'bg-[#E5D4B4] text-[#644605]' : 'bg-[#0E3524] text-[#FFDF78]'
            }`}
          >
            Emergency Response
          </span>
        </div>

        <h3
          className={`font-bold text-sm sm:text-base mb-1 ${
            isLight ? 'text-[#061F15]' : 'text-white'
          }`}
        >
          Loss of a Loved One & Immediate Funeral Coordination
        </h3>
        <p className={`text-xs leading-relaxed mb-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          Our Janazah Committee provides 24/7 assistance with ghusl, shrouding, paperwork, cemetery arrangements, and grief support.
        </p>

        <div className="flex flex-wrap gap-2">
          <a
            href="tel:8175559911"
            className={`py-2 px-3.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow ${
              isLight ? 'bg-[#8C630D] text-white hover:bg-[#72500A]' : 'bg-[#FFDF78] text-[#040E0A] hover:bg-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call (817) 555-9911 (24/7)</span>
          </a>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MOSQUE_SERVICES.map((srv) => (
          <div
            key={srv.id}
            className={`p-4 rounded-2xl border transition-all ${
              isLight
                ? 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                : 'bg-[#05140E] border-slate-800 hover:border-slate-700 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-sm">{srv.title}</span>
              <span className="font-['Amiri'] text-xs font-bold opacity-75">{srv.arabic}</span>
            </div>
            <p className={`text-xs leading-relaxed mb-3 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {srv.description}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-opacity-20 border-current text-xs">
              <span className="opacity-75">{srv.phone}</span>
              <button
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  isLight ? 'bg-[#FAF4E8] text-[#8C630D]' : 'bg-[#0E3524] text-[#FFDF78]'
                }`}
              >
                Inquire
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resident Imams & Scholars */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border ${
          isLight ? 'bg-[#FAF6F0] border-slate-200' : 'bg-[#05140E] border-slate-800'
        }`}
      >
        <h3 className="font-['Cinzel'] font-bold text-sm uppercase tracking-wider mb-3">
          Resident Imams & Religious Leadership
        </h3>
        <div className="space-y-3">
          {currentMosque.imams.map((imam, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center justify-between ${
                isLight ? 'bg-white border-slate-200' : 'bg-[#030B07] border-slate-800'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-[#0D5C3A] text-white font-bold flex items-center justify-center text-xs">
                  {imam.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-xs">{imam}</div>
                  <div className="text-[10px] opacity-70">Resident Scholar & Khateeb</div>
                </div>
              </div>
              <button
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                  isLight
                    ? 'border-slate-300 text-slate-700 hover:bg-slate-50'
                    : 'border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Book Office Hours
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
