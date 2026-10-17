import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'build'
    ? '/e-plantShopping/'
    : '/shoppingreact/',

  cacheDir: 'vite_cache',

  plugins: [react()],
}));
