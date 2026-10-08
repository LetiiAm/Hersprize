import React from 'react';
import { BusinessVerification, UserSession } from '../types';
import { ShieldCheck, ShieldAlert, BadgeCheck, AlertTriangle, ChevronRight, UserCheck } from 'lucide-react';

interface VerificationBadgeProps {
  status: 'verified' | 'pending_review' | 'unverified' | 'rejected';
  role?: 'wholesaler' | 'retailer';
  showDetails?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  role = 'wholesaler',
  showDetails = false
}) => {
  if (status === 'verified') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black tracking-tight shadow-xs">
        <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>{role === 'wholesaler' ? 'MOTI Verified Wholesaler' : 'Verified Retailer'}</span>
        {showDetails && <span className="text-[10px] text-emerald-700 ml-0.5">● Legal TIN</span>}
      </span>
    );
  }

  if (status === 'pending_review') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
        <span>Pending MOTI Review</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold">
      <ShieldAlert className="w-3 h-3 text-slate-500" />
      <span>Unverified Merchant</span>
    </span>
  );
};

interface VerificationBannerProps {
  currentUser: UserSession;
  onOpenVerificationModal: () => void;
  lang: 'en' | 'am';
}

export const VerificationBanner: React.FC<VerificationBannerProps> = ({
  currentUser,
  onOpenVerificationModal,
  lang
}) => {
  const isVerified = currentUser.verification.status === 'verified';

  if (isVerified) {
    return (
      <div className="bg-emerald-50 border-b border-emerald-200/80 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-extrabold text-emerald-950">
              {currentUser.businessName}
            </span>
            <span className="text-emerald-700">|</span>
            <span className="text-emerald-800">
              TIN: <strong className="font-mono">{currentUser.verification.tinNumber || '0028941029'}</strong>
            </span>
            <span className="hidden sm:inline text-emerald-700">•</span>
            <span className="hidden sm:inline text-emerald-800">
              MOTI License: <strong className="font-mono">{currentUser.verification.tradeLicenseNumber || 'MOTI/AA/2026'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900 font-bold text-[11px]">
              ✓ Verified {currentUser.role === 'wholesaler' ? 'Wholesaler' : 'Retailer'}
            </span>
            <button
              onClick={onOpenVerificationModal}
              className="text-emerald-800 hover:text-emerald-950 underline font-semibold text-[11px] cursor-pointer"
            >
              {lang === 'en' ? 'View Credentials' : 'የፈቃድ ሰነድ'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-500/15 border-b border-amber-300 px-4 py-2.5 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="font-bold">
            {lang === 'en'
              ? 'Business verification required to post wholesale lots or execute large trade dispatches.'
              : 'እቃዎችን ለመመዝገብ ወይም ትላልቅ ትዕዛዞችን ለመላክ የንግድ ፈቃድ ማረጋገጫ ያስፈልጋል።'}
          </span>
        </div>

        <button
          onClick={onOpenVerificationModal}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
        >
          <span>{lang === 'en' ? 'Complete MOTI & TIN Verification' : 'ፈቃድና ግብር አረጋግጥ'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
