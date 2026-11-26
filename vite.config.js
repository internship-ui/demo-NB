import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages subpath base
  base: process.env.VITE_BASE || '/demo-NB/',
  server: {
    port: 3000,
    open: false
  }
})
