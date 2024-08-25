import type { VNodeChild } from 'vue'

export interface ProFieldSlots {
  /**
   * 自定义表单项渲染的内容
   */
  'input'?: Record<string, any>
  /**
   * 表单项的后缀插槽
   */
  'addon-after'?: any
  /**
   * 表单项的前缀插槽
   */
  'addon-before'?: any
  /**
   * 自定义渲染(表单项+前后缀插槽)容器
   */
  'group'?: VNodeChild
  /**
   * 表单项只读模式下的内容
   */
  'readonly'?: Record<string, any>
}
