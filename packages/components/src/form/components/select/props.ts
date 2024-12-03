import type { SelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proSelectProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<SelectProps>>,
} as const

export type ProSelectProps = ExtractPublicPropTypes<typeof proSelectProps>
