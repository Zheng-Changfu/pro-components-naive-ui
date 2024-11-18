import type { InputNumberProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proDigitProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<InputNumberProps>>,
} as const

export type ProDigitProps = ExtractPublicPropTypes<typeof proDigitProps>
