import type { CheckboxGroupProps, CheckboxProps, FlexProps } from 'naive-ui'
import type { Merge } from 'type-fest'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export interface ProCheckboxGroupFieldProps extends CheckboxGroupProps {
  /**
   * 选项 label 的字段名
   * @default 'label'
   */
  labelField?: string
  /**
   * 选项 value 的字段名
   * @default 'value'
   */
  valueField?: string
  /**
   * 配置选项内容
   */
  options?: Array<Merge<CheckboxProps, { [x: string]: any }>>
  /**
   * 包裹 n-checkbox 的 flex 属性
   */
  flexProps?: FlexProps
}

export const proCheckboxGroupProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<ProCheckboxGroupFieldProps>>,
} as const

export type ProCheckboxGroupProps = ExtractPublicPropTypes<typeof proCheckboxGroupProps>
