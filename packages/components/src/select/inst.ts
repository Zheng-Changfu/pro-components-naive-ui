import type { SelectInst } from 'naive-ui'
import type { UseRequestReturned } from 'pro-components-hooks'
import type { PickFunction } from '../types'

export type ProSelectInstance = PickFunction<SelectInst & {
  getFetchControls: () => UseRequestReturned<any, any>
}>
