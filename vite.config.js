import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Każde zapytanie zaczynające się od /api zostanie przekierowane
      '/api': {
        target: 'https://v3.football.api-sports.io', // Docelowy serwer API
        changeOrigin: true, // Niezbędne do poprawnego działania proxy
        rewrite: (path) => path.replace(/^\/api/, ''), // Usuwa '/api' z początku ścieżki
      },
    },
  },
})