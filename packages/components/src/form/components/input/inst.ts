import type { InputInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProInputInst = InputInst
export type ProPasswordInst = InputInst
export type ProTextareaInst = InputInst

const [
  provideTextInstStore,
  useInjectTextInstStore,
] = createInjectionState(useComponentInst<InputInst>)

export {
  provideTextInstStore,
  useInjectTextInstStore,
}
