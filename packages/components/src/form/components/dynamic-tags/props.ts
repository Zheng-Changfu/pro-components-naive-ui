import type { DynamicTagsProps } from 'naive-ui'
import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { ExtendAttrsStyleProps } from '../../../types'
import { proFieldProps } from '../field'

export const proDynamicTagsProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<DynamicTagsProps>>>,
    default: () => ({}),
  },
} as const

export type ProDynamicTagsProps = ExtractPublicPropTypes<typeof proDynamicTagsProps>
