import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://mohamed3333.runasp.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: adjust based on your API path
      },
    },
  },
});
