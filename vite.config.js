import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { VitePWA } from "vite-plugin-pwa";
import compression from "vite-plugin-compression2";
import dns from "dns";
import path from "path";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  // base: "/admin/",
  build: {
    assetsDir: "@/assets",
    chunkSizeWarningLimit: 10 * 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
      external: [
        "fsevents",
        "node:fs",
        "node:path",
        "node:process",
        "node:child_process",
      ],
    },
    target: "esnext",
    minify: "esbuild",
  },

  esbuild: {
    loader: 'jsx', // Use esbuild for JSX instead of SWC
  },

  optimizeDeps: {
    force: true,
    esbuildOptions: {
      target: "esnext",
      jsx: "automatic",
      platform: "browser",
    },
    exclude: ["fsevents"],
  },

  plugins: [
    react({
      jsxRuntime: "automatic",
      babel: false,
      fastRefresh: true,
    }),
    cssInjectedByJsPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
        type: "module",
        navigateFallback: "index.html",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      },
      includeAssets: [
        "src/assets/img/logo/*.png",
        "src/assets/img/*.png",
        "src/assets/img/*.jepg",
        "src/assets/img/*.webp",
        "favicon.ico",
      ],
      manifest: {
        theme_color: "#FFFFFF",
        background_color: "#FFFFFF",
        display: "standalone",
        orientation: "portrait",
        scope: ".",
        start_url: ".",
        id: ".",
        short_name: "Suft - E-Commerce Website",
        name: "Suft : eCommerce Admin Dashboard",
        description:
          "Suft : Furniture Store e-commerce Admin Dashboard",
        icons: [
          {
            src: "favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    compression(),
  ],

  server: {
    proxy: {
      "/api/": {
        target: "http://localhost:5065",
        changeOrigin: true,
      },
    },
  },

  define: {
    "process.env": process.env,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
    // Add mainFields to prioritize browser-specific entry points
    mainFields: ["browser", "module", "main"],
  },

  test: {
    global: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTest.js"],
  },
});
