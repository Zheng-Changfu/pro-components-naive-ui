import type { CascaderInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../composables'

export type ProCascaderInst = PickFunction<CascaderInst>
export const useProCascaderInst = createProComponentInstanceFactory<ProCascaderInst>('ProCascader')
