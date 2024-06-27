import type { DatePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

export const proDateWeekProps = {
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
   * type 和 valueFormat 不支持表达式
   */
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<
    DatePickerProps,
    | 'type'
    | 'valueFormat'
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
>> & {
  valueFormat: string
}>,
    default: () => ({}),
  },
} as const

export type ProDateWeekProps = ExtractPublicPropTypes<typeof proDateWeekProps>
