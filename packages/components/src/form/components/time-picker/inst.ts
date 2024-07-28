import type { TimePickerInst } from 'naive-ui'
import { createProComponentInstanceFactory } from '../../../hooks'
import type { PickFunction } from '../../../types'

export type ProTimePickerInst = PickFunction<TimePickerInst>
export const useProTimePickerInst = createProComponentInstanceFactory<ProTimePickerInst>('ProTime')
