import React, { useState } from 'react';
import { UserProfile, TicketPurchase } from '../types/prize';
import { SuccessStoriesSection } from './SuccessStoriesSection';
import { 
  Ticket, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trophy, 
  QrCode, 
  Share2, 
  MapPin, 
  Search, 
  Sparkles, 
  ArrowRight, 
  Upload, 
  Smartphone,
  Video,
  Play,
  HeartHandshake
} from 'lucide-react';

interface SuccessHistoryViewProps {
  currentUser: UserProfile | null;
  onExplorePrizes: () => void;
  onOpenAuth: () => void;
  onOpenUploadInvoice?: () => void;
  lang: 'en' | 'am';
}

export const SuccessHistoryView: React.FC<SuccessHistoryViewProps> = ({
  currentUser,
  onExplorePrizes,
  onOpenAuth,
  onOpenUploadInvoice,
  lang
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'stories' | 'tickets'>('stories');
  const [selectedTicket, setSelectedTicket] = useState<TicketPurchase | null>(null);

  const tickets = currentUser?.tickets || [];
  const activeCount = tickets.filter(t => t.status === 'active').length;
  const wonCount = tickets.filter(t => t.status === 'won').length;

  return (
    <div className="space-y-6 text-white">
      
      {/* Top Switcher Sub-Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveSubTab('stories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeSubTab === 'stories'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{lang === 'en' ? '🌟 Success Stories (Video Testimonials)' : '🌟 የስኬት ታሪኮች (የቪዲዮ ምስክርነቶች)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('tickets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeSubTab === 'tickets'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>{lang === 'en' ? '🎟️ My Ticket Archive' : '🎟️ የእኔ ዕጣዎች'}</span>
            {currentUser && currentUser.tickets.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                activeSubTab === 'tickets' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
              }`}>
                {currentUser.tickets.length}
              </span>
            )}
          </button>
        </div>

        {activeSubTab === 'tickets' && onOpenUploadInvoice && (
          <button
            type="button"
            onClick={onOpenUploadInvoice}
            className="px-3.5 py-2 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border border-sky-400/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-sky-300" />
            <span>Upload Telebirr Invoice</span>
          </button>
        )}
      </div>

      {/* VIEW 1: SUCCESS STORIES (VEO VIDEO TESTIMONIALS FROM ADAMA, ADDIS ABABA, JIMMA) */}
      {activeSubTab === 'stories' && (
        <div className="space-y-6">
          <SuccessStoriesSection
            lang={lang}
            onExplorePrizes={onExplorePrizes}
          />

          {/* Quick Bar to Switch to Player Ticket Archive */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Ticket className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">
                {currentUser 
                  ? `You have ${tickets.length} ticket(s) in your archive.` 
                  : 'Already bought tickets? Log in to view your digital stubs.'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  onOpenAuth();
                } else {
                  setActiveSubTab('tickets');
                }
              }}
              className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
            >
              {currentUser ? 'View My Tickets Archive →' : 'Log in to My Tickets →'}
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: MY TICKET ARCHIVE */}
      {activeSubTab === 'tickets' && (
        <>
          {!currentUser ? (
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-10 text-center text-white space-y-4 max-w-xl mx-auto my-6 shadow-2xl">
              <Ticket className="w-16 h-16 text-amber-400 mx-auto" />
              <h3 className="text-xl font-black">
                {lang === 'en' ? 'Player Login Required' : 'የተጠቃሚ መለያ ያስፈልጋል'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log in with your Ethiopian phone number as username to view your active raffle tickets, winning history, and claim prize vouchers.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onOpenAuth}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {lang === 'en' ? 'Log In With Phone Number' : 'በስልክ ቁጥር ይግቡ'}
                </button>
                <button
                  onClick={() => setActiveSubTab('stories')}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition border border-slate-700 cursor-pointer"
                >
                  Back to Success Stories
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header & Stats Banner */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase mb-2">
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Official Player Ticket Archive</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                      {lang === 'en' ? 'My Tickets & Success History' : 'የእኔ ዕጣዎችና የስኬት ታሪክ'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Registered Phone / Username: <strong className="text-white font-mono">{currentUser.phone}</strong>
                    </p>
                  </div>

                  <button
                    onClick={onExplorePrizes}
                    className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-md shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Enter More Lucky Draws' : 'ተጨማሪ ዕጣ ይግዙ'}</span>
                  </button>
                </div>

                {/* Quick KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs">
                  <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Total Tickets Purchased</span>
                    <span className="text-xl font-black text-white mt-0.5 block font-mono">{tickets.length}</span>
                  </div>
                  <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Active in Upcoming Draws</span>
                    <span className="text-xl font-black text-emerald-400 mt-0.5 block font-mono">{activeCount}</span>
                  </div>
                  <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Prizes Won</span>
                    <span className="text-xl font-black text-amber-400 mt-0.5 block font-mono">{wonCount}</span>
                  </div>
                  <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Wallet Balance</span>
                    <span className="text-xl font-black text-white mt-0.5 block font-mono">{currentUser.walletBalanceETB} ETB</span>
                  </div>
                </div>
              </div>

              {/* Telebirr Invoice Upload Callout Banner */}
              {onOpenUploadInvoice && (
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-amber-950 border border-sky-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <strong className="text-white text-sm block">
                        {lang === 'en' ? 'Already Transferred via Telebirr (0910442314)?' : 'በቴሌብር (0910442314) ክፍያ ፈጽመዋል?'}
                      </strong>
                      <p className="text-slate-300 text-xs mt-0.5">
                        {lang === 'en' 
                          ? 'Upload your Telebirr invoice screenshot slip to assign lucky numbers and issue your tickets immediately.' 
                          : 'የቴሌብር ደረሰኝ ስክሪንሾትዎን በመጫን የዕጣ ቁጥሮችዎን በቅጽበት ይቀበሉ።'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenUploadInvoice}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs transition shadow-md shadow-sky-600/25 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{lang === 'en' ? 'Upload Telebirr Invoice' : 'ቴሌብር ደረሰኝ ጫን'}</span>
                  </button>
                </div>
              )}

              {/* Tickets List */}
              <div className="space-y-3">
                {tickets.length === 0 ? (
                  <div className="bg-slate-900/60 p-12 rounded-3xl border border-slate-800 text-center space-y-3">
                    <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
                    <h4 className="text-base font-bold text-slate-300">
                      {lang === 'en' ? 'No Tickets Purchased Yet' : 'እስካሁን የተገዛ ዕጣ የለም'}
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      {lang === 'en'
                        ? "Join tonight's 130,000 ETB daily startup prize draw per person or Bishoftu retreat raffle for 300 - 600 ETB!"
                        : 'የዛሬውን 130,000 ብር ዕለታዊ የንግድ መነሻ ካፒታል ወይም የቢሾፍቱ እረፍት ዕጣ ከ300 - 600 ብር ይቁረጡ!'}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={onExplorePrizes}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer"
                      >
                        {lang === 'en' ? 'Explore Prizes' : 'ዕጣዎችን ይመልከቱ'}
                      </button>
                      {onOpenUploadInvoice && (
                        <button
                          onClick={onOpenUploadInvoice}
                          className="px-5 py-2.5 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border border-sky-400/40 font-bold text-xs transition cursor-pointer"
                        >
                          {lang === 'en' ? 'Upload Existing Telebirr Slip' : 'ያለዎትን ደረሰኝ ይጫኑ'}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  tickets.map((tkt) => (
                    <div
                      key={tkt.id}
                      className="bg-slate-900 p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                          <Ticket className="w-6 h-6 text-amber-400" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black text-white font-mono tracking-wider">
                              {tkt.ticketCode}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700 font-mono">
                              Lucky #{tkt.luckyNumber}
                            </span>
                            {tkt.status === 'won' && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                                🏆 WON
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-slate-300 font-bold">
                            {tkt.prizeTitle}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-amber-400" />
                              {tkt.venueLocation}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              Draw: {new Date(tkt.drawDate).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>Paid: <strong className="text-white font-mono">{tkt.totalCostETB} ETB</strong> via {tkt.paymentMethod}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedTicket(tkt)}
                          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>View Digital Ticket</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* DIGITAL RAFFLE TICKET MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-sm w-full shadow-2xl border-2 border-amber-500/40 overflow-hidden text-center text-white relative">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs"
            >
              ✕
            </button>

            <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-950 p-4 font-black">
              <div className="text-[10px] tracking-widest uppercase">Official Digital Raffle Stub</div>
              <div className="text-xl mt-0.5">HERAPRIZE ሄራ</div>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Unique Ticket Number</div>
                <div className="text-xl font-mono font-black text-amber-400 tracking-wider mt-0.5">
                  {selectedTicket.ticketCode}
                </div>
              </div>

              <div className="text-left space-y-1.5 text-xs text-slate-300">
                <div><strong>Prize:</strong> {selectedTicket.prizeTitle}</div>
                <div><strong>Venue:</strong> {selectedTicket.venueLocation}</div>
                <div><strong>Draw Time:</strong> {new Date(selectedTicket.drawDate).toLocaleString()}</div>
                <div><strong>Player Phone:</strong> {currentUser?.phone}</div>
                <div><strong>Ref:</strong> <span className="font-mono">{selectedTicket.transactionRef}</span></div>
              </div>

              {/* QR Mockup */}
              <div className="w-32 h-32 bg-white rounded-2xl mx-auto p-2 flex items-center justify-center text-slate-900">
                <QrCode className="w-24 h-24 text-slate-900" />
              </div>

              <div className="text-[10px] text-slate-500">
                Supervised by National Lottery Administration #9941
              </div>

              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
