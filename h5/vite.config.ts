import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteEslint()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
