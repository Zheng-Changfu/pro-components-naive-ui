import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const dev = mode === 'dev'
  return {
    plugins: [
      vueJsx(),
    ],
    build: {
      lib: {
        entry: './src/index.ts',
        formats: ['es'],
      },
      minify: dev ? false : 'terser',
      emptyOutDir: false,
      rollupOptions: {
        external: ['vue', 'naive-ui'],
        output: {
          dir: 'dist',
          format: 'esm',
          entryFileNames: dev ? 'index.mjs' : 'index.prod.mjs',
        },
        plugins: [
          replace({
            values: {
              '__DEV__': JSON.stringify(dev),
              'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
            },
            preventAssignment: true,
          }),
          babel({
            babelHelpers: 'bundled',
          }),
        ],
      },
    },
  }
})
