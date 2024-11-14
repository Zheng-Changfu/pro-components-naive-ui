import type { ProFormInst } from '../../../form'

export interface ProSearchFormInst<Values = any> extends ProFormInst<Values> {
  /**
   * 重置表单
   */
  reset: () => void
  /**
   * 搜索表单
   */
  search: (values: Values) => void
  /**
   * 切换收起
   */
  toggleCollapsed: () => void
}
