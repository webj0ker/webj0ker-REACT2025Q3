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
  test: {
    environment: 'jsdom',
    globals: true, 
    coverage: {
      reporter: ['text', 'json', 'html'],
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
    setupFiles: ['./src/setupTests.ts'],
  },
});
