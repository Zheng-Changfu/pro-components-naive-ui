import { resolve } from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
// import { analyzer } from 'vite-bundle-analyzer'
import vitePluginDemo from './build/vite-plugin-demo'
import { ProNaiveUiResolver } from './packages/resolver/index'

export default defineConfig(({ mode }) => {
  const nodeEnv = loadEnv(mode, './').VITE_USER_NODE_ENV
  return {
    optimizeDeps: {
      include: [
        'seemly',
        'mockjs',
      ],
    },
    define: {
      '__DEV__': nodeEnv !== 'production',
      'process.env.NODE_ENV': nodeEnv !== 'production',
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
        resolvers: [
          NaiveUiResolver(),
          ProNaiveUiResolver(),
        ],
      }),
      // analyzer(),
    ],
    resolve: {
      alias: [
        {
          find: 'pro-naive-ui',
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
            'vue': ['vue'],
            'naive-ui': ['naive-ui'],
            'vue-router': ['vue-router'],
            'css-render': [
              'css-render',
              '@css-render/vue3-ssr',
              '@css-render/plugin-bem',
            ],
            'vicons': [
              '@vicons/antd',
              '@vicons/fluent',
              '@vicons/ionicons5',
            ],
          },
        },
      },
    },
  }
})
