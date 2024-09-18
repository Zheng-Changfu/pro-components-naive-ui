import type { FlexProps, RadioGroupProps, RadioProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

interface ProRadioGroupFieldProps extends RadioGroupProps {
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
  options?: Array<RadioProps & ([x: string])>
  /**
   * 包裹 n-radio 的 flex 属性
   */
  flexProps: FlexProps
}

export const proRadioGroupProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<ProRadioGroupFieldProps>>>,
    default: () => ({}),
  },
} as const

export type ProRadioGroupProps = ExtractPublicPropTypes<typeof proRadioGroupProps>
