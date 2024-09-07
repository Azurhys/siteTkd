import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // écoute sur toutes les interfaces réseau
    port: 5173, // le port où Vite sera exposé
    proxy: {
      '/api': {
        target: 'http://localhost:9017', // URL de votre backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Réécrire les chemins si nécessaire
      }
    }
  },
})
