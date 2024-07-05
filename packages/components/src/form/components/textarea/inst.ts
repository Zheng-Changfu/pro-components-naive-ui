import type { InputInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProTextareaInstance = PickFunction<InputInst>
export const useProTextareaInstance = createProComponentInstanceFactory<ProTextareaInstance>('ProTextarea')
