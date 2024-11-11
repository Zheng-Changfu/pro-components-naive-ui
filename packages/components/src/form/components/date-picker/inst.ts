import type { DatePickerInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProDatePickerInst = DatePickerInst

const [
  provideDatePickerInstStore,
  useInjectDatePickerInstStore,
] = createInjectionState(useComponentInst<ProDatePickerInst>)

export {
  provideDatePickerInstStore,
  useInjectDatePickerInstStore,
}
