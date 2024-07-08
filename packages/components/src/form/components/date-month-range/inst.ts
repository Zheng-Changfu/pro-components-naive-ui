import type { DatePickerInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDateMonthRangeInstance = PickFunction<DatePickerInst>
export const useProDateMonthRangeInstance = createProComponentInstanceFactory('ProDateMonthRange')
