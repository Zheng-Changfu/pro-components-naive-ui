import type { InputNumberProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-composables'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proDigitProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<InputNumberProps>>>,
    default: () => ({}),
  },
} as const

export type ProDigitProps = ExtractPublicPropTypes<typeof proDigitProps>
