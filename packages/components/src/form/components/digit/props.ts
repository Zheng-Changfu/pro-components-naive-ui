import type { InputNumberProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proDigitProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<InputNumberProps>>>,
    default: () => ({}),
  },
} as const

export type ProDigitProps = ExtractPublicPropTypes<typeof proDigitProps>
