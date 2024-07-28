import type { TimePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proTimePickerProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<TimePickerProps>>>,
    default: () => ({}),
  },
} as const

export type ProTimePickerProps = ExtractPublicPropTypes<typeof proTimePickerProps>
