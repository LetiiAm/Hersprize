import React, { useState } from 'react';
import { Driver } from '../types';
import { formatETB, estimateDistanceKm, calculateFreightCost } from '../utils/formatters';
import { ETHIOPIAN_SUBCITIES } from '../data/mockData';
import { 
  Truck, 
  Phone, 
  MapPin, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Calculator, 
  PlusCircle, 
  Navigation,
  ArrowRight
} from 'lucide-react';

interface LogisticsViewProps {
  drivers: Driver[];
  onRegisterDriver: (driver: Driver) => void;
  lang: 'en' | 'am';
}

export const LogisticsView: React.FC<LogisticsViewProps> = ({
  drivers,
  onRegisterDriver,
  lang
}) => {
  const [selectedVehicleFilter, setSelectedVehicleFilter] = useState<string>('All');
  
  // Interactive Route Calculator State
  const [calcOrigin, setCalcOrigin] = useState('Addis Ketema (Merkato area)');
  const [calcDest, setCalcDest] = useState('Bole');
  const [calcWeightKg, setCalcWeightKg] = useState(1200);
  const [calcDriverId, setCalcDriverId] = useState(drivers[0]?.id || '');

  // Driver Registration Modal State
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('+251 9');
  const [plateNumber, setPlateNumber] = useState('3-B');
  const [vehicleType, setVehicleType] = useState<any>('Isuzu NPR (3.5T)');
  const [baseCost, setBaseCost] = useState(1500);
  const [perKmCost, setPerKmCost] = useState(70);

  const filteredDrivers = selectedVehicleFilter === 'All'
    ? drivers
    : drivers.filter(d => d.vehicleType.includes(selectedVehicleFilter));

  const distance = estimateDistanceKm(calcOrigin, calcDest);
  const selectedDriver = drivers.find(d => d.id === calcDriverId) || drivers[0];
  const freightCalc = selectedDriver
    ? calculateFreightCost(selectedDriver.baseCost, selectedDriver.perKmCost, distance, calcWeightKg, selectedDriver.capacityKg)
    : { baseCost: 1500, distanceFee: 500, heavyCargoSurcharge: 0, totalFreight: 2000 };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDriver: Driver = {
      id: `drv-${Date.now()}`,
      name: driverName,
      phone: driverPhone,
      plateNumber,
      vehicleType,
      baseCost: Number(baseCost),
      perKmCost: Number(perKmCost),
      capacityKg: vehicleType.includes('Damas') ? 800 : vehicleType.includes('NPR') ? 3500 : vehicleType.includes('FSR') ? 7000 : 20000,
      operatingCities: ['Addis Ababa', 'Adama Corridor'],
      rating: 5.0,
      tripsCompleted: 1,
      available: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    };

    onRegisterDriver(newDriver);
    setIsRegisterOpen(false);
    setDriverName('');
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
                {lang === 'en' ? 'Ethiopian Freight & Logistics Fleet' : 'የጭነት ትራንስፖርትና አሽከርካሪዎች'}
              </span>
              <span className="text-xs text-blue-300">● Live GPS & Checkpoint Clearing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'en' ? 'Vetted Commercial Freight Drivers' : 'የተረጋገጡ የጭነት አሽከርካሪዎች መረብ'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              From Suzuki Damas intra-city delivery to Isuzu NPR, FSR, and Sino Truck heavy hauls across Addis Ababa, Adama, Hawassa, and Dire Dawa.
            </p>
          </div>

          <button
            onClick={() => setIsRegisterOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{lang === 'en' ? 'Register Freight Vehicle' : 'አሽከርካሪ መዝግብ'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Freight Cost Estimator */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-600" />
            <span>{lang === 'en' ? 'Live Freight Cost Calculator' : 'የትራንስፖርት ዋጋ ማስያ'}</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Addis Ababa & Regional Routes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Pickup Market (መነሻ)</label>
            <select
              value={calcOrigin}
              onChange={(e) => setCalcOrigin(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
            >
              {ETHIOPIAN_SUBCITIES.map(sc => (
                <option key={sc} value={sc}>{sc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Delivery Destination (መድረሻ)</label>
            <select
              value={calcDest}
              onChange={(e) => setCalcDest(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
            >
              {ETHIOPIAN_SUBCITIES.map(sc => (
                <option key={sc} value={sc}>{sc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Assigned Driver & Rate</label>
            <select
              value={calcDriverId}
              onChange={(e) => setCalcDriverId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
            >
              {drivers.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.vehicleType})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Estimated Cargo Weight (kg)</label>
            <input
              type="number"
              value={calcWeightKg}
              onChange={(e) => setCalcWeightKg(Number(e.target.value) || 100)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
            />
          </div>
        </div>

        {/* Calculation Result */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-amber-700" />
            <div>
              <span className="font-extrabold text-slate-900 block">
                Estimated Route Distance: ~{distance} km
              </span>
              <span className="text-slate-600 text-[11px]">
                Base Fee ({formatETB(freightCalc.baseCost)}) + Distance ({formatETB(freightCalc.distanceFee)})
                {freightCalc.heavyCargoSurcharge > 0 && ` + Heavy Surcharge (${formatETB(freightCalc.heavyCargoSurcharge)})`}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Calculated Total Freight</span>
            <span className="text-xl font-black text-amber-800">
              {formatETB(freightCalc.totalFreight)}
            </span>
          </div>
        </div>
      </div>

      {/* Vehicle Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Damas', 'NPR', 'FSR', 'Sino'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedVehicleFilter(filter)}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              selectedVehicleFilter === filter
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {filter === 'All' ? 'All Freight Fleets' : filter}
          </button>
        ))}
      </div>

      {/* Drivers List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-slate-900 text-sm truncate">{driver.name}</h4>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                      ★ {driver.rating}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold text-[10px]">
                      {driver.vehicleType}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono font-bold text-slate-700 text-[10px]">
                      {driver.plateNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                    <span>{driver.tripsCompleted} completed commercial trips</span>
                  </div>
                </div>
              </div>

              {/* Pricing & Payload Specs */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 text-xs mb-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Base Transport Fee:</span>
                  <strong className="text-slate-900">{formatETB(driver.baseCost)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Per-Kilometer Rate:</span>
                  <strong className="text-slate-900">{driver.perKmCost} ETB / km</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Max Payload Capacity:</span>
                  <strong className="text-slate-900">{(driver.capacityKg / 1000).toFixed(1)} Metric Tons</strong>
                </div>
              </div>

              {/* Operating Corridors */}
              <div className="text-[11px] text-slate-500 mb-3 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{driver.operatingCities.join(' • ')}</span>
              </div>
            </div>

            {/* Direct Contact Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Available for Dispatch
              </span>

              <a
                href={`tel:${driver.phone}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Driver</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* REGISTER DRIVER MODAL */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-500" />
                <span>{lang === 'en' ? 'Register Commercial Freight Truck' : 'አዲስ አሽከርካሪ መዝግብ'}</span>
              </h2>
              <button
                onClick={() => setIsRegisterOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Driver Full Name *</label>
                <input
                  type="text"
                  required
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="e.g. Dawit Haile"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ethiopian Phone Number *</label>
                <input
                  type="text"
                  required
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="+251 9... / +251 7..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ethiopian Vehicle Plate Number *</label>
                <input
                  type="text"
                  required
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  placeholder="e.g. 3-B14923 AA"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-mono uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Vehicle Classification *</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="Suzuki Damas (Small)">Suzuki Damas (Small - up to 800kg)</option>
                  <option value="Isuzu NPR (3.5T)">Isuzu NPR (3.5 Ton Freight)</option>
                  <option value="Isuzu FSR (7T)">Isuzu FSR (7 Ton Heavy Cargo)</option>
                  <option value="Sino Truck (20T)">Sino Truck (20 Ton Trailer)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Base Cost in ETB *</label>
                  <input
                    type="number"
                    required
                    value={baseCost}
                    onChange={(e) => setBaseCost(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Per-Km Cost (ETB) *</label>
                  <input
                    type="number"
                    required
                    value={perKmCost}
                    onChange={(e) => setPerKmCost(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  Save & Register Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
