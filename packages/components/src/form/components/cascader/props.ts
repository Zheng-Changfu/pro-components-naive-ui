import type { CascaderProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proCascaderProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<CascaderProps>>>,
    default: () => ({}),
  },
} as const

export type ProCascaderProps = ExtractPublicPropTypes<typeof proCascaderProps>
