import type { ColorPickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proColorPickerProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<ColorPickerProps>>,
} as const

export type ProColorPickerProps = ExtractPublicPropTypes<typeof proColorPickerProps>
