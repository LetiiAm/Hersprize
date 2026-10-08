import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/prizeData';
import { getPublicBaseUrl, isInternalDevUrl } from '../utils/shareUrl';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Building2,
  HeartHandshake,
  Scale,
  Share2,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';

interface ContactViewProps {
  lang: 'en' | 'am';
  onOpenTerms?: () => void;
  onOpenSocialShare?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ 
  lang,
  onOpenTerms,
  onOpenSocialShare
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const publicUrl = getPublicBaseUrl();
  const inDevMode = isInternalDevUrl();

  const handleCopyPublicUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-8 text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>Not-for-Profit Social Enterprise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {lang === 'en' 
              ? 'HeraPrize: Mobilizing Fundraising for Humanitarian & Job Creation Services' 
              : 'ሄራፕራይዝ፡ ለሰብአዊ ድጋፍና ለሥራ ዕድል ፈጠራ አገልግሎቶች የህዝብ ፈንድ አሰባሳቢ ማህበራዊ ድርጅት'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'en'
              ? 'HeraPrize is a registered Ethiopian not-for-profit social enterprise operating under National Lottery Administration (NLA License #NLA/ETH/RAFFLE/2026/9941). We mobilize community participation through transparent prize funds where 100% of proceeds are channeled into urgent humanitarian relief and business startup grants that support 3 direct and 6 indirect business launches.'
              : 'ሄራፕራይዝ በብሔራዊ ሎተሪ አስተዳደር ፈቃድ ቁጥር #NLA/ETH/RAFFLE/2026/9941 የተመዘገበ ትርፍ-አልባ ማህበራዊ ድርጅት ሲሆን፤ 100% የዕጣ ሽያጭ ገቢውን ለሰብአዊ ድጋፍ እና 3 የቀጥታና 6 ቀጥተኛ ያልሆኑ ንግዶችን ለሚያስጀምሩ የሥራ ዕድል ፈጠራ ስራዎች ያውላል።'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {onOpenTerms && (
              <button
                onClick={onOpenTerms}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <Scale className="w-4 h-4" />
                <span>{lang === 'en' ? 'View Official Terms & Conditions' : 'ኦፊሴላዊ ደንቦችን ይመልከቱ'}</span>
              </button>
            )}

            {onOpenSocialShare && (
              <button
                onClick={onOpenSocialShare}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-sky-600/20"
              >
                <Share2 className="w-4 h-4" />
                <span>{lang === 'en' ? 'Share Public Campaign Link' : 'የህዝብ ሊንክ አጋራ'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 403 Forbidden Troubleshooting & Public Link Box */}
      <div className="bg-sky-950/70 border border-sky-500/40 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-black">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-base text-white">
              {lang === 'en' 
                ? 'External Sharing & Link Access Guide (Fix for 403 Forbidden)' 
                : 'የሊንክ ማጋሪያ መመሪያ እና የ 403 ስህተት መፍቻ'}
            </h3>
            <p className="text-xs text-sky-200">
              {lang === 'en' 
                ? 'Why do shared links sometimes say "403 and you dont have access"?' 
                : 'ሊንክ ሲያጋሩ "403 You don\'t have access" የሚለው ለምንድን ነው?'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Cause of 403 Error: Private Developer URL</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Google AI Studio provides a private container domain (<code className="text-rose-300 font-mono text-[10px]">ais-dev-...</code>) that only the logged-in project creator can access. If you copy the dev URL directly from the address bar, external users will see <strong className="text-white">"403 Forbidden - You don't have access"</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Solution: Verified Public Access Link</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              Always share the verified <strong className="text-emerald-300">Public Preview URL</strong> (<code className="text-emerald-300 font-mono text-[10px]">ais-pre-...</code>). It requires no Google login and opens smoothly for everyone on Telegram, WhatsApp, SMS, or any browser!
            </p>
          </div>
        </div>

        {/* Public Link Bar */}
        <div className="pt-2">
          <label className="block text-[11px] font-bold text-sky-300 mb-1.5">
            Verified Public Share Link (100% Accessible Without 403 Error):
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 text-amber-300 font-mono text-xs break-all select-all flex items-center justify-between">
              <span>{publicUrl}</span>
              <span className="text-[10px] text-emerald-400 font-sans font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 shrink-0 ml-2">Public</span>
            </div>
            <button
              onClick={handleCopyPublicUrl}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer shrink-0 shadow-md shadow-amber-500/20"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Public Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Public Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Addis Ababa Office */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-white text-base">Addis Ababa Head Office</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            {CONTACT_INFO.addressAddisAbaba}
          </p>
          <div className="pt-2 text-xs font-mono text-amber-400">
            Open: Mon - Sat, 8:30 AM - 6:30 PM
          </div>
        </div>

        {/* Bishoftu Center */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-white text-base">Bishoftu Service Center</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            {CONTACT_INFO.bishoftuAddress}
          </p>
          <div className="pt-2 text-xs font-mono text-amber-400">
            Resort Voucher Claim Desk
          </div>
        </div>

        {/* Telephones & Telegram */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Phone className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-white text-base">Hotlines & Support</h4>
          <div className="text-xs space-y-1 text-slate-300">
            <div>Mobile: <strong className="text-white font-mono">{CONTACT_INFO.phoneMain}</strong></div>
            <div>Landline: <strong className="text-white font-mono">{CONTACT_INFO.phoneLandline}</strong></div>
            <div>Telegram Channel: <strong className="text-amber-400 font-mono">{CONTACT_INFO.telegramChannel}</strong></div>
            <div>Support Bot: <strong className="text-amber-400 font-mono">{CONTACT_INFO.telegramSupport}</strong></div>
          </div>
        </div>
      </div>

      {/* Licensing & Draw Schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Draw Schedules & Rules */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4 text-xs">
          <h3 className="font-black text-base text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Draw Schedules & Impact Deliverables</span>
          </h3>

          <div className="space-y-3 text-slate-300">
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <strong className="text-amber-400 block text-xs">Daily Prize: 130,000 ETB Cash Grant per Person (Tickets: 300 - 600 ETB)</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Drawn daily at 9:00 PM EAT. Supports 3 people to open their business, catalyzing 3 direct and 6 indirect business openings. Instant payout via Telebirr or CBE Bank.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <strong className="text-amber-400 block text-xs">Weekly Prize: 2-Day Bishoftu Resorts Luxury Retreat</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Drawn every Sunday at 8:00 PM EAT. Includes breakfast, lunch, and dinner + 2 bed/2 night stay. Supports 3 direct and 6 indirect businesses open through mentorship incubation.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
              <strong className="text-amber-400 block text-xs">Monthly Mega Prize: 250,000 ETB & Commercial Bajaj</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Drawn live on the final evening of every month with full transparency certified by National Lottery supervisors to launch full SME operations.
              </p>
            </div>
          </div>
        </div>

        {/* Send Inquiry Form */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4 text-xs">
          <h3 className="font-black text-base text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Send Direct Question or Feedback</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Abebe / Aster..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Mobile Phone Number</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09... / 07..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-amber-400 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Message / Question</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Inquire about humanitarian services, job creation grants, ticket purchases, or sharing links..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400 outline-hidden"
              />
            </div>

            {submitted ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Your message has been received by HeraPrize customer care.</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-md"
              >
                Send Message
              </button>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};
