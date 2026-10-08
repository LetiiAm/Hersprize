import React, { useState } from 'react';
import { Order } from '../types';
import { formatETB } from '../utils/formatters';
import { 
  FileText, 
  Eye, 
  Truck, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Printer, 
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  onViewOrderReceipt: (order: Order) => void;
  lang: 'en' | 'am';
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onViewOrderReceipt,
  lang
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = filterStatus === 'All' || ord.status === filterStatus;
    const matchesSearch = 
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.buyer.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.transport.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {lang === 'en' ? 'Wholesale Waybills & Dispatched Orders' : 'የጭነት ደረሰኞችና የተላኩ ትዕዛዞች'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Official commercial delivery notes authenticated for Ethiopian road checkpoints
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search waybill #, shop, product..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No Orders Found</h3>
            <p className="text-xs text-slate-400 mt-1">Orders placed by retailers will appear here with live waybills.</p>
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="flex items-start gap-4">
                <img
                  src={ord.product.images[0]}
                  alt={ord.product.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-black text-slate-900 text-sm">
                      {ord.orderNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {ord.status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-[11px] text-slate-500">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-800 text-sm leading-snug">
                    {ord.product.name}
                  </h4>

                  <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                    <span>
                      Qty: <strong>{ord.quantity} {ord.product.unit.split(' ')[0]}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Buyer: <strong>{ord.buyer.shopName}</strong> ({ord.buyer.subcity})
                    </span>
                    <span>•</span>
                    <span className="text-amber-800 font-bold">
                      Settlement: {formatETB(ord.totalAmount)}
                    </span>
                  </div>

                  {/* Freight info pill */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Driver: <strong>{ord.transport.driverName}</strong> ({ord.transport.plateNumber})</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold font-mono">Paid via {ord.payment.method}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onViewOrderReceipt(ord)}
                  className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'en' ? 'Open Delivery Waybill' : 'የጭነት ደረሰኝ እይ'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
