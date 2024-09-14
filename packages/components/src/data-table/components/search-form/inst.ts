import type { ProFormInst } from '../../../form'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../composables'

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

export const useProSearchFormInst = createProComponentInstanceFactory<PickFunction<ProSearchFormInst>>('ProSeachForm')
