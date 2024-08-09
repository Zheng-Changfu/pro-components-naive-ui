import { resolve } from 'node:path'
// import process from 'node:process'
// import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['@vueuse/core', 'vue', 'vue-router', 'pinia'],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    // dts({
    //   rollupTypes: true,
    // }),
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
