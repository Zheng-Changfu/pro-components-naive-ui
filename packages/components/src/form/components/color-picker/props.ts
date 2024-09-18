import type { ColorPickerProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proColorPickerProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<ColorPickerProps>>>,
    default: () => ({}),
  },
} as const

export type ProColorPickerProps = ExtractPublicPropTypes<typeof proColorPickerProps>
