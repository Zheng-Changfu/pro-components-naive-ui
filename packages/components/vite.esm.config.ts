import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
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
      //  https://vitejs.cn/vite5-cn/config/build-options.html#build-minify
      minify: false,
      emptyOutDir: false,
      rollupOptions: {
        external: ['vue', 'naive-ui'],
        output: {
          dir: 'dist',
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
          // https://github.com/vitejs/vite/issues/8848#issuecomment-1179770202
          !dev && terser(),
        ],
      },
    },
  }
})
