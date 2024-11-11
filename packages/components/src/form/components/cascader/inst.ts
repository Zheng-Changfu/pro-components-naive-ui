import type { CascaderInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProCascaderInst = CascaderInst

const [
  provideCascaderInstStore,
  useInjectCascaderInstStore,
] = createInjectionState(useComponentInst<ProCascaderInst>)

export {
  provideCascaderInstStore,
  useInjectCascaderInstStore,
}
