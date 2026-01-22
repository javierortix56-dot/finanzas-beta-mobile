import React, { useEffect, useState } from 'react';
import { Wallet, ChartPie, Plus, RefreshCw } from 'lucide-react';
import Dashboard from './screens/Dashboard';
import AddTransaction from './screens/AddTransaction';
import { api } from './services/api';
import { Transaction, DataPayload } from './types';

const INITIAL_DATA: DataPayload = {
  txs: [],
  cats: { 
    exp: ['Esenciales', 'Deudas', 'Comida', 'Salidas', 'Varios'], 
    inc: ['Sueldo', 'Ventas', 'Otros'] 
  }
};

export default function App() {
  const [view, setView] = useState<'home' | 'stats'>('home');
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataPayload>(INITIAL_DATA);
  const [usdRate, setUsdRate] = useState(1200);

  useEffect(() => {
    const storedRate = localStorage.getItem('usdRate');
    if (storedRate) setUsdRate(Number(storedRate));
    handleSync();
  }, []);

  const handleSync = async () => {
    setLoading(true);
    try {
      const cloudData = await api.sync();
      if (cloudData && cloudData.txs) {
        setData(cloudData);
      }
    } catch (e) {
      console.log("Error de sincronización");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTx = async (tx: Transaction) => {
    const newData = { ...data, txs: [...data.txs, tx] };
    setData(newData);
    setShowAdd(false);
    try {
      await api.sync(newData);
    } catch (e) {
      console.error("Error guardando en nube");
    }
  };

  const handleRateChange = (newRate: number) => {
    setUsdRate(newRate);
    localStorage.setItem('usdRate', newRate.toString());
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-[60px]">
      <header className="fixed top-0 w-full h-[60px] bg-white/90 backdrop-blur-md z-40 flex items-center justify-between px-5 border-b border-slate-100 shadow-sm">
        <div className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          J&M 
          <div className={`w-2 h-2 rounded-full transition-colors ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-[#10B981]'}`} />
        </div>
        <button onClick={handleSync} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </header>

      <main>
        {view === 'home' ? (
          <Dashboard 
            data={data} 
            usdRate={usdRate} 
            onRateChange={handleRateChange} 
          />
        ) : (
          <div className="p-10 text-center text-slate-400">
            <ChartPie className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-sm font-semibold">Próximamente: Estadísticas</p>
          </div>
        )}
      </main>

      {showAdd && (
        <AddTransaction 
          onClose={() => setShowAdd(false)} 
          onSave={handleSaveTx}
          cats={data.cats}
          incomes={data.txs.filter(t => t.type === 'income' && !t.deletedAt)}
          usdRate={usdRate}
        />
      )}

      <nav className="fixed bottom-0 w-full h-[80px] bg-white/90 backdrop-blur-md z-40 flex justify-around items-center pb-4 border-t border-slate-100">
        <button 
          onClick={() => setView('home')}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'home' ? 'text-[#0F172A] -translate-y-1' : 'text-slate-300'}`}
        >
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button 
          onClick={() => setShowAdd(true)}
          className="w-14 h-14 bg-[#0F172A] rounded-2xl text-white flex items-center justify-center shadow-xl shadow-slate-900/40 -translate-y-6 border-4 border-[#F8FAFC] active:scale-95 transition-transform"
        >
          <Plus className="w-7 h-7" />
        </button>

        <button 
          onClick={() => setView('stats')}
          className={`flex flex-col items-center gap-1 transition-all ${view === 'stats' ? 'text-[#0F172A] -translate-y-1' : 'text-slate-300'}`}
        >
          <ChartPie className="w-6 h-6" />
          <span className="text-[10px] font-bold">Stats</span>
        </button>
      </nav>
    </div>
  );
}
