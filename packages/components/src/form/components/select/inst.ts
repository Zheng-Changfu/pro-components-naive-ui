import type { SelectInst } from 'naive-ui'
import type { UseRequestReturned } from 'pro-components-hooks'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProSelectInstance = PickFunction<SelectInst & {
  /**
   * 获取选项
   */
  getOptions: () => any[]
  /**
   * 设置选项
   */
  setOptions: (opts: any[]) => void
  /**
   * 获取请求控制器
   */
  getFetchControls: () => UseRequestReturned<any, any>
}>
export const useProSelectInstance = createProComponentInstanceFactory<ProSelectInstance>('ProSelect')
