import React, { useState } from 'react';
import { UserProfile } from '../types/prize';
import { INITIAL_USER } from '../data/prizeData';
import { 
  X, 
  Phone, 
  Lock, 
  User, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  lang: 'en' | 'am';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState('0911234567');
  const [password, setPassword] = useState('123456');
  const [fullName, setFullName] = useState('Lechisa Amena');
  const [city, setCity] = useState('Addis Ababa');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      setErrorMsg('Please enter a valid Ethiopian mobile phone number (09... / 07...)');
      return;
    }

    const authenticatedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: mode === 'login' ? (phone === '0911234567' ? 'Lechisa Amena' : 'Verified Player') : fullName,
      phone: phone.trim(),
      city: city || 'Addis Ababa',
      walletBalanceETB: mode === 'login' ? 350 : 100, // Welcome bonus of 100 ETB for new players!
      tickets: mode === 'login' && phone === '0911234567' ? INITIAL_USER.tickets : [],
      claimedPrizesCount: 0
    };

    onLoginSuccess(authenticatedUser);
    onClose();
  };

  const handleQuickDemoLogin = (demoName: string, demoPhone: string) => {
    const demoUser: UserProfile = {
      id: `usr-demo-${demoPhone}`,
      fullName: demoName,
      phone: demoPhone,
      city: 'Addis Ababa',
      walletBalanceETB: 450,
      tickets: INITIAL_USER.tickets,
      claimedPrizesCount: 0
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-black">
              H
            </div>
            <div>
              <h3 className="font-black text-base">
                {mode === 'login' ? 'Player Login (መግቢያ)' : 'Create Player Account (መመዝገቢያ)'}
              </h3>
              <p className="text-[11px] font-semibold text-slate-900">
                Phone Number Credentials (ስልክ ቁጥር የተጠቃሚ ስም)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-950/20 hover:bg-slate-950/30 flex items-center justify-center transition cursor-pointer text-slate-950 font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="p-2 bg-slate-950 grid grid-cols-2 gap-1 border-b border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 rounded-xl font-bold transition cursor-pointer ${
              mode === 'login' ? 'bg-slate-900 text-amber-400 border border-slate-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            Log In (ግባ)
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 rounded-xl font-bold transition cursor-pointer ${
              mode === 'register' ? 'bg-slate-900 text-amber-400 border border-slate-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            Register (+100 ETB Bonus)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold">
              {errorMsg}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                Full Name (ሙሉ ስም)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Lechisa Amena"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-xs focus:border-amber-400 outline-hidden"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 flex items-center justify-between">
              <span>Mobile Phone Number / Username (የስልክ ቁጥር)</span>
              <span className="text-[10px] text-amber-400">Used as Username</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0911 234 567"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:border-amber-400 outline-hidden font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">
              Password or 4-digit PIN (የይለፍ ቃል)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono text-xs focus:border-amber-400 outline-hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            {mode === 'login' ? 'Log In to HeraPrize' : 'Create Account & Claim 100 ETB Bonus'}
          </button>

          {/* Quick Demo Logins for Fast User Testing */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold block text-center">
              One-Click Instant Demo Profiles
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Lechisa Amena', '0911234567')}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left cursor-pointer transition"
              >
                <div className="font-bold text-white text-[11px]">Lechisa Amena</div>
                <div className="text-[10px] text-amber-400 font-mono">0911234567</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('Aster Mengistu', '0922849104')}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-left cursor-pointer transition"
              >
                <div className="font-bold text-white text-[11px]">Aster Mengistu</div>
                <div className="text-[10px] text-amber-400 font-mono">0922849104</div>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
