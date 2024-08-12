import type { TreeSelectProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proTreeSelectProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<TreeSelectProps>>>,
    default: () => ({}),
  },
} as const

export type ProTreeSelectProps = ExtractPublicPropTypes<typeof proTreeSelectProps>
