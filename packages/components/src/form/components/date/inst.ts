import type { DatePickerInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProDateInstance = PickFunction<DatePickerInst>
export const useProDateInstance = createProComponentInstanceFactory('ProDate')
