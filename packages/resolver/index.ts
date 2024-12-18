import type { ComponentResolver } from 'unplugin-vue-components'

export function ProNaiveUIResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(Pro[A-Z]|pro-[a-z])/)) {
        return { name, from: 'pro-naive-ui' }
      }
    },
  }
}
