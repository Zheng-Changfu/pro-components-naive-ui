import type { DatePickerInst } from 'naive-ui'
import { createProComponentInstanceFactory } from '../../../hooks'
import type { PickFunction } from '../../../types'

export type ProDateRangeInstance = PickFunction<DatePickerInst>
export const useProDateRangeInstance = createProComponentInstanceFactory('ProDateRange')
