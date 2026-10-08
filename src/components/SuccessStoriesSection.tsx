import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  MapPin, 
  Briefcase, 
  Users, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Coffee, 
  UtensilsCrossed, 
  ShoppingBag, 
  ExternalLink, 
  MessageSquare, 
  X, 
  Video, 
  Share2, 
  Heart, 
  Clock, 
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

// Imported generated video thumbnails
import adamaCoffeeImg from '../assets/images/adama_coffee_shop_1791459462097.jpg';
import addisRestaurantImg from '../assets/images/addis_restaurant_1791459480020.jpg';
import jimmaRetailImg from '../assets/images/jimma_retail_shop_1791459497877.jpg';

export interface SuccessStory {
  id: string;
  winnerName: string;
  winnerNameAm: string;
  city: 'Adama' | 'Addis Ababa' | 'Jimma';
  cityAm: string;
  businessType: 'Coffee Shop' | 'Restaurant' | 'Retail Shop';
  businessTypeAm: string;
  businessName: string;
  businessNameAm: string;
  prizeGrantETB: number;
  directJobsCreated: number;
  indirectJobsCreated: number;
  monthlyRevenueETB: string;
  videoDuration: string;
  durationSeconds: number;
  thumbnailUrl: string;
  quoteAm: string;
  quoteEn: string;
  fullStoryAm: string;
  fullStoryEn: string;
  businessLocation: string;
  veoGeneratedLabel: string;
  tags: string[];
}

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'adama-coffee',
    winnerName: 'Almaz Bekele',
    winnerNameAm: 'አልማዝ በቀለ',
    city: 'Adama',
    cityAm: 'አዳማ (ናዝሬት)',
    businessType: 'Coffee Shop',
    businessTypeAm: 'ቡና ቤትና ካፌ',
    businessName: 'Harar Aroma Specialty Coffee & Pastry',
    businessNameAm: 'ሀረር አሮማ ባህላዊና ዘመናዊ የቡና ካፌ',
    prizeGrantETB: 130000,
    directJobsCreated: 4,
    indirectJobsCreated: 6,
    monthlyRevenueETB: '95,000+ ETB',
    videoDuration: '02:15',
    durationSeconds: 135,
    thumbnailUrl: adamaCoffeeImg,
    quoteAm: '«ሄራፕራይዝ በሰጠኝ የ130,000 ብር መነሻ ካፒታል እና ባቀረብኩት የንግድ ዕቅድ አማካኝነት በአዳማ ከተማ የቡና ቤቴን ከፍቼ ዛሬ 4 ወጣቶችን ቀጥረናል። እውነተኛ የህይወት ለውጥ ነው!»',
    quoteEn: 'With the 130,000 ETB seed capital from HeraPrize and the business proposal mandate, I opened my specialty coffee shop in Adama and currently employ 4 young baristas. It is truly life-changing!',
    fullStoryAm: 'አልማዝ በቀለ በአዳማ ከተማ ነዋሪ ስትሆን ለዓመታት የራሷን የቡና ካፌ የመክፈት ህልም ነበራት። በሄራፕራይዝ ዕለታዊ ዕጣ የ130,000 ብር መነሻ ካፒታል ካሸነፈች በኋላ ጠንካራ የንግድ ዕቅድ (Business Proposal) አቅርባ ወዲያውኑ ወደ ስራ ገባች። በአሁኑ ወቅት በአዳማ መሃል ከተማ በሚገኘው ካፌዋ 4 ቋሚ ባሬስታዎችና አገልጋዮች የተቀጠሩ ሲሆን፣ ከአካባቢው ገበሬዎች በቀጥታ የቡና ጥሬ እቃ በመግዛት ለ6 ተጨማሪ አቅራቢዎች ገቢ ፈጥራለች።',
    fullStoryEn: 'Almaz Bekele, a resident of Adama, long dreamed of opening her own coffee café. After winning the 130,000 ETB daily seed prize from HeraPrize, she submitted her 14-day business proposal and immediately set up shop. Today, her café in central Adama employs 4 full-time baristas and waitresses, and sources raw beans directly from local farmers, supporting 6 indirect supply livelihoods.',
    businessLocation: 'Posta Bet Area, Central Adama (ፖስታ ቤት አካባቢ፣ አዳማ)',
    veoGeneratedLabel: 'Veo Video Testimonial • Adama Coffee Shop',
    tags: ['☕ Specialty Coffee', '🌱 4 Direct Jobs', '🎯 NLA Verified']
  },
  {
    id: 'addis-restaurant',
    winnerName: 'Yared Tadesse',
    winnerNameAm: 'ያሬድ ታደሰ',
    city: 'Addis Ababa',
    cityAm: 'አዲስ አበባ (ቦሌ)',
    businessType: 'Restaurant',
    businessTypeAm: 'ምግብ ቤት',
    businessName: 'Bole Gourmet Traditional & Modern Kitchen',
    businessNameAm: 'ቦሌ ባህላዊና ዘመናዊ ምግብ ቤት',
    prizeGrantETB: 130000,
    directJobsCreated: 5,
    indirectJobsCreated: 8,
    monthlyRevenueETB: '140,000+ ETB',
    videoDuration: '02:40',
    durationSeconds: 160,
    thumbnailUrl: addisRestaurantImg,
    quoteAm: '«የሄራፕራይዝ ውድድር እንደ ሌሎች አይደለም፤ ካሸነፍኩ በኋላ የንግድ ዕቅድ (Business Proposal) አቅርቤ ወዲያውኑ ምግብ ቤቴን ጀመርኩ። ዛሬ ቤተሰቦቼንና ሰራተኞቼን በኩራት አስተዳድራለሁ።»',
    quoteEn: 'HeraPrize is different from ordinary lotteries; after winning, I submitted my business proposal and immediately launched our restaurant. Today I proudly support my family and full staff.',
    fullStoryAm: 'ያሬድ ታደሰ በአዲስ አበባ በምግብ ዝግጅት ዘርፍ ረዳት ሆኖ ይሰራ የነበረ ታታሪ ወጣት ነው። የ130,000 ብር ሽልማቱን ከተቀበለ በኋላ በአዲስ አበባ ቦሌ መድኃኔዓለም አካባቢ ንጹህና ተወዳጅ ምግብ ቤት ከፈተ። በአሁኑ ሰዓት 5 ሼፎችና አስተናጋጆችን በቋሚነት የቀጠረ ሲሆን፣ ከገበሬዎችና ቄራዎች ጋር በመተሳሰር ለ8 ተጨማሪ አቅራቢዎች የቀን ገቢ ያረጋግጣል።',
    fullStoryEn: 'Yared Tadesse worked as a kitchen assistant in Addis Ababa before his life transformed. Winning the 130,000 ETB seed grant allowed him to execute his dream restaurant near Bole Medhanialem. Today he employs 5 kitchen chefs and servers, purchasing organic teff and produce from 8 regional agricultural partner suppliers.',
    businessLocation: 'Bole Medhanialem, Addis Ababa (ቦሌ መድኃኔዓለም፣ አዲስ አበባ)',
    veoGeneratedLabel: 'Veo Video Testimonial • Addis Ababa Kitchen',
    tags: ['🍲 Traditional Kitchen', '👨‍🍳 5 Direct Staff', '🏆 Job Creation Winner']
  },
  {
    id: 'jimma-retail',
    winnerName: 'Fatuma Kedir',
    winnerNameAm: 'ፋጡማ ከድር',
    city: 'Jimma',
    cityAm: 'ጅማ (መርካቶ)',
    businessType: 'Retail Shop',
    businessTypeAm: 'የችርቻሮ ሱቅ',
    businessName: 'Abba Jifar Retail Clothing & Fabric Mart',
    businessNameAm: 'አባ ጅፋር የችርቻሮ አልባሳትና ሸቀጥ ሱቅ',
    prizeGrantETB: 130000,
    directJobsCreated: 3,
    indirectJobsCreated: 7,
    monthlyRevenueETB: '110,000+ ETB',
    videoDuration: '01:58',
    durationSeconds: 118,
    thumbnailUrl: jimmaRetailImg,
    quoteAm: '«በጅማ መርካቶ የችርቻሮ ሱቅ መክፈት የረጅም ጊዜ ህልሜ ነበር። በሄራፕራይዝ ዕጣ ባገኘሁት ድጋፍ ሱቄን ሙሉ በሙሉ አደራጅቼ ለ3 እህቶቼ ቋሚ የስራ ዕድል ፈጥሬያለሁ።»',
    quoteEn: 'Opening a retail shop in Jimma Merkato was my dream for years. With the HeraPrize seed fund, I stocked quality fabrics and established permanent employment for 3 young women.',
    fullStoryAm: 'ፋጡማ ከድር በጅማ ከተማ የችርቻሮ ንግድ ለመጀመር የገንዘብ እጥረት ገጥሟት ነበር። የሄራፕራይዝን የ130,000 ብር ፈንድ ካሸነፈች በኋላ የንግድ ዕቅዷ ተቀባይነት አግኝቶ በጅማ መርካቶ የዘመናዊ አልባሳትና ጨርቃጨርቅ ሱቅ ከፈተች። ሱቋ በአሁኑ ጊዜ 3 ሻጮችን የቀጠረ ሲሆን በሳምንት ከ150 በላይ ደንበኞችን ያስተናግዳል።',
    fullStoryEn: 'Fatuma Kedir in Jimma faced capital shortages to launch her retail boutique. Winning the HeraPrize 130,000 ETB fund gave her the inventory boost to open her fashion and fabric store in Jimma Merkato. She employs 3 sales clerks and serves over 150 retail customers weekly.',
    businessLocation: 'Merkato Commercial Zone, Jimma (መርካቶ የንግድ ቀጠና፣ ጅማ)',
    veoGeneratedLabel: 'Veo Video Testimonial • Jimma Retail Mart',
    tags: ['🛍️ Retail & Fabrics', '👩‍💼 3 Women Employed', '📈 Sustainable Enterprise']
  }
];

