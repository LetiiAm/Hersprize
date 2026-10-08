import React, { useState } from 'react';
import { PaymentSubmission, Prize, PlatformSettings, DrawFrequency, PrizeCategory } from '../types/prize';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  Ticket, 
  Send, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  Copy, 
  Dice5,
  Edit,
  Trash2,
  PlusCircle,
  Briefcase,
  Settings,
  Share2,
  DollarSign,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Check,
  Save,
  RotateCcw
} from 'lucide-react';

interface AdminApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: PaymentSubmission[];
  onApproveSubmission: (submissionId: string, customGeneratedTickets?: string[]) => void;
  onRejectSubmission: (submissionId: string) => void;
  prizes: Prize[];
  onSavePrize: (prize: Prize) => void;
  onDeletePrize: (prizeId: string) => void;
  platformSettings: PlatformSettings;
  onUpdatePlatformSettings: (settings: PlatformSettings) => void;
  onOpenSocialShare?: (prize?: Prize | null) => void;
  lang: 'en' | 'am';
}

const PRESET_IMAGES = [
  { label: '💵 10k/50k Cash Stack', url: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=800&q=80' },
  { label: '🏨 Kuriftu Bishoftu Resort', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
  { label: '🍽️ Skylight Hotel Dinner', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
  { label: '🛺 Bajaj Commercial Vehicle', url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80' },
  { label: '☕ Café & Food Equipment', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' },
  { label: '💻 Tech & Laptop Station', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
];

export const AdminApprovalModal: React.FC<AdminApprovalModalProps> = ({
  isOpen,
  onClose,
  submissions,
  onApproveSubmission,
  onRejectSubmission,
  prizes,
  onSavePrize,
  onDeletePrize,
  platformSettings,
  onUpdatePlatformSettings,
  onOpenSocialShare,
  lang
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'approvals' | 'prizes' | 'settings' | 'social'>('approvals');

  // Approvals State
  const [selectedSubId, setSelectedSubId] = useState<string | null>(
    submissions[0]?.id || null
  );
  const [lastDispatchedSms, setLastDispatchedSms] = useState<{
    phone: string;
    tickets: string[];
    prize: string;
  } | null>(null);

  // Prize Editing State
  const [editingPrize, setEditingPrize] = useState<Prize | null>(null);
  const [isNewPrize, setIsNewPrize] = useState(false);
  const [savePrizeSuccess, setSavePrizeSuccess] = useState(false);

  // Platform Settings State (form clone)
  const [settingsForm, setSettingsForm] = useState<PlatformSettings>({ ...platformSettings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const activeSub = submissions.find(s => s.id === selectedSubId) || submissions[0];

  // 1. Approval Logic
  const handleApproveWithAutoGenerator = (sub: PaymentSubmission) => {
    const generated: string[] = [];
    for (let i = 0; i < sub.quantity; i++) {
      const luckyNum = sub.selectedLuckyNumbers[i] || Math.floor(100000 + Math.random() * 900000).toString();
      const prefix = sub.frequency === 'daily' ? 'HP-D' : sub.frequency === 'weekly' ? 'HP-W' : 'HP-M';
      generated.push(`${prefix}-${luckyNum}`);
    }

    onApproveSubmission(sub.id, generated);

    setLastDispatchedSms({
      phone: sub.payerPhone,
      tickets: generated,
      prize: sub.prizeTitle
    });

    setTimeout(() => {
      setLastDispatchedSms(null);
    }, 6000);
  };

  const pendingCount = submissions.filter(s => s.status === 'pending_admin_approval').length;

  // 2. Prize Edit / Create
  const handleStartCreatePrize = () => {
    const newId = `prz-custom-${Date.now()}`;
    setEditingPrize({
      id: newId,
      title: 'New Startup Seed Prize',
      titleAmharic: 'አዲስ የሥራ ማስጀመሪያ ሽልማት',
      frequency: 'daily',
      category: 'cash',
      prizeValue: '130,000 ETB Cash Grant per Person',
      venueLocation: 'Direct telebirr / CBE Transfer',
      ticketPriceETB: 350,
      totalTickets: 500,
      soldTickets: 0,
      drawDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      drawDateFormatted: 'Tomorrow at 9:00 PM EAT',
      image: PRESET_IMAGES[0].url,
      description: 'Startup seed fund designed to empower young Ethiopian entrepreneurs with starting capital.',
      descriptionAmharic: 'ለወጣቶችና ጀማሪ ነጋዴዎች የሥራ ማስጀመሪያ የሚሆን የገንዘብ ድጋፍ።',
      inclusions: [
        'Direct telebirr / CBE Transfer',
        'Tax-free business grant',
        'Official NLA certified lottery ticket'
      ],
      featured: false,
      terms: 'Subject to National Lottery Administration regulations.',
      startupGoal: 'Support 3 people to open business: 3 direct + 6 indirect businesses',
      jobsEstimate: 9,
      directBusinesses: 3,
      indirectBusinesses: 6,
      supportPeoples: 3
    });
    setIsNewPrize(true);
  };

  const handleSavePrizeForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPrize) return;

    onSavePrize(editingPrize);
    setSavePrizeSuccess(true);
    setTimeout(() => {
      setSavePrizeSuccess(false);
      setEditingPrize(null);
      setIsNewPrize(false);
    }, 1200);
  };

  // 3. Platform Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePlatformSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[94vh] text-white my-auto">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg">
                  HeraPrize Admin & Management Suite
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 font-mono text-[11px] font-bold">
                  Telebirr: {platformSettings.telebirrPhone}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-900">
                Manage Startup Competition prizes, approve Telebirr payments, and update app settings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-950/20 hover:bg-slate-950/30 flex items-center justify-center text-slate-950 font-bold transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="bg-slate-950 px-6 pt-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => { setActiveTab('approvals'); setEditingPrize(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold transition cursor-pointer ${
              activeTab === 'approvals'
                ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Telebirr Approvals ({pendingCount})</span>
          </button>

          <button
            onClick={() => { setActiveTab('prizes'); setEditingPrize(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold transition cursor-pointer ${
              activeTab === 'prizes'
                ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4 text-amber-400" />
            <span>Manage & Edit Prizes ({prizes.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('settings'); setEditingPrize(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold transition cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 text-amber-400" />
            <span>Startup Competition & Info Settings</span>
          </button>

          <button
            onClick={() => { setActiveTab('social'); setEditingPrize(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold transition cursor-pointer ${
              activeTab === 'social'
                ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>Social Media Campaign Links</span>
          </button>
        </div>

        {/* Live SMS Dispatched Toast */}
        {lastDispatchedSms && (
          <div className="bg-emerald-500 text-slate-950 px-6 py-2.5 flex items-center justify-between text-xs font-bold animate-fadeIn shadow-md">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>
                SMS Dispatched to <strong>{lastDispatchedSms.phone}</strong>: "HeraPrize Alert: Payment approved! Assigned Ticket(s): {lastDispatchedSms.tickets.join(', ')} registered for {lastDispatchedSms.prize}."
              </span>
            </div>
            <span className="text-[10px] font-black uppercase bg-slate-950 text-emerald-400 px-2 py-0.5 rounded">
              Ethio Telecom SMS Sent
            </span>
          </div>
        )}

        {/* ===================== TAB 1: TELEBIRR APPROVALS ===================== */}
        {activeTab === 'approvals' && (
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            {/* Left Column: Submissions Queue List */}
            <div className="md:col-span-5 p-4 overflow-y-auto space-y-2 bg-slate-950/50 max-h-[70vh]">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="font-bold text-slate-400">Incoming Telebirr Transfers</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-[10px]">
                  {pendingCount} Pending
                </span>
              </div>

              {submissions.map((sub) => {
                const isSelected = sub.id === (activeSub?.id || '');
                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubId(sub.id)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer text-xs space-y-1.5 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white">{sub.payerName}</span>
                      <span className="font-mono text-amber-400 font-bold">{sub.totalAmountETB} ETB</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>📱 {sub.payerPhone}</span>
                      <span>Ref: {sub.telebirrTxId.slice(0, 10)}...</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800/80">
                      <span className="text-slate-500 truncate max-w-[150px]">{sub.prizeTitle}</span>
                      <span className={`px-2 py-0.2 rounded font-bold uppercase ${
                        sub.status === 'approved' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {sub.status === 'approved' ? '✓ Approved' : '● Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Selected Invoice Inspection */}
            <div className="md:col-span-7 p-6 overflow-y-auto space-y-5 text-xs bg-slate-900 max-h-[70vh]">
              {activeSub ? (
                <>
                  <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Verification Status</span>
                      <span className={`text-sm font-black mt-0.5 block ${
                        activeSub.status === 'approved' ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {activeSub.status === 'approved' ? '✓ PAYMENT APPROVED & TICKETS DISPATCHED' : '⏳ PENDING ADMIN APPROVAL'}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Amount Sent to {platformSettings.telebirrPhone}</span>
                      <span className="text-xl font-black text-white font-mono">{activeSub.totalAmountETB} ETB</span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                      Telebirr Transfer Proof
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Payer Full Name</span>
                        <strong className="text-white text-xs">{activeSub.payerName}</strong>
                      </div>

                      <div>
                        <span className="text-slate-500 block text-[10px]">Payer Phone (SMS Recipient)</span>
                        <strong className="text-emerald-400 text-xs font-mono">{activeSub.payerPhone}</strong>
                      </div>

                      <div>
                        <span className="text-slate-500 block text-[10px]">Target Telebirr Number</span>
                        <strong className="text-white text-xs font-mono">{platformSettings.telebirrPhone} ({platformSettings.telebirrName})</strong>
                      </div>

                      <div>
                        <span className="text-slate-500 block text-[10px]">Telebirr Transaction Ref</span>
                        <strong className="text-amber-400 text-xs font-mono">{activeSub.telebirrTxId}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Player's chosen lucky numbers */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Dice5 className="w-4 h-4 text-amber-400" />
                        <span>Player Selected Lucky Numbers ({activeSub.quantity} Tickets)</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">6-Digit Format</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {activeSub.selectedLuckyNumbers.map((num, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-mono font-black text-sm tracking-wider shadow-sm"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Attached Telebirr Receipt */}
                  {activeSub.attachedInvoiceUrl && (
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-300 block">
                        Attached Telebirr Receipt Screenshot
                      </span>
                      <img
                        src={activeSub.attachedInvoiceUrl}
                        alt="Telebirr invoice proof"
                        className="w-full h-36 object-cover rounded-xl border border-slate-800 shadow-sm"
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    {activeSub.status !== 'approved' ? (
                      <button
                        type="button"
                        onClick={() => handleApproveWithAutoGenerator(activeSub)}
                        className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/25 cursor-pointer hover:scale-[1.01]"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>
                          Click Automatic Ticket Number Generator & Dispatch SMS to {activeSub.payerPhone}
                        </span>
                      </button>
                    ) : (
                      <div className="w-full p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approved! Assigned ticket numbers generated & sent to {activeSub.payerPhone}.</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="p-12 text-center text-slate-500">
                  Select an invoice submission from the queue to review and generate tickets.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB 2: MANAGE & EDIT PRIZES ===================== */}
        {activeTab === 'prizes' && (
          <div className="p-6 overflow-y-auto space-y-6 text-xs max-h-[75vh]">
            
            {/* Header with Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-amber-400" />
                  <span>Startup Competition Prizes Catalog</span>
                </h4>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  All prizes, ticket prices, withdraw dates, and job creation goals can be edited or created here.
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartCreatePrize}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center gap-2 transition shadow-md shadow-amber-500/20 cursor-pointer self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Prize / ውድድር ጨምር</span>
              </button>
            </div>

            {/* Prize Editor Form (Modal or Inline) */}
            {editingPrize ? (
              <form onSubmit={handleSavePrizeForm} className="bg-slate-950 p-6 rounded-3xl border border-amber-500/40 space-y-5 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-sm font-black text-amber-400 flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    <span>{isNewPrize ? 'Create New Startup Prize' : `Edit Prize: ${editingPrize.title}`}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingPrize(null)}
                    className="text-slate-400 hover:text-white font-bold"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title (English) */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Prize Title (English)</label>
                    <input
                      type="text"
                      required
                      value={editingPrize.title}
                      onChange={(e) => setEditingPrize({ ...editingPrize, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
                    />
                  </div>

                  {/* Title (Amharic) */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">የሽልማቱ ስም (አማርኛ)</label>
                    <input
                      type="text"
                      value={editingPrize.titleAmharic}
                      onChange={(e) => setEditingPrize({ ...editingPrize, titleAmharic: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
                    />
                  </div>

                  {/* Draw Frequency */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Draw Frequency / ዙር</label>
                    <select
                      value={editingPrize.frequency}
                      onChange={(e) => setEditingPrize({ ...editingPrize, frequency: e.target.value as DrawFrequency })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
                    >
                      <option value="daily">Daily Draw (ዕለታዊ - e.g. 10,000 ETB / Kuriftu Lunch)</option>
                      <option value="weekly">Weekly Draw (ሳምንታዊ - e.g. 50,000 ETB / Weekend Retreat)</option>
                      <option value="monthly">Monthly Mega Draw (ወርሃዊ - e.g. 250,000 ETB / Commercial Bajaj)</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Category / ዘርፍ</label>
                    <select
                      value={editingPrize.category}
                      onChange={(e) => setEditingPrize({ ...editingPrize, category: e.target.value as PrizeCategory })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
                    >
                      <option value="cash">💵 Cash Seed Grant (ጥሬ ገንዘብ)</option>
                      <option value="hotel_lunch">🍽️ Kuriftu Bishoftu / Hotel Lunch (የምሳ ግብዣ)</option>
                      <option value="hotel_dinner">🍷 Skylight / 5-Star Hotel Dinner (የእራት ግብዣ)</option>
                      <option value="resort_stay">🏖️ Resort Founder Stay & Retreat (የሪዞርት እረፍት)</option>
                      <option value="vehicle">🛺 Vehicle / Commercial Bajaj (ተሽከርካሪ)</option>
                      <option value="electronics">💻 Equipment / Startup Tools (መሳሪያዎች)</option>
                    </select>
                  </div>

                  {/* Prize Value */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Prize Value (e.g. 10,000 ETB Cash, Lunch Package)</label>
                    <input
                      type="text"
                      required
                      value={editingPrize.prizeValue}
                      onChange={(e) => setEditingPrize({ ...editingPrize, prizeValue: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
                    />
                  </div>

                  {/* Venue Location */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Venue / Location (e.g. Kuriftu Bishoftu, Addis Ababa)</label>
                    <input
                      type="text"
                      required
                      value={editingPrize.venueLocation}
                      onChange={(e) => setEditingPrize({ ...editingPrize, venueLocation: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
                    />
                  </div>

                  {/* Ticket Price in ETB */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-300">Ticket Cost in ETB (300 - 600 ETB)</label>
                      <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Required: 300 - 600 ETB
                      </span>
                    </div>
                    <input
                      type="number"
                      required
                      min={300}
                      max={600}
                      value={editingPrize.ticketPriceETB}
                      onChange={(e) => setEditingPrize({ ...editingPrize, ticketPriceETB: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold"
                    />
                    <p className="text-[11px] text-slate-400">All competition ticket prices must be between 300 and 600 ETB.</p>
                  </div>

                  {/* Total Tickets Available */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Total Tickets Cap</label>
                    <input
                      type="number"
                      required
                      min={10}
                      value={editingPrize.totalTickets}
                      onChange={(e) => setEditingPrize({ ...editingPrize, totalTickets: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold"
                    />
                  </div>

                  {/* Draw Date Formatted */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Withdraw / Draw Date Text (e.g. Tonight at 9:00 PM EAT)</label>
                    <input
                      type="text"
                      required
                      value={editingPrize.drawDateFormatted}
                      onChange={(e) => setEditingPrize({ ...editingPrize, drawDateFormatted: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
                    />
                  </div>

                  {/* Startup & Job Creation Goal */}
                  <div className="space-y-1">
                    <label className="font-bold text-amber-300">Startup Goal / የስራ ዕድል ዓላማ</label>
                    <input
                      type="text"
                      placeholder="e.g. Launch neighborhood retail kiosk, create 2 jobs"
                      value={editingPrize.startupGoal || ''}
                      onChange={(e) => setEditingPrize({ ...editingPrize, startupGoal: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 font-medium"
                    />
                  </div>

                  {/* Jobs Estimate */}
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Estimated Jobs Created</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={editingPrize.jobsEstimate || 1}
                      onChange={(e) => setEditingPrize({ ...editingPrize, jobsEstimate: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                    />
                  </div>

                  {/* Direct & Indirect Business Open Impact */}
                  <div className="space-y-1">
                    <label className="font-bold text-emerald-400">Direct Businesses Open (ቀጥታ ንግድ መክፈት)</label>
                    <input
                      type="number"
                      min={0}
                      max={50}
                      value={editingPrize.directBusinesses ?? 3}
                      onChange={(e) => setEditingPrize({ ...editingPrize, directBusinesses: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-sky-400">Indirect Businesses Open (ቀጥተኛ ያልሆኑ ንግዶች)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={editingPrize.indirectBusinesses ?? 6}
                      onChange={(e) => setEditingPrize({ ...editingPrize, indirectBusinesses: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-sky-500/40 text-sky-300 font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-amber-300">People Supported to Open Business (የሚደገፉ ሰዎች ብዛት)</label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={editingPrize.supportPeoples ?? 3}
                      onChange={(e) => setEditingPrize({ ...editingPrize, supportPeoples: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 font-mono font-bold"
                    />
                  </div>

                  {/* Featured Toggle */}
                  <div className="flex items-center gap-3 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-bold">
                      <input
                        type="checkbox"
                        checked={editingPrize.featured}
                        onChange={(e) => setEditingPrize({ ...editingPrize, featured: e.target.checked })}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700"
                      />
                      <span>Pin as Featured Lucky Draw on Homepage</span>
                    </label>
                  </div>
                </div>

                {/* Image Selection Presets */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-300 block">Prize Cover Image</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setEditingPrize({ ...editingPrize, image: preset.url })}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition cursor-pointer ${
                          editingPrize.image === preset.url
                            ? 'border-amber-400 bg-amber-500/20 text-white font-bold'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        <img src={preset.url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        <span className="text-[11px] truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                  <input
                    type="url"
                    placeholder="Or enter custom image URL"
                    value={editingPrize.image}
                    onChange={(e) => setEditingPrize({ ...editingPrize, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-[11px] mt-1"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Description</label>
                  <textarea
                    rows={2}
                    value={editingPrize.description}
                    onChange={(e) => setEditingPrize({ ...editingPrize, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed"
                  />
                </div>

                {/* Save Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditingPrize(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    {savePrizeSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Saved Successfully!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Prize Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : null}

            {/* Existing Prizes Table / List */}
            <div className="space-y-3">
              {prizes.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-sm">{p.title}</span>
                        {p.featured && (
                          <span className="px-2 py-0.2 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase">
                            Featured
                          </span>
                        )}
                        <span className="px-2 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px] font-mono uppercase">
                          {p.frequency}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span className="text-amber-400 font-bold font-mono">🎫 {p.ticketPriceETB} ETB / Ticket</span>
                        <span>•</span>
                        <span>{p.soldTickets} / {p.totalTickets} Sold</span>
                        <span>•</span>
                        <span>📍 {p.venueLocation}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-medium">💼 {p.startupGoal || 'Job Creation Fund'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      type="button"
                      onClick={() => onOpenSocialShare && onOpenSocialShare(p)}
                      title="Generate Social Media Link for this prize"
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800 font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Link</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setEditingPrize(p); setIsNewPrize(false); }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5 text-amber-400" />
                      <span>Edit Prize</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                          onDeletePrize(p.id);
                        }
                      }}
                      className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 transition cursor-pointer"
                      title="Delete Prize"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ===================== TAB 3: STARTUP COMPETITION & APP INFO ===================== */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="p-6 overflow-y-auto space-y-6 text-xs max-h-[75vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-400" />
                  <span>Startup Competition for Job Creation & Platform Settings</span>
                </h4>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Update payment receiver numbers, office locations, official hotlines, and job impact statistics.
                </p>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                {settingsSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved Changes!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save All Information</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Competition Title */}
              <div className="space-y-1">
                <label className="font-bold text-amber-300">Startup Competition Title</label>
                <input
                  type="text"
                  required
                  value={settingsForm.startupCompetitionTitle}
                  onChange={(e) => setSettingsForm({ ...settingsForm, startupCompetitionTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                />
              </div>

              {/* Tagline */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Competition Tagline</label>
                <input
                  type="text"
                  required
                  value={settingsForm.startupCompetitionTagline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, startupCompetitionTagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              {/* Telebirr Receiving Phone Number */}
              <div className="space-y-1">
                <label className="font-bold text-amber-400">
                  Telebirr Target Phone Number (Where players send ticket payments)
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.telebirrPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, telebirrPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-amber-500/50 text-amber-400 font-mono font-black text-sm"
                />
              </div>

              {/* Telebirr Recipient Account Name */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Telebirr Account Holder Name</label>
                <input
                  type="text"
                  required
                  value={settingsForm.telebirrName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, telebirrName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              {/* Jobs Created Counter */}
              <div className="space-y-1">
                <label className="font-bold text-emerald-400">Youth Jobs Created Counter</label>
                <input
                  type="number"
                  min={0}
                  value={settingsForm.totalJobsCreatedCounter}
                  onChange={(e) => setSettingsForm({ ...settingsForm, totalJobsCreatedCounter: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono font-bold"
                />
              </div>

              {/* Total Grants Disbursed */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Total Seed Grants Disbursed (ETB)</label>
                <input
                  type="number"
                  min={0}
                  value={settingsForm.totalGrantsDisbursedETB}
                  onChange={(e) => setSettingsForm({ ...settingsForm, totalGrantsDisbursedETB: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold"
                />
              </div>

              {/* Support Phone */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Support Hotline / Phone</label>
                <input
                  type="text"
                  value={settingsForm.supportPhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, supportPhone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium font-mono"
                />
              </div>

              {/* Landline */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Landline</label>
                <input
                  type="text"
                  value={settingsForm.landline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, landline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium font-mono"
                />
              </div>

              {/* Addis Ababa Office Address */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Addis Ababa Head Office</label>
                <input
                  type="text"
                  value={settingsForm.officeAddress}
                  onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              {/* Bishoftu Office Address */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Bishoftu Regional Office</label>
                <input
                  type="text"
                  value={settingsForm.bishoftuAddress}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bishoftuAddress: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                />
              </div>

              {/* Telegram Channel Link */}
              <div className="space-y-1">
                <label className="font-bold text-sky-400">Official Telegram Channel URL</label>
                <input
                  type="text"
                  value={settingsForm.telegramChannel}
                  onChange={(e) => setSettingsForm({ ...settingsForm, telegramChannel: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sky-400 font-medium font-mono"
                />
              </div>

              {/* License Number */}
              <div className="space-y-1">
                <label className="font-bold text-slate-300">National Lottery License Number</label>
                <input
                  type="text"
                  value={settingsForm.licenseNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, licenseNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium font-mono"
                />
              </div>
            </div>

            {/* Campaign Announcement Bar Text */}
            <div className="space-y-1">
              <label className="font-bold text-amber-400">Top Header Campaign Announcement Bar</label>
              <input
                type="text"
                value={settingsForm.campaignAnnouncement}
                onChange={(e) => setSettingsForm({ ...settingsForm, campaignAnnouncement: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
              />
            </div>

            {/* Public Shareable App URL */}
            <div className="space-y-1">
              <label className="font-bold text-slate-300">Shareable App URL for Social Media</label>
              <input
                type="url"
                value={settingsForm.shareableAppUrl}
                onChange={(e) => setSettingsForm({ ...settingsForm, shareableAppUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 font-mono"
              />
            </div>
          </form>
        )}

        {/* ===================== TAB 4: SOCIAL MEDIA CAMPAIGN HUB ===================== */}
        {activeTab === 'social' && (
          <div className="p-6 overflow-y-auto space-y-6 text-xs max-h-[75vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-amber-400" />
                  <span>Social Media Posting & Marketing Campaigns</span>
                </h4>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Launch promotions across Telegram channels, TikTok, Facebook, and WhatsApp.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenSocialShare && onOpenSocialShare(null)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center gap-2 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Open Full Social Share Tool</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-sky-400 text-sm block">Telegram Channels</span>
                <p className="text-[11px] text-slate-400">
                  Over 85% of Ethiopian users enter via Telegram links. Post the full message with payment target (0910442314).
                </p>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(platformSettings.shareableAppUrl)}&text=${encodeURIComponent('Join HeraPrize Startup Competition! Win 10k ETB & hotel retreats.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Share to Telegram</span>
                </a>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 text-sm block">WhatsApp Groups</span>
                <p className="text-[11px] text-slate-400">
                  Ideal for friends, business clubs, and university groups looking to pitch startups together.
                </p>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Join HeraPrize Startup Competition: ' + platformSettings.shareableAppUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Share to WhatsApp</span>
                </a>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-bold text-blue-400 text-sm block">Facebook & LinkedIn</span>
                <p className="text-[11px] text-slate-400">
                  Post to entrepreneurship communities, NGO job creation circles, and tech startup hubs.
                </p>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(platformSettings.shareableAppUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Share to Facebook</span>
                </a>
              </div>
            </div>

            {/* Quick Copy Link Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block font-bold">Public Production URL</span>
                <span className="text-amber-400 font-mono text-xs">{platformSettings.shareableAppUrl}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(platformSettings.shareableAppUrl);
                  alert('Link copied to clipboard!');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>Copy URL</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
