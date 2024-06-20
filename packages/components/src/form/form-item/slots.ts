export interface ProFormItemSlots {
  'label': any
  'feedback': any
  'addon-after': any
  'addon-before': any
  /**
   * 扩展参数
   */
  'default': {
    fieldProps: Record<string, any>
    placeholder: any
  }
}
