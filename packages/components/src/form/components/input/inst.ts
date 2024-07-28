import type { InputInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProInputInst = PickFunction<InputInst>
export const useProInputInst = createProComponentInstanceFactory<ProInputInst>('ProInput')
