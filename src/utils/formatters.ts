export function formatETB(amount: number): string {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    maximumFractionDigits: 0,
  }).format(amount).replace('ETB', 'ETB ');
}

export function formatETBSimple(amount: number): string {
  return amount.toLocaleString() + ' ብር';
}

export function getShelfLifeStatus(expDateStr: string): {
  status: 'critical' | 'warning' | 'good' | 'expired';
  label: string;
  daysRemaining: number;
  badgeColor: string;
} {
  const now = new Date();
  const exp = new Date(expDateStr);
  const diffTime = exp.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return {
      status: 'expired',
      label: 'Expired (ጊዜው ያለፈበት)',
      daysRemaining: diffDays,
      badgeColor: 'bg-rose-100 text-rose-700 border-rose-200'
    };
  } else if (diffDays <= 60) {
    return {
      status: 'critical',
      label: `Expiring Soon (${diffDays} days)`,
      daysRemaining: diffDays,
      badgeColor: 'bg-red-100 text-red-700 border-red-200'
    };
  } else if (diffDays <= 180) {
    const months = Math.round(diffDays / 30);
    return {
      status: 'warning',
      label: `Valid for ~${months} mos`,
      daysRemaining: diffDays,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
    };
  } else {
    const months = Math.round(diffDays / 30);
    return {
      status: 'good',
      label: `Fresh (${months} mos shelf life)`,
      daysRemaining: diffDays,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
  }
}

export function estimateDistanceKm(originSubcity: string, destSubcity: string): number {
  if (originSubcity.toLowerCase() === destSubcity.toLowerCase()) {
    return 6;
  }
  if (destSubcity.includes('Adama')) return 98;
  if (destSubcity.includes('Hawassa')) return 275;
  if (destSubcity.includes('Bishoftu')) return 48;
  if (destSubcity.includes('Dire Dawa')) return 460;
  if (destSubcity.includes('Bahir Dar')) return 565;

  // Intra Addis Ababa estimates
  const intraDistances: Record<string, number> = {
    'Bole': 14,
    'Kirkos': 9,
    'Arada (Piassa)': 5,
    'Yeka': 16,
    'Kolfe Keranio': 8,
    'Nifas Silk Lafto (Gotera/Gofa)': 12,
    'Akaki Kality': 22,
    'Lideta': 6,
    'Gullele': 11,
    'Lemi Kura (CMC/Ayat)': 21,
    'Addis Ketema (Merkato area)': 4
  };

  return intraDistances[destSubcity] || 15;
}

export function calculateFreightCost(
  baseCost: number,
  perKmCost: number,
  distanceKm: number,
  totalWeightKg: number,
  vehicleCapacityKg: number
): {
  baseCost: number;
  distanceFee: number;
  heavyCargoSurcharge: number;
  totalFreight: number;
} {
  const distanceFee = Math.round(perKmCost * distanceKm);
  // If order weight is over 75% of vehicle capacity, small surcharge
  const heavyCargoSurcharge = totalWeightKg > vehicleCapacityKg * 0.75 ? Math.round(baseCost * 0.15) : 0;
  const totalFreight = baseCost + distanceFee + heavyCargoSurcharge;

  return {
    baseCost,
    distanceFee,
    heavyCargoSurcharge,
    totalFreight
  };
}

export function generateOrderNumber(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `JEMLA-ET-${new Date().getFullYear()}-${randomSuffix}`;
}

export function generateTelebirrRef(): string {
  return `TB-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
}

export function generateCbeRef(): string {
  return `FT26${Math.floor(10000000 + Math.random() * 90000000)}`;
}
