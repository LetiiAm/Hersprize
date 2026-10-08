import React from 'react';
import { Prize } from '../types/prize';
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  Ticket, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  CheckCircle2,
  Share2,
  Briefcase
} from 'lucide-react';

interface PrizeCardProps {
  prize: Prize;
  onSelectPrize: (prize: Prize) => void;
  onQuickBuy: (prize: Prize) => void;
  onSharePrize?: (prize: Prize) => void;
  lang: 'en' | 'am';
}

export const PrizeCard: React.FC<PrizeCardProps> = ({
  prize,
  onSelectPrize,
  onQuickBuy,
  onSharePrize,
  lang
}) => {
  const percentageSold = Math.min(100, Math.round((prize.soldTickets / prize.totalTickets) * 100));

  const frequencyBadge = {
    daily: {
      label: 'DAILY DRAW',
      labelAm: 'ዕለታዊ ዕጣ',
      color: 'bg-amber-500 text-slate-950 border-amber-300'
    },
    weekly: {
      label: 'WEEKLY DRAW',
      labelAm: 'ሳምንታዊ ዕጣ',
      color: 'bg-emerald-500 text-slate-950 border-emerald-300'
    },
    monthly: {
      label: 'MONTHLY MEGA',
      labelAm: 'ወርሃዊ ሜጋ',
      color: 'bg-purple-500 text-white border-purple-300'
    }
  }[prize.frequency];

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300 flex flex-col group text-white">
      
      {/* Top Image Container */}
      <div 
        onClick={() => onSelectPrize(prize)}
        className="relative aspect-16/10 w-full overflow-hidden bg-slate-950 cursor-pointer"
      >
        <img
          src={prize.image}
          alt={prize.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Frequency Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black tracking-wider uppercase border shadow-md ${frequencyBadge.color}`}>
            {lang === 'en' ? frequencyBadge.label : frequencyBadge.labelAm}
          </span>
        </div>

        {/* Prize Value Pill */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md text-amber-400 text-xs font-black border border-amber-400/30 shadow-md">
            {prize.prizeValue}
          </span>
        </div>

        {/* Location Venue Bottom Tag */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="px-2.5 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md text-slate-200 text-[11px] font-bold flex items-center gap-1.5 border border-slate-700/60 truncate">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{prize.venueLocation}</span>
          </div>
        </div>
      </div>

      {/* Main Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onSelectPrize(prize)}
            className="font-black text-base sm:text-lg text-white group-hover:text-amber-400 transition cursor-pointer leading-snug line-clamp-1"
          >
            {prize.title}
          </h3>

          {prize.titleAmharic && (
            <p className="text-xs text-slate-400 font-medium line-clamp-1 mt-0.5">
              {prize.titleAmharic}
            </p>
          )}

          {/* Startup Job Creation Impact Badge */}
          {prize.startupGoal && (
            <div className="mt-2.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold truncate">
                <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{prize.startupGoal}</span>
              </div>
              {prize.jobsEstimate && (
                <span className="text-[10px] bg-slate-900 px-1.5 py-0.2 rounded text-emerald-400 font-mono font-bold shrink-0 ml-1">
                  ~{prize.jobsEstimate} Jobs
                </span>
              )}
            </div>
          )}

          {/* Direct & Indirect Business Openings Impact */}
          {(prize.directBusinesses !== undefined || prize.indirectBusinesses !== undefined) && (
            <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px] font-bold">
              <div className="px-2 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
                <span>🎯 Direct Business:</span>
                <span className="font-mono text-white bg-slate-950 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {prize.directBusinesses ?? 3} Open
                </span>
              </div>
              <div className="px-2 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 flex items-center justify-between">
                <span>🌐 Indirect Business:</span>
                <span className="font-mono text-white bg-slate-950 px-1.5 py-0.5 rounded border border-sky-500/30">
                  {prize.indirectBusinesses ?? 6} Open
                </span>
              </div>
            </div>
          )}

          {/* Draw Date & Time Badge */}
          <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'Withdraw / Draw Date:' : 'የዕጣ ማውጫ ቀን:'}</span>
            </div>
            <strong className="text-white font-mono">{prize.drawDateFormatted}</strong>
          </div>

          {/* Ticket Sales Progress Bar */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">
                Tickets Sold: <strong className="text-white font-mono">{prize.soldTickets} / {prize.totalTickets}</strong>
              </span>
              <span className="text-amber-400 font-mono font-bold">{percentageSold}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                style={{ width: `${percentageSold}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Cost of Ticket
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-amber-400 font-mono">
                {prize.ticketPriceETB}
              </span>
              <span className="text-xs text-slate-300 font-bold">ETB / ብር</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onSharePrize && (
              <button
                type="button"
                onClick={() => onSharePrize(prize)}
                title="Share this prize on social media"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700/80 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onSelectPrize(prize)}
              className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer"
            >
              <span>{lang === 'en' ? 'Details' : 'መረጃ'}</span>
            </button>

            <button
              onClick={() => onQuickBuy(prize)}
              className="py-2.5 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Buy Ticket' : 'ዕጣ ግዛ'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
