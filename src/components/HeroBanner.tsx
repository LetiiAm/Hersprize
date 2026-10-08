import React, { useState, useEffect } from 'react';
import { PlatformSettings } from '../types/prize';
import { 
  Trophy, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Flame, 
  Gift,
  ArrowRight,
  CheckCircle2,
  Share2,
  Briefcase,
  Users,
  HeartHandshake,
  Upload
} from 'lucide-react';

interface HeroBannerProps {
  onExploreDaily: () => void;
  onViewWinners: () => void;
  onOpenSocialShare?: () => void;
  onOpenUploadInvoice?: () => void;
  platformSettings?: PlatformSettings;
  lang: 'en' | 'am';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreDaily,
  onViewWinners,
  onOpenSocialShare,
  onOpenUploadInvoice,
  platformSettings,
  lang
}) => {
  // Live ticking countdown to tonight's 9:00 PM EAT draw
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 38,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const jobsCreated = platformSettings?.totalJobsCreatedCounter ?? 142;
  const grantsDisbursed = platformSettings?.totalGrantsDisbursedETB ?? 1850000;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 border border-amber-500/30 text-white p-6 sm:p-10 shadow-2xl">
      {/* Background Glow Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Headline & Description */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black tracking-wide">
            <HeartHandshake className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>NOT-FOR-PROFIT SOCIAL ENTERPRISE • HUMANITARIAN & JOB CREATION FUND</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Mobilizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-yellow-400">Humanitarian Relief</span> & 130,000 ETB Daily Business Grants!
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            {lang === 'en'
              ? 'HeraPrize is a licensed not-for-profit social enterprise that mobilizes community fundraising for humanitarian and job creation services. Daily Prize: Win 130,000 ETB per person, supporting 3 people to open their business (3 direct & 6 indirect businesses open). Weekly Prize: Win a 2-day Bishoftu Resorts luxury stay (Meal, lunch, dinner + 2 bed/2 night) supporting 3 direct & 6 indirect businesses open! Tickets: 300 - 600 ETB via Telebirr.'
              : 'ሄራፕራይዝ ለሰብአዊ ድጋፍ እና ለሥራ ዕድል ፈጠራ አገልግሎት የህዝብ ፈንድ የሚያሰባስብ ትርፍ-አልባ ማህበራዊ ድርጅት ነው! ዕለታዊ 130,000 ብር ለአንድ ሰው (3 ሰዎች ንግድ እንዲከፍቱ ድጋፍ፡ 3 የቀጥታ እና 6 ቀጥተኛ ያልሆኑ ንግዶች) እና ሳምንታዊ የ2 ቀን የቢሾፍቱ ሪዞርቶች ፓኬጅ (ምግብ፣ ምሳ፣ እራት + 2 አልጋ/2 ሌሊት) ያሸንፉ! የዕጣ ዋጋ፡ 300 - 600 ብር በቴሌብር።'}
          </p>

          {/* Social Enterprise Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Youth Jobs Created</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{jobsCreated}+ Jobs</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Humanitarian & Grants Fund</span>
              <span className="text-lg font-black text-amber-400 font-mono">{(grantsDisbursed / 1000000).toFixed(1)}M+ ETB</span>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col justify-center">
              <span className="text-[10px] text-emerald-400 block uppercase font-bold">100% Social Enterprise</span>
              <span className="text-xs font-black text-white font-mono">0% Private Dividends</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreDaily}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center gap-2 transition shadow-lg shadow-amber-500/25 cursor-pointer hover:scale-[1.01]"
            >
              <Gift className="w-4 h-4" />
              <span>{lang === 'en' ? 'Enter Tonight’s 130,000 ETB Prize (350 ETB)' : 'የዛሬውን 130,000 ብር ዕጣ ይቁረጡ (350 ብር)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenUploadInvoice && (
              <button
                onClick={onOpenUploadInvoice}
                className="px-5 py-3 rounded-2xl bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border border-sky-400/40 font-black text-sm flex items-center gap-2 transition shadow-md shadow-sky-600/20 cursor-pointer hover:scale-[1.01]"
                title="Already transferred via Telebirr? Upload receipt here"
              >
                <Upload className="w-4 h-4 text-sky-300" />
                <span>{lang === 'en' ? 'Upload Telebirr Invoice' : 'ቴሌብር ደረሰኝ ጫን'}</span>
              </button>
            )}

            {onOpenSocialShare && (
              <button
                onClick={onOpenSocialShare}
                className="px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-sky-300 border border-sky-500/30 font-bold text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{lang === 'en' ? 'Share Public Link' : 'በማህበራዊ ሚዲያ አጋራ'}</span>
              </button>
            )}

            <button
              onClick={onViewWinners}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition border border-slate-700 cursor-pointer"
            >
              <span>{lang === 'en' ? 'Recent Winners' : 'አሸናፊዎች'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Countdown Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-amber-500/30 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
                <span className="font-extrabold text-xs text-amber-400 uppercase tracking-wider">
                  Live Draw Countdown
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Today, 9:00 PM EAT</span>
            </div>

            <div className="text-center py-4 space-y-3">
              <div className="text-xs text-slate-400 font-medium">Tonight’s Featured Startup Draw:</div>
              <div className="text-xl sm:text-2xl font-black text-white">
                130,000 ETB Cash per Person (Supports 3 Businesses)
              </div>

              {/* Countdown Ticker Tiles */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">Hours</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">Minutes</div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 mt-1">Seconds</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Ticket Entry: <strong className="text-white font-mono">25 ETB</strong></span>
              <span className="text-emerald-400 font-bold">● 642 / 800 Tickets Sold</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
