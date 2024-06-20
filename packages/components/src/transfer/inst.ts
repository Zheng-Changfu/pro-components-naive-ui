import type { UseRequestReturned } from 'pro-components-hooks'
import type { PickFunction } from '../types'

interface Instance {
  getFetchControls: () => UseRequestReturned<any, any>
}
export type ProTransferInstance = PickFunction<Instance>
