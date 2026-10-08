import React, { useState } from 'react';
import { UserProfile } from '../types/prize';
import { 
  X, 
  User, 
  Phone, 
  Wallet, 
  Ticket, 
  Trophy, 
  Plus, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Building2,
  Users,
  Gift
} from 'lucide-react';

interface ProfileModalProps {
  currentUser: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onTopUpWallet: (amount: number) => void;
  onNavigateToReferral?: () => void;
  lang: 'en' | 'am';
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onTopUpWallet,
  onNavigateToReferral,
  lang
}) => {
  if (!isOpen || !currentUser) return null;

  const [topUpAmount, setTopUpAmount] = useState<number>(200);
  const [topUpMethod, setTopUpMethod] = useState<'telebirr' | 'cbe_birr'>('telebirr');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTopUpWallet(Number(topUpAmount));
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-lg">
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">{currentUser.fullName}</h3>
              <p className="text-xs text-amber-400 font-mono font-bold">
                Username / Phone: {currentUser.phone}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition cursor-pointer text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Wallet Balance</span>
              <span className="text-lg font-black text-amber-400 font-mono mt-0.5 block">
                {currentUser.walletBalanceETB} ETB
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Tickets</span>
              <span className="text-lg font-black text-white font-mono mt-0.5 block">
                {currentUser.tickets.filter(t => t.status === 'active').length}
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Prizes Won</span>
              <span className="text-lg font-black text-emerald-400 font-mono mt-0.5 block">
                {currentUser.claimedPrizesCount}
              </span>
            </div>
          </div>

          {/* Wallet Top Up Box */}
          <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>Instant Wallet Top-Up (ሂሳብ መሙላት)</span>
              </h4>
              <span className="text-[10px] text-emerald-400 font-bold">Zero Transaction Fees</span>
            </div>

            <form onSubmit={handleTopUpSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Select Top-Up Amount (ብር)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 200, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2 rounded-xl font-bold font-mono text-xs transition cursor-pointer ${
                        topUpAmount === amt
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                      }`}
                    >
                      {amt} ETB
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Payment Service
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTopUpMethod('telebirr')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      topUpMethod === 'telebirr'
                        ? 'border-sky-500 bg-sky-950/40 text-sky-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span>telebirr (ቴሌብር)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTopUpMethod('cbe_birr')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                      topUpMethod === 'cbe_birr'
                        ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span>CBE Birr / Mobile</span>
                  </button>
                </div>
              </div>

              {isSuccess ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Wallet topped up successfully with {topUpAmount} ETB!</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  Deposit {topUpAmount} ETB to Wallet
                </button>
              )}
            </form>
          </div>

          {/* Referral Program Banner */}
          <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-emerald-500/15 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-white text-xs flex items-center gap-1.5">
                  <span>Refer Friends & Earn 25 ETB</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold">
                    {currentUser.referralCode || 'Active'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Earned {currentUser.referralEarningsETB || 75} ETB & {currentUser.bonusLuckyNumbersCount || 3} Free Tickets
                </p>
              </div>
            </div>

            {onNavigateToReferral && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToReferral();
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition shrink-0 cursor-pointer shadow-sm"
              >
                <span>View Program</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Account Details */}
          <div className="text-[11px] text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Account Status:</span>
              <strong className="text-emerald-400">● Active Verified Player</strong>
            </div>
            <div className="flex justify-between">
              <span>National Lottery Oversight:</span>
              <span>License NLA/ETH/RAFFLE/2026/9941</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