interface SuccessStoriesSectionProps {
  lang: 'en' | 'am';
  onExplorePrizes: () => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({
  lang,
  onExplorePrizes
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Adama' | 'Addis Ababa' | 'Jimma'>('all');
  const [activeStory, setActiveStory] = useState<SuccessStory>(SUCCESS_STORIES[0]);
  
  // Video playback simulation state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [currentProgress, setCurrentProgress] = useState<number>(24); // percent
  const [isCinemaModalOpen, setIsCinemaModalOpen] = useState<boolean>(false);
  const [modalStory, setModalStory] = useState<SuccessStory | null>(null);

  // Playback timer ticker simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const filteredStories = selectedFilter === 'all'
    ? SUCCESS_STORIES
    : SUCCESS_STORIES.filter(s => s.city === selectedFilter);

  const handleSelectStory = (story: SuccessStory) => {
    setActiveStory(story);
    setIsPlaying(false);
    setCurrentProgress(15);
  };

  const handleOpenCinemaModal = (story: SuccessStory) => {
    setModalStory(story);
    setIsCinemaModalOpen(true);
    setIsPlaying(true);
  };

  // Helper to get formatted elapsed seconds
  const getElapsedSeconds = (percent: number, totalSeconds: number) => {
    const elapsed = Math.floor((percent / 100) * totalSeconds);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SECTION HEADER & MISSION BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/80 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase">
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'Veo Video Testimonials Showcase' : 'የቪኦ (Veo) የቪዲዮ ምስክርነቶች'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'en' 
                ? 'Success Stories: Past Winners Who Built Businesses' 
                : 'የስኬት ታሪኮች፡ የንግድ ድርጅት የከፈቱ የቀድሞ አሸናፊዎች'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === 'en'
                ? 'Watch inspiring video testimonials in Amharic from winners in Adama, Addis Ababa, and Jimma who leveraged 130,000 ETB seed grants into thriving Coffee Shops, Restaurants, and Retail Stores while creating dozens of local jobs.'
                : 'የ130,000 ብር የዕድል መነሻ ካፒታል ተጠቅመው በአዳማ፣ በአዲስ አበባ እና በጅማ የቡና ቤት፣ የምግብ ቤት እና የችርቻሮ ሱቆችን የከፈቱ እና በርካታ የስራ እድሎችን የፈጠሩ የቀድሞ አሸናፊዎች አማርኛ የቪዲዮ ምስክርነቶችን ይመልከቱ።'}
            </p>
          </div>

          {/* Aggregate Impact Highlights */}
          <div className="grid grid-cols-3 gap-2.5 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 shrink-0 text-center">
            <div className="p-2">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Enterprises</span>
              <span className="text-xl font-black text-amber-400 font-mono">3 Opened</span>
              <span className="text-[9px] text-slate-500 block">Adama, AA, Jimma</span>
            </div>
            <div className="p-2 border-x border-slate-800">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Direct Jobs</span>
              <span className="text-xl font-black text-emerald-400 font-mono">12 Staff</span>
              <span className="text-[9px] text-emerald-400/80 block">Youth Hired</span>
            </div>
            <div className="p-2">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Indirect Jobs</span>
              <span className="text-xl font-black text-sky-400 font-mono">21 Supply</span>
              <span className="text-[9px] text-sky-400/80 block">Local Farmers</span>
            </div>
          </div>
        </div>

        {/* CITY FILTER BUTTONS */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-800/80 mt-6 text-xs">
          <span className="text-slate-400 font-bold mr-1">
            {lang === 'en' ? 'Filter by Location & Business:' : 'በከተማና በንግድ አይነት ይምረጡ፡'}
          </span>

          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <span>{lang === 'en' ? '🌟 All Cities (3 Stories)' : '🌟 ሁሉም ከተሞች (3 ታሪኮች)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('Adama')}
            className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'Adama'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>Adama • Coffee Shop (አዳማ - ቡና ቤት)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('Addis Ababa')}
            className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'Addis Ababa'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-rose-400" />
            <span>Addis Ababa • Restaurant (አዲስ አበባ - ምግብ ቤት)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('Jimma')}
            className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'Jimma'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-sky-400" />
            <span>Jimma • Retail Shop (ጅማ - የችርቻሮ ሱቅ)</span>
          </button>
        </div>
      </div>

      {/* MAIN FEATURED VEO VIDEO PLAYER SHOWCASE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Featured Video Player */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
          
          {/* Video Viewport Container */}
          <div className="relative aspect-video w-full bg-slate-950 overflow-hidden group select-none">
            <img 
              src={activeStory.thumbnailUrl} 
              alt={activeStory.businessName}
              className={`w-full h-full object-cover transition duration-700 ${
                isPlaying ? 'scale-105 filter brightness-105' : 'scale-100 filter brightness-90'
              }`}
            />

            {/* Ambient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

            {/* Veo AI Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/40 text-[10px] font-black tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Veo Video Testimonial</span>
              </span>

              <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                HD 1080p
              </span>
            </div>

            {/* City & Business Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-xl bg-slate-950/85 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1 shadow-md">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>{activeStory.city} ({activeStory.cityAm})</span>
              </span>
            </div>

            {/* Center Play / Pause Floating Trigger */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/50 hover:scale-110 transition cursor-pointer group-hover:scale-105"
                title={isPlaying ? 'Pause Video' : 'Play Video'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-slate-950" />
                ) : (
                  <Play className="w-8 h-8 ml-1 fill-slate-950" />
                )}
              </button>
            </div>

            {/* Animated Audio Equalizer when playing */}
            {isPlaying && (
              <div className="absolute top-14 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2 text-[10px] text-amber-400 font-bold">
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-amber-400 animate-pulse" />
                  <span className="w-0.5 h-3 bg-amber-400 animate-bounce" />
                  <span className="w-0.5 h-1.5 bg-amber-400 animate-pulse" />
                  <span className="w-0.5 h-3 bg-amber-400 animate-bounce" />
                </div>
                <span>ድምጽ፡ አማርኛ (Audio: Amharic)</span>
              </div>
            )}

            {/* Bottom Subtitles / Caption Overlay */}
            {showSubtitles && (
              <div className="absolute bottom-12 left-4 right-4 text-center pointer-events-none">
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs text-amber-200 max-w-xl mx-auto shadow-xl">
                  <p className="font-semibold">{activeStory.quoteAm}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 italic">"{activeStory.quoteEn}"</p>
                </div>
              </div>
            )}

            {/* Player Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex flex-col gap-1.5">
              
              {/* Progress Scrubber Bar */}
              <div 
                className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer group/bar relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  setCurrentProgress(Math.round(pos * 100));
                }}
              >
                <div 
                  className="bg-amber-400 h-full rounded-full transition-all relative"
                  style={{ width: `${currentProgress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/bar:opacity-100" />
                </div>
              </div>

              {/* Lower Buttons Strip */}
              <div className="flex items-center justify-between text-xs text-slate-300 pt-0.5">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-amber-400 font-bold transition cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentProgress(0)}
                    className="hover:text-amber-400 transition cursor-pointer"
                    title="Restart"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <span className="font-mono text-[11px] text-slate-400">
                    {getElapsedSeconds(currentProgress, activeStory.durationSeconds)} / {activeStory.videoDuration}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                      showSubtitles ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                    title="Toggle Amharic / English Subtitles"
                  >
                    CC
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-amber-400 transition cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenCinemaModal(activeStory)}
                    className="hover:text-amber-400 transition cursor-pointer"
                    title="Fullscreen Cinema Mode"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Video Metadata & Story Summary */}
          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span>{activeStory.businessName}</span>
                  </h3>
                  <span className="text-xs text-amber-400 font-bold">
                    {activeStory.businessNameAm}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Seed Grant</span>
                  <span className="text-sm font-black text-amber-400 font-mono">
                    {activeStory.prizeGrantETB.toLocaleString()} ETB
                  </span>
                </div>
              </div>

              {/* Winner Info Badge */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-base shrink-0">
                    {activeStory.winnerName.charAt(0)}
                  </div>
                  <div>
                    <strong className="text-white text-xs block">
                      {activeStory.winnerName} ({activeStory.winnerNameAm})
                    </strong>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{activeStory.businessLocation}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                    {activeStory.directJobsCreated} Direct Jobs
                  </span>
                </div>
              </div>

              {/* Full Story Paragraph */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'en' ? activeStory.fullStoryEn : activeStory.fullStoryAm}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Business Registration (በንግድ ቢሮ የተመዘገበ)</span>
              </div>

              <button
                type="button"
                onClick={() => handleOpenCinemaModal(activeStory)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Full Testimonial Cinema Mode</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Video Playlists of All 3 Locations */}
        <div className="lg:col-span-5 space-y-4 flex flex-col">
          <div className="flex items-center justify-between pb-1">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Available Winner Testimonials ({filteredStories.length})</span>
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">Amharic Audio (አማርኛ)</span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {filteredStories.map((story) => {
              const isCurrent = story.id === activeStory.id;

              return (
                <div
                  key={story.id}
                  onClick={() => handleSelectStory(story)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer relative group ${
                    isCurrent
                      ? 'bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                      : 'bg-slate-950 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    
                    {/* Thumbnail with duration badge */}
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                      <img 
                        src={story.thumbnailUrl} 
                        alt={story.businessName}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                      <div className="absolute inset-0 bg-slate-950/30" />
                      
                      {/* Play overlay button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                          isCurrent ? 'bg-amber-500 text-slate-950' : 'bg-slate-950/70 text-white group-hover:bg-amber-400 group-hover:text-slate-950'
                        }`}>
                          <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                        </div>
                      </div>

                      <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-slate-950/90 text-[9px] font-mono font-bold text-white">
                        {story.videoDuration}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-900 text-emerald-400 border border-emerald-500/30">
                          {story.city} ({story.cityAm})
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">
                          {story.businessType}
                        </span>
                      </div>

                      <h5 className="font-extrabold text-white text-xs truncate">
                        {story.winnerName} — {story.businessName}
                      </h5>

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                        {story.quoteAm}
                      </p>

                      <div className="flex items-center gap-2 pt-1 text-[10px]">
                        <span className="text-emerald-400 font-bold font-mono">
                          ✓ {story.directJobsCreated} Direct Jobs
                        </span>
                        <span>•</span>
                        <span className="text-slate-400 font-mono">
                          Rev: {story.monthlyRevenueETB}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct CTA Box to enter the next competition */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-emerald-500/10 border border-amber-500/40 text-center space-y-2">
            <h5 className="font-black text-white text-xs">
              {lang === 'en' 
                ? 'Ready to Open Your Own Business in Ethiopia?' 
                : 'የራስዎን የንግድ ድርጅት ለመክፈት ዝግጁ ነዎት?'}
            </h5>
            <p className="text-[11px] text-slate-300">
              {lang === 'en'
                ? 'Join tonight’s 130,000 ETB daily startup prize draw per person (Tickets: 300 - 600 ETB) and submit your job creation proposal!'
                : 'የዛሬውን የ130,000 ብር ዕለታዊ የንግድ መነሻ ካፒታል ዕጣ ይቁረጡ (የቲኬት ዋጋ፡ 300 - 600 ብር)!'}
            </p>
            <button
              type="button"
              onClick={onExplorePrizes}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'en' ? 'Get Tickets (300 - 600 ETB)' : 'ዕጣ ይቁረጡ (300 - 600 ብር)'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* DETAILED CINEMA MODAL PLAYER */}
      {isCinemaModalOpen && modalStory && (
        <div 
          onClick={() => setIsCinemaModalOpen(false)}
          className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col text-white max-h-[92vh]"
          >
            {/* Modal Top Bar */}
            <div className="bg-slate-950 px-6 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  Veo Video Testimonial Player • {modalStory.city} ({modalStory.cityAm})
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsCinemaModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer transition font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cinema Video Area */}
            <div className="relative aspect-video w-full bg-black shrink-0 overflow-hidden group">
              <img 
                src={modalStory.thumbnailUrl} 
                alt={modalStory.businessName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-9 h-9 fill-slate-950" />
                  ) : (
                    <Play className="w-9 h-9 ml-1 fill-slate-950" />
                  )}
                </button>
              </div>

              {/* Subtitles Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <div className="inline-block px-5 py-2.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs sm:text-sm text-amber-200 max-w-2xl shadow-xl">
                  <p className="font-bold">{modalStory.quoteAm}</p>
                  <p className="text-[11px] text-slate-300 mt-1 italic">"{modalStory.quoteEn}"</p>
                </div>
              </div>
            </div>

            {/* Story Details Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-lg font-black text-white">
                    {modalStory.winnerName} ({modalStory.winnerNameAm})
                  </h4>
                  <p className="text-xs text-amber-400 font-bold">
                    {modalStory.businessName} ({modalStory.businessNameAm})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
                    {modalStory.directJobsCreated} Direct Youth Jobs
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold text-xs">
                    {modalStory.indirectJobsCreated} Supply Chain Jobs
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <strong className="text-white text-xs block">
                  {lang === 'en' ? 'Full Video Case Study & Business Evolution:' : 'ሙሉ የስኬት ጉዞና የንግድ ድርጅት ዝርዝር፡'}
                </strong>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {lang === 'en' ? modalStory.fullStoryEn : modalStory.fullStoryAm}
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px]">
                <div>
                  <span className="text-slate-500 block">Location</span>
                  <strong className="text-white">{modalStory.city}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Industry</span>
                  <strong className="text-amber-400">{modalStory.businessType}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Initial Seed Grant</span>
                  <strong className="text-white font-mono">{modalStory.prizeGrantETB} ETB</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Estimated Revenue</span>
                  <strong className="text-emerald-400 font-mono">{modalStory.monthlyRevenueETB}</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCinemaModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  Close Cinema Mode
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsCinemaModalOpen(false);
                    onExplorePrizes();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Join Next Prize Draw (300 - 600 ETB)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
