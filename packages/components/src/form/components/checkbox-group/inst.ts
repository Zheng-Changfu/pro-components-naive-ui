import type { UseRequestReturned } from 'pro-components-hooks'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

interface Instance {
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
}
export type ProCheckboxGroupInstance = PickFunction<Instance>
export const useProCheckboxGroupInstance = createProComponentInstanceFactory<ProCheckboxGroupInstance>('ProCheckboxGroup')
