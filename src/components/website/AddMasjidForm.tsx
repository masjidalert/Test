import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock, Building2, User, Mail, MapPin, Sparkles } from 'lucide-react';

interface AddMasjidFormProps {
  isLight?: boolean;
  onSuccess?: () => void;
}

export const AddMasjidForm: React.FC<AddMasjidFormProps> = ({ isLight = false, onSuccess }) => {
  const [formData, setFormData] = useState({
    masjidName: '',
    city: '',
    state: '',
    country: 'US',
    name: '',
    email: '',
    role: 'Imam',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.masjidName || !formData.city || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div
        className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 max-w-xl mx-auto shadow-xl transition-all ${
          isLight
            ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#FAF4E8] border-[#8C630D]/60 text-slate-900'
            : 'bg-gradient-to-b from-[#071F15] via-[#04110B] to-[#020A07] border-[#C5A059]/60 text-slate-100'
        }`}
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="font-['Cinzel'] text-xl sm:text-2xl font-bold tracking-wide">
          Masjid Request Received
        </h3>

        <p className={`text-sm max-w-md mx-auto leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          JazakAllahu Khairan! We have received the submission for{' '}
          <strong className="font-bold text-emerald-500 dark:text-emerald-400">
            {formData.masjidName}
          </strong>{' '}
          ({formData.city}, {formData.state}).
        </p>

        <div
          className={`p-4 rounded-2xl border text-xs text-left space-y-2 ${
            isLight ? 'bg-white/80 border-slate-200' : 'bg-[#030C08] border-slate-800'
          }`}
        >
          <div className="flex items-center space-x-2 font-bold text-emerald-500">
            <Clock className="w-4 h-4" />
            <span>Next Steps (Within 24 Hours)</span>
          </div>
          <p className="opacity-80">
            1. Our team will verify your masjid details against public registry records.
          </p>
          <p className="opacity-80">
            2. You will receive an email at <strong>{formData.email}</strong> with your unique admin portal credentials and onboarding guide.
          </p>
          <p className="opacity-80">
            3. Your community members will instantly find your masjid in the app directory.
          </p>
        </div>

        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              masjidName: '',
              city: '',
              state: '',
              country: 'US',
              name: '',
              email: '',
              role: 'Imam',
              message: '',
            });
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            isLight
              ? 'bg-[#8C630D] text-white hover:bg-[#644605]'
              : 'bg-[#FFDF78] text-[#040E0A] hover:bg-[#FFEAA0]'
          }`}
        >
          Submit Another Masjid
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 sm:p-8 rounded-3xl border shadow-xl space-y-5 transition-all ${
        isLight
          ? 'bg-white border-[#8C630D]/30 shadow-[#8C630D]/5'
          : 'bg-[#04110B] border-[#C5A059]/30 shadow-2xl'
      }`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-opacity-15 border-current">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            🕌
          </div>
          <div>
            <h4 className="font-['Cinzel'] font-bold text-sm tracking-wide">
              Add Your Masjid Directory Request
            </h4>
            <p className="text-[11px] opacity-70">100% Free Forever · Verified within 24 hours</p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          US & Canada
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Masjid Name */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="block text-xs font-bold opacity-80">
            Masjid Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              required
              placeholder="e.g. Islamic Center of Greater Memphis"
              value={formData.masjidName}
              onChange={(e) => setFormData({ ...formData, masjidName: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                isLight
                  ? 'bg-slate-50 border-slate-200 focus:border-[#8C630D] focus:bg-white text-slate-900'
                  : 'bg-[#071F15] border-slate-800 focus:border-[#FFDF78] focus:bg-[#09281B] text-slate-100'
              }`}
            />
          </div>
        </div>

        {/* City */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold opacity-80">
            City <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              required
              placeholder="e.g. Memphis"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                isLight
                  ? 'bg-slate-50 border-slate-200 focus:border-[#8C630D] focus:bg-white text-slate-900'
                  : 'bg-[#071F15] border-slate-800 focus:border-[#FFDF78] focus:bg-[#09281B] text-slate-100'
              }`}
            />
          </div>
        </div>

        {/* State & Country */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold opacity-80">
              State / Prov <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. TN or ON"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                isLight
                  ? 'bg-slate-50 border-slate-200 focus:border-[#8C630D] focus:bg-white text-slate-900'
                  : 'bg-[#071F15] border-slate-800 focus:border-[#FFDF78] focus:bg-[#09281B] text-slate-100'
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold opacity-80">Country</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                isLight
                  ? 'bg-slate-50 border-slate-200 focus:border-[#8C630D] text-slate-900'
                  : 'bg-[#071F15] border-slate-800 focus:border-[#FFDF78] text-slate-100'
              }`}
            >
              <option value="US">United States (US)</option>
              <option value="Canada">Canada (CA)</option>
            </select>
          </div>
        </div>

        {/* Your Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold opacity-80">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              required
              placeholder="e.g. Tariq Al-Mansoor"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                isLight
                  ? 'bg-slate-50 border-slate-200 focus:border-[#8C630D] focus:bg-white text-slate-900'
                  : 'bg-[#071F15] border-slate-800 focus:border-[#FFDF78] focus:bg-[#09281B] text-slate-100'
              }`}
            />
          </div>
        </div>

        {/* Your Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold opacity-80">
            Your Email <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="email"
              required
              placeholder="admin@yourmasjid.org"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                isLight
                  ? 'bg-slate-50 border-slate-200 focus:border-[#8C630D] focus:bg-white text-slate-900'
                  : 'bg-[#071F15] border-slate-800 focus:border-[#FFDF78] focus:bg-[#09281B] text-slate-100'
              }`}
            />
          </div>
        </div>

        {/* Your Role */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="block text-xs font-bold opacity-80">Your Role at the Masjid</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none transition-all ${
              isLight
                ? 'bg-slate-50 border-slate-200 focus:border-[#8C630D] text-slate-900'
                : 'bg-[#071F15] border-slate-800 focus:border-[#FFDF78] text-slate-100'
            }`}
          >
            <option value="Imam">Imam / Resident Scholar</option>
            <option value="Secretary">General Secretary</option>
            <option value="Board Member">Board Member / Shura</option>
            <option value="Youth Director">Youth Director</option>
            <option value="Volunteer">Active Volunteer / Other</option>
          </select>
        </div>

        {/* Optional Message */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="block text-xs font-bold opacity-80">
            Message or Specific Questions <span className="opacity-50 text-[10px]">(Optional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="Tell us any special details about your masjid (number of daily attendees, lobby TV interest, etc.)"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`w-full p-3 rounded-xl text-xs border outline-none resize-none transition-all ${
              isLight
                ? 'bg-slate-50 border-slate-200 focus:border-[#8C630D] focus:bg-white text-slate-900'
                : 'bg-[#071F15] border-slate-800 focus:border-[#FFDF78] focus:bg-[#09281B] text-slate-100'
            }`}
          />
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-[11px] opacity-75">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>We respond within 24 hours. No payment information required.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-lg ${
            isLight
              ? 'bg-[#0D5C3A] hover:bg-[#083E26] text-white shadow-emerald-900/20'
              : 'bg-[#FFDF78] hover:bg-[#FFEAA0] text-[#040E0A] shadow-[0_0_15px_rgba(255,223,120,0.3)]'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center space-x-2">
              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </span>
          ) : (
            <>
              <span>Submit Your Masjid</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
