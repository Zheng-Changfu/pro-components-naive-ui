import type { TimePickerInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../composables'

export type ProTimePickerInst = PickFunction<TimePickerInst>
export const useProTimePickerInst = createProComponentInstanceFactory<ProTimePickerInst>('ProTime')
