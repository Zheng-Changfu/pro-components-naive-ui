import type { DatePickerInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDatePickerInst = PickFunction<DatePickerInst>
export const useProDatePickerInst = createProComponentInstanceFactory('ProDatePicker')
