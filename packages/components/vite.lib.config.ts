import path from 'node:path'
import replace from '@rollup/plugin-replace'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import externalNodeModules from './plugins/external-node_modules'

export default defineConfig({
  plugins: [
    externalNodeModules(),
    vueJsx(),
    dts({
      outDir: 'lib',
      tsconfigPath: path.resolve(__dirname, './tsconfig.cjs.json'),
    }),
  ],
  build: {
    minify: false,
    lib: {
      entry: './src/index.ts',
      formats: ['cjs'],
    },
    emptyOutDir: false,
    rollupOptions: {
      output: {
        dir: 'lib',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        exports: 'named',
      },
      plugins: [
        replace({
          values: {
            __DEV__: 'process.env.NODE_ENV !== \'production\'',
          },
          preventAssignment: true,
        }),
      ],
    },
  },
})
