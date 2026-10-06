import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/community-poll-builder/",
  build: {
    sourcemap: false,
  },
  plugins: [react()],
});