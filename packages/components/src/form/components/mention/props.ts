import type { MentionProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps } from '../field'
import type { ExtendAttrsStyleProps } from '../../../types'

export const proMentionProps = {
  ...proFieldProps,
  fieldProps: {
    type: Object as PropType<MaybeExpression<ExtendAttrsStyleProps<MentionProps>>>,
    default: () => ({}),
  },
} as const

export type ProMentionProps = ExtractPublicPropTypes<typeof proMentionProps>
