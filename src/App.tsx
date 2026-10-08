import React, { useState, useEffect } from 'react';
import { Prize, Winner, TicketPurchase, UserProfile, DrawFrequency, PaymentSubmission, PlatformSettings, ReferralFriend } from './types/prize';
import { INITIAL_PRIZES, INITIAL_WINNERS, INITIAL_USER, INITIAL_PAYMENT_SUBMISSIONS, INITIAL_PLATFORM_SETTINGS } from './data/prizeData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { PrizeCard } from './components/PrizeCard';
import { PrizeDetailModal } from './components/PrizeDetailModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { AdminApprovalModal } from './components/AdminApprovalModal';
import { SocialShareModal } from './components/SocialShareModal';
import { ReferralProgram } from './components/ReferralProgram';
import { WinnersView } from './components/WinnersView';
import { SuccessHistoryView } from './components/SuccessHistoryView';
import { ContactView } from './components/ContactView';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { TermsConditionsModal } from './components/TermsConditionsModal';
import { TelebirrInvoiceUploadModal } from './components/TelebirrInvoiceUploadModal';
import { 
  Gift, 
  Trophy, 
  Ticket, 
  MapPin, 
  Search, 
  Filter, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Smartphone, 
  Calendar,
  Share2,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  Users,
  UserCheck,
  Scale,
  HeartHandshake,
  Upload
} from 'lucide-react';

