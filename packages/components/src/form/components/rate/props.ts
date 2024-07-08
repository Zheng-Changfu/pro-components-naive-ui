import type { RateProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFormItemProps } from '../../form-item'
import { proFieldProps } from '../../field'

export const proRateProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<Omit<
    RateProps,
    | 'value'
    | 'onUpdateValue'
    | 'onUpdate:value'
    | 'defaultValue'
>>>,
    default: () => ({}),
  },
} as const

export type ProRateProps = ExtractPublicPropTypes<typeof proRateProps>
