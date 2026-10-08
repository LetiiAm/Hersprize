import React from 'react';
import { Product } from '../types';
import { formatETB, getShelfLifeStatus } from '../utils/formatters';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Calendar, 
  CalendarClock, 
  Truck, 
  Boxes, 
  ExternalLink,
  Tag
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  lang: 'en' | 'am';
  onSelect: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onSelect,
  onQuickOrder
}) => {
  const shelfLife = getShelfLifeStatus(product.expirationDate);
  const minOrderValue = product.moq * product.unitPrice;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Top Image Container with Badges */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Brand Tag */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold tracking-wide flex items-center gap-1 shadow-sm">
            <Tag className="w-3 h-3 text-amber-400" />
            {product.brand}
          </span>
        </div>

        {/* MOQ Tag (Crucial Requirement) */}
        <div className="absolute top-3 right-3">
          <div className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-black tracking-tight shadow-md flex items-center gap-1 border border-amber-300">
            <Boxes className="w-3.5 h-3.5" />
            <span>MOQ: {product.moq} {product.unit.split(' ')[0]}</span>
          </div>
        </div>

        {/* Shelf Life Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border backdrop-blur-xs shadow-xs ${shelfLife.badgeColor}`}>
            {shelfLife.label}
          </span>
        </div>
      </div>

      {/* Main Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 mb-1">
            {product.category}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="font-bold text-slate-900 text-base leading-snug hover:text-amber-600 transition cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>
          {product.nameAmharic && (
            <p className="text-xs text-slate-500 font-medium line-clamp-1 mb-2.5">
              {product.nameAmharic}
            </p>
          )}

          {/* Price & Unit Breakdown */}
          <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 mb-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xl font-extrabold text-slate-900">
                  {formatETB(product.unitPrice)}
                </span>
                <span className="text-xs text-slate-500 font-medium"> / {product.unit}</span>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-200/60">
              <span className="text-slate-500">
                {lang === 'en' ? 'Min. Lot Total:' : 'ዝቅተኛ ዋጋ:'}
              </span>
              <span className="font-bold text-amber-700">
                {formatETB(minOrderValue)}
              </span>
            </div>
          </div>

          {/* Manufacturing & Expiration Dates */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 mb-3">
            <div className="bg-slate-100/70 p-2 rounded-lg">
              <div className="flex items-center gap-1 text-slate-500 font-medium">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{lang === 'en' ? 'Mfg Date' : 'የተመረተበት'}</span>
              </div>
              <div className="font-semibold text-slate-800 mt-0.5">
                {product.manufacturingDate}
              </div>
            </div>

            <div className="bg-slate-100/70 p-2 rounded-lg">
              <div className="flex items-center gap-1 text-slate-500 font-medium">
                <CalendarClock className="w-3 h-3 text-slate-400" />
                <span>{lang === 'en' ? 'Exp Date' : 'የሚያበቃበት'}</span>
              </div>
              <div className="font-semibold text-slate-800 mt-0.5">
                {product.expirationDate}
              </div>
            </div>
          </div>

          {/* Wholesaler & Contact Address */}
          <div className="border-t border-slate-100 pt-2.5 mb-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 font-semibold text-slate-800 truncate">
                {product.seller.verified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                )}
                <span className="truncate">{product.seller.businessName}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{product.seller.hubLocation}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-600 text-[11px] mt-1">
              <Phone className="w-3 h-3 text-amber-600 shrink-0" />
              <span className="font-medium">{product.seller.phone}</span>
            </div>
          </div>

          {/* Suggested Transport Vehicle */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 bg-amber-50/60 px-2 py-1.5 rounded-lg border border-amber-100/80 mb-3">
            <div className="flex items-center gap-1 text-amber-900 font-medium">
              <Truck className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'en' ? 'Recommended Freight:' : 'የሚመከር ትራንስፖርት:'}</span>
            </div>
            <span className="font-bold text-amber-800">{product.suggestedVehicle}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onSelect(product)}
            className="w-full py-2 px-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1"
          >
            <span>{lang === 'en' ? 'View Details' : 'ሙሉ መረጃ'}</span>
          </button>
          
          <button
            onClick={() => onQuickOrder(product)}
            className="w-full py-2 px-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-1"
          >
            <span>{lang === 'en' ? 'Order Bulk' : 'በጅምላ እዘዝ'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
