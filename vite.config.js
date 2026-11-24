import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages repository subpath base: /demo-NB/
  base: process.env.VITE_BASE || '/demo-NB/',
  server: {
    port: 3000,
    open: false
  }
})
