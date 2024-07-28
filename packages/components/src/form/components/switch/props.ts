import type { SwitchProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proSwitchProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<SwitchProps>>>,
    default: () => ({}),
  },
} as const

export type ProSwitchProps = ExtractPublicPropTypes<typeof proSwitchProps>
