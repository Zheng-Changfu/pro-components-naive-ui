import type { TimePickerProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proTimePickerProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<TimePickerProps>>>,
    default: () => ({}),
  },
} as const

export type ProTimePickerProps = ExtractPublicPropTypes<typeof proTimePickerProps>
