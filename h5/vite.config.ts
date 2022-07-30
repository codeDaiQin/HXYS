import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import viteEslint from 'vite-plugin-eslint';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), viteEslint()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
