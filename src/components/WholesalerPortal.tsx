import React, { useState } from 'react';
import { Product, Order, UserSession } from '../types';
import { formatETB } from '../utils/formatters';
import { CATEGORIES, ETHIOPIAN_SUBCITIES } from '../data/mockData';
import { 
  Package, 
  PlusCircle, 
  Boxes, 
  Calendar, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Phone, 
  MapPin, 
  AlertCircle,
  Eye,
  Trash2,
  Edit3
} from 'lucide-react';

interface WholesalerPortalProps {
  products: Product[];
  orders: Order[];
  currentUser: UserSession;
  onAddProduct: (product: Product) => void;
  onViewOrderReceipt: (order: Order) => void;
  onOpenVerificationModal: () => void;
  lang: 'en' | 'am';
}

export const WholesalerPortal: React.FC<WholesalerPortalProps> = ({
  products,
  orders,
  currentUser,
  onAddProduct,
  onViewOrderReceipt,
  onOpenVerificationModal,
  lang
}) => {
  const isVerified = currentUser.verification.status === 'verified';
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');

  // New product form modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [nameAmharic, setNameAmharic] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [moq, setMoq] = useState(20);
  const [unit, setUnit] = useState('Carton (12 packs)');
  const [unitPrice, setUnitPrice] = useState(2500);
  const [manufacturingDate, setManufacturingDate] = useState('2026-08-01');
  const [expirationDate, setExpirationDate] = useState('2027-08-01');
  const [batchNumber, setBatchNumber] = useState('BN-ETH-2026-01');
  const [stockAvailable, setStockAvailable] = useState(500);
  const [suggestedVehicle, setSuggestedVehicle] = useState<'Suzuki Damas (Small)' | 'Isuzu NPR (3.5T)' | 'Isuzu FSR (7T)' | 'Sino Truck (20T)'>('Isuzu NPR (3.5T)');
  const [weightKgPerUnit, setWeightKgPerUnit] = useState(15);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80');

  const presetImages = [
    { label: 'Cooking Oil', url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80' },
    { label: 'Grains & Teff', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Pasta / Semolina', url: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80' },
    { label: 'Milk & Dairy', url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80' },
    { label: 'Beverages', url: 'https://images.unsplash.com/photo-1608270190977-80fb227fd644?auto=format&fit=crop&w=800&q=80' },
    { label: 'Soap & Detergent', url: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80' },
    { label: 'Cement / Building', url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleOpenAddModal = () => {
    if (!isVerified) {
      onOpenVerificationModal();
      return;
    }
    setIsAddModalOpen(true);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name,
      nameAmharic: nameAmharic || undefined,
      brand,
      category,
      moq: Number(moq),
      unit,
      unitPrice: Number(unitPrice),
      manufacturingDate,
      expirationDate,
      batchNumber,
      stockAvailable: Number(stockAvailable),
      images: [imageUrl],
      description: description || `${brand} wholesale supply. High standard Ethiopian market packaging.`,
      seller: {
        id: currentUser.id,
        businessName: currentUser.businessName,
        contactPerson: currentUser.name,
        phone: currentUser.phone,
        tinNumber: currentUser.verification.tinNumber || '0028941029',
        hubLocation: `${currentUser.verification.subcity || 'Merkato Military Tera'}, ${currentUser.verification.city || 'Addis Ababa'}`,
        city: currentUser.verification.city || 'Addis Ababa',
        subcity: currentUser.verification.subcity || 'Addis Ketema',
        rating: 4.9,
        verified: isVerified
      },
      suggestedVehicle,
      weightKgPerUnit: Number(weightKgPerUnit)
    };

    onAddProduct(newProd);
    setIsAddModalOpen(false);

    // Reset form
    setName('');
    setNameAmharic('');
    setBrand('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                {lang === 'en' ? 'Wholesaler Command Center' : 'የጅምላ ነጋዴ ማዕከል'}
              </span>
              {isVerified && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  MOTI Verified
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentUser.businessName}
            </h1>
            <p className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-3">
              <span>Contact: <strong>{currentUser.name}</strong></span>
              <span>•</span>
              <span>TIN: <strong className="font-mono">{currentUser.verification.tinNumber || '0028941029'}</strong></span>
              <span>•</span>
              <span>Hub: <strong>{currentUser.verification.subcity || 'Merkato, Addis Ababa'}</strong></span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>{lang === 'en' ? 'Post Wholesale Lot' : 'አዲስ እቃ መዝግብ'}</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block text-[11px]">Active Wholesale Lots</span>
            <span className="text-xl font-black text-white mt-0.5 block">{products.length}</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block text-[11px]">Incoming Orders</span>
            <span className="text-xl font-black text-amber-400 mt-0.5 block">{orders.length}</span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block text-[11px]">Settled via telebirr/CBE</span>
            <span className="text-xl font-black text-emerald-400 mt-0.5 block">
              {formatETB(orders.reduce((acc, curr) => acc + curr.totalAmount, 0))}
            </span>
          </div>
          <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <span className="text-slate-400 block text-[11px]">Compliance Seal</span>
            <span className="text-sm font-extrabold text-white mt-1 block">
              {isVerified ? '✓ Fully Verified' : 'Action Required'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'inventory' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'en' ? 'Wholesale Inventory Lots' : 'የእቃዎች ክምችት'} ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'orders' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {lang === 'en' ? 'Dispatched Orders & Waybills' : 'የተላኩ ትዕዛዞች'} ({orders.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Product & Brand</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">MOQ & Unit</th>
                  <th className="p-3.5">Unit Price (ETB)</th>
                  <th className="p-3.5">Mfg / Exp Dates</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Freight Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-11 h-11 rounded-lg object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{prod.name}</div>
                          <div className="text-[11px] text-amber-700 font-semibold">{prod.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-600">{prod.category}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900">{prod.moq}</span>
                      <span className="text-[11px] text-slate-500"> {prod.unit}</span>
                    </td>
                    <td className="p-3.5 font-bold font-mono text-slate-900">
                      {formatETB(prod.unitPrice)}
                    </td>
                    <td className="p-3.5 font-mono text-[11px]">
                      <div>Mfg: {prod.manufacturingDate}</div>
                      <div className="text-amber-800 font-bold">Exp: {prod.expirationDate}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-emerald-700">{prod.stockAvailable}</span> in stock
                    </td>
                    <td className="p-3.5 text-[11px] font-medium text-slate-600">
                      {prod.suggestedVehicle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders List */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{ord.orderNumber}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {ord.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Buyer: <strong>{ord.buyer.shopName}</strong> ({ord.buyer.retailerName} - {ord.buyer.phone})
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Product: {ord.product.name} ({ord.quantity} units) • Total: <strong>{formatETB(ord.totalAmount)}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="text-right hidden sm:block text-xs">
                  <div className="font-bold text-slate-800">Carrier: {ord.transport.driverName}</div>
                  <div className="text-[11px] font-mono text-slate-500">{ord.transport.plateNumber}</div>
                </div>
                <button
                  onClick={() => onViewOrderReceipt(ord)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Waybill</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* POST NEW WHOLESALE LOT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-500" />
                <span>{lang === 'en' ? 'Post New Wholesale Inventory Lot' : 'አዲስ የጅምላ እቃ መዝግብ'}</span>
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Goods Name (የእቃው ስም) *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tena Sunflower Oil 5L"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Amharic Name (አማርኛ ስም)</label>
                  <input
                    type="text"
                    value={nameAmharic}
                    onChange={(e) => setNameAmharic(e.target.value)}
                    placeholder="e.g. ጤና የሱፍ የምግብ ዘይት"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand Name (የምርት ስም) *</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Tena, Habesha, Santa, Dangote"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category (ምድብ) *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    {CATEGORIES.filter(c => c !== 'All Goods').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Minimum Order Quantity (MOQ) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={moq}
                    onChange={(e) => setMoq(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Packaging Unit *</label>
                  <input
                    type="text"
                    required
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="Carton (4x5L), Quintal (100kg), Crates"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit Price in ETB (ዋጋ በብር) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Stock Available *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={stockAvailable}
                    onChange={(e) => setStockAvailable(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Manufacturing Date (የተመረተበት) *</label>
                  <input
                    type="date"
                    required
                    value={manufacturingDate}
                    onChange={(e) => setManufacturingDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiration Date (የሚያበቃበት) *</label>
                  <input
                    type="date"
                    required
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch / Lot Number *</label>
                  <input
                    type="text"
                    required
                    value={batchNumber}
                    onChange={(e) => setBatchNumber(e.target.value)}
                    placeholder="BN-2026-09"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Recommended Freight Vehicle *</label>
                  <select
                    value={suggestedVehicle}
                    onChange={(e) => setSuggestedVehicle(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="Suzuki Damas (Small)">Suzuki Damas (Small)</option>
                    <option value="Isuzu NPR (3.5T)">Isuzu NPR (3.5T)</option>
                    <option value="Isuzu FSR (7T)">Isuzu FSR (7T)</option>
                    <option value="Sino Truck (20T)">Sino Truck (20T)</option>
                  </select>
                </div>
              </div>

              {/* Preset Image Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Choose Product Visual Asset</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {presetImages.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setImageUrl(p.url)}
                      className={`p-1 rounded-xl border-2 text-center transition cursor-pointer ${
                        imageUrl === p.url ? 'border-amber-600 bg-amber-50' : 'border-slate-200'
                      }`}
                    >
                      <img src={p.url} alt={p.label} className="w-full h-12 object-cover rounded-lg" />
                      <span className="text-[10px] font-bold block truncate mt-1">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black shadow-xs cursor-pointer"
                >
                  Publish Lot (እቃ መዝግብ)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
