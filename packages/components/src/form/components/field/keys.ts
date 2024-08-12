import type { ComputedRef } from 'vue'
import type { FormItemInst } from 'naive-ui'
import type { ProFormItemProps } from '../form-item'
import type { ValueTypeEnum } from './enums'

export interface FieldExtraInfo {
  /**
   * 是否为只读模式
   */
  readonly: ComputedRef<boolean>
  /**
   * 表单项的类型
   */
  valueType: ComputedRef<ValueTypeEnum | undefined>
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
