import type { CascaderProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-composables'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proCascaderProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<CascaderProps>>>,
    default: () => ({}),
  },
} as const

export type ProCascaderProps = ExtractPublicPropTypes<typeof proCascaderProps>
