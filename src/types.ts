export interface Transaction {
  id: number;
  date: string;
  amount: number;
  origAmt: number;
  curr: 'ARS' | 'USD';
  type: 'income' | 'expense';
  cat: string;
  desc: string;
  exec: boolean;
  linkId?: number | null;
  deletedAt?: number;
}

export interface DataPayload {
  txs: Transaction[];
  cats: { inc: string[]; exp: string[]; };
}
