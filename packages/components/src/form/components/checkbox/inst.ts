import type { CheckboxInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../composables'

export type ProCheckboxInst = PickFunction<CheckboxInst>
export const useProCheckboxInst = createProComponentInstanceFactory<ProCheckboxInst>('ProCheckbox')
