import type { SwitchProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-composables'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proSwitchProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<SwitchProps>>>,
    default: () => ({}),
  },
} as const

export type ProSwitchProps = ExtractPublicPropTypes<typeof proSwitchProps>
