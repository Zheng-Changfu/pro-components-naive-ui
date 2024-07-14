import type { ProFormListInstance } from '../inst'

export interface ProFormListItemSlots {
  default: {
    /**
     * 当前行索引
     */
    index: number
    /**
     * 总行数
     */
    total: number
    /**
     * 操作行的一些方法
     */
    action: ProFormListInstance
  }
}
