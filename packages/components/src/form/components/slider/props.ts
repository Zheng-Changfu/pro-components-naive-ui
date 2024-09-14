import type { SliderProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proSliderProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<SliderProps>>>,
    default: () => ({}),
  },
} as const

export type ProSliderProps = ExtractPublicPropTypes<typeof proSliderProps>
