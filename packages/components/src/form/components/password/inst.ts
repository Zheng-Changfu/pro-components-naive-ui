import type { InputInst } from 'naive-ui'
import { createProComponentInstanceFactory } from '../../../hooks'
import type { PickFunction } from '../../../types'

export type ProPasswordInstance = PickFunction<InputInst>
export const useProPasswordInstance = createProComponentInstanceFactory<ProPasswordInstance>('ProPassword')
