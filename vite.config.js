import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const serverPort = 3001;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": `https://localhost:${serverPort}`,
    },
  },
});
