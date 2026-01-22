import React, { useState, useMemo } from 'react';
import { DataPayload, Transaction } from '../types';
import { ChevronLeft, ChevronRight, Link as LinkIcon } from 'lucide-react';

interface DashboardProps {
  data: DataPayload;
  usdRate: number;
  onRateChange: (r: number) => void;
}

export default function Dashboard({ data, usdRate, onRateChange }: DashboardProps) {
  const [tab, setTab] = useState<'txs' | 'alloc'>('txs');
  const [date, setDate] = useState(new Date());

  const changeMonth = (delta: number) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + delta);
    setDate(newDate);
  };

  const monthLabel = useMemo(() => {
    const months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }, [date]);

  const processedTxs = useMemo(() => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    return data.txs
      .filter(t => !t.deletedAt)
      .filter(t => {
        const [ty, tm] = t.date.split('-').map(Number);
        return ty === y && tm === m;
      })
      .map(t => (t.curr === 'USD' && !t.exec) ? { ...t, amount: t.origAmt * usdRate } : t)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [data.txs, date, usdRate]);

  const { income, expense, balance } = useMemo(() => {
    const inc = processedTxs.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
    const exp = processedTxs.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
    return { income: inc, expense: exp, balance: inc - exp };
  }, [processedTxs]);

  const fmt = (n: number) => n.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="px-4 flex flex-col gap-4 animate-fade-in">
      <div className="flex justify-center pt-2">
        <div className="flex items-center bg-slate-100/50 backdrop-blur rounded-full p-1 px-4 gap-4 border border-slate-200">
          <button onClick={() => changeMonth(-1)}><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-xs font-bold min-w-[80px] text-center uppercase">{monthLabel}</span>
          <button onClick={() => changeMonth(1)}><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-5 rounded-[20px] text-white shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-4 relative z-10">
          <span className="text-[10px] font-bold opacity-60 uppercase">Balance Total</span>
          <div className="bg-white/10 px-2 py-1 rounded-lg flex items-center gap-2 border border-white/10">
            <span className="text-[10px] font-bold">USD</span>
            <input type="number" value={usdRate} onChange={(e) => onRateChange(Number(e.target.value))} className="w-12 bg-transparent text-right font-bold text-xs outline-none" />
          </div>
        </div>
        <div className="text-[36px] font-extrabold leading-none mb-1 relative z-10">${fmt(balance)}</div>
        <div className="text-[13px] opacity-70 mb-4 relative z-10">≈ USD {fmt(Math.round(balance / (usdRate || 1)))}</div>
        <div className="flex pt-4 border-t border-white/10 relative z-10">
          <div className="flex-1"><div className="text-[10px] font-bold opacity-60">INGRESOS</div><div className="text-[15px] font-bold text-[#34D399]">${fmt(income)}</div></div>
          <div className="flex-1 text-right"><div className="text-[10px] font-bold opacity-60">GASTOS</div><div className="text-[15px] font-bold text-[#F87171]">${fmt(expense)}</div></div>
        </div>
      </div>

      <div className="bg-[#E2E8F0] p-1 rounded-xl flex">
        <button onClick={() => setTab('txs')} className={`flex-1 py-2 text-xs font-bold rounded-[9px] ${tab === 'txs' ? 'bg-white shadow text-[#0F172A]' : 'text-slate-500'}`}>Movimientos</button>
        <button onClick={() => setTab('alloc')} className={`flex-1 py-2 text-xs font-bold rounded-[9px] ${tab === 'alloc' ? 'bg-white shadow text-[#0F172A]' : 'text-slate-500'}`}>Asignación</button>
      </div>

      {tab === 'txs' ? (
        <div className="grid grid-cols-2 gap-3 pb-24 h-full">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="bg-[#10B981] text-white text-[10px] font-black text-center py-2 uppercase">Ingresos</div>
            <div className="p-1 space-y-1 overflow-y-auto">
              {processedTxs.filter(t => t.type === 'income').map(t => <TxCard key={t.id} tx={t} />)}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="bg-[#EF4444] text-white text-[10px] font-black text-center py-2 uppercase">Egresos</div>
            <div className="p-1 space-y-1 overflow-y-auto">
              {processedTxs.filter(t => t.type === 'expense').map(t => <TxCard key={t.id} tx={t} />)}
            </div>
          </div>
        </div>
      ) : (
        <AllocationView txs={processedTxs} />
      )}
    </div>
  );
}

function TxCard({ tx }: { tx: Transaction }) {
  const fmt = (n: number) => n.toLocaleString('es-AR');
  return (
    <div className={`p-2 border-b border-slate-100 last:border-0 ${tx.exec ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-start mb-1">
        <span className="font-bold text-[10px] text-slate-800 line-clamp-2">{tx.desc}</span>
        <span className="text-[10px] font-extrabold">${fmt(tx.amount)}</span>
      </div>
      <div className="flex justify-between text-[8px] text-slate-400">
        <span className="bg-slate-100 px-1 rounded font-bold">{tx.cat}</span>
        <span>{tx.date.split('-')[2]}</span>
      </div>
    </div>
  );
}

function AllocationView({ txs }: { txs: Transaction[] }) {
  const incs = txs.filter(t => t.type === 'income');
  const exps = txs.filter(t => t.type === 'expense');
  const fmt = (n: number) => n.toLocaleString('es-AR');
  return (
    <div className="flex flex-col gap-3 pb-24">
      {incs.map(inc => {
        const linked = exps.filter(e => e.linkId === inc.id);
        const spent = linked.reduce((a, b) => a + b.amount, 0);
        const pct = Math.min((spent / inc.amount) * 100, 100);
        return (
          <div key={inc.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden p-3">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span>{inc.desc}</span>
              <span>${fmt(spent)} / ${fmt(inc.amount)}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
