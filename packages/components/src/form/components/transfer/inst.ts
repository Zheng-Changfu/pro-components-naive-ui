import type { UseRequestReturned } from 'pro-components-hooks'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

interface Instance {
  getFetchControls: () => UseRequestReturned<any, any>
}
export type ProTransferInstance = PickFunction<Instance>
export const useProTransferInstance = createProComponentInstanceFactory<ProTransferInstance>('ProTransfer')
