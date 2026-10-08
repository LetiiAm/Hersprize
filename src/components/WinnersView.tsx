import React, { useState } from 'react';
import { Winner } from '../types/prize';
import { 
  Trophy, 
  Search, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Phone,
  Ticket
} from 'lucide-react';

interface WinnersViewProps {
  winners: Winner[];
  lang: 'en' | 'am';
}

export const WinnersView: React.FC<WinnersViewProps> = ({ winners, lang }) => {
  const [filterFrequency, setFilterFrequency] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredWinners = winners.filter(w => {
    const matchesFreq = filterFrequency === 'all' || w.frequency === filterFrequency;
    const matchesSearch = 
      w.winnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.wonItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFreq && matchesSearch;
  });

  return (
    <div className="space-y-6 text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Official Ethiopian Winners Hall of Fame</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'en' ? 'Verified Lucky Draw Winners' : 'የተረጋገጡ የዕድል አሸናፊዎች'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              All draws supervised under Ethiopian National Lottery Administration (NLA) standards.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-extrabold text-white">100% Tax-Paid Payouts</div>
              <div className="text-[11px] text-slate-400">via telebirr & Bank Transfer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Frequency Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Winners (ሁሉም)' },
            { id: 'daily', label: 'Daily 10k ETB (ዕለታዊ)' },
            { id: 'weekly', label: 'Weekly Draws (ሳምንታዊ)' },
            { id: 'monthly', label: 'Monthly Mega (ወርሃዊ)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterFrequency(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                filterFrequency === tab.id
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, city, ticket #..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 outline-hidden font-medium"
          />
        </div>
      </div>

      {/* Winners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWinners.map((winner) => (
          <div
            key={winner.id}
            className="bg-slate-900/80 rounded-3xl border border-slate-800 p-5 shadow-lg hover:border-amber-500/30 transition flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header with Avatar & Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={winner.avatar}
                    alt={winner.winnerName}
                    className="w-12 h-12 rounded-2xl object-cover border border-amber-500/30 shadow-md"
                  />
                  <div>
                    <h4 className="font-extrabold text-white text-base">
                      {winner.winnerName}
                    </h4>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{winner.city}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  ✓ Verified
                </span>
              </div>

              {/* Prize Details Pill */}
              <div className="mt-4 bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1 text-xs">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Prize Won</div>
                <div className="text-sm font-black text-amber-400">
                  {winner.wonItem}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {winner.prizeTitle}
                </div>
              </div>

              {/* Ticket number & Masked Phone */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Ticket className="w-3 h-3 text-amber-400" />
                  {winner.ticketNumber}
                </span>
                <span className="font-mono">{winner.maskedPhone}</span>
              </div>
            </div>

            {/* Payout Clearance Status */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">
                {new Date(winner.drawDate).toLocaleDateString()}
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{winner.payoutStatus}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredWinners.length === 0 && (
        <div className="bg-slate-900/60 p-12 rounded-3xl border border-slate-800 text-center">
          <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-300">No Winners Found</h4>
          <p className="text-xs text-slate-500 mt-1">Try another search keyword or category filter.</p>
        </div>
      )}
    </div>
  );
};
