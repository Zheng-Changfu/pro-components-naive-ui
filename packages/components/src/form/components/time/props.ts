import type { TimePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFormItemProps } from '../../form-item'
import { proFieldProps } from '../../field'
import type { ExtendPublicProps } from '../../../types'

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
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendPublicProps<Omit<
    TimePickerProps,
    | 'value'
    | 'placeholder'
    | 'defaultValue'
    | 'onUpdateValue'
    | 'onUpdate:value'
    | 'formattedValue'
    | 'defaultFormattedValue'
    | 'onUpdateFormattedValue'
    | 'onUpdate:formattedValue'
    >>>>,
    default: () => ({}),
  },
} as const

export type ProTimeProps = ExtractPublicPropTypes<typeof proTimeProps>
