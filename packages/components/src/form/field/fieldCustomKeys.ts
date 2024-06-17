import type { FormItemInst, FormItemProps } from 'naive-ui'
import type { ComputedRef, Ref, ToRefs } from 'vue'

export interface ProComponentConfig {
  /**
   * 组件类型
   */
  type: `Pro${string}`
  /**
   * 表单校验类型，相当于 rule:{type:string}
   */
  ruleType: string
  /**
   * 诸如 input/select 等控件的值
   */
  value: ComputedRef<any>
  /**
   * 组件插槽
   */
  slots: ComputedRef<Record<string, any>>
  /**
   * 诸如 input/select 等编译后的属性
   */
  fieldProps: ComputedRef<Record<string, any>>
  /**
   * n-form-item 编译后的属性
   */
  formItemProps: ToRefs<FormItemProps>
  /**
   * 诸如 input/select，判断当前表单值是否为空的响应式属性
   */
  empty: ComputedRef<boolean>
  /**
   * n-form-item 的实例
   */
  formItemInstRef: Ref<FormItemInst>
}

export const ProComponentConfigKey = 'x-pro-component-config'
