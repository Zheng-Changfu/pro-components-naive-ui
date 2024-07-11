import type { CheckboxInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProCheckboxInstance = PickFunction<CheckboxInst>
export const useProCheckboxInstance = createProComponentInstanceFactory<ProCheckboxInstance>('ProCheckbox')
