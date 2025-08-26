import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import istanbul from 'vite-plugin-istanbul';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.tsx'],
    }),
  ],
});
