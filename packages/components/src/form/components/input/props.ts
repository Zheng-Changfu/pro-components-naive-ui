import type { InputProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proInputProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<InputProps>>>,
    default: () => ({}),
  },
} as const

export type ProInputProps = ExtractPublicPropTypes<typeof proInputProps>
export type ProPasswordProps = ProInputProps
export type ProTextareaProps = ProInputProps
