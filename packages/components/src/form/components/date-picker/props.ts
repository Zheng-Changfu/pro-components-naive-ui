import type { DatePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proDatePickerProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<DatePickerProps>>,
} as const

export type ProDatePickerProps = ExtractPublicPropTypes<typeof proDatePickerProps>
