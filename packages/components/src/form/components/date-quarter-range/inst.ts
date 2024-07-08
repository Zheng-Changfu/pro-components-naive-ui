import type { DatePickerInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDateQuarterRangeInstance = PickFunction<DatePickerInst>
export const useProDateQuarterRangeInstance = createProComponentInstanceFactory('ProDateQuarterRange')
