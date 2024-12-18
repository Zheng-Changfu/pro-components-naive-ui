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
        name: 'proNaive',
        formats: ['umd'],
      },
      minify: dev ? false : 'terser',
      emptyOutDir: false,
      rollupOptions: {
        external: ['vue', 'naive-ui'],
        output: {
          dir: 'dist',
          entryFileNames: dev ? 'index.js' : 'index.prod.js',
          exports: 'named',
          globals: {
            'vue': 'Vue',
            'naive-ui': 'naive',
          },
        },
        plugins: [
          babel({
            babelHelpers: 'bundled',
          }),
          replace({
            values: {
              '__DEV__': JSON.stringify(dev),
              'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
            },
            preventAssignment: true,
          }),
        ],
      },
    },
  }
})
