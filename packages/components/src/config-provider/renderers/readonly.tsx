import type { VNodeChild } from 'vue'
import type { ProFieldConfig } from '../../form'

export const builtInReadonlyRenderers: Record<ProFieldConfig['name'], (opt: { value: any }) => VNodeChild> = {
  ProSwitch: ({ value }) => {
    return value ? '打开' : '关闭'
  },
}
