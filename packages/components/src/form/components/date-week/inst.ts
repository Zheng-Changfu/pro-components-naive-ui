import type { DatePickerInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDateWeekInstance = PickFunction<DatePickerInst>
export const useProDateWeekInstance = createProComponentInstanceFactory('ProDateWeek')
