import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
    // Keep the warning useful for accidental regressions while allowing a few
    // self-contained route chunks to remain moderately large.
    chunkSizeWarningLimit: 600,
  },
})