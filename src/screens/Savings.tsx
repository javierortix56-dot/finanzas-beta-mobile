import React from 'react';
import { ChevronDown, Plus, TrendingUp, Shield } from 'lucide-react';
import { ScreenType } from '../App';

interface SavingsProps {
    onNavigate: (screen: ScreenType) => void;
}

const Savings: React.FC<SavingsProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0c1418] text-white">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-[#005d6b] rounded-full mix-blend-screen opacity-20 blur-[80px]"></div>
          <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-[#14b8a6] rounded-full opacity-10 blur-[80px]"></div>
      </div>

      <header className="relative z-10 pt-12 pb-2 px-6 flex items-center justify-between shrink-0">
          <div className="flex flex-col">
              <h1 className="text-sm font-medium text-gray-400 tracking-wider uppercase">Overview</h1>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2"
              >
                  <span className="text-white text-lg font-bold">J&M Savings</span>
                  <ChevronDown size={16} className="text-gray-400" />
              </button>
          </div>
          <button className="relative group overflow-hidden rounded-full p-2 bg-white/5 border border-white/10 hover:bg-white/15 transition-all duration-300">
              <Plus size={24} className="text-white" />
          </button>
      </header>

      <main className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-32 px-4 space-y-6">
          {/* Total Portfolio */}
          <section className="mt-4 mb-6">
              <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6 backdrop-blur-xl shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#005d6b]/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <span className="text-gray-400 text-sm font-medium tracking-wide">Total Portfolio</span>
                      <h2 className="text-5xl font-bold text-white tracking-tight">$42,500<span className="text-gray-500 text-2xl">.00</span></h2>
                      <div className="flex items-center gap-1.5 bg-[#14b8a6]/10 px-3 py-1 rounded-full border border-[#14b8a6]/20">
                          <TrendingUp size={14} className="text-[#14b8a6]" />
                          <span className="text-[#14b8a6] text-xs font-bold">+$1,200 this month</span>
                      </div>
                  </div>
              </div>
          </section>

          <section className="space-y-5">
              <div className="flex items-center justify-between px-2">
                  <h3 className="text-lg font-bold text-white">Active Goals</h3>
                  <button className="text-xs font-medium text-[#005d6b] hover:text-[#14b8a6] transition-colors">View All</button>
              </div>

              {/* Goal 1: Japan */}
              <article className="relative group overflow-hidden rounded-[2rem] bg-[#141e24]/80 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] transition-all duration-500">
                  <div className="relative p-6 flex flex-col gap-6">
                      <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-1">
                              <h3 className="text-xl font-bold text-white leading-tight">Japan Trip 2025</h3>
                              <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Travel Fund</span>
                          </div>
                          <div className="flex -space-x-2">
                              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-MztarMVdsgkLGGtKARfKkJMd0HVlBRuhBQ2h-S-yezmLpE4InwYnQqno5wxvwO0oSTCPAH0XUIzoGOdWinc9Tr5jwTJHK1JAzqSSvV5y1Rja1QhxyQnpXyLb9i8UILgo1yPPS-Hep0-wY_P9b8RJscLDAFfGafUD8LJZIhiUUGhBJt8KPRvOcRV18tomcdqez0UKQs_rcZ3EbufOucGd9upux5WxYrQbsoJN65d1Zld_4mk929SY-yDiN176QHthAvaZ9-qXUhU" className="h-8 w-8 rounded-full border-2 border-[#141e24] object-cover" alt="User" />
                              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ0GqqaosN90EINVfZRxAvmaQ6SDzJ8FhBMtMSjQrMzM-IewBdcOigPr-crquP8glsRvMrPmVmsZvuEVGScfT_vJQiR6qNxM-WcUQUikEk58_Pm2QF8qmhgsHY6wNHwMRTZAw1m9sdC2FHD7J-oCzSZ2dQXhe5MTnfE2JiJwc8uxXkOx5JlgxiMCgTCFkir38RyEKoKXbdUjZbA4BtlcB3qgdNJuTkE-7MVHJTNtUhTZh_Br24iywh_9wyUhisa2TwZfcLp_MIjUA" className="h-8 w-8 rounded-full border-2 border-[#141e24] object-cover" alt="User" />
                          </div>
                      </div>

                      <div className="flex items-center gap-6">
                          <div className="relative w-24 h-24 shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" fill="none" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="8"></circle>
                                    <circle cx="50" cy="50" fill="none" r="42" stroke="#005d6b" strokeDasharray="264" strokeDashoffset="92" strokeLinecap="round" strokeWidth="8" className="drop-shadow-[0_0_4px_rgba(20,184,166,0.6)]"></circle>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-xs text-gray-400 font-medium">Saved</span>
                                    <span className="text-sm font-bold text-white">65%</span>
                                </div>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                                <p className="text-3xl font-bold text-white tracking-tight mb-1">$6,500</p>
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">Goal: $10,000</span>
                                        <span className="text-xs text-[#14b8a6] font-medium">Left: $3,500</span>
                                    </div>
                                    <button className="h-9 px-4 rounded-xl bg-[#005d6b] hover:bg-[#005d6b]/80 active:scale-95 transition-all text-white text-sm font-semibold flex items-center gap-1 shadow-lg shadow-[#005d6b]/20">
                                        <Plus size={16} /> Add
                                    </button>
                                </div>
                          </div>
                      </div>
                  </div>
              </article>

              {/* Goal 2: Tesla */}
              <article className="relative group overflow-hidden rounded-[2rem] bg-[#141e24]/80 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(217,119,6,0.2)] transition-all duration-500">
                  <div className="relative p-6 flex flex-col gap-6">
                      <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-1">
                              <h3 className="text-xl font-bold text-white leading-tight">Tesla Model Y</h3>
                              <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Vehicle</span>
                          </div>
                          <div className="h-8 w-8 rounded-full border-2 border-[#141e24] bg-gray-700 overflow-hidden flex items-center justify-center text-[10px] font-bold text-gray-300">JM</div>
                      </div>

                      <div className="flex items-center gap-6">
                          <div className="relative w-24 h-24 shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" fill="none" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="8"></circle>
                                    <circle cx="50" cy="50" fill="none" r="42" stroke="#d97706" strokeDasharray="264" strokeDashoffset="211" strokeLinecap="round" strokeWidth="8" className="drop-shadow-[0_0_4px_rgba(217,119,6,0.6)]"></circle>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-xs text-gray-400 font-medium">Saved</span>
                                    <span className="text-sm font-bold text-white">20%</span>
                                </div>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                                <p className="text-3xl font-bold text-white tracking-tight mb-1">$12,000</p>
                                <div className="flex justify-between items-end w-full">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500">Goal: $60,000</span>
                                        <span className="text-xs text-amber-500 font-medium">Left: $48,000</span>
                                    </div>
                                    <button className="h-9 px-4 rounded-xl bg-[#005d6b] hover:bg-[#005d6b]/80 active:scale-95 transition-all text-white text-sm font-semibold flex items-center gap-1 shadow-lg shadow-[#005d6b]/20">
                                        <Plus size={16} /> Add
                                    </button>
                                </div>
                          </div>
                      </div>
                  </div>
              </article>

              {/* Goal 3: Emergency */}
              <article className="relative group overflow-hidden rounded-[2rem] bg-[#141e24]/60 backdrop-blur-md border border-white/10 shadow-sm transition-all duration-500 p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                          <Shield size={24} />
                      </div>
                      <div>
                          <h4 className="font-bold text-white">Emergency Fund</h4>
                          <p className="text-xs text-gray-400">$15,000 / $20,000</p>
                      </div>
                  </div>
                  <div className="w-16 h-16 relative">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" fill="none" r="42" stroke="rgba(255,255,255,0.05)" strokeWidth="8"></circle>
                          <circle cx="50" cy="50" fill="none" r="42" stroke="#10b981" strokeDasharray="264" strokeDashoffset="66" strokeLinecap="round" strokeWidth="8"></circle>
                      </svg>
                  </div>
              </article>
          </section>
      </main>
    </div>
  );
};

export default Savings;
