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
    amount: '',
    curr: 'ARS',
    cat: '',
    desc: '',
    date: new Date().toISOString().split('T')[0],
    exec: true, 
    linkId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.cat || !formData.desc) return;

    const origAmt = parseFloat(formData.amount);
    const finalAmount = formData.curr === 'USD' ? origAmt * usdRate : origAmt;

    const newTx: Transaction = {
      id: Date.now(),
      date: formData.date,
      amount: finalAmount,
      origAmt: origAmt,
      curr: formData.curr as 'ARS' | 'USD',
      type,
      cat: formData.cat,
      desc: formData.desc,
      exec: formData.exec,
      linkId: formData.linkId ? Number(formData.linkId) : null,
    };

    onSave(newTx);
  };

  const currentCats = type === 'expense' ? cats.exp : cats.inc;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex items-end sm:items-center justify-center animate-fade-in">
      <div className="bg-white w-full max-w-md h-[90vh] sm:h-auto rounded-t-[24px] sm:rounded-3xl p-6 shadow-2xl overflow-y-auto">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">Nueva Transacción</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex gap-3">
            <input
              type="number"
              inputMode="decimal"
              placeholder="0.00"
              className="flex-1 bg-[#F1F5F9] border-none rounded-xl text-2xl font-black text-right p-4 text-slate-800 focus:ring-2 focus:ring-[#3B82F6] outline-none"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              autoFocus
            />
            <select
              className="bg-[#E2E8F0] border-none rounded-xl font-bold text-slate-700 px-3 text-sm focus:ring-0 outline-none w-20 text-center"
              value={formData.curr}
              onChange={e => setFormData({...formData, curr: e.target.value})}
            >
              <option value="ARS">ARS</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div className="bg-[#E2E8F0] p-1 rounded-xl flex">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'expense' ? 'bg-white shadow text-[#EF4444]' : 'text-slate-500'}`}
            >
              Gasto
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${type === 'income' ? 'bg-white shadow text-[#10B981]' : 'text-slate-500'}`}
            >
              Ingreso
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Categoría</label>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
              {currentCats.map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setFormData({...formData, cat: c})}
                  className={`px-4 py-2 rounded-[10px] text-xs font-bold whitespace-nowrap border transition-all ${formData.cat === c ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md' : 'bg-white border-slate-200 text-slate-500'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Concepto</label>
            <input
              type="text"
              placeholder="Ej: Supermercado"
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-semibold text-slate-700 focus:border-[#3B82F6] outline-none"
              value={formData.desc}
              onChange={e => setFormData({...formData, desc: e.target.value})}
            />
          </div>

          {type === 'expense' && (
            <div className="animate-fade-in">
              <label className="block text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-wider mb-2">Vincular a Ingreso (Opcional)</label>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                <button
                    type="button"
                    onClick={() => setFormData({...formData, linkId: ''})}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap border ${!formData.linkId ? 'bg-[#3B82F6] text-white border-[#3B82F6]' : 'bg-white border-slate-200 text-slate-400'}`}
                  >
                    Ninguno
                  </button>
                {incomes.map(inc => (
                  <button
                    type="button"
                    key={inc.id}
                    onClick={() => setFormData({...formData, linkId: inc.id.toString()})}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${formData.linkId === inc.id.toString() ? 'bg-[#3B82F6] text-white border-[#3B82F6]' : 'bg-white border-slate-200 text-slate-500'}`}
                  >
                    {inc.desc}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Fecha</label>
              <input
                type="date"
                className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 font-semibold text-slate-700 outline-none"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Estado</label>
              <div 
                className="flex items-center gap-2 bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 h-[50px] cursor-pointer"
                onClick={() => setFormData({...formData, exec: !formData.exec})}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.exec ? 'bg-[#0F172A] border-[#0F172A]' : 'border-slate-300'}`}>
                  {formData.exec && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-xs font-bold text-slate-600 select-none">Congelar Tasa</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F172A] text-white py-4 rounded-xl font-extrabold text-[15px] shadow-lg shadow-slate-900/20 active:scale-95 transition-transform flex items-center justify-center gap-2 mt-4"
          >
            <Save className="w-5 h-5" />
            GUARDAR
          </button>
        </form>
      </div>
    </div>
  );
}
