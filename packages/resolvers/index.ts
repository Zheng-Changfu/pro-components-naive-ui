import type { ComponentResolver } from 'unplugin-vue-components'

export function ProComponentsNaiveUiResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(Pro[A-Z]|pro-[a-z]|drawer-form|DrawerForm)/)) {
        return { name, from: 'pro-components-naive-ui' }
      }
    },
  }
}
