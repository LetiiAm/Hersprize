import React, { useState, useEffect } from 'react';
import { Product, Driver, Order, PaymentMethod } from '../types';
import { 
  formatETB, 
  estimateDistanceKm, 
  calculateFreightCost, 
  generateOrderNumber, 
  generateTelebirrRef, 
  generateCbeRef 
} from '../utils/formatters';
import { ETHIOPIAN_SUBCITIES, PAYMENT_METHODS_CONFIG } from '../data/mockData';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Building2, 
  User, 
  Calendar, 
  Smartphone, 
  Copy, 
  QrCode,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CheckoutModalProps {
  product: Product | null;
  drivers: Driver[];
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: (order: Order) => void;
  lang: 'en' | 'am';
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  drivers,
  isOpen,
  onClose,
  onOrderComplete,
  lang
}) => {
  if (!isOpen || !product) return null;

  // Step state
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Order & Address, 2: Transport & Driver, 3: Payment & Confirm

  // Buyer inputs
  const [quantity, setQuantity] = useState<number>(product.moq);
  const [retailerName, setRetailerName] = useState('Yohannes Wolde');
  const [shopName, setShopName] = useState('Bole Medhanealem Supermarket');
  const [buyerPhone, setBuyerPhone] = useState('+251 911 445 566');
  const [city, setCity] = useState('Addis Ababa');
  const [subcity, setSubcity] = useState(ETHIOPIAN_SUBCITIES[1]); // Bole
  const [woreda, setWoreda] = useState('Woreda 03');
  const [specificLandmark, setSpecificLandmark] = useState('Behind Edna Mall, near CBE branch');
  const [deliveryNotes, setDeliveryNotes] = useState('Please call when the truck arrives at warehouse gate');

  // Transport & Driver selection
  const [selectedDriverId, setSelectedDriverId] = useState<string>(drivers[0]?.id || '');
  const [distanceKm, setDistanceKm] = useState<number>(14);

  // Payment inputs
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('telebirr');
  const [telebirrPhone, setTelebirrPhone] = useState('+251 911 445 566');
  const [telebirrUssdSent, setTelebirrUssdSent] = useState(false);
  const [telebirrPin, setTelebirrPin] = useState('');
  const [cbeReference, setCbeReference] = useState('');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('821');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Recalculate distance when destination changes
  useEffect(() => {
    const dist = estimateDistanceKm(product.seller.subcity, subcity);
    setDistanceKm(dist);
  }, [subcity, product.seller.subcity]);

  // Find selected driver
  const selectedDriver = drivers.find(d => d.id === selectedDriverId) || drivers[0];

  // Freight calculation
  const totalWeightKg = (product.weightKgPerUnit || 10) * quantity;
  const freightCalc = selectedDriver 
    ? calculateFreightCost(
        selectedDriver.baseCost, 
        selectedDriver.perKmCost, 
        distanceKm, 
        totalWeightKg, 
        selectedDriver.capacityKg
      )
    : { baseCost: 1500, distanceFee: 500, heavyCargoSurcharge: 0, totalFreight: 2000 };

  const subtotal = quantity * product.unitPrice;
  const totalAmount = subtotal + freightCalc.totalFreight;

  // MOQ validation
  const isMoqMet = quantity >= product.moq;

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('1000492810928');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleSimulateUssd = () => {
    setTelebirrUssdSent(true);
    // prefill reference
    setTimeout(() => {
      setTelebirrPin('8492');
    }, 1200);
  };

  const handleFinalSubmit = () => {
    let txRef = '';
    if (paymentMethod === 'telebirr') {
      txRef = generateTelebirrRef();
    } else if (paymentMethod === 'cbe_birr') {
      txRef = cbeReference || generateCbeRef();
    } else if (paymentMethod === 'card') {
      txRef = `ETH-CARD-${Math.floor(100000 + Math.random() * 900000)}`;
    } else {
      txRef = `COD-GUARANTEE-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      product: product,
      quantity: quantity,
      unitPrice: product.unitPrice,
      subtotal: subtotal,
      transportCost: freightCalc.totalFreight,
      totalAmount: totalAmount,
      buyer: {
        retailerName,
        shopName,
        phone: buyerPhone,
        city,
        subcity,
        woreda,
        specificLandmark
      },
      transport: {
        driverId: selectedDriver.id,
        driverName: selectedDriver.name,
        driverPhone: selectedDriver.phone,
        vehicleType: selectedDriver.vehicleType,
        plateNumber: selectedDriver.plateNumber,
        estimatedDistanceKm: distanceKm,
        transportCost: freightCalc.totalFreight,
        deliveryNotes
      },
      payment: {
        method: paymentMethod,
        status: 'pending',
        transactionReference: txRef,
        accountOrPhone: paymentMethod === 'telebirr' ? (telebirrPhone || buyerPhone) : '1000492810928 (CBE)',
        bankName: paymentMethod === 'cbe_birr' ? 'Commercial Bank of Ethiopia' : 'Ethio Telecom Telebirr',
        timestamp: new Date().toISOString()
      },
      status: 'driver_dispatched',
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    onOrderComplete(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold flex items-center gap-2">
                <span>{lang === 'en' ? 'Wholesale Order & Transport Dispatch' : 'የጅምላ ትዕዛዝ እና ትራንስፖርት'}</span>
              </h2>
              <p className="text-xs text-amber-200/80 font-medium">
                {product.name} • {product.brand}
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

        {/* Stepper Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                step === 1 ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
              <span>{lang === 'en' ? 'Required Amount & Address' : 'ብዛትና አድራሻ'}</span>
            </button>

            <span className="text-slate-300">→</span>

            <button
              onClick={() => isMoqMet && setStep(2)}
              disabled={!isMoqMet}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                step === 2 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : isMoqMet ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
              <span>{lang === 'en' ? 'Transport & Driver' : 'ትራንስፖርትና አሽከርካሪ'}</span>
            </button>

            <span className="text-slate-300">→</span>

            <button
              onClick={() => isMoqMet && setStep(3)}
              disabled={!isMoqMet}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer ${
                step === 3 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : isMoqMet ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
              <span>{lang === 'en' ? 'Payment (telebirr/CBE)' : 'ክፍያ (ቴሌብር/ሲቢኢ)'}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-500 font-medium text-xs">
            <span>{lang === 'en' ? 'Grand Total:' : 'ጠቅላላ ድምር:'}</span>
            <span className="font-extrabold text-amber-700 text-sm">{formatETB(totalAmount)}</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: QUANTITY & BUYER ADDRESS */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Product Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-xl border border-slate-200"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                      {product.brand}
                    </span>
                    <span className="text-xs text-slate-500">Batch: {product.batchNumber}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{product.name}</h3>
                  <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <span>
                      {lang === 'en' ? 'Wholesale Price:' : 'የጅምላ ዋጋ:'} <strong className="text-slate-900">{formatETB(product.unitPrice)}</strong> / {product.unit}
                    </span>
                    <span>•</span>
                    <span className="text-amber-700 font-bold">
                      {lang === 'en' ? 'Mandatory MOQ:' : 'ዝቅተኛ ትዕዛዝ:'} {product.moq} {product.unit.split(' ')[0]}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Wholesaler: <strong>{product.seller.businessName}</strong> ({product.seller.hubLocation})
                  </div>
                </div>
              </div>

              {/* Required Amount Input (Buyer Side) */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-900">
                      {lang === 'en' ? 'Required Order Amount (ብዛት)' : 'የሚፈልጉት የዕቃ ብዛት'}
                    </label>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Must be equal to or greater than the Minimum Order Quantity ({product.moq} {product.unit}).
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border-2 border-slate-300 rounded-xl bg-white overflow-hidden shadow-xs">
                      <button
                        type="button"
                        onClick={() => setQuantity(prev => Math.max(product.moq, prev - 5))}
                        className="px-3.5 py-2 hover:bg-slate-100 text-slate-700 font-bold transition text-base"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={product.moq}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-20 text-center font-black text-slate-900 text-lg py-1.5 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(prev => prev + 5)}
                        className="px-3.5 py-2 hover:bg-slate-100 text-slate-700 font-bold transition text-base"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-slate-600 uppercase">
                      {product.unit.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Validation Banner */}
                {!isMoqMet ? (
                  <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      {lang === 'en'
                        ? `Cannot proceed: Minimum wholesale order is ${product.moq} units. Please increase quantity.`
                        : `ዝቅተኛው የጅምላ ትዕዛዝ ${product.moq} ነው። እባክዎ ብዛቱን ይጨምሩ።`}
                    </span>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-amber-200/60">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {lang === 'en' ? 'MOQ requirement satisfied' : 'የጅምላ ዝቅተኛ መስፈርት ተሟልቷል'}
                    </span>
                    <span className="font-bold text-slate-900">
                      Subtotal: {formatETB(subtotal)}
                    </span>
                  </div>
                )}
              </div>

              {/* Buyer Contact & Delivery Destination Form */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>{lang === 'en' ? 'Retailer & Delivery Address' : 'የችርቻሮ ነጋዴ መረጃ እና የመድረሻ አድራሻ'}</span>
                  </h4>
                  <span className="text-xs text-slate-500">* All fields required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'en' ? 'Retailer / Contact Person' : 'የተቀባይ ስም'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={retailerName}
                        onChange={(e) => setRetailerName(e.target.value)}
                        placeholder="Ato / Wro..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'en' ? 'Shop / Enterprise Trade Name' : 'የሱቅ ወይም ድርጅት ስም'}
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        placeholder="e.g. Merkato Mart, Mini Market..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'en' ? 'Phone Number (የስልክ ቁጥር)' : 'የስልክ ቁጥር'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="+251 9... or +251 7..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'en' ? 'Delivery Sub-City / Region' : 'ክፍለ ከተማ / ክልል'}
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <select
                        value={subcity}
                        onChange={(e) => setSubcity(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden bg-white"
                      >
                        {ETHIOPIAN_SUBCITIES.map((sc) => (
                          <option key={sc} value={sc}>{sc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'en' ? 'Woreda / Kebele' : 'ወረዳ / ቀበሌ'}
                    </label>
                    <input
                      type="text"
                      value={woreda}
                      onChange={(e) => setWoreda(e.target.value)}
                      placeholder="e.g. Woreda 03, Kebele 12"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'en' ? 'Specific Landmark / Street' : 'ልዩ ቦታ / መለያ'}
                    </label>
                    <input
                      type="text"
                      value={specificLandmark}
                      onChange={(e) => setSpecificLandmark(e.target.value)}
                      placeholder="e.g. Opposite Edna Mall, behind Total"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TRANSPORT & DRIVER SELECTION */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-blue-950 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>{lang === 'en' ? 'Ethiopian Commercial Freight Dispatch' : 'የጭነት ትራንስፖርት እና አሽከርካሪ ምርጫ'}</span>
                  </h4>
                  <p className="text-xs text-blue-800 mt-1">
                    Route: <strong className="text-slate-900">{product.seller.hubLocation}</strong> ➔ <strong className="text-slate-900">{subcity} ({woreda})</strong> (~{distanceKm} km)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-blue-700 block font-medium">Estimated Cargo Weight</span>
                  <span className="text-sm font-black text-blue-950">~{totalWeightKg.toLocaleString()} kg</span>
                </div>
              </div>

              {/* Drivers Selection List */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {lang === 'en' ? 'Select Verified Driver & Vehicle' : 'ተረካቢ አሽከርካሪና ተሽከርካሪ ይምረጡ'}
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {drivers.map((drv) => {
                    const isSelected = drv.id === selectedDriverId;
                    const drvFreight = calculateFreightCost(
                      drv.baseCost,
                      drv.perKmCost,
                      distanceKm,
                      totalWeightKg,
                      drv.capacityKg
                    );

                    return (
                      <div
                        key={drv.id}
                        onClick={() => setSelectedDriverId(drv.id)}
                        className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/40 shadow-md ring-2 ring-amber-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={drv.avatar}
                            alt={drv.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="font-bold text-slate-900 text-sm truncate">{drv.name}</h5>
                              <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                                ★ {drv.rating}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-bold">
                                {drv.vehicleType}
                              </span>
                              <span className="text-xs font-mono font-bold text-slate-600 bg-slate-200/70 px-1.5 py-0.5 rounded">
                                {drv.plateNumber}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              {drv.phone}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-500">
                            Base {drv.baseCost} + {drv.perKmCost} ETB/km
                          </span>
                          <span className="font-extrabold text-slate-900 text-sm">
                            {formatETB(drvFreight.totalFreight)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Driver Delivery Instructions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'en' ? 'Driver Delivery Notes / Gate Access Instructions' : 'ለአሽከርካሪው የሚተላለፍ መመሪያ / የመጋዘን በር መለያ'}
                </label>
                <textarea
                  rows={2}
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Unload at the store back gate, driver please call upon arrival..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-hidden"
                />
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              {/* Payment Method Tabs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'Choose Ethiopian Payment Gateway' : 'የክፍያ አማራጭ ይምረጡ'}
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PAYMENT_METHODS_CONFIG.map((method) => {
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                        className={`p-3 rounded-2xl border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-2 ring-amber-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold text-slate-900 text-xs line-clamp-1">
                          {method.name}
                        </div>
                        <span className="text-[10px] text-amber-700 font-semibold mt-1 block">
                          {method.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* TELEBIRR FLOW */}
              {paymentMethod === 'telebirr' && (
                <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-black text-xs flex items-center justify-center">
                        tb
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sky-950 text-sm">telebirr (ቴሌብር) Merchant Settlement</h4>
                        <p className="text-xs text-sky-700">Official Merchant ID: TB-MERCHANT-84920</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">
                      Instant Settlement
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Retailer Telebirr Phone (የቴሌብር ስልክ ቁጥር)
                      </label>
                      <input
                        type="text"
                        value={telebirrPhone}
                        onChange={(e) => setTelebirrPhone(e.target.value)}
                        placeholder="09... / 07..."
                        className="w-full px-3 py-2 rounded-xl border border-sky-300 bg-white text-sm font-mono focus:outline-hidden"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        Enter your registered Telebirr number to trigger instant confirmation.
                      </p>
                    </div>

                    <div className="flex flex-col justify-end">
                      <button
                        type="button"
                        onClick={handleSimulateUssd}
                        className="py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Send USSD Push (*127#) to Phone</span>
                      </button>
                    </div>
                  </div>

                  {telebirrUssdSent && (
                    <div className="p-3 bg-white border border-sky-300 rounded-xl space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>USSD prompt triggered on {telebirrPhone}. Amount: {formatETB(totalAmount)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="password"
                          maxLength={4}
                          value={telebirrPin}
                          onChange={(e) => setTelebirrPin(e.target.value)}
                          placeholder="Enter 4-digit PIN"
                          className="w-36 px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-mono tracking-widest text-center"
                        />
                        <span className="text-xs text-slate-500">
                          (Simulated PIN: Auto-authorized)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CBE BIRR / MOBILE BANKING */}
              {paymentMethod === 'cbe_birr' && (
                <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-700 text-white font-bold text-xs flex items-center justify-center">
                        CBE
                      </div>
                      <div>
                        <h4 className="font-extrabold text-amber-950 text-sm">Commercial Bank of Ethiopia (CBE)</h4>
                        <p className="text-xs text-amber-800">CBE Birr & Account Transfer</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 text-[11px] font-bold">
                      1000... Series Verified
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">JEMLA Escrow Wholesale Account</div>
                      <div className="text-base font-mono font-bold text-slate-900">1000 4928 1092 8</div>
                      <div className="text-[11px] text-amber-800">Account Name: JEMLA ETHIOPIA TRADING SC</div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedAccount ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      CBE Transfer Reference / FT Slip Number (የደረሰኝ ቁጥር)
                    </label>
                    <input
                      type="text"
                      value={cbeReference}
                      onChange={(e) => setCbeReference(e.target.value)}
                      placeholder="e.g. FT2628001921 or Mobile slip ref"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono uppercase focus:outline-hidden"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Enter the transaction FT number from your CBE Mobile app or SMS notification.
                    </p>
                  </div>
                </div>
              )}

              {/* CARD PAYMENTS */}
              {paymentMethod === 'card' && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-700" />
                      <span>EthSwitch Debit & Visa / Mastercard</span>
                    </h4>
                    <span className="text-xs text-slate-500">256-Bit SSL Encrypted</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-sm bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CVV / CVC</label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-sm bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BANK TRANSFER (OTHER BANKS) */}
              {paymentMethod === 'bank_transfer' && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
                  <h4 className="font-bold text-emerald-950 text-sm">Awash Bank, Bank of Abyssinia, Dashen Amole</h4>
                  <p className="text-xs text-emerald-800">
                    Use Awash Birr, Amole, or BoA Mobile app to transfer to platform merchant ID <strong>ETH-88291</strong>.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Bank Transfer Reference</label>
                    <input
                      type="text"
                      placeholder="e.g. AWSH-992019"
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-white text-sm font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Order Cost Final Breakdown */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Goods Subtotal ({quantity} {product.unit.split(' ')[0]} x {formatETB(product.unitPrice)})</span>
                  <span className="font-semibold text-white">{formatETB(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Transport Freight ({selectedDriver.vehicleType} • {distanceKm} km)</span>
                  <span className="font-semibold text-white">{formatETB(freightCalc.totalFreight)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-400">
                  <span>Assigned Driver</span>
                  <span>{selectedDriver.name} ({selectedDriver.plateNumber})</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm font-extrabold">
                  <span>Total Amount Due (ብር)</span>
                  <span className="text-amber-400 text-lg">{formatETB(totalAmount)}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev - 1) as any)}
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
              {lang === 'en' ? 'Cancel' : 'ሰርዝ'}
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev + 1) as any)}
              disabled={!isMoqMet}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                isMoqMet 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{lang === 'en' ? 'Continue' : 'ቀጥል'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-md shadow-emerald-600/20"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{lang === 'en' ? 'Clearing Payment...' : 'ክፍያ እየተረጋገጠ ነው...'}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {lang === 'en' ? `Authorize & Dispatch Driver (${formatETB(totalAmount)})` : `ክፍያ ፈፅም እና አሽከርካሪ ላክ (${formatETB(totalAmount)})`}
                  </span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
