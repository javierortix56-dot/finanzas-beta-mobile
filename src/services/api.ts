import { DashboardData, Transaction } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  getDashboardData: async (): Promise<DashboardData> => {
    const res = await fetch(API_URL);
    return await res.json();
  },

  saveTransaction: async (tx: Transaction) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(tx)
    });
    return await res.json();
  }
};
