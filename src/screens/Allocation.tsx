  import React from 'react';
import { ArrowLeft, MoreHorizontal, Home, ShoppingCart, PiggyBank, Car, Plane, AlertTriangle, Coffee, Tv, ShoppingBag } from 'lucide-react';
import { ScreenType } from '../App';

interface AllocationProps {
    onNavigate: (screen: ScreenType) => void;
}

const Allocation: React.FC<AllocationProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 pt-12 pb-3 bg-background-light/85 dark:bg-background-dark/85 backdrop-blur-md border-b border-transparent">
         <button onClick={() => onNavigate('dashboard')} className="flex size-10 items-center justify-center text-primary active:opacity-60 transition-opacity">
            <ArrowLeft size={28} />
         </button>
         <h1 className="flex-1 text-center text-[17px] font-bold tracking-tight text-slate-900 dark:text-white">Asignación</h1>
         <button className="flex size-10 items-center justify-center text-primary active:opacity-60 transition-opacity">
            <MoreHorizontal size={26} />
         </button>
      </header>

      <main className="flex flex-col gap-5 p-4">
         {/* Summary */}
         <div className="px-2">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Total Mensual</p>
            <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">$6,300.00</h2>
                <span className="text-sm font-medium text-gray-400">ingresos totales</span>
            </div>
         </div>

         {/* Card 1: Sueldo J */}
         <div className="bg-white/70 dark:bg-[#1e2029]/70 backdrop-blur-md flex flex-col gap-4 rounded-2xl p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] border border-white/50 dark:border-white/5">
             <div className="flex justify-between items-end">
                 <div className="flex flex-col gap-0.5">
                     <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Ingreso</span>
                     <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Sueldo J</h3>
                 </div>
                 <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">$3,500.00</p>
             </div>
             
             <div className="flex flex-col gap-2">
                 <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                     <span className="text-primary font-bold">75% Asignado</span>
                     <span>$2,625 used</span>
                 </div>
                 <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                     <div className="h-full rounded-full bg-primary shadow-sm" style={{ width: '75%' }}></div>
                 </div>
             </div>

             <div className="h-px w-full bg-gray-200/60 dark:bg-white/10"></div>

             <div className="flex flex-col gap-1">
                 <LineItem icon={<Home size={18} />} name="Rent" sub="Monthly" amount="$1,200" color="bg-blue-50 text-primary" />
                 <LineItem icon={<ShoppingCart size={18} />} name="Groceries" sub="Variable" amount="$400" color="bg-blue-50 text-primary" />
                 <LineItem icon={<PiggyBank size={18} />} name="Savings" sub="Auto-transfer" amount="$500" color="bg-blue-50 text-primary" />
             </div>
         </div>

         {/* Card 2: Sueldo M */}
         <div className="bg-white/70 dark:bg-[#1e2029]/70 backdrop-blur-md flex flex-col gap-4 rounded-2xl p-5 shadow-sm border border-red-500/20">
             <div className="flex justify-between items-end">
                 <div className="flex flex-col gap-0.5">
                     <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Ingreso</span>
                     <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Sueldo M</h3>
                 </div>
                 <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">$2,800.00</p>
             </div>

             <div className="flex flex-col gap-2">
                 <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                     <span className="text-red-500 font-bold flex items-center gap-1">
                        <AlertTriangle size={12} /> 107% Asignado
                     </span>
                     <span className="text-red-500">$3,000 allocated</span>
                 </div>
                 <div className="h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden relative">
                     <div className="h-full rounded-full bg-red-500 shadow-sm" style={{ width: '100%' }}></div>
                     <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMTBMMTAgME0tMiAyTDIgLTJNOCAxMkwxMiA4IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9InVybCgjcCkiLz48L3N2Zz4=')] opacity-50"></div>
                 </div>
             </div>

             <div className="h-px w-full bg-gray-200/60 dark:bg-white/10"></div>

             <div className="flex flex-col gap-1">
                 <LineItem icon={<Car size={18} />} name="Car Payment" sub="Loan" amount="$600" color="bg-red-50 text-red-500" />
                 <LineItem icon={<ShoppingBag size={18} />} name="Shopping" sub="Personal" amount="$400" color="bg-red-50 text-red-500" />
                 <LineItem icon={<Plane size={18} />} name="Europe Trip" sub="One-time" amount="$2,000" color="bg-red-50 text-red-500" />
             </div>
         </div>

         {/* Warning Card */}
         <div className="relative bg-orange-50/50 dark:bg-orange-900/10 backdrop-blur-md flex flex-col gap-4 rounded-2xl p-5 shadow-sm border border-orange-500/20">
             <div className="absolute -top-3 right-4 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">Review Needed</div>
             <div className="flex justify-between items-start">
                 <div className="flex flex-col gap-0.5">
                     <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                        <AlertTriangle size={20} className="text-orange-500" />
                        Sin Asignar
                     </h3>
                     <p className="text-sm text-gray-500 leading-snug max-w-[200px]">These expenses are not linked to any income source.</p>
                 </div>
                 <p className="text-xl font-bold tracking-tight text-orange-500">-$150.00</p>
             </div>
             
             <div className="h-px w-full bg-orange-200/50 dark:bg-orange-500/20"></div>

             <div className="flex flex-col gap-1">
                 <LineItem icon={<Tv size={16} />} name="Netflix" sub="" amount="$15" color="bg-orange-100 text-orange-600" />
                 <LineItem icon={<Coffee size={16} />} name="Coffee Runs" sub="" amount="$135" color="bg-orange-100 text-orange-600" />
             </div>

             <button className="mt-2 w-full rounded-xl bg-orange-500/10 py-3 text-sm font-semibold text-orange-600 active:bg-orange-500/20 transition-colors">
                Re-allocate Expenses
             </button>
         </div>
      </main>
    </div>
  );
};

const LineItem = ({ icon, name, sub, amount, color }: any) => (
    <div className="group flex items-center justify-between py-2 active:bg-gray-50 dark:active:bg-white/5 rounded-lg -mx-2 px-2 transition-colors">
        <div className="flex items-center gap-3">
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${color}`}>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-[15px] font-medium text-slate-900 dark:text-slate-100">{name}</span>
                {sub && <span className="text-xs text-gray-500">{sub}</span>}
            </div>
        </div>
        <span className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">{amount}</span>
    </div>
)

export default Allocation;
