import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-dom')) {
            return 'react-dom'
          }

          if (id.includes('react-router')) {
            return 'router'
          }

          if (id.includes('@tanstack')) {
            return 'tanstack'
          }

          if (id.includes('@radix-ui')) {
            return 'radix'
          }

          if (id.includes('react-select')) {
            return 'react-select'
          }

          if (id.includes('lucide-react')) {
            return 'icons'
          }

          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})