import type { ColorPickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proColorPickerProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<ColorPickerProps>>>,
    default: () => ({}),
  },
} as const

export type ProColorPickerProps = ExtractPublicPropTypes<typeof proColorPickerProps>
