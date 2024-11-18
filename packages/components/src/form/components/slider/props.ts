import type { SliderProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proSliderProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<SliderProps>>,
} as const

export type ProSliderProps = ExtractPublicPropTypes<typeof proSliderProps>
