import React, { useState } from 'react';
import { Prize } from '../types/prize';
import { 
  X, 
  MapPin, 
  Calendar, 
  Ticket, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Flame,
  Award,
  Briefcase,
  Users,
  Scale,
  Ban,
  FileText,
  HeartHandshake
} from 'lucide-react';

interface PrizeDetailModalProps {
  prize: Prize | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToBuy: (prize: Prize, quantity: number) => void;
  onOpenTerms?: () => void;
  lang: 'en' | 'am';
}

export const PrizeDetailModal: React.FC<PrizeDetailModalProps> = ({
  prize,
  isOpen,
  onClose,
  onProceedToBuy,
  onOpenTerms,
  lang
}) => {
  if (!isOpen || !prize) return null;

  const [quantity, setQuantity] = useState(1);
  const totalCost = quantity * prize.ticketPriceETB;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh] text-white">
        
        {/* Modal Header */}
        <div className="relative aspect-21/9 w-full bg-slate-950 overflow-hidden">
          <img
            src={prize.image}
            alt={prize.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white flex items-center justify-center transition cursor-pointer border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                {prize.frequency} Draw
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {prize.title}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-300 block">Ticket Price:</span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                {prize.ticketPriceETB} ETB
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Key Facts Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Venue / Payout Location</span>
              <strong className="text-slate-200 text-xs mt-0.5 block flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{prize.venueLocation}</span>
              </strong>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Withdraw / Draw Date</span>
              <strong className="text-slate-200 text-xs mt-0.5 block flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{prize.drawDateFormatted}</span>
              </strong>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Raffle Capacity</span>
              <strong className="text-slate-200 text-xs mt-0.5 block flex items-center gap-1 font-mono">
                <Ticket className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{prize.soldTickets} / {prize.totalTickets} Sold</span>
              </strong>
            </div>
          </div>

          {/* Startup & Job Creation Impact Banner */}
          {(prize.directBusinesses !== undefined || prize.indirectBusinesses !== undefined || prize.supportPeoples !== undefined) && (
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 p-4 rounded-2xl border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wide">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>Startup Competition Impact / የስራ ዕድል ፈጠራ</span>
                </div>
                {prize.supportPeoples && (
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-400" />
                    Supports {prize.supportPeoples} People to Open Business
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span>🎯 Direct Business Open:</span>
                  </div>
                  <strong className="text-white font-mono text-sm px-2 py-0.5 bg-emerald-500/20 rounded border border-emerald-500/30">
                    {prize.directBusinesses ?? 3} Businesses
                  </strong>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-sky-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sky-400 font-bold">
                    <span>🌐 Indirect Business Open:</span>
                  </div>
                  <strong className="text-white font-mono text-sm px-2 py-0.5 bg-sky-500/20 rounded border border-sky-500/30">
                    {prize.indirectBusinesses ?? 6} Businesses
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Prize Overview</h4>
            <p className="text-slate-300 leading-relaxed text-sm">
              {prize.description}
            </p>
            {prize.descriptionAmharic && (
              <p className="text-slate-400 leading-relaxed text-xs mt-1">
                {prize.descriptionAmharic}
              </p>
            )}
          </div>

          {/* Inclusions */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>What Is Included in This Prize Package:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {prize.inclusions.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Bundle Options */}
          <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-white text-sm">
                  {lang === 'en' ? 'Select Number of Raffle Tickets' : 'የዕጣ ትኬት ብዛት ይምረጡ'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  More tickets increase your probability of being drawn tonight!
                </p>
              </div>

              {/* Stepper */}
              <div className="flex items-center border border-slate-700 rounded-2xl bg-slate-900 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3.5 py-1.5 text-slate-300 hover:text-white font-bold text-base transition"
                >
                  -
                </button>
                <span className="w-12 text-center font-black text-amber-400 text-sm font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.min(20, prev + 1))}
                  className="px-3.5 py-1.5 text-slate-300 hover:text-white font-bold text-base transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Quick Bundle Shortcuts */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">Quick packs:</span>
              {[1, 3, 5, 10].map(qty => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => setQuantity(qty)}
                  className={`px-3 py-1 rounded-xl font-bold transition text-xs cursor-pointer ${
                    quantity === qty
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {qty} {qty === 1 ? 'Ticket' : 'Tickets'}
                </button>
              ))}
            </div>

            {/* Mandatory Terms & Social Enterprise Mandate Notice */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Not-for-Profit Social Enterprise</span>
                </div>
                <span className="text-[10px] text-amber-400 font-mono font-bold">300 - 600 ETB Non-Refundable</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {lang === 'en'
                  ? 'All ticket sales are strictly non-refundable and mobilized toward humanitarian relief & catalytic business grants. Winners must submit a Job Creation Business Proposal within 14 days supporting 3 direct and 6 indirect businesses open.'
                  : 'ማንኛውም የቲኬት ሽያጭ በፍጹም የማይመለስ (No Refund) ሲሆን ለሰብአዊ ድጋፍና ለሥራ ዕድል ፈጠራ ይውላል። አሸናፊዎች በ14 ቀናት ውስጥ 3 የቀጥታና 6 ቀጥተኛ ያልሆኑ ንግዶችን የሚያስጀምር የንግድ ዕቅድ የማቅረብ ግዴታ አለባቸው።'}
              </p>
              {onOpenTerms && (
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 underline cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Read full Terms & Conditions (Job Creation & No-Refund Clauses)' : 'ሙሉ ደንቦችንና መመሪያዎችን ያንብቡ'}</span>
                </button>
              )}
            </div>

            {/* Total Cost Calculation */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[11px]">Total Entry Cost:</span>
                <div className="text-xl font-black text-amber-400 font-mono">
                  {totalCost} ETB (ብር)
                </div>
              </div>

              <button
                type="button"
                onClick={() => onProceedToBuy(prize, quantity)}
                className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                <span>
                  {lang === 'en' ? `Proceed to Payment (${totalCost} ETB)` : `ወደ ክፍያ ቀጥል (${totalCost} ብር)`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terms & Certification Notice */}
          <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
            <span>Approved by National Lottery Administration License #9941</span>
            <span>Instant telebirr & CBE Payouts</span>
          </div>

        </div>

      </div>
    </div>
  );
};
