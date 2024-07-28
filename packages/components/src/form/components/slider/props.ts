import type { SliderProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proSliderProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<SliderProps>>>,
    default: () => ({}),
  },
} as const

export type ProSliderProps = ExtractPublicPropTypes<typeof proSliderProps>
