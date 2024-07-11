import type { DatePickerInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDateMonthInstance = PickFunction<DatePickerInst>
export const useProDateMonthInstance = createProComponentInstanceFactory('ProDateMonth')
