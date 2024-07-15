import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import vitePluginDemo from './build/vite-plugin-demo'
import pkg from './package.json'

// eslint-disable-next-line node/prefer-global/process
const prod = process.env.NODE_ENV === 'production'
export default defineConfig({
  base: prod ? `/${pkg.name}/` : '/',
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
  ],
  define: {
    __BASE__: prod ? JSON.stringify(pkg.name) : JSON.stringify('/'),
  },
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
