import type { CheckboxGroupProps, CheckboxProps, FlexProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

interface ProCheckboxGroupFieldProps extends CheckboxGroupProps {
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
  options?: Array<CheckboxProps & ([x: string])>
}

export const proCheckboxGroupProps = {
  ...proFieldProps,
  /**
   * 包裹 n-checkbox 的 flex 属性
   */
  flexProps: {
    type: Object as PropType<MaybeExpression<FlexProps>>,
    default: () => ({}),
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<ProCheckboxGroupFieldProps>>>,
    default: () => ({}),
  },
} as const

export type ProCheckboxGroupProps = ExtractPublicPropTypes<typeof proCheckboxGroupProps>
