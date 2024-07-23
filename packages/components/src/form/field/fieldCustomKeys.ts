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
   * n-form-item 解析后的属性
   */
  nFormItemProps: ComputedRef<Omit<FormItemProps, 'rule'>>
  /**
   * n-form-item 的实例
   */
  nFormItemInstRef: Ref<FormItemInst>
}

export const proFieldConfigKey = 'x-pro-field-config'
