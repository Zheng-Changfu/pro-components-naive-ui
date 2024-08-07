import type { VNodeChild } from 'vue'

export interface ProFieldSlots {
  /**
   * 表单组件的后缀插槽
   */
  'addon-after'?: any
  /**
   * 表单组件的前缀插槽
   */
  'addon-before'?: any
  /**
   * 自定义渲染(表单+前后缀插槽)容器
   */
  'group'?: VNodeChild
  /**
   * 自定义表单组件
   */
  'default'?: Record<string, any>
  /**
   * 表单组件只读模式下的内容
   */
  'readonly'?: Record<string, any>
  [x: string]: any
}
