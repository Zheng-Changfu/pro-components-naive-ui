import type { TimePickerInst } from 'naive-ui'
import { useComponentInst } from '../../../composables'

export type ProTimePickerInst = TimePickerInst

const [
  provideTimePickerInstStore,
  useInjectTimePickerInstStore,
] = createInjectionState(useComponentInst<ProTimePickerInst>)

export {
  provideTimePickerInstStore,
  useInjectTimePickerInstStore,
}
