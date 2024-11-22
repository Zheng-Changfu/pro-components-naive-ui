import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './index.ts',
    },
    minify: false,
    rollupOptions: {
      output: [
        {
          format: 'es',
          dir: './dist',
          entryFileNames: 'index.mjs',
          exports: 'named',
        },
        {
          format: 'cjs',
          dir: './dist',
          entryFileNames: 'index.cjs',
          exports: 'named',
        },
      ],
    },
  },
})
