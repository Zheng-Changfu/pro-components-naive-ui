import type { InputProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proPasswordProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<InputProps>>>,
    default: () => ({}),
  },
} as const

export type ProPasswordProps = ExtractPublicPropTypes<typeof proPasswordProps>
