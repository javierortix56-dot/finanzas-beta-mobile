import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Transaction } from '../types';

interface AddTransactionProps {
  onClose: () => void;
  onSave: (tx: Transaction) => void;
  cats: { inc: string[]; exp: string[] };
  incomes: Transaction[];
  usdRate: number;
}

export default function AddTransaction({ onClose, onSave, cats, incomes, usdRate }: AddTransactionProps) {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [formData, setFormData] = useState({
    amount: '', curr: 'ARS', cat: '', desc: '',
    date: new Date().toISOString().split('T')[0],
    exec: true, linkId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const origAmt = parseFloat(formData.amount);
    onSave({
      id: Date.now(),
      date: formData.date,
      amount: formData.curr === 'USD' ? origAmt * usdRate : origAmt,
      origAmt, curr: formData.curr as 'ARS' | 'USD',
      type, cat: formData.cat || 'Varios', desc: formData.desc,
      exec: formData.exec,
      linkId: formData.linkId ? Number(formData.linkId) : null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-[24px] p-6 shadow-2xl animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-extrabold">Nueva Transacción</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input type="number" placeholder="0.00" className="flex-1 bg-slate-100 rounded-xl text-2xl font-black p-4 text-right outline-none" 
              value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
            <select className="bg-slate-200 rounded-xl px-3 font-bold" value={formData.curr} onChange={e => setFormData({...formData, curr: e.target.value})}>
              <option value="ARS">ARS</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="bg-slate-100 p-1 rounded-xl flex">
            <button type="button" onClick={() => setType('expense')} className={`flex-1 py-2 text-xs font-bold rounded-lg ${type === 'expense' ? 'bg-white shadow text-red-500' : 'text-slate-500'}`}>Gasto</button>
            <button type="button" onClick={() => setType('income')} className={`flex-1 py-2 text-xs font-bold rounded-lg ${type === 'income' ? 'bg-white shadow text-emerald-500' : 'text-slate-500'}`}>Ingreso</button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {(type === 'expense' ? cats.exp : cats.inc).map(c => (
              <button type="button" key={c} onClick={() => setFormData({...formData, cat: c})} 
                className={`px-4 py-2 rounded-xl text-xs font-bold border whitespace-nowrap ${formData.cat === c ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'}`}>{c}</button>
            ))}
          </div>
          <input type="text" placeholder="¿Qué compraste?" className="w-full bg-slate-50 border p-3 rounded-xl outline-none" 
            value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />
          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"><Save className="w-5 h-5" /> GUARDAR</button>
        </form>
      </div>
    </div>
  );
}
