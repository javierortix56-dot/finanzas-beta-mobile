import { DataPayload } from '../types';
const API_URL = "https://script.google.com/macros/s/AKfycbxEni9GJ4gxmbhmNsbzoYxS_SfhcorqsXj4zh93-qWIy5i2R4jwvgJ8L25GcU3h3Bkh/exec";

export const api = {
  sync: async (payload?: DataPayload) => {
    try {
      const options: RequestInit = {
        method: payload ? 'POST' : 'GET',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload ? JSON.stringify(payload) : undefined
      };
      const response = await fetch(API_URL, options);
      return await response.json();
    } catch (error) { console.error("Sync error:", error); throw error; }
  }
};
