import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    dedupe: [
      'vue',
    ],
  },
  test: {
    environment: 'jsdom',
    reporters: 'dot',
  },
})
