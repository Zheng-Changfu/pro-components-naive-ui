import type { ArrayFieldAction } from 'pro-components-hooks'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../composables'

export type ProFormListInst = ArrayFieldAction

const [
  provideFormListInstStore,
  useInjectFormListInstStore,
] = createInjectionState(useComponentInst<ProFormListInst>)

export {
  provideFormListInstStore,
  useInjectFormListInstStore,
}
