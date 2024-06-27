import type { RadioProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'

export const proRadioProps = {
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
    RadioProps,
    | 'defaultChecked'
    | 'onUpdateChecked'
    | 'onUpdate:checked'
    >>>,
    default: () => ({}),
  },
} as const

export type ProRadioProps = ExtractPublicPropTypes<typeof proRadioProps>
