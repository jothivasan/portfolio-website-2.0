import path from "path";
import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite's SPA fallback otherwise serves the home document for extensionless URLs.
const contactDocument = (request: IncomingMessage, _response: ServerResponse, next: () => void) => {
  if (request.url && /^\/contact\/?(?:\?|$)/.test(request.url)) {
    request.url = request.url.replace(/^\/contact\/?(?=\?|$)/, "/contact/index.html");
  }
  next();
};

export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [react(), {
    name: "contact-document",
    configureServer(server) { server.middlewares.use(contactDocument); },
    configurePreviewServer(server) { server.middlewares.use(contactDocument); },
  }],
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
      input: {
        main: path.resolve(__dirname, "index.html"),
        contact: path.resolve(__dirname, "contact/index.html"),
      },
      output: {
        // Separate React into its own chunk for better caching
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
