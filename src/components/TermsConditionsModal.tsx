import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  Briefcase, 
  Ban, 
  FileText, 
  CheckCircle2, 
  Scale, 
  Clock, 
  DollarSign, 
  Users, 
  Building2, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { PlatformSettings } from '../types/prize';

interface TermsConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  platformSettings?: PlatformSettings;
  lang: 'en' | 'am';
}

export const TermsConditionsModal: React.FC<TermsConditionsModalProps> = ({
  isOpen,
  onClose,
  platformSettings,
  lang: initialLang
}) => {
  const [modalLang, setModalLang] = useState<'en' | 'am'>(initialLang);
  const [activeTab, setActiveTab] = useState<'all' | 'social_enterprise' | 'job_creation' | 'no_refund' | 'business_proposal'>('all');

  if (!isOpen) return null;

  const licenseNum = platformSettings?.licenseNumber || 'NLA/ETH/RAFFLE/2026/9941';
  const telebirrNo = platformSettings?.telebirrPhone || '0910442314';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-white max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg">
                  {modalLang === 'en' ? 'Official Terms & Conditions' : 'ኦፊሴላዊ ደንቦችና መመሪያዎች'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black uppercase">
                  NLA Licensed
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-900">
                {modalLang === 'en' 
                  ? 'Job Creation Mandate • Strict No-Refund • Business Proposal Rules'
                  : 'የሥራ ዕድል ፈጠራ • የማይመለስ ክፍያ • የንግድ እቅድ ማቅረብ ግዴታ'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setModalLang(modalLang === 'en' ? 'am' : 'en')}
              className="px-2.5 py-1 rounded-xl bg-slate-950/25 hover:bg-slate-950/40 text-slate-950 font-black text-xs transition cursor-pointer"
            >
              {modalLang === 'en' ? 'አማርኛ' : 'English'}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-950/20 hover:bg-slate-950/30 flex items-center justify-center cursor-pointer transition text-slate-950 font-bold"
              aria-label="Close Terms and Conditions"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'all'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            {modalLang === 'en' ? '📋 All Clauses' : '📋 ሁሉም አንቀጾች'}
          </button>

          <button
            onClick={() => setActiveTab('social_enterprise')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'social_enterprise'
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            <span>{modalLang === 'en' ? '🤝 Not-for-Profit Charter' : '🤝 ማህበራዊ ድርጅትና ሰብአዊ ድጋፍ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('job_creation')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'job_creation'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>{modalLang === 'en' ? '1. Job Creation Mandate' : '1. የሥራ ዕድል ፈጠራ ግዴታ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('no_refund')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'no_refund'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <Ban className="w-3.5 h-3.5 text-rose-400" />
            <span>{modalLang === 'en' ? '2. Strict No-Refund Policy' : '2. የማይመለስ ክፍያ ደንብ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('business_proposal')}
            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'business_proposal'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>{modalLang === 'en' ? '3. Business Proposal After Win' : '3. የንግድ ዕቅድ ማቅረብ'}</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed flex-1">
          
          {/* Regulatory Preamble */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <strong className="text-white text-xs block">
                  {modalLang === 'en' 
                    ? `Licensed Not-for-Profit Social Enterprise & Public Fundraising Charter`
                    : `ፈቃድ ያለው ትርፍ-አልባ ማህበራዊ ድርጅት እና የህዝብ ፈንድ አሰባሳቢ ቻርተር`}
                </strong>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  NLA #{licenseNum}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                {modalLang === 'en'
                  ? `HeraPrize is organized as an Ethiopian not-for-profit social enterprise dedicated to mobilizing fundraising for humanitarian relief services and sustainable job creation. Supervised by the Ethiopian National Lottery Administration (NLA License #${licenseNum}), all ticket purchases (300 ETB - 600 ETB) and prize allocations strictly serve public welfare and employment generation with zero private dividend distributions.`
                  : `ሄራ ፕራይዝ ለሰብአዊ ድጋፍ እና ለቀጣይነት ያለው የሥራ ዕድል ፈጠራ አገልግሎቶች የህዝብ ፈንድ የሚያሰባስብ ትርፍ-አልባ ማህበራዊ ድርጅት ነው። በብሔራዊ ሎተሪ አስተዳደር ፈቃድ ቁጥር #${licenseNum} ስር የሚተዳደር ሲሆን፤ ሁሉም የቲኬት ሽያጭ ገቢ (ከ300 - 600 ብር) በቀጥታ ለህዝብ ደህንነትና ለሥራ ፈጠራ ድጋፍ ይውላል።`}
              </p>
            </div>
          </div>

          {/* CLAUSE 0: NOT-FOR-PROFIT SOCIAL ENTERPRISE CHARTER & HUMANITARIAN SERVICES */}
          {(activeTab === 'all' || activeTab === 'social_enterprise') && (
            <div className="space-y-3 bg-slate-950 p-5 rounded-3xl border border-emerald-500/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <span>{modalLang === 'en' ? 'Clause 0: Not-for-Profit Social Enterprise & Humanitarian Aid Mandate' : 'አንቀጽ 0፡ ትርፍ-አልባ ማህበራዊ ድርጅት እና የሰብአዊ ድጋፍ ፈንድ'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase">
                      Social Enterprise
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {modalLang === 'en'
                      ? 'Mobilizing public fundraising for urgent humanitarian relief and grassroots economic empowerment.'
                      : 'የህዝብ ፈንድ በማሰባሰብ ለአስቸኳይ ሰብአዊ ድጋፍ እና ለህብረተሰብ ኢኮኖሚያዊ አቅም ግንባታ ይውላል።'}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-300 block text-xs">
                      {modalLang === 'en' 
                        ? '0.1 Not-for-Profit Social Enterprise Structure:' 
                        : '0.1 የትርፍ-አልባ ማህበራዊ ድርጅት አሰራር፡'}
                    </strong>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {modalLang === 'en'
                        ? 'HeraPrize functions as a social enterprise where 100% of proceeds from ticket sales (300 ETB - 600 ETB) are reinvested into verified humanitarian relief services and prize grant disbursements. The organization has no private shareholders or private equity profit distribution.'
                        : 'ሄራፕራይዝ 100% የቲኬት ሽያጭ ገቢውን ለተረጋገጡ የሰብአዊ ድጋፍ አገልግሎቶች እና ለሽልማት ካፒታል የሚውልበት ማህበራዊ ድርጅት ነው። ምንም አይነት የግል ትርፍ ድርሻ ለባለቤቶች አይከፈልም።'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-300 block text-xs">
                      {modalLang === 'en' 
                        ? '0.2 Mobilization of Humanitarian Relief Services:' 
                        : '0.2 የሰብአዊ ድጋፍ አገልግሎቶችን ማሰባሰብ፡'}
                    </strong>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {modalLang === 'en'
                        ? 'Funds mobilized through the competition provide emergency relief, nutritional support for vulnerable children, medical supplies for clinics in underserved woredas, and crisis assistance for displaced families across Ethiopia.'
                        : 'በውድድሩ የተሰበሰበው ፈንድ ለአስቸኳይ ጊዜ እርዳታ፣ ለተቸገሩ ሕፃናት የተመጣጠነ ምግብ አቅርቦት፣ ለክሊኒኮች የህክምና ቁሳቁስ እና በኢትዮጵያ ውስጥ ለተፈናቀሉ ቤተሰቦች ድጋፍ ይውላል።'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-300 block text-xs">
                      {modalLang === 'en' 
                        ? '0.3 Synergy Between Humanitarian Relief & Job Creation:' 
                        : '0.3 በሰብአዊ እርዳታ እና በሥራ ዕድል ፈጠራ መካከል ያለ ትስስር፡'}
                    </strong>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {modalLang === 'en'
                        ? 'Rather than one-time charity handouts, HeraPrize pairs immediate humanitarian relief with sustainable business grants (Daily 130,000 ETB per person supporting 3 people: 3 direct and 6 indirect businesses open), creating generational economic independence.'
                        : 'የአንድ ጊዜ እርዳታ ብቻ ከመስጠት ይልቅ ሄራፕራይዝ ሰብአዊ ድጋፍን ከቀጣይነት ያለው የንግድ ማስጀመሪያ ካፒታል ጋር ያጣምራል (ዕለታዊ 130,000 ብር ለአንድ ሰው 3 ሰዎችን ንግድ እንዲከፍቱ ድጋፍ፡ 3 የቀጥታ እና 6 ቀጥተኛ ያልሆኑ ንግዶች)።'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLAUSE 1: JOB CREATION MANDATE */}
          {(activeTab === 'all' || activeTab === 'job_creation') && (
            <div className="space-y-3 bg-slate-950 p-5 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    {modalLang === 'en' 
                      ? 'Clause 1: Core Purpose — Job Creation & Entrepreneurship Empowerment'
                      : 'አንቀጽ 1፡ ዋና ዓላማ — የሥራ ዕድል ፈጠራና የጀማሪ ንግድ ድጋፍ'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {modalLang === 'en'
                      ? 'Every prize is structured to create real economic impact and sustainable livelihoods in Ethiopia.'
                      : 'እያንዳንዱ ዕጣ በኢትዮጵያ ውስጥ እውነተኛ ኢኮኖሚያዊ ለውጥና ቀጣይነት ያለው የሥራ ዕድል ለመፍጠር የተዘጋጀ ነው።'}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 block text-xs">
                      {modalLang === 'en' 
                        ? '1.1 Daily Prize Mandate (130,000 ETB Cash per Person):' 
                        : '1.1 የዕለታዊ 130,000 ብር ለአንድ ሰው ዕጣ ግዴታ፡'}
                    </strong>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {modalLang === 'en'
                        ? 'The winner of the Daily 130,000 ETB seed grant is required to support three (3) individuals to open their business. The funded venture must catalyze: (a) Three (3) direct business openings (retail, kiosk, micro-service, or production), and (b) Six (6) indirect business openings (supplier, distribution, logistics, or vendor partners).'
                        : 'የዕለታዊ 130,000 ብር አሸናፊ 3 ሰዎችን የራሳቸውን ንግድ እንዲከፍቱ የመደገፍ ግዴታ አለበት። ይህም (ሀ) 3 የቀጥታ ንግድ መክፈት (direct business open) እና (ለ) 6 ቀጥተኛ ያልሆኑ ንግዶችን (indirect business open) የማስጀመር ግብን ያካትታል።'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 block text-xs">
                      {modalLang === 'en' 
                        ? '1.2 Weekly Prize Mandate (2-Day Bishoftu Resorts Stay):' 
                        : '1.2 የሳምንታዊ የ2 ቀን የቢሾፍቱ ሪዞርቶች ፓኬጅ ግዴታ፡'}
                    </strong>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {modalLang === 'en'
                        ? 'The winner of the 2-day Bishoftu Resorts luxury stay (all meals included: breakfast, lunch, dinner + 2 bed/2 night) receives executive strategy retreat privileges and must commit to supporting 3 direct business openings and 6 indirect business openings in collaboration with HeraPrize incubation advisors.'
                        : 'የሳምንታዊ የ2 ቀን የቢሾፍቱ ሪዞርቶች ፓኬጅ (ምግብ፣ ምሳ፣ እራት የተካተተበት + 2 አልጋ/2 ሌሊት) አሸናፊ ከመዝናኛ በተጨማሪ 3 የቀጥታ ንግዶችን (3 direct business open) እና 6 ቀጥተኛ ያልሆኑ ንግዶችን (6 indirect business open) ለመደገፍ ቃል ይገባል።'}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 block text-xs">
                      {modalLang === 'en' 
                        ? '1.3 Monthly Mega Prizes (250,000 ETB & Commercial Bajaj):' 
                        : '1.3 የወርሃዊ ሜጋ ዕጣዎች (250,000 ብር እና አዲስ ባጃጅ)፡'}
                    </strong>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      {modalLang === 'en'
                        ? 'The monthly grand capital (250,000 ETB) and the brand new 2026 Commercial Bajaj must be dedicated to formal SME establishment or passenger/cargo transport operations, directly generating between 2 to 15 youth employment opportunities.'
                        : 'የወርሃዊው 250,000 ብር እና አዲሱ የ2026 ባጃጅ ዕጣ በቀጥታ ከ2 እስከ 15 ለሚደርሱ ወጣቶች ቋሚ የሥራ እድል ለመፍጠርና የንግድ ፈቃድ በማውጣት ህጋዊ ስራ ለማስጀመር ይውላል።'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLAUSE 2: STRICT NO-REFUND POLICY */}
          {(activeTab === 'all' || activeTab === 'no_refund') && (
            <div className="space-y-3 bg-slate-950 p-5 rounded-3xl border border-rose-500/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                  <Ban className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <span>{modalLang === 'en' ? 'Clause 2: Strict No-Refund Policy' : 'አንቀጽ 2፡ በጥብቅ የማይመለስ ክፍያ ፖሊሲ (No Refund)'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-black uppercase">
                      Non-Refundable
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {modalLang === 'en'
                      ? 'Ticket prices are 300 ETB to 600 ETB. All ticket sales and draw entries are final.'
                      : 'የትኬት ዋጋ ከ300 ብር እስከ 600 ብር ሲሆን፤ ማንኛውም የተገዛ ትኬት ክፍያ በፍጹም አይመለስም።'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2 text-rose-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    {modalLang === 'en' ? (
                      <>
                        <strong>2.1 Finality of Purchase:</strong> Once a ticket order is submitted and payment is transmitted via Telebirr (to official account <code className="text-amber-300 font-mono">0910442314</code>) or deducted from wallet credits, the transaction is <strong className="underline">strictly final and non-refundable</strong>. Tickets, lucky draw entries, and generated raffle numbers cannot be cancelled, returned, swapped, or refunded under any circumstance.
                      </>
                    ) : (
                      <>
                        <strong>2.1 የክፍያ የመጨረሻነት፡</strong> በቴሌብር (ወደ ኦፊሴላዊ ቁጥር <code className="text-amber-300 font-mono">0910442314</code>) ወይም በዋሌት ሂሳብ የተከፈለ ማንኛውም የትኬት ግዢ <strong className="underline">የመጨረሻና የማይመለስ</strong> ነው። የተመረጡ የዕድል ቁጥሮች ሊሰረዙ፣ ሊለወጡ ወይም ገንዘባቸው ሊመለስ አይችልም።
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    {modalLang === 'en' ? (
                      <>
                        <strong>2.2 Pool Allocation & Non-Reversibility:</strong> All collected funds are immediately allocated into prize payout guarantees, NLA statutory regulatory fees, and the job creation grant pool. Because draw probabilities and pot sizes are calculated in real time, chargebacks and refund requests will be rejected.
                      </>
                    ) : (
                      <>
                        <strong>2.2 የገንዘብ ድልድል፡</strong> የተሰበሰበው ገንዘብ ወዲያውኑ ወደ አሸናፊዎች ፈንድ፣ የመንግስት ሎተሪ ግብርና የሥራ ዕድል ፈጠራ ድጋፍ የሚገባ በመሆኑ፤ ተጫዋቹ ሀሳቡን ቢቀይርም ሆነ በዕጣው ባያሸንፍ ምንም ዓይነት ተመላሽ አይደረግም።
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    {modalLang === 'en' ? (
                      <>
                        <strong>2.3 User Responsibility:</strong> Participants are responsible for verifying their selected lucky numbers, ticket quantities, and transaction IDs prior to sending Telebirr payments. Duplicate payments initiated by user error do not warrant a refund.
                      </>
                    ) : (
                      <>
                        <strong>2.3 የተጠቃሚው ኃላፊነት፡</strong> ተጫዋቹ የትኬት ብዛትና የዕድል ቁጥሮቹን በጥንቃቄ መርጦ የመክፈል ኃላፊነት አለበት። በተጠቃሚ ስህተት ለተደረገ ድጋሚ ክፍያ ገንዘብ ተመላሽ አይሆንም።
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CLAUSE 3: BUSINESS PROPOSAL AFTER WINNING FOR JOB CREATION */}
          {(activeTab === 'all' || activeTab === 'business_proposal') && (
            <div className="space-y-3 bg-slate-950 p-5 rounded-3xl border border-sky-500/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">
                    {modalLang === 'en' 
                      ? 'Clause 3: Mandatory Business Proposal After Winning the Prize'
                      : 'አንቀጽ 3፡ የዕጣ አሸናፊ ከወጣ በኋላ የንግድ ዕቅድ (Business Proposal) ማቅረብ ግዴታ'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {modalLang === 'en'
                      ? 'Seed grants are disbursed upon submission and verification of a bona fide job creation business plan.'
                      : 'የማስጀመሪያ ካፒታል ድጋፉ የሚለቀቀው አሸናፊው ተጨባጭ የሥራ ዕድል ፈጠራ የንግድ ዕቅድ ሲያቀርብና ሲረጋገጥ ነው።'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-sky-300 block text-xs">
                    {modalLang === 'en' 
                      ? '3.1 Proposal Submission Window (14 Calendar Days):'
                      : '3.1 የዕቅድ ማቅረቢያ ጊዜ (14 ቀናት)፡'}
                  </strong>
                  <p className="text-[11px] text-slate-300">
                    {modalLang === 'en'
                      ? 'Within fourteen (14) calendar days of being confirmed as a winner by the National Lottery Administration draw, the winner must submit an official Job Creation Business Proposal to the HeraPrize incubation review committee via our online portal or at our Bole Medhanealem Headquarters.'
                      : 'አሸናፊው በዕጣ ከወጣበት ቀን ጀምሮ ባሉት አስራ አራት (14) ቀናት ውስጥ የተሟላ የንግድ ዕቅድ (Business Proposal) በኦንላይን ወይም በቦሌ መድኃኔዓለም ዋና ቢሮ ማቅረብ አለበት።'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-sky-300 block text-xs">
                    {modalLang === 'en' 
                      ? '3.2 Required Components of the Job Creation Proposal:'
                      : '3.2 በንግድ ዕቅዱ ውስጥ መካተት ያለባቸው ነጥቦች፡'}
                  </strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                        A
                      </span>
                      <div>
                        <span className="font-bold text-white block">Enterprise Sector & Concept</span>
                        <span className="text-slate-400 text-[10px]">
                          {modalLang === 'en'
                            ? 'Retail, urban poultry/farming, food kiosk, delivery service, salon, textile or tech venture.'
                            : 'የንግዱ ዘርፍ (ሱቅ፣ ሻይ ቤት፣ የዶሮ እርባታ፣ የሞባይል ጥገና፣ ወይም አገልግሎት)'}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                        B
                      </span>
                      <div>
                        <span className="font-bold text-white block">Beneficiary Roster (3 People)</span>
                        <span className="text-slate-400 text-[10px]">
                          {modalLang === 'en'
                            ? 'Names, National ID/Fayda copies, and phone numbers of the 3 persons being supported.'
                            : 'ንግድ እንዲከፍቱ የሚደገፉት የ3ቱ ሰዎች ስም፣ መታወቂያና ስልክ ቁጥር'}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                        C
                      </span>
                      <div>
                        <span className="font-bold text-white block">Direct & Indirect Business Map</span>
                        <span className="text-slate-400 text-[10px]">
                          {modalLang === 'en'
                            ? 'Clear roadmap establishing 3 direct business openings and 6 indirect supplier/partner businesses.'
                            : '3ቱ የቀጥታ ንግድ እና 6ቱ ቀጥተኛ ያልሆኑ ንግዶች የሚከፈቱበት የጊዜ ሰሌዳ'}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                        D
                      </span>
                      <div>
                        <span className="font-bold text-white block">Budget Breakdown (130,000 ETB)</span>
                        <span className="text-slate-400 text-[10px]">
                          {modalLang === 'en'
                            ? 'Itemized seed capital allocation (raw materials, inventory, rent advance, licensing fees).'
                            : 'የ130,000 ብር የካፒታል ወጪ ዝርዝር (እቃ መግዣ፣ ፈቃድ፣ የኪራይ ቅድመ ክፍያ)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <strong className="text-sky-300 block text-xs">
                    {modalLang === 'en' 
                      ? '3.3 Free Advisory Support & Tranche Disbursements:'
                      : '3.3 ነፃ የማማከር አገልግሎትና የክፍያ አከፋፈል፡'}
                  </strong>
                  <p className="text-[11px] text-slate-300">
                    {modalLang === 'en'
                      ? 'HeraPrize assigns a dedicated business mentor to each winner free of charge to refine their business proposal. Cash grants are disbursed via Telebirr or CBE Bank in milestone tranches (50% on approval, 50% upon verified business launch) to ensure legitimate job creation and protect the fund from fraud.'
                      : 'ሄራ ፕራይዝ ለአሸናፊው ነፃ የቢዝነስ አማካሪ ይመድባል። ገንዘቡ በቴሌብር ወይም በባንክ በደረጃ (50% ሲፈቀድ፣ 50% ንግዱ ሲጀመር) ይለቀቃል፤ ይህም ገንዘቡ ለታለመለት የሥራ ፈጠራ መዋሉን ለማረጋገጥ ነው።'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CLAUSE 4: TICKET COST, ELIGIBILITY & FAIR PLAY */}
          {activeTab === 'all' && (
            <div className="space-y-3 bg-slate-950 p-5 rounded-3xl border border-slate-800">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>{modalLang === 'en' ? 'Clause 4: Ticket Pricing & Player Eligibility' : 'አንቀጽ 4፡ የትኬት ዋጋና የተጫዋቾች ብቁነት'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block">
                    {modalLang === 'en' ? 'Ticket Pricing (300 - 600 ETB):' : 'የትኬት ዋጋ (300 - 600 ብር)፡'}
                  </strong>
                  <p className="text-slate-400">
                    {modalLang === 'en'
                      ? 'Official ticket costs are strictly standardized between 300 ETB and 600 ETB depending on the category and jackpot tier. No hidden charges apply.'
                      : 'የትኬት ዋጋ በግልጽ ከ300 ብር እስከ 600 ብር ብቻ የተወሰነ ሲሆን ምንም አይነት ተጨማሪ ያልተገለጸ ክፍያ የለም።'}
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block">
                    {modalLang === 'en' ? 'Eligibility (Age 18+ & Ethiopian Resident):' : 'እድሜና ዜግነት (18 ዓመትና ከዚያ በላይ)፡'}
                  </strong>
                  <p className="text-slate-400">
                    {modalLang === 'en'
                      ? 'Participants must be at least 18 years of age and hold a valid Ethiopian ID, Kebele card, or Resident permit. Verification is required to collect prizes.'
                      : 'ተጫዋቹ 18 ዓመት የሞላውና ህጋዊ የኢትዮጵያ መታወቂያ ያለው መሆን አለበት። ሽልማት ሲረከብ ማረጋገጫ ማቅረብ ግዴታ ነው።'}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 border-t border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {modalLang === 'en'
                ? `License: ${licenseNum} • Telebirr: ${telebirrNo}`
                : `ፈቃድ ቁጥር፡ ${licenseNum} • ቴሌብር፡ ${telebirrNo}`}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-lg shadow-amber-500/20"
            >
              {modalLang === 'en' ? 'I Understand & Agree to Terms' : 'ደንቦቹን ተረድቻለሁና እስማማለሁ'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
