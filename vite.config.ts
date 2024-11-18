import { resolve } from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
// import { analyzer } from 'vite-bundle-analyzer'
import vitePluginDemo from './build/vite-plugin-demo'

export default defineConfig(({ mode }) => {
  const nodeEnv = loadEnv(mode, './').VITE_USER_NODE_ENV
  return {
    optimizeDeps: {
      include: [
        'seemly',
      ],
    },
    define: {
      __DEV__: nodeEnv !== 'production',
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
  }
})
