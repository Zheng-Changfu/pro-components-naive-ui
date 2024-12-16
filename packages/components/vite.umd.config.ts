import path from 'node:path'
import esbuild from 'rollup-plugin-esbuild'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const dev = mode === 'dev'
  return {
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
          esbuild({
            target: 'esnext',
            sourceMap: true,
            tsconfig: path.resolve(__dirname, './tsconfig.esbuild.json'),
          }),
        ],
      },
    },
    define: {
      '__DEV__': JSON.stringify(dev),
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
    },
  }
})
