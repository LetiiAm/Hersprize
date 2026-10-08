import { Product, Driver, Order } from '../types';

export const ETHIOPIAN_SUBCITIES = [
  'Addis Ketema (Merkato area)',
  'Bole',
  'Kirkos',
  'Arada (Piassa)',
  'Yeka',
  'Kolfe Keranio',
  'Nifas Silk Lafto (Gotera/Gofa)',
  'Akaki Kality',
  'Lideta',
  'Gullele',
  'Lemi Kura (CMC/Ayat)',
  'Adama (Nazret)',
  'Hawassa',
  'Bishoftu (Debre Zeyit)',
  'Dire Dawa',
  'Bahir Dar'
];

export const CATEGORIES = [
  'All Goods',
  'Edible Oil & Grains',
  'Packaged Food & Dairy',
  'Beverages & Drinks',
  'Hygiene & Cleaning',
  'Construction Materials',
  'Leather & Footwear'
];

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'drv-01',
    name: 'Abebe Bekele Worku',
    phone: '+251 911 482 910',
    vehicleType: 'Isuzu NPR (3.5T)',
    plateNumber: '3-B14923 AA',
    baseCost: 1800,
    perKmCost: 75,
    capacityKg: 3500,
    operatingCities: ['Addis Ababa', 'Bishoftu', 'Adama'],
    rating: 4.9,
    tripsCompleted: 342,
    available: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'drv-02',
    name: 'Mohammed Kedir Jemal',
    phone: '+251 922 849 104',
    vehicleType: 'Suzuki Damas (Small)',
    plateNumber: '2-B83912 AA',
    baseCost: 750,
    perKmCost: 45,
    capacityKg: 800,
    operatingCities: ['Addis Ababa (Intra-city)'],
    rating: 4.8,
    tripsCompleted: 512,
    available: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'drv-03',
    name: 'Dawit Tadesse Haile',
    phone: '+251 935 120 449',
    vehicleType: 'Isuzu FSR (7T)',
    plateNumber: '3-A92810 ET',
    baseCost: 3200,
    perKmCost: 110,
    capacityKg: 7000,
    operatingCities: ['Addis Ababa', 'Hawassa', 'Adama', 'Dire Dawa'],
    rating: 4.95,
    tripsCompleted: 289,
    available: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'drv-04',
    name: 'Getachew Alemu Desta',
    phone: '+251 913 774 201',
    vehicleType: 'Sino Truck (20T)',
    plateNumber: '3-C55921 ET',
    baseCost: 6500,
    perKmCost: 180,
    capacityKg: 20000,
    operatingCities: ['Addis Ababa', 'Adama', 'Mojo', 'Djibouti Corridor'],
    rating: 4.85,
    tripsCompleted: 195,
    available: true,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'drv-05',
    name: 'Yared Berhanu Kassa',
    phone: '+251 977 403 912',
    vehicleType: 'Isuzu NPR (3.5T)',
    plateNumber: '3-B39012 AA',
    baseCost: 1750,
    perKmCost: 70,
    capacityKg: 3500,
    operatingCities: ['Addis Ababa', 'Bishoftu', 'Modjo'],
    rating: 4.75,
    tripsCompleted: 164,
    available: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Tena Pure Sunflower Cooking Oil 5L',
    nameAmharic: 'ጤና የሱፍ የምግብ ዘይት 5 ሊትር',
    brand: 'Tena (ጤና)',
    category: 'Edible Oil & Grains',
    moq: 25, // cartons
    unit: 'Carton (4 cans x 5L)',
    unitPrice: 4250, // ETB per carton
    manufacturingDate: '2026-06-15',
    expirationDate: '2027-12-15',
    batchNumber: 'TN-OIL-2026-08',
    stockAvailable: 680,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Fortified with Vitamin A & D. Premium double-refined pure sunflower edible oil. Packed in sturdy industrial 4x5L cartons suitable for retail supermarkets and grocery shops.',
    seller: {
      id: 'sel-01',
      businessName: 'Ethio-Agro Wholesale Trading PLC',
      contactPerson: 'Ato Solomon Kebede',
      phone: '+251 911 234 567',
      telegram: '@solomon_agro_jemla',
      tinNumber: '0028941029',
      hubLocation: 'Merkato Military Tera, Bldg 4 Shop 12',
      city: 'Addis Ababa',
      subcity: 'Addis Ketema',
      rating: 4.9,
      verified: true
    },
    suggestedVehicle: 'Isuzu NPR (3.5T)',
    weightKgPerUnit: 20
  },
  {
    id: 'prod-02',
    name: 'Pure White Teff Grade A (የማኛ ጤፍ)',
    nameAmharic: 'የማኛ ነጭ ጤፍ አንደኛ ደረጃ',
    brand: 'East Shewa Harvest',
    category: 'Edible Oil & Grains',
    moq: 10, // quintals
    unit: 'Quintal (100kg Bag)',
    unitPrice: 9800, // ETB per quintal
    manufacturingDate: '2026-08-01',
    expirationDate: '2027-08-01',
    batchNumber: 'TF-SHW-2026-04',
    stockAvailable: 340,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cleaned, stoneless, high-grade white Magna Teff sourced directly from Adaa (Bishoftu) grain farmers. Highest yield for injera baking.',
    seller: {
      id: 'sel-02',
      businessName: 'Bishoftu Grain & Cereals Jemla Center',
      contactPerson: 'Wro. Meseret Hailu',
      phone: '+251 920 338 901',
      telegram: '@bishoftu_cereals',
      tinNumber: '0049102837',
      hubLocation: 'Kality Food Terminal, Gate 2 Warehouse 8',
      city: 'Addis Ababa',
      subcity: 'Akaki Kality',
      rating: 4.85,
      verified: true
    },
    suggestedVehicle: 'Isuzu FSR (7T)',
    weightKgPerUnit: 100
  },
  {
    id: 'prod-03',
    name: 'Santa Long Spaghetti 500g',
    nameAmharic: 'ሳንታ ስፓጌቲ 500 ግራም',
    brand: 'Santa Pasta (ሳንታ)',
    category: 'Packaged Food & Dairy',
    moq: 30, // cartons
    unit: 'Carton (20 packs x 500g)',
    unitPrice: 1850,
    manufacturingDate: '2026-07-10',
    expirationDate: '2028-07-10',
    batchNumber: 'SNT-PST-9921',
    stockAvailable: 850,
    images: [
      'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80'
    ],
    description: '100% durum wheat semolina pasta made in Ethiopia. Non-sticky, fast-cooking, popular across tea-rooms and retail grocers.',
    seller: {
      id: 'sel-01',
      businessName: 'Ethio-Agro Wholesale Trading PLC',
      contactPerson: 'Ato Solomon Kebede',
      phone: '+251 911 234 567',
      telegram: '@solomon_agro_jemla',
      tinNumber: '0028941029',
      hubLocation: 'Merkato Military Tera, Bldg 4 Shop 12',
      city: 'Addis Ababa',
      subcity: 'Addis Ketema',
      rating: 4.9,
      verified: true
    },
    suggestedVehicle: 'Suzuki Damas (Small)',
    weightKgPerUnit: 10
  },
  {
    id: 'prod-04',
    name: 'Anchor Fortified Full Cream Milk Powder 2.5kg',
    nameAmharic: 'አንከር ፉል ክሪም የዱቄት ወተት 2.5ኪግ',
    brand: 'Anchor (NZMP/Fonterra)',
    category: 'Packaged Food & Dairy',
    moq: 15, // cartons
    unit: 'Carton (6 tins x 2.5kg)',
    unitPrice: 13200,
    manufacturingDate: '2026-05-20',
    expirationDate: '2028-05-20',
    batchNumber: 'ANC-MK-8840',
    stockAvailable: 190,
    images: [
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Official Ethiopian import with customs tax clearance. High-demand staple for families, cafes, and bakeries. Rich calcium and protein.',
    seller: {
      id: 'sel-03',
      businessName: 'Al-Sam Import & Distribution',
      contactPerson: 'Ato Ermias Kassahun',
      phone: '+251 911 772 319',
      telegram: '@alsam_official_wholesale',
      tinNumber: '0011928374',
      hubLocation: 'Piassa Churchill Avenue / Tana Mall Depot',
      city: 'Addis Ababa',
      subcity: 'Arada (Piassa)',
      rating: 4.95,
      verified: true
    },
    suggestedVehicle: 'Suzuki Damas (Small)',
    weightKgPerUnit: 16
  },
  {
    id: 'prod-05',
    name: 'Habesha Cold Gold Beer 330ml Glass',
    nameAmharic: 'ሐበሻ ቢራ 330 ሚሊ',
    brand: 'Habesha Breweries (ሐበሻ)',
    category: 'Beverages & Drinks',
    moq: 40, // crates
    unit: 'Crate (24 bottles x 330ml)',
    unitPrice: 1440,
    manufacturingDate: '2026-09-01',
    expirationDate: '2027-03-01',
    batchNumber: 'HBSH-BB-260901',
    stockAvailable: 1200,
    images: [
      'https://images.unsplash.com/photo-1608270190977-80fb227fd644?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Genuine brewery-direct wholesale crates. Returnable glass bottles (deposit included). Crisp, smooth taste, top seller for bars, restaurants & kiosks.',
    seller: {
      id: 'sel-04',
      businessName: 'Debre Birhan Beverage Distributors',
      contactPerson: 'Ato Daniel Mulugeta',
      phone: '+251 912 654 990',
      telegram: '@debrebirhan_drinks',
      tinNumber: '0077281903',
      hubLocation: 'Gofa Sefer Beverage Distribution Hub',
      city: 'Addis Ababa',
      subcity: 'Nifas Silk Lafto (Gotera/Gofa)',
      rating: 4.88,
      verified: true
    },
    suggestedVehicle: 'Isuzu FSR (7T)',
    weightKgPerUnit: 18
  },
  {
    id: 'prod-06',
    name: '555 Multipurpose Laundry Bar Soap 200g',
    nameAmharic: '555 የልብስ ሳሙና 200 ግራም',
    brand: 'Repi Soap & Detergents',
    category: 'Hygiene & Cleaning',
    moq: 20, // boxes
    unit: 'Box (72 bars x 200g)',
    unitPrice: 2880,
    manufacturingDate: '2026-06-01',
    expirationDate: '2029-06-01',
    batchNumber: 'RP-555-4412',
    stockAvailable: 500,
    images: [
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Iconic Ethiopian household laundry and wash bar soap. High lather, grease cutter, staple item with rapid turnover in neighborhood suqs.',
    seller: {
      id: 'sel-05',
      businessName: 'Repi Wholesale Agency - Merkato',
      contactPerson: 'Wro. Tigist Girma',
      phone: '+251 911 889 042',
      telegram: '@repi_merkato_depot',
      tinNumber: '0033819201',
      hubLocation: 'Merkato Dubai Tera, 2nd Floor Store #104',
      city: 'Addis Ababa',
      subcity: 'Addis Ketema',
      rating: 4.78,
      verified: true
    },
    suggestedVehicle: 'Suzuki Damas (Small)',
    weightKgPerUnit: 14.5
  },
  {
    id: 'prod-07',
    name: 'Dangote Pozzolana Portland Cement 50kg (42.5N)',
    nameAmharic: 'ዳንጎቴ ፖርትላንድ ሲሚንቶ 50 ኪ.ግ',
    brand: 'Dangote Cement Ethiopia',
    category: 'Construction Materials',
    moq: 50, // bags
    unit: 'Bag (50kg Heavy Paper Sack)',
    unitPrice: 1250,
    manufacturingDate: '2026-09-10',
    expirationDate: '2027-03-10',
    batchNumber: 'DNG-MUGHER-2026-9',
    stockAvailable: 2400,
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-strength Grade 42.5N structural construction cement. Suitable for multi-story slab pouring, blocks, plastering and masonry works. Directly from Mugher factory distribution center.',
    seller: {
      id: 'sel-06',
      businessName: 'Sheger Building Materials Wholesale',
      contactPerson: 'Ato Henok Tesfaye',
      phone: '+251 930 112 458',
      telegram: '@sheger_cement_jemla',
      tinNumber: '0066120934',
      hubLocation: 'Kality Heavy Industry Zone, Ring Road Depot',
      city: 'Addis Ababa',
      subcity: 'Akaki Kality',
      rating: 4.92,
      verified: true
    },
    suggestedVehicle: 'Sino Truck (20T)',
    weightKgPerUnit: 50
  },
  {
    id: 'prod-08',
    name: 'Rani Float Orange Fruit Drink 240ml',
    nameAmharic: 'ራኒ ፍሎት ብርቱካን 240 ሚሊ',
    brand: 'Rani (Aujan/Coca-Cola)',
    category: 'Beverages & Drinks',
    moq: 20, // trays
    unit: 'Tray (24 cans x 240ml with fruit bits)',
    unitPrice: 1680,
    manufacturingDate: '2026-06-25',
    expirationDate: '2027-12-25',
    batchNumber: 'RN-FLT-8711',
    stockAvailable: 420,
    images: [
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Refreshing fruit juice containing real fruit chunks. High margin fast-seller for school kiosks, cafeterias, and corner grocery shops.',
    seller: {
      id: 'sel-03',
      businessName: 'Al-Sam Import & Distribution',
      contactPerson: 'Ato Ermias Kassahun',
      phone: '+251 911 772 319',
      telegram: '@alsam_official_wholesale',
      tinNumber: '0011928374',
      hubLocation: 'Piassa Churchill Avenue / Tana Mall Depot',
      city: 'Addis Ababa',
      subcity: 'Arada (Piassa)',
      rating: 4.95,
      verified: true
    },
    suggestedVehicle: 'Suzuki Damas (Small)',
    weightKgPerUnit: 6.5
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'JEMLA-ET-2026-8801',
    product: INITIAL_PRODUCTS[0],
    quantity: 30, // 30 cartons (MOQ is 25)
    unitPrice: 4250,
    subtotal: 127500,
    transportCost: 2850,
    totalAmount: 130350,
    buyer: {
      retailerName: 'Yohannes Wolde',
      shopName: 'Bole Medhanealem Mini-Market',
      phone: '+251 911 445 566',
      city: 'Addis Ababa',
      subcity: 'Bole',
      woreda: 'Woreda 03',
      specificLandmark: 'Around Medhanealem Cathedral, opposite Edna Mall'
    },
    transport: {
      driverId: 'drv-01',
      driverName: 'Abebe Bekele Worku',
      driverPhone: '+251 911 482 910',
      vehicleType: 'Isuzu NPR (3.5T)',
      plateNumber: '3-B14923 AA',
      estimatedDistanceKm: 14,
      transportCost: 2850,
      deliveryNotes: 'Please deliver through the rear stock entrance behind the supermarket'
    },
    payment: {
      method: 'telebirr',
      status: 'verified',
      transactionReference: 'TB-9284019283',
      accountOrPhone: '+251 911 445 566',
      timestamp: '2026-10-06T14:22:00Z'
    },
    status: 'in_transit',
    createdAt: '2026-10-06T14:15:00Z',
    estimatedDeliveryDate: '2026-10-07T11:00:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'JEMLA-ET-2026-8802',
    product: INITIAL_PRODUCTS[2], // Santa Pasta
    quantity: 50,
    unitPrice: 1850,
    subtotal: 92500,
    transportCost: 1425,
    totalAmount: 93925,
    buyer: {
      retailerName: 'Almaz Tsegaye',
      shopName: 'Almaz Grocery & Spices',
      phone: '+251 929 118 720',
      city: 'Addis Ababa',
      subcity: 'Kirkos',
      woreda: 'Woreda 08',
      specificLandmark: 'Kazanchis, behind Total Gas Station'
    },
    transport: {
      driverId: 'drv-02',
      driverName: 'Mohammed Kedir Jemal',
      driverPhone: '+251 922 849 104',
      vehicleType: 'Suzuki Damas (Small)',
      plateNumber: '2-B83912 AA',
      estimatedDistanceKm: 15,
      transportCost: 1425
    },
    payment: {
      method: 'cbe_birr',
      status: 'verified',
      transactionReference: 'CBE-FT2628001921',
      accountOrPhone: '1000284910291 (Commercial Bank of Ethiopia)',
      bankName: 'Commercial Bank of Ethiopia',
      timestamp: '2026-10-06T09:40:00Z'
    },
    status: 'driver_dispatched',
    createdAt: '2026-10-06T09:30:00Z',
    estimatedDeliveryDate: '2026-10-07T16:30:00Z'
  }
];

export const PAYMENT_METHODS_CONFIG = [
  {
    id: 'telebirr',
    name: 'telebirr (ቴሌብር)',
    provider: 'Ethio Telecom',
    logo: 'telebirr',
    badge: 'Instant QR / USSD *127#',
    description: 'Instant settlement via Telebirr SuperApp, merchant QR or USSD push prompt.',
    color: 'from-sky-500 to-blue-600',
    feeNote: 'Zero transaction fee for merchant wholesale deposits',
    merchantCode: 'TB-MERCHANT-84920'
  },
  {
    id: 'cbe_birr',
    name: 'CBE Mobile Banking / CBE Birr',
    provider: 'Commercial Bank of Ethiopia',
    logo: 'cbe',
    badge: 'CBE Birr & 1000... Accounts',
    description: 'Transfer via CBE Mobile Banking app or USSD *847# with FT reference slip.',
    color: 'from-amber-600 to-purple-800',
    feeNote: 'Verified instantly via CBE Core Banking Reference',
    accountNumber: '1000492810928'
  },
  {
    id: 'bank_transfer',
    name: 'Other Bank Transfers (Awash / BoA / Dashen)',
    provider: 'EthSwitch Inter-Bank',
    logo: 'banks',
    badge: 'Awash, Dashen, BoA',
    description: 'Instant EthSwitch interbank transfer via Awash Birr, Amole, or Bank of Abyssinia.',
    color: 'from-emerald-600 to-teal-800',
    feeNote: 'Direct wholesale business account transfer'
  },
  {
    id: 'card',
    name: 'Debit / Credit Card (EthSwitch / Visa)',
    provider: 'EthSwitch & International Cards',
    logo: 'card',
    badge: 'Visa, Mastercard, Local ATM cards',
    description: 'Secure card authorization for verified retail business accounts.',
    color: 'from-slate-700 to-slate-900',
    feeNote: 'Secure 3D-Authentication with SMS OTP'
  }
];
