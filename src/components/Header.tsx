import React from 'react';
import { UserProfile, PlatformSettings } from '../types/prize';
import { isInternalDevUrl } from '../utils/shareUrl';
import { 
  Trophy, 
  Ticket, 
  Gift, 
  Phone, 
  User, 
  LogOut, 
  LogIn, 
  Wallet, 
  Globe, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  Plus,
  Share2,
  Users,
  Scale,
  HeartHandshake,
  Upload,
  Video
} from 'lucide-react';

interface HeaderProps {
  currentTab: 'prizes' | 'winners' | 'history' | 'referral' | 'contact';
  setCurrentTab: (tab: 'prizes' | 'winners' | 'history' | 'referral' | 'contact') => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenWallet: () => void;
  onOpenProfile: () => void;
  onOpenAdminQueue: () => void;
  onOpenSocialShare?: () => void;
  onOpenTerms?: () => void;
  onOpenUploadInvoice?: () => void;
  platformSettings?: PlatformSettings;
  pendingApprovalCount: number;
  lang: 'en' | 'am';
  setLang: (lang: 'en' | 'am') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenWallet,
  onOpenProfile,
  onOpenAdminQueue,
  onOpenSocialShare,
  onOpenTerms,
  onOpenUploadInvoice,
  platformSettings,
  pendingApprovalCount,
  lang,
  setLang
}) => {
  const inDevMode = isInternalDevUrl();

  return (
    <header className="sticky top-0 z-40 bg-slate-950 text-white border-b border-slate-800 shadow-xl">
      {/* Top Ticker Notification */}
      <div className="bg-gradient-to-r from-emerald-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-1.5 text-xs font-black">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
            <span className="tracking-wide uppercase">
              {platformSettings?.campaignAnnouncement 
                ? platformSettings.campaignAnnouncement
                : (lang === 'en' 
                    ? '🤝 Not-for-Profit Social Enterprise: Mobilizing Humanitarian Relief & Job Creation — Daily 130k ETB per Person & Bishoftu Retreats! Tickets: 300 - 600 ETB' 
                    : '🤝 ትርፍ-አልባ ማህበራዊ ድርጅት፡ ለሰብአዊ ድጋፍና ለሥራ ዕድል ፈጠራ — ዕለታዊ 130,000 ብር ለአንድ ሰው እና የቢሾፍቱ ሪዞርቶች! የዕጣ ዋጋ፡ 300 - 600 ብር')}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="hidden sm:flex items-center gap-1 font-extrabold text-slate-950">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NLA Licensed Social Enterprise (#9941)</span>
            </div>

            <button
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="px-2 py-0.5 rounded-md bg-slate-950 text-amber-300 hover:bg-slate-900 transition flex items-center gap-1 font-bold cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'en' ? 'አማርኛ' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('prizes')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-500/25 group-hover:scale-105 transition">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  HERA<span className="text-amber-400">PRIZE</span>
                </span>
                <span className="text-[10px] uppercase font-black px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                  ሄራ
                </span>
                <span className="hidden xl:inline-block text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Not-for-Profit
                </span>
              </div>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <HeartHandshake className="w-3 h-3 text-emerald-400 shrink-0 inline" />
                <span>{lang === 'en' ? 'Not-for-Profit Social Enterprise • Humanitarian & Jobs' : 'ትርፍ-አልባ ማህበራዊ ድርጅት • ሰብአዊ ድጋፍና የሥራ ዕድል'}</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setCurrentTab('prizes')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentTab === 'prizes'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>{lang === 'en' ? 'Active Prizes' : 'የዕጣ ዝርዝር'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('winners')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentTab === 'winners'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>{lang === 'en' ? 'Winners List' : 'የአሸናፊዎች ዝርዝር'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('history')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentTab === 'history'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Success Stories & Tickets' : 'የስኬት ታሪኮችና ዕጣዎች'}</span>
              {currentUser && currentUser.tickets.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-amber-400 font-mono">
                  {currentUser.tickets.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentTab('referral')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentTab === 'referral'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>{lang === 'en' ? 'Refer & Earn' : 'ጋብዘው ያሸንፉ'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                +25 ETB
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('contact')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentTab === 'contact'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{lang === 'en' ? 'Contact & Office' : 'አድራሻ'}</span>
            </button>

            {/* Terms & Conditions Action */}
            {onOpenTerms && (
              <button
                onClick={onOpenTerms}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-amber-300 transition cursor-pointer"
                title="Job Creation Mandate, No-Refund Policy & Business Proposal Rules"
              >
                <Scale className="w-4 h-4 text-amber-400" />
                <span>{lang === 'en' ? 'Terms & Rules' : 'ደንቦች'}</span>
              </button>
            )}

            {/* Telebirr Invoice Uploading Button */}
            {onOpenUploadInvoice && (
              <button
                onClick={onOpenUploadInvoice}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600/30 to-amber-500/20 hover:from-sky-600/50 hover:to-amber-500/30 border border-sky-400/40 text-sky-200 text-xs font-black transition cursor-pointer shadow-sm hover:scale-[1.02]"
                title="Upload Telebirr payment slip or invoice to receive tickets"
              >
                <Upload className="w-3.5 h-3.5 text-sky-300" />
                <span>{lang === 'en' ? 'Upload Invoice' : 'ቴሌብር ደረሰኝ ጫን'}</span>
              </button>
            )}

            {/* Share / Social Media Link Generator Button */}
            {onOpenSocialShare && (
              <button
                onClick={onOpenSocialShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-bold transition cursor-pointer"
                title="Share 100% public link (no 403 errors)"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span>{lang === 'en' ? 'Share Public Link' : 'ሊንክ አጋራ'}</span>
              </button>
            )}

            {/* Admin Payment Verification & Management Modal Trigger */}
            <button
              onClick={onOpenAdminQueue}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin ({pendingApprovalCount})</span>
              {pendingApprovalCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                  {pendingApprovalCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action / Authentication Corner */}
          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <>
                {/* Wallet Balance Chip */}
                <button
                  onClick={onOpenWallet}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition cursor-pointer"
                >
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  <div className="text-left text-xs">
                    <span className="text-[10px] text-slate-400 block leading-tight">Wallet</span>
                    <strong className="text-amber-400 font-mono">{currentUser.walletBalanceETB} ETB</strong>
                  </div>
                  <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs ml-1">
                    <Plus className="w-3 h-3" />
                  </span>
                </button>

                {/* Player Profile & Logout Dropdown */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onOpenProfile}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold transition cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px]">
                      {currentUser.fullName.charAt(0)}
                    </div>
                    <div className="text-left hidden md:block">
                      <div className="text-white text-xs leading-tight font-extrabold truncate max-w-[100px]">
                        {currentUser.fullName}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {currentUser.phone}
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={onLogout}
                    title="Log Out"
                    className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === 'en' ? 'Player Login (በስልክ ቁጥር)' : 'በስልክ ቁጥር ይግቡ'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-800 text-xs gap-1 overflow-x-auto">
          <button
            onClick={() => setCurrentTab('prizes')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              currentTab === 'prizes' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Prizes</span>
          </button>
          <button
            onClick={() => setCurrentTab('winners')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              currentTab === 'winners' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Winners</span>
          </button>
          <button
            onClick={() => setCurrentTab('history')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              currentTab === 'history' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Stories & Tickets</span>
          </button>
          <button
            onClick={() => setCurrentTab('referral')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              currentTab === 'referral' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Refer & Earn</span>
          </button>
          <button
            onClick={() => setCurrentTab('contact')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              currentTab === 'contact' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>
          {onOpenUploadInvoice && (
            <button
              onClick={onOpenUploadInvoice}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg whitespace-nowrap font-bold bg-sky-600/30 text-sky-200 border border-sky-400/40"
            >
              <Upload className="w-3.5 h-3.5 text-sky-300" />
              <span>Upload Slip</span>
            </button>
          )}
          {onOpenSocialShare && (
            <button
              onClick={onOpenSocialShare}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg whitespace-nowrap font-bold bg-sky-500/10 text-sky-300 border border-sky-500/30"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Share</span>
            </button>
          )}
          <button
            onClick={onOpenAdminQueue}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg whitespace-nowrap font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin ({pendingApprovalCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
