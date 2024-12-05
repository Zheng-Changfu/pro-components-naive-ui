import type { TreeSelectInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProTreeSelectInst = TreeSelectInst

const [
  provideTreeSelectInstStore,
  useInjectTreeSelectInstStore,
] = createInjectionState(useComponentInst<ProTreeSelectInst>)

export {
  provideTreeSelectInstStore,
  useInjectTreeSelectInstStore,
}
