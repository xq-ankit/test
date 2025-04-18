import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/evaluation-service': {
        target: 'http://20.244.56.144',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})