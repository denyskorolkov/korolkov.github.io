import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  build: isSsrBuild
    ? { outDir: '.ssr-build', emptyOutDir: true }
    : {
        outDir: 'docs',
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            notes: resolve(__dirname, 'notes/index.html')
          }
        }
      }
}));
