import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import process from 'process';

const serverPort = process.env.PORT || 3001;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    cors: true,
    proxy: {
      '/api': `https://localhost:${serverPort}`,
    },
    https: true,
  },
});
