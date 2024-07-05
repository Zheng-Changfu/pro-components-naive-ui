import type { InputInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProInputInstance = PickFunction<InputInst>
export const useProInputInstance = createProComponentInstanceFactory<ProInputInstance>('ProInput')
