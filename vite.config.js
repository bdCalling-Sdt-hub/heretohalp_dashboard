import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/confi/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "159.65.217.35",
    port: "4174",
  },
})
