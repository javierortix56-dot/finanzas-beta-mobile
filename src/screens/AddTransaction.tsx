import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Transaction } from '../types';

interface AddTransactionProps { onClose: () => void; onSave: (tx: Transaction) => void; }

const AddTransaction: React.FC<AddTransactionProps> = ({ onClose, onSave }) => {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState('Varios');
  const [curr, setCurr] = useState<'ARS'|'USD'>('ARS');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = () => {
    if(!amount) return;
    setIsSaving(true);
    const numAmount = parseFloat(amount); 
    const finalAmount = curr === 'USD' ? numAmount * 1200 : numAmount;

    const newTx: Transaction = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        amount: finalAmount, origAmt: numAmount, curr: curr,
        type: type === 'expense' ? 'exp' : 'inc',
        cat: cat, desc: desc || 'Sin concepto', exec: true
    };
    onSave(newTx);
  };

  return (
    <div className="flex flex-col h-[92vh] bg-white/95 dark:bg-[#1e2029]/95 backdrop-blur-2xl w-full rounded-t-3xl shadow-2xl animate-slide-up">
      <div className="flex-shrink-0 pt-3 pb-1 flex justify-center w-full cursor-pointer" onClick={onClose}><div className="w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600/50"></div></div>
      <div className="px-6 pt-2 pb-4 flex justify-between items-center"><div className="w-12"></div><button onClick={onClose} className="text-primary font-bold text-base">Cancel</button></div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="flex flex-col items-center justify-center pt-2 pb-8 px-6">
            <button onClick={() => setCurr(curr === 'ARS' ? 'USD' : 'ARS')} className="flex items-center gap-2 bg-gray-100 dark:bg-black/20 px-4 py-2 rounded-full mb-4"><span className="font-bold text-sm">{curr}</span><ChevronDown size={14} /></button>
            <div className="relative w-full flex justify-center items-center"><input autoFocus className="w-full bg-transparent text-center text-6xl font-extrabold text-gray-900 dark:text-white border-none focus:ring-0 p-0 tracking-tight placeholder-gray-300 outline-none" inputMode="decimal" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
        </div>

        <div className="px-6 mb-8"><div className="flex p-1.5 bg-gray-100 dark:bg-black/20 rounded-2xl">
            <button onClick={() => setType('expense')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${type === 'expense' ? 'bg-white dark:bg-[#2c3035] text-primary shadow-sm' : 'text-gray-500'}`}>Gasto</button>
            <button onClick={() => setType('income')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${type === 'income' ? 'bg-white dark:bg-[#2c3035] text-emerald-500 shadow-sm' : 'text-gray-500'}`}>Ingreso</button>
        </div></div>

        <div className="px-6 mb-6"><label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Concepto</label><input type="text" className="w-full bg-gray-50 dark:bg-black/20 border border-transparent focus:border-primary rounded-xl p-4 font-semibold text-lg dark:text-white outline-none" placeholder="¿En qué gastaste?" value={desc} onChange={e => setDesc(e.target.value)} /></div>

        <div className="px-6 mb-8"><h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Categoría</h3><div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {['Comida', 'Casa', 'Transporte', 'Salidas', 'Servicios'].map(c => (<button key={c} onClick={() => setCat(c)} className={`flex-shrink-0 px-5 py-3 rounded-2xl font-semibold text-sm border transition-all ${cat === c ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-black/20 border-gray-100 dark:border-gray-800 dark:text-gray-300'}`}>{c}</button>))}
        </div></div>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-6 pt-2 pb-8 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-[#15161e] dark:via-[#15161e]/95 z-20">
         <button onClick={handleSubmit} disabled={isSaving} className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-[24px] shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70">{isSaving ? <span>Guardando...</span> : <><span>Guardar</span> <ArrowRight size={24} /></>}</button>
      </div>
    </div>
  );
};
export default AddTransaction;
