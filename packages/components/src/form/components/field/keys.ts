import type { ComputedRef, VNodeChild } from 'vue'
import type { FormItemInst } from 'naive-ui'
import type { ProFormItemProps } from '../form-item'
import type { ValueTypeEnum } from './enums'

export interface FieldExtraInfo {
  /**
   * 表单项的值
   */
  value: ComputedRef<any>
  /**
   * 是否为只读模式
   */
  readonly: ComputedRef<boolean>
  /**
   * 只读模式下的渲染
   */
  readonlyRender: (opt: { fieldProps: Record<string, any> }) => VNodeChild
  /**
   * 表单项的类型
   */
  valueType: ComputedRef<ValueTypeEnum | undefined>
  /**
   * 表单项的 props
   */
  fieldProps: ComputedRef<Record<string, any>>
  /**
   * ProFormItem 的实例，校验的时候会用到
   */
  proFormItemInst: ComputedRef<FormItemInst>
  /**
   * ProFormItem 的 props
   */
  proFormItemProps: ComputedRef<ProFormItemProps>
}

export const fieldExtraKey = 'x-field-extra-key'
