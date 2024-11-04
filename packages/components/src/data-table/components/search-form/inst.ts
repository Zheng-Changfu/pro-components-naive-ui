import type { ProFormInst } from '../../../form'

export interface ProSearchFormInst<DataSource = any> extends ProFormInst {
  /**
   * 重置表单
   */
  reset: () => void
  /**
   * 搜索表单
   */
  search: (values: DataSource) => void
  /**
   * 切换收起
   */
  toggleCollapsed: () => void
}
