import type { RateProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-composables'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proRateProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<RateProps>>>,
    default: () => ({}),
  },
} as const

export type ProRateProps = ExtractPublicPropTypes<typeof proRateProps>
