import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/shoppingreact/',
  cacheDir: 'vite_cache',
  plugins: [react()],
});
