export interface Transaction {
  id: number;
  date: string;
  amount: number;      // Monto final en ARS
  origAmt: number;     // Monto original (ej. en USD)
  curr: 'ARS' | 'USD';
  type: 'income' | 'expense';
  cat: string;
  desc: string;
  exec: boolean;       // Si está "ejecutado" (tasa congelada)
  linkId?: number | null; // ID del ingreso al que está vinculado
  deletedAt?: number;
}

export interface DataPayload {
  txs: Transaction[];
  cats: {
    inc: string[];
    exp: string[];
  };
}
