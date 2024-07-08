import type { DatePickerInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDateYearInstance = PickFunction<DatePickerInst>
export const useProDateYearInstance = createProComponentInstanceFactory('ProDateYear')
