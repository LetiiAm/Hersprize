import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Radio, 
  Compass, 
  Maximize2, 
  Minimize2, 
  Play, 
  Pause, 
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface DriverLiveMapProps {
  order: Order;
  lang: 'en' | 'am';
}

export const DriverLiveMap: React.FC<DriverLiveMapProps> = ({ order, lang }) => {
  // Simulated progress along route (0 to 100%)
  const [progress, setProgress] = useState<number>(45); // default midpoint
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Auto-progress simulation
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          return 98; // keep close to destination
        }
        return prev + 1.5;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Route checkpoints and coordinates on a 800x400 SVG grid
  // Origin (Wholesaler): ~ (120, 100)
  // Waypoint 1 (Mexico / Tegbare-ed): (280, 160)
  // Waypoint 2 (Gotera Interchange): (450, 240)
  // Waypoint 3 (Bole Road / Olympia): (620, 260)
  // Destination (Retailer): ~ (710, 310)

  // Compute driver position along the curve based on progress
  const getCoordinates = (p: number) => {
    // Piecewise linear interpolation across 4 segments
    const pts = [
      { x: 120, y: 110, name: order.product.seller.hubLocation || 'Merkato Military Tera' },
      { x: 270, y: 155, name: 'Mexico Sq. & Tegbare-ed' },
      { x: 440, y: 220, name: 'Gotera Interchange / Debre Zeyit Rd' },
      { x: 590, y: 260, name: 'Olympia & Bole Ring Road' },
      { x: 710, y: 310, name: `${order.buyer.subcity} (${order.buyer.shopName})` }
    ];

    const scaled = (p / 100) * (pts.length - 1);
    const index = Math.min(Math.floor(scaled), pts.length - 2);
    const frac = scaled - index;

    const currentX = pts[index].x + (pts[index + 1].x - pts[index].x) * frac;
    const currentY = pts[index].y + (pts[index + 1].y - pts[index].y) * frac;

    return {
      x: currentX,
      y: currentY,
      currentSegmentName: pts[index].name,
      nextSegmentName: pts[index + 1].name
    };
  };

  const driverPos = getCoordinates(progress);

  // Calculate dynamic metrics based on progress
  const totalDistance = order.transport.estimatedDistanceKm || 14;
  const remainingDistance = Math.max(0.4, Number((totalDistance * (1 - progress / 100)).toFixed(1)));
  const estimatedMins = Math.max(2, Math.round(remainingDistance * 2.5));
  const currentSpeed = progress > 90 ? 22 : progress > 50 ? 38 : 44;

  return (
    <div className={`rounded-3xl border-2 border-slate-800 bg-slate-950 text-white overflow-hidden shadow-2xl transition-all duration-300 ${
      isExpanded ? 'p-6 ring-4 ring-amber-500/30' : 'p-4 sm:p-5'
    }`}>
      
      {/* Top Map Header & Live Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping absolute opacity-75"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 relative"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'Live Freight GPS Tracking' : 'የጭነት አሽከርካሪ የቀጥታ ካርታ መገኛ'}</span>
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] uppercase tracking-wider">
                IN TRANSIT (በመንገድ ላይ)
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Vehicle: <strong className="text-amber-400 font-mono">{order.transport.plateNumber}</strong> ({order.transport.vehicleType})
            </p>
          </div>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-bold transition cursor-pointer ${
              isSimulating 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isSimulating ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Pause GPS</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Resume GPS</span>
              </>
            )}
          </button>

          <button
            onClick={() => setProgress(15)}
            title="Reset simulation to origin"
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Map Canvas Placeholder (SVG Cartographic Simulation of Addis Ababa Logistics Corridors) */}
      <div className="relative mt-3 w-full aspect-21/9 min-h-[220px] sm:min-h-[270px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 select-none">
        
        {/* Cartographic Grid & Road Arterials */}
        <svg
          viewBox="0 0 800 380"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>

            {/* Glowing route gradient */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Radar Pulse Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Map Grid */}
          <rect width="100%" height="100%" fill="#090d16" />
          <rect width="100%" height="100%" fill="url(#mapGrid)" />

          {/* Secondary Roads & Street Blocks (Placeholder geometry) */}
          <g stroke="#1e293b" strokeWidth="3" fill="none" opacity="0.6">
            <path d="M 20 80 Q 200 60, 400 80 T 780 120" />
            <path d="M 50 200 C 180 230, 350 170, 520 220 S 750 240, 780 260" />
            <path d="M 250 20 L 290 360" />
            <path d="M 500 20 L 530 360" />
            <path d="M 680 40 L 640 370" />
          </g>

          {/* District & Zone Labels */}
          <g fill="#475569" fontSize="10" fontWeight="bold" fontFamily="monospace">
            <text x="70" y="50">ADDIS KETEMA / MERKATO</text>
            <text x="240" y="70">KIRKOS / MEXICO</text>
            <text x="410" y="120">GOTERA / DEBRE ZEYIT RD</text>
            <text x="590" y="140">BOLE SUB-CITY</text>
            <text x="440" y="340">KALITY CARGO TERMINAL</text>
          </g>

          {/* Green Parks & Public Squares */}
          <rect x="220" y="190" width="60" height="40" rx="12" fill="#064e3b" opacity="0.4" />
          <text x="232" y="214" fill="#34d399" fontSize="9" fontWeight="bold">Park / Square</text>

          <rect x="540" y="80" width="80" height="50" rx="16" fill="#064e3b" opacity="0.3" />
          <text x="552" y="108" fill="#34d399" fontSize="9" fontWeight="bold">Meskel Area</text>

          {/* Main Transit Corridor Highway (Ring Road / Debre Zeyit Rd / Bole Rd) */}
          <path
            d="M 120 110 C 200 130, 270 155, 340 180 S 440 220, 520 240 T 590 260 Q 660 280, 710 310"
            fill="none"
            stroke="#334155"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Glowing Active Route Line */}
          <path
            d="M 120 110 C 200 130, 270 155, 340 180 S 440 220, 520 240 T 590 260 Q 660 280, 710 310"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="5"
            strokeDasharray="6 4"
            className="animate-pulse"
            strokeLinecap="round"
          />

          {/* ORIGIN PIN (Wholesaler Warehouse) */}
          <g transform="translate(120, 110)">
            <circle r="14" fill="#d97706" opacity="0.3" className="animate-ping" />
            <circle r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <rect x="-60" y="-32" width="120" height="18" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            <text x="0" y="-20" fill="#fef3c7" fontSize="8" fontWeight="bold" textAnchor="middle">
              ORIGIN: {order.product.seller.hubLocation?.split(',')[0] || 'Merkato'}
            </text>
          </g>

          {/* INTERMEDIATE CHECKPOINTS */}
          <g transform="translate(270, 155)">
            <circle r="4" fill="#94a3b8" />
          </g>
          <g transform="translate(440, 220)">
            <circle r="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            <text x="0" y="16" fill="#7dd3fc" fontSize="8" textAnchor="middle" fontWeight="bold">Gotera Flyover</text>
          </g>
          <g transform="translate(590, 260)">
            <circle r="4" fill="#94a3b8" />
          </g>

          {/* DESTINATION PIN (Retailer Shop) */}
          <g transform="translate(710, 310)">
            <circle r="16" fill="#059669" opacity="0.3" className="animate-ping" />
            <circle r="10" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            <rect x="-65" y="-32" width="130" height="18" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
            <text x="0" y="-20" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">
              DESTINATION: {order.buyer.shopName}
            </text>
          </g>

          {/* DYNAMIC MOVING TRUCK PIN (Approximate Live GPS Position) */}
          <g transform={`translate(${driverPos.x}, ${driverPos.y})`}>
            {/* GPS Radar Pulse Ring */}
            <circle r="28" fill="#10b981" opacity="0.15" className="animate-ping" />
            <circle r="18" fill="#047857" opacity="0.35" />
            
            {/* Vehicle Background Circle */}
            <circle r="14" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" filter="url(#glow)" />
            
            {/* Truck Icon SVG inline */}
            <path
              d="M -7 -4 L -1 -4 L 2 -1 L 6 -1 L 6 3 L -7 3 Z"
              fill="#ffffff"
            />
            <circle cx="-4" cy="4" r="1.5" fill="#f59e0b" />
            <circle cx="4" cy="4" r="1.5" fill="#f59e0b" />

            {/* Vehicle Label Callout */}
            <g transform="translate(0, -26)">
              <rect x="-55" y="-12" width="110" height="18" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
              <text x="0" y="1" fill="#38bdf8" fontSize="8.5" fontWeight="black" textAnchor="middle" fontFamily="monospace">
                🚚 {order.transport.plateNumber}
              </text>
            </g>
          </g>
        </svg>

        {/* Live Floating Telemetry Overlay (Top Left) */}
        <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-700/80 text-xs shadow-lg max-w-[210px] sm:max-w-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] mb-1">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            <span>Active Checkpoint Telemetry</span>
          </div>
          <div className="text-[11px] text-slate-200 font-semibold truncate">
            {driverPos.currentSegmentName}
          </div>
          <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
            <span>Speed: <strong className="text-white">{currentSpeed} km/h</strong></span>
            <span>•</span>
            <span>Est. Remaining: <strong className="text-amber-400">{remainingDistance} km</strong></span>
          </div>
        </div>

        {/* Floating ETA Badge (Top Right) */}
        <div className="absolute top-3 right-3 bg-amber-500/90 text-slate-950 px-3 py-1.5 rounded-xl font-black text-xs shadow-lg flex items-center gap-1.5 border border-amber-300">
          <Clock className="w-3.5 h-3.5" />
          <span>ETA: ~{estimatedMins} mins</span>
        </div>

        {/* Bottom Interactive Route Progress Scrub Bar */}
        <div className="absolute bottom-2 inset-x-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-[11px]">
          <span className="text-slate-400 font-medium shrink-0">Scrub Route:</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => {
              setProgress(Number(e.target.value));
              setIsSimulating(false);
            }}
            className="flex-1 accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-amber-400 font-mono font-bold shrink-0">{Math.round(progress)}% Completed</span>
        </div>
      </div>

      {/* Driver Info & Action Strip */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-white text-sm">
              {order.transport.driverName}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>Plate: <strong className="text-slate-200 font-mono">{order.transport.plateNumber}</strong></span>
              <span>•</span>
              <span className="text-emerald-400">Verified Driver</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${order.transport.driverPhone}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Driver ({order.transport.driverPhone})</span>
          </a>
        </div>
      </div>

    </div>
  );
};
