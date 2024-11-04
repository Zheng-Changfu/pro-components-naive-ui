import type { CheckboxInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProCheckboxInst = CheckboxInst

const [
  provideCheckboxInstStore,
  useInjectCheckboxInstStore,
] = createInjectionState(useComponentInst<ProCheckboxInst>)

export {
  provideCheckboxInstStore,
  useInjectCheckboxInstStore,
}
