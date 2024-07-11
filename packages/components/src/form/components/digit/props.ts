import type { InputNumberProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFormItemProps } from '../../form-item'
import { proFieldProps } from '../../field'

export const proDigitProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  /**
   * 透传给表单，支持表达式
   */
  placeholder: {
    type: String as PropType<MaybeExpression<string>>,
  },
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<
    InputNumberProps,
    | 'value'
    | 'placeholder'
    | 'onUpdateValue'
    | 'onUpdate:value'
    | 'defaultValue'
>>>,
    default: () => ({}),
  },
} as const

export type ProDigitProps = ExtractPublicPropTypes<typeof proDigitProps>
