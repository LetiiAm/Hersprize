import React, { useState } from 'react';
import { Order } from '../types';
import { formatETB } from '../utils/formatters';
import { DriverLiveMap } from './DriverLiveMap';
import { 
  X, 
  Printer, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Building2, 
  Calendar, 
  FileText, 
  QrCode,
  Download,
  MapPin,
  Radio
} from 'lucide-react';

interface OrderReceiptModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'am';
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({
  order,
  isOpen,
  onClose,
  lang
}) => {
  if (!isOpen || !order) return null;

  // Allow toggling/simulating status directly in the modal for testing
  const [currentStatus, setCurrentStatus] = useState<Order['status']>(order.status || 'in_transit');
  const [showMap, setShowMap] = useState<boolean>(true);

  const handlePrint = () => {
    window.print();
  };

  const isInTransit = currentStatus === 'in_transit';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span className="font-extrabold text-sm tracking-wide">
              {lang === 'en' ? 'Official Commercial Delivery Note & Waybill' : 'ህጋዊ የጅምላ ንግድ የጭነት ማጓጓዣ ደረሰኝ'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Print / Export' : 'አትም'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Simulation Action Bar (No-Print) */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs no-print">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Order Delivery Status:</span>
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-300 gap-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrentStatus('driver_dispatched')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  currentStatus === 'driver_dispatched'
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dispatched
              </button>

              <button
                type="button"
                onClick={() => setCurrentStatus('in_transit')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  currentStatus === 'in_transit'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Radio className="w-3 h-3 text-emerald-300 animate-pulse" />
                <span>🟢 In Transit (በመንገድ ላይ)</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStatus('delivered')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  currentStatus === 'delivered'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Delivered
              </button>
            </div>
          </div>

          {isInTransit && (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Live Driver GPS Map Active</span>
            </div>
          )}
        </div>

        {/* Printable Invoice Container */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white text-slate-900 space-y-6 printable-content">
          
          {/* Header Seal */}
          <div className="border-b-2 border-slate-900 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-base">
                    J
                  </div>
                  <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">
                      JEMLA ETHIOPIA TRADING S.C.
                    </h1>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      የኢትዮጵያ የጅምላና ችርቻሮ የንግድ ትስስር መድረክ
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs font-mono font-black text-amber-800">
                  WAYBILL NO: {order.orderNumber}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Issued: {new Date(order.createdAt).toLocaleString('en-ET')}
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                  <ShieldCheck className="w-3 h-3" />
                  AUTHENTICATED COMMERCIAL TRANSACTION
                </div>
              </div>
            </div>
          </div>

          {/* DUMMY REAL-TIME GPS MAP SECTION (Appears when order is marked as 'in_transit') */}
          {isInTransit && showMap && (
            <div className="no-print space-y-2 animate-fadeIn">
              <DriverLiveMap order={order} lang={lang} />
            </div>
          )}

          {/* Wholesaler & Retailer Addresses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            {/* Wholesaler (Seller) */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-black text-amber-800 tracking-wider block">
                Wholesaler Dispatcher (ላኪ የጅምላ ነጋዴ)
              </span>
              <div className="font-extrabold text-slate-900 text-sm">
                {order.product.seller.businessName}
              </div>
              <div className="text-slate-600 font-mono">TIN: {order.product.seller.tinNumber}</div>
              <div className="text-slate-600">Location: {order.product.seller.hubLocation}</div>
              <div className="text-slate-600">Phone: {order.product.seller.phone}</div>
            </div>

            {/* Retailer (Buyer) */}
            <div className="space-y-1 sm:border-l sm:border-slate-200 sm:pl-6">
              <span className="text-[10px] uppercase font-black text-blue-800 tracking-wider block">
                Consignee / Retailer (ተቀባይ ችርቻሮ ነጋዴ)
              </span>
              <div className="font-extrabold text-slate-900 text-sm">
                {order.buyer.shopName}
              </div>
              <div className="text-slate-700">Contact: {order.buyer.retailerName}</div>
              <div className="text-slate-600">
                Address: {order.buyer.subcity}, {order.buyer.woreda}
              </div>
              <div className="text-slate-600">Landmark: {order.buyer.specificLandmark}</div>
              <div className="text-slate-600 font-mono">Phone: {order.buyer.phone}</div>
            </div>
          </div>

          {/* Line Item Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-3">Goods Description</th>
                  <th className="p-3">Brand & Batch</th>
                  <th className="p-3 text-center">Mfg / Exp Date</th>
                  <th className="p-3 text-right">Quantity</th>
                  <th className="p-3 text-right">Unit Price</th>
                  <th className="p-3 text-right">Total (ETB)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                <tr>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{order.product.name}</div>
                    <div className="text-[11px] text-slate-500">{order.product.nameAmharic}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-800">{order.product.brand}</div>
                    <div className="text-[11px] font-mono text-slate-500">Lot: {order.product.batchNumber}</div>
                  </td>
                  <td className="p-3 text-center font-mono text-[11px]">
                    <div>Mfg: {order.product.manufacturingDate}</div>
                    <div className="text-amber-800 font-bold">Exp: {order.product.expirationDate}</div>
                  </td>
                  <td className="p-3 text-right font-black text-slate-900">
                    {order.quantity} {order.product.unit.split(' ')[0]}
                  </td>
                  <td className="p-3 text-right font-mono">
                    {formatETB(order.unitPrice)}
                  </td>
                  <td className="p-3 text-right font-black text-slate-900">
                    {formatETB(order.subtotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Freight & Driver Dispatch Details */}
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-xs">
            <div className="flex items-center gap-2 font-black text-amber-950 mb-2">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Assigned Logistics Carrier & Freight Driver (የጭነት አሽከርካሪ መረጃ)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[10px] text-slate-500 block">Driver Name</span>
                <strong className="text-slate-900">{order.transport.driverName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Driver Phone</span>
                <strong className="text-emerald-700 font-mono">{order.transport.driverPhone}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Vehicle Plate Number</span>
                <strong className="text-slate-900 font-mono bg-white px-2 py-0.5 rounded border border-amber-200">
                  {order.transport.plateNumber}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Vehicle Model</span>
                <strong className="text-slate-800">{order.transport.vehicleType}</strong>
              </div>
            </div>

            {order.transport.deliveryNotes && (
              <div className="mt-2.5 pt-2 border-t border-amber-200/60 text-[11px] text-amber-900">
                <strong>Delivery Gate Instructions:</strong> {order.transport.deliveryNotes}
              </div>
            )}
          </div>

          {/* Payment & Financial Totals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Payment Verification Proof */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Payment Settlement</span>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 uppercase">
                  {order.payment.method.replace('_', ' ')}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  ✓ PAID & SETTLED
                </span>
              </div>
              <div className="text-[11px] text-slate-600 font-mono">
                Ref Code: <strong>{order.payment.transactionReference}</strong>
              </div>
              <div className="text-[11px] text-slate-500">
                Payer: {order.payment.accountOrPhone}
              </div>
            </div>

            {/* Calculations Box */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Commodities Subtotal:</span>
                <span className="font-bold text-white">{formatETB(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Transport & Driver Freight Fee:</span>
                <span className="font-bold text-white">{formatETB(order.transportCost)}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-extrabold">
                <span>Total Commercial Settlement:</span>
                <span className="text-amber-400 font-black">{formatETB(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Checkpoint Signatures Section (Standard Ethiopian Road Transport Requirement) */}
          <div className="pt-4 border-t-2 border-dashed border-slate-300">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">
              Official Highway Checkpoint & Delivery Transfer Signatures (የማረጋገጫ ፊርማዎች)
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              <div className="space-y-8">
                <div className="h-9 border-b border-slate-400"></div>
                <div>
                  <div className="font-bold text-slate-900">1. Wholesaler Dispatcher</div>
                  <div className="text-[10px] text-slate-500">የላኪ ፊርማና ማህተም</div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="h-9 border-b border-slate-400"></div>
                <div>
                  <div className="font-bold text-slate-900">2. Transport Driver</div>
                  <div className="text-[10px] text-slate-500">የአሽከርካሪው ፊርማ</div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="h-9 border-b border-slate-400"></div>
                <div>
                  <div className="font-bold text-slate-900">3. Receiving Retailer</div>
                  <div className="text-[10px] text-slate-500">የተረካቢ ሱቅ ፊርማ</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

