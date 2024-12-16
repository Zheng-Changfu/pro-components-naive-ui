import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vueJsx(),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['cjs'],
    },
    emptyOutDir: false,
    rollupOptions: {
      external: ['vue', 'naive-ui'],
      output: {
        dir: 'lib',
      },
    },
  },
  define: {
    __DEV__: JSON.stringify('process.env.NODE_ENV !== \'production\''),
  },
})
