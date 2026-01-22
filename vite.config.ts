import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/finanzas-beta-mobile/', // <-- Agrega esta línea con el nombre de tu repo
})
