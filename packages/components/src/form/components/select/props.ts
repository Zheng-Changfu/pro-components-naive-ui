import type { SelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proSelectProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<SelectProps>>>,
    default: () => ({}),
  },
} as const

export type ProSelectProps = ExtractPublicPropTypes<typeof proSelectProps>
