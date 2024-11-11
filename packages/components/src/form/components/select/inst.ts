import type { SelectInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProSelectInst = SelectInst

const [
  provideSelectInstStore,
  useInjectSelectInstStore,
] = createInjectionState(useComponentInst<ProSelectInst>)

export {
  provideSelectInstStore,
  useInjectSelectInstStore,
}
