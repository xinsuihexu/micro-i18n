import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      resolvers: [],
      dts: 'src/auto-imports.d.ts',
    }),
  ],

  resolve: {
    alias: {
      '@admin-config': path.resolve(__dirname, './src'),
    },
    extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx', '.json', '.mjs'],
  },

  css: {
    postcss: {
      plugins: [
        Autoprefixer({
          overrideBrowserslist: ['defaults'],
        }),
      ],
    },
  },

  server: {
    port: 6062,
  },
})
