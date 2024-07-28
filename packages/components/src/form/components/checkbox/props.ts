import type { CheckboxProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proCheckboxProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<CheckboxProps>>>,
    default: () => ({}),
  },
} as const

export type ProCheckboxProps = ExtractPublicPropTypes<typeof proCheckboxProps>
