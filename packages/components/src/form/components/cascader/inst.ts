import type { CascaderInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProCascaderInst = PickFunction<CascaderInst>
export const useCascaderInst = createProComponentInstanceFactory<ProCascaderInst>('ProCascader')
