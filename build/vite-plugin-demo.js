import vue from '@vitejs/plugin-vue'
import getTransformedVueSrc from './utils/get-demo-by-path'

// eslint-disable-next-line regexp/no-unused-capturing-group
const fileRegex = /\.(md|vue)$/

const vuePlugin = vue({
  include: [/\.vue$/, /\.md$/],
})

export default function createDemoPlugin() {
  const naiveDemoVitePlugin = {
    name: 'demo-vite',
    transform(_, id) {
      if (fileRegex.test(id)) {
        return getTransformedVueSrc(id)
      }
    },
    async handleHotUpdate(ctx) {
      const { file } = ctx
      if (fileRegex.test(file)) {
        const code = await getTransformedVueSrc(file)
        return vuePlugin.handleHotUpdate({
          ...ctx,
          read: () => code,
        })
      }
    },
  }

  return [naiveDemoVitePlugin, vuePlugin]
}
