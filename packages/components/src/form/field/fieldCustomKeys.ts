import type { FormItemInst, FormItemProps } from 'naive-ui'
import type { ComputedRef, Ref } from 'vue'

interface NFormItemMeta {
  path: FormItemProps['path']
  label: FormItemProps['label']
}
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
   * n-form-item 的一些信息
   */
  nFormItemMeta: ComputedRef<NFormItemMeta>
  /**
   * n-form-item 的实例
   */
  nFormItemInstRef?: Ref<FormItemInst>
}

export const proFieldConfigKey = 'x-pro-field-config'
