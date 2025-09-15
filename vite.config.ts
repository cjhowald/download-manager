/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      name: "DownloadManager",
      fileName: "download-manager",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSX",
        },
      },
    },
  },
  test: {
    browser: {
      enabled: true,
      provider: "playwright",
      headless: true,
      instances: [{ browser: "chromium" }],
    },
    coverage: {
      exclude: [
        "*.config.[tj]s",
        "src/demo/*",
        "**/*.d.ts",
        "lib/*",
        "src/components/index.ts",
        "dist/*",
        "**/types/*.ts",
      ],
    },
  },
});
