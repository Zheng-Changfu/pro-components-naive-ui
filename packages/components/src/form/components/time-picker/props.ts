import type { TimePickerProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proTimePickerProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<TimePickerProps>>,
} as const

export type ProTimePickerProps = ExtractPublicPropTypes<typeof proTimePickerProps>
