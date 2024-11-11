import type { InputNumberInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProDigitInst = InputNumberInst

const [
  provideDigitInstStore,
  useInjectDigitInstStore,
] = createInjectionState(useComponentInst<ProDigitInst>)

export {
  provideDigitInstStore,
  useInjectDigitInstStore,
}
