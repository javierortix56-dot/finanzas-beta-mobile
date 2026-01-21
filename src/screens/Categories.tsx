import React from 'react';
import { ChevronLeft, Plus, FilePlus, House, Utensils, Film, Car } from 'lucide-react';
import { ScreenType } from '../App';

interface CategoriesProps {
    onNavigate: (screen: ScreenType) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
         <div className="flex items-center justify-between px-4 pt-12 pb-2">
            <button 
                onClick={() => onNavigate('dashboard')}
                className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-primary active:scale-95"
            >
                <ChevronLeft size={28} />
            </button>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Manage Categories</h1>
            <button className="px-2 py-1 text-primary font-semibold text-base active:opacity-70">
                Edit
            </button>
         </div>

         <div className="px-4 pb-4 pt-2">
             <div className="relative flex bg-gray-200/80 dark:bg-black/20 p-1 rounded-xl h-10 w-full">
                 <div className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-[#2c3035] rounded-[9px] shadow-sm z-0"></div>
                 <button className="relative z-10 flex-1 flex items-center justify-center text-sm font-semibold text-slate-900 dark:text-white">Expenses</button>
                 <button className="relative z-10 flex-1 flex items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-400">Income</button>
             </div>
         </div>
      </header>

      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto no-scrollbar pb-32">
          {/* Category Item Expanded */}
          <div className="bg-white dark:bg-[#2c3035] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5">
              <div className="flex items-center p-3 gap-4 cursor-pointer">
                  <div className="flex items-center justify-center size-11 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shrink-0">
                      <House size={24} />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-base text-slate-900 dark:text-white">Housing</h3>
                          <span className="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Shared</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">3 Concepts</p>
                  </div>
                  <ChevronLeft size={20} className="text-slate-400 -rotate-90" />
              </div>
              <div className="px-3 pb-2">
                   <div className="flex items-center gap-3 py-3 pl-[3.75rem] pr-2 border-t border-dashed border-gray-100 dark:border-gray-700/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/40"></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Rent</span>
                   </div>
                   <div className="flex items-center gap-3 py-3 pl-[3.75rem] pr-2 border-t border-dashed border-gray-100 dark:border-gray-700/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/40"></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Maintenance</span>
                   </div>
                   <div className="flex items-center gap-3 py-3 pl-[3.75rem] pr-2 border-t border-dashed border-gray-100 dark:border-gray-700/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/40"></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Utilities</span>
                   </div>
              </div>
          </div>

          <CategoryRow icon={<Utensils size={24} />} title="Food & Dining" sub="Supermarket, Restaurants..." color="text-orange-500" bg="bg-orange-100 dark:bg-orange-900/30" />
          <CategoryRow icon={<Film size={24} />} title="Entertainment" sub="Netflix, Cinema, Spotify" color="text-pink-500" bg="bg-pink-100 dark:bg-pink-900/30" />
          <CategoryRow icon={<Car size={24} />} title="Transport" sub="Uber, Gas, Parking" color="text-emerald-600" bg="bg-emerald-100 dark:bg-emerald-900/30" />
          
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center opacity-70">
              <Plus size={32} className="text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-500">Create a new category to get organized.</p>
          </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-8 pt-4 pointer-events-none flex justify-center max-w-lg mx-auto">
            <div className="pointer-events-auto flex gap-3 p-1.5 bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-full shadow-lg dark:shadow-black/50 ring-1 ring-black/5">
                <button className="flex items-center gap-2 px-5 py-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                    <FilePlus size={20} className="text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white" />
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Concept</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-blue-600 active:scale-95 transition-all text-white shadow-glow">
                    <Plus size={20} />
                    <span className="text-sm font-bold">Category</span>
                </button>
            </div>
      </div>
    </div>
  );
};

const CategoryRow = ({ icon, title, sub, color, bg }: any) => (
    <div className="bg-white dark:bg-[#2c3035] rounded-2xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 active:scale-[0.99] transition-transform">
        <div className="flex items-center p-3 gap-4 cursor-pointer">
            <div className={`flex items-center justify-center size-11 rounded-xl ${bg} ${color} shrink-0`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-slate-900 dark:text-white">{title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>
            </div>
            <ChevronLeft size={20} className="text-slate-400 -rotate-90" />
        </div>
    </div>
);

export default Categories;
