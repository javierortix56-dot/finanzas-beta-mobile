import React from 'react';
import { X, Share, Star, TrendingDown, ArrowUp } from 'lucide-react';
import { ScreenType } from '../App';

interface StoryProps {
    onNavigate: (screen: ScreenType) => void;
}

const Story: React.FC<StoryProps> = ({ onNavigate }) => {
  return (
    <div className="relative flex h-screen w-full flex-col bg-gradient-to-br from-[#240f1a] via-[#6A0DAD] to-[#00BFFF] text-white overflow-hidden font-spline">
      {/* Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#ff3399]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#00BFFF]/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Progress Bars */}
      <div className="z-20 w-full px-4 pt-4 pb-2">
          <div className="flex flex-row items-center justify-center gap-2">
              <div className="h-1 flex-1 rounded-full bg-white/90"></div>
              <div className="h-1 flex-1 rounded-full bg-white/30"></div>
              <div className="h-1 flex-1 rounded-full bg-white/30"></div>
          </div>
          <div className="flex justify-end mt-4">
              <button onClick={() => onNavigate('dashboard')} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:bg-black/40">
                  <X size={24} />
              </button>
          </div>
      </div>

      <div className="z-10 flex-1 overflow-y-auto no-scrollbar px-5 pb-24">
          <div className="mb-8 mt-2">
              <h1 className="text-[42px] font-extrabold leading-[1.1] tracking-tight drop-shadow-lg">
                  Your January <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">in Review</span>
              </h1>
              <p className="mt-3 text-lg font-medium text-white/70">You and J crushed your goals this month!</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="col-span-1 flex flex-col justify-between rounded-2xl p-5 aspect-[4/5] relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 shadow-xl">
                 <div className="absolute top-0 right-0 p-3 opacity-10">
                     <span className="text-[100px] rotate-12">🍔</span>
                 </div>
                 <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 shadow-lg mb-3">
                        🍽️
                    </div>
                    <p className="text-sm font-semibold text-white/60 uppercase tracking-wider">Top Spend</p>
                 </div>
                 <div>
                    <p className="text-2xl font-bold leading-none mb-1">Dining</p>
                    <p className="text-3xl font-extrabold text-white tracking-tight">$450</p>
                 </div>
              </div>

              {/* Card 2 */}
              <div className="col-span-1 flex flex-col justify-between rounded-2xl p-5 aspect-[4/5] bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md border border-white/10">
                 <div className="flex justify-end">
                     <TrendingDown size={32} className="text-[#00BFFF]" />
                 </div>
                 <div className="flex flex-col gap-2">
                     <div className="text-4xl font-extrabold text-[#66CCCC] leading-none">-15%</div>
                     <p className="text-sm font-medium leading-snug text-white/80">
                        Less spent on <br/> <span className="text-white font-bold">Food & Drink</span> than in December.
                     </p>
                 </div>
              </div>

              {/* Card 3 (Wide) */}
              <div className="col-span-2 flex items-center justify-between rounded-2xl p-6 relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff3399]/20 to-transparent opacity-50"></div>
                  <div className="relative z-10 flex flex-col">
                      <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-1">Total Saved</p>
                      <h2 className="text-5xl font-extrabold tracking-tighter text-yellow-300 drop-shadow-lg">$1,200</h2>
                      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 w-fit">
                          <ArrowUp size={12} className="text-green-400" />
                          <span className="text-xs font-medium text-white/90">Highest since Sept</span>
                      </div>
                  </div>
                  <div className="relative z-10 text-6xl animate-pulse">🎉</div>
              </div>

              {/* Card 4 (MVP) */}
              <div className="col-span-2 flex items-center gap-5 rounded-2xl p-5 bg-white/10 backdrop-blur-md border border-white/10">
                  <div className="relative">
                      <div className="h-16 w-16 rounded-full border-4 border-[#ff3399] p-0.5 shadow-[0_0_15px_rgba(255,51,153,0.6)]">
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5xx7msp5Z1nmVQFQfTlxN7jNeeaVDVqNilP5AY-0Qw3PZVgc_m3gxBaSTfdnewY_nQ9W8jg8uTiVKJolT0xKT7zh7h7LQBCvHLmXtf4kjl8RYmMJKz1hZwWGmN6FdeGgGRhOqIzyfosuGh5-ELRhSbU4Qfu152ZhCPmdD0INKpdnEsVNgljvjYxrn9zizeIDQ65d6Hi8y-jVMRuSIc5hz0c35OBD32Xdk8liQ61NdbbZ2Bz-xi5XY_Jf0RQ4AySCKtf8NjwHfr6g" className="h-full w-full rounded-full object-cover" alt="M" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff3399] text-white shadow-sm border border-black/20">
                          <Star size={12} fill="white" />
                      </div>
                  </div>
                  <div className="flex flex-col">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#ff3399]">MVP of the Month</p>
                      <p className="text-xl font-bold text-white">M saved the most!</p>
                      <p className="text-sm text-white/60">Contributed 60% of savings</p>
                  </div>
              </div>
          </div>
          <div className="h-10"></div>
      </div>

      <div className="absolute bottom-0 left-0 z-30 w-full p-6 bg-gradient-to-t from-black/60 to-transparent pt-12">
          <button className="flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#ff3399] py-4 text-white shadow-[0_0_20px_rgba(255,51,153,0.4)] transition-all active:scale-95 hover:shadow-[0_0_30px_rgba(255,51,153,0.6)]">
              <Share size={20} />
              <span className="text-lg font-bold tracking-wide">Share Story</span>
          </button>
      </div>
    </div>
  );
};

export default Story;
