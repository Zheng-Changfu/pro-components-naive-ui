import type { CheckboxProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proCheckboxProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<CheckboxProps>>,
} as const

export type ProCheckboxProps = ExtractPublicPropTypes<typeof proCheckboxProps>
