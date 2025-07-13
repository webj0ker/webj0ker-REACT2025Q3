import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  base: '/webj0ker-REACT2025Q3/',
  plugins: [react()],
});
