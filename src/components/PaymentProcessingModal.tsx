import React, { useState, useEffect } from 'react';
import { Order, PaymentMethod } from '../types';
import { formatETB, generateTelebirrRef, generateCbeRef } from '../utils/formatters';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Lock, 
  RefreshCw, 
  Building2, 
  Truck, 
  QrCode, 
  FileText,
  Send
} from 'lucide-react';

interface PaymentProcessingModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (confirmedOrder: Order) => void;
  lang: 'en' | 'am';
}

export const PaymentProcessingModal: React.FC<PaymentProcessingModalProps> = ({
  order,
  isOpen,
  onClose,
  onPaymentSuccess,
  lang
}) => {
  if (!isOpen || !order) return null;

  // Selected gateway: telebirr or cbe_birr
  const [activeGateway, setActiveGateway] = useState<'telebirr' | 'cbe_birr'>(
    order.payment.method === 'cbe_birr' ? 'cbe_birr' : 'telebirr'
  );

  // Flow stages: 'input' -> 'ussd_prompt' -> 'processing' -> 'success'
  const [stage, setStage] = useState<'input' | 'ussd_prompt' | 'processing' | 'success'>('input');

  // Phone number state
  const [phoneNumber, setPhoneNumber] = useState(
    order.buyer.phone || (activeGateway === 'telebirr' ? '0911445566' : '0922849104')
  );

  // PIN input
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [txReference, setTxReference] = useState('');
  const [processingStepText, setProcessingStepText] = useState('');

  // Reset or switch gateway
  const handleSwitchGateway = (gw: 'telebirr' | 'cbe_birr') => {
    setActiveGateway(gw);
    setStage('input');
    setPin('');
    setErrorMsg('');
  };

  // Step 1: Send USSD / Push
  const handleInitiatePush = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.trim().replace(/\s+/g, '');
    if (cleanPhone.length < 9) {
      setErrorMsg('Please enter a valid Ethiopian phone number (e.g. 09... or 07...)');
      return;
    }
    setErrorMsg('');
    setStage('ussd_prompt');
  };

  // Step 2: Submit PIN and start simulated bank/telecom gateway verification
  const handleConfirmPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) {
      setErrorMsg('Please enter your 4-digit PIN');
      return;
    }

    setErrorMsg('');
    setStage('processing');

    const isTelebirr = activeGateway === 'telebirr';
    const generatedRef = isTelebirr ? generateTelebirrRef() : generateCbeRef();
    setTxReference(generatedRef);

    // Simulated Gateway Handshake Sequence
    setProcessingStepText(
      isTelebirr
        ? 'Connecting to Ethio Telecom telebirr API gateway...'
        : 'Connecting to Commercial Bank of Ethiopia (CBE) core banking switch...'
    );

    setTimeout(() => {
      setProcessingStepText(
        isTelebirr
          ? 'Authorizing merchant escrow deposit (JEMLA TRADING SC)...'
          : 'Verifying CBE Birr account balance and generating FT reference...'
      );
    }, 1200);

    setTimeout(() => {
      setProcessingStepText('Transaction approved! Generating official trade settlement slip...');
    }, 2400);

    setTimeout(() => {
      setStage('success');
    }, 3200);
  };

  // Step 3: Complete flow and pass confirmed order to Waybill
  const handleFinalizeAndOpenReceipt = () => {
    const confirmedOrder: Order = {
      ...order,
      payment: {
        method: activeGateway,
        status: 'verified',
        transactionReference: txReference || (activeGateway === 'telebirr' ? generateTelebirrRef() : generateCbeRef()),
        accountOrPhone: phoneNumber,
        bankName: activeGateway === 'telebirr' ? 'Ethio Telecom telebirr' : 'Commercial Bank of Ethiopia',
        timestamp: new Date().toISOString()
      },
      status: 'in_transit' // immediately ready for live driver transit!
    };

    onPaymentSuccess(confirmedOrder);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Top Header with Gateway Brand Accent */}
        <div className={`px-6 py-5 text-white flex items-center justify-between transition-colors ${
          activeGateway === 'telebirr'
            ? 'bg-gradient-to-r from-sky-600 via-sky-700 to-blue-800'
            : 'bg-gradient-to-r from-amber-700 via-purple-900 to-slate-950'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center font-black text-lg shadow-sm">
              {activeGateway === 'telebirr' ? 'tb' : 'CBE'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  {activeGateway === 'telebirr' ? 'telebirr Payment Portal' : 'CBE Mobile Banking'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-mono text-[10px] font-bold">
                  SIMULATION
                </span>
              </div>
              <p className="text-xs text-white/80">
                {activeGateway === 'telebirr' ? 'Ethio Telecom Mobile Money' : 'Commercial Bank of Ethiopia'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Gateway Selector Tabs (Only active in 'input' stage) */}
        {stage === 'input' && (
          <div className="bg-slate-100 p-2 grid grid-cols-2 gap-2 border-b border-slate-200">
            <button
              type="button"
              onClick={() => handleSwitchGateway('telebirr')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                activeGateway === 'telebirr'
                  ? 'bg-white text-sky-700 shadow-xs border border-sky-200 ring-2 ring-sky-500/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span>telebirr (ቴሌብር)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchGateway('cbe_birr')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                activeGateway === 'cbe_birr'
                  ? 'bg-white text-amber-800 shadow-xs border border-amber-200 ring-2 ring-amber-500/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>CBE Mobile / CBE Birr</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Order Financial Overview Pill */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span>Merchant / Recipient:</span>
              <strong className="text-slate-800">JEMLA ETHIOPIA TRADING SC</strong>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>Wholesale Item:</span>
              <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                {order.product.name} ({order.quantity} units)
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>Carrier Freight:</span>
              <span className="font-semibold text-slate-800">
                {order.transport.driverName} ({formatETB(order.transportCost)})
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm">
              <span className="font-bold text-slate-700">Total Commercial Amount:</span>
              <span className="font-black text-amber-800 text-lg">
                {formatETB(order.totalAmount)}
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STAGE 1: PHONE NUMBER INPUT */}
          {stage === 'input' && (
            <form onSubmit={handleInitiatePush} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>
                    {activeGateway === 'telebirr' 
                      ? 'Telebirr Registered Phone Number' 
                      : 'CBE Mobile / CBE Birr Registered Number'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">09... / 07...</span>
                </label>

                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 0911 445 566"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {activeGateway === 'telebirr'
                    ? 'A simulated USSD push prompt (*127#) will be sent to this phone.'
                    : 'A simulated CBE Birr debit authorization will be sent to this phone.'}
                </p>
              </div>

              {/* Quick sample phone suggestions */}
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <span className="text-slate-400">Quick test numbers:</span>
                <button
                  type="button"
                  onClick={() => setPhoneNumber('0911445566')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono font-semibold cursor-pointer"
                >
                  0911445566
                </button>
                <button
                  type="button"
                  onClick={() => setPhoneNumber('0922849104')}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono font-semibold cursor-pointer"
                >
                  0922849104
                </button>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-2xl font-black text-sm text-white transition flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                  activeGateway === 'telebirr'
                    ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
                    : 'bg-amber-700 hover:bg-amber-800 shadow-amber-700/20'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {activeGateway === 'telebirr' 
                    ? 'Trigger Telebirr USSD Push (*127#)' 
                    : 'Trigger CBE Mobile Authorization'}
                </span>
              </button>
            </form>
          )}

          {/* STAGE 2: SIMULATED USSD PHONE SCREEN / PIN PROMPT */}
          {stage === 'ussd_prompt' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Phone Mockup Screen */}
              <div className="bg-slate-900 rounded-3xl p-5 border-4 border-slate-800 shadow-xl text-center space-y-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                  <span>Ethio Telecom USSD</span>
                  <span className="font-mono">100% 🔋</span>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-white text-sm">
                    {activeGateway === 'telebirr' ? 'telebirr *127# Prompt' : 'CBE Birr *847# Prompt'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-snug px-2">
                    Pay <strong className="text-amber-400 font-mono">{formatETB(order.totalAmount)}</strong> to{' '}
                    <strong className="text-white">JEMLA ETHIOPIA TRADING</strong> for Wholesale Order{' '}
                    <span className="font-mono text-slate-400">{order.orderNumber}</span>?
                  </p>
                </div>

                <form onSubmit={handleConfirmPin} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Enter 4-Digit Security PIN (ማረጋገጫ ፒን)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      autoFocus
                      required
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••"
                      className="w-40 mx-auto text-center font-mono text-2xl tracking-[0.5em] py-2 px-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-amber-400 outline-hidden"
                    />
                    <div className="text-[10px] text-slate-500 mt-1">
                      (Demo PIN: Enter any 4 digits, e.g. <strong className="text-slate-400 font-mono">1234</strong>)
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStage('input')}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                    >
                      Cancel / ተመለስ
                    </button>
                    <button
                      type="submit"
                      className={`py-2 px-3 rounded-xl text-white text-xs font-bold transition cursor-pointer shadow-md ${
                        activeGateway === 'telebirr'
                          ? 'bg-sky-600 hover:bg-sky-500'
                          : 'bg-amber-600 hover:bg-amber-500'
                      }`}
                    >
                      Authorize Payment / አረጋግጥ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* STAGE 3: GATEWAY PROCESSING ANIMATION */}
          {stage === 'processing' && (
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full border-4 border-t-transparent animate-spin ${
                  activeGateway === 'telebirr' ? 'border-sky-600' : 'border-amber-600'
                }`}></div>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xs text-slate-700">
                  {activeGateway === 'telebirr' ? 'tb' : 'CBE'}
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base">
                  Processing Commercial Settlement
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  {processingStepText}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 font-mono">
                Amount: {formatETB(order.totalAmount)} • Payer: {phoneNumber}
              </div>
            </div>
          )}

          {/* STAGE 4: SUCCESS CONFIRMATION */}
          {stage === 'success' && (
            <div className="space-y-5 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black tracking-wide uppercase border border-emerald-300">
                  Payment Successfully Cleared
                </span>
                <h3 className="font-black text-slate-900 text-xl mt-2">
                  {formatETB(order.totalAmount)}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Commercial escrow confirmed. Driver dispatched for transit.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <strong className="text-slate-900 font-mono">{txReference}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Gateway:</span>
                  <strong className="text-slate-900">
                    {activeGateway === 'telebirr' ? 'Ethio Telecom telebirr' : 'Commercial Bank of Ethiopia'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Debited Phone:</span>
                  <strong className="text-slate-900 font-mono">{phoneNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Driver:</span>
                  <strong className="text-emerald-700 font-bold">
                    {order.transport.driverName} ({order.transport.plateNumber})
                  </strong>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinalizeAndOpenReceipt}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-700/20"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Official Delivery Waybill & Receipt (ደረሰኝ)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
