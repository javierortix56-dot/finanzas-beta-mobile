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
      .map(t => {
        if (t.curr === 'USD' && !t.exec) {
          return { ...t, amount: t.origAmt * usdRate };
        }
        return t;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [data.txs, date, usdRate]);

  const { income, expense, balance } = useMemo(() => {
    const inc = processedTxs.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const exp = processedTxs.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { income: inc, expense: exp, balance: inc - exp };
  }, [processedTxs]);

  const fmt = (n: number) => n.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="px-4 flex flex-col gap-4 animate-fade-in">
      
      <div className="flex justify-center pt-2">
        <div className="flex items-center bg-slate-100/50 backdrop-blur rounded-full p-1 px-4 gap-4 border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-200/50 transition-colors">
          <button onClick={() => changeMonth(-1)} className="text-slate-500 p-1"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-xs font-bold tracking-widest min-w-[80px] text-center text-slate-800 uppercase">{monthLabel}</span>
          <button onClick={() => changeMonth(1)} className="text-slate-500 p-1"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-5 rounded-[20px] text-white shadow-xl shadow-slate-900/30 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />

        <div className="flex justify-between items-start mb-4 relative z-10">
          <span className="text-[10px] font-bold opacity-60 tracking-widest uppercase">Balance Total</span>
          <div className="bg-white/10 px-2 py-1 rounded-lg flex items-center gap-2 border border-white/10">
            <span className="text-[10px] font-bold">USD</span>
            <input 
              type="number" 
              value={usdRate} 
              onChange={(e) => onRateChange(Number(e.target.value))}
              className="w-12 bg-transparent text-right font-bold text-xs border-b border-white/30 focus:outline-none text-white p-0"
            />
          </div>
        </div>

        <div className="text-[36px] font-extrabold tracking-tight leading-none mb-1 relative z-10">
          ${fmt(balance)}
        </div>
        <div className="text-[13px] font-semibold opacity-70 mb-4 relative z-10">
          ≈ USD {fmt(Math.round(balance / (usdRate || 1)))}
        </div>

        <div className="flex pt-4 border-t border-white/10 relative z-10">
          <div className="flex-1">
            <div className="text-[10px] font-bold opacity-60 mb-1">INGRESOS</div>
            <div className="text-[15px] font-bold text-[#34D399]">${fmt(income)}</div>
          </div>
          <div className="flex-1 text-right">
            <div className="text-[10px] font-bold opacity-60 mb-1">GASTOS</div>
            <div className="text-[15px] font-bold text-[#F87171]">${fmt(expense)}</div>
          </div>
        </div>
      </div>

      <div className="bg-[#E2E8F0] p-1 rounded-xl flex">
        <button 
          onClick={() => setTab('txs')}
          className={`flex-1 py-2 text-xs font-bold rounded-[9px] transition-all ${tab === 'txs' ? 'bg-white shadow-sm text-[#0F172A]' : 'text-slate-500'}`}
        >
          Movimientos
        </button>
        <button 
          onClick={() => setTab('alloc')}
          className={`flex-1 py-2 text-xs font-bold rounded-[9px] transition-all ${tab === 'alloc' ? 'bg-white shadow-sm text-[#0F172A]' : 'text-slate-500'}`}
        >
          Asignación
        </button>
      </div>

      {tab === 'txs' ? (
        <div className="grid grid-cols-2 gap-3 pb-24 h-full">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
            <div className="bg-[#10B981] text-white text-[10px] font-black text-center py-2 uppercase tracking-wider">Ingresos</div>
            <div className="overflow-y-auto p-1 space-y-1">
              {processedTxs.filter(t => t.type === 'income').map(t => <TxCard key={t.id} tx={t} />)}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
            <div className="bg-[#EF4444] text-white text-[10px] font-black text-center py-2 uppercase tracking-wider">Egresos</div>
            <div className="overflow-y-auto p-1 space-y-1">
              {processedTxs.filter(t => t.type === 'expense').map(t => <TxCard key={t.id} tx={t} />)}
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-24">
          <AllocationView txs={processedTxs} />
        </div>
      )}
    </div>
  );
}

function TxCard({ tx }: { tx: Transaction }) {
  const isInc = tx.type === 'income';
  const fmt = (n: number) => n.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  
  return (
    <div className={`p-2 bg-white border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer active:scale-95 duration-100 ${tx.exec ? 'opacity-50 grayscale-[0.5]' : ''}`}>
      <div className="flex justify-between items-start mb-1">
        <span className={`font-bold text-[11px] leading-tight line-clamp-2 w-[65%] ${tx.exec ? 'line-through text-slate-400' : 'text-slate-800'}`}>
          {tx.desc}
        </span>
        <span className={`text-[11px] font-extrabold whitespace-nowrap ${isInc ? 'text-[#10B981]' : 'text-slate-900'}`}>
          ${fmt(tx.amount)}
        </span>
      </div>
      <div className="flex justify-between items-center text-[9px] text-slate-400">
        <div className="flex items-center gap-1">
          <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold">{tx.cat}</span>
          {tx.curr === 'USD' && <span className="bg-amber-100 text-amber-600 px-1 rounded font-bold">U$D</span>}
          {tx.linkId && !isInc && <LinkIcon className="w-2 h-2 text-blue-500" />}
        </div>
        <span className="font-semibold">{tx.date.split('-')[2]}</span>
      </div>
    </div>
  );
}

function AllocationView({ txs }: { txs: Transaction[] }) {
  const incs = txs.filter(t => t.type === 'income');
  const exps = txs.filter(t => t.type === 'expense');
  const fmt = (n: number) => n.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const orphans = exps.filter(e => !e.linkId).reduce((a, b) => a + b.amount, 0);

  return (
    <div className="flex flex-col gap-3">
      {incs.map(inc => {
        const linked = exps.filter(e => e.linkId === inc.id);
        const spent = linked.reduce((a, b) => a + b.amount, 0);
        const pct = Math.min((spent / inc.amount) * 100, 100);
        const color = spent > inc.amount ? 'bg-[#EF4444]' : 'bg-[#3B82F6]'; 

        return (
          <div key={inc.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-[#F8FAFC] px-4 py-3 flex justify-between items-center border-b border-slate-100">
              <span className="font-bold text-[13px] text-slate-700">{inc.desc}</span>
              <div className="text-[13px] font-extrabold text-slate-800">
                ${fmt(spent)} <span className="text-slate-400 font-medium">/ ${fmt(inc.amount)}</span>
              </div>
            </div>
            <div className="h-1 w-full bg-slate-200">
              <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
            </div>
            <div className="px-4 py-2 text-[10px] text-slate-400 font-semibold">
              {linked.length} movimientos vinculados
            </div>
          </div>
        );
      })}

      {orphans > 0 && (
        <div className="bg-white rounded-2xl border-l-4 border-[#EF4444] p-4 shadow-sm flex justify-between items-center">
          <span className="font-bold text-[13px] text-slate-700">Sin Asignar</span>
          <span className="font-extrabold text-[13px] text-[#EF4444]">${fmt(orphans)}</span>
        </div>
      )}
    </div>
  );
}
