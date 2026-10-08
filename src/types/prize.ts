export type DrawFrequency = 'daily' | 'weekly' | 'monthly';

export type PrizeCategory = 
  | 'cash' 
  | 'hotel_lunch' 
  | 'hotel_dinner' 
  | 'resort_stay' 
  | 'electronics' 
  | 'vehicle';

export interface Prize {
  id: string;
  title: string;
  titleAmharic: string;
  frequency: DrawFrequency;
  category: PrizeCategory;
  prizeValue: string; // e.g. "10,000 ETB Cash", "Lunch Package for 2"
  venueLocation: string; // e.g. "Bishoftu (Kuriftu Resort)", "Addis Ababa (Skylight Hotel)"
  ticketPriceETB: number; // e.g. 25, 50, 100, 200
  totalTickets: number;
  soldTickets: number;
  drawDate: string; // ISO date
  drawDateFormatted: string;
  image: string;
  description: string;
  descriptionAmharic?: string;
  inclusions: string[];
  featured: boolean;
  terms: string;
  startupGoal?: string; // e.g. "Seed capital to launch local retail / micro-enterprise"
  jobsEstimate?: number; // estimated jobs created
  supportPeoples?: number; // e.g. 3 people supported to open business
  directBusinesses?: number; // e.g. 3 direct business open
  indirectBusinesses?: number; // e.g. 6 indirect business open
}

export interface PlatformSettings {
  telebirrPhone: string; // default "0910442314"
  telebirrName: string;
  supportPhone: string;
  landline: string;
  officeAddress: string;
  bishoftuAddress: string;
  telegramChannel: string;
  totalJobsCreatedCounter: number;
  totalGrantsDisbursedETB: number;
  startupCompetitionTitle: string;
  startupCompetitionTagline: string;
  licenseNumber: string;
  campaignAnnouncement: string;
  shareableAppUrl: string;
}

export interface Winner {
  id: string;
  prizeId: string;
  prizeTitle: string;
  frequency: DrawFrequency;
  winnerName: string;
  maskedPhone: string;
  city: string;
  ticketNumber: string;
  wonItem: string;
  drawDate: string;
  avatar: string;
  payoutMethod: 'telebirr' | 'cbe_birr' | 'hotel_voucher';
  payoutStatus: 'Paid & Confirmed' | 'Voucher Issued';
}

export interface TicketPurchase {
  id: string;
  ticketCode: string;
  luckyNumber?: string; // 6-digit lucky lottery number
  prizeId: string;
  prizeTitle: string;
  frequency: DrawFrequency;
  ticketPriceETB: number;
  quantity: number;
  totalCostETB: number;
  drawDate: string;
  venueLocation: string;
  purchasedAt: string;
  paymentMethod: 'telebirr' | 'cbe_birr' | 'wallet';
  transactionRef: string;
  status: 'active' | 'won' | 'not_selected';
}

export interface PaymentSubmission {
  id: string;
  payerPhone: string;
  payerName: string;
  recipientTelebirrPhone: string; // "0910442314"
  prizeId: string;
  prizeTitle: string;
  frequency: DrawFrequency;
  quantity: number;
  ticketPriceETB: number;
  totalAmountETB: number;
  selectedLuckyNumbers: string[];
  telebirrTxId: string;
  attachedInvoiceUrl?: string;
  submittedAt: string;
  status: 'pending_admin_approval' | 'approved' | 'rejected';
  approvedAt?: string;
  generatedTicketNumbers?: string[];
  smsNotificationSent: boolean;
}

export interface ReferralFriend {
  id: string;
  name: string;
  phoneMasked: string;
  joinedAt: string;
  status: 'pending_ticket_purchase' | 'completed_rewarded';
  firstPrizePurchased?: string;
  creditRewardETB: number;
  bonusLuckyTicket?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  phone: string; // Username
  city: string;
  walletBalanceETB: number;
  tickets: TicketPurchase[];
  claimedPrizesCount: number;
  referralCode?: string;
  totalReferralsCount?: number;
  completedReferralsCount?: number;
  referralEarningsETB?: number;
  bonusLuckyNumbersCount?: number;
  referralFriends?: ReferralFriend[];
}
