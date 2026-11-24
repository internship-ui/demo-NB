import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages repository subpath base: /NBT1/
  base: process.env.VITE_BASE || '/NBT1/',
  server: {
    port: 3000,
    open: false
  }
})
