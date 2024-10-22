import path from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import autoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    autoImport({
      imports: [
        'vue',
        'uni-app',
      ],
      dts: 'auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@applet': path.resolve(__dirname, '..'),
      '@template': path.resolve(__dirname, './src'),
    },
    extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx', '.json', '.mjs'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
