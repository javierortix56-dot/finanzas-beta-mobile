import React, { useState, useEffect } from 'react';
import { BarChart2, Wallet, Settings, User, Plus } from 'lucide-react';
import Dashboard from './screens/Dashboard';
import Insights from './screens/Insights';
import Allocation from './screens/Allocation';
import AddTransaction from './screens/AddTransaction';
import Savings from './screens/Savings';
import Story from './screens/Story';
import Categories from './screens/Categories';
import { api } from './services/api'; 
import { DashboardData } from './types';

export type ScreenType = 'dashboard' | 'insights' | 'allocation' | 'savings' | 'story' | 'categories';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    loadRealData();
  }, []);

  const loadRealData = async () => {
    setLoading(true);
    try {
        const result = await api.getDashboardData();
        setData(result);
    } catch(e) {
        console.error(e);
    }
    setLoading(false);
  };

  const navigate = (screen: ScreenType) => {
    setActiveScreen(screen);
    window.scrollTo(0, 0);
  };

  const handleSaveTransaction = async (tx: any) => {
    await api.saveTransaction(tx);
    await loadRealData(); 
    setShowAddModal(false);
  };

  if (loading && !data) return (
    <div className="flex h-screen items-center justify-center bg-[#f8fafb] dark:bg-[#15161e] text-[#40826c] font-bold animate-pulse">
      Cargando tus finanzas...
    </div>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-slate-900 dark:text-white pb-20">
      
      {activeScreen === 'dashboard' && data && <Dashboard data={data} onNavigate={navigate} />}
      {activeScreen === 'insights' && <Insights onNavigate={navigate} />}
      {activeScreen === 'allocation' && <Allocation onNavigate={navigate} />}
      {activeScreen === 'savings' && <Savings onNavigate={navigate} />}
      {activeScreen === 'story' && <Story onNavigate={navigate} />}
      {activeScreen === 'categories' && <Categories onNavigate={navigate} />}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-0">
          <AddTransaction onClose={() => setShowAddModal(false)} onSave={handleSaveTransaction} />
        </div>
      )}

      {!['story', 'add'].includes(activeScreen) && !showAddModal && (
        <div className="fixed bottom-0 left-0 w-full z-40 pointer-events-none">
           <div className="absolute bottom-[88px] right-6 pointer-events-auto">
              <button onClick={() => setShowAddModal(true)} className="w-14 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                <Plus size={30} />
              </button>
           </div>

            <div className="w-full pointer-events-auto border-t border-slate-200/50 dark:border-slate-800/50 pb-safe pt-2 px-6 h-[84px] flex justify-between items-start bg-white/80 dark:bg-[#15161e]/80 backdrop-blur-xl">
                <NavBtn icon={<User size={24} />} label="Home" active={activeScreen === 'dashboard'} onClick={() => navigate('dashboard')} />
                <NavBtn icon={<BarChart2 size={24} />} label="Stats" active={activeScreen === 'insights'} onClick={() => navigate('insights')} />
                <div className="w-16"></div>
                <NavBtn icon={<Wallet size={24} />} label="Wallet" active={activeScreen === 'allocation'} onClick={() => navigate('allocation')} />
                <NavBtn icon={<Settings size={24} />} label="Settings" active={activeScreen === 'categories'} onClick={() => navigate('categories')} />
            </div>
        </div>
      )}
    </div>
  );
}

const NavBtn = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 w-16 group ${active ? 'text-primary' : 'text-slate-400'}`}>
    {React.cloneElement(icon, { strokeWidth: active ? 2.5 : 2 })}
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);
