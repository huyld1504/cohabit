import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        }
      }
    },
    sourcemap: false,
    minify: 'terser',
    target: 'es2018'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
