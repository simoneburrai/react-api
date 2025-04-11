import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Questo è il percorso che userai nel tuo codice React
        target: 'https://freetestapi.com', // L'URL base dell'API esterna
        changeOrigin: true, // Fondamentale per evitare errori CORS
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'), // Riscrive il percorso se necessario
      },
    },
  },
});
