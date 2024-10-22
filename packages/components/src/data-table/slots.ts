export interface ProDataTableSlots {
  /**
   * 表格为空时的内容
   */
  'empty'?: any
  /**
   * loading 时的内容
   */
  'loading'?: any
  /**
   * 表格标题
   */
  'title'?: any
  /**
   * 表格额外区域
   */
  'extra'?: any
  /**
   * 表格工具栏
   */
  'toolbar'?: any
  /**
   * 自定义查询表单的‘查询’/‘重置’区域
   */
  'search-form-suffix'?: {
    collapsed: boolean
    reset: () => void
    search: () => void
    toggle: () => void
  }
}
