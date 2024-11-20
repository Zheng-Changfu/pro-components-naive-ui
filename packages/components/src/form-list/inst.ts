import type { ArrayFieldAction } from 'pro-composables'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../composables'

export type ProFormListInst<Values = any> = ArrayFieldAction<Values>

const [
  provideFormListInstStore,
  useInjectFormListInstStore,
] = createInjectionState(useComponentInst<ProFormListInst>)

export {
  provideFormListInstStore,
  useInjectFormListInstStore,
}
