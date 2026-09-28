import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  // Safari-specific build optimizations
  build: {
    // ES2018 for better Safari compatibility (Safari 12+)
    target: "es2018",
    // Split CSS into separate files for parallel loading
    cssCodeSplit: true,
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        // Separate React into its own chunk for better caching
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
