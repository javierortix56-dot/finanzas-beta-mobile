import { DashboardData, Transaction } from '../types';

// Aquí leemos la URL que guardaste en los Secretos
const API_URL = import.meta.env.VITE_API_URL;

// Datos falsos por si la URL falla
const MOCK_DATA: DashboardData = {
  balance: 0, balanceUsd: 0, income: 0, expenses: 0, transactions: []
};

export const api = {
  getDashboardData: async (): Promise<DashboardData> => {
    if (!API_URL) {
      console.warn("No API URL found. Using Mock Data.");
      return MOCK_DATA;
    }
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      return data;
    } catch (e) {
      console.error("Error connecting to Google Sheets:", e);
      return MOCK_DATA;
    }
  },

  saveTransaction: async (tx: Transaction) => {
    if (!API_URL) return { success: true };
    
    // Usamos text/plain para evitar errores de CORS con Google Scripts
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(tx)
    });
    return await res.json();
  }
};
