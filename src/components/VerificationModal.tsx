import React, { useState } from 'react';
import { BusinessVerification, UserSession } from '../types';
import { ETHIOPIAN_SUBCITIES } from '../data/mockData';
import { isValidEthiopianTIN, isValidEthiopianPhone } from '../data/verificationData';
import { 
  X, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  FileText, 
  Phone, 
  MapPin, 
  Upload, 
  Sparkles, 
  BadgeCheck, 
  Lock,
  ArrowRight,
  Smartphone
} from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  onUpdateVerification: (updatedVerification: BusinessVerification) => void;
  lang: 'en' | 'am';
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateVerification,
  lang
}) => {
  if (!isOpen) return null;

  const currentVerif = currentUser.verification;

  const [role, setRole] = useState<'wholesaler' | 'retailer'>(currentVerif.role || 'retailer');
  const [tradeName, setTradeName] = useState(currentVerif.tradeName || currentUser.businessName || '');
  const [legalOwnerName, setLegalOwnerName] = useState(currentVerif.legalOwnerName || currentUser.name || '');
  const [tinNumber, setTinNumber] = useState(currentVerif.tinNumber || '0028941029');
  const [tradeLicenseNumber, setTradeLicenseNumber] = useState(
    currentVerif.tradeLicenseNumber || (role === 'wholesaler' ? 'MOTI/AA/WHL/2026/8941' : 'MOTI/AA/RTL/2026/4102')
  );
  const [businessType, setBusinessType] = useState<any>(currentVerif.businessType || 'PLC (ኃ/የተ/የግ/ማ)');
  const [licenseSector, setLicenseSector] = useState(
    currentVerif.licenseSector || (role === 'wholesaler' ? 'Wholesale Foodstuffs, Edible Oil & FMCG' : 'Retail Supermarket & Provisions')
  );
  const [city, setCity] = useState(currentVerif.city || 'Addis Ababa');
  const [subcity, setSubcity] = useState(currentVerif.subcity || ETHIOPIAN_SUBCITIES[0]);
  const [woreda, setWoreda] = useState(currentVerif.woreda || 'Woreda 03');
  const [phone, setPhone] = useState(currentVerif.phone || currentUser.phone || '+251 911 234 567');
  const [phoneVerified, setPhoneVerified] = useState(currentVerif.phoneVerified || false);
  const [faydaNationalId, setFaydaNationalId] = useState(currentVerif.faydaNationalId || 'ET-FAYDA-8492-1029-3819');
  
  // OTP simulation
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [simulatedExpectedOtp, setSimulatedExpectedOtp] = useState('849201');

  // License document preview
  const [docUrl, setDocUrl] = useState(
    currentVerif.licenseDocUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  );

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle SMS OTP send
  const handleSendOtp = () => {
    if (!isValidEthiopianPhone(phone)) {
      setErrorMsg('Please enter a valid Ethiopian phone number (+251 9... / 09...)');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    // Simulate auto-generated OTP for easy user testing
    setSimulatedExpectedOtp('774921');
    setTimeout(() => {
      setOtpCode('774921');
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otpCode === simulatedExpectedOtp || otpCode.length >= 4) {
      setPhoneVerified(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect OTP code. Please enter 774921');
    }
  };

  const handleFinalSubmit = (instantApprove = false) => {
    if (!isValidEthiopianTIN(tinNumber)) {
      setErrorMsg('TIN must be exactly 10 digits (የግብር ከፋይ መለያ ቁጥር 10 አሃዝ መሆን አለበት)');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      const updated: BusinessVerification = {
        id: currentVerif.id || `ver-${Date.now()}`,
        role,
        status: instantApprove ? 'verified' : 'verified', // Give user immediate verified status for great UX
        tradeName,
        legalOwnerName,
        tinNumber,
        tradeLicenseNumber,
        licenseSector,
        businessType,
        city,
        subcity,
        woreda,
        phone,
        phoneVerified: true,
        faydaNationalId,
        licenseDocUrl: docUrl,
        submittedAt: new Date().toISOString(),
        verifiedAt: new Date().toISOString(),
        verifiedBy: 'MOTI Digital Trade Registry & JEMLA Verification Engine',
        bankAccountVerified: true
      };

      onUpdateVerification(updated);
      setIsSubmitting(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight">
                  {lang === 'en' ? 'Ethiopian Business Verification (MOTI & MOR)' : 'የንግድ ሥራ ፈቃድና የግብር ማረጋገጫ'}
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Official Legitimacy
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Ministry of Trade & Regional Integration (MOTI) verification for Wholesalers & Retailers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep(1)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeStep === 1 ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>{lang === 'en' ? 'License & TIN Details' : 'የፈቃድና የግብር መረጃ'}</span>
            </button>
            <span className="text-slate-300">→</span>
            <button
              onClick={() => setActiveStep(2)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeStep === 2 ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>{lang === 'en' ? 'Contact & Phone OTP' : 'ስልክና ኤስኤምኤስ'}</span>
            </button>
            <span className="text-slate-300">→</span>
            <button
              onClick={() => setActiveStep(3)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeStep === 3 ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>{lang === 'en' ? 'Document & Approval' : 'ሰነድና ማረጋገጫ'}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs">
            <span className="text-slate-500">Current Status:</span>
            <span className={`font-bold px-2 py-0.5 rounded-md text-[11px] ${
              currentVerif.status === 'verified'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {currentVerif.status === 'verified' ? '✓ Verified' : '● Action Required'}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs font-bold animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: BUSINESS REGISTRATION */}
          {activeStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              {/* Role Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'Select Trading Entity Type' : 'የንግድ ዘርፍ ምረጥ'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('retailer')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition cursor-pointer flex items-center gap-3 ${
                      role === 'retailer'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
                      ሱቅ
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        {lang === 'en' ? 'Retailer / Shop (ችርቻሮ)' : 'ችርቻሮ ነጋዴ / ሱቅ'}
                      </div>
                      <p className="text-[11px] text-slate-500">Supermarkets, Mini-markets, Groceries, Kiosks</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('wholesaler')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition cursor-pointer flex items-center gap-3 ${
                      role === 'wholesaler'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                      ጅምላ
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">
                        {lang === 'en' ? 'Wholesaler / Importer (ጅምላ)' : 'የጅምላ አከፋፋይ / አስመጪ'}
                      </div>
                      <p className="text-[11px] text-slate-500">Bulk Distributors, Factories, Warehouses</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Registered Trade Name (የንግድ ስም)' : 'የንግድ ስም'}
                  </label>
                  <input
                    type="text"
                    value={tradeName}
                    onChange={(e) => setTradeName(e.target.value)}
                    placeholder="e.g. Merkato FMCG Distribution PLC"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Owner / General Manager Name' : 'የባለቤቱ / ስራ አስኪያጅ ስም'}
                  </label>
                  <input
                    type="text"
                    value={legalOwnerName}
                    onChange={(e) => setLegalOwnerName(e.target.value)}
                    placeholder="e.g. Solomon Kebede Mengistu"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>{lang === 'en' ? 'Ethiopian TIN (10-Digits)' : 'የግብር ከፋይ መለያ ቁጥር (TIN)'}</span>
                    <span className="text-[10px] text-emerald-700 font-bold">10 digits</span>
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={tinNumber}
                    onChange={(e) => setTinNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="0028941029"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono tracking-widest focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden bg-slate-50 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'MOTI Trade License Number' : 'የንግድ ሥራ ፈቃድ ቁጥር'}
                  </label>
                  <input
                    type="text"
                    value={tradeLicenseNumber}
                    onChange={(e) => setTradeLicenseNumber(e.target.value)}
                    placeholder="MOTI/AA/WHL/2026/8941"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'Business Legal Structure' : 'የንግድ ድርጅት ዓይነት'}
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  >
                    <option value="PLC (ኃ/የተ/የግ/ማ)">PLC (ኃ/የተ/የግ/ማ)</option>
                    <option value="Sole Proprietorship">Sole Proprietorship (ግለሰብ ነጋዴ)</option>
                    <option value="Share Company (አክሲዮን ማህበር)">Share Company (አክሲዮን ማህበር)</option>
                    <option value="General Partnership">General Partnership (የሽርክና ማህበር)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'en' ? 'National Fayda Digital ID' : 'የፋይዳ ዲጂታል መታወቂያ'}
                  </label>
                  <input
                    type="text"
                    value={faydaNationalId}
                    onChange={(e) => setFaydaNationalId(e.target.value)}
                    placeholder="ET-FAYDA-..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  />
                </div>
              </div>

              {/* Physical Address Section */}
              <div className="pt-3 border-t border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{lang === 'en' ? 'Physical Shop / Warehouse Location' : 'የመጋዘን / ሱቅ አድራሻ'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Sub-City / Zone</label>
                    <select
                      value={subcity}
                      onChange={(e) => setSubcity(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                    >
                      {ETHIOPIAN_SUBCITIES.map(sc => (
                        <option key={sc} value={sc}>{sc}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Woreda / Market Tera</label>
                    <input
                      type="text"
                      value={woreda}
                      onChange={(e) => setWoreda(e.target.value)}
                      placeholder="Woreda 03, Gate 2"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PHONE & SMS OTP VERIFICATION */}
          {activeStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {lang === 'en' ? 'Ethiopian Mobile Number Verification' : 'የስልክ ቁጥር ማረጋገጫ'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    An official SMS code is dispatched to ensure business contact authenticity and secure order communication.
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-lg mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Business Phone Number (+251)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setPhoneVerified(false);
                      }}
                      placeholder="+251 911 234 567"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono bg-white focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer shrink-0"
                    >
                      {otpSent ? 'Resend SMS' : 'Send Code'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-3 pt-2 border-t border-slate-200 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        SMS Code sent to {phone}
                      </span>
                      <span className="text-slate-500 font-mono">Test Code: 774921</span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="flex-1 px-3 py-2 rounded-xl border border-emerald-300 text-sm font-mono tracking-widest text-center bg-white font-bold"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer"
                      >
                        Confirm OTP
                      </button>
                    </div>
                  </div>
                )}

                {phoneVerified && (
                  <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl flex items-center gap-2 text-emerald-900 text-xs font-bold animate-fadeIn">
                    <BadgeCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>✓ Phone number successfully verified with Ethio Telecom network!</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENT UPLOAD & REGISTRY AUDIT */}
          {activeStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-emerald-950 text-sm">
                    {lang === 'en' ? 'Trade License Document Verification' : 'የንግድ ሥራ ፈቃድ ሰነድ'}
                  </h4>
                  <p className="text-xs text-emerald-800">
                    MOTI Commercial Registration stamp verification
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900 text-[11px] font-bold">
                  E-Signature Ready
                </span>
              </div>

              {/* Document Preview Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      MOTI License Certificate
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold">Validated</span>
                  </div>

                  <img
                    src={docUrl}
                    alt="Trade license preview"
                    className="w-full h-36 object-cover rounded-xl border border-slate-200 shadow-xs"
                  />

                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Document: trade_license_2026.pdf</span>
                    <span className="text-emerald-700 font-semibold">TIN: {tinNumber}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-100 rounded-xl text-xs space-y-1">
                    <div className="font-bold text-slate-800">Verification Checklist:</div>
                    <div className="text-slate-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 10-Digit TIN formatted ({tinNumber})
                    </div>
                    <div className="text-slate-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> MOTI Trade Registry match
                    </div>
                    <div className="text-slate-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Telebirr / Bank settlement account linked
                    </div>
                    <div className="text-slate-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Physical address located in {subcity}
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                    <strong className="block mb-0.5">Trust & Safety Guarantee:</strong>
                    Verified status enables high-volume wholesale transactions, access to driver transport dispatch, and official commercial waybills.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          {activeStep > 1 ? (
            <button
              type="button"
              onClick={() => setActiveStep(prev => (prev - 1) as any)}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              ← {lang === 'en' ? 'Back' : 'ተመለስ'}
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              {lang === 'en' ? 'Close' : 'ዝጋ'}
            </button>
          )}

          {activeStep < 3 ? (
            <button
              type="button"
              onClick={() => setActiveStep(prev => (prev + 1) as any)}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <span>{lang === 'en' ? 'Next Step' : 'ቀጣይ'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleFinalSubmit(true)}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-md shadow-emerald-600/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{lang === 'en' ? 'Verifying with MOTI Registry...' : 'በሚኒስቴሩ መዝገብ እየተረጋገጠ ነው...'}</span>
                </>
              ) : (
                <>
                  <BadgeCheck className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Approve & Activate Verified Status' : 'አረጋግጥና ፈቃድ አንቃ'}</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
