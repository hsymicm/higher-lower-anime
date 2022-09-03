import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/higher-lower-anime/',
  plugins: [vue()],
  
  build: {
    emptyOutDir: true,
    rollupOptions: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor';
        } else if (id.includes('data.json')) {
          return 'group-data';
        }
        
      },
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
