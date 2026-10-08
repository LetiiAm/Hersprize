import React, { useState, useRef, useEffect } from 'react';
import { Prize, TicketPurchase, UserProfile, PaymentSubmission, PlatformSettings } from '../types/prize';
import { 
  X, 
  Upload, 
  Smartphone, 
  CheckCircle2, 
  FileText, 
  Image as ImageIcon, 
  AlertCircle, 
  Send, 
  Copy, 
  Check, 
  Dice5, 
  RefreshCw, 
  Trash2, 
  Maximize2, 
  Camera, 
  Scale, 
  Ban, 
  Briefcase, 
  Sparkles,
  Ticket,
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';

interface TelebirrInvoiceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  prizes: Prize[];
  currentUser: UserProfile | null;
  onSubmitPaymentSubmission: (submission: PaymentSubmission) => void;
  onSuccess: (newTickets: TicketPurchase[], paymentMethod: 'telebirr', totalCost: number) => void;
  onOpenAuth: () => void;
  onOpenTerms?: () => void;
  platformSettings: PlatformSettings;
  lang: 'en' | 'am';
}

const DEFAULT_SAMPLE_SLIP = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80';

export const TelebirrInvoiceUploadModal: React.FC<TelebirrInvoiceUploadModalProps> = ({
  isOpen,
  onClose,
  prizes,
  currentUser,
  onSubmitPaymentSubmission,
  onSuccess,
  onOpenAuth,
  onOpenTerms,
  platformSettings,
  lang
}) => {
  if (!isOpen) return null;

  // Selected Prize
  const [selectedPrizeId, setSelectedPrizeId] = useState<string>(prizes[0]?.id || '');
  const selectedPrize = prizes.find(p => p.id === selectedPrizeId) || prizes[0];

  // Quantity
  const [quantity, setQuantity] = useState<number>(1);
  const totalCost = (selectedPrize?.ticketPriceETB || 350) * quantity;

  // Lucky numbers
  const [numberMode, setNumberMode] = useState<'auto' | 'custom'>('auto');
  const [luckyNumbers, setLuckyNumbers] = useState<string[]>([]);

  // Payer details
  const [payerPhone, setPayerPhone] = useState(currentUser?.phone || '');
  const [payerName, setPayerName] = useState(currentUser?.fullName || '');
  const [telebirrTxId, setTelebirrTxId] = useState('');
  
  // File upload state
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    dataUrl: string;
    uploadedAt: string;
  } | null>({
    name: 'telebirr_official_receipt.jpg',
    size: '184 KB',
    dataUrl: DEFAULT_SAMPLE_SLIP,
    uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [issuedTickets, setIssuedTickets] = useState<TicketPurchase[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to generate 6-digit lucky numbers
  const generateRandomNumbers = (count: number) => {
    const nums: string[] = [];
    for (let i = 0; i < count; i++) {
      nums.push(Math.floor(100000 + Math.random() * 900000).toString());
    }
    return nums;
  };

  useEffect(() => {
    setLuckyNumbers(generateRandomNumbers(quantity));
    setErrorMsg('');
  }, [quantity, selectedPrizeId]);

  const handleRerollNumbers = () => {
    setLuckyNumbers(generateRandomNumbers(quantity));
  };

  const handleCustomNumberChange = (index: number, val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 6);
    const updated = [...luckyNumbers];
    updated[index] = cleaned;
    setLuckyNumbers(updated);
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(platformSettings.telebirrPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  // Handle file reading from input or drag-drop
  const processFile = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.name.endsWith('.pdf')) {
      setErrorMsg(
        lang === 'en' 
          ? 'Please upload a valid image file (PNG, JPG, JPEG, WEBP) or PDF screenshot of your Telebirr invoice.' 
          : 'እባክዎ ትክክለኛ የፎቶ ፋይል (PNG, JPG, PDF) የቴሌብር ደረሰኝ ስክሪንሾት ይጫኑ።'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const sizeKb = Math.round(file.size / 1024);
      setUploadedFile({
        name: file.name,
        size: `${sizeKb} KB`,
        dataUrl: dataUrl || DEFAULT_SAMPLE_SLIP,
        uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setErrorMsg('');
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file. Please try selecting again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleUseSampleSlip = () => {
    setUploadedFile({
      name: `telebirr_receipt_${Date.now().toString().slice(-4)}.jpg`,
      size: '215 KB',
      dataUrl: DEFAULT_SAMPLE_SLIP,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setErrorMsg('');
  };

  // Submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!uploadedFile) {
      setErrorMsg(
        lang === 'en' 
          ? 'Please click "Upload Telebirr Invoice" to attach your payment confirmation screenshot or receipt.' 
          : 'እባክዎ "ቴሌብር ደረሰኝ ጫን" የሚለውን በመጫን የክፍያ ስክሪንሾትዎን ያያይዙ።'
      );
      return;
    }

    if (!telebirrTxId.trim()) {
      setErrorMsg(
        lang === 'en'
          ? 'Please enter your Telebirr Transaction ID reference (e.g. TB-992019482).'
          : 'እባክዎ የቴሌብር ትራንዛክሽን መለያ ቁጥር (TB-...) ያስገቡ።'
      );
      return;
    }

    if (!payerPhone || payerPhone.length < 9) {
      setErrorMsg(
        lang === 'en'
          ? 'Please provide your Ethiopian mobile phone number (09... / 07...) for SMS ticket delivery.'
          : 'እባክዎ ዕጣዎች በኤስኤምኤስ እንዲደርስዎ ትክክለኛ የሞባይል ስልክ ቁጥር ያስገቡ።'
      );
      return;
    }

    if (!termsAccepted) {
      setErrorMsg(
        lang === 'en'
          ? 'You must accept the Strict No-Refund policy and Job Creation Business Proposal terms.'
          : 'የማይመለስ ክፍያ ደንብንና የሥራ ዕድል ፈጠራ የንግድ ዕቅድ ማቅረብ ግዴታን መቀበል አለብዎት።'
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const submission: PaymentSubmission = {
        id: `sub-${Date.now()}`,
        payerPhone,
        payerName: payerName || currentUser.fullName || 'Player',
        recipientTelebirrPhone: platformSettings.telebirrPhone,
        prizeId: selectedPrize.id,
        prizeTitle: selectedPrize.title,
        frequency: selectedPrize.frequency,
        quantity,
        ticketPriceETB: selectedPrize.ticketPriceETB,
        totalAmountETB: totalCost,
        selectedLuckyNumbers: luckyNumbers,
        telebirrTxId: telebirrTxId.toUpperCase(),
        attachedInvoiceUrl: uploadedFile.dataUrl,
        submittedAt: new Date().toISOString(),
        status: 'pending_admin_approval',
        smsNotificationSent: false
      };

      onSubmitPaymentSubmission(submission);
      setIsSubmitting(false);
      setSubmissionComplete(true);

      // Prepare simulated tickets
      const timestamp = Date.now();
      const newPurchases: TicketPurchase[] = luckyNumbers.map((num, i) => {
        const prefix = selectedPrize.frequency === 'daily' ? 'HP-D' : selectedPrize.frequency === 'weekly' ? 'HP-W' : 'HP-M';
        return {
          id: `tkt-upload-${timestamp}-${i}`,
          ticketCode: `${prefix}-${num}`,
          luckyNumber: num,
          prizeId: selectedPrize.id,
          prizeTitle: selectedPrize.title,
          frequency: selectedPrize.frequency,
          ticketPriceETB: selectedPrize.ticketPriceETB,
          quantity: 1,
          totalCostETB: selectedPrize.ticketPriceETB,
          drawDate: selectedPrize.drawDate,
          venueLocation: selectedPrize.venueLocation,
          purchasedAt: new Date().toISOString(),
          paymentMethod: 'telebirr',
          transactionRef: telebirrTxId,
          status: 'active'
        };
      });
      setIssuedTickets(newPurchases);
    }, 1200);
  };

  const handleInstantClaim = () => {
    onSuccess(issuedTickets, 'telebirr', totalCost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-white max-h-[92vh]">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-amber-500 text-slate-950 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-950 text-sky-400 flex items-center justify-center font-black">
              <Upload className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h3 className="font-black text-base">
                {lang === 'en' ? 'Upload Telebirr Invoice & Payment Slip' : 'የቴሌብር ደረሰኝ መጫኛና ማረጋገጫ'}
              </h3>
              <p className="text-[11px] font-bold text-slate-950 flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Not-for-Profit Social Enterprise • Recipient: <span className="font-mono">{platformSettings.telebirrPhone}</span></span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-950/20 hover:bg-slate-950/30 flex items-center justify-center text-slate-950 font-bold transition cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">

          {/* SUCCESS SCREEN */}
          {submissionComplete ? (
            <div className="space-y-6 text-center py-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9 text-emerald-400" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl font-black text-white">
                  {lang === 'en' ? 'Telebirr Invoice Submitted Successfully!' : 'የቴሌብር ደረሰኝዎ በተሳካ ሁኔታ ተልኳል!'}
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {lang === 'en' 
                    ? `Your payment proof of ${totalCost} ETB for ${selectedPrize.title} has been logged in the admin verification queue. Lucky numbers are assigned!`
                    : `ለ${selectedPrize.title} የተከፈለው ${totalCost} ብር ደረሰኝ በአስተዳዳሪ ማረጋገጫ ውስጥ ተመዝግቧል። የእርስዎ ዕጣ ቁጥሮች ተዘጋጅተዋል!`}
                </p>
              </div>

              {/* Issued Tickets Box */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 text-amber-400" />
                    <span>Registered Lucky Numbers ({quantity} Tickets)</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">
                    Ref: {telebirrTxId}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {luckyNumbers.map((num, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-center">
                      <span className="text-[10px] text-slate-500 block">Ticket #{i + 1}</span>
                      <strong className="text-amber-400 font-mono text-sm tracking-wider">{num}</strong>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded-xl bg-sky-950/60 border border-sky-500/30 flex items-start gap-2 text-sky-300 text-[11px]">
                  <Send className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    SMS confirmation dispatched to <strong className="font-mono text-white">{payerPhone}</strong>. Draw scheduled for <strong className="text-white">{selectedPrize.drawDate}</strong>.
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleInstantClaim}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>View in My Tickets Archive</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition border border-slate-700 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* SUBMISSION FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Telebirr Transfer Instructions Banner */}
              <div className="p-4 rounded-2xl bg-sky-950/50 border border-sky-500/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-sky-600 text-white font-black text-xs flex items-center justify-center">
                      tb
                    </span>
                    <div>
                      <strong className="text-white text-xs block">Official Telebirr Transfer Recipient</strong>
                      <span className="text-[10px] text-sky-300">HeraPrize Not-for-Profit Social Enterprise</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Supervised NLA #9941
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-sky-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Send Telebirr Payment to Phone:</span>
                    <strong className="text-base font-mono font-black text-amber-400 tracking-wider">
                      {platformSettings.telebirrPhone}
                    </strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Name: {platformSettings.telebirrName}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition cursor-pointer shadow-sm"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Copied!' : 'Copy 0910442314'}</span>
                  </button>
                </div>
              </div>

              {/* 1. SELECT PRIZE & TICKET QUANTITY */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-white block">
                  {lang === 'en' ? '1. Select Draw & Ticket Quantity (300 - 600 ETB)' : '1. ዕጣና የቲኬት ብዛት ይምረጡ (300 - 600 ብር)'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Target Prize Draw</label>
                    <select
                      value={selectedPrizeId}
                      onChange={(e) => setSelectedPrizeId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-amber-400 outline-hidden"
                    >
                      {prizes.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({p.ticketPriceETB} ETB)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Number of Tickets</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 5, 10].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setQuantity(n)}
                          className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                            quantity === n
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Transferred in Telebirr:</span>
                  <span className="font-mono font-black text-amber-400 text-sm">
                    {totalCost} ETB ({quantity} x {selectedPrize.ticketPriceETB} ETB)
                  </span>
                </div>
              </div>

              {/* 2. LUCKY NUMBERS PICKER */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <Dice5 className="w-4 h-4 text-amber-400" />
                    <span>2. Lucky Lottery Numbers ({quantity} Tickets)</span>
                  </span>

                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setNumberMode('auto')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer ${
                        numberMode === 'auto' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🎲 Auto RNG
                    </button>
                    <button
                      type="button"
                      onClick={() => setNumberMode('custom')}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer ${
                        numberMode === 'custom' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ✍️ Custom
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {luckyNumbers.map((num, idx) => (
                    <div key={idx} className="bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-500 block font-medium">Ticket #{idx + 1}</span>
                      {numberMode === 'auto' ? (
                        <div className="font-mono font-black text-amber-400 text-sm tracking-wider">
                          {num}
                        </div>
                      ) : (
                        <input
                          type="text"
                          maxLength={6}
                          value={num}
                          onChange={(e) => handleCustomNumberChange(idx, e.target.value)}
                          placeholder="6 digits"
                          className="w-full bg-slate-950 border border-slate-700 px-1 py-0.5 rounded font-mono font-black text-amber-400 text-center tracking-widest text-xs focus:border-amber-400 outline-hidden"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {numberMode === 'auto' && (
                  <button
                    type="button"
                    onClick={handleRerollNumbers}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold text-[11px] cursor-pointer pt-0.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Roll New Numbers / አዲስ ቁጥሮች አውጣ</span>
                  </button>
                )}
              </div>

              {/* 3. PROMINENT TELEBIRR INVOICE UPLOAD BUTTON & ZONE */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-sky-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-sky-400" />
                    <span className="font-black text-white text-xs">
                      {lang === 'en' ? '3. Upload Telebirr Invoice / Receipt Screenshot *' : '3. የቴሌብር ደረሰኝ ስክሪንሾት ይጫኑ *'}
                    </span>
                  </div>

                  {uploadedFile ? (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Invoice Attached</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-400 font-bold">
                      Required
                    </span>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {/* Upload Zone / Drop Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-5 rounded-2xl border-2 border-dashed transition cursor-pointer text-center space-y-3 ${
                    isDragging
                      ? 'border-sky-400 bg-sky-950/60'
                      : uploadedFile
                      ? 'border-emerald-500/50 bg-slate-900/80 hover:border-emerald-400'
                      : 'border-slate-700 bg-slate-900 hover:border-sky-400'
                  }`}
                >
                  {uploadedFile ? (
                    /* Display Attached Slip Preview */
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                      <div className="relative group shrink-0">
                        <img
                          src={uploadedFile.dataUrl}
                          alt="Telebirr slip preview"
                          className="w-20 h-20 object-cover rounded-xl border border-slate-700 shadow-md"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsZoomOpen(true);
                          }}
                          className="absolute inset-0 bg-slate-950/60 text-white rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer"
                          title="Zoom In"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex-1 space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <strong className="text-white text-xs truncate max-w-[200px]">
                            {uploadedFile.name}
                          </strong>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                            ✓ Ready
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px]">
                          Size: <span className="font-mono text-slate-300">{uploadedFile.size}</span> • Uploaded at {uploadedFile.uploadedAt}
                        </p>
                        <p className="text-emerald-400 text-[10px] font-medium">
                          Receipt proof for {totalCost} ETB to {platformSettings.telebirrPhone}
                        </p>
                      </div>

                      <div className="flex sm:flex-col gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Change</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setUploadedFile(null)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-rose-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Empty Upload CTA */
                    <div className="space-y-2 py-3">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <strong className="text-white text-sm block font-black">
                          {lang === 'en' ? 'Click to Upload Telebirr Invoice / Receipt' : 'የቴሌብር ደረሰኝ ስክሪንሾት ለመጫን እዚህ ይጫኑ'}
                        </strong>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Drag and drop screenshot, PNG, JPG, or PDF file from your phone or PC
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Action Helpers */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-sky-600/90 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Browse Files / Gallery' : 'ፋይል ምረጥ'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>{lang === 'en' ? 'Camera' : 'ካሜራ'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleUseSampleSlip}
                    className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer text-[11px]"
                  >
                    {lang === 'en' ? 'Use Sample Telebirr Slip' : 'የሙከራ ደረሰኝ ተጠቀም'}
                  </button>
                </div>
              </div>

              {/* 4. TRANSACTION ID & PAYER CONTACT */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-white block">
                  4. Transaction Reference & SMS Target
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-300 block mb-1">
                      Telebirr Transaction ID (Slip Ref) *
                    </label>
                    <input
                      type="text"
                      required
                      value={telebirrTxId}
                      onChange={(e) => setTelebirrTxId(e.target.value)}
                      placeholder="e.g. TB-992019482"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-amber-400 outline-hidden uppercase font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-300 block mb-1">
                      Payer Mobile Phone Number (SMS Target) *
                    </label>
                    <input
                      type="text"
                      required
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="09... / 07..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-amber-400 outline-hidden font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-300 block mb-1">
                    Payer Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="Full Name as shown in Telebirr"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-amber-400 outline-hidden"
                  />
                </div>
              </div>

              {/* 5. MANDATORY TERMS: STRICT NO-REFUND & JOB CREATION PROPOSAL */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Official Regulations (National Lottery Administration #9941)</span>
                  </div>
                  {onOpenTerms && (
                    <button
                      type="button"
                      onClick={onOpenTerms}
                      className="text-amber-400 hover:text-amber-300 text-[10px] font-bold underline cursor-pointer"
                    >
                      Read Terms
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-500/30 flex items-start gap-2 text-rose-300">
                    <Ban className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white text-[11px]">Strict No-Refund Policy</strong>
                      <span className="text-slate-400 text-[10px] block mt-0.5">
                        Ticket amounts ({totalCost} ETB) are non-refundable once transferred.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-sky-500/30 flex items-start gap-2 text-sky-300">
                    <Briefcase className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white text-[11px]">Job Creation Business Plan</strong>
                      <span className="text-slate-400 text-[10px] block mt-0.5">
                        Winners submit a business plan within 14 days (supporting 3 direct & 6 indirect businesses).
                      </span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-700 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-300 leading-tight">
                    I confirm that I am 18+ and accept HeraPrize <strong className="text-white">Strict No-Refund rules</strong> and the mandatory <strong className="text-white">Job Creation Business Proposal</strong> after winning.
                  </span>
                </label>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-amber-400 to-yellow-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-sky-500/20 cursor-pointer hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                    <span>Uploading Invoice & Verifying...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload Telebirr Invoice & Dispatch Lucky Tickets ({totalCost} ETB)</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>

      {/* FULLSCREEN IMAGE ZOOM MODAL */}
      {isZoomOpen && uploadedFile && (
        <div 
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-xl w-full bg-slate-900 rounded-3xl p-4 border border-slate-700 space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-white">{uploadedFile.name}</span>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={uploadedFile.dataUrl}
              alt="Telebirr full receipt"
              className="w-full max-h-[70vh] object-contain rounded-2xl border border-slate-800"
            />
            <div className="text-[11px] text-slate-400 text-center">
              Telebirr Transaction Slip • {uploadedFile.size} • Verified Format
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
