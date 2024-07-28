import type { InputInst } from 'naive-ui'
import { createProComponentInstanceFactory } from '../../../hooks'
import type { PickFunction } from '../../../types'

export type ProPasswordInst = PickFunction<InputInst>
export const useProPasswordInst = createProComponentInstanceFactory<ProPasswordInst>('ProPassword')
