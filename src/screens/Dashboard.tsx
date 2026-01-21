import React, { useState } from 'react';
import { User, DollarSign, ShoppingCart, Briefcase } from 'lucide-react';
import { ScreenType } from '../App';
import { DashboardData } from '../types';

interface DashboardProps {
  data: DashboardData;
  onNavigate: (screen: ScreenType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onNavigate }) => {
  const [viewMode, setViewMode] = useState<'transactions' | 'allocation'>('transactions');
  const fmt = (n: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n);
  const fmtUsd = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-background-light/70 dark:bg-background-dark/70 border-b border-transparent transition-all">
        <div className="w-10"></div>
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">J&M Finance</h2>
        <button onClick={() => onNavigate('story')} className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-light dark:bg-surface-dark shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden active:scale-95 transition-transform">
          <User className="text-primary" size={20} />
        </button>
      </header>

      <main className="relative z-10 flex flex-col gap-6 px-4 pt-4">
        <div className="w-full">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-[#2d6150] p-6 text-white shadow-lg shadow-primary/30">
                <div className="relative flex flex-col gap-1">
                    <div className="flex items-center justify-between opacity-90">
                        <span className="text-sm font-medium tracking-wide">Patrimonio Neto</span>
                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">Live</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">{fmt(data.balance)}</h1>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                        <div className="flex items-center gap-1 rounded-lg bg-black/20 px-3 py-1.5 backdrop-blur-md">
                            <DollarSign size={16} className="opacity-80" />
                            <span className="text-xs font-medium">≈ {fmtUsd(data.balanceUsd)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full">
            <div className="flex p-1 rounded-xl bg-slate-200/50 dark:bg-white/5 backdrop-blur-sm">
                <button onClick={() => setViewMode('transactions')} className={`flex-1 py-2.5 text-sm font-semibold rounded-[0.6rem] transition-all duration-300 ${viewMode === 'transactions' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}>Movimientos</button>
                <button onClick={() => setViewMode('allocation')} className={`flex-1 py-2.5 text-sm font-semibold rounded-[0.6rem] transition-all duration-300 ${viewMode === 'allocation' ? 'bg-white dark:bg-surface-dark text-primary shadow-sm' : 'text-slate-500'}`}>Asignación</button>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {data.transactions.filter(t => t.type === 'inc').length > 0 && (
              <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white px-2">Ingresos Recientes</h3>
                  {data.transactions.filter(t => t.type === 'inc').slice(0, 3).map(tx => (
                      <TransactionItem key={tx.id} icon={<Briefcase size={20}/>} color="emerald" title={tx.desc} subtitle={tx.cat} amount={`+${fmt(tx.amount)}`} isPositive />
                  ))}
              </div>
            )}
            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white px-2">Gastos Recientes</h3>
                {data.transactions.filter(t => t.type === 'exp').slice(0, 10).map(tx => (
                    <TransactionItem key={tx.id} icon={<ShoppingCart size={20}/>} color="rose" title={tx.desc} subtitle={tx.cat} amount={`-${fmt(tx.amount)}`} />
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

const TransactionItem = ({ icon, color, title, subtitle, amount, isPositive }: any) => {
    const bgColors: any = { emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400', rose: 'bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400' };
    return (
        <div className="group flex items-center justify-between rounded-2xl bg-white dark:bg-[#1e2029] p-4 shadow-sm active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bgColors[color]}`}>{icon}</div>
                <div><p className="font-bold text-slate-900 dark:text-slate-100">{title}</p><p className="text-xs font-medium text-slate-500 dark:text-slate-400">{subtitle}</p></div>
            </div>
            <p className={`font-bold ${isPositive ? 'text-emerald-600' : 'text-slate-900 dark:text-slate-100'}`}>{amount}</p>
        </div>
    );
};
export default Dashboard;
