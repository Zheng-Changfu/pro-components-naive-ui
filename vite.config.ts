import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import vitePluginDemo from './build/vite-plugin-demo'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...vitePluginDemo(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
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
})
