import type { DatePickerInst } from 'naive-ui'
import { useComponentInst } from '../../../composables'

export type ProDatePickerInst = DatePickerInst
export const useProDatePickerInst = createSharedComposable(useComponentInst<ProDatePickerInst>)
