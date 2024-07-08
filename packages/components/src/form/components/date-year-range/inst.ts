import type { DatePickerInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDateYearRangeInstance = PickFunction<DatePickerInst>
export const useProDateYearRangeInstance = createProComponentInstanceFactory('ProDateYearRange')
