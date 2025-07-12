import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: '/',
    hmr: true,
  },
  build: {
    emptyOutDir: true,
  },
  resolve: { preserveSymlinks: true },
  base: './',
});