export default function App() {
  // Main Data States with localStorage persistence
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(() => {
    try {
      const saved = localStorage.getItem('heraprize_platform_settings_v5');
      return saved ? JSON.parse(saved) : INITIAL_PLATFORM_SETTINGS;
    } catch {
      return INITIAL_PLATFORM_SETTINGS;
    }
  });

  const [prizes, setPrizes] = useState<Prize[]>(() => {
    try {
      const saved = localStorage.getItem('heraprize_prizes_list_v5');
      return saved ? JSON.parse(saved) : INITIAL_PRIZES;
    } catch {
      return INITIAL_PRIZES;
    }
  });

  const [winners, setWinners] = useState<Winner[]>(INITIAL_WINNERS);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USER);

  // App Navigation & Language
  const [currentTab, setCurrentTab] = useState<'prizes' | 'winners' | 'history' | 'referral' | 'contact'>('prizes');
  const [lang, setLang] = useState<'en' | 'am'>('en');

  // Referral Invite Tracking (?ref=...)
  const [referredByCode, setReferredByCode] = useState<string | null>(null);

  // Search & Filtering for Active Prizes
  const [selectedFrequency, setSelectedFrequency] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [detailPrize, setDetailPrize] = useState<Prize | null>(null);
  const [checkoutPrize, setCheckoutPrize] = useState<Prize | null>(null);
  const [checkoutQuantity, setCheckoutQuantity] = useState(1);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isUploadInvoiceModalOpen, setIsUploadInvoiceModalOpen] = useState(false);
  
  // Social Share Modal
  const [isSocialShareOpen, setIsSocialShareOpen] = useState(false);
  const [socialSharePrize, setSocialSharePrize] = useState<Prize | null>(null);

  // Incoming Telebirr Payment Submissions (Target: 0910442314)
  const [paymentSubmissions, setPaymentSubmissions] = useState<PaymentSubmission[]>(INITIAL_PAYMENT_SUBMISSIONS);

  // Deep linking URL query inspection on load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const prizeId = params.get('prize');
    const tabParam = params.get('tab');
    const shareParam = params.get('share');
    const refParam = params.get('ref');
    const termsParam = params.get('terms');
    const uploadParam = params.get('upload') || params.get('invoice');

    if (refParam) {
      setReferredByCode(refParam);
    }
    if (termsParam === 'true') {
      setIsTermsModalOpen(true);
    }
    if (uploadParam === 'true') {
      setIsUploadInvoiceModalOpen(true);
    }
    if (prizeId) {
      const target = prizes.find(p => p.id === prizeId);
      if (target) {
        setDetailPrize(target);
      }
    }
    if (tabParam && ['prizes', 'winners', 'history', 'referral', 'contact'].includes(tabParam)) {
      setCurrentTab(tabParam as any);
    }
    if (shareParam === 'true') {
      setIsSocialShareOpen(true);
    }
  }, [prizes]);

  // Social Share Trigger
  const handleOpenSocialShare = (prize?: Prize | null) => {
    setSocialSharePrize(prize || null);
    setIsSocialShareOpen(true);
  };

  // Referral Reward Claim Handler
  const handleClaimReferralReward = (
    rewardAmountETB: number,
    bonusTicket: TicketPurchase,
    newFriend: ReferralFriend
  ) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        walletBalanceETB: prev.walletBalanceETB + rewardAmountETB,
        tickets: [bonusTicket, ...prev.tickets],
        totalReferralsCount: (prev.totalReferralsCount || 0) + 1,
        completedReferralsCount: (prev.completedReferralsCount || 0) + 1,
        referralEarningsETB: (prev.referralEarningsETB || 0) + rewardAmountETB,
        bonusLuckyNumbersCount: (prev.bonusLuckyNumbersCount || 0) + 1,
        referralFriends: [newFriend, ...(prev.referralFriends || [])]
      };
    });
  };

  // Admin: Save or Add Prize
  const handleSavePrize = (prize: Prize) => {
    setPrizes(prev => {
      const exists = prev.some(p => p.id === prize.id);
      const updated = exists ? prev.map(p => p.id === prize.id ? prize : p) : [prize, ...prev];
      try {
        localStorage.setItem('heraprize_prizes_list_v5', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Admin: Delete Prize
  const handleDeletePrize = (prizeId: string) => {
    setPrizes(prev => {
      const updated = prev.filter(p => p.id !== prizeId);
      try {
        localStorage.setItem('heraprize_prizes_list_v5', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Admin: Update Platform Settings
  const handleUpdatePlatformSettings = (newSettings: PlatformSettings) => {
    setPlatformSettings(newSettings);
    try {
      localStorage.setItem('heraprize_platform_settings_v5', JSON.stringify(newSettings));
    } catch (e) {
      console.error(e);
    }
  };

  // Submit new Telebirr invoice to system
  const handleSubmitPaymentSubmission = (submission: PaymentSubmission) => {
    setPaymentSubmissions(prev => [submission, ...prev]);
  };

  // Admin approves payment and automatic ticket generator issues tickets
  const handleApproveSubmission = (submissionId: string, customGeneratedTickets?: string[]) => {
    setPaymentSubmissions(prev =>
      prev.map(s => {
        if (s.id === submissionId) {
          return {
            ...s,
            status: 'approved',
            approvedAt: new Date().toISOString(),
            generatedTicketNumbers: customGeneratedTickets,
            smsNotificationSent: true
          };
        }
        return s;
      })
    );

    const sub = paymentSubmissions.find(s => s.id === submissionId);
    if (!sub) return;

    // Create ticket purchases
    const targetPrize = prizes.find(p => p.id === sub.prizeId) || prizes[0];
    const timestamp = Date.now();
    const newPurchases: TicketPurchase[] = (customGeneratedTickets || []).map((code, idx) => ({
      id: `tkt-admin-${timestamp}-${idx}`,
      ticketCode: code,
      luckyNumber: sub.selectedLuckyNumbers[idx] || code.split('-').pop(),
      prizeId: sub.prizeId,
      prizeTitle: sub.prizeTitle,
      frequency: sub.frequency,
      ticketPriceETB: sub.ticketPriceETB,
      quantity: 1,
      totalCostETB: sub.ticketPriceETB,
      drawDate: targetPrize.drawDate,
      venueLocation: targetPrize.venueLocation,
      purchasedAt: new Date().toISOString(),
      paymentMethod: 'telebirr',
      transactionRef: sub.telebirrTxId,
      status: 'active'
    }));

    // If payer is currently logged in, add tickets to their account!
    if (currentUser && currentUser.phone === sub.payerPhone) {
      setCurrentUser(prev => prev ? ({
        ...prev,
        tickets: [...newPurchases, ...prev.tickets]
      }) : null);
    }

    // Update tickets sold on prize
    setPrizes(prev =>
      prev.map(p =>
        p.id === sub.prizeId
          ? { ...p, soldTickets: Math.min(p.totalTickets, p.soldTickets + sub.quantity) }
          : p
      )
    );
  };

  // Admin rejects submission
  const handleRejectSubmission = (submissionId: string) => {
    setPaymentSubmissions(prev =>
      prev.map(s => s.id === submissionId ? { ...s, status: 'rejected' } : s)
    );
  };

  // Purchase Success Handler
  const handlePaymentSuccess = (
    newTickets: TicketPurchase[],
    paymentMethod: 'telebirr' | 'cbe_birr' | 'wallet',
    totalCost: number
  ) => {
    if (!currentUser) return;

    // Update user's tickets & wallet balance
    setCurrentUser(prev => {
      if (!prev) return null;
      const updatedWallet = paymentMethod === 'wallet' 
        ? Math.max(0, prev.walletBalanceETB - totalCost) 
        : prev.walletBalanceETB;

      return {
        ...prev,
        walletBalanceETB: updatedWallet,
        tickets: [...newTickets, ...prev.tickets]
      };
    });

    // Update prize sold counter
    if (checkoutPrize) {
      setPrizes(prev =>
        prev.map(p =>
          p.id === checkoutPrize.id
            ? { ...p, soldTickets: Math.min(p.totalTickets, p.soldTickets + newTickets.length) }
            : p
        )
      );
    }
  };

  // Top Up Wallet Handler
  const handleTopUpWallet = (amount: number) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        walletBalanceETB: prev.walletBalanceETB + amount
      };
    });
  };

  // Logout Handler
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Filtered Prizes
  const filteredPrizes = prizes.filter(p => {
    const matchesFreq = selectedFrequency === 'all' || p.frequency === selectedFrequency;
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.venueLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prizeValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.startupGoal && p.startupGoal.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFreq && matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-amber-400 selection:text-slate-950 flex flex-col text-white">
      
      {/* Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenWallet={() => setIsProfileModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAdminQueue={() => setIsAdminModalOpen(true)}
        onOpenSocialShare={() => handleOpenSocialShare(null)}
        onOpenTerms={() => setIsTermsModalOpen(true)}
        onOpenUploadInvoice={() => setIsUploadInvoiceModalOpen(true)}
        platformSettings={platformSettings}
        pendingApprovalCount={paymentSubmissions.filter(s => s.status === 'pending_admin_approval').length}
        lang={lang}
        setLang={setLang}
      />

      {/* Referred-By Top Welcome Banner (Triggered by ?ref=...) */}
      {referredByCode && (
        <div className="bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 text-slate-950 px-4 py-2 text-xs font-black shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-slate-950" />
              <span>
                {lang === 'en'
                  ? `🎉 You were invited by Ambassador ${referredByCode}! Register now with your phone number to claim 10 ETB Welcome Credit + 1 Free Lucky Number!`
                  : `🎉 በአምባሳደር ${referredByCode} ተጋብዘዋል! በስልክ ቁጥርዎ ሲመዘገቡ የ10 ብር የእንኳን ደህና መጡ ስጦታ እና ነፃ የዕድል ቁጥር ያገኛሉ!`}
              </span>
            </div>
            {!currentUser && (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-1 bg-slate-950 text-amber-400 hover:bg-slate-900 rounded-lg text-xs font-extrabold cursor-pointer transition shrink-0"
              >
                Claim 10 ETB Credit
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* TAB 1: ACTIVE PRIZES */}
        {currentTab === 'prizes' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Hero Banner with Live Countdown & Startup Metrics */}
            <HeroBanner
              onExploreDaily={() => {
                setSelectedFrequency('daily');
                window.scrollTo({ top: 580, behavior: 'smooth' });
              }}
              onViewWinners={() => setCurrentTab('winners')}
              onOpenSocialShare={() => handleOpenSocialShare(null)}
              onOpenUploadInvoice={() => setIsUploadInvoiceModalOpen(true)}
              platformSettings={platformSettings}
              lang={lang}
            />

            {/* Startup Competition Mission Callout Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-emerald-500/10 border border-amber-500/30 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-white text-sm sm:text-base">
                      {platformSettings.startupCompetitionTitle}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                      Job Creation
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {platformSettings.startupCompetitionTagline} Payments sent via Telebirr ({platformSettings.telebirrPhone}).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setCurrentTab('referral')}
                  className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <Users className="w-4 h-4" />
                  <span>Refer Friends (Earn 25 ETB)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenSocialShare(null)}
                  className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md shadow-sky-600/20"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share App</span>
                </button>
              </div>
            </div>

            {/* Filter and Category Ribbon */}
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-4 space-y-3">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                
                {/* Frequency Tabs */}
                <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 text-xs">
                  {[
                    { id: 'all', label: 'All Lucky Draws (ሁሉም)' },
                    { id: 'daily', label: 'Daily 25k ETB (ዕለታዊ)' },
                    { id: 'weekly', label: 'Weekly Draws (ሳምንታዊ)' },
                    { id: 'monthly', label: 'Monthly Mega (ወርሃዊ)' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedFrequency(tab.id)}
                      className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                        selectedFrequency === tab.id
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search Bar & Ticket Price Range Indicator */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-bold whitespace-nowrap">
                    <Ticket className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tickets: 300 - 600 ETB</span>
                  </div>

                  <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search 25k cash, Bishoftu..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 outline-hidden font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center justify-between gap-2 overflow-x-auto pt-2 border-t border-slate-800/80 text-xs pb-1">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {[
                    { id: 'all', label: 'All Categories' },
                    { id: 'cash', label: '💵 25k & Mega Cash Grants' },
                    { id: 'resort_stay', label: '🏖️ 2-Day Bishoftu Resorts Stay' },
                    { id: 'hotel_lunch', label: '🍽️ Kuriftu Bishoftu & Sheraton Lunch' },
                    { id: 'hotel_dinner', label: '🍷 Skylight & Haile Resort 5-Star Dinner' },
                    { id: 'vehicle', label: '🛺 2026 Commercial Bajaj Draws' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1 rounded-xl whitespace-nowrap font-medium transition cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-slate-800 text-amber-400 border border-amber-500/40 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="sm:hidden flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-mono font-bold shrink-0">
                  <span>300 - 600 ETB</span>
                </div>
              </div>
            </div>

            {/* Prizes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPrizes.map((prize) => (
                <PrizeCard
                  key={prize.id}
                  prize={prize}
                  onSelectPrize={(p) => setDetailPrize(p)}
                  onQuickBuy={(p) => {
                    setCheckoutPrize(p);
                    setCheckoutQuantity(1);
                  }}
                  onSharePrize={(p) => handleOpenSocialShare(p)}
                  lang={lang}
                />
              ))}
            </div>

            {filteredPrizes.length === 0 && (
              <div className="bg-slate-900/60 p-12 rounded-3xl border border-slate-800 text-center">
                <Gift className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-300">No Lucky Draws Match Your Filter</h4>
                <p className="text-xs text-slate-500 mt-1">Try switching back to 'All Lucky Draws' or clearing your search.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WINNERS LIST */}
        {currentTab === 'winners' && (
          <WinnersView winners={winners} lang={lang} />
        )}

        {/* TAB 3: SUCCESS HISTORY & MY TICKETS */}
        {currentTab === 'history' && (
          <SuccessHistoryView
            currentUser={currentUser}
            onExplorePrizes={() => setCurrentTab('prizes')}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onOpenUploadInvoice={() => setIsUploadInvoiceModalOpen(true)}
            lang={lang}
          />
        )}

        {/* TAB 4: REFERRAL PROGRAM (REFER & EARN) */}
        {currentTab === 'referral' && (
          <ReferralProgram
            currentUser={currentUser}
            platformSettings={platformSettings}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onClaimReferralReward={handleClaimReferralReward}
            lang={lang}
          />
        )}

        {/* TAB 5: CONTACT & RULES */}
        {currentTab === 'contact' && (
          <ContactView 
            lang={lang} 
            onOpenTerms={() => setIsTermsModalOpen(true)}
            onOpenSocialShare={() => handleOpenSocialShare(null)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-850">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/20">
                H
              </div>
              <div>
                <div className="text-white font-black text-sm flex items-center gap-2">
                  <span>HERAPRIZE ሄራ</span>
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Not-for-Profit Social Enterprise
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Mobilizing community fundraising for humanitarian relief services & sustainable job creation.
                </p>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsUploadInvoiceModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border border-sky-400/40 font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-sky-300" />
                <span>Upload Telebirr Invoice</span>
              </button>

              <button
                type="button"
                onClick={() => setIsTermsModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Terms & Conditions</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenSocialShare(null)}
                className="px-3.5 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Share Public App Link</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div className="flex flex-wrap items-center gap-3">
              <span>Licensed by National Lottery Administration (#{platformSettings.licenseNumber})</span>
              <span>•</span>
              <span>Strict No-Refund (300 - 600 ETB Tickets)</span>
              <span>•</span>
              <span>Job Creation Mandate: 3 Direct & 6 Indirect Businesses</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <span>Telebirr: <strong className="text-white font-mono">{platformSettings.telebirrPhone}</strong></span>
              <span>•</span>
              <span>Addis Ababa & Bishoftu</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}

      {/* 1. Prize Details Modal */}
      <PrizeDetailModal
        prize={detailPrize}
        isOpen={Boolean(detailPrize)}
        onClose={() => setDetailPrize(null)}
        onProceedToBuy={(prize, qty) => {
          setDetailPrize(null);
          setCheckoutPrize(prize);
          setCheckoutQuantity(qty);
        }}
        onOpenTerms={() => setIsTermsModalOpen(true)}
        lang={lang}
      />

      {/* 2. Payment Gateway Modal (Telebirr 0910442314 + Lucky Number Auto-Generator) */}
      <PaymentGatewayModal
        prize={checkoutPrize}
        quantity={checkoutQuantity}
        isOpen={Boolean(checkoutPrize)}
        currentUser={currentUser}
        onClose={() => setCheckoutPrize(null)}
        onSubmitPaymentSubmission={handleSubmitPaymentSubmission}
        onSuccess={handlePaymentSuccess}
        onOpenAuth={() => {
          setCheckoutPrize(null);
          setIsAuthModalOpen(true);
        }}
        onOpenTerms={() => setIsTermsModalOpen(true)}
        lang={lang}
      />

      {/* 2.2 Terms & Conditions Modal (Social Enterprise Charter, Job Creation, No Refund & Business Proposal) */}
      <TermsConditionsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        platformSettings={platformSettings}
        lang={lang}
      />

      {/* 2.5 Admin Control Center (Telebirr Approvals + Editable Prizes & Settings) */}
      <AdminApprovalModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        submissions={paymentSubmissions}
        onApproveSubmission={handleApproveSubmission}
        onRejectSubmission={handleRejectSubmission}
        prizes={prizes}
        onSavePrize={handleSavePrize}
        onDeletePrize={handleDeletePrize}
        platformSettings={platformSettings}
        onUpdatePlatformSettings={handleUpdatePlatformSettings}
        onOpenSocialShare={handleOpenSocialShare}
        lang={lang}
      />

      {/* 2.8 Social Media Share Link Generator Modal */}
      <SocialShareModal
        isOpen={isSocialShareOpen}
        onClose={() => setIsSocialShareOpen(false)}
        prize={socialSharePrize}
        platformSettings={platformSettings}
        lang={lang}
      />

      {/* 3. Authentication (Login / Register with Phone Number) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
        lang={lang}
      />

      {/* 4. Player Profile & Wallet Modal */}
      <ProfileModal
        currentUser={currentUser}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onTopUpWallet={handleTopUpWallet}
        onNavigateToReferral={() => setCurrentTab('referral')}
        lang={lang}
      />

      {/* 5. Telebirr Invoice Upload & Slip Verification Modal */}
      <TelebirrInvoiceUploadModal
        isOpen={isUploadInvoiceModalOpen}
        onClose={() => setIsUploadInvoiceModalOpen(false)}
        prizes={prizes}
        currentUser={currentUser}
        onSubmitPaymentSubmission={handleSubmitPaymentSubmission}
        onSuccess={handlePaymentSuccess}
        onOpenAuth={() => {
          setIsUploadInvoiceModalOpen(false);
          setIsAuthModalOpen(true);
        }}
        onOpenTerms={() => setIsTermsModalOpen(true)}
        platformSettings={platformSettings}
        lang={lang}
      />

    </div>
  );
}
