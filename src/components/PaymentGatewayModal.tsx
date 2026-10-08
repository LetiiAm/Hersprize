import React, { useState, useEffect, useRef } from 'react';
import { Prize, TicketPurchase, UserProfile, PaymentSubmission } from '../types/prize';
import { TELEBIRR_PAYMENT_CONFIG } from '../data/prizeData';
import { 
  X, 
  Smartphone, 
  Wallet, 
  CheckCircle2, 
  ShieldCheck, 
  Ticket, 
  ArrowRight, 
  Lock, 
  Sparkles,
  QrCode,
  Share2,
  Copy,
  Upload,
  Dice5,
  RefreshCw,
  Clock,
  Send,
  AlertCircle,
  Scale,
  FileText,
  Ban,
  HeartHandshake,
  Trash2,
  Camera,
  Maximize2
} from 'lucide-react';

interface PaymentGatewayModalProps {
  prize: Prize | null;
  quantity: number;
  isOpen: boolean;
  currentUser: UserProfile | null;
  onClose: () => void;
  onSubmitPaymentSubmission: (submission: PaymentSubmission) => void;
  onSuccess: (newTickets: TicketPurchase[], paymentMethod: 'telebirr' | 'cbe_birr' | 'wallet', totalCost: number) => void;
  onOpenAuth: () => void;
  onOpenTerms?: () => void;
  lang: 'en' | 'am';
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  prize,
  quantity,
  isOpen,
  currentUser,
  onClose,
  onSubmitPaymentSubmission,
  onSuccess,
  onOpenAuth,
  onOpenTerms,
  lang
}) => {
  if (!isOpen || !prize) return null;

  const totalCost = quantity * prize.ticketPriceETB;
  const [selectedMethod, setSelectedMethod] = useState<'telebirr' | 'cbe_birr' | 'wallet'>('telebirr');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Lucky Numbers State
  const [numberMode, setNumberMode] = useState<'auto' | 'custom'>('auto');
  const [luckyNumbers, setLuckyNumbers] = useState<string[]>([]);

  // Telebirr 0910442314 Payment State
  const [payerPhone, setPayerPhone] = useState(currentUser?.phone || '0911234567');
  const [payerName, setPayerName] = useState(currentUser?.fullName || 'Lechisa Amena');
  const [telebirrTxId, setTelebirrTxId] = useState('TB-992019482');
  const [attachedInvoiceUrl, setAttachedInvoiceUrl] = useState(
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80'
  );
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [invoiceFileName, setInvoiceFileName] = useState('telebirr_payment_receipt.png');
  const [invoiceFileSize, setInvoiceFileSize] = useState('184 KB');
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File processing helper for Telebirr invoice upload
  const processInvoiceFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.name.endsWith('.pdf')) {
      setErrorMsg(
        lang === 'en'
          ? 'Please select a valid image (PNG, JPG, JPEG) or PDF invoice screenshot.'
          : 'እባክዎ ትክክለኛ የፎቶ ወይም ፒዲኤፍ የቴሌብር ደረሰኝ ፋይል ይምረጡ።'
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const sizeKb = Math.round(file.size / 1024);
      setAttachedInvoiceUrl(dataUrl);
      setInvoiceFileName(file.name);
      setInvoiceFileSize(`${sizeKb} KB`);
      setErrorMsg('');
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processInvoiceFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processInvoiceFile(e.dataTransfer.files[0]);
    }
  };

  const handleUseSampleSlip = () => {
    setAttachedInvoiceUrl('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80');
    setInvoiceFileName(`telebirr_sample_${Date.now().toString().slice(-4)}.jpg`);
    setInvoiceFileSize('210 KB');
    setErrorMsg('');
  };

  // Flow status: 'form' -> 'invoice_submitted' -> 'approved_tickets'
  const [submissionState, setSubmissionState] = useState<'form' | 'invoice_submitted' | 'approved_tickets'>('form');
  const [approvedTickets, setApprovedTickets] = useState<TicketPurchase[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Generate random 6-digit lucky numbers helper
  const generateRandomNumbers = (count: number) => {
    const nums: string[] = [];
    for (let i = 0; i < count; i++) {
      nums.push(Math.floor(100000 + Math.random() * 900000).toString());
    }
    return nums;
  };

  // Initialize lucky numbers when modal opens or quantity changes
  useEffect(() => {
    setLuckyNumbers(generateRandomNumbers(quantity));
    setSubmissionState('form');
    setErrorMsg('');
  }, [quantity, prize.id, isOpen]);

  // Handle re-rolling lucky numbers
  const handleRerollNumbers = () => {
    setLuckyNumbers(generateRandomNumbers(quantity));
  };

  // Handle manual lucky number change
  const handleCustomNumberChange = (index: number, val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 6);
    const updated = [...luckyNumbers];
    updated[index] = cleaned;
    setLuckyNumbers(updated);
  };

  // Handle copy of 0910442314
  const handleCopyTargetPhone = () => {
    navigator.clipboard?.writeText(TELEBIRR_PAYMENT_CONFIG.recipientPhone);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  // Submit Telebirr invoice to system for admin approval
  const handleSubmitInvoice = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!payerPhone || payerPhone.length < 9) {
      setErrorMsg('Please enter a valid Ethiopian mobile phone number (09... / 07...) to receive your ticket numbers via SMS.');
      return;
    }

    if (!telebirrTxId) {
      setErrorMsg('Please enter your Telebirr Transaction ID reference.');
      return;
    }

    if (!termsAccepted) {
      setErrorMsg(
        lang === 'en'
          ? 'You must accept the Terms & Conditions (Strict No-Refund & Job Creation Business Proposal mandate) to proceed.'
          : 'ወደፊት ለመቀጠል የውድድሩን ደንቦች (የማይመለስ ክፍያና የንግድ ዕቅድ ማቅረብ ግዴታ) መቀበል አለብዎት።'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const submission: PaymentSubmission = {
        id: `sub-${Date.now()}`,
        payerPhone,
        payerName,
        recipientTelebirrPhone: TELEBIRR_PAYMENT_CONFIG.recipientPhone,
        prizeId: prize.id,
        prizeTitle: prize.title,
        frequency: prize.frequency,
        quantity,
        ticketPriceETB: prize.ticketPriceETB,
        totalAmountETB: totalCost,
        selectedLuckyNumbers: luckyNumbers,
        telebirrTxId,
        attachedInvoiceUrl,
        submittedAt: new Date().toISOString(),
        status: 'pending_admin_approval',
        smsNotificationSent: false
      };

      onSubmitPaymentSubmission(submission);
      setIsSubmitting(false);
      setSubmissionState('invoice_submitted');
    }, 1200);
  };

  // Direct simulation helper for immediate demo approval
  const handleInstantDemoApproval = () => {
    const timestamp = Date.now();
    const newPurchases: TicketPurchase[] = luckyNumbers.map((num, i) => {
      const prefix = prize.frequency === 'daily' ? 'HP-D' : prize.frequency === 'weekly' ? 'HP-W' : 'HP-M';
      return {
        id: `tkt-${timestamp}-${i}`,
        ticketCode: `${prefix}-${num}`,
        luckyNumber: num,
        prizeId: prize.id,
        prizeTitle: prize.title,
        frequency: prize.frequency,
        ticketPriceETB: prize.ticketPriceETB,
        quantity: 1,
        totalCostETB: prize.ticketPriceETB,
        drawDate: prize.drawDate,
        venueLocation: prize.venueLocation,
        purchasedAt: new Date().toISOString(),
        paymentMethod: 'telebirr',
        transactionRef: telebirrTxId,
        status: 'active'
      };
    });

    setApprovedTickets(newPurchases);
    setSubmissionState('approved_tickets');
    onSuccess(newPurchases, 'telebirr', totalCost);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-white max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Ticket className="w-5 h-5" />
            <div>
              <h3 className="font-black text-base">
                {submissionState === 'invoice_submitted' 
                  ? 'Invoice Sent for Verification' 
                  : submissionState === 'approved_tickets'
                  ? 'Lucky Tickets Issued & Dispatched!'
                  : 'Raffle Checkout & Telebirr Payment'}
              </h3>
              <p className="text-[11px] font-bold text-slate-950 flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Not-for-Profit Social Enterprise • Telebirr: <span className="font-mono">0910442314</span></span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-950/20 hover:bg-slate-950/30 flex items-center justify-center cursor-pointer transition text-slate-950 font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          
          {/* STAGE 1: FORM (Choose Lucky Numbers + Pay via 0910442314) */}
          {submissionState === 'form' && (
            <form onSubmit={handleSubmitInvoice} className="space-y-5">
              
              {/* Humanitarian & Job Creation Allocation Notice */}
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-300 text-[11px]">
                <HeartHandshake className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>100% of proceeds mobilize humanitarian relief & startup grants (3 direct + 6 indirect businesses open).</span>
              </div>

              {/* Order Quick Summary */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Selected Prize</span>
                  <strong className="text-white text-sm block truncate max-w-[240px]">{prize.title}</strong>
                  <span className="text-amber-400 font-mono text-xs">{quantity} Tickets x {prize.ticketPriceETB} ETB</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Total Due:</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">{totalCost} ETB</span>
                </div>
              </div>

              {/* 1. LUCKY LOTTERY NUMBERS SELECTION / AUTO-GENERATOR */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                    <Dice5 className="w-4 h-4 text-amber-400" />
                    <span>Lucky Lottery Numbers ({quantity} Tickets)</span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setNumberMode('auto')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                        numberMode === 'auto' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🎲 Auto-Generate (በራስ-ሰር)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNumberMode('custom')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                        numberMode === 'custom' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ✍️ Pick My Own (የእኔን ቁጥር)
                    </button>
                  </div>
                </div>

                {/* Display / Edit Numbers */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  {luckyNumbers.map((num, idx) => (
                    <div key={idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] text-slate-500 block font-medium">Ticket #{idx + 1}</span>
                      {numberMode === 'auto' ? (
                        <div className="font-mono font-black text-amber-400 text-base tracking-wider">
                          {num}
                        </div>
                      ) : (
                        <input
                          type="text"
                          maxLength={6}
                          value={num}
                          onChange={(e) => handleCustomNumberChange(idx, e.target.value)}
                          placeholder="6 digits"
                          className="w-full bg-slate-950 border border-slate-700 px-2 py-1 rounded-lg font-mono font-black text-amber-400 text-sm text-center tracking-widest focus:border-amber-400 outline-hidden"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {numberMode === 'auto' && (
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-400">Certified random numbers generated by RNG</span>
                    <button
                      type="button"
                      onClick={handleRerollNumbers}
                      className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Roll Again / ሌላ ቁጥር አውጣ</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 2. OFFICIAL TELEBIRR PAYMENT TO 0910442314 */}
              <div className="bg-sky-950/40 border border-sky-500/40 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-sky-600 text-white font-black text-xs flex items-center justify-center">
                      tb
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm">telebirr (ቴሌብር) Payment</h4>
                      <p className="text-[11px] text-sky-300">Official Recipient: HeraPrize</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold uppercase">
                    Active Gateway
                  </span>
                </div>

                {/* Recipient Box with Copy Button */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-sky-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Send Exact Amount ({totalCost} ETB) to:</span>
                    <span className="text-lg font-mono font-black text-amber-400 tracking-wider">
                      {TELEBIRR_PAYMENT_CONFIG.recipientPhone}
                    </span>
                    <span className="text-[11px] text-sky-300 block font-medium">
                      Account Name: {TELEBIRR_PAYMENT_CONFIG.recipientName}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyTargetPhone}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition cursor-pointer shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedNumber ? 'Copied!' : 'Copy 0910442314'}</span>
                  </button>
                </div>

                {/* Invoice Reference & Payer Details */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center justify-between">
                      <span>Telebirr Transaction ID / Slip Reference *</span>
                      <span className="text-[10px] text-slate-400">e.g. TB-992019482</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={telebirrTxId}
                      onChange={(e) => setTelebirrTxId(e.target.value)}
                      placeholder="TB-..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-amber-400 outline-hidden uppercase font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Payer Mobile Phone Number (SMS Target) *
                    </label>
                    <input
                      type="text"
                      required
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="09... / 07..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-amber-400 outline-hidden font-bold"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      The approved lucky lottery ticket numbers will be sent directly to this phone number via SMS.
                    </p>
                  </div>

                  {/* Prominent Telebirr Invoice Uploading Button & Zone */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-sky-400" />
                        <span>Upload Telebirr Invoice / Receipt Screenshot *</span>
                      </label>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Slip Ready</span>
                      </span>
                    </div>

                    {/* Hidden Native File Input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />

                    {/* Interactive Drop / Upload Area */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`p-3.5 rounded-2xl border-2 border-dashed transition cursor-pointer text-center space-y-2 ${
                        isDragging
                          ? 'border-sky-400 bg-sky-950/70'
                          : 'border-sky-500/40 bg-slate-950 hover:border-sky-400'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="relative group shrink-0">
                          <img
                            src={attachedInvoiceUrl}
                            alt="Telebirr slip preview"
                            className="w-16 h-16 object-cover rounded-xl border border-slate-700 shadow-md"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsZoomOpen(true);
                            }}
                            className="absolute inset-0 bg-slate-950/70 text-white rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer"
                            title="Zoom In"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-xs truncate block max-w-[170px]">
                              {invoiceFileName}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                              {invoiceFileSize}
                            </span>
                          </div>
                          <span className="text-slate-400 text-[10px] block mt-0.5">
                            Proof of {totalCost} ETB transfer to 0910442314
                          </span>
                          <span className="text-sky-400 text-[10px] font-semibold block mt-0.5">
                            Click or drag to replace invoice slip
                          </span>
                        </div>

                        <div className="flex flex-col gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                          {/* PRIMARY UPLOAD BUTTON */}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer shadow-sm"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Invoice</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleUseSampleSlip}
                            className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 text-[10px] font-bold border border-slate-700 cursor-pointer text-center"
                          >
                            Sample Slip
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                      <span>Supported: PNG, JPG, JPEG, PDF screenshots</span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sky-400 hover:text-sky-300 font-bold underline cursor-pointer"
                      >
                        Choose from device / Camera
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mandatory Terms & Conditions: Job Creation, No Refund & Business Proposal */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span className="font-extrabold text-white text-xs">
                      {lang === 'en' ? 'Official Terms & Regulations' : 'ኦፊሴላዊ ደንቦችና መመሪያዎች'}
                    </span>
                  </div>
                  {onOpenTerms && (
                    <button
                      type="button"
                      onClick={onOpenTerms}
                      className="text-amber-400 hover:text-amber-300 text-[11px] font-bold underline cursor-pointer"
                    >
                      {lang === 'en' ? 'Read Terms (NLA #9941)' : 'ሙሉ ደንቦቹን ያንብቡ'}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-500/30 flex items-start gap-2 text-rose-300">
                    <Ban className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white text-[11px]">Strict No-Refund Policy</strong>
                      <span className="text-slate-400 text-[10px] leading-tight block mt-0.5">
                        Ticket costs ({totalCost} ETB) are final & non-refundable once sent to Telebirr 0910442314.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-sky-500/30 flex items-start gap-2 text-sky-300">
                    <FileText className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white text-[11px]">Job Creation Business Plan</strong>
                      <span className="text-slate-400 text-[10px] leading-tight block mt-0.5">
                        Winners must submit a Job Creation Business Proposal within 14 days (supporting 3 people / 3 direct + 6 indirect businesses).
                      </span>
                    </div>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-300 leading-tight">
                    {lang === 'en' ? (
                      <>
                        I confirm that I am 18+ and agree to HeraPrize <strong className="text-white">Strict No-Refund terms</strong> and the <strong className="text-white">Mandatory Job Creation Business Proposal</strong> requirement upon winning.
                      </>
                    ) : (
                      <>
                        እድሜዬ 18+ መሆኑንና የሄራ ፕራይዝ <strong className="text-white">የማይመለስ ክፍያ ደንብ</strong> እና አሸናፊ ሲወጣ <strong className="text-white">የሥራ ዕድል ፈጠራ የንግድ ዕቅድ የማቅረብ ግዴታን</strong> ተቀብያለሁ።
                      </>
                    )}
                  </span>
                </label>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit to System Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/25 cursor-pointer hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Invoice to System...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Invoice to System for Admin Approval ({totalCost} ETB)</span>
                  </>
                )}
              </button>

            </form>
          )}

          {/* STAGE 2: INVOICE SUBMITTED TO SYSTEM (Waiting Admin Approval) */}
          {submissionState === 'invoice_submitted' && (
            <div className="space-y-5 text-center animate-fadeIn py-2">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <Clock className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  INVOICE LOGGED IN APPROVAL QUEUE
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Payment Submitted Successfully!
                </h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto mt-1 leading-relaxed">
                  Your Telebirr invoice for <strong className="text-white">{totalCost} ETB</strong> sent to <strong className="text-amber-400 font-mono">0910442314</strong> is pending Admin approval.
                </p>
              </div>

              {/* Detail recap */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Payer Mobile:</span>
                  <strong className="text-white font-mono">{payerPhone}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Recipient Phone:</span>
                  <strong className="text-amber-400 font-mono">0910442314</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Your Lucky Numbers:</span>
                  <strong className="text-amber-400 font-mono">{luckyNumbers.join(', ')}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-amber-400 font-bold">● Awaiting Admin Ticket Generator</span>
                </div>
              </div>

              {/* Instant Demo Approval Button */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-2">
                <div className="text-[11px] text-amber-300 font-bold">
                  ⚡ Demo Mode: Test Admin Approval Instantly
                </div>
                <p className="text-[10px] text-slate-400">
                  Click below to trigger the automatic ticket generator and simulate the instant SMS notification to {payerPhone}.
                </p>
                <button
                  type="button"
                  onClick={handleInstantDemoApproval}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-md cursor-pointer"
                >
                  Approve Payment & Generate Ticket Numbers Now
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close & Check My Tickets
              </button>
            </div>
          )}

          {/* STAGE 3: APPROVED TICKETS ISSUED */}
          {submissionState === 'approved_tickets' && (
            <div className="space-y-5 text-center animate-fadeIn py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  PAYMENT APPROVED • TICKET NUMBERS SENT
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  Your Lucky Tickets are Active!
                </h3>
                <p className="text-slate-400 text-xs">
                  SMS with your assigned numbers has been dispatched to <strong className="text-amber-400 font-mono">{payerPhone}</strong>
                </p>
              </div>

              {/* Display Issued Tickets */}
              <div className="space-y-2">
                {approvedTickets.map((tkt, idx) => (
                  <div
                    key={tkt.id}
                    className="bg-slate-950 p-3.5 rounded-2xl border border-amber-500/30 flex items-center justify-between text-left"
                  >
                    <div>
                      <div className="font-mono font-black text-amber-400 text-base">
                        🎟️ {tkt.ticketCode}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Lucky Number: <strong className="text-white font-mono">{tkt.luckyNumber}</strong> • {tkt.prizeTitle}
                      </div>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Done • View in My Tickets
              </button>
            </div>
          )}

        </div>

      </div>

      {/* FULLSCREEN INVOICE ZOOM PREVIEW */}
      {isZoomOpen && (
        <div 
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-fadeIn"
        >
          <div className="max-w-xl w-full bg-slate-900 rounded-3xl p-4 border border-slate-700 space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white">{invoiceFileName}</span>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center cursor-pointer text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={attachedInvoiceUrl}
              alt="Telebirr slip zoomed"
              className="w-full max-h-[70vh] object-contain rounded-2xl border border-slate-800"
            />
            <div className="text-[11px] text-slate-400 text-center">
              Telebirr Transaction Slip • {invoiceFileSize} • Sent to 0910442314
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
