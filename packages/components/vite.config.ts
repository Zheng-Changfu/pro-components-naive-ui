import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts'),
      fileName: 'index',
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          dir: './dist',
        },
        {
          format: 'cjs',
          dir: './dist',
        },
      ],
      external: [
        'vue',
        'naive-ui',
      ],
    },
  },
})
