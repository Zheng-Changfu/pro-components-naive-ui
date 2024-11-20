import type { TimePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proTimePickerProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<TimePickerProps>>,
} as const

export type ProTimePickerProps = ExtractPublicPropTypes<typeof proTimePickerProps>
