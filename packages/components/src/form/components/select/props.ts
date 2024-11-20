import type { SelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proSelectProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<SelectProps>>,
} as const

export type ProSelectProps = ExtractPublicPropTypes<typeof proSelectProps>
