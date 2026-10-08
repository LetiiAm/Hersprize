export interface WholesalerContact {
  id: string;
  businessName: string;
  contactPerson: string;
  phone: string;
  telegram?: string;
  tinNumber: string;
  hubLocation: string; // e.g. "Merkato Military Tera, Addis Ababa"
  city: string;
  subcity: string;
  rating: number;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  nameAmharic?: string;
  brand: string;
  category: string;
  moq: number; // Minimum Order Quantity
  unit: string; // e.g. "Cartons (4x5L)", "Quintals (100kg)", "Crates (24 btls)"
  unitPrice: number; // in ETB
  manufacturingDate: string; // YYYY-MM-DD
  expirationDate: string; // YYYY-MM-DD
  batchNumber: string;
  stockAvailable: number;
  images: string[];
  description: string;
  seller: WholesalerContact;
  suggestedVehicle: 'Suzuki Damas (Small)' | 'Isuzu NPR (3.5T)' | 'Isuzu FSR (7T)' | 'Sino Truck (20T)';
  weightKgPerUnit: number;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleType: 'Suzuki Damas (Small)' | 'Isuzu NPR (3.5T)' | 'Isuzu FSR (7T)' | 'Sino Truck (20T)';
  plateNumber: string; // e.g. "3-B14923 AA"
  baseCost: number; // in ETB
  perKmCost: number; // in ETB per km
  capacityKg: number;
  operatingCities: string[];
  rating: number;
  tripsCompleted: number;
  available: boolean;
  avatar: string;
}

export interface BuyerInfo {
  retailerName: string;
  shopName: string;
  phone: string;
  city: string;
  subcity: string;
  woreda: string;
  specificLandmark: string;
}

export interface TransportBooking {
  driverId: string;
  driverName: string;
  driverPhone: string;
  vehicleType: string;
  plateNumber: string;
  estimatedDistanceKm: number;
  transportCost: number;
  deliveryNotes?: string;
}

export type PaymentMethod = 'telebirr' | 'cbe_birr' | 'bank_transfer' | 'card' | 'cash_on_delivery';

export interface PaymentDetails {
  method: PaymentMethod;
  status: 'pending' | 'verified' | 'completed';
  transactionReference: string;
  accountOrPhone: string;
  bankName?: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  transportCost: number;
  totalAmount: number;
  buyer: BuyerInfo;
  transport: TransportBooking;
  payment: PaymentDetails;
  status: 'pending_confirmation' | 'confirmed' | 'driver_dispatched' | 'in_transit' | 'delivered';
  createdAt: string;
  estimatedDeliveryDate: string;
}

export type VerificationStatus = 'unverified' | 'pending_review' | 'verified' | 'rejected';

export type UserRole = 'retailer' | 'wholesaler' | 'driver' | 'admin';

export interface BusinessVerification {
  id: string;
  role: 'retailer' | 'wholesaler';
  status: VerificationStatus;
  tradeName: string;
  legalOwnerName: string;
  tinNumber: string; // 10-digit Ethiopian Tax Identification Number
  tradeLicenseNumber: string; // MOTI Trade License No.
  licenseSector: string; // e.g. "Wholesale Food Distribution", "Retail Grocery"
  businessType: 'Sole Proprietorship' | 'PLC (ኃ/የተ/የግ/ማ)' | 'Share Company (አክሲዮን ማህበር)' | 'General Partnership';
  city: string;
  subcity: string;
  woreda: string;
  phone: string;
  phoneVerified: boolean;
  faydaNationalId?: string; // Ethiopian Digital ID (Fayda)
  licenseDocUrl?: string;
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
  bankAccountVerified: boolean;
}

export interface UserSession {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  businessName: string;
  verification: BusinessVerification;
}

