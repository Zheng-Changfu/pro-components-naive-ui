import type { InputNumberProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proDigitProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<InputNumberProps>>,
} as const

export type ProDigitProps = ExtractPublicPropTypes<typeof proDigitProps>
