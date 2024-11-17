import type { CheckboxProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-composables'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proCheckboxProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<CheckboxProps>>>,
    default: () => ({}),
  },
} as const

export type ProCheckboxProps = ExtractPublicPropTypes<typeof proCheckboxProps>
