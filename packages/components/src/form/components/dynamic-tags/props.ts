import type { DynamicTagsProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proDynamicTagsProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<DynamicTagsProps>>>,
    default: () => ({}),
  },
} as const

export type ProDynamicTagsProps = ExtractPublicPropTypes<typeof proDynamicTagsProps>
