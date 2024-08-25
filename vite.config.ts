import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
// import { analyzer } from 'vite-bundle-analyzer'
import vitePluginDemo from './build/vite-plugin-demo'

export default defineConfig({
  optimizeDeps: {
    include: [
      'seemly',
    ],
  },
  plugins: [
    UnoCSS(),
    ...vitePluginDemo(),
    vueJsx({}),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    // analyzer(),
  ],
  resolve: {
    alias: [
      {
        find: 'pro-components-naive-ui',
        replacement: resolve(__dirname, './packages/components/index.ts'),
      },
      {
        find: '/demo',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'naive-ui': ['naive-ui'],
        },
      },
    },
  },
})
