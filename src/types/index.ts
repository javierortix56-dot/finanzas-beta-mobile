export interface Transaction {
  id: string;
  date: string;
  amount: number;
  origAmt: number;
  curr: 'ARS' | 'USD';
  type: 'exp' | 'inc';
  cat: string;
  desc: string;
  exec: boolean;
  linkId?: string | null;
}

export interface DashboardData {
  balance: number;
  balanceUsd: number;
  income: number;
  expenses: number;
  transactions: Transaction[];
}
