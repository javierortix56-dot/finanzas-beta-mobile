import React from 'react';
import { ChevronDown, MoreHorizontal, ArrowUp, RefreshCw, Copy, Cloud } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ScreenType } from '../App';

interface InsightsProps {
    onNavigate: (screen: ScreenType) => void;
}

const data = [
  { name: 'Housing', value: 1700, color: '#40826c' }, // Primary
  { name: 'Food', value: 1275, color: '#34D399' },    // Emerald 400
  { name: 'Transport', value: 637, color: '#F59E0B' }, // Amber 500
  { name: 'Others', value: 638, color: '#EF4444' },    // Red 500
];

const barData = [
    { name: 'May', amt: 60 },
    { name: 'Jun', amt: 45 },
    { name: 'Jul', amt: 80 },
    { name: 'Aug', amt: 55 },
    { name: 'Sep', amt: 70 },
    { name: 'Oct', amt: 90, active: true },
];

const Insights: React.FC<InsightsProps> = () => {
  return (
    <div className="w-full flex flex-col pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#15161e]/85 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
        <div className="px-5 pt-12 pb-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 backdrop-blur-md">
              <span className="text-[10px] font-bold text-primary tracking-wide">J&M JOINT ACCOUNT</span>
            </div>
            {/* Avatars */}
            <div className="relative flex items-center">
              <div className="w-9 h-9 rounded-full border-2 border-white dark:border-[#15161e] overflow-hidden bg-indigo-200 z-10 shadow-sm">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrAiYsdhyuq1EuFAvu2Z7-KIfNzErAsQdzAXprBBt71TcyvVlwWdlMHEPk4kLRpcq57q0h_v6h_kt-fuN61GlO4Mhvo7447g6w3UG_7xU_ZZnDMILTNiWC_eP8mg_M6GVG6UKtJwJ_n8f5Sw1e5SG2p5ZDwOalSDTFKw_7p7w5QElughF2uLO04bXdEhvXm94FcG3BRXP9nYG8ajd6y-lnDWbllPK17KhSPV4wTjNO2UI0_tNGpn8yb1npq06IDRCGoa2Dm8xtnfg" alt="J" className="w-full h-full object-cover" />
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-white dark:border-[#15161e] overflow-hidden bg-rose-200 -ml-3 z-20 shadow-sm">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvo9WE7_KQeQrICSy_FlhYoCQ2Xv7HX_g2v6Do2steCZ3Mpvmmz9ubIHdhJoPOB8f2qLRGByc8gw4jQbD8j9pm53FAd1oDSp0ZRzPMn0-rznLpkG-gNahT-qKppvXzqxwkObYKmmwm5nEjnWKKDBMnB08-O3QoPxY-pSg-MyPWAEvmNX13-V7hS7DpYVVWqOSNrJ87vALSEwwCxzxuEkfCgaYkWmRAs5ttkEgJiXC9mJYJfoH68_aRNG2jKqdr4OrnXRJruQlwQJE" alt="M" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-end">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">Insights</h1>
            <button className="flex items-center gap-2 bg-slate-200/60 dark:bg-slate-800/60 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition-all active:scale-95 group">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">October 2024</span>
              <ChevronDown size={16} className="text-slate-500" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-5 pt-6 flex flex-col gap-6 w-full">
        
        {/* Doughnut Chart Card */}
        <section className="bg-white dark:bg-[#1e2029] rounded-[1.75rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800/50">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Expenses by Category</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Spent</p>
            </div>
            <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">$4,250</span>
                 <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full mt-1 flex items-center gap-0.5">
                    <ArrowUp size={10} /> 12%
                 </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
               {data.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}60` }}></div>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{(item.value / 4250 * 100).toFixed(0)}%</span>
                          <span className="text-xs text-slate-400">${item.value.toLocaleString()}</span>
                      </div>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* Bar Chart Card */}
        <section className="bg-white dark:bg-[#1e2029] rounded-[1.75rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800/50">
           <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Monthly Income</h2>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">$8,100<span className="text-lg text-slate-400 font-medium">.00</span></p>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">+5% vs Sep</span>
          </div>
          
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={barData}>
                  <Bar dataKey="amt" radius={[6, 6, 0, 0]}>
                    {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.active ? '#34D399' : '#e2e8f0'} className={entry.active ? '' : 'dark:fill-slate-700'} />
                    ))}
                  </Bar>
               </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between px-2 text-xs font-semibold text-slate-400 mt-2">
             {barData.map(d => <span key={d.name} className={d.active ? 'text-slate-900 dark:text-white' : ''}>{d.name}</span>)}
          </div>
        </section>

        {/* Tools Grid */}
        <section>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 px-1">Advanced Tools</h3>
          <div className="grid grid-cols-3 gap-3">
             <ToolButton icon={<RefreshCw size={24} />} title="Execute Recurring" color="text-primary" bg="bg-primary/10" />
             <ToolButton icon={<Copy size={24} />} title="Clone Month" color="text-indigo-500" bg="bg-indigo-50 dark:bg-indigo-900/20" />
             <ToolButton icon={<Cloud size={24} />} title="Sync Cloud" color="text-sky-500" bg="bg-sky-50 dark:bg-sky-900/20" />
          </div>
        </section>

      </main>
    </div>
  );
};

const ToolButton = ({ icon, title, color, bg }: any) => (
    <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#1e2029] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm active:scale-95 transition-all hover:border-primary/50 group h-32">
        <div className={`w-12 h-12 rounded-2xl ${bg} ${color} flex items-center justify-center mb-3 transition-colors`}>
            {icon}
        </div>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 text-center leading-tight">{title}</span>
    </button>
)

export default Insights;
