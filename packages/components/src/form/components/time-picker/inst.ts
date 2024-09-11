import type { TimePickerInst } from 'naive-ui'
import { createProComponentInstanceFactory } from '../../../composables'
import type { PickFunction } from '../../../types'

export type ProTimePickerInst = PickFunction<TimePickerInst>
export const useProTimePickerInst = createProComponentInstanceFactory<ProTimePickerInst>('ProTime')
