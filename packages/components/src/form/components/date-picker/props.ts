import type { DatePickerProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proDatePickerProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<DatePickerProps>>>,
    default: () => ({}),
  },
} as const

export type ProDatePickerProps = ExtractPublicPropTypes<typeof proDatePickerProps>
