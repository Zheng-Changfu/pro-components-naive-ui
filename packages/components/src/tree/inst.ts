import type { TreeInst } from 'naive-ui'
import type { UseRequestReturned } from 'pro-components-hooks'
import type { PickFunction } from '../types'

export type ProTreeInstance<Data = any> = PickFunction<TreeInst & {
  /**
   * 获取数据
   */
  getTreeData: () => Array<Data>
  /**
   * 获取勾选的节点 keys
   */
  getCheckedKeys: () => Array<string | number>
  /**
   * 获取选中的节点 keys
   */
  getSelectedKeys: () => Array<string | number>
  /**
   * 获取展开的节点 keys
   */
  getExpandedKeys: () => Array<string | number>
  /**
   * 展开节点，不传展开全部
   * @param keys 需要展开的 keys
   */
  setExpandedKeys: (keys?: Array<string | number>) => void
  /**
   * 选中节点，不传选中所有
   * @param keys 需要选中的 keys
   */
  setSelectedKeys: (keys?: Array<string | number>) => void
  /**
   * 勾选节点，不传勾选所有
   * @param keys 需要勾选的 keys
   */
  setCheckedKeys: (keys?: Array<string | number>) => void
  /**
   * 获取请求控制器
   */
  getFetchControls: () => UseRequestReturned<any, any>
}>
