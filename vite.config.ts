import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// VITE_BASE_PATH can be set to '/<repo-name>/' for GitHub Pages subdirectory
// hosting, or '/' when using a custom domain. Defaults to './' for local dev.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts']
  }
})
