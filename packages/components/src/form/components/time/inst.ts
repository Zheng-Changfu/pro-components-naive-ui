import type { TimePickerInst } from 'naive-ui'
import { createProComponentInstanceFactory } from '../../../hooks'
import type { PickFunction } from '../../../types'

export type ProTimeInstance = PickFunction<TimePickerInst>
export const useProTimeInstance = createProComponentInstanceFactory('ProTime')
