export interface ProCardSlots {
  'cover'?: any
  'header'?: any
  'default'?: any
  'footer'?: any
  'action'?: any
  'header-extra'?: any
  /**
   * 扩展的插槽，展开收起的渲染函数
   */
  'switcher': (opts: { expanded: boolean }) => any
}
