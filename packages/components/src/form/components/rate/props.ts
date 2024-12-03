import type { RateProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proRateProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<RateProps>>,
} as const

export type ProRateProps = ExtractPublicPropTypes<typeof proRateProps>
