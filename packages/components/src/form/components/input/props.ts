import type { InputProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proInputProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<InputProps>>,
} as const

export type ProInputProps = ExtractPublicPropTypes<typeof proInputProps>
export type ProPasswordProps = ProInputProps
export type ProTextareaProps = ProInputProps
