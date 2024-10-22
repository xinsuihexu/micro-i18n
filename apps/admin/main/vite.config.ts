import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import Autoprefixer from 'autoprefixer'

export default defineConfig(() => ({
  plugins: [
    vue({
      script: {
        // defineModel: true,
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

  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },

  resolve: {
    alias: {
      '@admin/main': path.resolve(__dirname, './src'),
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
    origin: 'http://localhost',
    port: 6060,
  },
}))
