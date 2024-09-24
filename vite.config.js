import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  server: {https: true},
  plugins: [react(), mkcert()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
