import React, { useEffect, useState } from 'react';
import { Wallet, ChartPie, Plus, RefreshCw } from 'lucide-react';
import Dashboard from './screens/Dashboard';
import AddTransaction from './screens/AddTransaction';
import { api } from './services/api';
import { Transaction, DataPayload } from './types';

export default function App() {
  const [view, setView] = useState<'home' | 'stats'>('home');
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usdRate, setUsdRate] = useState(1200);
  const [data, setData] = useState<DataPayload>({ txs: [], cats: { exp: ['Comida', 'Salidas', 'Varios'], inc: ['Sueldo', 'Otros'] } });

  useEffect(() => { handleSync(); }, []);

  const handleSync = async () => {
    setLoading(true);
    try {
      const cloudData = await api.sync();
      if (cloudData?.txs) setData(cloudData);
    } catch (e) { console.log("Offline mode"); }
    finally { setLoading(false); }
  };

  const handleSaveTx = async (tx: Transaction) => {
    const newData = { ...data, txs: [...data.txs, tx] };
    setData(newData);
    setShowAdd(false);
    await api.sync(newData);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-[60px]">
      <header className="fixed top-0 w-full h-[60px] bg-white/90 backdrop-blur-md z-40 flex items-center justify-between px-5 border-b border-slate-100 shadow-sm">
        <div className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          J&M <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`} />
        </div>
        <button onClick={handleSync}><RefreshCw className={`w-5 h-5 text-slate-400 ${loading ? 'animate-spin' : ''}`} /></button>
      </header>

      {view === 'home' ? <Dashboard data={data} usdRate={usdRate} onRateChange={setUsdRate} /> : <div className="p-10 text-center opacity-20"><ChartPie className="mx-auto w-12 h-12" /></div>}

      {showAdd && <AddTransaction onClose={() => setShowAdd(false)} onSave={handleSaveTx} cats={data.cats} incomes={data.txs.filter(t => t.type === 'income')} usdRate={usdRate} />}

      <nav className="fixed bottom-0 w-full h-[80px] bg-white/90 backdrop-blur-md z-40 flex justify-around items-center pb-4 border-t border-slate-100">
        <button onClick={() => setView('home')} className={view === 'home' ? 'text-slate-900' : 'text-slate-300'}><Wallet /></button>
        <button onClick={() => setShowAdd(true)} className="w-14 h-14 bg-slate-900 rounded-2xl text-white shadow-xl -translate-y-6 flex items-center justify-center"><Plus /></button>
        <button onClick={() => setView('stats')} className={view === 'stats' ? 'text-slate-900' : 'text-slate-300'}><ChartPie /></button>
      </nav>
    </div>
  );
}
