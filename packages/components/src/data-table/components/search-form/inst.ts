import type { ProFormInst } from '../../../form'

export interface ProSearchFormInst<Values = any> extends ProFormInst<Values> {
  /**
   * 切换收起
   */
  toggleCollapsed: () => void
}
