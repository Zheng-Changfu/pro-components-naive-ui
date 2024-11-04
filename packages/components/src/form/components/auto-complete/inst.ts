import type { AutoCompleteInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProAutoCompleteInst = AutoCompleteInst

const [
  provideAutoCompleteInstStore,
  useInjectAutoCompleteInstStore,
] = createInjectionState(useComponentInst<ProAutoCompleteInst>)

export {
  provideAutoCompleteInstStore,
  useInjectAutoCompleteInstStore,
}
