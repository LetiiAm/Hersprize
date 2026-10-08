import React, { useState } from 'react';
import { Product } from '../types';
import { formatETB, getShelfLifeStatus } from '../utils/formatters';
import { 
  X, 
  Tag, 
  Boxes, 
  Calendar, 
  CalendarClock, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Truck, 
  CheckCircle2, 
  ShoppingCart,
  Building2,
  Share2,
  AlertTriangle
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToOrder: (product: Product, quantity: number) => void;
  lang: 'en' | 'am';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onProceedToOrder,
  lang
}) => {
  if (!isOpen || !product) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedQty, setSelectedQty] = useState(product.moq);
  const shelfLife = getShelfLifeStatus(product.expirationDate);
  const isMoqValid = selectedQty >= product.moq;
  const subtotal = selectedQty * product.unitPrice;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
              {product.brand}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Category: <strong className="text-slate-800">{product.category}</strong>
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition cursor-pointer text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Images */}
            <div className="space-y-3">
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-black shadow-md flex items-center gap-1.5 border border-amber-300">
                    <Boxes className="w-4 h-4" />
                    MOQ: {product.moq} {product.unit.split(' ')[0]}
                  </span>
                </div>
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                        activeImageIdx === idx ? 'border-amber-600 ring-2 ring-amber-500/30' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Shelf-Life Alert Card */}
              <div className={`p-3.5 rounded-2xl border ${shelfLife.badgeColor} flex items-center justify-between text-xs`}>
                <div className="flex items-center gap-2">
                  <CalendarClock className="w-4 h-4" />
                  <span className="font-bold">{shelfLife.label}</span>
                </div>
                <span className="text-[11px] font-mono">Lot: {product.batchNumber}</span>
              </div>
            </div>

            {/* Right: Product & Wholesale Specs */}
            <div className="space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {product.name}
                </h1>
                {product.nameAmharic && (
                  <p className="text-sm text-slate-600 font-medium mt-1">
                    {product.nameAmharic}
                  </p>
                )}
              </div>

              {/* Price card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-xs text-slate-500 font-medium">Wholesale Price (የጅምላ ዋጋ)</div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-slate-900">{formatETB(product.unitPrice)}</span>
                  <span className="text-xs text-slate-500 font-medium">/ {product.unit}</span>
                </div>
                <div className="text-xs text-amber-800 font-semibold mt-1">
                  Available in Stock: <strong>{product.stockAvailable} units</strong>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-slate-100/70 p-2.5 rounded-xl">
                  <span className="text-slate-500 block text-[11px]">Manufacturing Date</span>
                  <strong className="text-slate-900 font-mono text-xs">{product.manufacturingDate}</strong>
                </div>
                <div className="bg-slate-100/70 p-2.5 rounded-xl">
                  <span className="text-slate-500 block text-[11px]">Expiration Date</span>
                  <strong className="text-slate-900 font-mono text-xs">{product.expirationDate}</strong>
                </div>
                <div className="bg-slate-100/70 p-2.5 rounded-xl">
                  <span className="text-slate-500 block text-[11px]">Minimum Order (MOQ)</span>
                  <strong className="text-amber-800 font-bold">{product.moq} {product.unit}</strong>
                </div>
                <div className="bg-slate-100/70 p-2.5 rounded-xl">
                  <span className="text-slate-500 block text-[11px]">Unit Weight</span>
                  <strong className="text-slate-900 font-bold">{product.weightKgPerUnit} kg / unit</strong>
                </div>
              </div>

              {/* Wholesaler Contact & Credentials */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                    {product.seller.verified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    )}
                    <span>{product.seller.businessName}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">TIN: {product.seller.tinNumber}</span>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{product.seller.hubLocation}</span>
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Contact: {product.seller.contactPerson} ({product.seller.phone})</span>
                </div>
              </div>

              {/* Order Quantity Calculator */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900">
                    Order Quantity ({product.unit.split(' ')[0]}s)
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setSelectedQty(prev => Math.max(product.moq, prev - 5))}
                      className="px-3 py-1 hover:bg-slate-100 font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={product.moq}
                      value={selectedQty}
                      onChange={(e) => setSelectedQty(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-16 text-center font-bold text-slate-900 text-sm py-1 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedQty(prev => prev + 5)}
                      className="px-3 py-1 hover:bg-slate-100 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {!isMoqValid ? (
                  <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Quantity cannot be less than MOQ of {product.moq} units.</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-amber-200">
                    <span className="text-slate-600">Calculated Batch Subtotal:</span>
                    <span className="font-black text-amber-900 text-sm">{formatETB(subtotal)}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => isMoqValid && onProceedToOrder(product, selectedQty)}
                disabled={!isMoqValid}
                className={`w-full py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md ${
                  isMoqValid
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>
                  {lang === 'en'
                    ? `Proceed to Freight & Payment (${formatETB(subtotal)})`
                    : `ወደ ትራንስፖርትና ክፍያ ቀጥል (${formatETB(subtotal)})`}
                </span>
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
