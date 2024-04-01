import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

const serverPort = 3001;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    cors: true,
  //   proxy: {
  //     '/api': `https://localhost:${serverPort}`,
  //   },
  //   https: true,
  },
});
