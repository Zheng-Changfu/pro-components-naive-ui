import type { DatePickerInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDateQuarterInstance = PickFunction<DatePickerInst>
export const useProDateQuarterInstance = createProComponentInstanceFactory('ProDateQuarter')
