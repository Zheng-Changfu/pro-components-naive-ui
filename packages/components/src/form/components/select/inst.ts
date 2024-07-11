import type { SelectInst } from 'naive-ui'
import type { UseRequestReturned } from 'pro-components-hooks'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProSelectInstance = PickFunction<SelectInst & {
  getFetchControls: () => UseRequestReturned<any, any>
}>
export const useProSelectInstance = createProComponentInstanceFactory<ProSelectInstance>('ProSelect')
