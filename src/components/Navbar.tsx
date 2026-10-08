import React from 'react';
import { 
  Store, 
  Truck, 
  Package, 
  FileText, 
  PlusCircle, 
  PhoneCall, 
  Globe, 
  ShieldCheck, 
  Search,
  ShoppingCart
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'browse' | 'wholesaler' | 'logistics' | 'orders';
  setCurrentTab: (tab: 'browse' | 'wholesaler' | 'logistics' | 'orders') => void;
  lang: 'en' | 'am';
  setLang: (lang: 'en' | 'am') => void;
  openNewProductModal: () => void;
  orderCount: number;
  productCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  openNewProductModal,
  orderCount,
  productCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-emerald-400">
              {lang === 'en' ? 'Ethiopian Wholesale B2B Gateway' : 'የኢትዮጵያ የጅምላ ንግድ መድረክ'}
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300">
              {lang === 'en' 
                ? 'Merkato • Kality • Piassa • Adama • Hawassa Logistics Network' 
                : 'መርካቶ • ቃሊቲ • ፒያሳ • አዳማ • ሐዋሳ የትራንስፖርት ትስስር'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="font-semibold text-amber-400">telebirr</span> & <span className="font-semibold text-purple-300">CBE Birr</span> Instant Clearing
            </div>
            <button
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium transition cursor-pointer border border-slate-700"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'en' ? 'አማርኛ' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => setCurrentTab('browse')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  JEMLA<span className="text-amber-600">.et</span>
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
                  ጅምላ
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {lang === 'en' ? 'Wholesale & Retail Marketplace' : 'የጅምላና ችርቻሮ የንግድ ማዕከል'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setCurrentTab('browse')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                currentTab === 'browse'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4 text-amber-600" />
              <span>{lang === 'en' ? 'Retailer Catalog' : 'የእቃዎች ዝርዝር'}</span>
              <span className="text-xs px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full font-bold">
                {productCount}
              </span>
            </button>

            <button
              onClick={() => setCurrentTab('wholesaler')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                currentTab === 'wholesaler'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'en' ? 'Wholesaler Portal' : 'የጅምላ ነጋዴ'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('logistics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                currentTab === 'logistics'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-4 h-4 text-blue-600" />
              <span>{lang === 'en' ? 'Transport & Drivers' : 'አሽከርካሪዎች'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('orders')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${
                currentTab === 'orders'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>{lang === 'en' ? 'Waybills & Orders' : 'ደረሰኞች'}</span>
              {orderCount > 0 && (
                <span className="text-xs px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded-full font-bold">
                  {orderCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={openNewProductModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-xs transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === 'en' ? 'Post Wholesale Lot' : 'እቃ መዝግብ'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-100 gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => setCurrentTab('browse')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              currentTab === 'browse' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-600'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Catalog' : 'እቃዎች'}</span>
          </button>
          <button
            onClick={() => setCurrentTab('wholesaler')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              currentTab === 'wholesaler' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-600'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Wholesaler' : 'ጅምላ ነጋዴ'}</span>
          </button>
          <button
            onClick={() => setCurrentTab('logistics')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              currentTab === 'logistics' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-600'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Drivers' : 'አሽከርካሪዎች'}</span>
          </button>
          <button
            onClick={() => setCurrentTab('orders')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              currentTab === 'orders' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-600'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Waybills' : 'ደረሰኞች'} ({orderCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
