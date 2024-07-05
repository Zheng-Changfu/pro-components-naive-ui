import type { FormItemInst, FormItemProps } from 'naive-ui'
import type { ComputedRef, Ref } from 'vue'

export interface ProFieldConfig {
  /**
   * 组件名称
   */
  name: `Pro${string}`
  /**
   * 诸如 input/select 等控件的值
   */
  value: ComputedRef<any>
  /**
   * 组件插槽
   */
  slots: Record<string, any>
  /**
   * n-form-item 编译后的属性
   */
  formItemProps: ComputedRef<FormItemProps>
  /**
   * n-form-item 的实例
   */
  formItemInstRef: Ref<FormItemInst>
}

export const ProFieldConfigKey = 'x-pro-field-config'
