/// <reference types='vitest' />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  root: __dirname,
  cacheDir: "./node_modules/.vite/apps/client",

  server: {
    port: 3000,
    host: "localhost",
  },

  preview: {
    port: 4300,
    host: "localhost",
  },

  plugins: [react(), viteTsconfigPaths(), svgr({ include: "**/*.svg" })],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../dist/web",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
