import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    target: 'es2018',
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2018'
    }
  },
  server: {
    port: 3000
  }
});
