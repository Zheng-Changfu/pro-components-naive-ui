import type { DatePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

export const proTimeProps = {
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
  /**
   * valueFormat 不支持表达式
   */
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<
    DatePickerProps,
    | 'valueFormat'
    | 'value'
    | 'placeholder'
    | 'defaultTime'
    | 'defaultValue'
    | 'onUpdateValue'
    | 'onUpdate:value'
    | 'formattedValue'
    | 'defaultFormattedValue'
    | 'onUpdateFormattedValue'
    | 'onUpdate:formattedValue'
>> & {
  valueFormat: string
}>,
    default: () => ({}),
  },
} as const

export type ProTimeProps = ExtractPublicPropTypes<typeof proTimeProps>
