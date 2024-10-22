import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  const {
    VITE_PORT,
    VITE_PROTOCOL,
    VITE_BASE_URL,
    VITE_PROXY_URL,
  } = loadEnv(mode, process.cwd())

  return defineConfig({
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
        dts: 'auto-imports.d.ts',
      }),
    ],

    resolve: {
      alias: {
        '@template': path.resolve(__dirname, './src'),
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
      origin: VITE_PROTOCOL + VITE_BASE_URL,
      port: +VITE_PORT,
      proxy: {
        '/api': {
          target: VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: path => path.replace('^/api', ''),
        },
      },
    },
  })
}
