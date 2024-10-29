import type { ArrayField } from 'pro-components-hooks'
import type { ProDataTableInst } from '../data-table/inst'
import type { PickFunction } from '../types'
import { createProComponentInstanceFactory } from '../composables'

export interface ProEditDataTableInst extends Pick<
  ArrayField,
  | 'insert'
  | 'move'
  | 'moveDown'
  | 'moveUp'
  | 'pop'
  | 'push'
  | 'remove'
  | 'shift'
  | 'unshift'
>, Omit<ProDataTableInst, 'reload'> {
  /**
   * 开始编辑
   * @param index 行索引
   */
  startEditable: (index: number) => void
  /**
   * 结束编辑
   * @param index 行索引
   */
  cancelEditable: (index: number) => void
  /**
   * 获取行是否在编辑状态
   * @param index 行索引
   */
  getEditable: (index: number) => boolean
}

export const useProEditDataTableInst = createProComponentInstanceFactory<PickFunction<ProEditDataTableInst>>('ProEditDataTable')
