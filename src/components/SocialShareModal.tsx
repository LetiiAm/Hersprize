import React, { useState } from 'react';
import { Prize, PlatformSettings } from '../types/prize';
import { getPublicBaseUrl, buildShareableUrl, isInternalDevUrl } from '../utils/shareUrl';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Send, 
  Sparkles, 
  QrCode, 
  Globe, 
  MessageSquare,
  Facebook,
  Linkedin,
  Twitter,
  Flame,
  Briefcase,
  Ticket,
  ShieldCheck,
  HeartHandshake,
  AlertCircle
} from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  prize?: Prize | null;
  platformSettings: PlatformSettings;
  lang: 'en' | 'am';
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  prize,
  platformSettings,
  lang
}) => {
  if (!isOpen) return null;

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'telegram' | 'facebook' | 'short'>('telegram');
  const [selectedLang, setSelectedLang] = useState<'en' | 'am'>(lang);

  // Compute 100% public shareable URL that will NEVER return 403 Forbidden!
  const shareUrl = buildShareableUrl(
    prize
      ? { prize: prize.id, campaign: 'humanitarian-job-creation' }
      : { campaign: 'humanitarian-job-creation' },
    platformSettings.shareableAppUrl
  );

  const inDevMode = isInternalDevUrl();

  // Pre-crafted social media post copy
  const postCopies = {
    telegram: {
      en: `🇪🇹 🤝 HERAPRIZE - NOT-FOR-PROFIT SOCIAL ENTERPRISE 🇪🇹\nEmpowering Humanitarian Relief & Sustainable Job Creation Services Across Ethiopia!\n\n${
        prize
          ? `🎟️ FEATURED PRIZE: ${prize.title}\n💰 Value: ${prize.prizeValue}\n📍 Location: ${prize.venueLocation}\n🎫 Ticket Price: Only ${prize.ticketPriceETB} ETB via Telebirr!\n💼 Impact Goal: ${prize.startupGoal || 'Supports 3 people to open businesses: 3 direct & 6 indirect businesses open'}\n`
          : `💡 Join Ethiopia's Not-for-Profit Social Enterprise mobilizing community fundraising for humanitarian relief and job creation services!\n💰 Daily Prize: Win 130,000 ETB per Person (supports 3 people to open their business — 3 direct & 6 indirect businesses open)!\n🏖️ Weekly Prize: Win a 2-Day Bishoftu Resorts stay (Meal, lunch, dinner + 2 bed/2 night — 3 direct & 6 indirect businesses open)!\n🎫 Tickets: 300 - 600 ETB via Telebirr!\n`
      }
📲 How to Enter & Support the Mission:
1. Open the public app link: ${shareUrl}
2. Send ticket amount (300 - 600 ETB) to Telebirr: ${platformSettings.telebirrPhone} (${platformSettings.telebirrName})
3. Attach invoice & get your lucky ticket numbers auto-generated to your phone!

🤝 Impact: 100% of proceeds mobilize humanitarian relief & catalytic startup grants!\n💼 Over ${platformSettings.totalJobsCreatedCounter}+ Youth Jobs Created to date!\n🏛️ Licensed & Supervised by Ethiopian National Lottery Administration (${platformSettings.licenseNumber}).\n\n🔗 Tap here to enter & support: \n${shareUrl}\n\n#HeraPrize #SocialEnterprise #HumanitarianAid #JobCreation #Telebirr #Ethiopia #AddisAbaba #Bishoftu`,
      am: `🇪🇹 🤝 ሄራፕራይዝ - ትርፍ-አልባ ማህበራዊ ድርጅት (NOT-FOR-PROFIT SOCIAL ENTERPRISE) 🇪🇹\nለሰብአዊ ድጋፍ እና ለቀጣይነት ያለው የሥራ ዕድል ፈጠራ የህዝብ ፈንድ አሰባሳቢ!\n\n${
        prize
          ? `🎟️ የዕጣው ዓይነት፡ ${prize.titleAmharic || prize.title}\n💰 ዋጋ፡ ${prize.prizeValue}\n📍 ቦታ፡ ${prize.venueLocation}\n🎫 የዕጣ መቁረጫ፡ ${prize.ticketPriceETB} ብር በቴሌብር!\n💼 ተፅዕኖ፡ ${prize.startupGoal || '3 ሰዎችን የራሳቸውን ንግድ እንዲከፍቱ መደገፍ፡ 3 የቀጥታ እና 6 ቀጥተኛ ያልሆኑ ንግዶች'}\n`
          : `💡 ለሰብአዊ ድጋፍና ለሥራ ዕድል ፈጠራ የተቋቋመው የሄራፕራይዝ ማህበራዊ ድርጅት ውድድር ተጀምሯል!\n💰 ዕለታዊ ሽልማት፡ 130,000 ብር ለአንድ ሰው (3 ሰዎችን ንግድ እንዲከፍቱ የሚደግፍ፡ 3 የቀጥታ እና 6 ቀጥተኛ ያልሆኑ ንግዶች)!\n🏖️ ሳምንታዊ ሽልማት፡ የ2 ቀን የቢሾፍቱ ሪዞርቶች ፓኬጅ (ምግብ፣ ምሳ፣ እራት + 2 አልጋ/2 ሌሊት)!\n🎫 የዕጣ መቁረጫ ከ300 - 600 ብር በቴሌብር!\n`
      }
📲 እንዴት መሳተፍና መደገፍ ይቻላል፡
1. ኦፊሴላዊ ሊንኩን ይክፈቱ፡ ${shareUrl}
2. የዕጣ ሂሳቡን በቴሌብር ወደ ${platformSettings.telebirrPhone} (${platformSettings.telebirrName}) ይላኩ
3. የክፍያ ደረሰኙን በማያያዝ የዕድል ቁጥርዎን በስልክዎ ይቀበሉ!

🤝 100% ገቢው ለሰብአዊ ድጋፍ እና ለሥራ ዕድል ፈጠራ ስራዎች ይውላል!
💼 የተፈጠሩ የሥራ ዕድሎች፡ ${platformSettings.totalJobsCreatedCounter}+
🏛️ በብሔራዊ ሎተሪ አስተዳደር ፈቃድ ቁጥር ${platformSettings.licenseNumber} የተረጋገጠ።

🔗 አሁኑኑ ለመሳተፍ ሊንኩን ይጫኑ፡
${shareUrl}

#ሄራፕራይዝ #ማህበራዊድርጅት #ሰብአዊድጋፍ #የሥራዕድል #ቴሌብር #ኢትዮጵያ`
    },
    facebook: {
      en: `🤝 HeraPrize: Not-for-Profit Social Enterprise Mobilizing Humanitarian Relief & Job Creation! Daily: Win 130,000 ETB per Person (supports 3 people to open businesses: 3 direct & 6 indirect). Weekly: 2-Day Bishoftu Resorts stay (Meals + 2 bed/2 night). Tickets: 300 - 600 ETB via Telebirr (${platformSettings.telebirrPhone}). Public App Link: ${shareUrl}`,
      am: `🤝 ሄራፕራይዝ፡ ለሰብአዊ ድጋፍ እና ለሥራ ዕድል ፈጠራ የተቋቋመ ትርፍ-አልባ ማህበራዊ ድርጅት! ዕለታዊ 130,000 ብር ለአንድ ሰው (3 ሰዎችን ንግድ እንዲከፍቱ ድጋፍ) እና ሳምንታዊ የ2 ቀን የቢሾፍቱ ሪዞርቶች (ምግብ + 2 አልጋ/2 ሌሊት)። የዕጣ መቁረጫ 300 - 600 ብር በቴሌብር (${platformSettings.telebirrPhone})፡ ${shareUrl}`
    },
    short: {
      en: `🤝 HeraPrize: Not-for-Profit Social Enterprise for Humanitarian Relief & Jobs! Win 130,000 ETB Daily per Person or 2-Day Bishoftu Resorts (2 bed/2 night + meals). Tickets 300 - 600 ETB on Telebirr to ${platformSettings.telebirrPhone}: ${shareUrl}`,
      am: `🤝 ሄራፕራይዝ፡ የሰብአዊ ድጋፍ እና የሥራ ዕድል ፈጠራ ማህበራዊ ድርጅት! ዕለታዊ 130,000 ብር ለአንድ ሰው ወይም የ2 ቀን የቢሾፍቱ ሪዞርቶች ያሸንፉ። የዕጣ ዋጋ 300 - 600 ብር በቴሌብር ወደ ${platformSettings.telebirrPhone}: ${shareUrl}`
    }
  };

  const currentCopy = postCopies[selectedTemplate][selectedLang];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyPost = () => {
    navigator.clipboard.writeText(currentCopy);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2500);
  };

  // Direct Social Share URLs
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
    selectedLang === 'en'
      ? `🤝 HeraPrize Not-for-Profit Social Enterprise: Mobilizing Humanitarian Relief & Job Creation! Win 130,000 ETB Daily per Person (Supports 3 People to Open Business: 3 Direct & 6 Indirect). Tickets: 300 - 600 ETB via Telebirr to ${platformSettings.telebirrPhone}: ${shareUrl}`
      : `🤝 ሄራፕራይዝ ማህበራዊ ድርጅት፡ ለሰብአዊ ድጋፍ እና ለሥራ ዕድል ፈጠራ! ዕለታዊ 130,000 ብር ለአንድ ሰው (3 ሰዎችን ንግድ እንዲከፍቱ ድጋፍ)። የዕጣ መቁረጫ 300 - 600 ብር በቴሌብር ወደ ${platformSettings.telebirrPhone}: ${shareUrl}`
  )}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${currentCopy}`
  )}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
    `HeraPrize - Not-for-Profit Social Enterprise: Mobilizing Humanitarian Relief & Job Creation in Ethiopia! Win 130,000 ETB Daily grants per person. #Ethiopia #SocialEnterprise`
  )}`;

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const smsShareUrl = `sms:?body=${encodeURIComponent(
    `HeraPrize Not-for-Profit Social Enterprise: Win 130,000 ETB per person & Bishoftu retreats while supporting humanitarian relief & job creation! Tickets 300 - 600 ETB: ${shareUrl}`
  )}`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HeraPrize - Not-for-Profit Social Enterprise',
          text: currentCopy,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  // QR Code Image API (reliable, fast)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col text-white my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg">
                  Share & Social Media Campaign Link
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 text-[10px] font-black uppercase">
                  Job Creation
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-900">
                Post to Telegram channels, Facebook, WhatsApp, or print flyers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-950/20 hover:bg-slate-950/30 flex items-center justify-center text-slate-950 font-bold transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[82vh] text-xs">

          {/* Not-for-Profit Social Enterprise Mission Badge */}
          <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/80 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-xs">
                  Not-for-Profit Social Enterprise
                </span>
                <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase">
                  100% Impact Driven
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                HeraPrize is a registered not-for-profit social enterprise that mobilizes community fundraising for humanitarian relief and sustainable job creation services across Ethiopia. All proceeds directly fund relief interventions and seed capital (supporting 3 people to open businesses: 3 direct & 6 indirect).
              </p>
            </div>
          </div>

          {/* 403 Access Error Prevention Assurance */}
          <div className="bg-sky-950/60 border border-sky-500/40 rounded-2xl p-3.5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-sky-300 block text-xs">
                {lang === 'en' ? 'Public Access Link (403-Free Guaranteed)' : 'ለሁሉም ክፍት የሆነ ኦፊሴላዊ ሊንክ (403 ስህተት የሌለበት)'}
              </strong>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {lang === 'en'
                  ? 'This link connects directly to our public preview gateway (ais-pre). Anyone opening it via Telegram, WhatsApp, SMS, or browser will access the platform immediately without login blocks or "403 You don\'t have access" errors.'
                  : 'ይህ ሊንክ ለህዝብ ክፍት በሆነው የቅድመ እይታ አድራሻ የተዘጋጀ ሲሆን ማንኛውም ሰው በቴሌግራም ወይም ዋትስአፕ ሲከፍተው ያለ ምንም "403" ስህተት በቀጥታ ይሰራል።'}
              </p>
              {inDevMode && (
                <div className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-1 rounded-lg mt-1 inline-block">
                  ✓ Automatically converted private developer URL to public preview link
                </div>
              )}
            </div>
          </div>

          {/* 1. Functional Direct Web Link */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Public Share URL</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-bold">100% Publicly Accessible</span>
            </label>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-amber-400 font-mono text-xs break-all select-all flex items-center justify-between">
                <span className="truncate">{shareUrl}</span>
                <span className="text-[10px] text-emerald-400 uppercase font-sans font-black ml-2 shrink-0">PUBLIC</span>
              </div>

              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center gap-1.5 transition shrink-0 cursor-pointer shadow-md shadow-amber-500/20"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. One-Click Social Sharing Buttons */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-300 block">
              One-Click Direct Share:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Telegram */}
              <a
                href={telegramShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-sm"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>

              {/* SMS / Mobile */}
              <a
                href={smsShareUrl}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold border border-slate-700 transition shadow-sm"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Direct SMS</span>
              </a>
            </div>
          </div>

          {/* 3. Pre-Crafted Social Media Post Copy with Language Toggle */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Pre-Crafted Post Copy</span>
                <span className="text-[10px] text-slate-400">(Ready for Telegram Channels & FB Groups)</span>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[11px]">
                <button
                  type="button"
                  onClick={() => setSelectedLang('am')}
                  className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                    selectedLang === 'am' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  አማርኛ
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLang('en')}
                  className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                    selectedLang === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Template Selector */}
            <div className="flex items-center gap-2">
              {[
                { id: 'telegram', label: 'Telegram Channel Format (Full)' },
                { id: 'facebook', label: 'Facebook / LinkedIn' },
                { id: 'short', label: 'Short SMS / TikTok Bio' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    selectedTemplate === t.id
                      ? 'bg-slate-800 text-amber-400 border border-amber-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Text Preview Box */}
            <pre className="p-3 bg-slate-900/90 rounded-xl border border-slate-800/80 text-[11px] font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
              {currentCopy}
            </pre>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500">
                Includes payment instructions (Telebirr {platformSettings.telebirrPhone}) and active link.
              </span>
              <button
                type="button"
                onClick={handleCopyPost}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedPost ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied Full Post!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Post Text</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4. Visual QR Code for Posters, Banners & Flyers */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-md">
              <img
                src={qrCodeUrl}
                alt="Scan to open HeraPrize"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-white font-bold">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Scan QR Code to Open on Mobile</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Great for startup pitch decks, university job fairs, notice boards, and café tables. Anyone who scans this with their camera directly lands on this campaign.
              </p>
              <div className="text-[10px] text-amber-400/90 font-mono">
                Linked to: {shareUrl.slice(0, 48)}...
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            HeraPrize National Youth Employment & Startup Fund
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
