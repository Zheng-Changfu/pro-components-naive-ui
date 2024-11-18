import type { RateProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proRateProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<RateProps>>,
} as const

export type ProRateProps = ExtractPublicPropTypes<typeof proRateProps>
