import { BusinessVerification, UserSession } from '../types';

export const INITIAL_VERIFICATIONS: BusinessVerification[] = [
  {
    id: 'ver-01',
    role: 'wholesaler',
    status: 'verified',
    tradeName: 'Ethio-Agro Wholesale Trading PLC',
    legalOwnerName: 'Solomon Kebede Mengistu',
    tinNumber: '0028941029',
    tradeLicenseNumber: 'MOTI/AA/WHL/2021/84920',
    licenseSector: 'Wholesale Edible Oil, Cereals & Packaged Groceries',
    businessType: 'PLC (ኃ/የተ/የግ/ማ)',
    city: 'Addis Ababa',
    subcity: 'Addis Ketema (Merkato area)',
    woreda: 'Woreda 04',
    phone: '+251 911 234 567',
    phoneVerified: true,
    faydaNationalId: 'ET-FAYDA-9401-2940-1928',
    licenseDocUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    submittedAt: '2026-01-15T10:00:00Z',
    verifiedAt: '2026-01-16T14:30:00Z',
    verifiedBy: 'MOTI & Platform Compliance Officer #04',
    bankAccountVerified: true
  },
  {
    id: 'ver-02',
    role: 'retailer',
    status: 'verified',
    tradeName: 'Bole Medhanealem Mini-Market',
    legalOwnerName: 'Yohannes Wolde Desta',
    tinNumber: '0091823471',
    tradeLicenseNumber: 'MOTI/AA/RTL/2023/11094',
    licenseSector: 'Retail Supermarket, Fast-Moving Consumer Goods (FMCG)',
    businessType: 'Sole Proprietorship',
    city: 'Addis Ababa',
    subcity: 'Bole',
    woreda: 'Woreda 03',
    phone: '+251 911 445 566',
    phoneVerified: true,
    faydaNationalId: 'ET-FAYDA-4491-8820-3301',
    licenseDocUrl: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=400&q=80',
    submittedAt: '2026-02-10T08:00:00Z',
    verifiedAt: '2026-02-10T11:20:00Z',
    verifiedBy: 'Platform Compliance Officer #02',
    bankAccountVerified: true
  },
  {
    id: 'ver-03',
    role: 'wholesaler',
    status: 'pending_review',
    tradeName: 'Abyssinia Grain & Spice Export-Import',
    legalOwnerName: 'Kassahun Belayneh',
    tinNumber: '0044910283',
    tradeLicenseNumber: 'MOTI/AA/WHL/2025/99412',
    licenseSector: 'Wholesale Spices, Pulses & Coffee',
    businessType: 'Sole Proprietorship',
    city: 'Addis Ababa',
    subcity: 'Addis Ketema (Merkato area)',
    woreda: 'Woreda 06',
    phone: '+251 912 901 823',
    phoneVerified: true,
    faydaNationalId: 'ET-FAYDA-1192-3394-8841',
    licenseDocUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
    submittedAt: '2026-10-06T15:20:00Z',
    bankAccountVerified: false
  }
];

export const PRESET_USERS: UserSession[] = [
  {
    id: 'usr-retailer-verified',
    name: 'Yohannes Wolde',
    role: 'retailer',
    phone: '+251 911 445 566',
    businessName: 'Bole Medhanealem Mini-Market',
    verification: INITIAL_VERIFICATIONS[1]
  },
  {
    id: 'usr-wholesaler-verified',
    name: 'Solomon Kebede',
    role: 'wholesaler',
    phone: '+251 911 234 567',
    businessName: 'Ethio-Agro Wholesale Trading PLC',
    verification: INITIAL_VERIFICATIONS[0]
  },
  {
    id: 'usr-new-retailer',
    name: 'Selamawit Tadesse',
    role: 'retailer',
    phone: '+251 944 123 456',
    businessName: 'Selam Kiosk & Grocery (ሱቅ)',
    verification: {
      id: 'ver-new-01',
      role: 'retailer',
      status: 'unverified',
      tradeName: 'Selam Kiosk & Grocery (ሱቅ)',
      legalOwnerName: 'Selamawit Tadesse',
      tinNumber: '',
      tradeLicenseNumber: '',
      licenseSector: 'Retail Groceries & Household Essentials',
      businessType: 'Sole Proprietorship',
      city: 'Addis Ababa',
      subcity: 'Yeka',
      woreda: 'Woreda 07',
      phone: '+251 944 123 456',
      phoneVerified: false,
      submittedAt: new Date().toISOString(),
      bankAccountVerified: false
    }
  },
  {
    id: 'usr-new-wholesaler',
    name: 'Tamrat Girma',
    role: 'wholesaler',
    phone: '+251 913 888 777',
    businessName: 'Awash Bulk Commodities Supply',
    verification: {
      id: 'ver-new-02',
      role: 'wholesaler',
      status: 'unverified',
      tradeName: 'Awash Bulk Commodities Supply',
      legalOwnerName: 'Tamrat Girma',
      tinNumber: '',
      tradeLicenseNumber: '',
      licenseSector: 'Wholesale Foodstuffs & Beverages',
      businessType: 'PLC (ኃ/የተ/የግ/ማ)',
      city: 'Addis Ababa',
      subcity: 'Akaki Kality',
      woreda: 'Woreda 02',
      phone: '+251 913 888 777',
      phoneVerified: false,
      submittedAt: new Date().toISOString(),
      bankAccountVerified: false
    }
  }
];

// Helper to validate 10-digit Ethiopian TIN
export function isValidEthiopianTIN(tin: string): boolean {
  const cleaned = tin.trim().replace(/\D/g, '');
  return cleaned.length === 10;
}

// Helper to validate Ethiopian phone number
export function isValidEthiopianPhone(phone: string): boolean {
  const cleaned = phone.trim().replace(/[\s-]/g, '');
  return /^(\+251|0)(9|7)\d{8}$/.test(cleaned);
}
