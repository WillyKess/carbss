import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { optimizeImports } from "carbon-preprocess-svelte";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [svelte({ preprocess: [optimizeImports()] })],
    build: { minify: mode === "production" },
  };
});