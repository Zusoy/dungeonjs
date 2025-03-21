import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [tsConfigPaths(), react()],
  server: {
    port: 3000,
    host: true
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
})
