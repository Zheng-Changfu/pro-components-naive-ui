import type { SelectInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../composables'

export type ProSelectInst = PickFunction<SelectInst>
export const useProSelectInst = createProComponentInstanceFactory<ProSelectInst>('ProSelect')
