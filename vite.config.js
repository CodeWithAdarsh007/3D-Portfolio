import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    manifest: true,
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler") || id.includes("react-router")) {
            return "react";
          }
          if (id.includes("motion") || id.includes("framer")) return "motion";
          if (id.includes("lucide")) return "icons";
          return undefined;
        },
      },
    },
  },
});