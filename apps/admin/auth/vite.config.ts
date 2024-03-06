import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
      ],
      resolvers: [],
      dts: 'src/auto-imports.d.ts',
    }),
  ],

  resolve: {
    alias: {
      '@admin-auth': path.resolve(__dirname, './src'),
    },
    extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx', '.json', '.mjs'],
    dedupe: ['vue'],
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
    origin: 'http://localhost',
    port: 6061,
  },
})
