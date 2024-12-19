import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      outDir: 'dist',
      rollupTypes: true,
      tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
    },
    minify: false,
    rollupOptions: {
      output: [
        {
          format: 'es',
          dir: './dist',
          entryFileNames: '[name].mjs',
        },
        {
          format: 'cjs',
          dir: './dist',
          entryFileNames: '[name].cjs',
          exports: 'named',
        },
      ],
    },
  },
})
