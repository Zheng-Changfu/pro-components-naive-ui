import type { ColorPickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proColorPickerProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<ColorPickerProps>>,
} as const

export type ProColorPickerProps = ExtractPublicPropTypes<typeof proColorPickerProps>
