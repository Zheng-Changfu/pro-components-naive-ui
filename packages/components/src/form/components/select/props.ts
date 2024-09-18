import type { SelectProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proSelectProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<SelectProps>>>,
    default: () => ({}),
  },
} as const

export type ProSelectProps = ExtractPublicPropTypes<typeof proSelectProps>
