import React, { useState } from 'react';
import { UserProfile, PlatformSettings, TicketPurchase, ReferralFriend } from '../types/prize';
import { buildShareableUrl, isInternalDevUrl } from '../utils/shareUrl';
import { 
  Users, 
  Gift, 
  Share2, 
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  Sparkles, 
  Trophy, 
  Wallet, 
  Ticket, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  QrCode, 
  Flame, 
  UserPlus, 
  Briefcase,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Zap,
  HeartHandshake
} from 'lucide-react';

interface ReferralProgramProps {
  currentUser: UserProfile | null;
  platformSettings: PlatformSettings;
  onOpenAuth: () => void;
  onClaimReferralReward: (rewardAmountETB: number, bonusTicket: TicketPurchase, newFriend: ReferralFriend) => void;
  lang: 'en' | 'am';
}

export const ReferralProgram: React.FC<ReferralProgramProps> = ({
  currentUser,
  platformSettings,
  onOpenAuth,
  onClaimReferralReward,
  lang
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [simulateFriendName, setSimulateFriendName] = useState('Natnael Hailu');
  const [simulateFriendPhone, setSimulateFriendPhone] = useState('0911882233');
  const [justRewardedToast, setJustRewardedToast] = useState<{
    friend: string;
    amount: number;
    ticketCode: string;
  } | null>(null);

  // Fallback referral code if not logged in or missing
  const referralCode = currentUser?.referralCode || (currentUser ? `HP-${currentUser.fullName.replace(/\s+/g, '').toUpperCase().slice(0, 6)}26` : 'HERAPRIZE2026');

  // Compute 100% public shareable URL that will NEVER return 403 Forbidden!
  const referralUrl = buildShareableUrl(
    { ref: referralCode, campaign: 'humanitarian-job-creation' },
    platformSettings.shareableAppUrl
  );

  const inDevMode = isInternalDevUrl();

  const totalInvited = currentUser?.totalReferralsCount ?? 5;
  const completedCount = currentUser?.completedReferralsCount ?? 3;
  const earningsETB = currentUser?.referralEarningsETB ?? 75;
  const bonusTicketsCount = currentUser?.bonusLuckyNumbersCount ?? 3;
  const friendsList = currentUser?.referralFriends ?? [];

  // Copy Handlers
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Telegram direct share text
  const telegramShareText = lang === 'en'
    ? `🇪🇹 🤝 Join HeraPrize Not-for-Profit Social Enterprise & Job Creation Fund with my referral invite (${referralCode})!\n🎁 Sign up & get 50 ETB Welcome Credit towards your first ticket!\n💰 Win 130,000 ETB daily startup prize per person (supports 3 businesses: 3 direct & 6 indirect) & 2-day Bishoftu Resorts stays (meals + 2 bed/2 night).\n🎫 Tickets: 300 - 600 ETB via Telebirr!\n🤝 100% of proceeds mobilize humanitarian relief & catalytic job creation!\n\n🔗 Public Link: ${referralUrl}`
    : `🇪🇹 🤝 በሄራፕራይዝ የሰብአዊ ድጋፍና የሥራ ዕድል ፈጠራ ማህበራዊ ድርጅት በእኔ የግብዣ ኮድ (${referralCode}) ይሳተፉ!\n🎁 ሲመዘገቡ የ50 ብር የመቀበያ ስጦታ ያገኛሉ!\n💰 ዕለታዊ 130,000 ብር ለአንድ ሰው (3 ሰዎችን ንግድ እንዲከፍቱ ድጋፍ፡ 3 የቀጥታ እና 6 ቀጥተኛ ያልሆኑ ንግዶች) እና በቢሾፍቱ ሪዞርቶች የ2 ቀን እረፍት ያሸንፉ!\n🎫 የዕጣ ዋጋ፡ 300 - 600 ብር በቴሌብር!\n🤝 100% ገቢው ለሰብአዊ ድጋፍና ለሥራ ዕድል ፈጠራ ይውላል!\n\n🔗 ሊንኩን ይክፈቱ፡ ${referralUrl}`;

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(telegramShareText)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(telegramShareText)}`;
  const smsShareUrl = `sms:?body=${encodeURIComponent(
    `Join HeraPrize Not-for-Profit Social Enterprise with my code ${referralCode} and get 50 ETB credit: ${referralUrl}`
  )}`;

  // QR Code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(referralUrl)}`;

  // Handle Simulation of a Friend Signing Up & Purchasing a Ticket
  const handleExecuteSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const timestamp = Date.now();
    const luckyNum = Math.floor(100000 + Math.random() * 900000).toString();
    const bonusTicketCode = `HP-REF-${luckyNum}`;

    const newTicket: TicketPurchase = {
      id: `tkt-ref-${timestamp}`,
      ticketCode: bonusTicketCode,
      luckyNumber: luckyNum,
      prizeId: 'prz-daily-01',
      prizeTitle: 'Daily 130,000 ETB Startup Fund (Referral Bonus Ticket)',
      frequency: 'daily',
      ticketPriceETB: 350,
      quantity: 1,
      totalCostETB: 350,
      drawDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      venueLocation: 'National Direct Mobile Transfer (telebirr / CBE)',
      purchasedAt: new Date().toISOString(),
      paymentMethod: 'wallet',
      transactionRef: `REF-BONUS-${timestamp.toString().slice(-6)}`,
      status: 'active'
    };

    const maskedPhone = simulateFriendPhone.length >= 10
      ? `${simulateFriendPhone.slice(0, 4)} *** ${simulateFriendPhone.slice(-3)}`
      : '0911 *** 892';

    const newFriendRecord: ReferralFriend = {
      id: `ref-sim-${timestamp}`,
      name: simulateFriendName,
      phoneMasked: maskedPhone,
      joinedAt: new Date().toISOString(),
      status: 'completed_rewarded',
      firstPrizePurchased: 'Daily 130,000 ETB Startup Fund (Ticket: 350 ETB)',
      creditRewardETB: 25,
      bonusLuckyTicket: bonusTicketCode
    };

    onClaimReferralReward(25, newTicket, newFriendRecord);

    setJustRewardedToast({
      friend: simulateFriendName,
      amount: 25,
      ticketCode: bonusTicketCode
    });

    setShowSimulateModal(false);

    setTimeout(() => {
      setJustRewardedToast(null);
    }, 6000);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-white">
      
      {/* Toast Celebration Banner */}
      {justRewardedToast && (
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 text-slate-950 p-4 rounded-3xl shadow-2xl flex items-center justify-between font-bold animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <div className="text-sm font-black">
                🎉 Referral Reward Credited!
              </div>
              <p className="text-xs text-slate-900 font-semibold">
                <strong>{justRewardedToast.friend}</strong> completed their first ticket purchase. You received <strong>+{justRewardedToast.amount} ETB</strong> in your wallet & Bonus Ticket <strong>{justRewardedToast.ticketCode}</strong>!
              </p>
            </div>
          </div>

          <span className="text-[11px] uppercase tracking-wider bg-slate-950 text-emerald-400 px-3 py-1 rounded-xl font-black">
            +25 ETB & 1 Ticket
          </span>
        </div>
      )}

      {/* Top Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 border border-amber-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Headline & Terms */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-black tracking-wide">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>REFER & EARN PROGRAM • ጋብዘው ያሸንፉ</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
              Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400">25 ETB Wallet Credit</span> + Free Lucky Numbers for Every Friend!
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {lang === 'en'
                ? 'Share your unique invite link with friends, co-workers, and fellow entrepreneurs. When they sign up and purchase their first ticket, you instantly receive 25 ETB wallet credit plus a free lucky lottery number. Your invited friend gets a 10 ETB welcome bonus!'
                : 'ጓደኞችዎን፣ የስራ ባልደረቦችዎን እና ወጣቶችን በልዩ የግብዣ ሊንክዎ ይጋብዙ። ጓደኛዎ ተመዝግቦ የመጀመሪያውን ዕጣ ሲቆርጥ ወዲያውኑ 25 ብር በዋሌትዎ እና ተጨማሪ ነፃ የዕድል ቁጥር ያገኛሉ። ጓደኛዎም የ10 ብር የእንኳን ደህና መጡ ስጦታ ያገኛል!'}
            </p>

            {/* Benefit Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">You Receive</span>
                <div className="text-amber-400 font-black text-sm">25 ETB / Friend</div>
                <p className="text-[11px] text-slate-400">Added directly to your wallet balance</p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Bonus Entries</span>
                <div className="text-emerald-400 font-black text-sm">+1 Lucky Ticket</div>
                <p className="text-[11px] text-slate-400">Free certified entry into tonight's draw</p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Friend Gets</span>
                <div className="text-sky-400 font-black text-sm">10 ETB Welcome</div>
                <p className="text-[11px] text-slate-400">Instant discount on their first ticket</p>
              </div>
            </div>
          </div>

          {/* Right: Live Invite Box & QR Code */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-amber-500/30 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-extrabold text-xs text-white uppercase tracking-wider">
                    Your Personal Ambassador Link
                  </span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
                  Active
                </span>
              </div>

              {/* Referral Code Display */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">
                  Your Unique Referral Code:
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5 font-mono text-base font-black text-amber-400 tracking-wider flex items-center justify-between">
                    <span>{referralCode}</span>
                    <span className="text-[10px] text-slate-500 font-sans font-normal uppercase">Code</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
                    title="Copy Referral Code"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Referral URL Link */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">
                  Full Invite Link:
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-3.5 py-2 text-xs font-mono text-slate-300 truncate select-all">
                    {referralUrl}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-md shadow-amber-500/20"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 403 Access Error Prevention Notice */}
              <div className="p-2.5 rounded-xl bg-sky-950/70 border border-sky-500/30 flex items-start gap-2 text-[11px] text-slate-300">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <span className="font-bold text-sky-300">Public Preview Link (No 403 errors):</span> Recipients on Telegram or browsers can open this link directly without login.
                  {inDevMode && (
                    <span className="block text-[10px] text-amber-300 font-mono mt-0.5">
                      ✓ Auto-converted private dev URL to public shareable preview URL
                    </span>
                  )}
                </div>
              </div>

              {/* One-Click Share Buttons */}
              <div className="pt-1 grid grid-cols-3 gap-2">
                <a
                  href={telegramShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>

                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={smsShareUrl}
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 transition"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>SMS</span>
                </a>
              </div>

              {/* Simulation Testing Button */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    if (!currentUser) onOpenAuth();
                    else setShowSimulateModal(true);
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Test Referral Engine (Simulate Friend Purchase)</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Stats Counters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Total Invited</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {totalInvited} <span className="text-xs text-slate-400 font-sans font-normal">Friends</span>
          </div>
          <p className="text-[11px] text-slate-400">Signed up with your link</p>
        </div>

        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Purchased Tickets</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {completedCount} <span className="text-xs text-slate-400 font-sans font-normal">Qualified</span>
          </div>
          <p className="text-[11px] text-slate-400">Completed 1st ticket purchase</p>
        </div>

        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Bonus Credits Earned</span>
            <Wallet className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
            {earningsETB} <span className="text-xs text-slate-400 font-sans font-normal">ETB</span>
          </div>
          <p className="text-[11px] text-slate-400">Added to your player wallet</p>
        </div>

        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Free Lucky Numbers</span>
            <Ticket className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">
            {bonusTicketsCount} <span className="text-xs text-slate-400 font-sans font-normal">Tickets</span>
          </div>
          <p className="text-[11px] text-slate-400">Issued & registered for draws</p>
        </div>

      </div>

      {/* Ambassador Milestone Tiers */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Ambassador Milestone Tiers (የደረጃ ማበረታቻዎች)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Unlock escalating bonuses as more friends join and support the Job Creation Initiative.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30 font-bold self-start sm:self-auto">
            Current Tier: Silver Ambassador (3/10 Qualified)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Tier 1 */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/40 relative space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-[10px] uppercase">
                Tier 1 • Unlocked ✓
              </span>
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">Starter Ambassador</h4>
              <div className="text-xs text-slate-400">3 Friends Qualified</div>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>75 ETB Wallet Credit Bonus</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>3 Free Lucky Tickets</span>
              </li>
            </ul>
          </div>

          {/* Tier 2 */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-amber-500/40 relative space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-black text-[10px] uppercase">
                Tier 2 • In Progress (3/10)
              </span>
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">Silver Youth Builder</h4>
              <div className="text-xs text-slate-400">10 Friends Qualified</div>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span><strong>500 ETB</strong> Wallet Bonus</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>VIP Entry into Monthly 250k Mega Draw</span>
              </li>
            </ul>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: '30%' }}></div>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 relative space-y-3 opacity-90">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 font-black text-[10px] uppercase">
                Tier 3 • Milestone Target
              </span>
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">Gold Startup Patron</h4>
              <div className="text-xs text-slate-400">25 Friends Qualified</div>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span><strong>1,500 ETB</strong> Instant Cash Grant</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Invitation to Founder Dinner in Addis Ababa</span>
              </li>
            </ul>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '12%' }}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Friends Referral History Table */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <span>Your Referral Activity ({friendsList.length} Friends)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live log of invited friends, their first ticket purchase status, and rewards credited.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowSimulateModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/20"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Simulate New Referral</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {friendsList.map((friend) => (
            <div
              key={friend.id}
              className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-amber-400">
                  {friend.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm">{friend.name}</span>
                    <span className="font-mono text-slate-400 text-[11px]">📱 {friend.phoneMasked}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Joined: {new Date(friend.joinedAt).toLocaleDateString()} {friend.firstPrizePurchased && `• Purchased: ${friend.firstPrizePurchased}`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {friend.status === 'completed_rewarded' ? (
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>+25 ETB & Ticket Credited</span>
                    </span>
                    {friend.bonusLuckyTicket && (
                      <span className="text-[10px] text-amber-400 font-mono block mt-0.5">
                        Code: {friend.bonusLuckyTicket}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-300 font-bold text-[10px] uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Awaiting 1st Ticket Purchase</span>
                  </span>
                )}
              </div>
            </div>
          ))}

          {friendsList.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              You haven't referred any friends yet. Share your invite link to start earning!
            </div>
          )}
        </div>
      </div>

      {/* How It Works & Rules */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-xs text-slate-400 space-y-3">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Referral Program Rules & Fair Play Policy</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[11px] leading-relaxed">
          <div>
            <strong className="text-slate-200 block mb-1">1. Qualification Rule</strong>
            A referral qualifies as completed when the new user registers with a valid Ethiopian phone number and buys at least 1 ticket via Telebirr or CBE Birr.
          </div>
          <div>
            <strong className="text-slate-200 block mb-1">2. Instant Payout</strong>
            Referral credits (25 ETB per completed friend) are credited immediately to your player wallet and can be used to purchase any lucky draw ticket.
          </div>
          <div>
            <strong className="text-slate-200 block mb-1">3. National Lottery Regulated</strong>
            All generated lucky tickets are certified by the National Lottery Administration. No limit on total friends you can refer!
          </div>
        </div>
      </div>

      {/* MODAL: SIMULATE NEW REFERRAL SIGNUP & PURCHASE */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-800 overflow-hidden text-white p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-base">Simulate Friend Referral</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSimulateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Test how the referral engine behaves when an invited friend opens your link, registers their phone number, and purchases a ticket.
            </p>

            <form onSubmit={handleExecuteSimulation} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Friend's Full Name</label>
                <input
                  type="text"
                  required
                  value={simulateFriendName}
                  onChange={(e) => setSimulateFriendName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Friend's Ethiopian Phone Number</label>
                <input
                  type="tel"
                  required
                  value={simulateFriendPhone}
                  onChange={(e) => setSimulateFriendPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1 text-[11px] text-amber-300">
                <div className="font-bold">What will happen on submit:</div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                  <li><strong>+25 ETB</strong> added directly to your Wallet</li>
                  <li><strong>+1 Free Certified Lucky Ticket</strong> generated in your account</li>
                  <li>Friend logged as qualified referral in your dashboard</li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSimulateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Simulate & Claim Reward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
