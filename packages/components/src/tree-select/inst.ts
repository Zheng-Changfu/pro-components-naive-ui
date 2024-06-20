import type { TreeSelectInst } from 'naive-ui'
import type { UseRequestReturned } from 'pro-components-hooks'
import type { PickFunction } from '../types'

export type ProTreeSelectInstance = PickFunction<TreeSelectInst & {
  getFetchControls: () => UseRequestReturned<any, any>
}>
