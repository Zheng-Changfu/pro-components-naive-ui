import type { TreeInst } from 'naive-ui'
import type { UseRequestReturned } from 'pro-components-hooks'
import type { PickFunction } from '../types'

export type ProTreeInstance = PickFunction<TreeInst & {
  /**
   * 展开节点，不传展开全部
   * @param keys 需要展开的 keys
   */
  expandKeys: (keys?: Array<string | number>) => void
  /**
   * 选中节点，不传选中所有
   * @param keys 需要选中的 keys
   */
  selectKeys: (keys?: Array<string | number>) => void
  /**
   * 勾选节点，不传勾选所有
   * @param keys 需要勾选的 keys
   */
  checkKeys: (keys?: Array<string | number>) => void
  /**
   * 获取请求控制器
   */
  getFetchControls: () => UseRequestReturned<any, any>
}>
