import type { DatePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

export const proDateProps = {
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
    DatePickerProps,
    | 'value'
    | 'placeholder'
    | 'defaultTime'
    | 'defaultValue'
    | 'onUpdateValue'
    | 'onUpdate:value'
    | 'formattedValue'
    | 'endPlaceholder'
    | 'startPlaceholder'
    | 'defaultFormattedValue'
    | 'defaultCalendarEndTime'
    | 'onUpdateFormattedValue'
    | 'onUpdate:formattedValue'
    | 'defaultCalendarStartTime'
> & { showTime: boolean }>>,
    default: () => ({}),
  },
} as const

export type ProDateProps = ExtractPublicPropTypes<typeof proDateProps>
