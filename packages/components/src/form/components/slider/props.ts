import type { SliderProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proSliderProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<SliderProps>>,
} as const

export type ProSliderProps = ExtractPublicPropTypes<typeof proSliderProps>
